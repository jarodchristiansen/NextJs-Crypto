import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useMediaQuery } from "react-responsive";

const MarketDominanceChart = ({ data }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });

  return (
    <div>
      <h1>Market Dominance</h1>
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
              <XAxis dataKey="time" height={0} />
            ) : (
              <XAxis dataKey="time" />
            )}

            {!isMobile && <YAxis />}

            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="market_dominance" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MarketDominanceChart;
