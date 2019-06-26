import * as Yup from 'yup';

export const bankAccountValidation = Yup.object({
  accountHolder: Yup.string('')
    .max(12, '12글자 아래로 입력해주세요.')
    .required(),
  bankName: Yup.string('')
    .max(12, '12글자 아래로 입력해주세요.')
    .required(),
  accountNo: Yup.string()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .integer('숫수만 입력하세요.'),
});
