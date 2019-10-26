import React, { useState } from 'react';
/* --- Components --- */
import EndServiceForm from './endServiceForm';
import Loader from '../../loader';

const AdminVerificationContainer = Loader({
  loader: () =>
    import('../../../shared/adminVerification/adminVerificationContainer' /* webpackChunkName: 'Verification' */),
});

const EndServiceFormBox = ({
  clickedUserData,
  // actions
  handleEndingService,
  addFlashMessage,
  deleteUser,
  // funcs
  formatToYYYYMMDD,
  closeSubModal,
  handleCloseModal,
  formattedToday,
}) => {
  // state endService & date -> values from db : fomattedToday

  const endDateToDisplay =
    clickedUserData.endDate !== '9999-12-31'
      ? clickedUserData.endDate
      : formattedToday;

  const [state, setState] = useState({
    endService: clickedUserData.endDate !== '9999-12-31',
    endDate: endDateToDisplay,
    startDate: clickedUserData.startDate,
  });

  const { endService, endDate, startDate } = state;

  const [isSubmitting, setSubmitting] = useState(false);
  const [verification, setVerification] = useState(false);

  const offVerification = () => setVerification(false);
  const onVerification = () => setVerification(true);

  const handleChange = name => event => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async () => {
    // deleteUser(clickedUserData.id);
    await setSubmitting(true);
    const formattedEndDate = formatToYYYYMMDD(endDate);
    const formattedStartDate = formatToYYYYMMDD(startDate);
    const date = endService ? formattedEndDate : formattedStartDate;

    const res = await handleEndingService(clickedUserData.id, endService, date);

    await offVerification();
    if (!res.error) {
      Promise.all([closeSubModal(), handleCloseModal()]);
      addFlashMessage('success', '서비스 설정을 성공적으로 저장하였습니다.');
      window.location.reload(true);
    } else {
      addFlashMessage(
        'error',
        '서비스 설정에 실패하였습니다. 다시 시도해주세요.',
      );
    }
    return setSubmitting(false);
  };

  // const checkedDate = formatToYYYYMMDD(endDate);

  return (
    <div>
      {!verification ? (
        <EndServiceForm
          // checkedDate={checkedDate}
          isSubmitting={isSubmitting}
          endService={endService}
          endDate={endDate}
          startDate={startDate}
          handleChange={handleChange}
          onVerification={onVerification}
        />
      ) : (
        <AdminVerificationContainer
          handleAdminVerificationSuccess={handleSubmit}
          confirmType="edit"
        />
      )}
    </div>
  );
};

export default EndServiceFormBox;
