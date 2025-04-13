"use client";

import { checkCompanyPermission } from "@/data/company-permissions";
import { CompanyRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface CompanyRouteGuardProps{
    children: React.ReactNode;
    requiredRole: CompanyRole;
    companyId?: string;
}


export const CompanyRouteGuard = ({
    children,
    requiredRole,
    companyId
}: CompanyRouteGuardProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;

        if (!session?.user?.companyRoles) {
            router.push('/auth/login');
            return;
        }

        const hasPermission = checkCompanyPermission(
            session.user.companyRoles,
            requiredRole,
            companyId
        );

        if (!hasPermission) {
            router.push("/auth/login");
        }
    },
        [status, session, requiredRole, companyId, router]);
    
    if (status === 'loading' || !session?.user?.companyRoles) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};