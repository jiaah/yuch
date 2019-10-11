import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
/* --- Components --- */
import { admin } from '../../../data/data';
import { printDiv } from '../../../utils/print';
import IconButton from '../../../shared/form/iconButton';
import Select from '../../../shared/form/select';
import Welcome from './welcome';
import MealPrice from './mealPrice';
/* --- images --- */
import logo from '../../../../assets/img/yuch-logo.png';

const styles = () => ({
  textField: {
    width: 300,
    margin: '8px auto',
  },
  textFieldA: {
    width: 180,
    marginTop: '-4px',
  },
  textFieldB: {
    width: 70,
    margin: '-4px 1em 0 1em',
  },
  textFieldC: {
    width: 40,
    margin: '-4px 1em 0 1em',
  },
});

const UserGuide = ({
  classes: { textField, textFieldA, textFieldB, textFieldC },
  guide,
}) => {
  const [state, setState] = useState({
    companyName: '',
    username: '',
    password: '',
    email: '',
    mealPrice: '',
    newMealPrice: '',
    month: '',
    day: '',
  });

  const handleChange = (e, name) =>
    setState({ ...state, [name]: e.target.value });

  const margin = guide === '회원 등록' ? 'mt3' : 'guide--margin';

  return (
    <div id="print" className="container-a r--w-60">
      <div className="print-width guide f-regular lh-2">
        <div className="flex justify-between pb4 pt2">
          <img className="guide--yuch-logo" src={logo} alt="logo" />
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
        <div className="flex justify-center">
          <TextField
            name="companyName"
            value={state.companyName || ''}
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
            state={state}
            textField={textField}
          />
        )}
        {guide === '식수 변경' && (
          <MealPrice
            handleChange={handleChange}
            adminCompanyName={admin.companyName}
            state={state}
            textFieldB={textFieldB}
            textFieldC={textFieldC}
          />
        )}
        <p className={`b ${margin}`}>유청 서비스를 이용해 주셔서 감사합니다.</p>
        <p className={`${margin} guide--footer c-text2`}>
          위탁급식 전문업체 | 성당, 교회 각종 행사모임 출장 뷔페 | 가정식 한식
          뷔폐
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  guide: state.selected.guide,
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null,
  ),
)(UserGuide);
