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

import { useState } from "react"
import EditPot from "./editPot";

interface MoreBtnProps {
    potId: string;
}

export default function EditPotModal({potId}:MoreBtnProps){
       const [open, setOpen] = useState(false)
    return(
          <Dialog open={open} onOpenChange={setOpen} >
                    <DialogTrigger className="border-b  font-[400] text-[14px] w-full cursor-pointer p-2">
                        Edit Pot 
                    </DialogTrigger>
        
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Edit Pot</DialogTitle>
                        <DialogDescription>If your saving targets change, feel free to update your pots.</DialogDescription>
                        </DialogHeader>

                        <EditPot potId={potId} onClose={() => setOpen(false)} />
        
        
                    </DialogContent>
        
               </Dialog>
    )

}