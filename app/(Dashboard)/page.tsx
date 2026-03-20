import Menu from "@/components/menu";
import Balance from "@/components/overviewPage/balances";
import BudgetCard from "@/components/overviewPage/budgets";
import PotsCard from "@/components/overviewPage/potscards";
import RecurringCard from "@/components/overviewPage/recurring";
import TransactionCard from "@/components/overviewPage/transactions";
import PageTitle from "@/components/pageTitle";

export default function Overview(){

    return (
        
            <div className="  p-8 w-full" >
                <PageTitle/>
                <Balance/>
                
                <div className="mt-4 flex justify-between  max-lg:flex-col  ">
                    <div className="w-[55%] max-lg:w-full  ">
                        <PotsCard/>
                        {/* <TransactionCard /> */}
                        <RecurringCard/>

                    </div>

                    <div className="w-[43%] max-lg:w-full ">
                        <BudgetCard />
                       
                    </div>
                </div>

            </div>
    )
}