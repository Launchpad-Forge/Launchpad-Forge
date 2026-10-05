'use client';
import { useState, useTransition } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { CRM_RECORDS, type RecordKind } from '@/lib/crm-records';
import { saveCrmRecord, deleteCrmRecord } from '@/app/crm/recordActions';
export type CrmRow = { id: string; label: string; status: string; amount?: number; values: Record<string, string | number | null> };
export type CrmOptions = Record<string, { id: string; label: string }[]>;
export default function RecordsClient({ kind, rows, options }: { kind: RecordKind; rows: CrmRow[]; options: CrmOptions }) {
  const config = CRM_RECORDS[kind];
  const [editing, setEditing] = useState<CrmRow | null | undefined>();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();
  const filtered = rows.filter(row => (!status || row.status === status) && row.label.toLowerCase().includes(search.toLowerCase()));
  function save(form: FormData) {
    startTransition(async () => {
      setError('');
      const result = await saveCrmRecord(kind, editing?.id ?? null, form);
      if (result.success) setEditing(undefined); else setError(result.error ?? 'Unable to save.');
    });
  }
  return <div className="space-y-6">
    <div className="flex justify-between items-center"><h1 className="heading-md">{config.title}</h1><button onClick={() => { setError(''); setEditing(null); }} className="flex items-center gap-2 bg-accent text-background rounded-lg px-4 py-2"><Plus className="w-4 h-4" />Add record</button></div>
    {error && <p role="alert" className="text-accent">{error}</p>}
    <div className="flex gap-3"><input aria-label="Search records" placeholder="Search records" value={search} onChange={e => setSearch(e.target.value)} className="bg-surface border border-border-subtle rounded-lg px-3 py-2" /><select aria-label="Filter status" value={status} onChange={e => setStatus(e.target.value)} className="bg-surface border border-border-subtle rounded-lg px-3 py-2"><option value="">All statuses</option>{[...new Set(rows.map(r => r.status))].filter(Boolean).map(s => <option key={s}>{s}</option>)}</select></div>
    <div className="glass rounded-xl overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border-subtle"><th className="p-4 text-left">Record</th><th className="p-4 text-left">Status</th><th className="p-4 text-left">Amount</th><th className="p-4 text-right">Actions</th></tr></thead><tbody>{filtered.map(row => <tr key={row.id} className="border-b border-border-subtle"><td className="p-4">{row.label}</td><td className="p-4">{row.status || '—'}</td><td className="p-4">{row.amount === undefined ? '—' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(row.amount)}</td><td className="p-4"><div className="flex justify-end gap-3">{kind !== 'payments' && <button aria-label={`Edit ${row.label}`} disabled={pending} onClick={() => { setError(''); setEditing(row); }}><Pencil className="w-4 h-4" /></button>}<button aria-label={`Delete ${row.label}`} disabled={pending} onClick={() => { if (confirm('Delete this record?')) startTransition(async () => { const result = await deleteCrmRecord(kind, row.id); setError(result.error ?? ''); }); }}><Trash2 className="w-4 h-4" /></button></div></td></tr>)}</tbody></table>{!filtered.length && <p className="p-8 text-text-muted">No records found.</p>}</div>
    <Drawer isOpen={editing !== undefined} onClose={() => { if (!pending) setEditing(undefined); }} title={`${editing ? 'Edit' : 'Add'} record`}><form key={editing?.id ?? 'new'} action={save} className="space-y-4">{config.fields.map(field => {
      const value = editing?.values[field.name] ?? (field.values?.[0] ?? (field.type === 'number' ? 0 : ''));
      return <label key={field.name} className="block text-sm text-text-secondary">{field.label}{field.options || field.values ? <select name={field.name} required={field.required} defaultValue={String(value)} className="mt-1 w-full bg-surface-elevated border border-border-subtle rounded-lg px-3 py-2">{field.options && <option value="">Select a record</option>}{field.values?.map(v => <option key={v}>{v}</option>)}{options[field.options ?? '']?.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}</select> : <input name={field.name} type={field.type ?? 'text'} step={field.type === 'number' ? '0.01' : undefined} min={field.type === 'number' ? 0 : undefined} required={field.required} defaultValue={String(value)} className="mt-1 w-full bg-surface-elevated border border-border-subtle rounded-lg px-3 py-2" />}</label>;
    })}{error && <p role="alert" className="text-accent">{error}</p>}<button disabled={pending} className="bg-accent text-background rounded-lg px-4 py-2 disabled:opacity-50">{pending ? 'Saving…' : 'Save record'}</button></form></Drawer>
  </div>;
}

