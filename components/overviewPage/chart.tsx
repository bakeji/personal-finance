import { PieChart, Pie, Cell, ResponsiveContainer, Label, Legend, Tooltip } from "recharts";

// const data = [
//   { name: "No Budget", value: 100 },
//   // { name: "", value: 0 },
//   // { name: "", value: 0 },
//   // { name: "", value: 0 },
// ];

const COLORS = ["#277C78", "#82C9D7", "#F2CDAC", "#626070"];
export default function Chart(){
      // const total = data.reduce((acc, cur) => acc + cur.value, 0);
      const data = [{ name: "No Budget", value: 1 }];
      const total = 0;
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
            paddingAngle={3}
            dataKey="value"
          >
            {/* Each Slice */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}

            {/* Center Label */}
            <Label
              value={`$${total}`}
              position="center"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                fill: "#201F24",
              }}
            />
          </Pie>

          {/* Side Labels */}
          {/* <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="square"
          /> */}

          {/* Tooltip for hover */}
         {total >0 && <Tooltip
            formatter={(value, name) => [`$${value}`, name]}
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