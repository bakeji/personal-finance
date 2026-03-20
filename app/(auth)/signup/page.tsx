import HeroImg from "@/components/auth/hero-img";
import SignUpForn from "@/components/auth/signupForm";

export default function Signup(){
    return(
        <div className="p-2 flex h-screen items-center justify-between w-full max-lg:flex-col max-lg:p-0 max-lg:justify-start max-lg:gap-10 ">
            <HeroImg/>
            <SignUpForn/>
        </div>
    )
}