"use client";

import * as z from "zod";

//react
import { useForm } from "react-hook-form";
import { useTransition } from "react";
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
import { Info, User } from "lucide-react";
import { toast } from "sonner";

//schema
import { CreatePatientSchema } from "@/schemas";

//props
import { CardCategory } from "@/components/shared/card";

//actions
import {
  createPatient,
  updatePatient,
} from "@/hooks/internal/company/use-patient";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { useCompany } from "@/context/context";
import { PatientFormData } from "@/types";

interface CreatePatientFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  patientData?: PatientFormData;
}

export const CreatePatientForm = ({
  setOpen,
  onSuccess,
  patientData,
}: CreatePatientFormProps) => {
  const { companyId } = useCompany();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreatePatientSchema>>({
    resolver: zodResolver(CreatePatientSchema),
    defaultValues: patientData ?? {
      name: "",
      phone: "",
      age: "",
      address: "",
      job: "",
      work: "",
      worktel: "",
      cd: "",
      drug: "",
    },
  });

  const OnSubmit = (values: z.infer<typeof CreatePatientSchema>) => {
    startTransition(async () => {
      let data;

      if (patientData?.id) {
        data = await updatePatient(values, companyId, patientData.id);
      } else {
        data = await createPatient(values, companyId);
      }

      if (data.error) {
        toast.error(data.error, {
          description: data.description,
        });
      } else if (data.success) {
        toast.success(data.success);
        setOpen(false);
        onSuccess?.();
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(OnSubmit)}>
        <CardCategory
          icon={<User />}
          title="ข้อมูลหลัก"
          description="ข้อมูลส่วนตัวพื้นฐานของคนไข้"
        >
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
        <CardCategory
          icon={<Info />}
          title="ข้อมูลเพิ่มเติม"
          description="รายละเอียดเพิ่มเติมเกี่ยวกับคนไข้"
        >
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
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="เบาหวาน, โลหิตจาง, ..."
                      />
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
        <div className="flex justify-end">
          <SubmitButton
            label={patientData?.id ? "อัพเดตข้อมูล" : "เพิ่มบัตรใหม่"}
            type="submit"
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
