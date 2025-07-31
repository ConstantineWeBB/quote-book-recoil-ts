import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { selectError, clearError } from '../../redux/slices/errorSlice';

export const Error = () => {
    const dispatch = useDispatch()
    const errorMessage = useSelector(selectError)
    useEffect(() => {
      if (errorMessage) {
        toast.info(errorMessage);
        dispatch(clearError());
      }
    }, [errorMessage, dispatch]);

  return <ToastContainer position="bottom-right" autoClose={3000} />;
};

export default Error;
