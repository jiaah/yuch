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

const list = [
  { label: '위탁급식', name: 'sumTotalInvoice', color: '#D164E8' },
  { label: '레스토랑', name: 'sumTotalResto', color: '#3ab61a' },
  { label: '특식', name: 'sumTotalSpecialMeal', color: '#43a4f3' },
];

const Graph = ({ data, revenueFormat, formatNumber }) => (
  <React.Fragment>
    <Paper
      component={
        <React.Fragment>
          <div className="flex f-regular mt2 ml2">
            <p style={{ color: '#D164E8' }}>
              <span className="c-text-grey">&#8199;&#42;&#8199;</span>
              위탁급식&#8199;
            </p>
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
            {list.map(l => (
              <VictoryGroup
                key={l.label}
                color={l.color}
                labels={({ datum }) => formatNumber(datum.y)}
                labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
                data={data.map(i => {
                  const newData = { x: revenueFormat(i.date), y: i[l.name] };
                  return newData;
                })}
              >
                <VictoryLine />
                <VictoryScatter size={({ active }) => (active ? 3 : 2)} />
              </VictoryGroup>
            ))}
          </VictoryChart>
        </React.Fragment>
      }
    />
    <Paper
      classname="mt4"
      component={
        <React.Fragment>
          <div className="flex f-regular mt2 ml2">
            <p className="c-text1">
              <span className="c-text-grey">&#8199;&#42;&#8199;</span>
              유청
            </p>
          </div>
          <VictoryChart
            title="revenue-yuch"
            padding={{ top: 40, left: 80, right: 10, bottom: 30 }}
            domainPadding={{ x: [0, 20], y: [0, 20] }}
            containerComponent={<VictoryVoronoiContainer />}
          >
            <VictoryGroup
              color="#ed6802"
              labels={({ datum }) => `y: ${datum.y}`}
              labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
              data={data.map(i => {
                const newData = { x: revenueFormat(i.date), y: i.sumTotal };
                return newData;
              })}
            >
              <VictoryLine />
              <VictoryScatter size={({ active }) => (active ? 3 : 2)} />
            </VictoryGroup>
          </VictoryChart>
        </React.Fragment>
      }
    />
  </React.Fragment>
);

export default Graph;
