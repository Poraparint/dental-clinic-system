"use client";

import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRecheckSchema } from "@/schemas";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils/utils";

// hooks
import { useTransactionCategories } from "@/hooks/internal/category/use-tc";

// ui
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
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// components
import { SelectCategory } from "@/components/props/component/select-category";
import { DatePickerField } from "@/components/props/component/date-picker-field";

// icons
import { FilePenLine, Plus, Trash2 } from "lucide-react";
import { CardCategory } from "@/components/props/wrapper/card-category";
import { SubmitButton } from "@/components/props/component/button/submit-button";
import { Transaction } from "@/types/transaction";
import { useScheduleCategories } from "@/hooks/internal/category/use-sc";
import { createRecheck } from "@/hooks/internal/use-recheck";

interface RecheckFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  transaction: Transaction;
}

export const RecheckForm = ({
  setOpen,
  onSuccess,
  transaction,
}: RecheckFormProps) => {
  const params = useParams();
  const companyId = params.companyId as string;
  const [isPending, startTransition] = useTransition();
  const { categories: tcCategories, isLoading: transactionLoading } =
    useTransactionCategories(companyId);
  const { categories: scCategories, isLoading: scheduleLoading } =
    useScheduleCategories(companyId);

  const form = useForm<z.infer<typeof CreateRecheckSchema>>({
    resolver: zodResolver(CreateRecheckSchema),
    defaultValues: {
      transactionId: transaction.id,
      recheckList: [
        {
          datetime: new Date(),
          detail: "",
          price: 0,
          tcId: "",
          scheduleId: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "recheckList",
  });

  const OnSubmit = (values: z.infer<typeof CreateRecheckSchema>) => {
    startTransition(async () => {
      const data = await createRecheck(values, companyId);

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
      <form onSubmit={form.handleSubmit(OnSubmit)} className="overflow-hidden">
        {/* Header */}
        <CardCategory
          icon={<FilePenLine />}
          title="ข้อมูลรีเช็ค / แบ่งจ่าย"
          description="เพิ่มรายการรีเช็คหรือแบ่งจ่ายของธุรกรรมนี้"
        >
          {/* Form Body */}
          <div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-medium muted-foreground">
                    รายการรีเช็ค / แบ่งจ่าย
                  </h3>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            append({
                              datetime: new Date(),
                              detail: "",
                              price: 0,
                              tcId: "",
                              scheduleId: "",
                            })
                          }
                          disabled={fields.length >= 6 || isPending}
                          className={cn(
                            "flex items-center gap-1 text-sm font-normal",
                            fields.length >= 6 &&
                              "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <Plus size={14} />
                          เพิ่มรายการ
                        </Button>
                      </TooltipTrigger>

                      <TooltipContent>
                        <p>สามารถเพิ่มได้สูงสุด 6 รายการ</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Items List */}
                <ScrollArea className="border h-72 rounded-md">
                  <div className="space-y-2">
                    {fields.map((field, index) => (
                      <div key={field.id} className="p-4 space-y-2 relative">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => remove(index)}
                          disabled={fields.length <= 1 || isPending}
                          className={cn(
                            "absolute top-3 right-3 h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50",
                            (fields.length <= 1 || isPending) &&
                              "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <Trash2 size={16} />
                        </Button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name={`recheckList.${index}.tcId`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>หมวดหมู่</FormLabel>
                                <SelectCategory
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  disabled={isPending}
                                  isLoading={transactionLoading}
                                  categories={tcCategories}
                                />
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div>
                            <DatePickerField
                              form={form}
                              name={`recheckList.${index}.datetime`}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name={`recheckList.${index}.scheduleId`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>เวลานัด</FormLabel>
                                <SelectCategory
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  disabled={isPending}
                                  isLoading={scheduleLoading}
                                  categories={scCategories}
                                />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`recheckList.${index}.price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ราคา (บาท)</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    placeholder="0.00"
                                    value={field.value === 0 ? "" : field.value}
                                    disabled={isPending}
                                    className="font-medium"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name={`recheckList.${index}.detail`}
                            render={({ field }) => (
                              <FormItem className="h-full">
                                <FormLabel>รายละเอียด</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    disabled={isPending}
                                    placeholder="กรอกรายละเอียด..."
                                    className="h-[calc(100%-30px)] min-h-[90px]"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <hr className="mt-5" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>

          {/* Footer */}
        </CardCategory>
        <div className="border-t flex justify-end pt-5">
          <SubmitButton
            label="เพิ่มรายการใหม่"
            type="submit"
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
