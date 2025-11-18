
import { Progress } from "@/components/ui/progress"
import MoreBtn from "./moreBtn"
export default function BudgetType(){
    return(
        <div className="w-full flex flex-col gap-5 " >
            <div className="bg-white p-4 border-box rounded-2xl ">
                <div className='flex justify-between w-full' >
                    <div className="flex items-center gap-2 " >
                        <span className="w-4 h-4 rounded-[50%] bg-red-600 "></span>
                        <h2 className="font-bold text-xl " >Entertainment</h2>
                    </div>
                    <MoreBtn/>
                </div>
                <p className="mt-4 font-medium text-sm text-[#696868]">Maximum of $5000</p>
                <div className="mt-4">
                    <Progress value={65} className="h-10 rounded-2 mt-2 bg-[#F8F4F0] [&>div]:bg-red-600 " />
                </div>
                <div className='flex justify-between items-center w-full mt-4 ' >
                    <div className='p-1 w-1/2 border-l-4 border-red-600'>
                        <p className='ml-2 font-normal text-xs text-[#696868]">'>Spent</p>
                        <p className='ml-2 font-bold text-sm text-[#201F24]'>$100</p>
                    </div>
                    <div className='p-1 w-1/2 border-l-4 border-[#F8F4F0]'>
                        <p className='ml-2 font-normal text-xs text-[#696868]'>Remaining</p>
                        <p className='ml-2'>$35</p>
                    </div>
                </div>


            </div>


        </div>
    )
}