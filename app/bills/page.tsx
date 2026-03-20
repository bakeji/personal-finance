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
        
             <div className="flex min-h-screen w-full  max-lg:flex-col-reverse " >
                <div className="w-1/4 top-0 sticky h-screen max-lg:w-full max-lg:h-auto ">
                    <Menu/>
                </div>
                <div className="w-3/4 p-8 mb-20  max-lg:w-[98%] max-lg:p-6 max-lg:mx-auto">
                    <BillsPageHeader onAddClick={() => setShowModal(true)} />
                    
                    {error?
                           <div className="w-full flex flex-col gap-4  items-center justify-center p-8">
                                <p className="text-red-500 text-lg font-medium"> You have to log in to see your pots </p>
                                <Link className="underline text-blue-400 p-3 rounded-lg text-lg font-medium "  href='login'>Sign In</Link>
                            </div>

                                        :
                    
                    
                     
                     <>
                    
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
                    </>
}


                </div>
            </div>    
    
    )
}

