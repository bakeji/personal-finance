'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";
export default function Menu(){
    const navLinks =[
        {img: '/overview.png', activeImg:'/overview-active.png', link: '/', linkName:'Overview' },
        // {img: '/transactions.svg', link: '/transactions', linkName:'Transactions' },
        {img: '/budgets.png', activeImg:'/budget-active.png', link: '/budget', linkName:'Budget' },
        {img: '/pots.png', activeImg:'/pots-active.png', link: '/pots', linkName:'Pots' },
        {img: '/bills.png', activeImg:'/bills-active.png', link: '/bills', linkName:'Recurring Bills' },
        
    ]
    const path = usePathname()

    return(
        <div className="bg-[#201F24]  w-full  h-full  flex flex-col max-lg:flex-row 
        rounded-r-2xl max-lg:rounded-t-2xl max-lg:rounded-br-none gap-4  max-lg:h-[84px] max-lg:fixed max-lg:bottom-0  " >
            <div className="p-8  max-lg:hidden ">
                <Image src='/logo.png' width={121} height={22} alt="logo" />
            </div>
            
          <div className="flex flex-col  justify-between h-full max-lg:w-[90%] max-lg:p-2 max-lg:mx-auto max-md:justify-center  ">
            <div className="flex flex-col max-lg:flex-row gap-2 max-lg:justify-between   max-lg:h-full ">
                    {navLinks.map((nav,id)=>(
                    <div key={id} className={` p-8 w-[95%]
                     ${path===nav.link? 'bg-[#F8F4F0] text-[#201F24] border-l-4 ' : 
                    'bg-transparent text-[#B3B3B3]  ' }
                     flex items-center h-1 rounded-r-[12px] max-lg:h-full  max-lg:border-none max-lg:w-fit border-[#277C78] gap-4 max-lg:gap-2   max-lg:flex-col max-lg:rounded-br-none max-lg:rounded-t-[16px] max-lg:p-2 max-md:w-full max-md:justify-center `}>
                        <Image src={path===nav.link? nav.activeImg : nav.img } width={24} height={24} alt="icons" />
                        <Link className="font-bold text-[16px] max-md:hidden " href={nav.link}>{nav.linkName}</Link>
                    </div>
                    ))}

                </div>

                <div className="p-8  max-lg:hidden ">
                <button className="align-middle flex gap-4 text-[#B3B3B3]"> <Image src='/minimise.png' height={24} width={24} alt="minimize" /> Minimize Menu </button>

                </div>
          </div>
        </div>
    )
}