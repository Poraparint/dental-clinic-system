"use client";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";

//ui
import { CardWrapper } from "@/components/props/wrapper/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useVerifyEmail } from "@/hooks/external/auth/use-verify";

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const { error, success, isLoading } = useVerifyEmail(token);

  return (
    <CardWrapper
      headerLabel="Confirming your vertification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center">
        {isLoading && <BeatLoader />}
        <FormSuccess message={success?.success} />
        {!success && <FormError message={error?.error} />}
      </div>
    </CardWrapper>
  );
};
