import { CardCategory } from "@/components/props/card-category";
import { Hospital } from "lucide-react";

//actions
import { ShowMinistrys } from "@/actions/show-ministrys";

//props
import { CardMinistry } from "@/components/props/card-ministry";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FormNotFound } from "@/components/form-not-found";

export const CompanyCard = async () => {
  const companys = await ShowMinistrys();

  return (
    <CardCategory
      icon={<Hospital />}
      title="Dental Clinic"
      description="Manage your dental clinic"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(companys) ? (
          companys.map((company) => (
            <CardMinistry
              key={company.id}
              linkname={`/${company.id}${DEFAULT_LOGIN_REDIRECT}`}
              name={company.name}
              description={company.description}
              createdAt={company.createdAt}
              updatedAt={company.updatedAt}
            />
          ))
        ) : (
          <FormNotFound
            message={companys.error}
            description={companys.description}
            url={companys.url}
            urlname={companys.urlname}
          />
        )}
      </div>
    </CardCategory>
  );
};
