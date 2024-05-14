const responseData = (
  status: number,
  ok: boolean,
  message: string | null,
  error: any | null,
  data: any | null
) => {
  if (error != null && error instanceof Error) {
    const response = {
      status: status,
      ok,
      message: error.message,
      errors: error,
      data: null,
    };
    return response;
  }

  const res = {
    status,
    ok,
    message,
    errors: error,
    data: data,
  };
  return res;
};

export default responseData;
