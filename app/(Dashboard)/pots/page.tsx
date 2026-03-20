'use client'
import AddNewPotModal from "@/components/pots/addNewPotModal";
import PotType from "@/components/pots/potType";
import ProtectedRoute from "@/components/protectedRoutes";
import { usePot } from "@/lib/hooks/usePots";


export default function Pots(){
    const  { loading } = usePot()
    
       if (loading) {
            return (
                <ProtectedRoute >
                    <div className="flex items-center justify-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#277C78]"></div>
                    </div>
                </ProtectedRoute>
            )
        }

    return(
        <ProtectedRoute>
            <div className="p-8 w-full">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-[32px] font-[700] text-[#201F24]">Pots</h1>
                    <AddNewPotModal />
                </div>

                <div className="flex w-full gap-4 flex-wrap max-lg:flex-col">
                    <PotType/>
                </div>
            </div>
        </ProtectedRoute>
    )
}