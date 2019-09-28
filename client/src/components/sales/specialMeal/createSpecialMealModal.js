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
import { adminSpecialMealMsg } from '../../../data/message';

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
  // actions
  hideModal,
  createSpecialMeal,
  addFlashMessage,
  getUsers,
}) => {
  // yuch client selection checkbox
  const [state, setState] = useState({ selectedUser: false });
  const handleChange = name => event =>
    setState({ ...state, [name]: event.target.checked });

  // get users list
  const [users, setUsers] = useState(null);
  const fetchUsersData = async () => {
    const res = await getUsers();
    return setUsers(res.activeUsers);
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    await setSubmitting(true);
    const sendingData = { userId: '', ...values };
    const res = await createSpecialMeal(sendingData);
    if (!res.error) {
      Promise.all([
        hideModal(),
        resetForm({}),
        addFlashMessage('success', `저장되었습니다.`),
      ]);
      window.location.reload(true);
    } else {
      addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return setSubmitting(false);
  };

  const initialValues = {
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

  return (
    <div className="container">
      <Modal
        title="특식 등록"
        handleClose={() => hideModal()}
        component={
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={props => (
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
                    <SearchBar
                      data={users}
                      handleSuggestionSelected={() => {}}
                      handleResetSearch={() => {}}
                    />
                  </div>
                  {adminSpecialMealMsg}
                </div>
                <Form>
                  <SpecialMealForm {...props} />
                </Form>
              </React.Fragment>
            )}
            validationSchema={specialMealValidation}
          />
        }
      />
    </div>
  );
};

export default withStyles(styles)(createModal);
