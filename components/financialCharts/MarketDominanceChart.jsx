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
import { currencyFormat } from "../../helpers/formatters";
import FinanceChartModal from "./FinanceChartModal";
import React from "react";

const MarketDominanceChart = ({ data }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });

  const format = (num, decimals) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div>
      <div className={"flex flex-row"}>
        <h1>
          Market Dominance
          <span className={"ms-3"}>
            <FinanceChartModal />
          </span>
        </h1>
      </div>
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

            {!isMobile && (
              <YAxis
                domain={[
                  (dataMin) => 0 - Math.abs(dataMin),
                  (dataMax) => dataMax * 2,
                ]}
                tickFormatter={(value) => format(value)}
              />
            )}

            <Tooltip formatter={(value) => format(value)} />
            <Legend />
            <Line
              type="linear"
              dataKey="market_dominance"
              stroke="#8884d8"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MarketDominanceChart;
