import API from './API'
export async function makeApiCall(method, url, data = null) {
  // Initial status
  let status = "pending";
  let responseData = null;
  let error = null;

  try {
    // Making the API call
    const response = await API({
      method: method,
      url: url,
      data: data,
    });

    // Setting status to success
    status = "success";
    // Getting response data
    responseData = response.data;
    console.log(response.status);
  } catch (err) {

    // Setting status to error and capturing error details
    status = "error";
    error = err;
  }

  // Returning an object with status, data, and error details
  return {
    status: status,
    data: responseData,
    error: error,
  };
}
