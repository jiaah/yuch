import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import UserForm from './userForm';

const UserFormBox = ({
  userData,
  editUserAccountValidation,
  editUserAccount,
  updateCompanyName,
  addFlashMessage,
  openPasswordForm,
}) => {
  const handleEditAdmin = async (values, { setSubmitting }) => {
    const { id } = userData;
    const { lunchQty, dinnerQty, ...others } = values;
    const lunchQtyValue = lunchQty === '' ? null : lunchQty;
    const dinnerQtyValue = dinnerQty === '' ? null : dinnerQty;
    const userInfo = {
      lunchQty: lunchQtyValue,
      dinnerQty: dinnerQtyValue,
      ...others,
    };
    try {
      await editUserAccount(id, userInfo);
      // if companyName changes -> update auth login state -> change companyName on Nav bar
      if (userData.companyName !== values.companyName) {
        updateCompanyName(id, values.companyName);
      }
      await addFlashMessage(
        'success',
        `${values.companyName}님의 계정이 수정되었습니다.`,
      );
    } catch (error) {
      await addFlashMessage(
        'error',
        `${
          valuse.companyName
        }님의 계정 수정에 실패하였습니다. 다시 시도해 주세요.`,
      );
    }
    return setSubmitting(false);
  };
  return (
    <Formik
      initialValues={userData}
      render={props => (
        <Form className="flex flex-column-m items-center justify-center">
          <UserForm {...props} openPasswordForm={openPasswordForm} />
        </Form>
      )}
      onSubmit={handleEditAdmin}
      validationSchema={editUserAccountValidation}
    />
  );
};

export default UserFormBox;
