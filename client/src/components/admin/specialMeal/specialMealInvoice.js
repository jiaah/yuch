import React from 'react';
import { connect } from 'react-redux';
import { formatNumber, combinedFormat } from '../../../utils/reformat';
import Paper from '../../../shared/paper';
/* --- images --- */
import logo from '../../../../assets/img/yuch-logo.png';
/* --- Components --- */
import { formatToDayDateForm, formatToTimeForm } from '../../../utils/date';
import { printDiv } from '../../../utils/print';
import IconButton from '../../../shared/form/iconButton';
import { admin } from '../../../data/data';

const SpecialMealInvoice = ({ clickedUserData, data }) => {
  const {
    companyName,
    sideDish,
    mealPrice,
    quantity,
    date,
    time,
    sumTotal,
  } = clickedUserData[0];
  const bankAccount = data.bankAccounts[0];
  // const TAX_RATE = 0.1;

  // const invoiceTaxes = TAX_RATE * sumTotal;
  // const invoiceTotal = invoiceTaxes + sumTotal;

  const formattedSubTotal = combinedFormat(sumTotal);
  // const formattedTax = `${(TAX_RATE * 100).toFixed(0)} %`;
  // const formattedInvoiceTaxes = combinedFormat(invoiceTaxes);
  // const formattedInvoiceTotal = combinedFormat(invoiceTotal);

  const formattedMealPrice = formatNumber(mealPrice);
  const formattedDate = formatToDayDateForm(date);
  const formattedTime = formatToTimeForm(time);

  return (
    <div className="r--w-60 center mt5" id="print">
      <div className="print-width">
        <div className="float-right mt2">
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
            <div className="ma3 f-regular">
              <div className="flex justify-between">
                <img className="guide--yuch-logo" src={logo} alt="logo" />
                <p className="company-contact lh-1">출장뷔페 / 위탁급식</p>
              </div>
              <h2 className="tc mb3 mt3">거래 명세서</h2>
              <div className="special-meal--br pw1 ph1">
                <div className="lh-3">
                  <span className="f-mini fw3 c-text2">고객명</span>
                  &#8199;&#8199;&#8199;&#8199;&#8199;&#8199;
                  {companyName}
                  <br />
                  <span className="f-mini fw3 c-text2">일자</span>
                  &#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8201;
                  {formattedDate}
                  &#8199;
                  {formattedTime}
                  <br />
                  <span className="f-mini fw3 c-text2">반찬 수</span>
                  &#8199;&#8199;&#8199;&#8199;&#8199;&#8201;
                  {sideDish}
                  <br />
                  <span className="f-mini fw3 c-text2">식수</span>
                  &#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;
                  {quantity}
                  <br />
                  <span className="f-mini fw3 c-text2">식수 가격</span>
                  &#8199;&#8199;&#8199;&#8201;&#8201;
                  {formattedMealPrice}
                </div>
                <p className="flex justify-end mt2">
                  합계&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;
                  {/* &#8199;&#8199;&#8199;&#8199;&#8199; */}
                  <span className="b">{formattedSubTotal}</span>
                  &#8199;원
                  {/* <br />
                Tax&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;
                {formattedTax}
                &#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;
                {formattedInvoiceTaxes}
                <br />
                Total
                &#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8201;
                {formattedInvoiceTotal} */}
                </p>
                <div className="mt4 flex justify-center">
                  <p className="mr4">위와 같이 공급합니다.</p>
                  <p>
                    서명
                    &#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;(인)
                  </p>
                </div>
              </div>
              <div className="mt4 f-xs fw3 lh-1 flex justify-around">
                <p className="b">{admin.companyName}</p>
                <p>
                  {admin.address}
                  <br />
                  {admin.addressSub}
                </p>
                <p>
                  BANK.&#8199;
                  {bankAccount.accountHolder}
                  &#8199;
                  {bankAccount.accountNo}
                  &#8199;
                  {bankAccount.bankName}
                  <br />
                  TEL.&#8199;&#8199;&#8201;
                  {admin.contactNo1}
                </p>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  clickedUserData: state.selected.data,
  data: state.data.data,
});

export default connect(
  mapStateToProps,
  null,
)(SpecialMealInvoice);
