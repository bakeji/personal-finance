export default function EditBudget(){
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
            <div>
                <div>
                    <h1>Edit Budget</h1>
                </div>
    
                <p>Choose a category to set a spending budget. These categories can help you monitor spending.</p>
    
                <form action="">
                    <div>
                        <label htmlFor="category"> Budget Category</label>
                        <select name="category" id="category">
                            <option value=""></option>
                        </select>
                    </div>
    
                    <div>
                        <label htmlFor="spend"> Maximum Spend</label>
                       <input type="text" name="spend" id="spend" />
                    </div>
    
                    <div>
                        <label htmlFor="theme">Theme</label>
                        <select name="theme" id="theme">
                            <option value=""></option>
                        </select>
                    </div>
    
                    <button>Save Changes </button>
                </form>
            </div>
        )
    }