import React from 'react';
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryGroup,
  VictoryTooltip,
  VictoryLine,
  VictoryScatter,
} from 'victory';

const Graph = ({ data, revenueFormat }) => (
  <div>
    <VictoryChart
      height={200}
      width={300}
      containerComponent={<VictoryVoronoiContainer />}
    >
      <VictoryGroup
        color="#ed6802"
        labels={({ datum }) => `y: ${datum.y}`}
        labelComponent={<VictoryTooltip style={{ fontSize: 7 }} />}
        data={data.map(i => {
          const newData = { x: revenueFormat(i.date), y: i.sumTotalResto };
          return newData;
        })}
      >
        <VictoryLine name="레스토랑" />
        <VictoryScatter size={({ active }) => (active ? 3 : 2)} />
      </VictoryGroup>
      <VictoryGroup
        color="#E8716F"
        labels={({ datum }) => `y: ${datum.y}`}
        labelComponent={<VictoryTooltip style={{ fontSize: 7 }} />}
        data={data.map(i => {
          const newData = { x: revenueFormat(i.date), y: i.sumTotalInvoice };
          return newData;
        })}
      >
        <VictoryLine />
        <VictoryScatter size={({ active }) => (active ? 3 : 2)} />
      </VictoryGroup>
      <VictoryGroup
        color="#2196F3"
        labels={({ datum }) => `y: ${datum.y}`}
        labelComponent={<VictoryTooltip style={{ fontSize: 7 }} />}
        data={data.map(i => {
          const newData = {
            x: revenueFormat(i.date),
            y: i.sumTotalSpecialMeal,
          };
          return newData;
        })}
      >
        <VictoryLine />
        <VictoryScatter size={({ active }) => (active ? 3 : 2)} />
      </VictoryGroup>
    </VictoryChart>
    <VictoryChart
      height={200}
      width={300}
      containerComponent={<VictoryVoronoiContainer />}
    >
      <VictoryGroup
        color="#ed6802"
        labels={({ datum }) => `y: ${datum.y}`}
        labelComponent={<VictoryTooltip style={{ fontSize: 7 }} />}
        data={data.map(i => {
          const newData = { x: revenueFormat(i.date), y: i.sumTotal };
          return newData;
        })}
      >
        <VictoryLine name="레스토랑" />
        <VictoryScatter size={({ active }) => (active ? 3 : 2)} />
      </VictoryGroup>
    </VictoryChart>
  </div>
);

export default Graph;
