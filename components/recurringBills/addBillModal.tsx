import { useState } from "react"

interface AddBillModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: BillFormData) => Promise<void>;
}

export interface BillFormData {
    name: string;
    category: string;
    amount: number;
    dueDate: number;
    frequency: "monthly" | "yearly";
    isPaid: boolean;
    colorCode: string;
}

export default function AddBillModal({ isOpen, onClose, onSubmit }: AddBillModalProps) {
    const [formData, setFormData] = useState<BillFormData>({
        name: "",
        category: "Subscriptions",
        amount: 0,
        dueDate: 1,
        frequency: "monthly",
        isPaid: false,
        colorCode: "#277C78"
    })

    const categories = [
        "Subscriptions",
        "Housing",
        "Utilities",
        "Transportation",
        "Insurance",
        "Entertainment",
        "Communication",
        "Health & Fitness",
        "Other"
    ]

    const colors = [
        "#277C78", "#82C9D7", "#F2CDAC", "#626070",
        "#C94736", "#826CB0", "#597C7C", "#93674F"
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await onSubmit(formData)
        // Reset form
        setFormData({
            name: "",
            category: "Subscriptions",
            amount: 0,
            dueDate: 1,
            frequency: "monthly",
            isPaid: false,
            colorCode: "#277C78"
        })
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-[#201F24] mb-6">Add New Bill</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-[#696868] text-sm font-bold block mb-2">
                            Bill Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 border border-[#98908B] rounded-lg outline-none focus:border-[#277C78]"
                            placeholder="e.g., Netflix"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[#696868] text-sm font-bold block mb-2">
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-3 border border-[#98908B] rounded-lg outline-none focus:border-[#277C78]"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-[#696868] text-sm font-bold block mb-2">
                            Amount ($)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                            className="w-full p-3 border border-[#98908B] rounded-lg outline-none focus:border-[#277C78]"
                            placeholder="0.00"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[#696868] text-sm font-bold block mb-2">
                            Due Date (Day of Month)
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="31"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: parseInt(e.target.value) })}
                            className="w-full p-3 border border-[#98908B] rounded-lg outline-none focus:border-[#277C78]"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[#696868] text-sm font-bold block mb-2">
                            Frequency
                        </label>
                        <select
                            value={formData.frequency}
                            onChange={(e) => setFormData({ ...formData, frequency: e.target.value as "monthly" | "yearly" })}
                            className="w-full p-3 border border-[#98908B] rounded-lg outline-none focus:border-[#277C78]"
                        >
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-[#696868] text-sm font-bold block mb-2">
                            Color
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, colorCode: color })}
                                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                                        formData.colorCode === color ? 'border-[#201F24] scale-110' : 'border-transparent'
                                    }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-[#98908B] text-[#201F24] rounded-lg hover:bg-[#F8F4F0] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-[#201F24] text-white rounded-lg hover:bg-[#333] transition-colors"
                        >
                            Add Bill
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}