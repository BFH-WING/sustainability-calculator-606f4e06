import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
} from "recharts";

interface CircularityGaugeProps {
  score: number;
  colors: string[];
}

const CircularityGauge = ({ score, colors }: CircularityGaugeProps) => {
  const normalizedScore = (score / 5) * 100;

  // Create background sections
  const createGaugeData = () => {
    const totalSections = colors.length;
    const sectionSize = 100 / totalSections;
    return colors.map((color, i) => ({
      name: `section-${i}`,
      value: sectionSize,
      color,
    }));
  };

  // Create active section data
  const createActiveData = () => {
    return [{ value: normalizedScore }];
  };

  const gaugeData = createGaugeData();
  const activeData = createActiveData();

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 4}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={colors[Math.floor((score - 1) / 1) || 0]}
          stroke="none"
        />
      </g>
    );
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          {/* Background gauge */}
          <Pie
            data={gaugeData}
            dataKey="value"
            cx="50%"
            cy="80%"
            startAngle={180}
            endAngle={0}
            innerRadius={100}
            outerRadius={140}
            paddingAngle={0}
          >
            {gaugeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          
          {/* Active section */}
          <Pie
            data={activeData}
            dataKey="value"
            cx="50%"
            cy="80%"
            startAngle={180}
            endAngle={180 - (normalizedScore * 180) / 100}
            innerRadius={100}
            outerRadius={140}
            activeShape={renderActiveShape}
            activeIndex={0}
          >
            <Cell fill="transparent" />
          </Pie>

          {/* Score display */}
          <text
            x="50%"
            y="70%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-current text-4xl font-bold"
          >
            {score.toFixed(2)}
          </text>
          <text
            x="50%"
            y="80%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-current text-sm"
          >
            out of 5
          </text>

          {/* Indicator needle */}
          <Pie
            data={[{ value: 1 }]}
            dataKey="value"
            cx="50%"
            cy="80%"
            startAngle={180 - (normalizedScore * 180) / 100}
            endAngle={180 - (normalizedScore * 180) / 100}
            innerRadius={0}
            outerRadius={160}
            stroke="none"
          >
            <Cell fill="#000000" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CircularityGauge;