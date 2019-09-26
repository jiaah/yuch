import React, { useState } from 'react';
/* --- Components --- */
import { formattedToday } from '../../../helpers/moment';
import EndServiceForm from './endServiceForm';
import Loader from '../../loader';

const AdminVerificationContainer = Loader({
  loader: () =>
    import('../../../shared/adminVerification/adminVerificationContainer' /* webpackChunkName: 'Verification' */),
});

const EndServiceFormBox = ({
  userId,
  formattedUserEndDate,
  // actions
  handleEndingService,
  addFlashMessage,
  // funcs
  formatToYYYYMMDD,
}) => {
  // state endService & date -> values from db : fomattedToday
  const [state, setState] = useState({
    endService: !!formattedUserEndDate,
    endDate: formattedUserEndDate || formattedToday,
  });
  const { endService, endDate } = state;
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
    await setSubmitting(true);
    const formattedDate = formatToYYYYMMDD(endDate);
    const res = await handleEndingService(userId, endService, formattedDate);
    await offVerification();
    if (!res.error) {
      addFlashMessage('success', '서비스 설정을 성공적으로 저장하였습니다.');
    } else {
      addFlashMessage(
        'error',
        '서비스 설정에 실패하였습니다. 다시 시도해주세요.',
      );
    }
    return setSubmitting(false);
  };

  const checkedDate = formatToYYYYMMDD(endDate);

  return (
    <div>
      {!verification ? (
        <EndServiceForm
          checkedDate={checkedDate}
          isSubmitting={isSubmitting}
          endService={endService}
          endDate={endDate}
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
