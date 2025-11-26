import { usePot } from "@/lib/hooks/usePots";
import MoreBtn from "./morebtn";
import { Progress } from "@/components/ui/progress"
import { Spinner } from "../ui/spinner";

  interface MoreBtnProps {
    potId: string;
}

export default function PotType({potId}:MoreBtnProps ){

      const {pots,loading,error} = usePot();
    
        if(loading){
            return(
                <div className="w-full flex items-center justify-center p-8">
                    <Spinner/>
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
        <div className="grid grid-cols-2  gap-5 w-full">

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

                <div className="py-9">
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
                    <button className="w-[50%] cursor-pointer bg-[#F8F4F0] rounded-[8px] text-[14px] font-[700] p-4 text-center " >+ Add money</button>
                    <button className="w-[50%] cursor-pointer bg-[#F8F4F0] rounded-[8px] text-[14px]  font-[700] p-4 text-center " >Withdraw</button>
                </div>

                
               
            </div>
             )})}

        </div>
    )
}