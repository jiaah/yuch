import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
/* --- Components --- */
import List from './list';
import IconButton from '../../../shared/form/iconButton';
import ToggleMenu from './deliveryToggleMenu';
import { printDiv } from '../../../utils/print';

export const DeliveryBoard = ({
  classes: { board, boardPrint },
  id,
  route,
  delivery,
}) => {
  const [state, setState] = useState({
    activeId: null,
    anchorEl: null,
    onPrint: false,
  });

  const { activeId, anchorEl, onPrint } = state;

  const handleToggle = (ev, id) =>
    setState({ ...state, activeId: id, anchorEl: ev.currentTarget });

  const handleClose = () =>
    setState({ ...state, activeId: null, anchorEl: null });

  const handlePrint = async () => {
    await handleClose();
    await setState({ ...state, onPrint: true });
    return printDiv('print');
  };

  window.onafterprint = () => {
    setState({ ...state, onPrint: false });
    // redirect to delivery page ?
  };

  const handleDelete = () => console.log('delete');

  const width = onPrint ? 'delivery-board--print' : 'delivery-board';
  const backgroundColor = onPrint ? boardPrint : board;
  return (
    <Paper className={`ma3 ${width} ${backgroundColor}`}>
      <div key={id} className="mh1">
        <div className="flex justify-between mb2 mw1">
          <p className="f-regular">{route}</p>
          <div
            aria-owns={activeId === id ? 'menu-list-grow' : undefined}
            aria-haspopup={activeId === id ? 'true' : 'false'}
          >
            <IconButton
              name="moreHoriz"
              width="32"
              height="32"
              viewBox="0 0 25 25"
              handleClick={ev => handleToggle(ev, id)}
            />
            {activeId === id && (
              <ToggleMenu
                key={id}
                id={id}
                anchorEl={anchorEl}
                handleClose={handleClose}
                handlePrint={handlePrint}
                handleDelete={handleDelete}
                items={[
                  { id: '1', name: '복사하기' },
                  { id: '2', name: '삭제하기' },
                ]}
              />
            )}
          </div>
        </div>
        <div className="mb3" />
        {delivery && delivery.length !== 0 ? (
          <List data={delivery} open={onPrint} />
        ) : (
          <p>경유지를 등록하세요.</p>
        )}
      </div>
    </Paper>
  );
};

export default DeliveryBoard;
