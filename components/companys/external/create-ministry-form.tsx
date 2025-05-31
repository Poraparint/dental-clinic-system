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

import { CreateCompanySchema } from "@/schemas";

//actions
import { CardCategory } from "@/components/shared/card";
import { Building2 } from "lucide-react";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { createMinistry } from "@/hooks/external/use-ministry";
import { toast } from "sonner";

interface CreateMinistryFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreateMinistryForm = ({
  setOpen,
  onSuccess,
}: CreateMinistryFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateCompanySchema>>({
    resolver: zodResolver(CreateCompanySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const OnSubmit = (values: z.infer<typeof CreateCompanySchema>) => {
    startTransition(async () => {
      const data = await createMinistry(values);

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
      <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-4">
        <CardCategory
          icon={<Building2 />}
          title="ข้อมูลบอร์ด / บริษัท"
          description="กรอกข้อมูลเพื่อสร้างบริษัท"
        >
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อบอร์ด / บริษัท</FormLabel>
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
          <SubmitButton
            label="สร้างบริษัทใหม่"
            type="submit"
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
