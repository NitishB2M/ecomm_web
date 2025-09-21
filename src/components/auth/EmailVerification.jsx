import ApiCall from "@/utils/APICalls";
import { CURRENT_USER } from "@/utils/Helpers";
import { useProfile } from "@/utils/hooks/useProfile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const { useSearchParams, useRouter } = require("next/navigation");

const EmailVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { verifyEmail } = useProfile();
  const user = CURRENT_USER();
  const [error, setError] = useState(null);

  if (!token || token.length === 0) {
    router.push("/auth/login");
  }

  useEffect(() => {
    const verify = async () => {
      const response = await verifyEmail(token);
      console.log(response, response.status);
      if (response.status) {
        toast.success(response.message);
        if (user && user.id) {
          router.push("/");
          return;
        }
        router.push("/auth/login");
      } else {
        setTimeout(() => {
          router.push("/auth/login");
        }, 5000);
        setError(response.error);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 sm:px-6 lg:px-8 py-12 w-full max-w-md mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900">Email Verification</h2>
      {error ? 
        <p className="mt-2 text-md text-red-600">{error}</p> 
      : (
        <p className="mt-2 text-sm text-gray-600">
          Please wait while we verify your email address.
        </p>
      )}
    </div>
  );
};

export default EmailVerification;