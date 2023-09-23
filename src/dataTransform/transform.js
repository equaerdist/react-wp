const walletTransform = (walletReport) => {
  let result = JSON.parse(JSON.stringify(walletReport));
  for (let item in walletReport) {
    result[
      item
    ] = `RUB: ${walletReport[item].rub}\nUSDT: ${walletReport[item].usdt}
    DEL: ${walletReport[item].del}\nTON: ${walletReport[item].ton}`;
  }
  return result;
};
export default walletTransform;
