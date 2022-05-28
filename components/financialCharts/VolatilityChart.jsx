import {
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  Scatter,
  ResponsiveContainer,
  Brush,
  Label,
  LineChart,
  Line,
} from "recharts";
import { useMediaQuery } from "react-responsive";

const VolatilityChart = ({ data }) => {
  console.log({ data });

  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });

  return (
    <div>
      <h1>Volatility of Asset</h1>
      {data && (
        <ResponsiveContainer height={350}>
          <LineChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {isMobile ? (
              <XAxis dataKey="time" tick={{ fill: "white" }} height={0} />
            ) : (
              <XAxis dataKey="time" tick={{ fill: "black" }} />
            )}
            {!isMobile && <YAxis />}

            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="volatility" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default VolatilityChart;
