import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import Image from "next/image";
    import { useState } from "react";
import EditPot from "./editPot";
import EditPotModal from "./editPotModal";
import DeletePotModal from "./deletePotModal";

  interface MoreBtnProps {
    potId: string;
}



export default function MoreBtn( {potId}:MoreBtnProps){
 

    return(
        <Popover  >
            <PopoverTrigger className="cursor-pointer">
                 <Image src='/icon-ellipsis.svg' width={13} height={4} alt="icons" /> 
            </PopoverTrigger>
            <PopoverContent className=' flex flex-col items-start justify-center  w-full ' >
                <EditPotModal potId={potId} />
               <DeletePotModal potId={potId} />
        
            </PopoverContent>
        </Popover>

    )
}