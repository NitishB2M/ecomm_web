import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Envelope, Eye, Lock, User } from 'phosphor-react';
import { Label, Input, InputIcon, Button } from 'keep-react';
import Link from 'next/link';
import { useAuth } from '@/utils/context/AuthContext';
import FormikForm from '../shared/FormikForm';
import { Formik } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import ResetPassword from './ForgetPassword';

const Login = () => {
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    username: ''
  })
  const [resetDialogOpen, setResetDialogOpen] = useState(true);
  const { user, register } = useAuth();
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().optional(),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address'
      ),

    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[@$!%*?&]/, 'Password must contain at least one special character (@$!%*?&)'),

    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const onSubmit = async(values) => {
    const payload = { 
      first_name: values.first_name, 
      last_name: values.last_name, 
      email: values.email, 
      password: values.password
    }
    const result = await register(payload);
    if (result.status) {
      toast.success(result.message);
      router.push('/profile');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      {
        user && (
          <div className="flex justify-center items-center min_h_screen2 bg-background dark:bg-dark-surface">
            {!resetDialogOpen ? (
              <div className="p-8 w-full max-w-lg mt-2 bg-dark-box/20 dark:bg-box/10 backdrop-blur-md shadow-md rounded-md">
                <div className="text-center mb-4 uppercase font-bold text-2xl text-primary dark:text-dark-primary">
                  Register
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ errors, touched, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className='flex gap-4'>
                        <FormikForm.Input
                          name="first_name"
                          type="text"
                          placeholder="Enter first name"
                          label="First Name"
                          icon={<User size={19} color="#AFBACA" />}
                          iconPosition="left"
                        />

                        <FormikForm.Input
                          name="last_name"
                          type="text"
                          placeholder="Enter last name"
                          label="Last Name"
                          icon={<User size={19} color="#AFBACA" />}
                          iconPosition="left"
                        />
                      </div>

                      <FormikForm.Input
                        name="email"
                        type="text"
                        placeholder="Enter email"
                        label="Email"
                        icon={<User size={19} color="#AFBACA" />}
                        iconPosition="left"
                      />

                      <div className='flex gap-4'>
                        <FormikForm.Input
                          name="password"
                          type="password"
                          placeholder="Enter password"
                          label="Password"
                          icon={<Lock size={20} color="#AFBACA" />}
                          iconPosition="left"
                        />

                        <FormikForm.Input
                          name="confirm_password"
                          type="password"
                          placeholder="Re-enter password"
                          label="Confirm Password"
                          icon={<Eye size={20} color="#AFBACA" />}
                          iconPosition="left"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-surface text-primary dark:text-background hover:bg-surface/80 dark:bg-dark-info dark:hover:bg-dark-info/80 text-md uppercase tracking-wider w-full py-2 rounded-md  font-semibold transition-500 border border-primary dark:border-dark-info/60"
                      >
                        Register
                      </button>

                      <div className="mt-4 flex justify-between items-center">
                        <button
                          type="button"
                          onClick={() => setResetDialogOpen(true)}
                          className="text-primary dark:text-dark-primary"
                        >
                          Forgot Password?
                        </button>
                        <Link href="/auth/login" className="text-primary dark:text-dark-primary">
                          Login
                        </Link>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            ) : (
              <ResetPassword setResetDialogOpen={setResetDialogOpen} />
            )}
          </div>
        )}
    </>
  );
};

export default Login;
