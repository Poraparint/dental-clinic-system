import { auth } from "@/auth";

//cookies
import { cookies } from "next/headers";

//bar
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import { Navbar } from "../_components/navbar";

type CompanyLayoutProps = {
  children: React.ReactNode;
  params: { companyId: string };
};

export default async function CompanyLayout({
  children,
}: CompanyLayoutProps) {

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const session = await auth();

  if (!session?.user) {
    return { error: "Unauthentication" };
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex w-screen h-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="flex flex-1 flex-col overflow-auto">
          <Navbar />
          <div className="p-4">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
