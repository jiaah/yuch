import React from 'react';
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryGroup,
  VictoryTooltip,
  VictoryLine,
  VictoryScatter,
} from 'victory';
/* --- Components --- */
import Paper from '../../../shared/paper';
import { formatNumber } from '../../../utils/reformat';
import { revenueFormat } from '../../../utils/date';

const RevenueChart = ({ data, item }) => (
  <Paper
    classname="mt4"
    component={
      <React.Fragment>
        <div className="flex f-regular mt2 ml2">
          <p style={{ color: `${item.color}` }}>
            <span className="c-text-grey">&#8199;&#42;&#8199;</span>
            {item.label}
            &#8199;
          </p>
        </div>
        <VictoryChart
          title={item.name}
          padding={{ top: 40, left: 80, right: 10, bottom: 30 }}
          domainPadding={{ x: [0, 20], y: [0, 20] }}
          containerComponent={<VictoryVoronoiContainer />}
        >
          <VictoryGroup
            color={item.color}
            labels={({ datum }) => formatNumber(datum.y)}
            labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
            data={
              data &&
              data.map(i => {
                const newData = { x: revenueFormat(i.date), y: i[item.name] };
                return newData;
              })
            }
          >
            <VictoryLine />
            <VictoryScatter size={({ active }) => (active ? 3 : 2)} />
          </VictoryGroup>
        </VictoryChart>
      </React.Fragment>
    }
  />
);

export default RevenueChart;
