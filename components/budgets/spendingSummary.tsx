import { useBudget } from "@/lib/hooks/useBudjet";

export default function SpendingSummary(){

    const {budgets, loading, error} = useBudget();

    if(loading){
        return(
            <div className="w-full h-full flex items-center justify-center p-4">
                <p className="text-[#696868]">Loading spending summary...</p>
            </div>
        )
    }
    return(
        <div className="p-2 " >
            <h1 className="mb-4 font-bold text-xl text-[#201F24] ">Spending Summary</h1>
            {budgets.map((budget)=> (
            <div key={budget.id} className="flex flex-col gap-4  ">
                <div  className="flex justify-between border-b-[#F2F2F2] border-b p-2 items-center border-l-4 mt-3 " style={{borderLeftColor: budget.colorCode}}>
                    <p className='font-normal text-sm text-[#696868] ' >{budget.category} </p>
                    <p className='text-sm font-normal text-[#696868]'><span className="text-[#201F24] font-bold text-[16px] ">${budget.currentSpend.toFixed(2)}</span> of ${budget.maximumSpend.toFixed(2)}</p>
                </div>
            </div>
            ))}
        </div>
    )
}