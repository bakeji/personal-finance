import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "../firebaseConfig";
import { collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";

export interface Budget {
    id: string;
    category: string;
    maximumSpend: number;
    theme: string;
    colorCode: string;
    currentSpend: number;
    createdAt: any;
}

export function useBudget(){
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const auth = getAuth(app)
        const db = getFirestore(app)
        const user = auth.currentUser

        if(!user){
            setLoading(false)
            setError('User not authenticated')
            return;
        }

        const budgetsRef = collection(db, 'users', user.uid, 'budgets')
        const q = query(budgetsRef, orderBy('createdAt', 'desc'));

        const unSubscribe = onSnapshot(
            q,
           (onSnapshot) => {
            const budgetsData = onSnapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            })) as Budget[];
            setBudgets(budgetsData);
            setLoading(false);
           },

           (err) =>{
            setError(err.message);
            setLoading(false);
           }
        )
        return () => unSubscribe();
    }, [])

    return {budgets,loading,error}


}