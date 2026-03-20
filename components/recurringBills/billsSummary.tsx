import { Receipt, Calendar, DollarSign } from "lucide-react"

interface BillSummaryCardsProps {
    totalBills: number;
    totalMonthly: number;
    totalYearly: number;
}

export default function BillSummaryCards({ totalBills, totalMonthly, totalYearly }: BillSummaryCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  mb-8">
            <div className="bg-[#201F24] text-white p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                    <Receipt className="w-6 h-6 text-[#F8F4F0]" />
                    <h3 className="text-sm font-semibold opacity-90">Total Bills</h3>
                </div>
                <p className="text-3xl font-bold">{totalBills}</p>
            </div>

            <div className="bg-white border-2 border-[#F8F4F0] p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-6 h-6 text-[#277C78]" />
                    <h3 className="text-sm font-semibold text-[#696868]">Monthly Total</h3>
                </div>
                <p className="text-3xl font-bold text-[#201F24]">${totalMonthly.toFixed(2)}</p>
            </div>

            <div className="bg-white border-2 border-[#F8F4F0] p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-6 h-6 text-[#277C78]" />
                    <h3 className="text-sm font-semibold text-[#696868]">Yearly Total</h3>
                </div>
                <p className="text-3xl font-bold text-[#201F24]">${totalYearly.toFixed(2)}</p>
            </div>
        </div>
    )
}