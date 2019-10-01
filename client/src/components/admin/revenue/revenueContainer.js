import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { twoYearsAgo, nextYear } from '../../../helpers/moment';
import { formatToYearDateForm, formatToYYYY } from '../../../utils/date';
import { printDiv } from '../../../utils/print';
import DateButtons from '../../../shared/form/dateButtons';
import IconButton from '../../../shared/form/iconButton';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as invoiceActions from '../../../actions/invoiceAction';

const InvoiceContainer = ({
  date,
  dateTrackerActions: { updateDateYearly, resetDateYearly },
  invoiceActions: { getRevenue },
  addFlashMessage,
}) => {
  // YYYYMMDD -> 'YYYY 년 MM 월'
  const formattedDate = formatToYearDateForm(date);
  const [data, setData] = useState([]);
  console.log('data: ', data);

  const fetchData = async when => {
    // YYYYMMDD -> YYYYMM
    const yyyy = formatToYYYY(when);
    console.log('yyyy: ', yyyy);
    const res = await getRevenue(yyyy);

    if (res.error) {
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return setData(res);
  };

  useEffect(() => {
    fetchData(date);
    return () => resetDateYearly();
  }, []);

  return (
    <div className="container-a r--w-80">
      <h2
        className="pointer"
        title="오늘 일자로 돌아가기"
        onClick={resetDateYearly}
      >
        거래 명세서
      </h2>
      <DateButtons
        date={date}
        reload={true}
        unit="yy"
        formattedDate={formattedDate}
        startTime="20190101"
        endTime={`${nextYear}0101`}
        updateDate={updateDateYearly}
        addFlashMessage={addFlashMessage}
        fetchData={fetchData}
        dateForwardMessage="존재하지 않는 페이지입니다."
      />
      <div className="paper-label-box justify-end">
        <IconButton
          name="print"
          width="32"
          height="32"
          viewBox="0 0 25 25"
          handleClick={() => printDiv('print')}
        />
      </div>
      {/* {data && (
        <Paper
          id="print"
          data={data}
        />
      )} */}
    </div>
  );
};

const mapStateToProps = state => ({
  date: state.dateTracker.dateYy,
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
