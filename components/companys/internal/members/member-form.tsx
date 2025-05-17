"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MemberRegisterSchema } from "@/schemas";

//action
import { MemberRegister } from "@/actions/auth/register";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//props
import { CardCategory } from "@/components/props/wrapper/card-category";
import { Users } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { CompanyRole } from "@prisma/client";
import { SubmitButton } from "@/components/props/component/button/submit-button";

interface MemberRegisterFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export const MemberRegisterForm = ({
  setOpen,
  onSuccess,
}: MemberRegisterFormProps) => {
  const params = useParams();
  const companyId = params.companyId as string;
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof MemberRegisterSchema>>({
    resolver: zodResolver(MemberRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      memberCode: "",
      role: CompanyRole.PENDING,
    },
  });

  const OnSubmit = (values: z.infer<typeof MemberRegisterSchema>) => {
    startTransition(() => {
      MemberRegister(values, companyId)
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
      <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-6">
        <CardCategory
          icon={<Users />}
          title="ข้อมูลพนักงาน"
          description="ข้อมูลพนักงาน / สร้างบัญชีพนักงาน"
        >
          {/* ข้อมูลส่วนตัว */}
          <div className="mb-4">
            <h3 className="font-medium text-muted-foreground mb-3">
              ข้อมูลส่วนตัว
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อพนักงาน</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="John Doe"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="memberCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รหัสพนักงาน</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="EMP-0001"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* ข้อมูลการติดต่อ */}
          <div className="mb-4">
            <h3 className="font-medium text-muted-foreground mb-3">
              ข้อมูลการติดต่อ
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>อีเมล</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="johndoe@gmail.com"
                        type="email"
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
                    <FormLabel>เบอร์ติดต่อ</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="081-234-5678"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* ข้อมูลการเข้าสู่ระบบและตำแหน่ง */}
          <div>
            <h3 className="font-medium text-muted-foreground mb-3">
              ข้อมูลบัญชีและตำแหน่ง
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รหัสผ่าน</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="********"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ตำแหน่ง</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกตำแหน่ง" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(CompanyRole)
                          .filter((role) => role !== CompanyRole.MANAGER)
                          .map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardCategory>

        <div className="flex justify-end">
          <SubmitButton
            label="สร้างบัญชี"
            type="submit"
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
