import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { inONEYear } from '../../../helpers/moment';
import {
  formatToMonthDateForm,
  formatToYYYYMM,
  formatToDateForm,
} from '../../../utils/date';
import DateButtons from '../../../shared/form/dateButtons';
import Paper from '../../../shared/paper';
import Table from './specialMealTable';
import IconButton from '../../../shared/form/iconButton';
import { printDiv } from '../../../utils/print';
import { userSpecialMealNotice } from '../../../data/message';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as specialMealActions from '../../../actions/specialMealAction';
import { admin } from '../../../data/data';

const SpecialMealContainer = ({
  userId,
  date,
  specialMealActions: { getUserSpecialMeal },
  dateTrackerActions: { updateDateDaily, resetDateDaily },
  addFlashMessage,
}) => {
  // YYYYMMDD -> 'YYYY 년 MM 월'
  const formattedDate = formatToMonthDateForm(date);

  const [specialMeal, setSpecialMeal] = useState(null);

  const fetchData = async when => {
    // YYYYMMDD -> YYYYMM
    const yyyymm = formatToYYYYMM(when);

    const res = await getUserSpecialMeal(userId, yyyymm);

    if (res.error) {
      setSpecialMeal([]);
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return setSpecialMeal(res);
  };

  useEffect(() => {
    fetchData(date);
    return () => resetDateDaily();
  }, []);

  return (
    <React.Fragment>
      {specialMeal && (
        <div id="print" className="container-a r--w-98">
          <div className="print-width print-tc">
            <h2
              className="pointer"
              title="오늘 일자로 돌아가기"
              onClick={resetDateDaily}
            >
              특식
            </h2>
            <DateButtons
              date={date}
              reload={true}
              unit="mm"
              formattedDate={formattedDate}
              startTime={admin.startTime}
              endTime={`${inONEYear}01`}
              updateDate={updateDateDaily}
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
            <Paper
              component={
                specialMeal && specialMeal.length !== 0 ? (
                  <Table
                    data={specialMeal}
                    formatToDateForm={formatToDateForm}
                  />
                ) : (
                  <h3 className="mt4 mb4">신청한 특식이 없습니다.</h3>
                )
              }
            />
          </div>
          {userSpecialMealNotice}
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.id,
  date: state.dateTracker.date,
});
const mapDispatchToProps = dispatch => ({
  dateTrackerActions: bindActionCreators(dateTrackerActiions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  specialMealActions: bindActionCreators(specialMealActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpecialMealContainer);
