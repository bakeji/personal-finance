import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "../firebaseConfig";
import { deleteDoc, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import { toast } from "sonner";


export interface Pot {
    id: string;
    potsName: string;
    target: number;
    theme: string;
    colorCode: string;
    currentSaved: number;
    createdAt: any;
}


export  function useSinglePot(potId: string | null){
    const [pot, setPot] = useState<Pot | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null> (null)


    useEffect(()=>{
        if(!potId){
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

        const potRef = doc(db, 'users', user.uid, 'pots', potId)

        const unSubscribe = onSnapshot(
            potRef,
            (snapshot) =>{
                if(snapshot.exists()){
                    setPot({
                        id:snapshot.id,
                        ...snapshot.data()
                    } as Pot )
                } else{
                    setError('pot not found')
                }
                setLoading(false)
            },
            (err)=>{
                setError(err.message)
                setLoading(false)
            }
        )

        return ()=> unSubscribe()

    }, [potId])


    const updatePot = async (data:Partial<Pot> )=>{
        if(!potId) return;

        const auth = getAuth(app)
        const db = getFirestore(app)
        const user = auth.currentUser

        if(!user){
            toast.error('user not authenticated')
            return;
        }

         try {
            const potRef = doc(db, "users", user.uid, "pots", potId);
            await updateDoc(potRef, data);
            toast.success("Pot updated successfully!");
            return true;
        } catch (error) {
            const errorMessage = (error as Error).message;
            toast.error(`Error: ${errorMessage}`);
            return false;
        }
    };

    const deletePot = async()=>{
        if(!potId)return;

        const auth = getAuth(app);
        const db = getFirestore(app);
        const user = auth.currentUser;

        if(!user){
            toast.error('user not authenticated')
            return false;
        }

        try{
             const potRef = doc(db, "users", user.uid, "pots", potId);
            await deleteDoc(potRef);
            toast.success("Pot deleted successfully!");
            return true;
        } catch (error) {
            const errorMessage = (error as Error).message;
            toast.error(`Error: ${errorMessage}`);
            return false;
        }
        


    }

    return { pot, loading, error, updatePot, deletePot };


    }


