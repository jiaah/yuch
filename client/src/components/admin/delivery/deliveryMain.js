import React, { useState, useEffect } from 'react';
/* --- Components --- */
import IconButton from '../../../shared/form/iconButton';
import { printDiv } from '../../../utils/print';
import Loader from '../../loader';

const RouteBoard = Loader({
  loader: () => import('./routeBoard' /* webpackChunkName: 'RouteBoard' */),
});

const DeliveryMain = ({
  classes: { content },
  deliveryActions: { getRoutes, createRoute, deleteRoute },
}) => {
  const addBoard = async () => {
    // add title
    // create Route with title
    const res = await createRoute('3route');
  };

  return (
    <main className={`${content} r--w-80`}>
      <h2 className="flex justify-center lh-1">배달 루트</h2>
      <div className="flex justify-end">
        <IconButton
          handleClick={() => addBoard()}
          name="add"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        />
        <IconButton
          name="print"
          width="32"
          height="32"
          viewBox="0 0 25 25"
          handleClick={() => printDiv('print')}
        />
      </div>
      <div className="flex flex-wrap">
        {/* {routes && routes.map(() => <RouteBoard />)} */}
      </div>
    </main>
  );
};
export default DeliveryMain;
