const elemInArrayById = (elem, array) => {
  let result = 1;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === elem.id) {
      result = 0;
      break;
    }
  }
  return result;
};
export default elemInArrayById;
