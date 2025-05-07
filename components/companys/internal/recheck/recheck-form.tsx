"use client";

import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRecheckSchema } from "@/schemas";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// actions
import { Recheck } from "@/actions/company/public/recheck";

// hooks
import { useTransactionCategories } from "@/hooks/internal/use-tc";

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
import {
  ArrowRight,
  CalendarIcon,
  ClipboardPaste,
  FilePenLine,
  Plus,
  Trash2,
} from "lucide-react";
import { CardCategory } from "@/components/props/wrapper/card-category";

interface RecheckFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export const RecheckForm = ({ setOpen, onSuccess }: RecheckFormProps) => {
  const [step, setStep] = useState<"transaction" | "items">("transaction");
  const params = useParams();
  const companyId = params.companyId as string;
  const [isPending, startTransition] = useTransition();
  const { categories, isLoading } = useTransactionCategories(companyId);

  const form = useForm<z.infer<typeof CreateRecheckSchema>>({
    resolver: zodResolver(CreateRecheckSchema),
    defaultValues: {
      transactionId: "",
      recheckList: [
        {
          datetime: new Date(),
          detail: "",
          price: 0,
          tcId: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "recheckList",
  });

  const OnSubmit = (values: z.infer<typeof CreateRecheckSchema>) => {
    startTransition(() => {
      Recheck(values, companyId)
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

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await form.trigger("transactionId");
    if (isValid) {
      setStep("items");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(OnSubmit)} className="overflow-hidden">
        {/* Header */}
        <CardCategory
          icon={<FilePenLine />}
          title="ข้อมูลรีเช็ค / แบ่งจ่าย"
          description={
            step === "transaction"
              ? "กรอกรหัสธุรกรรมเพื่อเริ่มต้น"
              : "เพิ่มรายการรีเช็คหรือแบ่งจ่าย"
          }
        >
          {/* Form Body */}
          <div>
            {step === "transaction" ? (
              <div className="flex flex-col items-center p-6 max-w-lg mx-auto gap-2">
                <div className="bg-indigo p-3 rounded-full text-white">
                  <CalendarIcon size={24} />
                </div>
                <FormField
                  control={form.control}
                  name="transactionId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="กรอกรหัสธุรกรรม"
                            className="h-10 pr-10 text-center"
                          />
                        </FormControl>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={async () => {
                                  try {
                                    const text =
                                      await navigator.clipboard.readText();
                                    if (text) {
                                      form.setValue(
                                        "transactionId",
                                        text.trim()
                                      );
                                      toast.success(
                                        "วางรหัสธุรกรรมจากคลิปบอร์ดแล้ว"
                                      );
                                    }
                                  } catch (error) {
                                    toast.error(
                                      "ไม่สามารถอ่านข้อมูลจากคลิปบอร์ดได้"
                                    );
                                    console.error(
                                      "Failed to read clipboard:",
                                      error
                                    );
                                  }
                                }}
                                disabled={isPending}
                              >
                                <ClipboardPaste
                                  size={16}
                                  className="text-muted-foreground"
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>วางรหัสจากคลิปบอร์ด</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Transaction ID display */}
                <div className="md:p-4 rounded-lg md:border">
                  <div className="text-sm text-muted-foreground">
                    รหัสธุรกรรม
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <h1 className="font-medium text-lg">
                      {form.watch("transactionId")}
                    </h1>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep("transaction")}
                    >
                      แก้ไข
                    </Button>
                  </div>
                </div>

                {/* Recheck Items */}
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
                        {fields.length >= 6 && (
                          <TooltipContent>
                            <p>สามารถเพิ่มได้สูงสุด 6 รายการ</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Items List */}
                  <ScrollArea className="border h-72 rounded-md">
                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <div key={field.id} className="p-4 relative">
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

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Category & Date */}
                            <div>
                              <FormField
                                control={form.control}
                                name={`recheckList.${index}.tcId`}
                                render={({ field }) => (
                                  <FormItem className="mb-4">
                                    <FormLabel className="text-sm text-text-muted-foreground">
                                      หมวดหมู่
                                    </FormLabel>
                                    <SelectCategory
                                      value={field.value}
                                      onValueChange={field.onChange}
                                      disabled={isPending}
                                      isLoading={isLoading}
                                      categories={categories}
                                    />
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <div className="mb-4">
                                <FormLabel className="text-sm text-text-muted-foreground">
                                  วันที่
                                </FormLabel>
                                <DatePickerField
                                  form={form}
                                  name={`recheckList.${index}.datetime`}
                                  isLabel={false}
                                />
                              </div>

                              <FormField
                                control={form.control}
                                name={`recheckList.${index}.price`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm text-text-muted-foreground">
                                      ราคา (บาท)
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        type="number"
                                        placeholder="0.00"
                                        value={
                                          field.value === 0 ? "" : field.value
                                        }
                                        disabled={isPending}
                                        className="font-medium"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            {/* Details */}
                            <div>
                              <FormField
                                control={form.control}
                                name={`recheckList.${index}.detail`}
                                render={({ field }) => (
                                  <FormItem className="h-full">
                                    <FormLabel className="text-sm text-muted-foreground">
                                      รายละเอียด
                                    </FormLabel>
                                    <FormControl>
                                      <Textarea
                                        {...field}
                                        disabled={isPending}
                                        placeholder="กรอกรายละเอียด..."
                                        className="h-[calc(100%-30px)] min-h-[120px]"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          <hr className="mt-5" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
        </CardCategory>
        <div className="border-t flex justify-end pt-5">
          {step === "transaction" ? (
            <Button
              type="button"
              onClick={handleNextStep}
              disabled={isPending}
              className="px-5"
            >
              ดำเนินการต่อ
              <ArrowRight size={16} />
            </Button>
          ) : (
            <Button type="submit" disabled={isPending} className="px-5">
              {isPending ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
