import { TriangleAlert } from "lucide-react";

//ui
import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login page"
    >
      <TriangleAlert/>
    </CardWrapper>
  );
};
