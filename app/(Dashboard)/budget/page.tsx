'use client'
import AddNewBudgetModal from "@/components/budgets/addNewBudgetModal";
import BudgetType from "@/components/budgets/budgetType";
import SpendingSummary from "@/components/budgets/spendingSummary";
import Chart from "@/components/overviewPage/chart";
import ProtectedRoute from "@/components/protectedRoutes";
import { useBudget } from "@/lib/hooks/useBudjet";

export default function Budget(){
        const { loading } = useBudget()

           if (loading) {
                return (
                    <ProtectedRoute >
                        <div className="flex items-center justify-center h-screen">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#277C78]"></div>
                        </div>
                    </ProtectedRoute>
                )
            }

    return(
      

         <ProtectedRoute>
                <div className="p-8 w-full ">
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
         </ProtectedRoute>
      
    )
}