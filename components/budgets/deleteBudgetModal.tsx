
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
import { useSingleBudget } from "@/lib/hooks/useSingleBudget";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

interface DeleteBudgetModalProps {
    budgetId: string;
}
export default function DeleteBudgetModal({budgetId}:DeleteBudgetModalProps){
    const{budget, deleteBudget} = useSingleBudget(budgetId)
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

     async function handleDelete() {
        setLoading(true);
        const success = await deleteBudget();
        setLoading(false);
        
        if (success) {
            setOpen(false);
        }
    }


    return(

        <Dialog open={open} onOpenChange={setOpen} >
  <DialogTrigger className="p-2 text-[#C94736] font-[400] w-full  text-[14px] cursor-pointer " >Delete Budget</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete '{budget?.category}'</DialogTitle>
      <DialogDescription className=" mt-3">
        Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.
      </DialogDescription>
    </DialogHeader>


     <div className="flex flex-col w-full ">
           
              <button 
              className="w-full p-4 bg-[#C94736] rounded-[8px] cursor-pointer
               text-white font-bold text-[14px] flex items-center justify-center" 
              onClick={handleDelete}
              disabled= {loading}
              >
                {loading? <Spinner/>: 'Yes, Confim Deletion'}</button>
             <DialogClose className="rounded-[8px]  font-[400] text-[#696868] cursor-pointer text-[14px] w-full p-4 " >No, Go Back </DialogClose>
          </div>
  </DialogContent>
</Dialog>

    )
}