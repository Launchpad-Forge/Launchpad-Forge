'use client';
import { useState, useTransition } from 'react';
import { updateProfile, updatePassword, exportCrmData } from './actions';
export default function SettingsClient({ name, email }: { name: string; email: string }) {
  const [message, setMessage] = useState('');
  const [pending, startTransition] = useTransition();
  function submit(action: typeof updateProfile, form: FormData) {
    startTransition(async () => {
      const result = await action(form);
      setMessage(result.success ? 'Changes saved.' : result.error ?? 'Unable to save changes.');
    });
  }
  return <div className="space-y-6 max-w-3xl"><h1 className="heading-md">Settings</h1><p className="text-text-secondary">{email}</p><p role="status">{message}</p><form action={form => submit(updateProfile, form)} className="glass p-6 rounded-xl space-y-4"><h2 className="heading-sm">Profile</h2><label className="block">Name<input name="name" defaultValue={name} required className="block w-full bg-surface-elevated border border-border-subtle rounded-lg px-3 py-2 mt-2" /></label><button disabled={pending} className="bg-accent text-background px-4 py-2 rounded-lg">Save profile</button></form><form action={form => submit(updatePassword, form)} className="glass p-6 rounded-xl space-y-4"><h2 className="heading-sm">Change password</h2><label className="block">Current password<input name="currentPassword" type="password" autoComplete="current-password" required className="block w-full bg-surface-elevated border border-border-subtle rounded-lg px-3 py-2 mt-2" /></label><label className="block">New password<input name="password" type="password" autoComplete="new-password" required minLength={12} className="block w-full bg-surface-elevated border border-border-subtle rounded-lg px-3 py-2 mt-2" /></label><label className="block">Confirm password<input name="confirmPassword" type="password" autoComplete="new-password" required minLength={12} className="block w-full bg-surface-elevated border border-border-subtle rounded-lg px-3 py-2 mt-2" /></label><button disabled={pending} className="bg-accent text-background px-4 py-2 rounded-lg">Update password</button></form><button disabled={pending} className="border border-border-subtle rounded-lg px-4 py-2" onClick={() => startTransition(async () => { try { const content = await exportCrmData(); const url = URL.createObjectURL(new Blob([content], { type: 'application/json' })); const link = document.createElement('a'); link.href = url; link.download = 'crm-export.json'; link.click(); URL.revokeObjectURL(url); setMessage('Export downloaded.'); } catch { setMessage('Unable to export CRM data. Please try again.'); } })}>Export CRM data</button></div>;
}
