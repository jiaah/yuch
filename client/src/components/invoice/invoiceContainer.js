import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
/* --- Components --- */
import { twoYearsAgo, nextMonth } from '../../helpers/moment';
import {
  formatToYearDateForm,
  formatToYYYYMM,
  invoiceFormat,
} from '../../utils/date';
import { printDiv } from '../../utils/print';
import DateButtons from '../../shared/form/dateButtons';
import IconButton from '../../shared/form/iconButton';
import Paper from '../../shared/paper';
import InvoiceTable from './invoiceTable';
/* --- Actions --- */
import * as dateTrackerActiions from '../../actions/dateTrackerAction';
import { addFlashMessage } from '../../actions/messageAction';
import * as invoiceActions from '../../actions/invoiceAction';

const InvoiceContainer = ({
  date,
  dateTrackerActions: { updateDate, resetDate },
  invoiceActions: { getUserInvoice },
  addFlashMessage,
}) => {
  const [data, setData] = useState(null);

  // YYYYMMDD -> 'YYYY 년 MM 월'
  const formattedDate = formatToYearDateForm(date);

  const parsed = queryString.parse(location.search);
  const { id, name } = parsed;

  const fetchData = async when => {
    // YYYYMMDD -> YYYYMM
    const yyyymm = formatToYYYYMM(when);

    const res = await getUserInvoice(id, yyyymm);

    if (res.error) {
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return setData(res);
  };

  useEffect(() => {
    fetchData(date);
    return () => resetDate();
  }, []);

  return (
    <div className="container-a r--w-80 invoice-width">
      <h2 className="pointer" title="오늘 일자로 돌아가기" onClick={resetDate}>
        {name}
      </h2>
      <DateButtons
        reload={true}
        monthlyUnit={true}
        startTime={twoYearsAgo}
        endTime={nextMonth}
        formattedDate={formattedDate}
        date={date}
        updateDate={updateDate}
        addFlashMessage={addFlashMessage}
        fetchData={fetchData}
        dateForwardMessage="매월 1일에 세금명세서가 발급됩니다."
      />
      <div className="paper-label-box justify-end">
        <Link to="/admin/invoice/users">
          <IconButton
            name="list"
            width="32"
            height="32"
            viewBox="0 0 25 25"
            handleClick={() => {}}
          />
        </Link>
        <IconButton
          name="print"
          width="32"
          height="32"
          viewBox="0 0 25 25"
          handleClick={() => printDiv('print')}
        />
      </div>
      {data && (
        <Paper
          component={<InvoiceTable data={data} invoiceFormat={invoiceFormat} />}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  date: state.dateTracker.date,
});
const mapDispatchToProps = dispatch => ({
  dateTrackerActions: bindActionCreators(dateTrackerActiions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  invoiceActions: bindActionCreators(invoiceActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvoiceContainer);
