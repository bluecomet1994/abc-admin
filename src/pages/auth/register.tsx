import Head from "next/head";
import Link from "next/link";
import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, TextField, Button, Typography, CircularProgress } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import auth from "@/config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export interface RegisterForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirm: string;
}

export default function Register() {
  const [isLoading, setIsLoading] = React.useState(false);

  const validationSchema = yup.object().shape({
    firstname: yup.string().required('This field is required.'),
    lastname: yup.string().required('This field is required.'),
    email: yup.string().required('This field is required.').email('Email is invalid.'),
    password: yup.string().required('This field is required.').min(6, 'Password must be at least 6 characters.').max(30, 'Password is too long'),
    confirm: yup.string().oneOf([yup.ref('password')], 'Passwords must match.')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const router = useRouter();

  function onSubmit(data: any) {
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(userCredential => {
        const user = userCredential.user;
        setIsLoading(false);
        reset();

        updateProfile(user, {
          displayName: `${data.firstname} ${data.lastname}`
        }).then(() => {
          router.push('/');

          Swal.fire({
            toast: true,
            position: 'top-right',
            icon: 'success',
            text: 'Successfully registered.',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000
          })
        })

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
        <title>Register</title>
      </Head>

      <div className="flex justify-center items-center w-full h-screen bg-teal-400">
        <Card className="flex flex-col w-96 px-8 py-12 fadeup">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold text-2xl text-center mb-4 text-teal-600">
              <AccountCircleIcon color="primary" fontSize="large" />&nbsp;Sign up
            </h1>

            <TextField
              {...register('firstname')}
              label="First Name"
              variant="standard"
              className="mt-4"
              helperText={errors.firstname?.message}
              error={errors.firstname?.message ? true : false}
              required
            />
            <TextField
              {...register('lastname')}
              label="Last Name"
              variant="standard"
              className="mt-2"
              helperText={errors.lastname?.message}
              error={errors.lastname?.message ? true : false}
              required
            />
            <TextField
              {...register('email')}
              label="Email Address"
              variant="standard"
              className="mt-2"
              helperText={errors.email?.message}
              error={errors.email?.message ? true : false}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="standard"
              className="mt-2"
              {...register('password')}
              helperText={errors.password?.message}
              error={errors.password?.message ? true : false}
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="standard"
              className="mt-2"
              {...register('confirm')}
              helperText={errors.confirm?.message}
              error={errors.confirm?.message ? true : false}
              required
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              className="h-12 bg-teal-500 mt-8"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {
                isLoading ?
                  <CircularProgress color="inherit" size={24} />
                  :
                  <Typography className="font-bold text-lg">Sign up</Typography>
              }
            </Button>
          </form>

          <Link
            href={'/auth/login'}
            className="text-center mt-4 text-teal-600 underline"
          >
            Already have an account? Sign in
          </Link>

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