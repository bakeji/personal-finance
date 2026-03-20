"use client"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAuth, confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { app } from "@/lib/firebaseConfig";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(true);
    const [validCode, setValidCode] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const oobCode = searchParams.get('oobCode'); // This is the reset code from the email link

    const resetPasswordSchema = z.object({
        password: z.string().min(8, "Password must be at least 8 characters long"),
        confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

    type ResetPassword = z.infer<typeof resetPasswordSchema>;

    const { register, handleSubmit, formState: { errors } } = useForm<ResetPassword>({
        resolver: zodResolver(resetPasswordSchema),
    });

    // Verify the reset code when component mounts
    useEffect(() => {
        async function verifyCode() {
            if (!oobCode) {
                toast.error("Invalid or missing reset code");
                setVerifying(false);
                setValidCode(false);
                return;
            }

            try {
                const auth = getAuth(app);
                // Verify the password reset code is valid
                const email = await verifyPasswordResetCode(auth, oobCode);
                setUserEmail(email);
                setValidCode(true);
                setVerifying(false);
            } catch (error) {
                const errorMessage = (error as Error).message;
                if (errorMessage.includes('expired')) {
                    toast.error("This password reset link has expired. Please request a new one.");
                } else if (errorMessage.includes('invalid')) {
                    toast.error("This password reset link is invalid or has already been used.");
                } else {
                    toast.error("An error occurred. Please try again.");
                }
                setValidCode(false);
                setVerifying(false);
            }
        }

        verifyCode();
    }, [oobCode]);

    async function onSubmit(data: ResetPassword) {
        if (!oobCode) {
            toast.error("Invalid reset code");
            return;
        }

        setLoading(true);
        try {
            const auth = getAuth(app);
            // Reset the password
            await confirmPasswordReset(auth, oobCode, data.password);
            toast.success("Password reset successfully! You can now login with your new password.");
            router.push('/login');
        } catch (error) {
            const errorMessage = (error as Error).message;
            if (errorMessage.includes('weak-password')) {
                toast.error("Password is too weak. Please use a stronger password.");
            } else {
                toast.error(`Error: ${errorMessage}`);
            }
        } finally {
            setLoading(false);
        }
    }

    // Show loading state while verifying the code
    if (verifying) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-[12px] shadow-sm">
                    <div className="flex flex-col items-center gap-4">
                        <Spinner />
                        <p className="text-[#696868] text-[14px]">Verifying reset link...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Show error state if code is invalid
    if (!validCode) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-[12px] shadow-sm w-[90%] max-w-md">
                    <h1 className="font-bold text-[#201F24] text-[32px] mb-4">Invalid Link</h1>
                    <div className="bg-red-50 border border-red-200 rounded-[8px] p-4 mb-4">
                        <p className="text-red-800 text-[14px]">
                            This password reset link is invalid, expired, or has already been used.
                        </p>
                    </div>
                    <Link 
                        href="/forgot-password"
                        className="bg-[#201F24] block text-center rounded-[8px] p-2 text-white font-[700] text-[14px]"
                    >
                        Request New Reset Link
                    </Link>
                </div>
            </div>
        );
    }

    // Show the reset password form
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-[12px] shadow-sm w-[90%] max-w-md">
                <h1 className="font-bold text-[#201F24] text-[32px] mb-2">Reset Password</h1>
                <p className="text-[#696868] text-[14px] mb-6">
                    Enter a new password for <span className="font-bold">{userEmail}</span>
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-[#696868] text-[12px] font-bold" htmlFor="password">
                            New Password
                        </label>
                        <div className="relative w-full">
                            <input
                                {...register('password')}
                                className="rounded-[8px] border-[#98908B] border p-2 pr-10 w-full outline-none"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#696868] hover:text-[#201F24] transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-[12px]">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[#696868] text-[12px] font-bold" htmlFor="confirmPassword">
                            Confirm New Password
                        </label>
                        <div className="relative w-full">
                            <input
                                {...register('confirmPassword')}
                                className="rounded-[8px] border-[#98908B] border p-2 pr-10 w-full outline-none"
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#696868] hover:text-[#201F24] transition-colors"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-[12px]">{errors.confirmPassword.message}</p>
                        )}
                        <p className="text-[#696868] text-[12px]">
                            Password must be at least 8 characters long
                        </p>
                    </div>

                    <button
                        className="bg-[#201F24] text-center flex items-center justify-center cursor-pointer rounded-[8px] p-2 text-white font-[700] text-[14px]"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : "Reset Password"}
                    </button>
                </form>

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