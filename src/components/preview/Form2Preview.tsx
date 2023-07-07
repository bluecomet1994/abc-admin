import {
  Container,
  TextField,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Paper
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Typography } from '@mui/material';
import { STATUS_TEXT } from '@/utils/enums';
import { addDoc, collection, deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { app } from '@/config/firebase';
const Form2Preview = ({ detail, id }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const fireStore = getFirestore(app);
  const docRef = doc(fireStore, 'applications', id);

  const qaData = {
    section1: [
      {
        question: "1. Mrs. X takes out a policy on April 23rd, 2017 and pays a monthly contribution of R150.00.  Her contribution increases by R20 on the 1st of August every year. What is her monthly contribution for September 2019?",
        answer: ["R210.00", "R190.00", "R170.00", "None of these options"],
        value: detail.application.selection1[0].answer
      },
      {
        question: "2. Mrs. X takes out a policy on the 20th of February, 2017 and pays a monthly contribution of R100.00.  Her contribution increases by 10% of the original contribution amount in January every year. What will Mrs X&apos;s contribution be in September 2020?",
        answer: ["R133.00", "R140.00", "R130.00", "None of these options"],
        value: detail.application.selection1[1].answer
      },
      {
        question: "3. Mr Y takes out a policy in March 2017 with a monthly contribution of R1000.00 His monthly contribution is reduced by 10% in January 2018. What will Mr Y&apos;s contribution be in April 2018?",
        answer: ["R100.00", "R1100.00", "R900.00", "None of these options"],
        value: detail.application.selection1[2].answer
      },
      {
        question: "4. Miss Z takes out a life policy with a monthly contribution of R100.35.  She takes out additional accident cover with a monthly contribution of R15.50 and a funeral benefit of R10.00 monthly contribution. What is Miss Z's total contribution?",
        answer: ["R125.85", "R177.34", "R77.35", "None of these options"],
        value: detail.application.selection1[3].answer
      },
      {
        question: "5. Mr A takes out a savings plan with a contribution of a R1000 per month.  He then indicates that he can't afford it and wants to reduce his contribution by 25% once off.  What will his new contribution be?",
        answer: ["R250.00", "R750.00", "R800.00", "None of these options"],
        value: detail.application.selection1[4].answer
      },
      {
        question: "6. Ms X has a policy with a monthly contribution of R65.00.  She wants an additional funeral benefit with a monthly contribution of R18.25.  What is the total monthly contribution?",
        answer: ["R83.25", "R91.00", "R88.25", "None of these options"],
        value: detail.application.selection1[5].answer
      },
      {
        question: "7. Ms L has a savings plan with a monthly contribution of R128 per month.  How much will she have saved on this plan over the course of 9months, assuming there is no contribution increase?",
        answer: ["R2880.00", "R1152.00", "R1158.00", "None of these options"],
        value: detail.application.selection1[6].answer
      },
      {
        question: "8. Mr D buys a disability cover that pays out a maximum R100 000 if he is left completely disabled due to an accident. This policy however only pays 50% of the maximum benefit for the loss of one leg and 25% for an arm What is the rand value of the pay-out when he loses two legs and an arm in an accident?",
        answer: ["R125 000.00", "R750 000.00", "R100 000.00", "None of these options"],
        value: detail.application.selection1[7].answer
      },
      {
        question: "9. If Miss Z has a policy with a monthly contribution of R1000.00.  She takes out a second policy with a monthly contribution equal to 25% of the first policy.  What is the Rand value of her monthly contribution on the second policy?",
        answer: ["R250.00", "R20.00", "R1250.00", "None of these options"],
        value: detail.application.selection1[8].answer
      },
      {
        question: "10. Mr K takes out a funeral policy that covers himself and his wife for R10 000 each and his children for R5000 each. His wife and two children die in a freak accident. How much will Mr K claim on his policy?",
        answer: ["R20 000.00", "R22 000.00", "R30 000.00", "None of these options"],
        value: detail.application.selection1[9].answer
      },
    ],
    section2: {
      first: [
        {
          question: "QUESTION 1",
          answer: ["accredited", "acredited", "accredeted", "accrited", "acredited"],
          value: detail.application.selection21[0].answer
        },
        {
          question: "QUESTION 2",
          answer: ["autorised", "authorised", "athorised", "authorized", "ahtorised"],
          value: detail.application.selection21[1].answer
        },
        {
          question: "QUESTION 3",
          answer: ["compatency", "competency", "compitency", "comppetancy", "comipitncy"],
          value: detail.application.selection21[2].answer
        },
        {
          question: "QUESTION 4",
          answer: ["requirrements", "requirent", "requiriments", "requreiments", "requirements"],
          value: detail.application.selection21[3].answer
        },
        {
          question: "QUESTION 5",
          answer: ["comperisons", "comparissons", "comperissons", "comparisons", "comparrisons"],
          value: detail.application.selection21[4].answer
        },
      ],
      second: [
        {
          question: "QUESTION 6 - Verificasion",
          answer: ["Yes", "No"],
          value: detail.application.selection22[0].answer,
          correct: detail.application.selection22[0].correct
        },
        {
          question: "QUESTION 7 - Programe",
          answer: ["Yes", "No"],
          value: detail.application.selection22[1].answer,
          correct: detail.application.selection22[1].correct
        },
        {
          question: "QUESTION 8 - Financial",
          answer: ["Yes", "No"],
          value: detail.application.selection22[2].answer,
          correct: detail.application.selection22[2].correct
        },
        {
          question: "QUESTION 9 - Complience",
          answer: ["Yes", "No"],
          value: detail.application.selection22[3].answer,
          correct: detail.application.selection22[3].correct
        },
        {
          question: "QUESTION 10 - Interacction",
          answer: ["Yes", "No"],
          value: detail.application.selection22[4].answer,
          correct: detail.application.selection22[4].correct
        },
        {
          question: "QUESTION 11 - Objective",
          answer: ["Yes", "No"],
          value: detail.application.selection22[5].answer,
          correct: detail.application.selection22[5].correct
        },
        {
          question: "QUESTION 12 - Recomendation",
          answer: ["Yes", "No"],
          value: detail.application.selection22[6].answer,
          correct: detail.application.selection22[6].correct
        },
        {
          question: "QUESTION 13 - Successfully ",
          answer: ["Yes", "No"],
          value: detail.application.selection22[7].answer,
          correct: detail.application.selection22[7].correct
        },
        {
          question: "QUESTION 14 - Representative",
          answer: ["Yes", "No"],
          value: detail.application.selection22[8].answer,
          correct: detail.application.selection22[8].correct
        },
        {
          question: "QUESTION 15 - Immediately",
          answer: ["Yes", "No"],
          value: detail.application.selection22[9].answer,
          correct: detail.application.selection22[9].correct
        },
      ]
    },
    section3: [
      {
        question: "QUESTION 1 - Drive is to car, as fly is to",
        answer: ["automobile", "bird", "eagle", "plane", "truck"],
        value: detail.application.selection3[0].answer
      },
      {
        question: "QUESTION 2 - Creative is the same as",
        answer: ["sympathetic", "Heart-warming", "sentimental", "artistic", "unemotional"],
        value: detail.application.selection3[1].answer
      },
      {
        question: "QUESTION 3 - Ethical is the same as",
        answer: ["moral", "Free-spirited", "humorous", "immoral", "determined"],
        value: detail.application.selection3[2].answer
      },
      {
        question: "QUESTION 4 - Paintbrush is to artistic, as violin is to",
        answer: ["instrument", "comedy", "theatre", "musical", "songs"],
        value: detail.application.selection3[3].answer
      },
      {
        question: "QUESTION 5 - Which word is the odd one out?",
        answer: ["selling", "promoting", "servicing", "marketing", "advertising"],
        value: detail.application.selection3[4].answer
      },
    ]
  }

  const updateDocument = () => {
    if (detail.status === STATUS_TEXT.FAILED) {
      setIsLoading(true);

      deleteDoc(docRef)
        .then(() => {
          setIsLoading(false);
          router.push('/');
        }).catch(error => {
          setIsLoading(false);
          console.log(error)
        });
    } else {
      router.push('/');
    }
  }

  return (
    <Container maxWidth="xl" className="w-full h-full p-4">
      <h1 className="font-bold text-3xl text-center text-teal-500 my-8">Your Application</h1>
      <div className='flex justify-between items-center my-2'>
        <Chip label={`Date: ${detail.date}`} />
        <Chip label={detail.status} />
      </div>

      <Paper className='flex flex-col w-full'>

        <h1 className='font-bold text-xl text-center'>{detail.title}</h1>
        <div className='flex flex-wrap md:flex-nowrap w-full'>
          <TextField
            label="Name & Surname"
            color='primary'
            variant="outlined"
            value={detail.application.userinfo.name}
            className='w-full my-1 md:m-2'
            disabled />
          <TextField
            label="Contact Number"
            color='primary'
            variant="outlined"
            value={detail.application.userinfo.phone}
            placeholder='+0 000 000 0000'
            className='w-full my-1 md:m-2'
            disabled />
        </div>

        <div className='flex flex-wrap md:flex-nowrap w-full'>
          <TextField
            label="ID Number"
            color='primary'
            variant="outlined"
            value={detail.application.userinfo.id}
            className='w-full my-1 md:m-2'
            disabled />

          <TextField
            label="Date"
            color='primary'
            variant="outlined"
            value={detail.application.userinfo.date}
            className='w-full my-1 md:m-2'
            disabled />
        </div>

        <br />

        <div className='m-2'>
          <h1 className='font-semibold text-lg'>SECTION 1 - Choose the correct answer by marking the correct block with an X</h1>

          {
            qaData.section1.map((item: any, index: number) => (
              <FormControl key={index} className='mx-4 my-4'>
                <FormLabel id="matric">
                  {item.question}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={item.value}
                  onChange={item.method}
                  className='flex w-full justify-between px-8'
                  row
                >
                  <FormControlLabel value={item.answer[0]} control={<Radio />} label={item.answer[0]} disabled />
                  <FormControlLabel value={item.answer[1]} control={<Radio />} label={item.answer[1]} disabled />
                  <FormControlLabel value={item.answer[2]} control={<Radio />} label={item.answer[2]} disabled />
                  <FormControlLabel value={item.answer[3]} control={<Radio />} label={item.answer[3]} disabled />
                </RadioGroup>
              </FormControl>
            ))
          }
        </div>

        <div className='mx-2 my-16'>
          <h1 className='font-semibold text-lg'>
            SECTION 2.1 - Choose the word that is spelt correctly by marking the correct block with an X.
          </h1>

          {
            qaData.section2.first.map((item: any, index: number) => (
              <FormControl key={index} className='mx-4 my-4'>
                <FormLabel id="matric">
                  {item.question}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={item.value}
                  onChange={item.method}
                  className='flex w-full justify-between px-8'
                  row
                >
                  <FormControlLabel value={item.answer[0]} control={<Radio />} label={item.answer[0]} disabled />
                  <FormControlLabel value={item.answer[1]} control={<Radio />} label={item.answer[1]} disabled />
                  <FormControlLabel value={item.answer[2]} control={<Radio />} label={item.answer[2]} disabled />
                  <FormControlLabel value={item.answer[3]} control={<Radio />} label={item.answer[3]} disabled />
                  <FormControlLabel value={item.answer[4]} control={<Radio />} label={item.answer[4]} disabled />
                </RadioGroup>
              </FormControl>
            ))
          }
        </div>

        <div className='mx-2 my-8'>
          <h1 className='font-semibold text-lg'>
            SECTION 2.2 - Indicate if the word is spelt correctly (Yes) or if the word is spelt incorrectly (No). If the word is spelt incorrectly write the correct spelling next to it.
          </h1>

          {
            qaData.section2.second.map((item: any, index: number) => (
              <FormControl key={index} className='mx-4 my-4'>
                <FormLabel id="matric">
                  {item.question}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={item.value}
                  onChange={item.method}
                  className='w-full px-8'
                  row
                >
                  <FormControlLabel value={item.answer[0]} control={<Radio />} label={item.answer[0]} disabled />
                  <FormControlLabel value={item.answer[1]} control={<Radio />} label={item.answer[1]} disabled />
                  <TextField
                    label="If not, correct spelling"
                    color='primary'
                    variant='outlined'
                    value={item.correct}
                    disabled />
                </RadioGroup>
              </FormControl>
            ))
          }
        </div>

        <div className='mx-2 my-8'>
          <h1 className='font-semibold text-lg text-left'>
            SECTION 3 - Choose the word that has the correct association by marking the correct box with an X.
          </h1>

          {
            qaData.section3.map((item: any, index: number) => (
              <FormControl key={index} className='w-full mx-4 my-4'>
                <FormLabel id="matric">
                  {item.question}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={item.value}
                  onChange={item.method}
                  className='w-full px-8'
                  row
                >
                  <FormControlLabel value={item.answer[0]} control={<Radio />} label={item.answer[0]} disabled />
                  <FormControlLabel value={item.answer[1]} control={<Radio />} label={item.answer[1]} disabled />
                  <FormControlLabel value={item.answer[2]} control={<Radio />} label={item.answer[2]} disabled />
                  <FormControlLabel value={item.answer[3]} control={<Radio />} label={item.answer[3]} disabled />
                  <FormControlLabel value={item.answer[4]} control={<Radio />} label={item.answer[4]} disabled />
                </RadioGroup>
              </FormControl>
            ))
          }
        </div>

        <TextField
          label="Assessor Sign"
          color='primary'
          variant="outlined"
          value={detail.application.userinfo.sign}
          className='w-full'
          disabled />

        <div className='w-full text-center mb-8'>
          <Button
            color="primary"
            variant="contained"
            className='w-72 h-12 font-bold text-xl my-8 bg-teal-600'
            onClick={updateDocument}
          >
            {
              isLoading ?
                <CircularProgress size={24} />
                :
                detail.status === STATUS_TEXT.FAILED ?
                  'Delete and Resubmit'
                  :
                  'Back to the List'
            }
          </Button>
        </div>
      </Paper>
    </Container>
  )
}

export default Form2Preview;