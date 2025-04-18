import { PublicNavbar } from "@/components/public/navbar";

interface DashboardMinistryLayoutProps {
  children: React.ReactNode;
}

const DashboardMinistryLayout = ({
  children,
}: DashboardMinistryLayoutProps) => {
    return (
      <>
        <PublicNavbar />
        <div className="p-5">{children}</div>
      </>
    );
};

export default DashboardMinistryLayout;
