function getMinMax(str) {
  let filteredNums = str.split(' ').filter(num => isFinite(num))

  return {
    min: Math.min(...filteredNums),
    max: Math.max(...filteredNums)
  };
}
