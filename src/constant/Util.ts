export const formatDate = (dateString: any) => {
  const dateTime = dateString.split("T")[0];
  const [year, month, day] = dateTime.split("-");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = `${parseInt(day)} ${
    months[parseInt(month) - 1]
  } ${year}`;
  return formattedDate;
};

export const getTokenExpiry = () => {
  let currentTime = new Date();
  let expiry = process.env.TOKEN_EXPIRY_TIME
    ? process.env.TOKEN_EXPIRY_TIME
    : 7200000;
  let newTime = new Date(
    currentTime.getTime() + Number.parseInt(expiry.toString())
  );
  return newTime;
};
