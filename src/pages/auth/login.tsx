import Head from "next/head";
import Link from "next/link";
import React from "react";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Card, TextField, Checkbox, Button, Typography, CircularProgress } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import auth from "@/config/firebase";
import { useRouter } from "next/router";

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().required('This field is required.'),
    password: yup.string().required('This field is required.'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const router = useRouter();

  function onSubmit(data: any) {
    setIsLoading(true);

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        setIsLoading(false);

        router.push('/');
      }).catch(error => {
        setIsLoading(false);
        console.log(error);

        Swal.fire({
          toast: true,
          position: 'top-right',
          icon: 'error',
          text: error,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000
        })
      })
  }
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="flex justify-center items-center w-full h-screen bg-teal-400">
        <Card className="flex flex-col w-96 px-8 py-12 fadeup">
          <h1 className="font-bold text-2xl text-center mb-4 text-teal-600">
            <AccountCircleIcon color="primary" fontSize="large" />&nbsp;Sign in
          </h1>

          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email Address"
              variant="standard"
              {...register('email')}
              className="mt-4"
              helperText={errors.email?.message}
              error={errors.email?.message ? true : false}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="standard"
              {...register('password')}
              className="mt-4"
              helperText={errors.password?.message}
              error={errors.password?.message ? true : false}
              required
            />

            <div className="flex justify-between items-center my-4">
              <div>
                <Checkbox />Remember Me
              </div>
              <Link href={'/auth/forgot-password'} className="text-center text-teal-600 underline">Forget Password?</Link>
            </div>

            <Button
              color="primary"
              type="submit"
              variant="contained"
              className="h-12 bg-teal-500 font-bold text-lg"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
            {
                isLoading ?
                  <CircularProgress color="inherit" size={24} />
                  :
                  <Typography className="font-bold text-lg">Sign in</Typography>
              }
            </Button>
          </form>

          <Link href={'/auth/register'} className="text-center mt-4 text-teal-600 underline">Don&apos;t have an account? Sign up</Link>

          <Typography className="text-center mt-6">
            Copyright@
            <Link href={'/'} className="text-center mt-2 text-teal-600 underline">Affordable</Link>&nbsp;
            2023
          </Typography>
        </Card>
      </div>
    </>
  )
}