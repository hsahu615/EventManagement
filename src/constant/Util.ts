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
