import { getPortfolioProjectsAction } from './actions';
import PortfolioClient from './PortfolioClient';
import { requireCrmUser } from '@/lib/crm-auth';

export default async function PortfolioPage() {
  await requireCrmUser();
  const projects = await getPortfolioProjectsAction();
  return <PortfolioClient initialProjects={projects} />;
}
