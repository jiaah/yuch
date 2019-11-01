import React from 'react';
import Chart from './chart';

const RevenueChart = ({
  data,
  // list
  revenueRestoSpecial,
  revenueYuch,
  revenueInvoice,
}) => [
  <Chart data={data} list={revenueRestoSpecial} key={1} />,
  <Chart data={data} list={revenueInvoice} key={2} classname="mt4" />,
  <Chart data={data} list={revenueYuch} key={3} classname="mt4" />,
];

export default RevenueChart;
