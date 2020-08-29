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
  firstDayOfYYYYMMDD,
} from '../../utils/date';
import { printDiv } from '../../utils/print';
import DateButtons from '../../shared/form/dateButtons';
import IconButton from '../../shared/form/iconButton';
import Paper from '../../shared/paper';
import InvoiceTable from './invoiceTable';
import { admin, admin2 } from '../../data/data';
/* --- Actions --- */
import * as dateTrackerActiions from '../../actions/dateTrackerAction';
import { addFlashMessage } from '../../actions/messageAction';
import * as invoiceActions from '../../actions/invoiceAction';
/* --- images --- */
import logo from '../../../assets/img/yuch-logo.png';

const InvoiceContainer = ({
  date,
  isAdmin,
  userId,
  companyName,
  dateTrackerActions: { updateDateMonthly, resetDateMonthly },
  invoiceActions: { getUserInvoice },
  addFlashMessage,
}) => {
  const [data, setData] = useState([]);

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

  const parsedStartDate = firstDayOfYYYYMMDD(data.startDate);

  useEffect(() => {
    fetchData(date);
  }, []);

  return (
    <React.Fragment>
      {data && data.length !== 0 && (
        <div id="print" className="container-a r--w-50 invoice-width">
          <div className="print-width">
            {data.bankAccount.accountHolder === '김귀자' && (
              <img
                className="guide--yuch-logo-s dn only-print"
                src={logo}
                alt="logo"
              />
            )}
            <div className="print-tc">
              <h2
                className="pointer center"
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
                startTime={parsedStartDate}
                endTime={
                  isAdmin ? `${thisMonthYYYYMM}32` : `${thisMonthYYYYMM}01`
                }
                updateDate={updateDateMonthly}
                addFlashMessage={addFlashMessage}
                fetchData={fetchData}
                dateForwardMessage={
                  isAdmin
                    ? '다음달 명세서는 발급될 수 없습니다.'
                    : '매월 1일에 세금명세서가 발급됩니다.'
                }
              />
              <div className="paper-label-box justify-end noprint">
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

              <Paper
                component={
                  <InvoiceTable data={data} invoiceFormat={invoiceFormat} />
                }
              />
              <div className="flex justify-between mt3 pw1">
                <p>
                  {data.bankAccount.accountHolder}
                  &#8199;
                  {data.bankAccount.accountNo}
                  &#8199;
                  {data.bankAccount.bankName}
                </p>
                <p>
                  성명
                  &#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;(인)
                </p>
                <p>
                  {data.bankAccount.accountHolder === '김귀자'
                    ? admin.companyName
                    : admin2.companyName}
                </p>
              </div>
              <div className="float-right mt3 mr5">
                <p>서명 후 돌려주세요. 감사합니다.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceContainer);
