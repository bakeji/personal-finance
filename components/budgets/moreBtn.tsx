import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import Image from "next/image";
import EditBudgetModal from "./editBudgetModal";
import { useState } from "react";
import DeletePotModal from "../pots/deletePotModal";

  interface MoreBtnProps {
    budgetId: string;
}



export default function MoreBtn({ budgetId }: MoreBtnProps){
 

    return(
        <Popover  >
            <PopoverTrigger className="cursor-pointer">
                 <Image src='/icon-ellipsis.svg' width={13} height={4} alt="icons" /> 
            </PopoverTrigger>
            <PopoverContent className=' flex flex-col items-start justify-center  w-full ' >
                <EditBudgetModal  budgetId={budgetId} />
                <DeletePotModal budgetId={budgetId}  />
        
            </PopoverContent>
        </Popover>

    )
}