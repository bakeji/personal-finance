import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSinglePot } from "@/lib/hooks/useSinglePot"
import { Progress } from "../ui/progress"
import {z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

interface AddMoney{
    potId: string
    
}

export default function WithdrawMoneyModal({potId}:AddMoney){
const {pot, addMoney} = useSinglePot(potId)
const [open, setOpen] = useState(false);

const addMoneySchema = z.object({
    amount:z.number().min(1, "Amount must be greater than 0"),
})

type AddMoney = z.infer<typeof addMoneySchema>

const {register, handleSubmit, formState:{errors}} =  useForm<AddMoney>({
    resolver: zodResolver(addMoneySchema)
})

const [loading, setLoading] = useState(false)

 
 if(!pot) return;

 const percentSaved = pot?.currentSaved / pot?.target  * 100

 const handleAddMoney = async(data:AddMoney) =>{
    setLoading(true)
    const success = await addMoney(data.amount);
    setLoading(false)

    if(success){
        setOpen(false)
    }
 }


    return(
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger className="w-[50%] cursor-pointer bg-[#F8F4F0] rounded-[8px] text-[14px] font-[700] p-4 text-center " >+ Add money</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add to savings</DialogTitle>
                <DialogDescription className="py-3">
                  Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.
                </DialogDescription>
                </DialogHeader>

                <div className="py-3">
                    <div className="flex justify-between items-center mb-5 " >
                        <p className="text-[14px] font-[400] text-[#696868] " >New Amount</p>
                        <h1 className="text-[32px] font-bold text-[#201F24] " > ${pot?.currentSaved}</h1>
                    </div>

                    <div>
                        <Progress value={percentSaved} className=" w-full rounded-[4px] " />

                        <div className="flex items-center text-[#696868] justify-between mt-4 " >
                            <p className=" text-[12px] font-bold " >{percentSaved} %</p>
                            <p className=" font-[400] text-[12px] " >Target of ${pot?.target}</p>
                        </div>

                    </div>


                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleAddMoney)} >
                 <div className='flex flex-col gap-2 '>
                    <label className=" font-bold text-[#696868] text-[12px] "  htmlFor="amount">Amount to Add</label>
                    <div className="p-4 border-[#98908B] border-1 py-2 flex items-center gap-2  rounded-[8px] " >
                        <span className=" font-[400] text-[14px] text-[#98908B] " >$ </span>
                        <input className=" w-full border-none outline-none bg-transparent " 
                        type="number" 
                        id="amount"
                        placeholder="0" 
                        {...register('amount', {valueAsNumber:true})}
                        />
                    </div>    
                </div>
                    <button
                     type="submit" 
                     disabled={loading}
                      className='w-full cursor-pointer flex items-center justify-center h-[53px] bg-[#201F24] rounded-[8px] text-white text-[14px] font-bold  ' >
                       { loading? <Spinner /> : 'Confirm Addition'}
                        </button>
                </form>

            </DialogContent>
        </Dialog>
    )
}