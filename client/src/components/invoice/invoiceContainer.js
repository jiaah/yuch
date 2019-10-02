import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
/* --- Components --- */
import { thisMonthYYYYMM } from '../../helpers/moment';
import {
  formatToMonthDateForm,
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
  isAdmin,
  userId,
  companyName,
  dateTrackerActions: { updateDateMonthly, resetDateMonthly },
  invoiceActions: { getUserInvoice },
  addFlashMessage,
}) => {
  const [data, setData] = useState(null);

  // YYYYMMDD -> 'YYYY 년 MM 월'
  const formattedDate = formatToMonthDateForm(date);

  const parsed = queryString.parse(location.search);
  // getting userId & companyName from differnt places depend on the user type.
  const id = isAdmin ? parsed.id : userId;
  const name = isAdmin ? parsed.name : companyName;

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
    // return () => resetDateMonthly();
  }, []);

  return (
    <div className="container-a r--w-80 invoice-width">
      <h2
        className="pointer"
        title="오늘 일자로 돌아가기"
        onClick={resetDateMonthly}
      >
        {name}
      </h2>
      <DateButtons
        date={date}
        reload={true}
        unit="mm"
        formattedDate={formattedDate}
        startTime="20191001"
        endTime={`${thisMonthYYYYMM}01`}
        // endTime="20300101"
        updateDate={updateDateMonthly}
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
      <div id="print">
        {data && (
          <Paper
            component={
              <InvoiceTable data={data} invoiceFormat={invoiceFormat} />
            }
          />
        )}
        <div className="flex justify-between mt3 pw1">
          <p>bank account info</p>
          <p>
            성명
            :&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;(인)
          </p>
          <p>유청</p>
        </div>
        <div className="float-right mt3 mr5">
          <p>서명 후 돌려주세요. 감사합니다.</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  date: state.dateTracker.dateMm,
  isAdmin: state.auth.isAdmin,
  userId: state.auth.id,
  companyName: state.auth.companyName,
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
