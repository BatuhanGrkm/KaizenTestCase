//YARDIMCI FONKSİYONLAR

export const stripHtmlTags = (str: string) => str.replace(/<[^>]*>?/gm, '');
export const calculateRemainingDays = (endDate: string) => {
    const parseDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split(".").map(Number);
        return new Date(year, month - 1, day).getTime();
      };
  
      const timeDifference = parseDate(endDate) - Date.now();
      return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}