const walletTransform = (walletReport, project, isWallet) => {
  let result = JSON.parse(JSON.stringify(walletReport));
  console.log(project);
  if (project === "god_eyes" && !isWallet) {
    for (let item in walletReport) {
      result[item] = `USDT: ${walletReport[item].usdt}`;
    }
  } else {
    if (project === "god_eyes")
      for (let item in walletReport) {
        if (item !== "all") {
          result[item] = `USDT: ${walletReport[item].usdt}`;
        } else {
          result[
            item
          ] = `USDT: ${walletReport[item].usdt}\nTRX: ${walletReport[item].trx}
          DEL: ${walletReport[item].del}\nTON: ${walletReport[item].ton}\nBNB: ${walletReport[item].bnb}`;
        }
      }
    else {
      for (let item in walletReport) {
        result[
          item
        ] = `RUB: ${walletReport[item].rub}\nTRX: ${walletReport[item].trx}
        DEL: ${walletReport[item].del}\nTON: ${walletReport[item].ton}\nBNB: ${walletReport[item].bnb}`;
      }
    }
  }
  return result;
};
export default walletTransform;
