import { requireCrmUser } from '@/lib/crm-auth';
import SettingsClient from './SettingsClient';
export default async function SettingsPage() {
  const { user } = await requireCrmUser();
  return <SettingsClient name={user.user_metadata.name ?? ''} email={user.email ?? ''} />;
}
