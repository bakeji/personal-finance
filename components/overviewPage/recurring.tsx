import Link from "next/link";
import Image from "next/image"
export default function RecurringCard(){
    const billsArray=[
        { id:1, description: 'Paid Bills', amount: '$0'},
        { id:2, description: 'Total Upcoming', amount: '$0'},
        { id:3, description: 'Due soon', amount: '$0'},
    ]
    return(
        <div className='w-full mt-4 bg-white p-8 rounded-[12px] '>
            <div className="flex justify-between mb-2  ">
                <h2 className="font-[700] text-[20px] text-[#201F24] ">Recurring Bills</h2>
                <Link className="flex items-center justify-center gap-1 font-[400] text-[14px] text-[#696868]"  href='/pots'> see details  <Image src='/arrow.png' width={12} height={12} alt="icons" /> </Link>
            </div>

            <div className="flex items-start gap-2 flex-col">
                {billsArray.map((bills)=>(


                <div key={bills.id} className={`flex items-center w-full justify-between rounded-[8px] border-l-4 bg-[#F8F4F0] p-5 ${bills.id===1? 'border-[#277C78]': bills.id===2? 'border-[#F2CDAC]': 'border-[#82C9D7]'} `} >
                    <p>{bills.description}</p>
                    <p>{bills.amount}</p>
                </div>
                ))}
                
            </div>
        </div>
    )
}