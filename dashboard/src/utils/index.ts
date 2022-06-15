export const formatAxiosError = (error: any) => {
  return error.response.data && error.response.status !== 500
    ? error.response.data.message
    : "Something went wrong";
};
