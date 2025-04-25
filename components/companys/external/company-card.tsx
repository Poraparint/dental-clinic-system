"use client";
import { CardCategory } from "@/components/props/card-category";
import { Hospital } from "lucide-react";

//props
import { CardMinistry } from "@/components/props/card-ministry";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FormNotFound } from "@/components/form-not-found";
import { useEffect, useState } from "react";
import { Loading } from "@/components/loading";

interface Ministry {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface MinistrysError {
  error: string;
  description?: string;
  url?: string;
  urlname?: string;
}

export const CompanyCard = () => {
  const [ministrys, setMinistrys] = useState<
    Ministry[] | MinistrysError | null
  >(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchMinistry = async () => {
      try {
        const response = await fetch("/api/companies");

        const data = await response.json();
        setMinistrys(data);
      } catch (error) {
        console.error("Error fetching ministrys:", error);
        setMinistrys({
          error: "ยินดีต้อนรับสู่แดชบอร์ด",
          description: "เริ่มต้นใช้งานด้วยการสร้างหน่วยงานแรก",
          url: "/dashboard/create-ministry",
          urlname: "Create Ministry",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMinistry();
  }, []);

  if (loading) return <Loading />;

  return (
    <CardCategory
      icon={<Hospital />}
      title="Dental Clinic"
      description="Manage your dental clinic"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(ministrys) ? (
          ministrys.map((ministry) => (
            <CardMinistry
              key={ministry.id}
              linkname={`/${ministry.id}${DEFAULT_LOGIN_REDIRECT}`}
              name={ministry.name}
              description={ministry.description}
              createdAt={ministry.createdAt}
              updatedAt={ministry.updatedAt}
            />
          ))
        ) : (
          <FormNotFound
            message={ministrys?.error}
            description={ministrys?.description}
            url={ministrys?.url}
            urlname={ministrys?.urlname}
          />
        )}
      </div>
    </CardCategory>
  );
};
