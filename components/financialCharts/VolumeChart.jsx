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
import FinanceChartModal from "./FinanceChartModal";
import React from "react";

const VolumeChart = ({ data }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });
  return (
    <div>
      <div className={"flex flex-row"}>
        <h1>
          Volume Chart
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
                dataKey={"volume"}
                tickFormatter={(value) => currencyFormat(value)}
              />
            )}

            <Tooltip formatter={(value) => currencyFormat(value)} />
            <Legend />
            <Line type="monotone" dataKey="volume" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default VolumeChart;
