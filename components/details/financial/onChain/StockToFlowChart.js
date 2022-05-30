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

const StockToFlowChart = ({ data }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });
  return (
    <div className={"card mt-2"}>
      <h1>Stock to Flow</h1>
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
              <XAxis dataKey="t" />
            )}

            {!isMobile && <YAxis />}

            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="daysTillHalving" stroke="#8884d8" />
            <Line type="monotone" dataKey="ratio" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default StockToFlowChart;
