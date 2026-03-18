'use client'
import Link from "next/link";
import Image from "next/image"
import { useBills } from "@/lib/hooks/useBill";
export default function RecurringCard(){
    const { totalMonthly, totalYearly, bills  } = useBills()
    return(
        <div className='w-full mt-4 bg-white p-8 rounded-[12px] '>
            <div className="flex justify-between mb-2  ">
                <h2 className="font-[700] text-[20px] text-[#201F24] ">Recurring Bills</h2>
                <Link className="flex items-center justify-center gap-1 font-[400] text-[14px] text-[#696868]"  href='/pots'> see details  <Image src='/arrow.png' width={12} height={12} alt="icons" /> </Link>
            </div>

            <div className="flex items-start gap-2 flex-col">
            


                <div className="flex items-center w-full justify-between rounded-[8px] border-l-4 bg-[#F8F4F0] p-5 border-[#277C78]" >
                    <p>Total Bills</p>
                    <p>{bills.length}</p>
                </div>

                  <div className="flex items-center w-full justify-between rounded-[8px] border-l-4 bg-[#F8F4F0] p-5  border-[#F2CDAC]" >
                    <p>Monthly Bills</p>
                    <p>{`$ ${totalMonthly}`}</p>
                </div>

                  <div  className="flex items-center w-full justify-between rounded-[8px] border-l-4 bg-[#F8F4F0] p-5 border-[#82C9D7]" >
                    <p>Yearly Total</p>
                    <p>{`$ ${totalYearly}`}</p>
                </div>
                
                
            </div>
        </div>
    )
}