export const changeDate = (date) => {
  const dt = new Date(date);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = dt.toLocaleDateString("en-US", options);
  return formattedDate; // Output: "May 25, 2023"
};

export const howMuchDaysLeft = (startDateStr, dueDateStr) => {
  const startDate = new Date(startDateStr);
  const dueDate = new Date(dueDateStr);

  // Calculate the difference in milliseconds between the two dates
  const timeDiff = dueDate.getTime() - startDate.getTime();

  // Calculate the number of days left
  let daysLeft = timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 3600 * 24)) : 0;

  if (daysLeft >= 7 && daysLeft < 30) {
    const weeks = Math.floor(daysLeft / 7);
    return `${weeks} weeks left`;
  } else if (daysLeft >= 30) {
    const month = Math.floor(daysLeft / 30);
    return `${month} months left`;
  } else {

    if (daysLeft === 0){
        return `passed ${-(daysLeft)} Days`
    } return `${daysLeft} Days left`;
  }
};

export const getCurrentDateFormat = () => {
  const currentDate = new Date();
  const options = {
    month: "long",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  return formattedDate;
};
