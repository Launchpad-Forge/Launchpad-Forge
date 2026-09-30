import CrmSidebar from "@/components/layout/CrmSidebar";
import CrmHeader from "@/components/layout/CrmHeader";

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground">
      <CrmSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <CrmHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
