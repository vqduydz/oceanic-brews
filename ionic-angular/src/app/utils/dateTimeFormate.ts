const dateTimeFormate = (value: Date) => {
  const time = new Date(value);

  return (
    time.getFullYear() +
    '-' +
    (() => {
      if (time.getMonth() > 9) return time.getMonth() + 1;
      else return `0${time.getMonth() + 1}`;
    })() +
    '-' +
    (() => {
      if (time.getDate() > 9) return time.getDate();
      else return `0${time.getDate()}`;
    })() +
    ' ' +
    (() => {
      if (time.getHours() > 9) return time.getHours();
      else return `0${time.getHours()}`;
    })() +
    ':' +
    (() => {
      if (time.getMinutes() > 9) return time.getMinutes();
      else return `0${time.getMinutes()}`;
    })() +
    ':' +
    (() => {
      if (time.getSeconds() > 9) return time.getSeconds();
      else return `0${time.getSeconds()}`;
    })()
  );
};

export default dateTimeFormate;
