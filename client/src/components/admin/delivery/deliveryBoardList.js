import React from 'react';
/* --- Components --- */
import Board from './deliveryBoard';

export const DeliveryBoardList = ({ classes, data }) => (
  <div className={`flex flex-wrap ${classes.boardWrap}`}>
    {data &&
      data.length !== 0 &&
      data.map(d => {
        const { id, route, delivery } = d;
        return (
          <Board
            classes={classes}
            key={id}
            id={id}
            route={route}
            delivery={delivery}
          />
        );
      })}
  </div>
);

export default DeliveryBoardList;
