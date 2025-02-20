"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const formSchema = z.object({
  username: z
    .string()
    .regex(new RegExp("^(?!.*[._-]{2})[a-zA-Z0-9._-]+$"), {
      message: "Invalid username",
    })
    .min(2, {
      message: "Username must be at leat 2 characters",
    })
    .max(50),
});

const ProfileForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new user</CardTitle>
        <CardDescription>a new user to use the system</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="duhdiniz" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is you public display name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter>
              <Button variant="default" type="submit">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default ProfileForm;
