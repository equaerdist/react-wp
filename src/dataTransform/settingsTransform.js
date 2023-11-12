const createSettingColumns = (obj) => {
  return Object.keys(obj).map((item) => {
    switch (item) {
      case "name":
        return { id: item, label: "Настройка", sort: item };
      case "nameUser":
        return { id: item, label: "Настройка для пользователя", sort: item };
      case "value":
        return { id: item, label: "Значение", sort: item };
      default:
        return null;
    }
  });
};
export { createSettingColumns };
