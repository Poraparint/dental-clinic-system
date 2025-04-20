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
import { Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import { createPatient } from "@/actions/company/public/patient";

interface CreatePatientFormProps {
  setOpen: (open: boolean) => void;
}

export const CreatePatientForm = ({
  setOpen,
  onSuccess,
}: CreatePatientFormProps & { onSuccess?: () => void }) => {
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
            onSuccess?.();
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(OnSubmit)}>
        <CardCategory icon={<Circle size={15} />} title="ข้อมูลหลัก">
          <div className="grid grid-cols-4 grid-rows-2 gap-2">
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อ-นามสกุล</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="ชื่อ-นามสกุล"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-start-3">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>อายุ</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="อายุ"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-start-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เบอร์ติดต่อ</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="000-0000000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 row-start-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ที่อยู่</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="000 หมู่000 ต.ตำบล อ.เมือง, ..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2 col-start-3">
              <FormField
                control={form.control}
                name="job"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>อาชีพ</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="นักบิน..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardCategory>
        <CardCategory icon={<Circle size={15} />} title="ข้อมูลเพิ่มเติม">
          <div className="grid grid-cols-4 grid-rows-2 gap-2">
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="work"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ที่ทำงาน</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="000 หมู่000 ต.ตำบล อ.เมือง, ..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 col-start-3">
              <FormField
                control={form.control}
                name="worktel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เบอร์ติดต่อที่ทำงาน</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="000-0000000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 row-start-2">
              <FormField
                control={form.control}
                name="cd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>โรคประจำตัวปัจจุบัน</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="เบาหวาน, โลหิตจาง, ..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 col-start-3 row-start-2">
              <FormField
                control={form.control}
                name="drug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ประวัติการแพ้ยา</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Topen, ..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardCategory>

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          className="flex justify-self-end px-9"
          typeof="submit"
          size="lg"
          disabled={isPending}
        >
          เพิ่มบัตรใหม่
        </Button>
      </form>
    </Form>
  );
};
