import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Envelope, Lock, User } from 'phosphor-react';
import { Label, Input, InputIcon, Button } from 'keep-react';
import Link from 'next/link';
import { useAuth } from '@/utils/context/AuthContext';
import FormikForm from '../shared/FormikForm';
import { Formik } from 'formik';

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
      router.push('/profile');
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
          <div className="flex justify-center items-center min-h-[80vh] bg-background dark:bg-dark-surface">
            {!resetDialogOpen ? (
              <div className="p-8 w-full max-w-md text-ctaText mt-2 !bg-boxBg/10 dark:text-dark-ctaText dark:bg-dark-boxBg">
                <div className="text-center !mb-6 font-bold text-primary dark:text-dark-primary">
                  Login to Your Account
                </div>
                <Formik
                  initialValues={initialValues}
                  validate={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ errors, touched, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                        className="bg-surface hover:bg-surface/80 dark:bg-dark-primary dark:hover:bg-dark-primary/80 text-md uppercase tracking-wider w-full py-2 rounded-md dark:text-dark-surface font-semibold transition-all duration-700 ease-in-out"
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
                        <Link href="/auth/signup" className="text-primary dark:text-dark-primary">
                          Sign up
                        </Link>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            ) : (
              <div className="p-8 w-full max-w-md text-l-ctaText mt-2 !bg-l-boxBg/10 dark:text-d-ctaText dark:bg-d-boxBg">
                <div className="text-center !mb-6 font-bold text-l-primary dark:text-d-primary">
                  Reset Password
                </div>
                {error.message && (
                  <div severity="error" className="mb-4">
                    {error.message}
                    {error.details.length > 0 && (
                      <ul className="mt-2 list-disc list-inside">
                        {error.details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                {successMessage && (
                  <div severity="success" className="mb-4">
                    {successMessage}
                  </div>
                )}
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <fieldset className="space-y-1">
                    <Label htmlFor="username">Username*</Label>
                    <div className="relative">
                      <Input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        className="ps-11 placeholder:text-l-primary/80"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                      />
                      <InputIcon>
                        <User size={19} color="#AFBACA" />
                      </InputIcon>
                    </div>
                  </fieldset>
                  <fieldset className="space-y-1">
                    <Label htmlFor="email">Email*</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        className="ps-11 placeholder:text-l-primary/80"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                      <InputIcon>
                        <Envelope size={19} color="#AFBACA" />
                      </InputIcon>
                    </div>
                  </fieldset>
                  <Button
                    type="submit"
                    variant="contained"
                    className="bg-l-boxBg hover:bg-l-boxBg/80 dark:bg-d-boxBg dark:hover:bg-d-boxBg/80 w-full"
                  >
                    Reset Password
                  </Button>
                </form>

                <div className="mt-4 flex justify-between items-center">
                  <Button
                    onClick={(prev) => setResetDialogOpen(!prev)}
                    className="text-info hover:text-info/80 dark:text-dark-info dark:hover:text-dark-info/80"
                  >
                    Login
                  </Button>
                  <Link href="/auth/signup" className="text-c-info hover:text-c-info/80">
                    Sign up
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
    </>
  );
};

export default Login;
