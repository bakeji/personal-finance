import { RecurringBill } from "@/lib/hooks/useBill";
import { Trash2 } from "lucide-react"


interface BillCardProps {
    bill: RecurringBill;
    onTogglePaid: (billId: string, currentStatus: boolean) => void;
    onDelete: (billId: string) => void;
}

export default function BillCard({ bill, onTogglePaid, onDelete }: BillCardProps) {
    return (
        <div
            className="flex items-center justify-between p-4 border-l-4 border-[#F8F4F0] hover:border-[#277C78] bg-[#F8F4F0] rounded-r-lg transition-all group"
            style={{ borderLeftColor: bill.colorCode }}
        >
            <div className="flex items-center gap-4 flex-1">
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: bill.colorCode }}
                >
                    {bill.dueDate}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-[#201F24]">{bill.name}</h3>
                    <p className="text-sm text-[#696868]">
                        {bill.category} • Due on day {bill.dueDate} • {bill.frequency}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="font-bold text-[#201F24] text-lg">
                        ${bill.amount.toFixed(2)}
                    </p>
                    <p className={`text-xs ${bill.isPaid ? 'text-green-600' : 'text-orange-600'}`}>
                        {bill.isPaid ? '✓ Paid' : 'Pending'}
                    </p>
                </div>

                <button
                    onClick={() => onTogglePaid(bill.id, bill.isPaid)}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                        bill.isPaid
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    }`}
                >
                    {bill.isPaid ? 'Paid' : 'Mark Paid'}
                </button>

                <button
                    onClick={() => onDelete(bill.id)}
                    className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}