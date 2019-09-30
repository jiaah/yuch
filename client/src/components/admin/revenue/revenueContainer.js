import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { twoYearsAgo, nextMonth } from '../../../helpers/moment';
import { formatToYearDateForm, formatToYYYY } from '../../../utils/date';
import { printDiv } from '../../../utils/print';
import DateButtons from '../../../shared/form/dateButtons';
import IconButton from '../../../shared/form/iconButton';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as invoiceActions from '../../../actions/invoiceAction';

const RevenueContainer = ({
  date,
  dateTrackerActions: { updateDate, resetDate },
  invoiceActions: { getRevenue, getYuchRevenue },
  addFlashMessage,
}) => {
  const [state, setState] = useState({ revenue: [], yuchRevenue: [] });
  console.log('state: ', state);

  // YYYYMMDD -> 'YYYY 년 MM 월'
  const formattedDate = formatToYearDateForm(date);

  const fetchData = async when => {
    // YYYYMMDD -> YYYYMM
    const yyyy = formatToYYYY(when);

    const resA = await getRevenue(yyyy);
    const resB = await getYuchRevenue(yyyy);
    if (resA.error && resB.error) {
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return setState({ ...state, revenue: resA, yuchRevenue: resB });
  };

  useEffect(() => {
    fetchData(date);
    return () => resetDate();
  }, []);

  return (
    <div className="container-a pw3">
      <h2 className="pointer" title="오늘 일자로 돌아가기" onClick={resetDate}>
        매출 현황
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
        dateForwardMessage="존재하지 않는 페이지입니다."
      />
      <div className="paper-label-box justify-end">
        <div>
          <IconButton
            name="print"
            width="32"
            height="32"
            viewBox="0 0 25 25"
            handleClick={() => printDiv('print')}
          />
        </div>
      </div>
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
)(RevenueContainer);
