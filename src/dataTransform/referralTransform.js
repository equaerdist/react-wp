import formatDate from "./dateTransform";
const createReferralColumns = (obj, project) => {
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
      case "isFree":
        return { id, label: "Тестовый период", sort: id };
      case "statusTariff":
        return { id, label: "Статус тарифа", sort: id };
      /*  case "status":
        return { id, label: "Активен", sort: id }; */
      case "createdAt":
        return { id, label: "Зарегистрирован", sort: id };
      case "active":
        return { id, label: "Активные", sort: id };
      case "notActive":
        return { id, label: "Неактивные", sort: id };
      case "dateEnd":
        return { id, label: "Дата окончания тарифа", sort: id };
      default:
        return null;
    }
  });
  if (project && project.includes("god"))
    result = result.map((item) => {
      if (!item) return null;
      if (
        item &&
        (item.id === "isFree" ||
          item.id === "dateEnd" ||
          item.id === "statusTariff")
      )
        return null;
      return item;
    });
  return result;
};
const referralTransform = (a) => {
  return a.map((ref) => {
    let result = {
      ...ref,
      isFree: ref.isFree ? "Активирован" : "Неактивен",
      statusTariff: ref.statusTariff ? "Активен" : "Неактивен",
      dateEnd: ref.usersKeys
        ? ref.usersKeys[0]
          ? formatDate(ref.usersKeys[0].dateEnd)
          : "N/A"
        : "N/A",
    };
    return result;
  });
};
export { createReferralColumns, referralTransform };
