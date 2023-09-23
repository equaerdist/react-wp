const createTariffColumns = (obj) => {
  return Object.keys(obj).map((id) => {
    switch (id) {
      case "id":
        return { id, label: "Id", sort: id };
      case "tariffName":
        return { id, label: "Название", sort: id };
      case "duration":
        return { id, label: "Длительность (в днях)", sort: id };
      case "price":
        return { id, label: "Цена", sort: id };
      case "createdAt":
        return { id, label: "Создан", sort: id };
      default:
        return null;
    }
  });
};
const promoTransform = (a) => {
  return a.map((promo) => {
    let result = {
      ...promo.tariff,
      ...promo,
      status: promo.status ? "Да" : "Нет",
    };
    delete result.tariff;
    return result;
  });
};
const createPromocodeColumns = (obj) => {
  return Object.keys(obj).map((id) => {
    switch (id) {
      case "id":
        return { id, label: "Id", sort: id };
      case "valueCode":
        return { id, label: "Промокод", sort: id };
      case "tariffName":
        return { id, label: "Название тарифа", sort: "tariff." + id };
      // case "priceDel":
      //   return { id, label: "Цена (DEL)", sort: id };
      // case "priceTon":
      //   return { id, label: "Цена (TON)", sort: id };
      // case "priceUsdt":
      //   return { id, label: "Цена (USDT)", sort: id };
      // case "priceRub":
      //   return { id, label: "Цена (RUB)", sort: id };
      case "status":
        return { id, label: "Активный", sort: id };
      default:
        return null;
    }
  });
};
export { createTariffColumns, createPromocodeColumns, promoTransform };
