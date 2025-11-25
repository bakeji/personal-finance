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
import AddNewBudget from "./addNewBudget"
import { useState } from "react";

export default function AddNewBudgetModal(){
    const [open, setOpen] = useState(false);
    return(
       <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger className="w-[154px] cursor-pointer h-[53px] bg-[#201F24] rounded-[16px] font-[700] text-white text-[14px] px-2 py-4 ">
            +Add New Budget
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add New Budget</DialogTitle>
                <DialogDescription> Choose a category to set a spending budget. These categories can help you monitor spending.</DialogDescription>
                </DialogHeader>

                <AddNewBudget  onClose={() => setOpen(false)} />

            </DialogContent>

       </Dialog>
    )
}