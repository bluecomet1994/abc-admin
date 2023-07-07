import * as yup from 'yup';

const form1ValidationSchema = yup.object().shape({
  name: yup.string(),
  phone: yup.string(),
  id: yup.string(),
  area: yup.string(),
  interviewer: yup.string(),
  qualify5: yup.string(),
  observation8: yup.string(),
  observation9: yup.string(),
  observation10: yup.string(),
  observation11: yup.string(),
  observation12: yup.string(),
  observationComment: yup.string(),
  interviewerSign: yup.string(),
  candidateSign: yup.string(),
});

export default form1ValidationSchema;