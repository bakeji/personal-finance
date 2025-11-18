import Link from "next/link";
import Image from "next/image"
export default function PotsCard(){
    const potsArrayy=[
        {id:1, amount:'$0', purpose: 'savings' },
        {id:2, amount:'$0', purpose: 'Gift' },
        {id:3, amount:'$0', purpose: 'Concert Ticket' },
        {id:4, amount:'$0', purpose: 'New Laptop' }
    ]

    return(
        <div  className='w-full bg-white p-8 rounded-[12px] '>
            <div className="flex justify-between mb-2  ">
                <h2 className="font-[700] text-[20px] text-[#201F24] ">Pots</h2>
                <Link className="flex items-center justify-center gap-1 font-[400] text-[14px] text-[#696868] " href='/pots'> see details  <Image src='/arrow.png' width={12} height={12} alt="icons" /></Link>
                
            </div>

            <div className="flex gap-4 max-md:flex-col ">
                <div className="w-2/5 p-4 rounded-[12px] flex items-center justify-start gap-3 bg-[#F8F4F0] max-md:w-full ">
                    <Image src='/jar.svg' width={40} height={40} alt="icons" />
                    <div>
                        <p className='font-[400] text-[14px] text-[#696868] ' >Total saved</p>
                        <p className='font-[700] text-[32px] text-[#201F24] ' >$0</p>
                    </div>
                </div>

                <div className="w-[55%] grid-cols-2 grid gap-3 max-md:w-full ">
                    {potsArrayy.map((pots, id)=>(

                    <div key={id} className={`runded-[8px] p-2 border-l-4 ${pots.id===1? 'border-[#277C78]' : pots.id ===2? 'border-[#82C9D7]': pots.id===3? 'border-[#626070]':'border-[#F2CDAC]'}  `}  >
                        <p className="font-[400] text-[12px] text-[#696868] " >{pots.purpose}</p>
                        <p className='font-[700] text-[14px] text-[#201F24] ' >{pots.amount}</p>
                    </div>

                    ))}
                </div>




            </div>
        </div>
    )
}