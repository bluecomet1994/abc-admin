import * as yup from 'yup';

const form6ValidationSchema = yup.object().shape({
  dearname: yup.string(),
  dearidentify: yup.string(),
  date1: yup.string(),
  date2: yup.string(),
  signame: yup.string(),
  sigidentify: yup.string(),
  signature: yup.string(),
  date: yup.string()
});

export default form6ValidationSchema;