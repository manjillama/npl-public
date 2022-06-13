export const formatAxiosError = (error: any) => {
  return error.response.data
    ? error.response.data.message
    : "Something went wrong";
};
