"use client";

import * as z from "zod";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTransition, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { LoginSchema } from "@/schemas";

//action
import { managerLogin } from "@/hooks/external/auth/use-manager";

//ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CardWrapper } from "@/components/props/wrapper/card-wrapper";
import { MANAGER_LOGIN_REDIRECT } from "@/routes";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || MANAGER_LOGIN_REDIRECT;
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
      const isDemo = searchParams.get("demo") === "true";
      const demoEmail = searchParams.get("email");
  const demoPassword = searchParams.get("password");
  
  const [showTwoFactor, setShowTwoFactor] = useState(false);


  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isDemo && demoEmail && demoPassword) {
      form.setValue("email", demoEmail);
      form.setValue("password", demoPassword);
    }
  }, [isDemo, demoEmail, demoPassword, form]);

  const OnSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const data = await managerLogin(values, callbackUrl);

      if (data?.redirect) {
        window.location.href = data.redirect;
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      if (data?.error) {
        setError(data.error);
      }

      if (data?.success) {
        setSuccess(data.success);
      }

      if (data?.twoFactor) {
        setShowTwoFactor(true);
      }
    });
  };

  return (
    <CardWrapper>
      {isDemo && (
        <div className="mb-4 p-3 bg-emerald-bg border border-emerald-border rounded-lg">
          <p className="text-sm text-emerald-text">
            🎯 <strong>โหมดทดลองใช้งาน</strong>
          </p>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-4">
          <div className="space-y-3">
            {showTwoFactor && (
              <FormField
                defaultValue=""
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>อีเมล</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="johndoe@gmail.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รหัสผ่าน</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="********"
                          type="password"
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal justify-start text-charoite"
                      >
                        <Link href="/auth/reset">ลืมรหัสผ่าน?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            typeof="submit"
            className="w-full py-5 mt-7 text-base"
            disabled={isPending}
          >
            {showTwoFactor ? "ยืนยัน" : "เข้าสู่ระบบ"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
