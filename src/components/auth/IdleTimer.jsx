// IdleTimer.tsx
import { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useIdleTimer } from 'react-idle-timer';
import Constants from '@/utils/Constant';
import { isWhiteListed } from '@/utils/Helpers';
import { isTokenExpired, getTokenFromStorage } from '@/utils/common/tokenUtils';

const IDLE_TIMEOUT = Constants.IDLE_TIMEOUT;
const TOKEN_CHECK_INTERVAL = 60000; // Check every minute

export const IdleTimer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const tokenCheckInterval = useRef(null);
  
  const isWhitelistedRoute = isWhiteListed(pathname);
  
  const handleLogout = useCallback(() => {
    localStorage.clear();
    sessionStorage.clear();
    router.push('/auth/login');
  }, [router]);

  const handleUserIdle = useCallback(() => {
    handleLogout();
  }, [handleLogout]);

  const checkTokenExpiration = useCallback(() => {
    if (isWhitelistedRoute) return;
    
    const token = getTokenFromStorage();
    if (isTokenExpired(token)) {
      console.log('Token expired, logging out user');
      handleLogout();
    }
  }, [isWhitelistedRoute, handleLogout]);

  const { getLastActiveTime, reset } = useIdleTimer({
    timeout: IDLE_TIMEOUT,
    onIdle: handleUserIdle,
    debounce: 500,
    startOnMount: true,
    disabled: isWhitelistedRoute,
  });

  // Check token expiration on route changes
  useEffect(() => {
    if (isWhitelistedRoute) {
      reset();
      if (tokenCheckInterval.current) {
        clearInterval(tokenCheckInterval.current);
      }
    } else {
      getLastActiveTime();
      checkTokenExpiration();
    }
  }, [pathname, isWhitelistedRoute, reset, getLastActiveTime, checkTokenExpiration]);

  // Set up periodic token expiration checks
  useEffect(() => {
    if (!isWhitelistedRoute) {
      tokenCheckInterval.current = setInterval(checkTokenExpiration, TOKEN_CHECK_INTERVAL);
      
      return () => {
        if (tokenCheckInterval.current) {
          clearInterval(tokenCheckInterval.current);
        }
      };
    }
  }, [isWhitelistedRoute, checkTokenExpiration]);

  return null;
};
