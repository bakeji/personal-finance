import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "../firebaseConfig";
import { collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";

export interface Pot {
    id: string;
    potsName: string;
    target: number;
    theme: string;
    colorCode: string;
    currentSaved: number;
    createdAt: any;
}








export function usePot(){
    const [pots, setPots] = useState<Pot[]>([]);
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

        const potsRef = collection(db, 'users', user.uid, 'pots')
        const q = query(potsRef, orderBy('createdAt', 'desc'));

        const unSubscribe = onSnapshot(
            q,
           (onSnapshot) => {
            const potsData = onSnapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            })) as Pot[];
            setPots(potsData);
            setLoading(false);
           },

           (err) =>{
            setError(err.message);
            setLoading(false);
           }
        )
        return () => unSubscribe();
    }, [])

    return {pots,loading,error}


}