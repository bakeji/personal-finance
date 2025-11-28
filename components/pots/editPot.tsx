import{z} from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import { useSinglePot } from "@/lib/hooks/useSinglePot";

interface EditPotProps {
    potId: string;
    onClose?: () => void;
}

export default function EditPot({ potId, onClose }: EditPotProps){
    const {pot, loading:potLoading, updatePot} = useSinglePot(potId)
    const [loading, setLoading] = useState(false)
  
    const themes =[
        {id:1, colorCode:'#277C78', color: 'Green', used:false},
        {id:2, colorCode:'#F2CDAC', color:'Yellow', used:false },
        {id:3, colorCode:'#82C9D7', color:'Cyan', used:false },
        {id:4, colorCode:'#626070', color:'Navy', used:false },
        {id:5, colorCode:'#C94736', color:'Red', used:false },
        {id:6, colorCode:'#826CB0', color:'Purple', used:false },
        {id:7, colorCode:'#597C7C', color:'Turquoise', used:false },
    ]

    const editPotSchema = z.object({
    potsName: z.string().min(1, "pot name is required"),
    target: z.number().min(1, "Maximum spend must be greater than 0"),
    theme: z.string().min(1, "Theme is required"),
})

type EditPot = z.infer<typeof editPotSchema>;



const {register, handleSubmit, reset, formState:{errors}} =  useForm<EditPot>({
    resolver: zodResolver(editPotSchema),
    defaultValues: {
            potsName: pot?.potsName || '',
            target: pot?.target || 0,
            theme: pot?.theme || '',
        }
})



useEffect(()=>{
    if(pot){
        reset({
           potsName: pot.potsName,
            target: pot.target,
            theme: pot.theme
        })
    }
}, [pot, reset])


async function handleEditPot(data: EditPot){
    setLoading(true)

    const selectedTheme = themes.find(t => t.color === data.theme )

    const success = await updatePot({
            potsName: data.potsName,
            target: data.target,
            theme: data.theme,
            colorCode: selectedTheme?.colorCode || '#000000',
        });

        setLoading(false)

        if(success && onClose){
            onClose()
        }
}


    if(potLoading){
        return(
            <div className="flex items-center justify-center p-8">
               <Spinner />
            </div>
        )
    }





    
        return(
            <div>
                
                <form className="flex flex-col gap-4 " onSubmit={handleSubmit(handleEditPot)} >

                <div className='flex flex-col gap-2 '>
                    <label className=" font-bold text-[#696868] text-[12px] " htmlFor="pots-name">Pot Name</label>
                    <input 
                    className="w-full p-4 py-2 outline-none bg-transparent rounded-[8px]  border-[#98908B] border"
                    type="text"
                 
                    id="pots-name" 
                    {...register('potsName')}
                    />

                    {errors.potsName && <span className="text-red-500 text-xs">
                        {errors.potsName.message}
                    </span> }
                </div>

                <div className='flex flex-col gap-2 '>
                    <label className=" font-bold text-[#696868] text-[12px] "  htmlFor="maximumSpend"> Maximum Spend</label>
                    <div className="p-4 border-[#98908B] border-1 py-2 flex items-center gap-2  rounded-[8px] " >
                        <span className=" font-[400] text-[14px] text-[#98908B] " >$ </span>
                        <input className=" w-full border-none outline-none bg-transparent " 
                        type="number" 
                        id="maximumSpend"
                        placeholder="e.g 2000" 
                        {...register('target', {valueAsNumber:true})}
                        />
                    </div>    

                    {errors.target && 
                    <span className="text-red-500 text-xs">
                        {errors.target.message}
                    </span> }
                </div>

                <div className=" flex flex-col gap-2 " >
                    <label className=" font-bold text-[#696868] text-[12px] " htmlFor="theme">Theme</label>
                    <select className="p-4  border-[#98908B] border-1 py-2 rounded-[8px] "
                    id="theme"
                    {...register('theme')}
                    >
                        <option value="">select a theme</option>
                        {themes.map((theme, id)=>(
                        <option key={id} value={theme.color}>
                         {theme.color} </option>
                    ))}
                    </select>

                    {errors.theme && <span>
                        {errors.theme.message}
                    </span> }
                </div>

                <button type="submit"
                
                 className='w-full h-[53px] bg-[#201F24] rounded-[8px]
                  text-white text-[14px] font-bold flex items-center cursor-pointer justify-center ' >
                {loading? <Spinner /> : 'Edit Pot'} </button>
            </form>
       
            </div>
        )
    }