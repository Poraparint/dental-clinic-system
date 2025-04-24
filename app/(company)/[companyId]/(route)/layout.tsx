import { AppSidebar } from "@/app/(company)/_components/app-sidebar";
import { Navbar } from "@/app/(company)/_components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

type CompanyLayoutProps = {
  children: React.ReactNode;
};

export default async function CompanyLayout({ children }: CompanyLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex w-screen h-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="flex flex-1 flex-col overflow-auto">
          <Navbar />
          <div className="m-3 p-5 border rounded-md bg-primary-foreground mb-40">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
