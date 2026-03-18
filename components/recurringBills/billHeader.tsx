import { Plus } from "lucide-react"

interface BillsPageHeaderProps {
    onAddClick: () => void;
}

export default function BillsPageHeader({ onAddClick }: BillsPageHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-[#201F24] font-bold text-[32px]">Recurring Bills</h1>
            <button
                onClick={onAddClick}
                className="flex items-center gap-2 bg-[#201F24] text-white px-4 py-2 rounded-lg hover:bg-[#333] transition-colors"
            >
                <Plus className="w-5 h-5" />
                Add New Bill
            </button>
        </div>
    )
}