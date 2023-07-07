import * as yup from 'yup';

const form5ValidationSchema = yup.object().shape({
  name: yup.string(),
  id: yup.string(),
  area: yup.string(),
  trainer: yup.string(),
  table1: yup.string(),
  table2: yup.string(),
  table3: yup.string(),
  table4: yup.string(),
  table5: yup.string(),
  table6: yup.string(),
  qa1: yup.string(),
  qa2: yup.string(),
  qa3: yup.string(),
  qa4: yup.string(),
  qa5: yup.string(),
  qa6: yup.string(),
  qa7: yup.string(),
  qa8: yup.string(),
  qa9: yup.string(),
  qa10: yup.string(),
  qa11: yup.string(),
  qa12: yup.string()
});

export default form5ValidationSchema;