
import { Progress } from "@/components/ui/progress"
import MoreBtn from "./moreBtn"
import { useBudget } from "@/lib/hooks/useBudjet"
import { Spinner } from "../ui/spinner";



export default function BudgetType(){
    const {budgets,loading,error} = useBudget();

    if(loading){
        return(
            <div className="w-full flex items-center justify-center p-8">
                <Spinner />
            </div>
        )
    }


    if(error){
        return(
            <div className="w-full flex items-center justify-center p-8">
                <p className="text-red-500">Error: {error}</p>
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