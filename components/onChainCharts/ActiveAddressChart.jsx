import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Brush,
} from "recharts";
import { currencyFormat } from "../../helpers/formatters";
import { useMediaQuery } from "react-responsive";
import FinanceChartModal from "../financialCharts/FinanceChartModal";
import React from "react";

const ActiveAddressChart = ({ data }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });
  return (
    <div className={"card mt-2"}>
      <div className={"flex flex-row"}>
        <h1>
          Active Address Chart
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
              <XAxis dataKey="t" height={0} />
            ) : (
              <XAxis
                dataKey="t"
                tickFormatter={(value) =>
                  new Date(value * 1000).toLocaleDateString()
                }
              />
            )}

            {!isMobile && <YAxis dataKey={"v"} />}

            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="v" stroke="#8884d8" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ActiveAddressChart;
