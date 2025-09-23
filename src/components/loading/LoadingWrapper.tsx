import Loader from './Loader';
import ErrorAlert from '../alerts/ErrorAlert';
import { type ReactNode } from 'react';

type ApiError = { data?: { msg?: string }; message?: string };

type LoadingWrapperProps = {
  isLoading: boolean;
  isError: boolean;
  error?: string | Error | ApiError | null;
  children: ReactNode;
};

const LoadingWrapper = ({
  isLoading,
  isError,
  error,
  children,
}: LoadingWrapperProps) => {
  if (isLoading) return <Loader />;

  if (isError) {
    const message =
      typeof error === 'string'
        ? error
        : error instanceof Error
        ? error.message
        : error?.data?.msg || error?.message || 'Something went wrong';

    return <ErrorAlert message={message} />;
  }

  return <>{children}</>;
};

export default LoadingWrapper;
