const SettingsPage = () => {
  return (<div>
    setting
  </div> );
}
 
export default SettingsPage;



// "use client";

// import { useTransition, useState } from "react";
// import { useSession } from "next-auth/react";
// import { SettingSchema } from "@/schemas";

// //form
// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Switch } from "@/components/ui/switch";
// import { FormSuccess } from "@/components/form-success";
// import { FormError } from "@/components/form-error";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { settings } from "@/actions/settings";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormDescription,
//   FormMessage,
// } from "@/components/ui/form";
// import { useCurrentUser } from "@/hooks/use-current-user";
// import { UserButton } from "@/components/auth/user-button";

// const SettingsPage = () => {
//   const user = useCurrentUser();

//   const [error, setError] = useState<string | undefined>();
//   const [success, setSuccess] = useState<string | undefined>();
//   const { update } = useSession();
//   const [isPending, startTransition] = useTransition();

//   const form = useForm<z.infer<typeof SettingSchema>>({
//     resolver: zodResolver(SettingSchema),
//     defaultValues: {
//       password: undefined,
//       newPassword: undefined,
//       name: user?.name || undefined,
//       email: user?.email || undefined,
//       isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
//     },
//   });

//   const onSubmit = (values: z.infer<typeof SettingSchema>) => {
//     startTransition(() => {
//       settings(values)
//         .then((data) => {
//           if (data.error) {
//             setError(data.error);
//           }

//           if (data.success) {
//             return update()
//               .then(() => {
//                 setSuccess(data.success);
//               })
//               .catch(() => {
//                 setError("Error during update");
//               });
//             setSuccess(data.success);
//           }
//         })
//         .catch(() => setError("Something went wrong!"));
//     });
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <p className="text-2xl font-semibold text-center">Settings</p>
//         <UserButton/>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
//             <div className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         placeholder="John Doe"
//                         type="name"
//                         disabled={isPending}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {user?.isOAuth !== true && (
//                 <>
//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...field}
//                             placeholder="JohnDoe@gmail.com"
//                             type="email"
//                             disabled={isPending}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="password"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Password</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...field}
//                             placeholder="********"
//                             type="password"
//                             disabled={isPending}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="newPassword"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>New Password</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...field}
//                             placeholder="********"
//                             type="password"
//                             disabled={isPending}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </>
//               )}
//               {user?.isOAuth !== true && (
//                 <FormField
//                   control={form.control}
//                   name="isTwoFactorEnabled"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
//                       <div className="space-y-0.5">
//                         <FormLabel>Two Factor Authentication</FormLabel>
//                         <FormDescription>
//                           Enable two factor authentication for your account
//                         </FormDescription>
//                       </div>
//                       <FormControl>
//                         <Switch
//                           disabled={isPending}
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               )}
//             </div>
//             <FormError message={error} />
//             <FormSuccess message={success} />

//             <Button disabled={isPending} type="submit">
//               Save
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// };

// export default SettingsPage;
