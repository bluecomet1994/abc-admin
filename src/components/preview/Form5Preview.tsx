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

const Form5Preview = ({ detail, id }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const fireStore = getFirestore(app);
  const docRef = doc(fireStore, 'applications', id);

  const qaData = {
    circle: [
      {
        question: "2. What are the entry ages for someone who would like to join this cover? (1 mark)",
        answer: [
          "16 to 51",
          "18 to 65",
          "18 to 71",
          "18 Years and older"
        ],
        value: detail.application.circle[0]
      },
      {
        question: "3. What is the waiting period on legal matters to be covered on the Legal plans? (1 mark)",
        answer: [
          "Member & Family with Extended family (max 10 extended members)",
          "Member & Family with Extended family (max 8 extended members)",
          "Member & Extended Family (max 8 extended members)",
          "Member & Family (max 3 children)",
          "Member & Spouse",
          "Member only"
        ],
        value: detail.application.circle[1]
      }
    ],
    qa: [
      {
        question: "4. Name the three types of matters the Legal Plan cover you for. (3 marks)",
        answer: detail.application.qa[0]
      },
      {
        question: "5. Explain the waiting period in your own words? (1 marks)",
        answer: detail.application.qa[1]
      },
      {
        question: "6. What is the waiting period for the Bail benefit? (1 mark)",
        answer: detail.application.qa[2]
      },
      {
        question: "7. Explain the Retrenchment Benefit? (1 mark)",
        answer: detail.application.qa[3]
      },
      {
        question: "8. If a customer has a pre-existing case/matter what would Clientèle do to assist the customer? (2 marks)",
        answer: detail.application.qa[4]
      },
      {
        question: "9. Name three exclusions or matters where the customer will not be covered. (3 marks)",
        answer: detail.application.qa[5]
      },
      {
        question: "10. If a customer gives you a scenario of a matter or case and needs you to confirm that Clientèle will cover such matter, how will you respond? (1 marks)",
        answer: detail.application.qa[6]
      },
      {
        question: "11. Explain what is Prospects of success? (1 marks)",
        answer: detail.application.qa[7]
      },
      {
        question: "12. Mr Vee says he is an independent renovations company and there are some people who hired him and have not paid him for work he has done. He wants to know if Clientele Legal can cover him to recover the money owed to him? (2 marks)",
        answer: detail.application.qa[8]
      },
      {
        question: "13. Mr Nzo and Mrs Nzo decide to get a divorce because they can't live with each other anymore. They want to know if Clientele Legal will cover them for a divorce. (2 marks)",
        answer: detail.application.qa[9]
      },
      {
        question: "14. Mrs Mzizi wants to buy a house and should this house in the future have problems with the structure that the seller didn't tell her about, would Clientele Legal cover her. (2 marks)",
        answer: detail.application.qa[10]
      },
      {
        question: "15. Chris buys a PlayStation from James for R3 500.00. He says that the James has not delivered the PlayStation and 4 months have passed. He wants to know if Clientele Legal will help him sue the seller. (2 marks)",
        answer: detail.application.qa[11]
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

        <div className='w-full my-8'>
          <h1>1. Please complete the table below (7 marks)</h1>

          <table className="w-full">
            <tbody>
              <tr className="font-bold">
                <td></td>
                <td>STANDARD LEGAL NAME</td>
                <td>CLASSIC LEGAL NAME</td>
              </tr>

              <tr>
                <td>PREMIUM</td>
                <td>8200 per month</td>
                <td>
                  <TextField
                    color="primary"
                    variant="standard"
                    className="w-full"
                    value={detail.application.table[0]}
                    disabled
                  />
                </td>
              </tr>

              <tr>
                <td>WHO IS COVERED?</td>
                <td>Main member only</td>
                <td>
                  <TextField
                    color="primary"
                    variant="standard"
                    className="w-full"
                    value={detail.application.table[1]}
                    disabled
                  />
                </td>
              </tr>

              <tr>
                <td>LIFETIME COVER</td>
                <td>R200 000 per year</td>
                <td>
                  <TextField
                    color="primary"
                    variant="standard"
                    className="w-full"
                    value={detail.application.table[2]}
                    disabled
                  />
                </td>
              </tr>

              <tr>
                <td>EXCESS</td>
                <td>3 X Premium</td>
                <td>
                  <TextField
                    color="primary"
                    variant="standard"
                    className="w-full"
                    value={detail.application.table[3]}
                    disabled
                  />
                </td>
              </tr>

              <tr>
                <td>ACCIDENTAL DEATH</td>
                <td>Not applicable on Standard Legal</td>
                <td>
                  <TextField
                    color="primary"
                    variant="standard"
                    className="w-full"
                    value={detail.application.table[4]}
                    disabled
                  />
                </td>
              </tr>

              <tr>
                <td>ADDITIONAL MEMBERS</td>
                <td colSpan={2}>
                  <TextField
                    color="primary"
                    variant="standard"
                    className="w-full"
                    value={detail.application.table[5]}
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

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
                  {item.answer.map((ans: any, index: number) => (
                    <FormControlLabel key={index} value={ans} control={<Radio />} label={ans} disabled />
                  ))}
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

export default Form5Preview;