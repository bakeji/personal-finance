import HeroImg from "@/components/auth/hero-img";
import SignUpForn from "@/components/auth/signupForm";

export default function Signup(){
    return(
        <div className="p-2 flex h-screen items-center justify-between w-full max-lg:flex-col max-lg:p-0 max-lg:gap-8 max-lg:justify-normal ">
            <HeroImg/>
            <SignUpForn/>
        </div>
    )
}