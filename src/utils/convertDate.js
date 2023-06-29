function convertDate(_date) {
  const date = new Date(_date);
  return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
}

export default convertDate;
