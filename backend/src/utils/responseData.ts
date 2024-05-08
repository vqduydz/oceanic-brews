const responseData = (
  status: number,
  message: string | null,
  error: any | null,
  data: any | null,
  imgPath?: string
) => {
  if (error != null && error instanceof Error) {
    const response = {
      status: status,
      message: error.message,
      errors: error,
      imgPath,
      data: null,
    };

    return response;
  }

  const res = {
    status,
    message,
    errors: error,
    imgPath,
    data: data,
  };

  return res;
};

export default responseData;
