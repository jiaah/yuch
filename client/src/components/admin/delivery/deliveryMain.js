import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import { styles } from './deliveryStyles';
import IconButton from '../../../shared/form/iconButton';
import { printDiv } from '../../../utils/print';
import DeliveryMainBoard from './deliveryMainBoard';

const DeliveryMain = ({
  classes: { content },
  data,
  deliveryActions: { getRoutes, createRoute, deleteRoute },
}) => {
  const addBoard = async () => {
    // add title
    // create Route with title
    const res = await createRoute('3route');
    console.log('res: ', res);
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
      <DeliveryMainBoard data={data} />
    </main>
  );
};
export default withStyles(styles)(DeliveryMain);
