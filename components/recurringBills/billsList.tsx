import { RecurringBill } from "@/lib/hooks/useBill";
import { Receipt } from "lucide-react"
import BillCard from "./billsCard";


interface BillsListProps {
    bills: RecurringBill[];
    onTogglePaid: (billId: string, currentStatus: boolean) => void;
    onDelete: (billId: string) => void;
    onAddClick: () => void;
}

export default function BillsList({ bills, onTogglePaid, onDelete, onAddClick }: BillsListProps) {
    if (bills.length === 0) {
        return (
            <div className="bg-white p-12 rounded-xl text-center">
                <Receipt className="w-16 h-16 text-[#B3B3B3] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#201F24] mb-2">No bills yet</h3>
                <p className="text-[#696868] mb-6">Start tracking your recurring bills by adding one above.</p>
                <button
                    onClick={onAddClick}
                    className="bg-[#277C78] text-white px-6 py-3 rounded-lg hover:bg-[#2e9388] transition-colors"
                >
                    Add Your First Bill
                </button>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-xl">
            <h2 className="text-xl font-bold text-[#201F24] mb-4">All Bills</h2>
            <div className="space-y-3">
                {bills.map((bill) => (
                    <BillCard 
                        key={bill.id}
                        bill={bill}
                        onTogglePaid={onTogglePaid}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    )
}