
import { usePot } from "@/lib/hooks/usePots";
import MoreBtn from "./morebtn";
import { Progress } from "@/components/ui/progress"
import AddMoneyModal from "./addMoney";
import WithdrawMoneyModal from "./withdrawMoney";


//   interface MoreBtnProps {
//     potId: string;
// }

export default function PotType( ){

      const {pots} = usePot();

     if(!pots || pots.length === 0){
    return(
        <div className="bg-white p-8 md:p-12 rounded-xl text-center w-full border-2 border-dashed border-[#F8F4F0]">
            <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#F8F4F0] rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl md:text-5xl">🏺</span>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-[#201F24] mb-2">No Savings Pots</h3>
                <p className="text-sm md:text-base text-[#696868] max-w-md">
                    You haven't created any savings pots yet. Create one to start saving towards your goals!
                </p>
            </div>
        </div>
    )
}
    
    
    return(
        <div className="grid grid-cols-2  gap-5 w-full max-lg:grid-cols-1  ">

            {pots.map((pot)=>{

               
                const percentSaved = (pot.currentSaved/pot.target) * 100

                return(


            <div key={pot.id} className="bg-white p-4 border-box rounded-2xl">
                <div className='flex justify-between w-full' >
                    <div className="flex items-center gap-4 " >
                        <span className={`w-4 h-4 rounded-[50%] `}  style={{backgroundColor: pot.colorCode}}></span>
                        <h2 className="font-bold text-xl " >{pot.potsName}</h2>
                    </div>
                    <MoreBtn potId={pot.id} />
                </div>

                <div className="py-9 max-lg:py-5 ">
                    <div className="flex justify-between items-center mb-5 " >
                        <p className="text-[14px] font-[400] text-[#696868] " >Total Saved</p>
                        <h1 className="text-[32px] font-bold text-[#201F24] " > ${pot.currentSaved}</h1>
                    </div>

                    <div>
                        <Progress value={percentSaved} className=" w-full rounded-[4px] " />

                        <div className="flex items-center text-[#696868] justify-between mt-4 " >
                            <p className=" text-[12px] font-bold " >{percentSaved} %</p>
                            <p className=" font-[400] text-[12px] " >Target of ${pot.target}</p>
                        </div>

                    </div>


                </div>

                <div className="flex gap-4 justify-between p-2">
                    <AddMoneyModal potId={pot.id} />
                    <WithdrawMoneyModal potId={pot.id} />
                </div>

                
               
            </div>
             )})}

        </div>
    )
}