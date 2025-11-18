export default function AddNewBudget(){
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

    return(
       
            <form className="flex flex-col gap-4 " action="">

                <div className='flex flex-col gap-2 '>
                    <label className=" font-bold text-[#696868] text-[12px] " htmlFor="category"> Budget Category</label>
                    <select className="p-4 border-[#98908B] border-1 h-8 rounded-[8px]  "
                     name="category" id="category">
                        { categories.map((cate)=>(
                        <option key={cate.id} value={cate.category}>{cate.category}</option>
                    )) }
                    </select>
                </div>

                <div className='flex flex-col gap-2 '>
                    <label className=" font-bold text-[#696868] text-[12px] "  htmlFor="spend"> Maximum Spend</label>
                    <div className="p-4 border-[#98908B] border-1 h-8 flex items-center gap-2  rounded-[8px] " >
                        <span className=" font-[400] text-[14px] text-[#98908B] " >$ </span>
                        <input className=" w-full border-none outline-none bg-transparent " type="text" name="spend" id="spend" placeholder="e.g 2000" />
                    </div>    
                </div>

                <div className=" flex flex-col gap-2 " >
                    <label className=" font-bold text-[#696868] text-[12px] " htmlFor="theme">Theme</label>
                    <select className="p-4 border-[#98908B] border-1 h-8 rounded-[8px] " name="theme" id="theme">
                        {themes.map((theme)=>(
                        <option value=""> {theme.color} </option>
                    ))}
                    </select>
                </div>

                <button className='w-full h-[53px] bg-[#201F24] rounded-[8px] text-white text-[14px] font-bold  ' >Add Budget </button>
            </form>
       
    )
}