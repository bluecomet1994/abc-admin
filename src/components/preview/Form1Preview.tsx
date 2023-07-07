import React, { useState } from 'react';
import Link from 'next/link';
import {
  Container,
  Paper,
  Chip,
  TextField,
  Checkbox,
  CircularProgress,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';
import { useRouter } from 'next/router';
import { STATUS_TEXT } from '@/utils/enums';
import { deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '@/config/firebase';

const Form1Preview = ({ detail, id }: any) => {
  const router = useRouter();
  const [status, setStatus] = useState(detail.status);
  const [isLoading, setIsLoading] = useState(false);
  const fireStore = getFirestore(app);
  const docRef = doc(fireStore, 'applications', id);

  const updateData = (status: string) => {
    setIsLoading(true);

    updateDoc(docRef, { status })
      .then(() => {
        router.push('/');
        setIsLoading(false);
      }).catch(error => {
        console.log(error);
        setIsLoading(false);
      })
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
            value={detail.application.name}
            className='w-full my-2 md:m-2'
            disabled
          />
          <TextField
            label="Contact Number"
            color='primary'
            variant="outlined"
            value={detail.application.number}
            placeholder='+0 000 000 0000'
            className='w-full my-2 md:m-2'
            disabled
          />
        </div>

        <div className='flex flex-wrap md:flex-nowrap w-full'>
          <TextField
            label="ID Number"
            color='primary'
            variant="outlined"
            value={detail.application.id}
            className='w-full my-2 md:m-2'
            disabled
          />
          <TextField
            label="Area applied for"
            color='primary'
            variant="outlined"
            value={detail.application.area}
            className='w-full my-2 md:m-2'
            disabled
          />
        </div>

        <div className='flex flex-wrap md:flex-nowrap w-full'>
          <TextField
            label="Interviewer"
            color='primary'
            variant="outlined"
            value={detail.application.interviewer}
            className='w-full my-2 md:m-2'
            disabled
          />

          <TextField
            label="Date"
            color='primary'
            variant="outlined"
            value={detail.application.date1}
            className='w-full my-2 md:m-2'
            disabled
          />
        </div>

        <br />

        <FormControl className='mx-4 my-2'>
          <FormLabel id="matric">
            Passed Matric / Grade 12?
          </FormLabel>
          <RadioGroup
            aria-labelledby="matric"
            row
            value={detail.application.qualify1}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" disabled />
            <FormControlLabel value="no" control={<Radio />} label="No" disabled />
          </RadioGroup>
        </FormControl>

        <FormControl className='mx-4 my-2'>
          <FormLabel id="matric">
            Do you have a criminal record?
          </FormLabel>
          <RadioGroup
            aria-labelledby="matric"
            value={detail.application.qualify2}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" disabled />
            <FormControlLabel value="no" control={<Radio />} label="No" disabled />
          </RadioGroup>
        </FormControl>

        <FormControl className='mx-4 my-2'>
          <FormLabel id="matric">
            Are you over the age of 22?
          </FormLabel>
          <RadioGroup
            aria-labelledby="matric"
            value={detail.application.qualify3}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" disabled />
            <FormControlLabel value="no" control={<Radio />} label="No" disabled />
          </RadioGroup>
        </FormControl>

        <FormControl className='mx-4 my-2'>
          <FormLabel id="matric">
            Are you a South Africa citizen?
          </FormLabel>
          <RadioGroup
            aria-labelledby="matric"
            value={detail.application.qualify4}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" disabled />
            <FormControlLabel value="no" control={<Radio />} label="No" disabled />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Where do you stay?"
          color='primary'
          variant="outlined"
          value={detail.application.qualify5}
          className='w-full my-2'
          disabled
        />

        <div className="my-8">
          <h1 className="font-bold text-lg underline">Interview Observations & Questions</h1>

          <div className='flex flex-col md:flex-row items-center w-full'>
            <div className='w-full'>
              <FormControl className='flex flex-row items-center m-2'>
                <FormLabel id="matric" className='w-24 mr-8'>
                  Confidence
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={detail.application.observation1}
                  row
                >
                  <FormControlLabel value="good" control={<Radio />} label="Good" disabled />
                  <FormControlLabel value="fair" control={<Radio />} label="Fair" disabled />
                  <FormControlLabel value="poor" control={<Radio />} label="Poor" disabled />
                </RadioGroup>
              </FormControl>
              <FormControl className='flex flex-row items-center m-2'>
                <FormLabel id="matric" className='w-24 mr-8'>
                  Speaking
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={detail.application.observation2}
                  row
                >
                  <FormControlLabel value="good" control={<Radio />} label="Good" disabled />
                  <FormControlLabel value="fair" control={<Radio />} label="Fair" disabled />
                  <FormControlLabel value="poor" control={<Radio />} label="Poor" disabled />
                </RadioGroup>
              </FormControl>

              <FormControl className='flex flex-row items-center m-2'>
                <FormLabel id="matric" className='w-24 mr-8'>
                  Reading
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={detail.application.observation3}
                  row
                >
                  <FormControlLabel value="good" control={<Radio />} label="Good" disabled />
                  <FormControlLabel value="fair" control={<Radio />} label="Fair" disabled />
                  <FormControlLabel value="poor" control={<Radio />} label="Poor" disabled />
                </RadioGroup>
              </FormControl>

              <FormControl className='flex flex-row items-center m-2'>
                <FormLabel id="matric" className='w-24 mr-8'>
                  Listening
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={detail.application.observation4}
                  row
                >
                  <FormControlLabel value="good" control={<Radio />} label="Good" disabled />
                  <FormControlLabel value="fair" control={<Radio />} label="Fair" disabled />
                  <FormControlLabel value="poor" control={<Radio />} label="Poor" disabled />
                </RadioGroup>
              </FormControl>

              <FormControl className='flex flex-row items-center m-2'>
                <FormLabel id="matric" className='w-24 mr-8'>
                  Sales Ability
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={detail.application.observation5}
                  row
                >
                  <FormControlLabel value="good" control={<Radio />} label="Good" disabled />
                  <FormControlLabel value="fair" control={<Radio />} label="Fair" disabled />
                  <FormControlLabel value="poor" control={<Radio />} label="Poor" disabled />
                </RadioGroup>
              </FormControl>

              <FormControl className='flex flex-row items-center m-2'>
                <FormLabel id="matric" className='w-24 mr-8'>
                  Attitude
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={detail.application.observation6}
                  row
                >
                  <FormControlLabel value="good" control={<Radio />} label="Good" disabled />
                  <FormControlLabel value="fair" control={<Radio />} label="Fair" disabled />
                  <FormControlLabel value="poor" control={<Radio />} label="Poor" disabled />
                </RadioGroup>
              </FormControl>

              <FormControl className='flex flex-row items-center m-2'>
                <FormLabel id="matric" className='w-24 mr-8'>
                  Overall
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={detail.application.observation7}
                  row
                >
                  <FormControlLabel value="good" control={<Radio />} label="Good" disabled />
                  <FormControlLabel value="fair" control={<Radio />} label="Fair" disabled />
                  <FormControlLabel value="poor" control={<Radio />} label="Poor" disabled />
                </RadioGroup>
              </FormControl>
            </div>

            <TextField
              label="Comments"
              color='primary'
              variant="outlined"
              value={detail.application.comment}
              className='w-full m-2'
              placeholder="Type here..."
              rows={10}
              multiline
              disabled
            />
          </div>
        </div>

        <TextField
          label="Tell me about your previous work experience"
          color='primary'
          variant="outlined"
          value={detail.application.observation8}
          className='w-full my-4'
          placeholder="Type here..."
          rows={3}
          multiline
          disabled
        />

        <TextField
          label="What motivated you to apply for this position?"
          color='primary'
          variant="outlined"
          value={detail.application.observation9}
          className='w-full my-4'
          placeholder="Type here..."
          rows={3}
          multiline
          disabled
        />

        <TextField
          label="What do you understand about the position you've applied for?"
          color='primary'
          variant="outlined"
          value={detail.application.observation10}
          className='w-full my-4'
          placeholder="Type here..."
          rows={3}
          multiline
          disabled
        />

        <TextField
          label="What would you say are the  for this position?"
          color='primary'
          variant="outlined"
          value={detail.application.observation11}
          className='w-full my-4'
          placeholder="Type here..."
          rows={3}
          multiline
          disabled
        />

        <TextField
          label="General Questions"
          color='primary'
          variant="outlined"
          value={detail.application.observation12}
          className='w-full my-4'
          placeholder="Type here..."
          rows={3}
          multiline
          disabled
        />

        <div className='w-full my-8'>
          <h1 className="font-bold text-lg underline">Interview Checklist & Outcome</h1>

          <div className='flex flex-col md:flex-row w-full'>
            <div className='flex flex-col w-full'>
              <div className="flex justify-between items-center w-full">
                <p>Salary, Commission structure & Pro-rata</p>
                <Checkbox checked={detail.application.check1} disabled />
              </div>
              <div className="flex justify-between items-center w-full">
                <p>Working hours & training hours</p>
                <Checkbox checked={detail.application.check2} disabled />
              </div>
              <div className="flex justify-between items-center w-full">
                <p>CV, bank details, Certified copy of ID, Matric</p>
                <Checkbox checked={detail.application.check3} disabled />
              </div>
              <div className="flex justify-between items-center w-full">
                <p>If successful, training date confirmed?</p>
                <Checkbox checked={detail.application.check4} disabled />
              </div>
            </div>

            <div className='flex flex-col justify-center items-center w-2/3'>
              <h1 className="text-xl">Outcome</h1>

              <RadioGroup
                aria-labelledby="matric"
                value={detail.application.outcome}
                row
              >
                <FormControlLabel value="accept" control={<Radio />} label="Accept" disabled />
                <FormControlLabel value="decline" control={<Radio />} label="Decline" disabled />
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="flex justify-start items-center">
          <Checkbox checked={detail.application.confirm} disabled />
          <p>Do you give ABC permission to do: Reference, Criminal, ID and Qualifications check?</p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center w-full my-4">
          <TextField
            label="Date"
            color='primary'
            variant="outlined"
            value={detail.application.date2}
            className='w-full my-2 md:m-2'
            disabled
          />

          <TextField
            label="Interviewer Sign"
            color='primary'
            variant="outlined"
            value={detail.application.interviewerSign}
            className='w-full my-2 md:m-2'
            disabled
          />

          <TextField
            label="Candidate Sign"
            color='primary'
            variant="outlined"
            value={detail.application.candidateSign}
            className='w-full my-2 md:m-2'
            disabled
          />
        </div>

        <div className='w-full text-center mb-8'>
          <Button
            color='success'
            variant='contained'
            className='w-32 h-12 font-bold text-lg bg-green-500 mx-2 my-6'
            onClick={() => updateData(STATUS_TEXT.SUCCESS)}
            disabled={isLoading}
          >
            Accept
          </Button>

          <Button
            color='error'
            variant='contained'
            className='w-32 h-12 font-bold text-lg bg-red-500 m-2 my-6'
            onClick={() => updateData(STATUS_TEXT.FAILED)}
            disabled={isLoading}
          >
            Reject
          </Button>
        </div>
      </Paper>
    </Container>
  )
}

export default Form1Preview;