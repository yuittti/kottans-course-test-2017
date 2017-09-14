export const formatDate = (strDate) => {
  let date = new Date(strDate),
      d = date.getDate(),
      m = date.getMonth() + 1,
      y = date.getFullYear();
  d = (d < 10) ? `0${d}` : `${d}`;
  m = (m < 10) ? `0${m}` : `${m}`;
  
  return `${d}.${m}.${y}`;
};

