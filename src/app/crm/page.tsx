import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertCircle,
  FileText,
  CheckSquare,
  ArrowRight,
  PieChart,
  BarChart3,
  Users
} from "lucide-react";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { getPendingFollowUpsWidget } from "@/lib/dal/follow-ups";
import { getActivities } from "@/lib/dal/activities";

export default async function Dashboard() {
  const [opportunities, invoices, payments, followUps, activityData, clients, tasks] = await Promise.all([
    prisma.orm.public.Opportunity.all(),
    prisma.orm.public.Invoice.all(),
    prisma.orm.public.Payment.all(),
    prisma.orm.public.FollowUp.where({ status: "Pending" }).include('company').include('lead').orderBy(f => f.dueDate.asc()).all(),
    getActivities({ page: 1, pageSize: 5 }),
    prisma.orm.public.Client.include('company').orderBy(c => c.createdAt.desc()).limit(3).all(),
    prisma.orm.public.Task.where(t => t.status.neq("Done")).include('project').orderBy(t => t.createdAt.desc()).limit(3).all(),
  ]);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
  const openDeals = opportunities.filter(o => !["Won", "Lost"].includes(o.stage));
  const paidByInvoice = new Map<string, number>();
  for (const payment of payments) paidByInvoice.set(payment.invoiceId, (paidByInvoice.get(payment.invoiceId) ?? 0) + payment.amount);
  const outstanding = invoices.filter(i => !["Draft", "Cancelled"].includes(i.status)).map(i => ({ ...i, balance: Math.max(0, i.total - (paidByInvoice.get(i.id) ?? 0)) }));
  const stats = {
    followUps: followUps.filter(f => new Date(String(f.dueDate)) >= today && new Date(String(f.dueDate)) < tomorrow).length,
    openDeals: openDeals.length,
    pipelineValue: openDeals.reduce((sum, o) => sum + (o.estimatedValue ?? 0), 0),
    pendingPayments: outstanding.reduce((sum, i) => sum + i.balance, 0),
  };
  const overdueFollowUps = followUps.filter(f => new Date(String(f.dueDate)) < today).length;
  const overdueInvoices = outstanding.filter(i => i.balance > 0 && i.dueDate && new Date(String(i.dueDate)) < today).length;
  const dueFollowUps = followUps.filter(f => new Date(String(f.dueDate)) < tomorrow).slice(0, 5);
  const recentActivities = activityData.activities;
  const recentClients = clients.map(c => ({ ...c, name: c.company?.name ?? "Unlinked client", industry: c.company?.industry }));
  const recentTasks = tasks;
  const revenueChartData: number[] = [];
  const revenueChartLabels: string[] = [];
  for (let offset = 6; offset >= 0; offset--) {
    const start = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1);
    revenueChartLabels.push(start.toLocaleDateString('en-IN', { month: 'short' }));
    revenueChartData.push(payments.filter(p => new Date(String(p.date)) >= start && new Date(String(p.date)) < end).reduce((sum, p) => sum + p.amount, 0));
  }
  const maxChartRevenue = Math.max(1, ...revenueChartData);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h1 className="heading-md">Command Center</h1>
        <p className="text-text-secondary mt-1">Here's a pulse on your agency today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Follow-ups Due Today"
          value={stats.followUps}
          icon={<Clock className="w-4 h-4 text-accent" />}
          trend={`${overdueFollowUps} overdue`}
          trendUp={false}
          href="/crm/follow-ups"
        />
        <KpiCard
          title="Open Deals"
          value={stats.openDeals}
          icon={<TrendingUp className="w-4 h-4 text-blue-500" />}
          trend="Active opportunities"
          trendUp={true}
          href="/crm/opportunities"
        />
        <KpiCard
          title="Pipeline Value"
          value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(stats.pipelineValue)}
          icon={<PieChart className="w-4 h-4 text-green-500" />}
          trend="Excludes won and lost deals"
          trendUp={true}
          href="/crm/opportunities"
        />
        <KpiCard
          title="Pending Payments"
          value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(stats.pendingPayments)}
          icon={<AlertCircle className="w-4 h-4 text-orange-500" />}
          trend={`${overdueInvoices} invoices overdue`}
          trendUp={false}
          href="/crm/invoices"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-xl p-6 border border-border-subtle shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-accent" />
                Payments Received
              </h2>
              <Link href="/crm/proposals" className="text-sm text-accent font-medium hover:underline flex items-center gap-1">
                View Proposals <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {/* Dynamic Payments Received Chart */}
            <div className="h-64 flex items-end justify-between gap-2 border-b border-border-subtle pb-4 pt-10 px-4">
              {revenueChartData.map((revenue: number, i: number) => {
                const height = maxChartRevenue > 0 ? (revenue / maxChartRevenue) * 100 : 5;
                const isCurrentMonth = i === 6;
                return (
                  <div key={i} className="w-1/6 bg-surface-elevated rounded-t-sm group-hover:bg-surface-glass transition-colors relative flex items-end justify-center group/bar" style={{ height: `${height}%` }}>
                    <div className="absolute -top-8 opacity-0 group-hover/bar:opacity-100 transition-opacity text-xs font-bold text-accent bg-surface-elevated px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(revenue)}
                    </div>
                    <div className={`w-full ${isCurrentMonth ? 'bg-accent/80' : 'bg-border-subtle'} rounded-t-sm hover:bg-accent transition-colors`} style={{ height: '100%' }}></div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-text-muted mt-3 px-4 uppercase tracking-wider font-semibold">
              {revenueChartLabels.map((label: string, i: number) => (
                <span key={i}>{label}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-xl p-6 border border-border-subtle shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  Recent Clients
                </h2>
                <Link href="/crm/clients" className="text-sm text-text-secondary hover:text-accent font-medium transition-colors">View all</Link>
              </div>
              <div className="space-y-4">
                {recentClients.map((client: any) => (
                  <ClientItem key={client.id} name={client.name} industry={client.industry || 'Unknown'} status={client.status || 'Active'} />
                ))}
                {recentClients.length === 0 && <p className="text-sm text-text-muted">No recent clients.</p>}
              </div>
            </div>

            <div className="glass rounded-xl p-6 border border-border-subtle shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold">Recent Activity</h2>
                <Link href="/crm/activities" className="text-sm text-text-secondary hover:text-accent font-medium transition-colors">View all</Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((act: any) => (
                  <ActivityItem
                    key={act.id}
                    type={act.type.toLowerCase()}
                    title={act.title}
                    time={new Date(String(act.createdAt)).toLocaleDateString('en-US')}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          <div className="glass rounded-xl p-6 border border-border-subtle shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-accent flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Action Required
              </h2>
            </div>
            <div className="space-y-3">
              {dueFollowUps.map((fu: any) => {
                const isOverdue = new Date(String(fu.dueDate)) < new Date(new Date().setHours(0,0,0,0));
                const entityName = fu.company?.name || fu.lead?.name || fu.contact?.name || fu.opportunity?.title || "No entity";
                return (
                  <FollowUpItem
                    key={fu.id}
                    title={fu.title}
                    company={entityName}
                    urgent={isOverdue || fu.priority === 'High'}
                  />
                );
              })}
              {dueFollowUps.length === 0 && <p className="text-sm text-text-muted">You're all caught up!</p>}
            </div>
          </div>

          <div className="glass rounded-xl p-6 border border-border-subtle shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                Delivery Tasks
              </h2>
              <Link href="/crm/tasks" className="text-sm text-text-secondary hover:text-accent font-medium transition-colors">View tasks</Link>
            </div>
            <div className="space-y-3">
              {recentTasks.map((task: any) => (
                <TaskItem key={task.id} title={task.title} project={task.project.name} blocked={task.status === 'Blocked'} />
              ))}
              {recentTasks.length === 0 && <p className="text-sm text-text-muted">No pending tasks.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function KpiCard({ title, value, icon, trend, trendUp, href }: any) {
  return (
    <Link href={href || "#"} className="glass rounded-xl p-5 border border-border-subtle shadow-sm hover:border-accent/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 transition-all group block">
      <div className="flex items-center justify-between text-text-secondary mb-3">
        <span className="text-sm font-medium">{title}</span>
        <div className="p-2 bg-surface-elevated rounded-md border border-border-subtle group-hover:border-accent/30 transition-colors">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold mb-1 text-text-primary">{value}</div>
      <div className={`text-xs font-medium ${trendUp ? "text-green-500" : "text-orange-500"}`}>
        {trend}
      </div>
    </Link>
  );
}

function ActivityItem({ type, title, time }: any) {
  return (
    <div className="flex gap-3 group">
      <div className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center shrink-0 border border-border-subtle group-hover:border-accent/30 transition-colors">
        {type === 'note' && <FileText className="w-3.5 h-3.5 text-text-secondary group-hover:text-accent" />}
        {type === 'email' && <AlertCircle className="w-3.5 h-3.5 text-text-secondary group-hover:text-accent" />}
        {type === 'meeting' && <CalendarIcon className="w-3.5 h-3.5 text-text-secondary group-hover:text-accent" />}
      </div>
      <div>
        <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">{title}</p>
        <p className="text-xs text-text-muted mt-0.5">{time}</p>
      </div>
    </div>
  );
}



function FollowUpItem({ title, company, urgent }: any) {
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${urgent ? 'border-red-500/30 bg-red-500/5' : 'border-border-subtle bg-surface-elevated/30'} hover:border-accent/50 transition-colors group cursor-pointer`}>
      <Link href="/crm/follow-ups" aria-label="Manage follow-up"><Clock className="w-4 h-4" /></Link>
      <div>
        <p className="text-sm font-medium group-hover:text-accent transition-colors">{title}</p>
        <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1">
          {urgent && <span className="text-red-500 font-bold uppercase tracking-wider text-[9px] bg-red-500/10 px-1 rounded">Urgent</span>}
          {company}
        </p>
      </div>
    </div>
  );
}

function TaskItem({ title, project, blocked }: any) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-elevated/50 hover:bg-surface-elevated transition-colors cursor-pointer border border-transparent hover:border-border-subtle">
      <Link href="/crm/tasks" aria-label="Manage task"><CheckSquare className="w-4 h-4" /></Link>
      <div>
        <p className="text-sm font-medium text-text-primary flex items-center gap-2">
          {title}
          {blocked && <span className="w-2 h-2 rounded-full bg-red-500" title="Blocked" />}
        </p>
        <p className="text-xs text-text-muted mt-0.5">{project}</p>
      </div>
    </div>
  );
}

function ClientItem({ name, industry, status }: any) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div>
        <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">{name}</p>
        <p className="text-xs text-text-muted mt-0.5">{industry}</p>
      </div>
      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
        status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-surface-elevated text-text-secondary'
      }`}>
        {status}
      </span>
    </div>
  );
}
