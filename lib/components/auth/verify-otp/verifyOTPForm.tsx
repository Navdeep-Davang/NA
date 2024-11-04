'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { verifyOTP } from "@/lib/services/auth/verify-otp/verifyOTP";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { verifyOTPSchema } from "@/lib/Interface/auth/verify-otp/schema";
import { Label } from "@/components/ui/label";
import { VerifyOTPFormProps } from "@/lib/Interface/auth/verify-otp/types";
import { useState } from "react";


export function VerifyOTPForm( { email }: VerifyOTPFormProps ) {

  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof verifyOTPSchema>>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: {
      email: email,
      otp: "",
    },
  });


  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof verifyOTPSchema>) => {
    setLoading(true);

    try {
                 
      const responseData = await verifyOTP(data);

      if (responseData.status === "success") {

                
        toast({
          title: responseData.success || "OTP Verified",
          description: responseData.message || "You have successfully verified the OTP.",
          variant: "success",
        });

        setTimeout(() => {
          toast({
            title: "Redirecting...",
            description: "You will now be redirected to the reset password page, to create new password",
            variant: "default",
            duration: 1500,
          });
        }, 1500);

        setTimeout(() => {
          // console.log("F1, Hit redirect")
          router.push("/auth/reset-password");
          // window.open(`/auth/reset-password?email=${encodeURIComponent(responseData.email)}`, '_blank');
        }, 3000);
      }

    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again later.";
      let errorTitle = "Verification Failed";

      if (error instanceof z.ZodError) {
        errorTitle = "Validation Error";
        errorMessage = error.errors[0]?.message || errorMessage; // Display first error message
      } else if (error instanceof Error) {
        try {
          const parsedError = JSON.parse(error.message);
          errorTitle = parsedError.error || errorTitle;
          errorMessage = parsedError.message || errorMessage;

          if (parsedError.status === "410" || parsedError.status === "429") {
            toast({
              title: errorTitle,
              description: errorMessage,
              variant: "destructive",
            });

            setTimeout(() => {
              toast({
                title: "Redirecting...",
                description: "You will now be redirected to the request OTP page.",
                variant: "default",
                duration: 1500,
              });
            }, 1500);
            
                
            setTimeout(() => {
             router.push("/auth/request-otp");
            //  window.open(`/auth/request-otp`, '_blank');
            }, 2500);
    
            return; 
          }


        } catch {
          
          errorMessage = error.message || errorMessage;
        }
      }

      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
        duration: 4000
      });

      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Enter the Verification Code</CardTitle>
        <CardDescription>
          We have sent a verification code to your email, please enter it below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <Label>Enter OTP</Label>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="flex justify-between w-full gap-2">
                      <InputOTPSlot index={0} className="min-h-12 flex-auto border border-gray-300 rounded text-center" />
                      <InputOTPSlot index={1} className="min-h-12 flex-auto border border-gray-300 rounded text-center" />
                      <InputOTPSlot index={2} className="min-h-12 flex-auto border border-gray-300 rounded text-center" />
                      <InputOTPSlot index={3} className="min-h-12 flex-auto border border-gray-300 rounded text-center" />
                      <InputOTPSlot index={4} className="min-h-12 flex-auto border border-gray-300 rounded text-center" />
                      <InputOTPSlot index={5} className="min-h-12 flex-auto border border-gray-300 rounded text-center" />
                    </InputOTPGroup>
                    </InputOTP>
                  </FormControl>                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
