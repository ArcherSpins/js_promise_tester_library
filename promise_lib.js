function useState(initialState = null) {
  let state = initialState;

  const forceUpdate = (newState) => {
    state = newState;
  };

  return [() => state, forceUpdate];
} 

function useFetch(url = '') {
  const [getResponse, setResponse] = useState(null);
  const [getError, setError] = useState(null);
  const [isLoading, toggleLoading] = useState(false);
  const [data, setDataFetch] = useState({ method: 'GET' });
  const [params, setParams] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(url + params(), data());
      const result = await response.json();
      setResponse(result);
      setError(error);

      return result;
    } catch (error) {
      setError(error);

      return error;
    } finally {
      toggleLoading(false);
    }
  }

  const doFetch = async (params = '', data = {}) => {
    setParams(params);
    setDataFetch(data);
    toggleLoading(true);
    return await fetchData();
  }
  
  return [{ getResponse, getError, isLoading }, doFetch];
}
