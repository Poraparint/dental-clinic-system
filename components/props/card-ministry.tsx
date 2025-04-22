import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
interface CardMinistryProps {
  linkname?: string | null;
  name?: string | null;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export const CardMinistry = ({
  linkname,
  name,
  description,
  createdAt,
  updatedAt,
}: CardMinistryProps) => {
  return (
    <Link
      href={linkname || "#"}
      className="cursor-pointer block transition-all duration-200 hover:transform"
    >
      <Card className="bg-primary-foreground hover:border-foreground/20 hover:shadow-md transition-all size-full border-2">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          {createdAt}
          {updatedAt}
        </CardFooter>
      </Card>
    </Link>
  );
};
