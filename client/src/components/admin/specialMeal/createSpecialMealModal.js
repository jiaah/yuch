import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
/* --- Components --- */
import Modal from '../../../shared/modal';
import SpecialMealForm from './specialMealForm';
import { specialMealValidation } from '../../formValidation';
import SearchBar from '../../../shared/searchBar/searchBarContainer';

const styles = theme => ({
  checkbox: {
    marginRight: '-3px',
    [theme.breakpoints.up('md')]: {
      marginRight: '-11px',
    },
  },
});

const createModal = ({
  classes: { checkbox },
  formattedTmr,
  adminSpecialMealMsg,
  // global state
  clickedUserData,
  // actions
  hideModal,
  createSpecialMeal,
  addFlashMessage,
  getUsers,
  resetSelectedItemValue,
  saveClickedItemData,
  resetClickedItemData,
}) => {
  const initValues = {
    companyName: '',
    date: formattedTmr,
    time: '12:30',
    quantity: '',
    sideDish: '',
    mealPrice: '',
    address: '',
    contactNo: '',
    note: '',
  };

  const [state, setState] = useState({
    selectedUser: false,
    users: [],
    inputValues: initValues,
    userId: null,
  });

  const handleSuggestionSelected = modalSearchedUser => {
    setState({
      ...state,
      userId: modalSearchedUser.id,
      inputValues: {
        companyName: modalSearchedUser && modalSearchedUser.companyName,
        date: formattedTmr,
        time: '12:30',
        quantity: '',
        sideDish: '',
        mealPrice: '',
        address: modalSearchedUser && modalSearchedUser.address,
        contactNo: modalSearchedUser && modalSearchedUser.contactNo,
        note: '',
      },
    });
  };

  const handleResetSearch = () =>
    setState({ ...state, selectedUser: false, inputValues: initValues });

  // yuch client selection checkbox
  const handleChange = name => async event => {
    const checked = event.target.checked;
    return setState({ ...state, [name]: checked, inputValues: initValues });
  };

  // get users list
  const fetchUsersData = async () => {
    const res = await getUsers();
    return setState({ ...state, users: res.activeUsers });
  };

  useEffect(() => {
    fetchUsersData();
    if (clickedUserData.length !== 0) resetClickedItemData();
    return () => {
      handleResetSearch();
    };
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    await setSubmitting(true);
    const sendingData = {
      userId: state.userId && state.selectedUser ? state.userId : null,
      ...values,
    };

    const res = await createSpecialMeal(sendingData);

    if (!res.error) {
      // to keep the created row on focus after re-render
      await saveClickedItemData(sendingData);
      await Promise.all([
        // render all users list if it's filtered by searching
        resetSelectedItemValue(),
        hideModal(),
        resetForm({}),
        addFlashMessage('success', `저장되었습니다.`),
      ]);
      window.location.reload(true);
    } else {
      await addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return setSubmitting(false);
  };

  return (
    <Modal
      title="특식 등록"
      handleClose={() => hideModal()}
      component={
        <React.Fragment>
          <div className="special-meal-select-user--box">
            <div className="flex media--justify-around mt4 mb2 special-meal-select-user">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.selectedUser}
                    onChange={handleChange('selectedUser')}
                    value="selectedUser"
                  />
                }
                label="유청 고객 등록하기"
                className={checkbox}
              />
              {state.selectedUser && (
                <SearchBar
                  data={state.users}
                  searchingProp="companyName"
                  handleSuggestionSelected={handleSuggestionSelected}
                  handleResetSearch={handleResetSearch}
                  isSecondSearchBar={true}
                />
              )}
            </div>
            {adminSpecialMealMsg}
          </div>
          <Formik
            initialValues={state.inputValues}
            onSubmit={handleSubmit}
            render={props => (
              <Form>
                <SpecialMealForm {...props} />
              </Form>
            )}
            validationSchema={specialMealValidation}
          />
        </React.Fragment>
      }
    />
  );
};

export default withStyles(styles)(createModal);
