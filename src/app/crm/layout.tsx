import CrmSidebar from "@/components/layout/CrmSidebar";
import CrmHeader from "@/components/layout/CrmHeader";
import PageTransition from "@/components/layout/PageTransition";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import "@/services/workflows"; // Initialize workflows

import { requireCrmUser } from "@/lib/crm-auth";

export default async function CrmLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireCrmUser();
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background overflow-hidden text-foreground">
        <CrmSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <CrmHeader name={user.user_metadata.name ?? user.email ?? ""} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <PageTransition>
              <div className="max-w-7xl mx-auto space-y-6">
                {children}
              </div>
            </PageTransition>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
