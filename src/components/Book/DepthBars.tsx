import React, { FunctionComponent } from 'react';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

type TProps = {
  color: string;
  data: {
    name: string;
    count: number;
  }[];
};

const DepthBars: FunctionComponent<TProps> = ({ data, color }) => {
  return (
    <>
      <ResponsiveContainer width='100%' height={150}>
        <BarChart
          width={300}
          height={100}
          data={data}
          barCategoryGap={-1}
          barGap={0}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <Bar dataKey='count' fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default DepthBars;
