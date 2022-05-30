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
import { useMediaQuery } from "react-responsive";
import React, { useEffect, useState } from "react";

const PiCycleTopChart = ({ data, lunarPriceData }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });

  const [chartData, setChartData] = useState();

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

  {
    console.log({ chartData });
  }
  useEffect(() => {
    formatChartData();
  }, [data]);

  return (
    <div className={"card mt-2"}>
      <h1>Pi Cycle Top Indicator</h1>
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

            {!isMobile && <YAxis />}

            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="ma111"
              stroke="red"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="ma350x2"
              stroke="orange"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="close"
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

export default PiCycleTopChart;
