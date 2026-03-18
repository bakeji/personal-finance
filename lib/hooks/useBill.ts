"use client"

import { getAuth } from "firebase/auth";
import { useEffect, useState, useMemo } from "react";
import { app } from "../firebaseConfig";
import { collection, getFirestore, onSnapshot, orderBy, query, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export interface RecurringBill {
    id: string;
    name: string;
    category: string;
    amount: number;
    dueDate: number; // Day of month (1-31)
    frequency: "monthly" | "yearly";
    isPaid: boolean;
    colorCode: string;
    createdAt: any;
}

export function useBills(){
    const [bills, setBills] = useState<RecurringBill[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
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

        const billsRef = collection(db, 'users', user.uid, 'recurringBills')
        const q = query(billsRef, orderBy('dueDate', 'asc'));

        const unSubscribe = onSnapshot(
            q,
           (snapshot) => {
            const billsData = snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            })) as RecurringBill[];
            setBills(billsData);
            setLoading(false);
           },
           (err) =>{
            setError(err.message);
            setLoading(false);
           }
        )
        return () => unSubscribe();
    }, [])

    // Calculate total bills for the month
    const totalMonthly = useMemo(() => {
        return bills
            .filter(bill => bill.frequency === 'monthly')
            .reduce((total, bill) => total + bill.amount, 0);
    }, [bills]);

    const totalYearly = useMemo(() => {
        return bills
            .filter(bill => bill.frequency === 'yearly')
            .reduce((total, bill) => total + bill.amount, 0);
    }, [bills]);

    // Add a new bill
    const addBill = async (billData: Omit<RecurringBill, 'id' | 'createdAt'>) => {
        const auth = getAuth(app);
        const db = getFirestore(app);
        const user = auth.currentUser;

        if (!user) throw new Error('User not authenticated');

        const billsRef = collection(db, 'users', user.uid, 'recurringBills');
        await addDoc(billsRef, {
            ...billData,
            createdAt: new Date().toISOString(),
        });
    };

    // Delete a bill
    const deleteBill = async (billId: string) => {
        const auth = getAuth(app);
        const db = getFirestore(app);
        const user = auth.currentUser;

        if (!user) throw new Error('User not authenticated');

        const billRef = doc(db, 'users', user.uid, 'recurringBills', billId);
        await deleteDoc(billRef);
    };

    // Toggle paid status
    const togglePaidStatus = async (billId: string, currentStatus: boolean) => {
        const auth = getAuth(app);
        const db = getFirestore(app);
        const user = auth.currentUser;

        if (!user) throw new Error('User not authenticated');

        const billRef = doc(db, 'users', user.uid, 'recurringBills', billId);
        await updateDoc(billRef, {
            isPaid: !currentStatus
        });
    };

    return {
        bills,
        loading,
        error,
        totalMonthly,
        totalYearly,
        addBill,
        deleteBill,
        togglePaidStatus
    }
}