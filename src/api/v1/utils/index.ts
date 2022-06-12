export const removeProperties = (queryString: any) => {
  const queryObj = { ...queryString };
  const excludedFields = ["page", "sort", "limit"];
  excludedFields.forEach((el) => delete queryObj[el]);
  let queryStr = JSON.stringify(queryObj);
  return JSON.parse(queryStr);
};
