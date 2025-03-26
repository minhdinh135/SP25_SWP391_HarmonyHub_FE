import { createReport } from "@/api/reportApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CreateReportDialog = ({
  dialog,
  closeDialog,
  setTrigger,
  setIsLoading,
}) => {
  const { user } = useAuth();

  const reportSchema = z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters" }),
    content: z
      .string()
      .min(10, { message: "Content must be at least 10 characters" }),
  });

  const form = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmitReport = async (formData) => {
    try {
      setIsLoading(true);
      const payload = {
        ...formData,
        accountId: user.accountId,
      };
      console.log(payload);
      await createReport(payload);
      setTrigger((prev) => prev + 1);
      toast.success("Report created successfully");
      closeDialog();
    } catch (error) {
      console.error("Error creating report:", error);
      toast.error("Failed to create report");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={dialog.type === "createReport"} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Report</DialogTitle>
          <DialogDescription>
            Fill out the details for your new report
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitReport)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter report title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your report in detail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit">Create Report</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReportDialog;
