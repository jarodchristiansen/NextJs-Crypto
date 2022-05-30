import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  Brush,
} from "recharts";
import {
  currencyFormat,
  formatDecimals,
  standardThousandsFormatter,
} from "../../helpers/formatters";
import { useMediaQuery } from "react-responsive";
import React, { useEffect, useState } from "react";
import FinanceChartModal from "../financialCharts/FinanceChartModal";

const DifficultyRibbonChart = ({ data, lunarPriceData }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });

  const [chartData, setChartData] = useState([]);

  console.log({ data, lunarPriceData });

  useEffect(() => {
    formatChartData();
  }, []);

  const formatChartData = () => {
    let chartArray = [];
    for (let i = 0; i < data.length; i++) {
      chartArray.push({
        ...data[i],
        ...lunarPriceData[i],
      });
    }
    setChartData(chartArray);
  };

  return (
    <div className={"card mt-2"}>
      <div className={"flex flex-row"}>
        <h1>
          Difficulty Ribbon Chart
          <span className={"ms-3"}>
            <FinanceChartModal />
          </span>
        </h1>
        <span>(Scaled to Price)</span>
      </div>
      {data && (
        <ResponsiveContainer height={350}>
          <LineChart
            width={430}
            height={250}
            data={chartData && chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            {isMobile ? (
              <XAxis dataKey="t" height={0} />
            ) : (
              <XAxis dataKey="t" />
            )}

            {!isMobile && (
              <YAxis tickFormatter={(value) => formatDecimals(value, 2)} />
            )}

            <Tooltip formatter={(value) => formatDecimals(value, 2)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="ma9"
              stroke="red"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="ma14"
              stroke="forestgreen"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="ma25"
              stroke="darkblue"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="ma40"
              stroke="violet"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="ma60"
              stroke="orange"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="ma90"
              stroke="darkred"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="ma128"
              stroke="limegreen"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="ma200"
              stroke="#8884d8"
              dot={false}
            />
            <Line type="monotone" dataKey="close" stroke="black" dot={false} />
            <Area
              type="natural"
              name={"Daily Closing Price"}
              dataKey="close"
              fill="black"
              legendType={"plainline"}
              stroke={"rgb(12,0,220)"}
              strokeWidth={1.25}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DifficultyRibbonChart;
