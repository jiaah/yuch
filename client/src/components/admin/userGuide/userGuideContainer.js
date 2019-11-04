import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { admin } from '../../../data/data';
import { printDiv } from '../../../utils/print';
import IconButton from '../../../shared/form/iconButton';
import Select from '../../../shared/form/select';
import Welcome from './welcome';
import MealPrice from './mealPrice';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import { removeSpecialCharacters } from '../../../utils/reformat';
/* --- Actions --- */
import * as adminActions from '../../../actions/adminAccountAction';
/* --- images --- */
import logo from '../../../../assets/img/yuch-logo.png';

const styles = () => ({
  textField: {
    width: 300,
    margin: '8px auto',
  },
  textFieldA: {
    width: 180,
    marginTop: '-2px',
  },
  textFieldB: {
    width: 70,
    margin: '-4px 1em 0 1em',
  },
  textFieldC: {
    width: 50,
    margin: '-4px 1em 0 1em',
  },
});

const UserGuide = ({
  classes: { textField, textFieldA, textFieldB, textFieldC },
  guide,
  adminActions: { getUsers, getUserRates },
}) => {
  const initInput = {
    companyName: '',
    username: '',
    password: '',
    email: '',
    mealPrice: '',
    newMealPrice: '',
    year: '',
    month: '',
    day: '',
  };

  const [data, setData] = useState({ users: null });
  const [input, setInput] = useState(initInput);

  const fetchData = async () => {
    const resA = await getUsers();
    const allUsers = [...resA.activeUsers, ...resA.inActiveUsers];
    return setData({ ...data, users: allUsers });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSuggestionSelected = async searched => {
    // user data (mealPrice : current mealPrice)
    const { id, companyName, username, email, contactNo, mealPrice } = searched;

    // render meal prices
    const rates = await getUserRates(id);
    const splittedDate = rates[0].startedAt.split('');

    // set contactNo as password
    const password = await removeSpecialCharacters(contactNo);

    return setInput({
      ...input,
      companyName,
      username,
      email,
      password,
      mealPrice: rates.length > 1 ? rates[1].mealPrice : mealPrice,
      newMealPrice: rates.length > 1 ? rates[0].mealPrice : '##',
      year: splittedDate.slice(0, 4).join(''),
      month: splittedDate.slice(5, 7).join(''),
      day: splittedDate.slice(8, 10).join(''),
    });
  };

  const handleResetSearch = () => setInput({ ...input, ...initInput });

  const handleChange = (e, name) =>
    setInput({ ...input, [name]: e.target.value });

  const margin = guide === '회원 등록' ? 'mt3' : 'mt5';

  return (
    <div className="container-a r--w-60">
      <div className="paper-label-box flex justify-between pt2">
        <SearchBar
          data={data.users}
          searchingProp="companyName"
          handleSuggestionSelected={handleSuggestionSelected}
          handleResetSearch={handleResetSearch}
        />
        <div className="flex">
          <Select
            label=""
            name="guide"
            selectedValue={guide}
            options={[{ value: '회원 등록' }, { value: '식수 변경' }]}
            size="small"
          />
          <IconButton
            name="print"
            width="32"
            height="32"
            viewBox="0 0 25 25"
            handleClick={() => printDiv('print')}
          />
        </div>
      </div>
      <div id="print">
        <div className="print-width print-tc ">
          <div className="guide f-regular lh-2">
            <img
              className="flex justify-start pb4 pt2 guide--yuch-logo"
              src={logo}
              alt="logo"
            />
            <div className="flex justify-center">
              <TextField
                name="companyName"
                value={input.companyName || ''}
                onChange={e => handleChange(e, 'companyName')}
                className={textFieldA}
              />
              <p className="ml3">
                고객님, &#8199;
                {guide === '회원 등록' && (
                  <React.Fragment>
                    <span className="b">환영합니다</span>.
                  </React.Fragment>
                )}
              </p>
            </div>
            {guide === '회원 등록' && (
              <Welcome
                handleChange={handleChange}
                adminCompanyName={admin.companyName}
                state={input}
                textField={textField}
              />
            )}
            {guide === '식수 변경' && (
              <MealPrice
                handleChange={handleChange}
                adminCompanyName={admin.companyName}
                state={input}
                textFieldB={textFieldB}
                textFieldC={textFieldC}
              />
            )}
            <p className={`b ${margin}`}>
              유청 서비스를 이용해 주셔서 감사합니다.
            </p>
            <p className={`${margin} f-xs c-text2`}>
              위탁급식 전문업체 | 성당, 교회 각종 행사모임 출장 뷔페 | 가정식
              한식 뷔폐
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  guide: state.selected.guide,
});

const mapDispatchToProps = dispatch => ({
  adminActions: bindActionCreators(adminActions, dispatch),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(UserGuide);
