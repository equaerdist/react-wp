const walletTransform = (walletReport) => {
  let result = JSON.parse(JSON.stringify(walletReport));
  for (let item in walletReport) {
    result[
      item
    ] = `RUB: ${walletReport[item].rub}\nTRX: ${walletReport[item].trx}
    DEL: ${walletReport[item].del}\nTON: ${walletReport[item].ton}\nBNB: ${walletReport[item].bnb}`;
  }
  return result;
};
export default walletTransform;
