
import { Progress } from "@/components/ui/progress"
import MoreBtn from "./moreBtn"
import { useBudget } from "@/lib/hooks/useBudjet"




export default function BudgetType(){
    const {budgets} = useBudget();

    if(!budgets || budgets.length === 0){
    return(
        <div className="bg-white p-8 md:p-12 rounded-xl text-center w-full border-2 border-dashed border-[#F8F4F0]">
            <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#F8F4F0] rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl md:text-5xl">💰</span>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-[#201F24] mb-2">No Budgets </h3>
                <p className="text-sm md:text-base text-[#696868] max-w-md">
                    You haven't created any budgets yet. Start managing your spending by setting up budget categories.
                </p>
            </div>
        </div>
    )
}

    


    return(
        <div  className="w-full flex flex-col gap-5 " >
            {budgets.map((budget)=>{
                const Remaining = budget.maximumSpend - budget.currentSpend;
                const percentSpent = (budget.currentSpend / budget.maximumSpend) * 100;
                return(

            <div key={budget.id} className="bg-white p-4 border-box rounded-2xl ">
                <div className='flex justify-between w-full' >
                    <div className="flex items-center gap-2 " >
                        <span className={`w-4 h-4 rounded-[50%] `}  style={{backgroundColor: budget.colorCode}}></span>
                        <h2 className="font-bold text-xl " >{budget.category}</h2>
                    </div>
                    <MoreBtn budgetId={budget.id} />
                </div>
                <p className="mt-4 font-medium text-sm text-[#696868]">{`Maximum of $${budget.maximumSpend}`}</p>
                <div className="mt-4">
                    <Progress value={percentSpent} 
                    className="h-10 rounded-2 mt-2 bg-[#F8F4F0] [&>div]:bg-red-600 " 
              />
                       <style jsx>{`
        .progress-indicator > div {
            background-color: ${budget.colorCode} !important;
        }
    `}</style>
                </div>
                <div className='flex justify-between items-center w-full mt-4 ' >
                    <div className='p-1 w-1/2 border-l-4' style={{borderLeftColor: budget.colorCode}}>
                        <p className='ml-2 font-normal text-xs text-[#696868]">'>Spent</p>
                        <p className='ml-2 font-bold text-sm text-[#201F24]'>{budget.currentSpend}</p>
                    </div>
                    <div className='p-1 w-1/2 border-l-4 border-[#F8F4F0]'>
                        <p className='ml-2 font-normal text-xs text-[#696868]'>Remaining</p>
                        <p className='ml-2'>${Remaining}</p>
                    </div>
                </div>


            </div>
            )})}

        </div>
    )
}