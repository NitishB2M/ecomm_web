import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Envelope, Lock, User } from 'phosphor-react';
import { Label, Input, InputIcon, Button } from 'keep-react';
import Link from 'next/link';
import { useAuth } from '@/utils/context/AuthContext';
import FormikForm from '../shared/FormikForm';
import { Formik } from 'formik';
import Constants from '@/utils/Constant';

const Login = () => {
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    username: ''
  })
  const [error, setError] = useState({ message: '', details: [] });
  const [successMessage, setSuccessMessage] = useState('');
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const { user, login, requestPasswordReset } = useAuth();
  const router = useRouter();

  const validationSchema = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'password is required';
    } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(values.password)) {
      if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'Password must be between 8 and 20 characters';
        return errors;
      } 
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
    return errors;
  }

  const onSubmit = async(values) => {
    const { email, password, username } = values;
    const result = await login(email, password, username);
    if (result.status) {
      router.push(Constants.AUTH_ROUTES.PROFILE);
      return;
    } else {
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setError({ message: '', details: [] });
    setSuccessMessage('');
    if (!email) {
      setError({ message: 'Please enter your email address', details: [] });
      return;
    }

    const result = await requestPasswordReset(email);
    if (result.success) {
      setSuccessMessage(result.message);
      const link = result.resetLink;
      setResetDialogOpen(true);
      if (!link) {
        setError({
          message: 'Password reset link not found',
          details: []
        });
        return;
      }
      setTimeout(() => {
        setResetDialogOpen(false);
        window.open(link, '_blank');
      }, 3000);
    } else {
      setError({
        message: result.error,
        details: result.errorDetails || []
      });
    }
  };

  return (
    <>
      {
        user && Object.keys(user).length > 1 ? router.push('/profile') : (
          <div className="flex justify-center items-center min_h_screen2 bg-background dark:bg-dark-surface">
            {!resetDialogOpen ? (
              <div className="p-8 w-full max-w-md mt-2 bg-dark-box/20 dark:bg-box/10 backdrop-blur-md shadow-md rounded-md">
                <div className="text-center mb-4 uppercase font-bold text-2xl text-primary dark:text-dark-primary">
                  Login
                </div>
                <Formik
                  initialValues={initialValues}
                  validate={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ errors, touched, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <FormikForm.Input
                        name="email"
                        type="text"
                        placeholder="Enter email"
                        label="Email"
                        icon={<User size={19} color="#AFBACA" />}
                        iconPosition="left"
                      />

                      <FormikForm.Input
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        label="Password"
                        icon={<Lock size={20} color="#AFBACA" />}
                        iconPosition="left"
                      />

                      <button
                        type="submit"
                        className="bg-surface text-primary dark:text-background hover:bg-surface/80 dark:bg-dark-info dark:hover:bg-dark-info/80 text-md uppercase tracking-wider w-full py-2 rounded-md  font-semibold transition-500 border border-primary dark:border-dark-info/60"
                      >
                        Login
                      </button>

                      <div className="mt-4 flex justify-between items-center">
                        <button
                          type="button"
                          onClick={() => setResetDialogOpen(true)}
                          className="text-primary dark:text-dark-primary"
                        >
                          Forgot Password?
                        </button>
                        <Link href="/auth/register" className="text-primary dark:text-dark-primary">
                          Sign up
                        </Link>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            ) : (
              <div className="p-8 w-full max-w-md mt-2 bg-dark-box/20 dark:bg-box/10 backdrop-blur-md shadow-md rounded-md">
                <div className="text-center mb-4 uppercase font-bold text-2xl text-primary dark:text-dark-primary">
                  Reset Password
                </div>
                <Formik
                  initialValues={initialValues}
                  validate={validationSchema}
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
                          Login
                        </button>
                        <Link href={Constants.PUBLIC_ROUTES.REGISTER} className="text-primary dark:text-dark-primary">
                          Sign up
                        </Link>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        )}
    </>
  );
};

export default Login;
