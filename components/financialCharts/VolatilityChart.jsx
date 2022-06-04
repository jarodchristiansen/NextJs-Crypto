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

  const modalText = {
    modalHeader: "Volatility",
    modalBodyText: () => (
      <div>
        <h5>What is Volatility?</h5>
        <p>
          Volatility often refers to the amount of uncertainty or risk related
          to the size of changes in a security's value. A higher volatility
          means that a security's value can potentially be spread out over a
          larger range of values. This means that the price of the security can
          change dramatically over a short time period in either direction. A
          lower volatility means that a security's value does not fluctuate
          dramatically, and tends to be more steady. See -
          <a
            href={"https://portfolioslab.com/tools/sharpe-ratio?s=BTC-USD"}
            target={"#"}
            className={"ms-1"}
          >
            Sharpe Ratio
          </a>
        </p>
      </div>
    ),
  };

  return (
    <div className={"card mt-2"}>
      <div className={"flex flex-row"}>
        <h1>
          Volatility of Asset
          <span className={"ms-3"}>
            <FinanceChartModal text={modalText} />
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
