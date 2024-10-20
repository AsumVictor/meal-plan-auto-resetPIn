const cleanData = (arr) => {
  const ids = arr.map((i) => {
    return i.IDS;
  });

  return ids;
};

module.exports = {
    cleanData
}
