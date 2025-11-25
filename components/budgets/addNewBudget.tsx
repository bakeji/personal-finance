import{z} from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebaseConfig";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { maximum } from "zod/v4-mini";
import { Spinner } from "../ui/spinner";

interface AddNewBudgetProps{
    onClose?: () => void;
}

export default function AddNewBudget( {onClose}: AddNewBudgetProps ){

    const categories=[
    {id:1, category: 'Entertainment'},
    {id:2, category:'Bills'},
    {id:3, category:'Grocery'},
    {id:4, category:'Dining Out'},
    {id:5, category:'Transportation'},
    {id:6, category:'Personal care' },
    {id:7, category:'Education' }
]
const themes =[
    {id:1, colorCode:'#277C78', color: 'Green', used:false},
    {id:2, colorCode:'#F2CDAC', color:'Yellow', used:false },
    {id:3, colorCode:'#82C9D7', color:'Cyan', used:false },
    {id:4, colorCode:'#626070', color:'Navy', used:false },
    {id:5, colorCode:'#C94736', color:'Red', used:false },
    {id:6, colorCode:'#826CB0', color:'Purple', used:false },
    {id:7, colorCode:'#597C7C', color:'Turquoise', used:false },
]

const [loading, setLoading] = useState(false);

const budgetSchema = z.object({
    category: z.string().min(1, "Category is required"),
    maximumSpend: z.number().min(1, "Maximum spend must be greater than 0"),
    theme: z.string().min(1, "Theme is required"),
})

type Budget = z.infer<typeof budgetSchema>;

const {register, handleSubmit, formState:{errors}} =  useForm<Budget>({
    resolver: zodResolver(budgetSchema)
})

async function addNewBudget(data:Budget){
    setLoading(true);
    try{
        const auth = getAuth(app)
        const db = getFirestore(app)
        const user = auth.currentUser;
        if(!user){
            toast.error('you must be logged in to add a budget');
            return;
        }

        // get color code for selectedd theme
        const selectedTheme = themes.find((theme)=> theme.color === data.theme);

        // add budget to firestore
        await addDoc(collection(db, 'users', user.uid, 'budgets'), {
            category: data.category,
            maximumSpend:data.maximumSpend,
            theme:data.theme,
            colorCode: selectedTheme ? selectedTheme.colorCode : '',
            currentSpend: 0,
            createdAt:serverTimestamp()
        })

        toast.success('Budget added successfully!');
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
       
            <form className="flex flex-col gap-4 " onSubmit={handleSubmit(addNewBudget)} >

                <div className='flex flex-col gap-2 '>
                    <label className=" font-bold text-[#696868] text-[12px] " htmlFor="category"> Budget Category</label>
                    <select className="p-4 border-[#98908B] py-2 border-1 rounded-[8px]  " 
                     id="category"
                      {...register('category')}
                      >
                       <option value="">select a category</option>
                        { categories.map((cate)=>(
                        <option key={cate.id} value={cate.category}>{cate.category}</option>
                    )) }

                    </select>

                    {errors.category && <span className="text-red-500 text-xs">
                        {errors.category.message}
                    </span> }
                </div>

                <div className='flex flex-col gap-2 '>
                    <label className=" font-bold text-[#696868] text-[12px] "  htmlFor="maximumSpend"> Maximum Spend</label>
                    <div className="p-4 border-[#98908B] border-1 h-8 flex items-center gap-2  rounded-[8px] " >
                        <span className=" font-[400] text-[14px] text-[#98908B] " >$ </span>
                        <input className=" w-full border-none outline-none bg-transparent " 
                        type="number" 
                        id="maximumSpend"
                        placeholder="e.g 2000" 
                        {...register('maximumSpend', {valueAsNumber:true})}
                        />
                    </div>    

                    {errors.maximumSpend && 
                    <span className="text-red-500 text-xs">
                        {errors.maximumSpend.message}
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

                <button type="submit" className='w-full h-[53px] bg-[#201F24] rounded-[8px] text-white text-[14px] font-bold  ' >
                     {loading? <Spinner /> :'Add Budget'} </button>
            </form>
       
    )
}