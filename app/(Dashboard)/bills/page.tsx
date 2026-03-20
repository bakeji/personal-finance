"use client"

import Menu from "@/components/menu"
import ProtectedRoute from "@/components/protectedRoutes"
import AddBillModal, { BillFormData } from "@/components/recurringBills/addBillModal"
import BillsPageHeader from "@/components/recurringBills/billHeader"
import BillsList from "@/components/recurringBills/billsList"
import BillSummaryCards from "@/components/recurringBills/billsSummary"
import { useBills } from "@/lib/hooks/useBill"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

export default function BillsPage() {
    const { bills, loading, error, totalMonthly, totalYearly, addBill, deleteBill, togglePaidStatus } = useBills()
    const [showModal, setShowModal] = useState(false)

    const handleSubmit = async (formData: BillFormData) => {
        try {
            await addBill(formData)
            toast.success("Bill added successfully!")
            setShowModal(false)
        } catch (error) {
            toast.error("Failed to add bill")
        }
    }

    const handleDelete = async (billId: string) => {
        try {
            await deleteBill(billId)
            toast.success("Bill deleted successfully!")
        } catch (error) {
            toast.error("Failed to delete bill")
        }
    }

    const handleTogglePaid = async (billId: string, currentStatus: boolean) => {
        try {
            await togglePaidStatus(billId, currentStatus)
            toast.success(currentStatus ? "Marked as unpaid" : "Marked as paid")
        } catch (error) {
            toast.error("Failed to update bill status")
        }
    }

    if (loading) {
        return (
            <ProtectedRoute >
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#277C78]"></div>
                </div>
            </ProtectedRoute>
        )
    }

    return (
        
               <ProtectedRoute>
                    <div className=" p-8 w-full ">
                        <BillsPageHeader onAddClick={() => setShowModal(true)} />
                        
                        
                        <BillSummaryCards 
                            totalBills={bills.length}
                            totalMonthly={totalMonthly}
                            totalYearly={totalYearly}
                        />

                        <BillsList 
                            bills={bills}
                            onTogglePaid={handleTogglePaid}
                            onDelete={handleDelete}
                            onAddClick={() => setShowModal(true)}
                        />

                        <AddBillModal 
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            onSubmit={handleSubmit}
                        />
                    </div>
               </ProtectedRoute>
                



            
    
    )
}

