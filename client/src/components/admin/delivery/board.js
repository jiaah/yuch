import React from 'react';
import Divider from '@material-ui/core/Divider';
/* --- Components --- */
import Paper from '../../../shared/paper';
import List from './list';

export const Board = ({ id, route, delivery }) => (
  <Paper
    classname="ma3 delivery-board"
    component={
      <div key={id} className="mh1">
        <h2>{route}</h2>
        <Divider />
        <div className="mb3" />
        {delivery && delivery.length !== 0 ? (
          <List data={delivery} open={false} />
        ) : (
          <p>경유지를 등록하세요.</p>
        )}
      </div>
    }
  />
);

export default Board;
