import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ToastContainer, toast } from 'react-toastify';
import { errorState } from '../../recoil/errorAtom';

export const Error = () => {
  const [errorMessage, setError] = useRecoilState(errorState);

  useEffect(() => {
    if (errorMessage) {
      toast.info(errorMessage);
      setError(null); // очищаем ошибку
    }
  }, [errorMessage, setError]);

  return <ToastContainer position="bottom-right" autoClose={3000} />;
};

export default Error;
