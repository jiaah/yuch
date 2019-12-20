import React, { useState } from 'react';
/* --- Components --- */
import Board from './deliveryBoard';

export const DeliveryBoardList = ({ classes, data }) => {
  const [routes, setRoutes] = useState(data);
  const [onRouteEdit, setRouteEdit] = useState(false);

  const handleRouteEdit = () => setRouteEdit(!onRouteEdit);

  const handleChange = (e, id) =>
    setRoutes(
      routes.map(i => (i.id === id ? { ...i, route: e.target.value } : i)),
    );

  const handleKeyPress = async (e, id) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      // update route name
      return handleRouteEdit();
    }
  };

  return (
    <div className="flex flex-wrap">
      {routes &&
        routes.length !== 0 &&
        routes.map(d => {
          const { id, route, delivery } = d;
          return (
            <Board
              classes={classes}
              key={id}
              id={id}
              route={route}
              delivery={delivery}
              onRouteEdit={onRouteEdit}
              handleRouteEdit={handleRouteEdit}
              handleChange={handleChange}
              handleKeyPress={handleKeyPress}
            />
          );
        })}
    </div>
  );
};

export default DeliveryBoardList;
