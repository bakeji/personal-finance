export default function Balance(){
    return(
        <div className="flex items-center justify-between w-full mt-4 max-md:flex-col max-md:gap-4 ">
            <div className="w-[32%] bg-[#201F24] rounded-[12px] p-6 max-md:w-full  ">
                <p className="text-white font-normal text-[14px] " >Current Balance</p>
                <p className="text-white font-bold text-[32px] " >$0.00</p>
            </div>

            <div className="w-[32%] bg-white rounded-[12px] p-6 max-md:w-full   ">
                <p className="text-[#696868] font-normal text-[14px] "  >Income</p>
                <p className="text-[#201F24] font-bold text-[32px] ">$0.00</p>
            </div>

            <div className="w-[32%] bg-white rounded-[12px] p-6 max-md:w-full   ">
                <p className="text-[#696868] font-normal text-[14px] " >Expenses</p>
                <p className="text-[#201F24] font-bold text-[32px]">$0.00</p>
            </div>
        </div>
    )
}