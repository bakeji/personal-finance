import Image from "next/image"
import Link from "next/link"
export default function Menu(){
    const navLinks =[
        {img: '/overview.png', link: './overview', linkName:'Overview' },
        {img: '/transactions.svg', link: './transactions', linkName:'Transactions' },
        {img: '/budget.png', link: './budget', linkName:'Budget' },
        {img: '/pots.png', link: './pots', linkName:'Pots' },
        {img: '/bills.png', link: '/bills', linkName:'Recurring Bills' },
    ]

    return(
        <div>
            <div>
                <Image src='/logo.png' width={121} height={22} alt="logo" />
            </div>
            
            <div>
                {navLinks.map((nav)=>(
                <div>
                    <Image src={nav.img} width={24} height={24} alt="icons" />
                    <Link href={nav.link}>{nav.linkName}</Link>
                </div>
                ))}

            </div>

            <button> <Image src='/minimise.png' height={24} width={24} alt="minimize" /> Minimize Menu </button>

        </div>
    )
}