import React from 'react';
import Divider from '@material-ui/core/Divider';
/* --- Components --- */
import Paper from '../../../shared/paper';
import List from './list';

export const DeliveryMainBoard = ({ data }) => (
  <div className="flex flex-wrap">
    {data &&
      data.length !== 0 &&
      data.map(d => {
        const { routes, delivery } = d;
        return (
          <Paper
            classname="ma3"
            component={
              <div key={routes.id}>
                <h2>{routes.route}</h2>
                <Divider />
                <List data={delivery} open={false} />
              </div>
            }
          />
        );
      })}
  </div>
);

export default DeliveryMainBoard;
