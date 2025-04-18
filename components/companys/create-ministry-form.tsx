"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

import { CreateCompanySchema } from "@/schemas";

//actions
import { createCompany } from "@/actions/manager/company";
import { CardCategory } from "@/components/props/card-category";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

interface CreateMinistryFormProps {
  setOpen: (open: boolean) => void;
}

export const CreateMinistryForm = ({ setOpen }: CreateMinistryFormProps) => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateCompanySchema>>({
    resolver: zodResolver(CreateCompanySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const OnSubmit = (values: z.infer<typeof CreateCompanySchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createCompany(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            setSuccess(data.success);
            router.refresh();
            setOpen(false);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-4">
        <CardCategory icon={<User />} title="ข้อมูลผู้ใช้">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ministry name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Dental-clinic-ministry"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="des" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardCategory>

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          typeof="submit"
          className="w-full py-7 mt-7 text-base"
          disabled={isPending}
        >
          Create Ministry
        </Button>
      </form>
    </Form>
  );
};
