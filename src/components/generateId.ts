export const generateId = (id1: number | any, id2: number | any) => {
  if (id1 > id2) {
    return id1 + id2;
  } else {
    return id2 + id1;
  }
};
