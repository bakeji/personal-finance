"use client";
import Link from "next/link";
import Image from "next/image";
import Chart from "./chart";



export default function BudgetCard(){
  
    return(
        <div className='w-full mt-4 bg-white p-8 rounded-[12px] '>
            <div className="flex justify-between mb-2  ">
                <h2 className="font-[700] text-[20px] text-[#201F24] ">Budgets</h2>
                <Link className="flex items-center justify-center gap-1 font-[400] text-[14px] text-[#696868]"   href='/budget'> see details  <Image src='/arrow.png' width={12} height={12} alt="icons" /> </Link>
            </div>

            <div className="w-full h-[300px] flex items-center justify-center">
                <Chart/>
            </div>
            
        </div>   
    )
     }