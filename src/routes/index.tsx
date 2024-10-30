import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datePicker";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/lib/supabase";
import { useCallback } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const timerSchema = z.object({
  title: z.string().min(1, "title cannot be empty"),
  endDate: z.date().min(new Date(), "end date must be in the future"),
});

// type Timer = z.infer<typeof timerSchema>;

export default function Index() {
  const form = useForm({
    resolver: zodResolver(timerSchema),
  });

  const submitHandler = useCallback(async ({ title, endDate }: any) => {
    const { data, error } = await supabase
      .from("timers")
      .insert({ title, end_date: endDate })
      .select();

    console.log("INSERTED DATA: ", { data, error });

    navigator.clipboard.writeText(`http://localhost:5173/${data?.[0].id}`);
  }, []);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-3xl font-bold rubik">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="rounded-none text-xl py-6"
                    type="title"
                    id="title"
                    placeholder="title"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-3xl font-bold rubik flex flex-col gap-2">
                  End Date
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" variant={"outline"} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
