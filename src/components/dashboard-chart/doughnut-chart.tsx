import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Pending", value: 350, color: "#f6490b" },
  { name: "In-Progress", value: 350, color: "#f1d30c" },
  { name: "Completed", value: 250, color: "#11f011" },
];

// Define types for the parameters
interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
}: LabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {/* {`${(percent * 100).toFixed(0)}%`} */}
    </text>
  );
};

const DoughnutChart = () => (
  <div className="flex items-center gap-2 p-4">
    <PieChart className="w-1/3 block" width={350} height={350}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={100}
        innerRadius={50}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {/* <Legend verticalAlign="bottom" height={36} /> */}
    </PieChart>
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">Tasks</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index} className="mb-2 mr-8 text-xs">
            <span
              className="inline-block w-4 h-4 mr-2"
              style={{ backgroundColor: item.color }}
            ></span>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default DoughnutChart;
