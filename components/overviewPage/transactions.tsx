import Link from "next/link";
import Image from "next/image"
export default function TransactionCard(){
    return(
        <div className='w-full mt-4 bg-white p-8 rounded-[12px] '>
            <div className="flex justify-between mb-2  " >
                <h2 className="font-[700] text-[20px] text-[#201F24] ">Transactions</h2>
                <Link className="flex items-center justify-center gap-1 font-[400] text-[14px] text-[#696868]"  href='/pots'> view all  <Image src='/arrow.png' width={12} height={12} alt="icons" /> </Link>
            </div>

            <div className="flex flex-col gap-2 ">
                <div className = 'flex justify-between items-center'>
                    <div className='flex gap-4 justify-center items-center' >
                        <div className="w-[40px] flex items-ceter justify-center h-[40px] rounded-[50%] bg-[#F8F4F0] ">
                            <p className='font-[700] text-[24px] ' >E</p>
                        </div>
                        <p className="font-[700] text-[14px] text-[#F8F4F0)] " >Emma Richardson</p>
                    </div>

                    <div  className="flex flex-col items-center gap-2 justify-center " >
                        <p className='text-[14px] text-[#201F24] font-[700] ' >$-75.00</p>
                        <p className='text-[12px] text-[#696868] font-[400] '  >19 Aug, 2025</p>
                    </div>
                </div>




            </div>
        </div>
    )
}