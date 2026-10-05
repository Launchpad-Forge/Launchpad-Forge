'use client';
import { useState, useTransition } from 'react';
import { createContactAction } from '@/app/crm/contacts/actions';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
export function ContactForm({ companies = [], onSuccess }: { companies?: { id: string; name: string }[]; onSuccess?: () => void }) {
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();
  return <form className="space-y-6" action={form => startTransition(async () => {
    const result = await createContactAction(form);
    if (result.success) { setError(''); onSuccess?.(); } else setError(result.error ?? Object.values(result.fieldErrors ?? {}).flat().join(' '));
  })}><FormInput name="name" label="Full name" required /><FormInput name="email" type="email" label="Email" /><FormInput name="phone" type="tel" label="Phone" /><FormSelect name="companyId" label="Company" options={companies.map(c => ({ value: c.id, label: c.name }))} />{error && <p role="alert" className="text-accent">{error}</p>}<button disabled={pending} className="bg-accent text-background rounded-lg px-4 py-2">{pending ? 'Saving…' : 'Create contact'}</button></form>;
}

