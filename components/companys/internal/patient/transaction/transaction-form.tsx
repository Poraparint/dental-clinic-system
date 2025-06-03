"use client";

import * as z from "zod";

//react
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

//icons
import { Notebook } from "lucide-react";
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

//schema
import { CreateTransactionSchema } from "@/schemas";

//props
import { CardCategory } from "@/components/shared/card/card-category";
import { SelectCategory } from "@/components/shared/select/select-category";

//actions
import {
  createTransaction,
  updateTransaction,
  useAddOnCategories,
} from "@/hooks";
import { Textarea } from "@/components/ui/textarea";
import { useTransactionCategories } from "@/hooks/internal/company/category/use-tc";
import { DatePickerField } from "@/components/shared/select/date-picker-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { useCompany, usePatient } from "@/context/context";
import { TransactionFormData } from "@/types";
import { AddonSection } from "@/components/shared/select";

interface CreateTransactionFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  transactionData?: TransactionFormData;
}

export const CreateTransactionForm = ({
  setOpen,
  onSuccess,
  transactionData,
}: CreateTransactionFormProps) => {
  const { companyId } = useCompany();
  const { patientId } = usePatient();
  const { categories: transactionCategories, isLoading: tcLoading } =
    useTransactionCategories(companyId);
  const { categories: availableAddons, isLoading: addonLoading } =
    useAddOnCategories(companyId);

  const [addonList, setAddonList] = useState<
    { id: string; name: string; price: number; quantity: number }[]
  >([]);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateTransactionSchema>>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: transactionData ?? {
      datetime: new Date(),
      transactionCategoryId: "",
      detail: "",
      price: 0,
      paid: 0,
      addonItems: [],
    },
  });
  const transactionCategoryId = form.watch("transactionCategoryId");

  const selectedCategory = transactionCategories?.find(
    (cat) => cat.id === transactionCategoryId
  );

  const totalAddonPrice = addonList.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const calculatedBasePrice = (selectedCategory?.price || 0) + totalAddonPrice;

  useEffect(() => {
    if (!transactionData && calculatedBasePrice > 0) {
      form.setValue("price", calculatedBasePrice);
    }
  }, [calculatedBasePrice, form, transactionData]);

  const OnSubmit = (values: z.infer<typeof CreateTransactionSchema>) => {
    startTransition(async () => {
      const addonItems = addonList.map((item) => ({
        addonItemId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const payload = {
        ...values,
        addonItems,
      };
      let data;

      if (transactionData?.id) {
        data = await updateTransaction(
          payload,
          companyId,
          patientId,
          transactionData.id
        );
      } else {
        data = await createTransaction(payload, companyId, patientId);
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
          icon={<Notebook />}
          title="รายการธุรกรรม"
          description="รายละเอียดธุรกรรม / ข้อมูลธุรกรรม"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className={`space-y-2 ${transactionData?.id && "col-span-full"}`}>
              <div className="grid grid-cols-2 gap-6">
                <DatePickerField
                  form={form}
                  name="datetime"
                  withQuickSelect={false}
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
                        isLoading={tcLoading}
                        categories={transactionCategories}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                        className="w-full min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ราคาและการชำระเงิน */}
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        ราคารวม
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            ฿
                          </span>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder={calculatedBasePrice.toFixed(2)}
                            type="number"
                            step="0.01"
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
                            step="0.01"
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
            </div>

            {!transactionData?.id && (
              <AddonSection
                availableAddons={availableAddons}
                addonList={addonList}
                setAddonList={setAddonList}
                isPending={isPending}
                isLoading={addonLoading}
              />
            )}
          </div>
        </CardCategory>
        <div className="flex justify-end">
          <SubmitButton
            label={transactionData?.id ? "อัพเดตข้อมูล" : "เพิ่มรายการใหม่"}
            type="submit"
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
