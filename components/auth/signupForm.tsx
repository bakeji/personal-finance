"use client"
import Link from "next/link";
import Image from "next/image";
import {z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {app} from "@/lib/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
export default function SignUpForn(){

const userSchema =z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})
type User = z.infer<typeof userSchema>;

const {register, handleSubmit, formState:{errors}} =  useForm<User>({
    resolver: zodResolver(userSchema)
})
const [loading, setLoading] = useState(false);
const router = useRouter()

 async function onSubmit(data:User){
    setLoading(true);
    try{
        const auth = getAuth(app);
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        toast.success('Account created successfully!');
        router.push('/login');
    }catch(error){
        const errorMessage = (error as Error).message;
        toast.error(`Error: ${errorMessage}`);
    }
    finally{
        setLoading(false);
    }
  }

    return(
        <div className="w-3/5 flex  items-center justify-center max-lg:w-4/5 " >
            <div className=" bg-white p-5 w-[50%] max-lg:w-full rounded-[12px]">
                <h1 className='font-bold text-[#201F24] text-[32px] mb-4 ' >Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                        <label className="text-[#696868] text-[12px] font-bold " htmlFor="name">Name</label>
                        <input {...register('name')} 
                        className="rounded-[8px] border-[#98908B] border p-2 outline-none w-full" type="text" name="name" id="name" />
                        {errors.name && <p className="text-red-500 text-[12px]">{errors.name.message}</p>}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-[#696868] text-[12px] font-bold " htmlFor="email">Email</label>
                        <input  {...register('email')} className="rounded-[8px] border-[#98908B] border p-2 outline-none w-full" type="email" name="email" id="email" />
                        {errors.email && <p className="text-red-500 text-[12px]">{errors.email.message}</p>}
                    </div>

                    <div  className="flex flex-col gap-2">
                        <label className="text-[#696868] text-[12px] font-bold " htmlFor="password">Password</label>
                        <input {...register('password')} className="rounded-[8px] border-[#98908B] border p-2  flex w-full outline-none" type="password" name="password" id="password" />
                        <p className={`text-right ${errors.password?"text-red-500": "text-[#696868] "} text-[12px] font-normal`}>Passwords must be at least 8 characters</p>
                        {/* {errors.password && <p className="text-red-500 text-[12px]">{errors.password.message}</p>}   */}
                    </div>

                    <button className="bg-[#201F24] text-center flex items-center justify-center rounded-[8px] cursor-pointer p-2 text-white font-[700] text-[14px] " type="submit">{loading? <Spinner/> : "Create Account" }</button>
                </form>
                <p className="text-[#696868] text-center text-[14px] font-normal mt-5  "> Already have an account? <span className="text-[#201F24] font-bold" ><Link className="underline"  href="/login">Login</Link> </span></p>
            </div>
        </div>
    )
}