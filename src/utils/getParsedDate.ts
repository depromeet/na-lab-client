interface ParsedDate {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
}

const getParsedDate = (dateString: string): ParsedDate => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error('잘못된 날짜 문자열입니다.');
  }

  return {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
    day: date.getDate().toString().padStart(2, '0'),
    hour: date.getHours().toString().padStart(2, '0'),
    minute: date.getMinutes().toString().padStart(2, '0'),
    second: date.getSeconds().toString().padStart(2, '0'),
  };
};

export default getParsedDate;
