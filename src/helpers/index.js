export const generateIncrementalIdsFromListOfObj = (list) => {
  const lastObject = list[list.length - 1];
  const newID = (lastObject?.id ?? 0) + 1;
  return newID;
};
