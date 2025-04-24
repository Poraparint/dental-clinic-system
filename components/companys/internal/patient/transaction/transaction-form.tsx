"use client";

import * as z from "zod";

//params
import { useParams, useRouter } from "next/navigation";

//react
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays } from "date-fns";

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
import { Input } from "@/components/ui/input";
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
import { CreateTransactionSchema } from "@/schemas";

//props
import { CardCategory } from "@/components/props/card-category";
import { SelectCategory } from "@/components/companys/internal/category/select-category";

//actions
import { createTransaction } from "@/actions/company/public/transaction";
import { Textarea } from "@/components/ui/textarea";

interface CreateTransactionFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  companyId: string;
}

export const CreateTransactionForm = ({
  setOpen,
  onSuccess,
  companyId,
}: CreateTransactionFormProps) => {
  const params = useParams();
  const patientId = params.patientId as string;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateTransactionSchema>>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      datetime: new Date(),
      transactionCategoryId: "",
      detail: "",
      price: 0,
      paid: 0,
    },
  });

  const OnSubmit = (values: z.infer<typeof CreateTransactionSchema>) => {
    startTransition(() => {
      createTransaction(values, patientId, companyId)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);
            router.refresh();
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
        <CardCategory icon={<Circle size={15} />} title="รายการธุรกกรม">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="datetime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    เลือกวันที่
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
                          <CalendarIcon className="mr-2 h-4 w-4" />
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
              name="transactionCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    ประเภทการทำธุรกรรม
                  </FormLabel>
                  <SelectCategory
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                    companyId={companyId}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* แถวที่สอง: รายละเอียด */}
          <FormField
            control={form.control}
            name="detail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  รายละเอียด
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isPending}
                    placeholder="กรอกรายละเอียดการทำธุรกรรม"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* แถวที่สาม: ราคาและการชำระเงิน */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">ราคา</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        ฿
                      </span>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="0.00"
                        type="number"
                        className="pl-8"
                        value={field.value === 0 ? "" : field.value}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    จ่ายแล้ว
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        ฿
                      </span>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="0.00"
                        type="number"
                        className="pl-8"
                        value={field.value === 0 ? "" : field.value}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardCategory>
        <Button
          className="flex justify-self-end px-9"
          typeof="submit"
          size="lg"
          disabled={isPending}
        >
          เพิ่มรายการใหม่
        </Button>
      </form>
    </Form>
  );
};
