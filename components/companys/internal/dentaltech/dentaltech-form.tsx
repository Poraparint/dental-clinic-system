"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
//icons
import { Circle, CalendarIcon } from "lucide-react";
import { toast } from "sonner";

//ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//schema
import { CreateDentalTechSchema } from "@/schemas";

//props
import { CardCategory } from "@/components/props/card-category";
import { SelectCategory } from "@/components/props/select-category";

//actions
import { useParams } from "next/navigation";
import { addDays, format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { usePatients } from "@/hooks/internal/use-patient";
import { ComboboxCategories } from "@/components/props/combobox-categories";
import { useDentaltTechCategories } from "@/hooks/internal/use-dtc";
import { createDentalTech } from "@/actions/company/manager/dentaltech";

interface CreateDentaltechFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreateDentaltechForm = ({
  setOpen,
  onSuccess,
}: CreateDentaltechFormProps) => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { patients, isLoading: patientLoading } = usePatients(companyId);
  const { categories, isLoading: dctLoading } =
    useDentaltTechCategories(companyId);

  const [isPending, startTransition] = useTransition();


  const levelOptions = [
    { id: "#0369a1", name: "ปกติ" },
    { id: "#fb923c", name: "เร่งด่วน" },
    { id: "#DC143C", name: "ด่วนมาก" },
  ];

  const form = useForm<z.infer<typeof CreateDentalTechSchema>>({
    resolver: zodResolver(CreateDentalTechSchema),
    defaultValues: {
      deadline: new Date(),
      detail: "",
      level: "ปกติ",
      patientId: "",
      dctId: "",
    },
  });

  const OnSubmit = (values: z.infer<typeof CreateDentalTechSchema>) => {
    startTransition(() => {
      createDentalTech(values, companyId)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);

            setOpen(false);
            onSuccess?.();
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(OnSubmit)}>
        <CardCategory icon={<Circle size={15} />} title="รายการงานทันตกรรม">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    เลือกวันกำหนดรับงาน
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 size-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>เลือกวันที่</span>
                          )}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="start"
                        className="flex w-auto flex-col space-y-2 p-2 bg-background"
                      >
                        <Select
                          onValueChange={(value) =>
                            field.onChange(addDays(new Date(), parseInt(value)))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกรายการ" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="0">วันนี้</SelectItem>
                            <SelectItem value="1">พรุ่งนี้</SelectItem>
                            <SelectItem value="3">อีก 3 วัน</SelectItem>
                            <SelectItem value="7">อีก 1 สัปดาห์</SelectItem>
                            <SelectItem value="14">อีก 2 สัปดาห์</SelectItem>
                            <SelectItem value="28">อีก 4 สัปดาห์</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="rounded-md border">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">รายชื่อคนไข้</FormLabel>
                  <ComboboxCategories
                    options={patients.map((patient) => ({
                      value: patient.id,
                      label: patient.name,
                    }))}
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                    isLoading={patientLoading}
                    placeholder="ค้นหาคนไข้..."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dctId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">หมวดหมู่</FormLabel>
                  <SelectCategory
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                    isLoading={dctLoading}
                    categories={categories}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">รายการ</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="รายละเอียด"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">ระดับ</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <SelectTrigger className="w-[180px]">
                          <div className="flex items-center gap-2">
                            <SelectValue placeholder="เลือกระดับงาน" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {levelOptions.map((level) => (
                            <SelectItem key={level.id} value={level.name}>
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-4 w-4 rounded-full"
                                  style={{ backgroundColor: level.id }}
                                />
                                {level.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardCategory>
        <div className="flex justify-end">
          <Button
            typeof="submit"
            size="lg"
            disabled={isPending}
            className="px-9"
          >
            เพิ่มรายการใหม่
          </Button>
        </div>
      </form>
    </Form>
  );
};
