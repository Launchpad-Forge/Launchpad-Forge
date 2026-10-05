import { getServicesAction } from './actions';
import ServicesClient from './ServicesClient';

export default async function ServicesPage() {
  const services = await getServicesAction();
  return <ServicesClient initialServices={services as any} />;
}
