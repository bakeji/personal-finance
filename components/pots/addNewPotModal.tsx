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
import AddNewPots from "./addNewPots";




export default function AddNewPotModal(){
    const [open, setOpen] = useState(false);
    return(
       <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger className="w-[154px] cursor-pointer h-[53px] bg-[#201F24] rounded-[16px] font-[700] text-white text-[14px] px-2 py-4 ">
            + Add New Pot
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add New Pot</DialogTitle>
                <DialogDescription>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</DialogDescription>
                </DialogHeader>

                <AddNewPots onClose={()=>{setOpen(false)}} />

            </DialogContent>

       </Dialog>
    )
}