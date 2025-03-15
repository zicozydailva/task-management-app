import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Pending", value: 350, color: "#f6490b" },
  { name: "In-Progress", value: 350, color: "#f1d30c" },
  { name: "Completed", value: 250, color: "#11f011" },
];

const COLORS = {
  pending: "#f6490b",
  "in-progress": "#f1d30c",
  completed: "#11f011",
};

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
    ></text>
  );
};

const DoughnutChart = ({ taskCounts }) => {
  console.log({ taskCounts });
  const chartData = [
    {
      name: "Pending",
      value: taskCounts?.statusCounts.pending || 0,
      color: COLORS.pending,
    },
    {
      name: "In-Progress",
      value: taskCounts?.statusCounts["in-progress"] || 0,
      color: COLORS["in-progress"],
    },
    {
      name: "Completed",
      value: taskCounts?.statusCounts.completed || 0,
      color: COLORS.completed,
    },
  ];

  return (
    <div className="flex items-center gap-2 p-4">
      <PieChart className="w-1/3 block" width={350} height={350}>
        <Pie
          data={chartData}
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
        <Legend verticalAlign="bottom" height={12} />
      </PieChart>
    </div>
  );
};

export default DoughnutChart;
