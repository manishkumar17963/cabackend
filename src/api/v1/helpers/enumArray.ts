const convertEnumToArray = (values: { [key: string]: string }) => {
  return Object.values(values);
};

export default convertEnumToArray;
