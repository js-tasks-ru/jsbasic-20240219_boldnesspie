function sumSalary(salaries) {
  let totalSum = 0;

  for(let salary in salaries) {
    if (Number.isFinite(salaries[salary])) totalSum += salaries[salary];
  }

  return totalSum;
}