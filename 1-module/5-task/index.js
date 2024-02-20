function truncate(str, maxlength) {

  // Чтобы не хардкодить в самом slice, заранее выставляем правильную длинну строки
  maxlength -= 1;

  return str.length > maxlength ? str.slice(0, maxlength) + '…' : str;
}
