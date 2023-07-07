import * as yup from 'yup';

const form8ValidationSchema = yup.object().shape({
  name: yup.string(),
  date: yup.string(),
  signature: yup.string(),
  number: yup.string(),
  team: yup.string(),
  id: yup.string()
});

export default form8ValidationSchema;