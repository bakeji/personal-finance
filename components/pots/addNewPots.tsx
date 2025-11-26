import {z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebaseConfig";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { Target } from "lucide-react";
import { Spinner } from "../ui/spinner";

interface AddNewPotProps{
    onClose?: () => void;
}

export default function AddNewPots({onClose}: AddNewPotProps){
 
    const themes =[
    {id:1, colorCode:'#277C78', color: 'Green', used:false},
    {id:2, colorCode:'#F2CDAC', color:'Yellow', used:false },
    {id:3, colorCode:'#82C9D7', color:'Cyan', used:false },
    {id:4, colorCode:'#626070', color:'Navy', used:false },
    {id:5, colorCode:'#C94736', color:'Red', used:false },
    {id:6, colorCode:'#826CB0', color:'Purple', used:false },
    {id:7, colorCode:'#597C7C', color:'Turquoise', used:false },
]

const potsSchema=z.object({
    potsName: z.string().min(1, "pot name is required"),
    target: z.number().min(1, "Maximum spend must be greater than 0"),
    theme: z.string().min(1, "Theme is required"),
})

type Pots = z.infer<typeof potsSchema>


const {register, handleSubmit, formState:{errors}} =  useForm<Pots>({
    resolver: zodResolver(potsSchema)
})

const [loading, setLoading] = useState(false)

async function addNewPot(data:Pots){
    console.log('clicked')
    setLoading(true);
    try{
        const auth = getAuth(app)
        const db = getFirestore(app)
        const user = auth.currentUser;
        if(!user){
            toast.error('you must be logged in to add a pot');
            return;
        }

        // get color code for selectedd theme
        const selectedTheme = themes.find((theme)=> theme.color === data.theme);

        // add pot to firestore
        await addDoc(collection(db, 'users', user.uid, 'pots'), {
            potsName: data.potsName,
            target:data.target,
            theme:data.theme,
            colorCode: selectedTheme ? selectedTheme.colorCode : '',
            currentSaved:  0,
            createdAt:serverTimestamp()
        })

        toast.success('pot added successfully!');
        onClose?.();

    }catch(error){
        const errorMessage = (error as Error).message;
        toast.error(`Error: ${errorMessage}`);
    }
    finally{
        setLoading(false);
    }

}

return(
                <form className="flex flex-col gap-4 " onSubmit={handleSubmit(addNewPot)}  >

                <div className='flex flex-col gap-2 '>
                    <label className=" font-bold text-[#696868] text-[12px] " htmlFor="pot">Pot Name</label>
                    <input  
                    className=" w-full outline-none p-4 py-2 border-[#98908B] border-1 rounded-[8px] "  
                    type="text" 
                     id="pot" 
                     {...register('potsName')}
                     />

                     {errors.potsName && <span>
                        {errors.potsName.message}
                     </span> }
                </div>

                <div className='flex flex-col gap-2 '>
                    <label className=" font-bold text-[#696868] text-[12px] "  htmlFor="target">Target</label>
                    <div className="p-4 border-[#98908B] border-1 py-2 flex items-center gap-2  rounded-[8px] " >
                        <span className=" font-[400] text-[14px] text-[#98908B] " >$ </span>
                        <input className=" w-full border-none outline-none bg-transparent " 
                        type="number" 
                        id="target"
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

                <button type="submit" className='w-full cursor-pointer flex items-center justify-center h-[53px] bg-[#201F24] rounded-[8px] text-white text-[14px] font-bold  ' >
                    {loading? <Spinner/>:  ' Add pot'} </button>
            </form>
)

}