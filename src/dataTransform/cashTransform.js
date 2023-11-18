import formatDate from "./dateTransform";
const cashTranformGiven = (data, isRequest) => {
  return data.map((singleNote) => {
    let temp = {
      ...singleNote,
      ...singleNote.user,
      id: singleNote.id,
      userId: singleNote.user.id,
      createAt: formatDate(singleNote.createAt),
      paidAt: formatDate(singleNote.paidAt),
    };
    delete temp.user;
    delete temp.isReplay;
    delete temp.status;
    delete temp.isFree;
    delete temp.createdAt;
    delete temp.statusTariff;
    delete temp.lastName;
    if (!isRequest) delete temp.statusPay;
    delete temp.username;
    delete temp.paymentMethod;
    delete temp.userId;
    delete temp.lastName;
    return temp;
  });
};
const createColumnsForCashGiven = (obj, width = 0) => {
  const minWidth = width / Object.keys(obj).length;
  return Object.keys(obj).map((id) => {
    console.log(id);
    switch (id) {
      case "createAt":
        return { id, label: "Дата создания", minWidth, sort: id };
      case "currency":
        return { id, label: "Валюта", minWidth, sort: id };
      /*   case "firstName":
        return { id, label: "Первое имя", minWidth, sort: "user." + id }; */
      //   case "username":
      //     return { id, label: "Имя пользователя", minWidth, sort: "user." + id };
      case "paidAt":
        return { id, label: "Дата выплаты", minWidth, sort: id };
      case "price":
        return { id, label: "Сумма", minWidth, sort: id };
      case "statusPay":
        return { id, label: "Одобрен", minWidth, sort: id };
      case "description":
        return { id, label: "Описание", sort: id };
      default:
        return null;
      //   case "paymentMethod":
      //     return { id, label: "Тип платежа", minWidth, sort: id };
      // case "userId":
      //   return { id, label: "Id пользователя", minWidth, sort: id };
      // case "id":
      //   return { id, label: "id", minWidth, sort: id };
      //   case "lastName":
      //     return { id, label: "Последнее имя", minWidth, sort: "user." + id };
    }
  });
};
export { cashTranformGiven, createColumnsForCashGiven };
