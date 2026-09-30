"use client";

import { useState } from "react";
import { Save, User, Database, Bell, Shield, Blocks, CreditCard, Download, Trash2, Key, Check, Plus, ExternalLink } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [isSaved, setIsSaved] = useState(false);

  // Settings State
  const [profile, setProfile] = useState({ name: "Launchpad Forge", email: "admin@launchpadforge.com", currency: "INR (₹)" });
  const [notifications, setNotifications] = useState({ newLead: true, invoicePaid: true, taskAssigned: false, dailyDigest: true });
  const [integrations, setIntegrations] = useState([
    { id: 1, name: "Stripe", status: "Connected", icon: "💳" },
    { id: 2, name: "Slack", status: "Not Connected", icon: "💬" },
    { id: 3, name: "Google Workspace", status: "Connected", icon: "📧" },
    { id: 4, name: "Mailchimp", status: "Not Connected", icon: "📨" },
  ]);

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      // Simulate file download
      const element = document.createElement("a");
      const file = new Blob(["id,name,email\n1,Test,test@example.com"], {type: 'text/csv'});
      element.href = URL.createObjectURL(file);
      element.download = "crm_export.csv";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }, 1500);
  };

  const toggleIntegration = (id: number) => {
    setIntegrations(integrations.map(int => 
      int.id === id ? { ...int, status: int.status === "Connected" ? "Not Connected" : "Connected" } : int
    ));
  };

  const tabs = [
    { name: "General", icon: User },
    { name: "Notifications", icon: Bell },
    { name: "Security", icon: Shield },
    { name: "Integrations", icon: Blocks },
    { name: "Billing", icon: CreditCard },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl relative">
      
      {/* Modals */}
      {passwordModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border-subtle rounded-xl w-full max-w-md shadow-2xl p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2"><Key className="w-5 h-5 text-accent"/> Change Password</h2>
            <div className="space-y-4">
              <div><label className="text-sm text-text-secondary">Current Password</label><input type="password" placeholder="••••••••" className="w-full mt-1 bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none" /></div>
              <div><label className="text-sm text-text-secondary">New Password</label><input type="password" placeholder="••••••••" className="w-full mt-1 bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none" /></div>
              <div><label className="text-sm text-text-secondary">Confirm New Password</label><input type="password" placeholder="••••••••" className="w-full mt-1 bg-surface-elevated border border-border-subtle rounded-md px-3 py-2 text-sm focus:border-accent outline-none" /></div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setPasswordModalOpen(false)} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary">Cancel</button>
              <button onClick={() => { setPasswordModalOpen(false); alert("Password updated successfully"); }} className="px-4 py-2 text-sm bg-accent text-white rounded-md">Update Password</button>
            </div>
          </div>
        </div>
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border-subtle rounded-xl w-full max-w-md shadow-2xl p-6">
            <h2 className="font-semibold text-lg mb-2 text-red-500 flex items-center gap-2"><Trash2 className="w-5 h-5"/> Delete Account</h2>
            <p className="text-sm text-text-secondary mb-4">Are you absolutely sure you want to delete your account? This action cannot be undone and all CRM data will be permanently erased.</p>
            <div><label className="text-sm text-text-secondary">Type "DELETE" to confirm</label><input type="text" className="w-full mt-1 bg-surface-elevated border border-red-500/30 rounded-md px-3 py-2 text-sm focus:border-red-500 outline-none" /></div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary">Cancel</button>
              <button onClick={() => { setDeleteModalOpen(false); alert("Account deletion initiated"); }} className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">Permanently Delete</button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="heading-md">Settings</h1>
        <p className="text-text-secondary mt-1">Manage your agency preferences, integrations, and billing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
          {tabs.map((tab) => (
            <div
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`p-2 rounded-md cursor-pointer flex items-center gap-3 transition-colors ${
                activeTab === tab.name
                  ? "bg-surface-elevated font-medium text-accent border border-border-accent"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </div>
          ))}
        </div>

        <div className="md:col-span-3 space-y-6">
          {activeTab === "General" && (
            <>
              <div className="glass rounded-xl p-6 border border-border-subtle animate-in fade-in">
                <h2 className="font-semibold text-lg flex items-center gap-2 mb-6">
                  <User className="w-5 h-5 text-accent" />
                  Agency Profile
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Agency Name</label>
                    <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Primary Email</label>
                    <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Currency</label>
                    <select value={profile.currency} onChange={e => setProfile({...profile, currency: e.target.value})} className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors">
                      <option>INR (₹)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 border border-border-subtle animate-in fade-in">
                <h2 className="font-semibold text-lg flex items-center gap-2 mb-6">
                  <Database className="w-5 h-5 text-blue-500" />
                  Data Management
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-surface-elevated rounded-lg border border-border-subtle">
                    <div>
                      <h3 className="font-medium">Export Data</h3>
                      <p className="text-sm text-text-secondary">Download all CRM records as CSV</p>
                    </div>
                    <button onClick={handleExport} disabled={exporting} className="flex items-center gap-2 bg-surface-glass border border-border-subtle px-4 py-2 rounded-md text-sm hover:border-accent transition-colors disabled:opacity-50">
                      {exporting ? <span className="animate-spin">⏳</span> : <Download className="w-4 h-4"/>}
                      {exporting ? "Exporting..." : "Export CSV"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "Notifications" && (
            <div className="glass rounded-xl p-6 border border-border-subtle animate-in fade-in">
              <h2 className="font-semibold text-lg flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-accent" />
                Notification Preferences
              </h2>
              <div className="space-y-6">
                {[
                  { id: 'newLead', label: 'New Lead Alerts', desc: 'Get notified when a new lead is captured', val: notifications.newLead },
                  { id: 'invoicePaid', label: 'Invoice Paid', desc: 'Get notified when a payment is received', val: notifications.invoicePaid },
                  { id: 'taskAssigned', label: 'Task Assigned', desc: 'Get notified when someone assigns a task to you', val: notifications.taskAssigned },
                  { id: 'dailyDigest', label: 'Daily Digest', desc: 'Receive a daily email summary of activities', val: notifications.dailyDigest },
                ].map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-sm">{item.label}</h3>
                      <p className="text-xs text-text-secondary">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => setNotifications({...notifications, [item.id]: !item.val})}
                      className={`relative w-11 h-6 rounded-full transition-colors ${item.val ? 'bg-accent' : 'bg-surface-elevated border border-border-subtle'}`}
                    >
                      <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${item.val ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Security" && (
            <div className="glass rounded-xl p-6 border border-border-subtle animate-in fade-in">
              <h2 className="font-semibold text-lg flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-accent" />
                Security Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-1">Password & Authentication</h3>
                  <p className="text-xs text-text-secondary mb-3">Update your password to keep your account secure.</p>
                  <button onClick={() => setPasswordModalOpen(true)} className="bg-surface-elevated border border-border-subtle px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:border-accent transition-colors">
                    <Key className="w-4 h-4"/> Change Password
                  </button>
                </div>
                
                <div className="mt-8 pt-6 border-t border-border-subtle">
                  <h3 className="text-sm text-red-500 font-medium mb-2">Danger Zone</h3>
                  <p className="text-xs text-text-secondary mb-3">Permanently delete your account and all associated data.</p>
                  <button onClick={() => setDeleteModalOpen(true)} className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-md flex items-center gap-2 text-sm hover:bg-red-500/20 transition-colors">
                    <Trash2 className="w-4 h-4"/> Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "Integrations" && (
            <div className="glass rounded-xl p-6 border border-border-subtle animate-in fade-in">
              <h2 className="font-semibold text-lg flex items-center gap-2 mb-6">
                <Blocks className="w-5 h-5 text-accent" />
                Connected Apps
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {integrations.map(app => (
                  <div key={app.id} className="p-4 bg-surface-elevated rounded-lg border border-border-subtle flex flex-col justify-between h-32">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{app.icon}</span>
                      <h3 className="font-medium">{app.name}</h3>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${app.status === 'Connected' ? 'bg-green-500/10 text-green-500' : 'bg-surface border border-border-subtle text-text-secondary'}`}>
                        {app.status}
                      </span>
                      <button onClick={() => toggleIntegration(app.id)} className="text-sm font-medium text-accent hover:underline">
                        {app.status === 'Connected' ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Billing" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="glass rounded-xl p-6 border border-border-subtle">
                <h2 className="font-semibold text-lg flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-accent" />
                  Subscription Plan
                </h2>
                <div className="flex justify-between items-center bg-gradient-to-r from-accent/10 to-transparent border border-accent/20 p-4 rounded-lg">
                  <div>
                    <h3 className="font-bold text-accent">Pro Agency Plan</h3>
                    <p className="text-sm text-text-secondary">₹4,999 / month • Renews on Nov 1, 2026</p>
                  </div>
                  <button className="bg-accent text-white px-4 py-2 rounded-md text-sm shadow-lg shadow-accent/20 hover:bg-accent/90">
                    Upgrade Plan
                  </button>
                </div>
              </div>

              <div className="glass rounded-xl p-6 border border-border-subtle">
                <h2 className="font-semibold text-lg mb-4">Payment Methods</h2>
                <div className="flex items-center justify-between p-4 bg-surface-elevated rounded-lg border border-border-subtle mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-blue-900 rounded flex items-center justify-center text-[10px] text-white font-bold italic">VISA</div>
                    <div>
                      <p className="text-sm font-medium">Visa ending in 4242</p>
                      <p className="text-xs text-text-muted">Expires 12/28</p>
                    </div>
                  </div>
                  <span className="text-xs bg-surface border border-border-subtle px-2 py-1 rounded text-text-secondary">Default</span>
                </div>
                <button className="text-sm text-accent font-medium flex items-center gap-1 hover:underline">
                  <Plus className="w-4 h-4"/> Add Payment Method
                </button>
              </div>

              <div className="glass rounded-xl p-6 border border-border-subtle">
                <h2 className="font-semibold text-lg mb-4">Billing History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-border-subtle text-text-muted">
                        <th className="pb-2 font-medium">Date</th>
                        <th className="pb-2 font-medium">Amount</th>
                        <th className="pb-2 font-medium">Status</th>
                        <th className="pb-2 font-medium">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      <tr>
                        <td className="py-3">Oct 1, 2026</td>
                        <td className="py-3">₹4,999</td>
                        <td className="py-3"><span className="text-green-500 flex items-center gap-1"><Check className="w-3 h-3"/> Paid</span></td>
                        <td className="py-3"><button className="text-accent hover:underline flex items-center gap-1"><ExternalLink className="w-3 h-3"/> PDF</button></td>
                      </tr>
                      <tr>
                        <td className="py-3">Sep 1, 2026</td>
                        <td className="py-3">₹4,999</td>
                        <td className="py-3"><span className="text-green-500 flex items-center gap-1"><Check className="w-3 h-3"/> Paid</span></td>
                        <td className="py-3"><button className="text-accent hover:underline flex items-center gap-1"><ExternalLink className="w-3 h-3"/> PDF</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button 
              onClick={handleSave}
              className={`flex items-center gap-2 text-white px-6 py-2.5 rounded-md font-medium transition-all shadow-lg ${
                isSaved ? "bg-green-500 shadow-green-500/20" : "bg-accent hover:bg-accent/90 shadow-accent/20"
              }`}
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {isSaved ? "Saved Successfully!" : "Save All Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
