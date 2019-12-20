import React from 'react';
/* --- Components --- */
import IconButton from '../../../shared/form/iconButton';
import { printDiv } from '../../../utils/print';
import DeliveryBoardList from './deliveryBoardList';

const Delivery = ({ classes, data }) => {
  const addBoard = async () => {
    // Q) board 생성할때 마다 db에 저장 ?
    const res = await createRoute('루트');
  };

  return (
    <main className={`${classes.content} r--w-80`}>
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
      <DeliveryBoardList data={data} classes={classes} />
    </main>
  );
};
export default Delivery;
