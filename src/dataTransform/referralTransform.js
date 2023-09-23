const createReferralColumns = (obj) => {
  return Object.keys(obj).map((id) => {
    switch (id) {
      case "id":
        return { id, label: "Id", sort: id };
      case "username":
        return { id, label: "Username", sort: id };
      case "firstName":
        return { id, label: "Имя", sort: id };
      case "lastName":
        return { id, label: "Фамилия", sort: id };
      case "isFree":
        return { id, label: "Тестовый период", sort: id };
      case "statusTariff":
        return { id, label: "Статус тарифа", sort: id };
      case "status":
        return { id, label: "Активен", sort: id };
      case "createdAt":
        return { id, label: "Зарегистрирован", sort: id };
      case "active":
        return { id, label: "Активные", sort: id };
      case "notActive":
        return { id, label: "Неактивные", sort: id };
      default:
        return null;
    }
  });
};
const referralTransform = (a) => {
  return a.map((ref) => {
    let result = {
      ...ref,
      status: ref.status ? "Да" : "Нет",
      isFree: ref.isFree ? "Активирован" : "Неактивен",
      statusTariff: ref.statusTariff ? "Активен" : "Неактивен",
    };
    return result;
  });
};
export { createReferralColumns, referralTransform };
