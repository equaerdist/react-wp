import formatDate from "./dateTransform";

const createUserColumns = (obj) => {
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
      case "isReplay":
        return { id, label: "Повторный платеж", sort: id };
      case "isFree":
        return { id, label: "Тестовая подписка", sort: id };
      case "statusTariff":
        return { id, label: "Статус тарифа", sort: id };
      case "status":
        return { id, label: "Активен", sort: id };
      case "createdAt":
        return { id, label: "Зарегистрирован", sort: id };
      case "dateEnd":
        return { id, label: "Дата окончания тарифа", sort: "usersKeys." + id };
      default:
        return null;
    }
  });
};
const userTransform = (ar) => {
  return ar.map((user) => {
    let result = {
      ...user,
      isReplay: user.isReplay ? "Совершен" : "Не совершен",
      isFree: user.isFree ? "Активна" : "Не активирована  ",
      statusTariff: user.statusTariff ? "Активен" : "Не активен",
      status: user.status ? "Да" : "Нет",
      dateEnd: user.usersKeys ? formatDate(user.usersKeys.dateEnd) : "N/A",
    };
    return result;
  });
};
export { createUserColumns, userTransform };
