import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { tomorrow, lastMonth, dateInKorean } from '../../../helpers/moment';
import { formatToDateForm } from '../../../utils/date';
import RestoFormBox from './restoFormBox';
import DateButtons from '../../../shared/form/dateButtons';
import { restoSalesMsg } from '../../../data/message';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import * as restoActions from '../../../actions/restoAction';
import { addFlashMessage } from '../../../actions/messageAction';

const RestoContainer = ({
  date,
  restoSales,

  dateTrackerActions: { updateDate, resetDate },
  restoActions: { getRestoSales, updateRestoSales, resetRestoSales },
  addFlashMessage,
}) => {
  const [resto, setResto] = useState(null);

  const dataFilter = when => {
    const filteredData = restoSales && restoSales.filter(r => r.date === when);
    return setResto(prevState => ({ ...prevState, ...filteredData[0] }));
  };

  const fetchData = async when => {
    const res = await getRestoSales(when);
    if (res.error) {
      setResto({
        date: dateInKorean,
        lunch: null,
        dinner: null,
      });
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return dataFilter(when);
  };

  useEffect(() => {
    // non-interactive data with clients
    // do not make api GET request every render
    if (restoSales.length === 0) {
      fetchData(date);
    } else {
      dataFilter(date);
    }
    return () => Promise.all([resetRestoSales(), resetDate()]);
  }, []);

  // YYYYMMDD -> 'MM 월 DD 일 (ddd)'
  const formattedDate = formatToDateForm(date);

  return (
    <div className="container-b">
      <h2 className="pointer" title="오늘 일자로 돌아가기" onClick={resetDate}>
        식당 매출 관리
      </h2>
      {resto && (
        <React.Fragment>
          <DateButtons
            reload={true}
            startTime={lastMonth}
            endTime={tomorrow}
            monthlyUnit={false}
            formattedDate={formattedDate}
            date={date}
            updateDate={updateDate}
            addFlashMessage={addFlashMessage}
            fetchData={fetchData}
            dateForwardMessage="존재하지 않는 페이지입니다."
          />
          <div className="input-table">
            <RestoFormBox
              resto={resto}
              date={date}
              updateRestoSales={updateRestoSales}
              addFlashMessage={addFlashMessage}
            />
          </div>
        </React.Fragment>
      )}
      {restoSalesMsg}
    </div>
  );
};

const mapStateToProps = state => ({
  date: state.dateTracker.date,
  restoSales: state.resto.sales,
});
const mapDispatchToProps = dispatch => ({
  dateTrackerActions: bindActionCreators(dateTrackerActiions, dispatch),
  restoActions: bindActionCreators(restoActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestoContainer);
