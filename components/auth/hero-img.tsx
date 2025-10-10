import Image from "next/image"
export default function HeroImg(){
    return(
        <div className="relative w-2/5 h-full max-lg:w-full max-lg:bg-[#201F24] max-lg:h-[74px] max-lg:p-3 max-lg:rounded-b-[8px] max-lg:flex max-lg:items-center max-lg:justify-center ">
           <Image src='/Sidebar.png' alt="sidebar-img" fill className=" object-center max-lg:hidden "/>
           <Image src='/logo.png' alt="logo" width={121} height={22} className=" hidden object-center max-lg:block "/>
        </div>
    )
}