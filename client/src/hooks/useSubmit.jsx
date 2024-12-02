import React from 'react'

/**
 * Handle the forms submit
 * @param apiFn
 * @param successCallback
 * @param failureCallback
 * @returns {{isLoading: boolean, onSubmit: ((function(*): Promise<void>)|*)}}
 */
const useSubmit = ({apiFn, successCallback, failureCallback}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const fb = new FormData(event.target);
      const data = Object.fromEntries(fb.entries());
      const res = await apiFn(data);
      successCallback(res)
    } catch (error) {
      failureCallback(error.message)
    } finally {
      setIsLoading(false);
    }
  }

  return{
    onSubmit,
    isLoading,
  }
}

export default useSubmit;
