
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
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { useSinglePot } from "@/lib/hooks/useSinglePot";

interface DeletePotModalProps {
    potId: string;
}
export default function DeletePotModal({potId}:DeletePotModalProps){

  const {pot, deletePot} = useSinglePot(potId)
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

         async function handleDelete() {
        setLoading(true);
        const success = await deletePot();
        setLoading(false);
        
        if (success) {
            setOpen(false);
        }
    }




    return(

        <Dialog  open={open} onOpenChange={setOpen}  >
  <DialogTrigger className="p-2 text-[#C94736] font-[400] w-full  text-[14px] cursor-pointer " >Delete Pot</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete '{pot?.potsName}'</DialogTitle>
      <DialogDescription className=" mt-3">
        Are you sure you want to delete this Pot? This action cannot be reversed, and all the data inside it will be removed forever.
      </DialogDescription>
    </DialogHeader>


     <div className="flex flex-col w-full ">
           
              <button  
              className="w-full p-4 bg-[#C94736] rounded-[8px] cursor-pointer
               text-white font-bold text-[14px] flex items-center justify-center" 
              disabled={loading}
              onClick={handleDelete}
              >
                {loading? <Spinner/>: 'Yes, Confim Deletion'}</button>
             <DialogClose className="rounded-[8px]  font-[400] text-[#696868] cursor-pointer text-[14px] w-full p-4 " >No, Go Back </DialogClose>
          </div>
  </DialogContent>
</Dialog>

    )
}