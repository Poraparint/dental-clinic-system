"use client";

import * as z from "zod";
//params
import { useParams } from "next/navigation";

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
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { CreatePatientSchema } from "@/schemas";

//actions
import { CardCategory } from "@/components/props/card-category";
import { ScanLine, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { createPatient } from "@/actions/company/public/patient";

interface CreatePatientFormProps {
  setOpen: (open: boolean) => void;
}

export const CreatePatientForm = ({ setOpen }: CreatePatientFormProps) => {

    const params = useParams();
    const companyId = params.companyId as string;

  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreatePatientSchema>>({
    resolver: zodResolver(CreatePatientSchema),
    defaultValues: {
      name: "",
      phone: "",
      age: 0,
      address: "",
      job: "",
      work: "",
      worktel: "",
      cd: "",
      drug: "",
    },
  });

  const OnSubmit = (values: z.infer<typeof CreatePatientSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createPatient(values, companyId)
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
      <form onSubmit={form.handleSubmit(OnSubmit)}>
        <div className="flex">
          <CardCategory icon={<User />} title="ข้อมูลผู้ใช้">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>age</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="age"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardCategory>
          <CardCategory icon={<ScanLine />} title="รายละเอียด">
            <FormField
              control={form.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>job</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="job" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="work"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>work</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="work" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="worktel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>worktel</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="worktel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>cd</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="cd" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="drug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>drug</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="drug" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardCategory>
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          typeof="submit"
          className="w-full py-7 mt-7 text-base"
          disabled={isPending}
        >
          เพิ่มบัตรใหม่
        </Button>
      </form>
    </Form>
  );
};
