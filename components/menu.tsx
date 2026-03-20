'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Menu(){
    const [isMinimized, setIsMinimized] = useState(false)
    
    const navLinks =[
        {img: '/overview.png', activeImg:'/overview-active.png', link: '/', linkName:'Overview', shortName: 'Overview' },
        {img: '/budgets.png', activeImg:'/budget-active.png', link: '/budget', linkName:'Budget', shortName: 'Budget' },
        {img: '/pots.png', activeImg:'/pots-active.png', link: '/pots', linkName:'Pots', shortName: 'Pots' },
        {img: '/bills.png', activeImg:'/bills-active.png', link: '/bills', linkName:'Recurring Bills', shortName: 'Bills' },
    ]
    const path = usePathname()

    return(
        <div className={`bg-[#201F24] h-full flex flex-col rounded-r-2xl gap-4 transition-all duration-300
        lg:sticky lg:top-0 lg:h-screen lg:flex-col lg:rounded-r-2xl
        max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:h-[84px] max-lg:flex-row max-lg:rounded-t-2xl max-lg:rounded-br-none max-lg:rounded-bl-none max-lg:z-[9999]
        ${isMinimized ? 'lg:w-[80px]' : 'lg:w-full'}
        `}>
            
            {/* Logo - Desktop only */}
            <div className={`p-8 max-lg:hidden transition-all duration-300 ${isMinimized ? 'opacity-0 h-0 p-0 overflow-hidden' : 'opacity-100'}`}>
                <Image src='/logo.png' width={121} height={22} alt="logo" />
            </div>
            
            {/* Navigation Container */}
            <div className="flex flex-col justify-between h-full 
            max-lg:flex-row max-lg:w-full max-lg:px-2 max-lg:py-2">
                
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
                                
                                lg:w-[95%] lg:h-14 lg:border-l-4
                                ${isMinimized ? 'lg:justify-center lg:pl-0' : 'lg:pl-8'}
                                
                                max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:gap-1 
                                max-lg:flex-1 max-lg:h-full max-lg:rounded-t-xl max-lg:rounded-r-none 
                                max-lg:border-l-0 max-lg:p-2 max-lg:min-w-0
                                ${path === nav.link && 'max-lg:border-t-4 max-lg:border-l-0'}
                            `}
                            title={isMinimized ? nav.linkName : undefined}
                        >
                            <Image 
                                src={path === nav.link ? nav.activeImg : nav.img} 
                                width={24} 
                                height={24} 
                                alt={nav.linkName}
                                className="max-lg:w-5 max-lg:h-5 flex-shrink-0"
                            />
                            <span className={`font-bold transition-all duration-300
                                lg:text-[16px]
                                max-lg:text-[9px] max-lg:text-center max-lg:leading-tight max-lg:whitespace-nowrap max-lg:overflow-hidden max-lg:text-ellipsis max-lg:w-full
                                ${isMinimized ? 'lg:hidden' : 'lg:block'}
                            `}>
                                <span className="lg:hidden">{nav.shortName}</span>
                                <span className="max-lg:hidden">{nav.linkName}</span>
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Minimize Button - Desktop only */}
                <div className={`p-8 max-lg:hidden transition-all duration-300 ${isMinimized ? 'p-4' : ''}`}>
                    <button 
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="flex items-center gap-4 text-[#B3B3B3] hover:text-white transition-colors w-full"
                        title={isMinimized ? "Expand Menu" : "Minimize Menu"}
                    >
                        <Image 
                            src='/minimise.png' 
                            height={24} 
                            width={24} 
                            alt="minimize"
                            className={`transition-transform duration-300 ${isMinimized ? 'rotate-180' : ''}`}
                        />
                        <span className={`transition-all duration-300 ${isMinimized ? 'lg:hidden' : 'lg:block'}`}>
                            Minimize Menu
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}