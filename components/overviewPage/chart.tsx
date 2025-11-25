import { useBudget } from "@/lib/hooks/useBudjet";
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Legend, Tooltip } from "recharts";

const COLORS = ["#277C78", "#82C9D7", "#F2CDAC", "#626070"];
export default function Chart(){
  const {budgets, loading} = useBudget()

      // const total = data.reduce((acc, cur) => acc + cur.value, 0);
      const data = budgets.length>0? 
      budgets.map(budget=>({
        name: budget.category,
        value: budget.maximumSpend,
        color: budget.colorCode,
        spent: budget.currentSpend
      })) : [{name:'No Budgets', value:1, color:'#F8F4F0', spent:0}];
      
      
       const totalLimit = budgets.length > 0 
        ? budgets.reduce((acc, cur) => acc + cur.maximumSpend, 0)
        : 0;

         const totalSpent = budgets.length > 0
        ? budgets.reduce((acc, cur) => acc + cur.currentSpend, 0)
        : 0;

        if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-[#696868]">Loading chart...</p>
            </div>
        );
    }

    return(
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Pie Section */}
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={budgets.length >0 ? 3 : 0}
            dataKey="value"
          >
            {/* Each Slice */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}

            {/* Center Label */}
            <Label
             content ={({ viewBox }: any) => {
              if (!viewBox || !viewBox.cx || !viewBox.cy) return null;
                   const { cx, cy } = viewBox;
                            return (
                                <text x={cx} y={cy} textAnchor="middle">
                                    <tspan
                                        x={cx}
                                        y={cy - 5}
                                        style={{
                                            fontSize: "32px",
                                            fontWeight: "bold",
                                            fill: "#201F24",
                                        }}
                                    >
                                        ${totalSpent.toLocaleString()}
                                    </tspan>
                                    <tspan
                                        x={cx}
                                        y={cy + 20}
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "normal",
                                            fill: "#696868",
                                        }}
                                    >
                                        of ${totalLimit.toLocaleString()} limit
                                    </tspan>
                                </text>
                            );
                        }}
            />
          </Pie>


          {/* Tooltip for hover */}
         {totalLimit >0 && <Tooltip
            formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
            contentStyle={{
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />}
        </PieChart>
      </ResponsiveContainer>
    )
}