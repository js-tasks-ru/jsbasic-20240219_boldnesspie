function factorial(n) {
  let value = 1;

  while(n) {
    value *= n;
    n--;
  };

  return value;
}