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
import EditBudget from "./editBudget"
import { useState } from "react"

interface MoreBtnProps {
    budgetId: string;
}

export default function EditBudgetModal({ budgetId }: MoreBtnProps){
       const [open, setOpen] = useState(false)
    return(
          <Dialog open={open} onOpenChange={setOpen} >
                    <DialogTrigger className="border-b  font-[400] text-[14px] w-full cursor-pointer p-2">
                        Edit Budget 
                    </DialogTrigger>
        
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Edit Budget</DialogTitle>
                        <DialogDescription> As your budgets change, feel free to update your spending limits.</DialogDescription>
                        </DialogHeader>

                        <EditBudget  budgetId={budgetId} onClose={() => setOpen(false)} />
        
        
                    </DialogContent>
        
               </Dialog>
    )

}