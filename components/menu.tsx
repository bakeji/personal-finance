'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function Menu(){
    const navLinks =[
        {img: '/overview.png', activeImg:'/overview-active.png', link: '/', linkName:'Overview' },
        {img: '/budgets.png', activeImg:'/budget-active.png', link: '/budget', linkName:'Budget' },
        {img: '/pots.png', activeImg:'/pots-active.png', link: '/pots', linkName:'Pots' },
        {img: '/bills.png', activeImg:'/bills-active.png', link: '/bills', linkName:'Recurring Bills' },
    ]
    const path = usePathname()

    return(
        <div className="bg-[#201F24] w-full h-full flex flex-col rounded-r-2xl gap-4 
        lg:static lg:flex-col lg:rounded-r-2xl
        max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:h-[84px] max-lg:flex-row max-lg:rounded-t-2xl max-lg:rounded-br-none max-lg:rounded-bl-none max-lg:z-50" >
            
            {/* Logo - Desktop only */}
            <div className="p-8 max-lg:hidden">
                <Image src='/logo.png' width={121} height={22} alt="logo" />
            </div>
            
            {/* Navigation Container */}
            <div className="flex flex-col justify-between h-full 
            max-lg:flex-row max-lg:w-full max-lg:px-4 max-lg:py-2">
                
                {/* Nav Links */}
                <div className="flex flex-col gap-2 
                max-lg:flex-row max-lg:justify-around max-lg:items-center max-lg:w-full max-lg:gap-1">
                    {navLinks.map((nav, id) => (
                        <Link 
                            key={id} 
                            href={nav.link}
                            className={`
                                p-4 flex items-center gap-4 rounded-r-xl transition-all
                                ${path === nav.link 
                                    ? 'bg-[#F8F4F0] text-[#201F24] border-l-4 border-[#277C78]' 
                                    : 'bg-transparent text-[#B3B3B3] hover:bg-[#2e2d32]'
                                }
                                
                                lg:w-[95%] lg:h-14 lg:pl-8 lg:border-l-4
                                
                                max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:gap-1 
                                max-lg:flex-1 max-lg:h-full max-lg:rounded-t-xl max-lg:rounded-r-none 
                                max-lg:border-l-0 max-lg:p-2
                                ${path === nav.link && 'max-lg:border-t-4 max-lg:border-l-0'}
                            `}
                        >
                            <Image 
                                src={path === nav.link ? nav.activeImg : nav.img} 
                                width={24} 
                                height={24} 
                                alt={nav.linkName}
                                className="max-lg:w-6 max-lg:h-6"
                            />
                            <span className="font-bold text-[16px] max-lg:text-[10px] max-lg:text-center max-lg:leading-tight">
                                {nav.linkName}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Minimize Button - Desktop only */}
                <div className="p-8 max-lg:hidden">
                    <button className="flex items-center gap-4 text-[#B3B3B3] hover:text-white transition-colors">
                        <Image src='/minimise.png' height={24} width={24} alt="minimize" />
                        <span>Minimize Menu</span>
                    </button>
                </div>
            </div>
        </div>
    )
}