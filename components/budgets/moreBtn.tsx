import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import Image from "next/image";

export default function MoreBtn(){
    return(
        <Popover>
            <PopoverTrigger>
                <button> <Image src='/icon-ellipsis.svg' width={13} height={4} alt="icons" /> </button>
            </PopoverTrigger>
            <PopoverContent className=' flex flex-col items-center justify-center ' >
                <button>Edit Budget</button>
                <button>Delete Budget</button>
        
            </PopoverContent>
        </Popover>

    )
}