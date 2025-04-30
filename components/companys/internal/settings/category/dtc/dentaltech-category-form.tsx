"use client";

import * as z from "zod";

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
import { Button } from "@/components/ui/button";

import { CreateDentalTechCategorySchema } from "@/schemas";

//actions
import { CardCategory } from "@/components/props/card-category";
import { Aperture } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { CreateDentalTechCategory } from "@/actions/company/public/dentaltech-category";

interface CreateTransactionCategoryFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreateDentalTechCategoryForm = ({
  setOpen,
  onSuccess,
}: CreateTransactionCategoryFormProps) => {
  const params = useParams();
  const companyId = params.companyId as string;

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateDentalTechCategorySchema>>({
    resolver: zodResolver(CreateDentalTechCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const OnSubmit = (values: z.infer<typeof CreateDentalTechCategorySchema>) => {
    startTransition(() => {
      CreateDentalTechCategory(values, companyId)
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
      <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-4">
        <CardCategory icon={<Aperture />} title="หมวดหมู่รายการทันตกรรม">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อรายการทันตกรรม</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="ครอบฟัน, ฟันปลอม, zirconium, ..."
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
                  <FormLabel>รายละเอียด</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="รายละเอียด"
                    />
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
                   เพิ่มหมวดหมู่
                 </Button>
               </div>
      </form>
    </Form>
  );
};
