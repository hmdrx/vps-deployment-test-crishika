import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showAlert } from '../redux/alert-reducer';

const useHttp = apiFunc => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const request = async (...args) => {
    setLoading(true);
    try {
      const result = await apiFunc(...args);
      setData(result.data);
    } catch (error) {
      dispatch(
        showAlert(error.response.data.message || 'something went wrong')
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    request,
  };
};

export default useHttp;
