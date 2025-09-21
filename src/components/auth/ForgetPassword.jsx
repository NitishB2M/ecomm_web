"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik } from 'formik';
import FormikForm from '../shared/FormikForm';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '@/utils/context/AuthContext';
import { Envelope } from 'phosphor-react';
import Link from 'next/link';

const ResetPassword = ({setResetDialogOpen}) => {
  const initialValues = {
    email: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address'
      ),
  });

  const { requestPasswordReset } = useAuth();
  const router = useRouter();

  const handleResetPassword = async (values) => {
    const result = await requestPasswordReset(values.email);
    if (result.success) {
      const link = result.resetLink;
      setResetDialogOpen(true);
      if (!link) {
        toast.error('Password reset link not found');
        return;
      }
      setTimeout(() => {
        setResetDialogOpen(false);
        window.open(link, '_blank');
      }, 3000);
    } else {
      console.error(result.error || 'Failed to reset password');
    }
  };

  return (
    <div className="p-8 w-full max-w-md mt-2 bg-dark-box/20 dark:bg-box/10 backdrop-blur-md shadow-md rounded-md">
      <div className="text-center mb-4 uppercase font-bold text-2xl text-primary dark:text-dark-primary">
        Reset Password
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleResetPassword}
      >
        {({ errors, touched, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* <FormikForm.Input
              name="username"
              type="text"
              placeholder="Enter username"
              label="Username"
              icon={<User size={19} color="#AFBACA" />}
              iconPosition="left"
            /> */}
            <FormikForm.Input
              name="email"
              type="email"
              placeholder="Enter email"
              label="Email"
              icon={<Envelope size={19} color="#AFBACA" />}
              iconPosition="left"
            />
            <button
              type="submit"
              className="bg-surface text-primary dark:text-background hover:bg-surface/80 dark:bg-dark-info dark:hover:bg-dark-info/80 text-md uppercase tracking-wider w-full py-2 rounded-md  font-semibold transition-500 border border-primary dark:border-dark-info/60"
            >
              Reset Password
            </button>
            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                onClick={(prev) => setResetDialogOpen(!prev)}
                className="text-primary dark:text-dark-primary"
              >
                Register
              </button>
              <Link href="/auth/login" className="text-primary dark:text-dark-primary">
                Login
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default ResetPassword