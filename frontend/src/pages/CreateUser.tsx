// "use client";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Check } from "lucide-react";
// import { Loader2 } from "lucide-react";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ToastAction } from "@/components/ui/toast";
// import { useToast } from "@/hooks/use-toast";

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { user_create } from "@/services/api";
// import { useState } from "react";

// const formSchema = z.object({
//   name: z
//     .string()
//     .min(2, {
//       message: "Username must be at leat 2 characters",
//     })
//     .regex(new RegExp("^(?!\\s)[a-zA-Z]+(\\s[a-z-A-Z]+)*$"), {
//       message: "Invalid username",
//     })
//     .max(50),
//   cpf: z.string(),
// });

// export default function ProfileForm() {
//   const { toast } = useToast();
//   const [load, setLoad] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       cpf: "",
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     setLoad(true);
//     try {
//       const response = await user_create(values);

//       if (response.status === 200) {
//         console.log(response.data);
//         toast({
//           description: "user has been created",
//           action: (
//             <div className="flex items-center gap-2">
//               <Check className="w-4 h-4 text-green-500" />
//             </div>
//           ),
//         });
//         form.reset();
//       }
//     } catch (error) {
//       setLoad(false);
//       console.log(error);
//       toast({
//         variant: "destructive",
//         title: "Uh oh! Something went wrong.",
//         description: "There was a problem with your request.",
//         action: (
//           <ToastAction altText="Try again" onClick={() => onSubmit(values)}>
//             Try again
//           </ToastAction>
//         ),
//       });
//     }
//   };

//   return (
//     <div className="flex flex-col ">
//       <div className="w-full md:w-120 mx-auto">
//         <Card>
//           <CardHeader>
//             <CardTitle>User Form</CardTitle>
//             <CardDescription>Create a new user</CardDescription>
//           </CardHeader>

//           <CardContent>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-8"
//               >
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Username</FormLabel>
//                       <FormControl>
//                         <Input placeholder="John Doe" {...field} />
//                       </FormControl>
//                       <FormDescription>
//                         This is you public display name
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="cpf"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>CPF</FormLabel>
//                       <FormControl>
//                         <Input placeholder="123.456.789-00" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <CardFooter>
//                   <Button variant="default" type="submit" disabled={load}>
//                     {load && <Loader2 className="animate-spin" />}
//                     Submit
//                   </Button>
//                 </CardFooter>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
