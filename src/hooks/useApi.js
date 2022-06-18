import { useCallback, useReducer } from 'react';

const apiReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'pending' : return {
                        status: 'pending', 
                        message: '', 
                        data: null
                      };

    case 'success' : return {
                        status: payload.status, 
                        message: payload.message, 
                        data: payload.data
                      };

    case 'error'   : return {
                        status: 'error', 
                        message: payload, 
                        data: null
                      };
    
    default       : return state;
  }
}



function useApi(apiFunction) {
  const [state, dispatch] = useReducer(apiReducer, {
    status : 'pending',
    message: '',
    data : null,
  });

  const sendRequest = useCallback(
    async (data) => {
      dispatch({ type: 'pending' });

      try {
        const response = await apiFunction(data);
        dispatch({ type: 'success', payload: response });
      }
      catch (error) {
        dispatch({ type: 'error', payload: error.message });
      }
    }, [apiFunction]
  );

  return [sendRequest, state];
}

export default useApi;