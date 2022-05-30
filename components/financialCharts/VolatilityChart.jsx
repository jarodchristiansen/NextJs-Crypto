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
import { FaInfoCircle } from "react-icons/fa";
import React from "react";
import FinanceChartModal from "./FinanceChartModal";

const VolatilityChart = ({ data }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });

  return (
    <div className={"card mt-2"}>
      <div className={"flex flex-row"}>
        <h1>
          Volatility of Asset
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
              <XAxis dataKey="time" tick={{ fill: "white" }} height={0} />
            ) : (
              <XAxis dataKey="time" tick={{ fill: "black" }} height={50} />
            )}
            {!isMobile && <YAxis />}

            <Tooltip />
            <Legend />
            <Line
              type="linear"
              dataKey="volatility"
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

export default VolatilityChart;
