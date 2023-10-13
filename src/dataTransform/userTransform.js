import formatDate from "./dateTransform";

const createUserColumns = (obj, project) => {
  let result = Object.keys(obj).map((id) => {
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
  if (project && project.includes("god"))
    result = result.map((item) => {
      if (!item) return null;
      if (
        (item && item.id === "dateEnd") ||
        item.id === "isFree" ||
        item.id === "statusTariff"
      )
        return null;
      return item;
    });
  return result;
};
const userTransform = (ar) => {
  return ar.map((user) => {
    let result = {
      ...user,
      isReplay: user.isReplay ? "Совершен" : "Не совершен",
      isFree: user.isFree ? "Активна" : "Не активирована  ",
      statusTariff: user.statusTariff ? "Активен" : "Не активен",
      status: user.status ? "Да" : "Нет",
      dateEnd: user.usersKeys
        ? user.usersKeys[0]
          ? formatDate(user.usersKeys[0].dateEnd)
          : "N/A"
        : "N/A",
    };
    return result;
  });
};
export { createUserColumns, userTransform };
