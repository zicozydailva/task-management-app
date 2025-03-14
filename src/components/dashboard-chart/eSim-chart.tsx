import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Day 1", eSIM: 100 },
  { name: "Day 2", eSIM: 300 },
  { name: "Day 3", eSIM: 400 },
  { name: "Day 4", eSIM: 200 },
  { name: "Day 5", eSIM: 500 },
  { name: "Day 6", eSIM: 400 },
  { name: "Day 7", eSIM: 300 },
];

const ActiveEsimChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#000" />
        <YAxis stroke="#000" />
        <Tooltip />
        <Line type="monotone" dataKey="eSIM" stroke="#007bff" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ActiveEsimChart;
