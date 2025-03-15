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
  { name: "Jan", value: 100 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 400 },
  { name: "April", value: 200 },
  { name: "May", value: 500 },
  { name: "June", value: 400 },
  { name: "July", value: 300 },
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
        <Line type="monotone" dataKey="value" stroke="#007bff" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ActiveEsimChart;
