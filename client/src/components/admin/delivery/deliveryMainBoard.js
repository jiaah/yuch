import React from 'react';
/* --- Components --- */
import Board from './board';

export const DeliveryMainBoard = ({ data }) => (
  <div className="flex flex-wrap">
    {data &&
      data.length !== 0 &&
      data.map(d => {
        const {
          routes: { id, route },
          delivery,
        } = d;
        return <Board id={id} route={route} delivery={delivery} />;
      })}
  </div>
);

export default DeliveryMainBoard;
