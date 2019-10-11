import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import EnhancedTableHead from '../../../shared/tableHead';
import Modal from '../../../shared/modal';

const styles = theme => ({
  point: { fontWeight: 'bold', color: '#E8716F' },
  table: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
  resize: {
    [theme.breakpoints.up('md')]: {
      fontSize: '15.5px',
    },
  },
});

const MealPriceModal = ({
  classes: { point, table, resize },
  clickedUserData,
  getUserRates,
  hideModal,
  userMealPriceColumns,
  isThisMonth,
}) => {
  const [data, setData] = useState(null);

  const fetchDate = async () => {
    const res = await getUserRates(clickedUserData.id);
    return setData(res);
  };

  useEffect(() => {
    fetchDate();
  }, []);

  return (
    <Modal
      title={`${clickedUserData.companyName} 식수가격표`}
      handleClose={() => hideModal()}
      component={
        <div className="mh2 user-mealPrice">
          <Table
            aria-labelledby="mealPrice"
            size="small"
            className={`${table} center`}
          >
            <EnhancedTableHead list={userMealPriceColumns} />
            <TableBody>
              {data &&
                data.length !== 0 &&
                data.map((row, index) => {
                  if (index < 3) {
                    const endDate =
                      row.endedAt === '9999-12-31' ? '-' : row.endedAt;
                    const focus = isThisMonth(row.startedAt, row.endedAt)
                      ? point
                      : null;

                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <TableRow key={index}>
                        <TableCell
                          align="right"
                          className={`${focus} ${resize}`}
                        >
                          {row.startedAt}
                        </TableCell>
                        <TableCell
                          align="right"
                          className={`${focus} ${resize}`}
                        >
                          {endDate}
                        </TableCell>
                        <TableCell
                          align="right"
                          className={`${focus} ${resize}`}
                        >
                          {row.mealPrice}
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return null;
                })}
            </TableBody>
          </Table>
        </div>
      }
    />
  );
};

export default withStyles(styles)(MealPriceModal);
