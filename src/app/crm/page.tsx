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

export default async function Dashboard() {
  let stats = {
    followUps: 0,
    openDeals: 0,
    pipelineValue: 0,
    pendingPayments: 0
  };

  try {
    // Attempt to fetch real stats if DB is seeded
    const leads = await prisma.lead.count({ where: { status: { not: "Won" } } });
    const ops = await prisma.opportunity.findMany({ where: { stage: { not: "Won" } } });
    const invoices = await prisma.invoice.findMany({ where: { status: { notIn: ["Paid", "Draft"] } } });

    stats.openDeals = ops.length;
    stats.pipelineValue = ops.reduce((sum: number, op: any) => sum + (op.estimatedValue || 0), 0);
    stats.pendingPayments = invoices.reduce((sum: number, inv: any) => sum + (inv.total || 0), 0);
    stats.followUps = leads + ops.filter((o: any) => o.nextFollowUp && o.nextFollowUp <= new Date()).length; // Rough mock
  } catch (e) {
    // Fallback to mock data for presentation
    stats = {
      followUps: 5,
      openDeals: 12,
      pipelineValue: 450000,
      pendingPayments: 120000
    };
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h1 className="heading-md">Command Center</h1>
        <p className="text-text-secondary mt-1">Good morning, Admin. Here's a pulse on your agency today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Follow-ups Due Today"
          value={stats.followUps}
          icon={<Clock className="w-4 h-4 text-accent" />}
          trend="2 overdue"
          trendUp={false}
          href="/crm/follow-ups"
        />
        <KpiCard
          title="Open Deals"
          value={stats.openDeals}
          icon={<TrendingUp className="w-4 h-4 text-blue-500" />}
          trend="3 new this week"
          trendUp={true}
          href="/crm/opportunities"
        />
        <KpiCard
          title="Pipeline Value"
          value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(stats.pipelineValue)}
          icon={<PieChart className="w-4 h-4 text-green-500" />}
          trend="+12% from last month"
          trendUp={true}
          href="/crm/opportunities"
        />
        <KpiCard
          title="Pending Payments"
          value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(stats.pendingPayments)}
          icon={<AlertCircle className="w-4 h-4 text-orange-500" />}
          trend="1 invoice overdue"
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
                Revenue Forecast
              </h2>
              <Link href="/crm/proposals" className="text-sm text-accent font-medium hover:underline flex items-center gap-1">
                View Proposals <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {/* Visual Placeholder for a chart */}
            <div className="h-64 flex items-end justify-between gap-2 border-b border-border-subtle pb-4 pt-10 px-4">
              {[40, 60, 45, 80, 55, 90, 70].map((height, i) => (
                <div key={i} className="w-1/6 bg-surface-elevated rounded-t-sm group-hover:bg-surface-glass transition-colors relative flex items-end justify-center group/bar" style={{ height: `${height}%` }}>
                  <div className="absolute -top-8 opacity-0 group-hover/bar:opacity-100 transition-opacity text-xs font-bold text-accent bg-surface-elevated px-2 py-1 rounded shadow-lg">
                    ₹{height},000
                  </div>
                  <div className={`w-full ${i === 5 ? 'bg-accent/80' : 'bg-border-subtle'} rounded-t-sm hover:bg-accent transition-colors`} style={{ height: '100%' }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-text-muted mt-3 px-4 uppercase tracking-wider font-semibold">
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
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
                <ClientItem name="TechFlow Solutions" industry="SaaS" status="Active" />
                <ClientItem name="Stellar E-commerce" industry="Retail" status="Active" />
                <ClientItem name="GrowthMasters" industry="Marketing" status="Onboarding" />
              </div>
            </div>

            <div className="glass rounded-xl p-6 border border-border-subtle shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold">Recent Activity</h2>
                <Link href="/crm/activities" className="text-sm text-text-secondary hover:text-accent font-medium transition-colors">View all</Link>
              </div>
              <div className="space-y-4">
                <ActivityItem type="note" title="Added note to WebApp Project" time="2h ago" />
                <ActivityItem type="email" title="Sent proposal to TechCorp" time="4h ago" />
                <ActivityItem type="meeting" title="Discovery call with InnovateInc" time="Yesterday" />
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
              <FollowUpItem title="Send revised proposal" company="Acme Corp" urgent />
              <FollowUpItem title="Check in on contract" company="GlobalTech" />
              <FollowUpItem title="Follow up on invoice INV-2026-002" company="Stellar" urgent />
              <FollowUpItem title="Schedule kick-off" company="StartUp Inc" />
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
              <TaskItem title="Finalize wireframes" project="E-commerce redesign" />
              <TaskItem title="Setup CI/CD pipeline" project="SaaS MVP" />
              <TaskItem title="Client feedback review" project="Custom CRM" blocked />
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

import { InteractiveCheck } from "@/components/ui/InteractiveCheck";

function FollowUpItem({ title, company, urgent }: any) {
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${urgent ? 'border-red-500/30 bg-red-500/5' : 'border-border-subtle bg-surface-elevated/30'} hover:border-accent/50 transition-colors group cursor-pointer`}>
      <InteractiveCheck type="circle" />
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
      <InteractiveCheck type="square" />
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
