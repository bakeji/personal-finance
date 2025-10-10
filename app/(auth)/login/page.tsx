import LoginForm from "@/components/auth/loginForm";
import HeroImg from "@/components/auth/hero-img";

export default function(){
    return(
        <div className="p-2 flex h-screen items-center justify-between w-full max-lg:flex-col max-lg:p-0 " >
            <HeroImg/>
            <LoginForm />
        </div>
    )
}