import { QueryDocumentSnapshot, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { Container, CircularProgress, Button } from '@mui/material';
import ListCard from '@/components/ListCard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChecklistType } from '@/utils/data';
import { app } from "@/config/firebase";
import { getApplications } from "@/store/actions/application.action";
import { STATUS_TEXT } from "@/utils/enums";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({user}) => user);
  const { checklist, links } = useSelector(({application}) => application);
  const fireStore = getFirestore(app);

  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(STATUS_TEXT.PENDING);

  useEffect(() => {
    setIsLoading(true);

    if(!currentUser) {
      router.push('/auth/login');
    } else {
      getDocs(query(collection(fireStore, 'applications'), where('status', '==', status)))
        .then(({ docs }) => {
          dispatch(getApplications(docs));
          setIsLoading(false);
        });
    }
  }, [dispatch, fireStore, currentUser, router, status]);

  return isLoading ? (
    <div className='flex justify-center items-center w-full h-full'>
      <CircularProgress size={72} />
    </div>
  ) : (
    <Container maxWidth="xl" className='flex flex-col h-full p-8 overflow-auto'>
      <div className="w-full text-center">
        <Button
          color="warning"
          variant="outlined"
          className="w-24 m-1"
          onClick={() => setStatus(STATUS_TEXT.PENDING)}
        >
          PENDING
        </Button>
        
        <Button
          color="success"
          variant="outlined"
          className="w-24 m-1"
          onClick={() => setStatus(STATUS_TEXT.SUCCESS)}
        >
          PASSED
        </Button>
        
        <Button
          color="error"
          variant="outlined"
          className="w-24 m-1"
          onClick={() => setStatus(STATUS_TEXT.FAILED)}
        >
          FAILED
        </Button>
      </div>
      {
        checklist.length > 0 ?
          checklist.map((list: QueryDocumentSnapshot, index: number) => (
            <ListCard key={index} data={list} listStatus={status} href={links[0]} />
          ))
          :
          <h1 className="text-center text-3xl my-8">There is no data.</h1>
      }
    </Container>
  )
}