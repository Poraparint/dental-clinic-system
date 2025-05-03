"use client";
import { CardCategory } from "@/components/props/wrapper/card-category";
import { Hospital } from "lucide-react";

//props
import { CardMinistry } from "@/components/props/component/card-ministry";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FormNotFound } from "@/components/form-not-found";
import { Loading } from "@/components/loading";
import { useMinistry } from "@/hooks/external/use-ministry";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { CompanyRole } from "@prisma/client";

export const CompanyCard = () => {
  const { ministries, isLoading } = useMinistry();

  if (isLoading) return <Loading />;

  return (
    <RoleGate allowedRole={[CompanyRole.MANAGER]}>
      <CardCategory
        icon={<Hospital />}
        title="Dental Clinic"
        description="Manage your dental clinic"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(ministries) ? (
            ministries.map((ministry) => (
              <CardMinistry
                key={ministry.id}
                linkname={`/${ministry.id}${DEFAULT_LOGIN_REDIRECT}`}
                name={ministry.name}
                description={ministry.description}
              />
            ))
          ) : (
            <FormNotFound
              message={ministries?.error}
              description={ministries?.description}
            />
          )}
        </div>
      </CardCategory>
    </RoleGate>
  );
};
