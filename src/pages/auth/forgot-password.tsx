import Head from "next/head";
import Link from "next/link";
import React from "react";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { Card, TextField, Checkbox, Button, Typography, CircularProgress } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "@/config/firebase";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);
  const [resent, setResent] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const validationSchema = yup.object().shape({
    email: yup.string().required('This field is required.')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data: any) {
    setIsLoading(true);

    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setIsLoading(false);
        setIsSent(true);
        setEmail(data.email);
      });
  }

  function resentLink() {
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        setResent(true);
      })
  }

  return (
    <>
      <Head>
        <title>Recover Password</title>
      </Head>

      <div className="flex justify-center items-center w-full h-screen bg-teal-400">
        <Card className="flex flex-col w-96 px-8 py-12 fadeup">
          <h1 className="font-bold text-2xl text-center mb-4 text-teal-600">
            Recover Password
          </h1>

          {
            isSent ?
              <div className="text-center">
                <h1 className="font-bold text-center text-xl">Please check your inbox.</h1>
                <div className="mt-4">
                  <p className="text-teal-600">Did not get the link?</p>
                  {
                    resent ?
                      <p className="h-10 mt-2 text-teal-700">
                        Resent!
                      </p>
                      :
                      <Button
                        color="primary"
                        variant="contained"
                        className="font-bold w-40 h-10 mt-2 bg-teal-500"
                        onClick={resentLink}
                      >
                        {
                        isLoading ?
                          <CircularProgress color="inherit" size={20} />
                          :
                          <Typography className="font-bold">Resend Link</Typography>
                        }
                      </Button>
                  }
                </div>
              </div>
              :
              <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-center">Please enter your email address.</h1>
                
                <TextField
                  label="Email Address"
                  variant="standard"
                  {...register('email')}
                  className="mt-4"
                  helperText={errors.email?.message}
                  error={errors.email?.message ? true : false}
                  required
                />
    
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  className="h-12 bg-teal-500 font-bold text-lg mt-8 mb-4"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isLoading}
                >
                  {
                    isLoading ?
                      <CircularProgress color="inherit" size={24} />
                      :
                      <Typography className="font-bold text-lg">Send</Typography>
                  }
                </Button>
              </form>
          }

          <Typography className="text-center mt-6">
            Copyright@
            <Link href={'/'} className="text-center text-teal-600 underline">Affordable</Link>&nbsp;
            2023
          </Typography>
        </Card>
      </div>
    </>
  )
}