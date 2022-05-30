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

const DifficultyRibbonChart = ({ data }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });
  return (
    <div>
      <h1>Difficulty Ribbon Chart</h1>
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
            <Line type="monotone" dataKey="ma9" stroke="#8884d8" />
            <Line type="monotone" dataKey="ma14" stroke="#8884d8" />
            <Line type="monotone" dataKey="ma25" stroke="#8884d8" />
            <Line type="monotone" dataKey="ma40" stroke="#8884d8" />
            <Line type="monotone" dataKey="ma60" stroke="#8884d8" />
            <Line type="monotone" dataKey="ma90" stroke="#8884d8" />
            <Line type="monotone" dataKey="ma128" stroke="#8884d8" />
            <Line type="monotone" dataKey="ma200" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DifficultyRibbonChart;
