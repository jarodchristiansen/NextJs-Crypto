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
import { formatDecimals } from "../../../../helpers/formatters";

const SOPRChart = ({ data }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });
  return (
    <div>
      <h1>SOPR Chart</h1>
      {data && (
        <ResponsiveContainer height={350}>
          <LineChart
            width={430}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            {isMobile ? (
              <XAxis dataKey="t" height={0} />
            ) : (
              <XAxis
                dataKey="t"
                tickFormatter={(value) =>
                  new Date(value * 1000).toLocaleDateString()
                }
              />
            )}

            {!isMobile && (
              <YAxis
                dataKey={"v"}
                domain={[
                  (dataMin) => 0 - Math.abs(dataMin),
                  (dataMax) => dataMax * 2,
                ]}
              />
            )}

            <Tooltip formatter={(value) => formatDecimals(value, 4)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="v"
              stroke="#8884d8"
              dot={false}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SOPRChart;
