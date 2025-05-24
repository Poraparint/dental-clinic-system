"use client";
import { CardCategory } from "@/components/shared/card/card-category";
import { Hospital } from "lucide-react";

//props
import { CardMinistry } from "@/components/props/component/card/card-ministry";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FormNotFound } from "@/components/form-not-found";
import { Loading } from "@/components/loading";
import { useMinistry } from "@/hooks/external/use-ministry";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { CompanyRole } from "@prisma/client";
import { useNavigation } from "@/hooks/use-navigation";
import { NavigatingUi } from "@/components/props/component/navigating";

export const CompanyCard = () => {
  const { ministries, error, isLoading } = useMinistry();
  const { isNavigating, navigateTo } = useNavigation();

  const handleCardClick = (ministryId: string) => {
    navigateTo(`/${ministryId}${DEFAULT_LOGIN_REDIRECT}`);
  };

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <FormNotFound message={error?.error} description={error?.description} />
    );
  }

  return (
    <>
      {isNavigating && <NavigatingUi />}
      <RoleGate allowedRole={[CompanyRole.MANAGER]}>
        <CardCategory
          icon={<Hospital />}
          title="Dental Clinic"
          description="Manage your dental clinic"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ministries.map((ministry) => (
              <CardMinistry
                key={ministry.id}
                onClick={() => handleCardClick(ministry.id)}
                name={ministry.name}
                description={ministry.description}
              />
            ))}
          </div>
        </CardCategory>
      </RoleGate>
    </>
  );
};
