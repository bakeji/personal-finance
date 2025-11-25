'use client'
import AddNewBudgetModal from "@/components/budgets/addNewBudgetModal";
import BudgetType from "@/components/budgets/budgetType";
import SpendingSummary from "@/components/budgets/spendingSummary";
import Menu from "@/components/menu";
import Chart from "@/components/overviewPage/chart";

export default function(){
    return(
        <div className="flex min-h-screen w-full  max-lg:flex-col-reverse">
             <div className="w-1/4 top-0 sticky h-screen max-lg:w-full max-lg:h-auto ">
                <Menu/>
            </div>

            <div className="w-3/4 p-8  max-lg:w-[98%] max-lg:p-6 max-lg:mx-auto">
                <div className="flex justify-between ">
                    <h1 className="text-[32px] font-[700] text-[#201F24] " >Budgets</h1>
                    <AddNewBudgetModal />
                
                </div>

                <div className="flex w-full gap-4  mt-10  max-lg:flex-col max-w-md:flex-row  " >
                    <div className="w-2/5 bg-white p-2 rounded-xl max-lg:w-full  max-lg:flex  ">
                        <div className='relative h-[300px]' >
                            <Chart/>
                        </div>
                        <SpendingSummary/>
                    </div>


                    <div className="w-1/2 max-lg:w-full  ">
                        <BudgetType />
                    </div>
                   
                </div>
            </div>
        </div>
    )
}