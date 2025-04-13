"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { RegisterSchema } from "@/schemas";

//action
import { register } from "@/actions/auth/register";

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

//props
import { CardWrapper } from "@/components/props/card-wrapper";
import { FormCategory } from "../../props/form-category";
import { Hospital, User } from "lucide-react";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      companyname: "",
    },
  });

  const OnSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Create your Clinic"
      headerDescription="Register your clinic to get started"
      backButtonLabel="have an account?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-4">
          <FormCategory icon={<User />} title="ข้อมูลผู้ใช้">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john doe"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="********"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormCategory>
          <FormCategory icon={<Hospital />} title="ข้อมูลบริษัท">
            <FormField
              control={form.control}
              name="companyname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinic-name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="your-clinic-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormCategory>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            typeof="submit"
            className="w-full py-7 mt-7 text-base"
            disabled={isPending}
          >
            Create Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
