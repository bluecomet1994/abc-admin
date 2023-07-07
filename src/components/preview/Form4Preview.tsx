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

const Form4Preview = ({ detail, id }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const fireStore = getFirestore(app);
  const docRef = doc(fireStore, 'applications', id);

  const qaData = {
    circle: [
      {
        question: "1. The Clientele Funeral Plans can provide cover for non-South African citizens (1)",
        answer: [
          "True",
          "False"
        ],
        value: detail.application.circle[0]
      },
      {
        question: "2. What plan types are available on the Clientèle Funeral Plans? (4)",
        answer: [
          "Member & Family with Extended family (max 10 extended members)",
          "Member & Family with Extended family (max 8 extended members)",
          "Member & Extended Family (max 8 extended members)",
          "Member & Family (max 3 children)",
          "Member & Spouse",
          "Member only"
        ],
        value: detail.application.circle[1]
      },
      {
        question: "3. Premiums on the Clientèle Funeral Plans will increase by 10% and the Death benefit amount by 6%? (1)",
        answer: [
          "True",
          "False"
        ],
        value: detail.application.circle[2]
      },
      {
        question: "4. Death due to an accident is covered from… (1)",
        answer: [
          "Receipt of the first premium",
          "Once the customer signs the application form",
          "Once the customer receives a welcome SMS from Clientèle",
          "Once the customer leaves the kiosk"
        ],
        value: detail.application.circle[3]
      },
      {
        question: "5. There is a Premium Payback Benefit on the Clientèle Funeral Dignity Plan? (1)",
        answer: [
          "True",
          "False"
        ],
        value: detail.application.circle[4]
      },
      {
        question: "6. Death due to natural causes for the main member, spouse and children are covered as follows (1)",
        answer: [
          "Month 0-6 = no cover; month 7onward = 100% of the cover",
          "There is a full 12-month waiting period",
          "There is no waiting period for death due to natural causes",
          "Pre-existing conditions are excluded"
        ],
        value: detail.application.circle[5]
      },
      {
        question: "7. Should a customer increase the cover level at a later stage, then (1)",
        answer: [
          "There will be no waiting period applicable",
          "There will be a new waiting period for the full cover (existing plus increased portion)",
          "There will be a waiting period for the increased portion only",
          "The policy will lapse"
        ],
        value: detail.application.circle[6]
      },
      {
        question: "8. On the Clientèle Funeral Plan, what is the entry age for the Main Insured Life? (1)",
        answer: [
          "18 - 81 (Current Age)",
          "18 - 80 (Current Age)",
          "18 - 71 (Current Age)",
          "18 - 70 (Current Age)"
        ],
        value: detail.application.circle[7]
      },
      {
        question: "9. On the Clientèle Funeral Plan, what is the entry age for the Extended Family Members? (1)",
        answer: [
          "0 - 81 (Current Age)",
          "0 - 80 (Current Age)",
          "0 - 71 (Current Age)",
          "0 - 70 (Current Age)"
        ],
        value: detail.application.circle[8]
      },
      {
        question: "10. What is the exclusion on the Clientèle Funeral Dignity Plan? (1)",
        answer: [
          "Pre - Existing medical conditions & 24 months suicide",
          "Violent criminal matter",
          "24 months suicide",
          "Pre-Existing medical conditions"
        ],
        value: detail.application.circle[9]
      },
      {
        question: "11. Under which of the following events can the Clientèle Funeral Dignity Plan be terminated? (3)",
        answer: [
          "During underwriting",
          "Death of both adults",
          "If we did not receive the DOC",
          "Cancellation due to the policy terms and conditions",
          "Notice provided by the policyholder"
        ],
        value: detail.application.circle[10]
      },
      {
        question: "12. The Grocery, Unveiling and Transport benefits are… (1)",
        answer: [
          "Inclusive of the cover amount",
          "Paid over and above the cover amount"
        ],
        value: detail.application.circle[11]
      },
      {
        question: "13. Select the 2 correct options applicable for the Grocery Benefit: (2)",
        answer: [
          "The benefit can only be paid by a voucher",
          "The benefit can be paid either by cash or vouchers",
          "The beneficiary will receive R2 000 of this benefit as a once off or R1000 per month for 2 months",
          "The beneficiary will receive R3 000 of this benefit as a once off or R1000 per month for 3 months"
        ],
        value: detail.application.circle[12]
      },
      {
        question: "14. What is the cash amount for the Unveiling benefit? (1)",
        answer: [
          "R1 000",
          "R2 000",
          "R3 000",
          "R4 000"
        ],
        value: detail.application.circle[13]
      },
      {
        question: "15. On the Clientèle Funeral Plan, how will the nominated beneficiary receive the Airtime Benefit amount? (1)",
        answer: [
          "Airtime will be transferred to pre-paid cell phones only",
          "Airtime will be transferred to contract cell phones only",
          "Airtime will be transferred to pre-paid or contract cell phones",
          "Only Vodacom networks"
        ],
        value: detail.application.circle[14]
      },
      {
        question: "16. What is annual increase applicable to the airtime benefit on the Ultimate Dignity Plan? (1)",
        answer: [
          "10%",
          "6%",
          "20%",
          "11%"
        ],
        value: detail.application.circle[15]
      },
      {
        question: "17. Name 3 EASA benefits on the funeral plan (3)",
        answer: [
          "24 Hour Funeral Assist helpline",
          "Repatriation of mortal remains",
          "Free bus service to graveyard",
          "Funeral concierge services",
          "EASA Discounted partners",
          "R10 000 road accident cover"
        ],
        value: detail.application.circle[16]
      },
    ],
    qa: [
      {
        question: "18. In your own words explain the premium payback benefit (in full) on the Ultimate Funeral Plan. (2)",
        answer: detail.application.qa[0]
      },
      {
        question: "19. In your own word explain the rules for covering children under the Funeral Policy. Include the age brackets and maximum cover amounts per age bracket (2)",
        answer: detail.application.qa[1]
      },
      {
        question: "20. In your own words, explain the consequences if you submit fraudulent sales. (1)",
        answer: detail.application.qa[2]
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

export default Form4Preview;