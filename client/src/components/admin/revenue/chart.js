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

const RevenueChart = ({ data, list, classname, height }) => (
  <Paper
    classname={classname}
    component={
      <React.Fragment>
        <div className="flex f-regular mt2 ml2">
          {list &&
            list.map(item => (
              <p style={{ color: `${item.color}` }} key={item.label}>
                <span className="c-text-grey">&#8199;&#42;&#8199;</span>
                {item.label}
                &#8199;
              </p>
            ))}
        </div>
        <VictoryChart
          title={list[0].name}
          height={height}
          padding={{ top: 30, left: 90, right: 10, bottom: 30 }}
          domainPadding={{ x: [0, 5], y: [0, 5] }}
          containerComponent={<VictoryVoronoiContainer />}
        >
          {list &&
            list.map(item => (
              <VictoryGroup
                key={item.label}
                color={item.color}
                labels={({ datum }) => formatNumber(datum.y)}
                labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
                data={
                  data &&
                  data.map(i => {
                    const newData = {
                      x: revenueFormat(i.date),
                      y: i[item.name],
                    };
                    return newData;
                  })
                }
              >
                <VictoryLine />
                <VictoryScatter size={({ active }) => (active ? 3 : 2)} />
              </VictoryGroup>
            ))}
        </VictoryChart>
      </React.Fragment>
    }
  />
);
export default RevenueChart;
