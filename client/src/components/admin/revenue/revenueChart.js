import React from 'react';
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryGroup,
  VictoryTooltip,
  VictoryLine,
  VictoryScatter,
} from 'victory';
import Paper from '../../../shared/paper';
import Chart from './chart';

const RevenueChart = ({ data, list, listB, revenueFormat, formatNumber }) => (
  <React.Fragment>
    <div className="paper">
      <Paper
        className=""
        component={
          <React.Fragment>
            <div className="flex f-regular mt2 ml2">
              <p style={{ color: '#3ab61a' }}>
                <span className="c-text-grey">&#8199;&#42;&#8199;</span>
                레스토랑&#8199;
              </p>
              <p style={{ color: '#43a4f3' }}>
                <span className="c-text-grey">&#8199;&#42;&#8199;</span>
                특식
              </p>
            </div>
            <VictoryChart
              title="revenue"
              padding={{ top: 40, left: 80, right: 10, bottom: 30 }}
              domainPadding={{ x: [0, 20], y: [0, 20] }}
              containerComponent={<VictoryVoronoiContainer />}
            >
              {listB.map(l => (
                <VictoryGroup
                  key={l.label}
                  color={l.color}
                  labels={({ datum }) => formatNumber(datum.y)}
                  labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
                  data={
                    data &&
                    data.map(i => {
                      const newData = {
                        x: revenueFormat(i.date),
                        y: i[l.name],
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
      <Chart
        data={data}
        item={list[0]}
        key={list[0].label}
        classname="paper--sec"
      />
    </div>
    <Chart data={data} item={list[1]} key={list[1].label} classname="mt4" />
  </React.Fragment>
);

export default RevenueChart;
