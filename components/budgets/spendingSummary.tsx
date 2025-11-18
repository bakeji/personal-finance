export default function SpendingSummary(){
    return(
        <div className="p-2 " >
            <h1 className="mb-4 font-bold text-xl text-[#201F24] ">Spending Summary</h1>
            
            <div className="flex flex-col gap-2 ">
                <div className="flex justify-between p-2 items-center border-l-4 border-red-600">
                    <p className='font-normal text-sm text-[#696868] ' >Entertainment </p>
                    <p className='text-sm font-normal text-[#696868]'><span className="text-[#201F24] font-bold text-[16px] ">$10.00</span> of $40.00</p>
                </div>
            </div>
        </div>
    )
}