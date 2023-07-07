import {
  Container,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Chip,
  Paper,
  CircularProgress
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { STATUS_TEXT } from '@/utils/enums';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { app } from '@/config/firebase';

const Form3Preview = ({ detail, id }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const fireStore = getFirestore(app);
  const docRef = doc(fireStore, 'applications', id);

  const qaData = {
    circle: [
      {
        question: "1. Who is the market conduct Regulator of Financial Institutions? (1)",
        answer: [
          "The Reserve Bank",
          "The Financial Sector Conduct Authority",
          "The Compliance Officer",
          "The Financial Intelligence Centre"
        ],
        value: detail.application.circle[0]
      },
      {
        question: "2. Three other Key Role-players in the Financial Sector are (1)",
        answer: [
          "Compliance Officer; Key Individual, FAIS Ombud",
          "Key Individual; Clients; QA Team",
          "Telecommunications; VeriCredit; DebiCheck",
          "FSCA; FIC; Regional Manager"
        ],
        value: detail.application.circle[1]
      },
      {
        question: "3. Two principles of Treating Customers Fairly are (1)",
        answer: [
          "Clients can dispute policies at the bank; Clients must cancel in the 30-day cooling off period",
          "Fair treatment of customers is central to the culture of FSP; Disclosures must be clear & customers must understand the disclosures",
          "Clients must take the policy and the Rewards program; FSP's must send the policy documents to clients withing 60 days of the sale",
          "Clients can complain to Clientèle; Financial services providers must be online all the time"
        ],
        value: detail.application.circle[2]
      },
      {
        question: "4. When does a representative need to work under FAIS supervision? (1)",
        answer: [
          "When he/she needs to obtain more experience on the products he/she is selling",
          "When the representative provides advice to clients",
          "When the representative does not make his/her performance targets",
          "When the representative does not have matric"
        ],
        value: detail.application.circle[3]
      },
      {
        question: "5. Please select the correct statement (1)",
        answer: [
          "Employment + Matric = Fit & Proper",
          "Matric + Experience = Fit & Proper",
          "Being a nice person + Honesty & Integrity = Fit & Proper",
          "Honesty & Integrity + Competence = Fit & Proper"
        ],
        value: detail.application.circle[4]
      },
      {
        question: "6. Debarment of Representatives is (1)",
        answer: [
          "When the Representatives don't meet their targets",
          "When the Representatives abscond from work",
          "When the Representative or Key Individual no longer meets the Fit and Proper criteria",
          "When the Representatives and Key Individuals pose a financial risk"
        ],
        value: detail.application.circle[5]
      },
      {
        question: "7. What is the purpose of FICA? (1)",
        answer: [
          "to combat money laundering activities and the financing of terrorist and related activities. It is aimed at identifying suspicious transactions",
          "To stop criminals from gaining access to the FSCA computer systems",
          "To regulate the way Financial institutions administer claims",
          "To assist clients with complaints and disputes in the Financial Services Industry"
        ],
        value: detail.application.circle[6]
      },
    ],
    qa: [
      {
        question: "8. In your role and conduct as a Representative you will be required to do certain things and behave in a certain manner when dealing with clients. Name three things you must always do as a representative.",
        answer: detail.application.qa[0]
      },
      {
        question: "9. What does FAIS stand for?",
        answer: detail.application.qa[1]
      },
      {
        question: "10. In your own words explain what it means to work under supervision",
        answer: detail.application.qa[2]
      },
      {
        question: "11. In your own words explain Intermediary Scripted Services.",
        answer: detail.application.qa[3]
      },
      {
        question: "12. What are the consequences if you commit fraud?",
        answer: detail.application.qa[4]
      },
      {
        question: "13. If you were a client, how would you want to be treated by a person selling you an insurance policy?",
        answer: detail.application.qa[5]
      }
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
        <div className='flex flex-col md:flex-row w-full'>
          <TextField
            label="Learners Name"
            color='primary'
            variant="outlined"
            value={detail.application.userinfo.name}
            className='w-full my-1 md:m-2'
          disabled />
          <TextField
            label="Learners ID"
            color='primary'
            variant="outlined"
            value={detail.application.userinfo.id}
            className='w-full my-1 md:m-2'
          disabled />
        </div>

        <div className='flex flex-col md:flex-row w-full'>
          <TextField
            label="Area"
            color='primary'
            variant="outlined"
            value={detail.application.userinfo.area}
            className='w-full my-1 md:m-2'
          disabled />

          <TextField
            label="Trainer"
            color='primary'
            variant="outlined"
            value={detail.application.userinfo.trainer}
            className='w-full my-1 md:m-2'
          disabled />
        </div>

        <TextField
          label="Date"
          color='primary'
          variant="outlined"
          value={detail.application.userinfo.date}
          className='w-full my-1 md:m-2'
        disabled />

        <br />

        <div className='w-full font-semibold px-2 py-8'>
          <h1>Circle the correct answer(s).</h1>

          {
            qaData.circle.map((item: any, index: number) => (
              <FormControl key={index} className='w-full mx-4 my-4'>
                <FormLabel id="matric">
                  {item.question}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={item.value}
                  className='flex w-full justify-between px-8'
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

        <div className='w-full font-semibold px-2 py-8'>
          <h1>Answer the questions.</h1>

          {
            qaData.qa.map((item: any, index: number) => (
              <TextField
                key={index}
                label={item.question}
                value={item.answer}
                color='primary'
                variant='outlined'
                className='w-full my-4'
                rows={5}
                multiline
              disabled />
            ))
          }
        </div>

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

export default Form3Preview;