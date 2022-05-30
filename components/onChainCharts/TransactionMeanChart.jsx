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
import { currencyFormat, formatDecimals } from "../../helpers/formatters";
import { useMediaQuery } from "react-responsive";
import FinanceChartModal from "../financialCharts/FinanceChartModal";
import React from "react";

const TransactionMeanChart = ({ data }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });
  return (
    <div>
      <div className={"flex flex-row"}>
        <h1>
          Transcation Mean Size
          <span className={"ms-3"}>
            <FinanceChartModal />
          </span>
        </h1>
      </div>
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
                tickFormatter={(value) => currencyFormat(value)}
              />
            )}

            <Tooltip formatter={(value) => formatDecimals(value, 2)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="v"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TransactionMeanChart;
