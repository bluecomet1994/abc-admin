import { app } from '@/config/firebase';
import { getApplications } from '@/store/actions/application.action';
import { STATUS_TEXT } from '@/utils/enums';
import { Paper, Button } from '@mui/material';
import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ListCard(props: any) {
  const data = props.data.data();
  const href = props.href;
  const documentId = props.data.id;
  const router = useRouter();
  const status = props.listStatus;
  const fireStore = getFirestore(app);
  const dispatch = useDispatch();

  const updateData = (status: string) => {
    const docRef = doc(fireStore, 'applications', documentId);
    updateDoc(docRef, {status})
      .then(() => {
        getDocs(query(collection(fireStore, 'applications'), where('status', '==', props.listStatus)))
        .then(({ docs }) => {
          dispatch(getApplications(docs));
        });
      }).catch(error => {
        console.log(error);
      })
  }

  return (
    <Paper className='my-3'>
      <div className='relative flex flex-col md:flex-row md:justify-between w-full p-6 bg-slate-50 cursor-pointer transition-all hover:bg-slate-200'>
        <span className={`absolute top-0 left-0 w-1 h-full bg-${data.status.color}`} />

        <div>
          <h1 className='font-bold text-xl'>{data.title}</h1>
          <p className='normal-case text-left'>{data.email}</p>
        </div>

        <div className='flex items-center font-sans'>
          <Button
            color='info'
            variant='contained'
            className='w-24 bg-blue-500 mx-1'
            onClick={() => router.push(href)}
          >
            Preview
          </Button>
          
          <Button
            color='success'
            variant='contained'
            className='w-24 bg-green-500 mx-1'
            onClick={() => updateData(STATUS_TEXT.SUCCESS)}
            disabled={status===STATUS_TEXT.SUCCESS}
          >
            Accept
          </Button>

          <Button
            color='error'
            variant='contained'
            className='w-24 bg-red-500 mx-1'
            onClick={() => updateData(STATUS_TEXT.FAILED)}
            disabled={status===STATUS_TEXT.FAILED}
          >
            Reject
          </Button>
        </div>
      </div>
    </Paper>
  )
}