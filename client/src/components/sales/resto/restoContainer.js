import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import {
  today,
  tomorrow,
  lastMonth,
  dateInKorean,
} from '../../../helpers/moment';
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
  restoActions: { getRestoSales, updateRestoSales },
  addFlashMessage,
}) => {
  const [resto, setResto] = useState(null);

  const mockData = [{ date: '20190923', lunch: 20, dinner: 40 }, {}];
  const dataFilter = when => {
    // const filteredData = restoSales.filter(r => r.date === when);
    const filteredData = mockData.filter(r => r.date === when);
    return setResto(prevState => ({ ...prevState, ...filteredData[0] }));
  };

  const initfetchData = async when => {
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

  const fetchData = when => dataFilter(when);

  useEffect(() => {
    // non-interactive data with clients
    // do not make api GET request every render
    if (restoSales.length === 0) {
      initfetchData(date);
    } else {
      fetchData(date);
    }
    return () => resetDate();
  }, []);

  return (
    <div className="user-catering--container">
      <h2 className="pointer" title="오늘 일자로 돌아가기" onClick={resetDate}>
        식당 매출 관리
      </h2>
      {resto && (
        <React.Fragment>
          <DateButtons
            date={date}
            startTime={lastMonth}
            endTime={tomorrow}
            updateDate={updateDate}
            addFlashMessage={addFlashMessage}
            fetchData={fetchData}
            dateForwardMessage="존재하지 않는 페이지입니다."
          />
          <div className="user-catering--form">
            <RestoFormBox
              resto={resto}
              today={today}
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
