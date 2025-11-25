import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "../firebaseConfig";
import { deleteDoc, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

export interface Budget {
    id: string;
    category: string;
    maximumSpend: number;
    theme: string;
    colorCode: string;
    currentSpend: number;
    createdAt: any;
}


export  function useSingleBudget(budgetId: string | null){
    const [budget, setBudget] = useState<Budget | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null> (null)


    useEffect(()=>{
        if(!budgetId){
            setLoading(false)
            return;
        }

        const auth = getAuth(app)
        const db =  getFirestore(app)
        const user = auth.currentUser
           
        if(!user){
            setLoading(false)
            setError('user not authenticated')
            return;
        }

        const budgetRef = doc(db, 'users', user.uid, 'budgets', budgetId)

        const unSubscribe = onSnapshot(
            budgetRef,
            (snapshot) =>{
                if(snapshot.exists()){
                    setBudget({
                        id:snapshot.id,
                        ...snapshot.data()
                    } as Budget )
                } else{
                    setError('budget not found')
                }
                setLoading(false)
            },
            (err)=>{
                setError(err.message)
                setLoading(false)
            }
        )

        return ()=> unSubscribe()

    }, [budgetId])


    const updateBudget = async (data:Partial<Budget> )=>{
        if(!budgetId) return;

        const auth = getAuth(app)
        const db = getFirestore(app)
        const user = auth.currentUser

        if(!user){
            toast.error('user not authenticated')
            return;
        }

         try {
            const budgetRef = doc(db, "users", user.uid, "budgets", budgetId);
            await updateDoc(budgetRef, data);
            toast.success("Budget updated successfully!");
            return true;
        } catch (error) {
            const errorMessage = (error as Error).message;
            toast.error(`Error: ${errorMessage}`);
            return false;
        }
    };

    const deleteBudget = async()=>{
        if(!budgetId)return;

        const auth = getAuth(app);
        const db = getFirestore(app);
        const user = auth.currentUser;

        if(!user){
            toast.error('user not authenticated')
            return false;
        }

        try{
             const budgetRef = doc(db, "users", user.uid, "budgets", budgetId);
            await deleteDoc(budgetRef);
            toast.success("Budget deleted successfully!");
            return true;
        } catch (error) {
            const errorMessage = (error as Error).message;
            toast.error(`Error: ${errorMessage}`);
            return false;
        }
        


    }

    return { budget, loading, error, updateBudget, deleteBudget };


    }


