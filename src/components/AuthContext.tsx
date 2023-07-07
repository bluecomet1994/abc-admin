import React from 'react';
import auth from '@/config/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/store/actions/user.action';

export const AuthContext = React.createContext({});

export const AuthProvider = (props: any) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [pending, setPending] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      dispatch(setUserData(user));
      setPending(false);
    })
  }, [dispatch]);

  if(pending) {
    return (
      <div className='flex justify-center items-center w-full h-full'>
        <CircularProgress size={72} />
      </div>
    )
  } else {
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {props.children}
      </AuthContext.Provider>
    )
  }
}