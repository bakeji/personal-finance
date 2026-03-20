"use client"
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { app } from "@/lib/firebaseConfig";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

export default function ForgotPasswordForm() {
    const forgotPasswordSchema = z.object({
        email: z.email("Invalid email address"),
    });

    type ForgotPassword = z.infer<typeof forgotPasswordSchema>;

    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPassword>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    async function onSubmit(data: ForgotPassword) {
        setLoading(true);
        try {
            const auth = getAuth(app);
            
            // Configure action code settings with your custom URL
            const actionCodeSettings = {
                url: `${window.location.origin}/reset-password`, // Custom reset page
                handleCodeInApp: true,
            };
            
            await sendPasswordResetEmail(auth, data.email, actionCodeSettings);
            setEmailSent(true);
            toast.success('Password reset email sent! Check your inbox.');
        } catch (error) {
            const errorMessage = (error as Error).message;
            if (errorMessage.includes('user-not-found')) {
                toast.error('No account found with this email address.');
            } else {
                toast.error(`Error: ${errorMessage}`);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-3/5 flex items-center justify-center max-lg:w-4/5">
            <div className="bg-white p-5 w-[50%] max-lg:w-full rounded-[12px]">
                <h1 className='font-bold text-[#201F24] text-[32px] mb-4'>
                    Forgot Password
                </h1>
                
                {!emailSent ? (
                    <>
                        <p className="text-[#696868] text-[14px] mb-4">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[#696868] text-[12px] font-bold" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    {...register('email')}
                                    className="rounded-[8px] border-[#98908B] border p-2 outline-none w-full"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-[12px]">{errors.email.message}</p>
                                )}
                            </div>

                            <button
                                className="bg-[#201F24] text-center flex items-center justify-center cursor-pointer rounded-[8px] p-2 text-white font-[700] text-[14px]"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? <Spinner /> : "Send Reset Link"}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-[8px] p-4">
                            <p className="text-green-800 text-[14px]">
                                ✓ Password reset email sent! Please check your inbox and follow the instructions.
                            </p>
                        </div>
                        <button
                            onClick={() => setEmailSent(false)}
                            className="text-[#201F24] text-[14px] underline"
                        >
                            Didn't receive the email? Try again
                        </button>
                    </div>
                )}

                <p className="text-[#696868] text-center text-[14px] font-normal mt-5">
                    Remember your password?{' '}
                    <span className="text-[#201F24] font-bold">
                        <Link className="underline" href="/login">
                            Login
                        </Link>
                    </span>
                </p>
            </div>
        </div>
    );
}