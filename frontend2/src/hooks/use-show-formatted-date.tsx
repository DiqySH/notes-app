const useShowFormattedDate = () => {
  const showFormattedDate = (date: string | number | Date) => {
    const options = {
      year: "numeric",
      month: "long",
      weekday: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(
      "id-ID",
      options as Intl.DateTimeFormatOptions
    );
  };
  return { showFormattedDate };
};

export default useShowFormattedDate;
