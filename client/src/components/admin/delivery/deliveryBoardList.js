import React from 'react';
/* --- Components --- */
import Board from './deliveryBoard';

export const DeliveryBoardList = ({ classes, data }) => (
  <div className="flex flex-wrap">
    {data &&
      data.length !== 0 &&
      data.map(d => {
        const { id, route, delivery } = d;
        return (
          <div id="print">
            <div className="print-width print-tc">
              <Board
                classes={classes}
                key={id}
                id={id}
                route={route}
                delivery={delivery}
              />
            </div>
          </div>
        );
      })}
  </div>
);

export default DeliveryBoardList;
