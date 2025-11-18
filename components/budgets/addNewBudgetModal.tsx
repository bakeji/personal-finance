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
import AddNewBudget from "./addNewBudgetl"

export default function AddNewBudgetModal(){
    return(
       <Dialog>
            <DialogTrigger>
            <button className="w-[154px] h-[53px] bg-[#201F24] rounded-[16px] font-[700] text-white text-[14px] px-2 py-4 ">+Add New Budget</button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add New Budget</DialogTitle>
                <DialogDescription> Choose a category to set a spending budget. These categories can help you monitor spending.</DialogDescription>
                </DialogHeader>

                <AddNewBudget />

            </DialogContent>

       </Dialog>
    )
}