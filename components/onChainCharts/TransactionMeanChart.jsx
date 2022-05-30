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
import { currencyFormat } from "../../helpers/formatters";
import { useMediaQuery } from "react-responsive";

const TransactionMeanChart = ({ data }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });
  console.log("this is transactions mean", data);
  return (
    <div>
      <h1>Transaction Size Mean Chart</h1>
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

            {!isMobile && <YAxis dataKey={"v"} />}

            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="v" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TransactionMeanChart;
