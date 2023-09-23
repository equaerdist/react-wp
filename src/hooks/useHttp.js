import { useCallback } from "react";
const useHttp = () => {
  const request = useCallback(
    async (
      url,
      body = null,
      method = "GET",
      headers = { "Content-type": "application/json" }
    ) => {
      headers = {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      if (body) body = JSON.stringify(body);

      const response = await fetch(url, { headers, method, body });

      if (!response.ok) {
        if (response.status === 403) throw new Error("Неправильные данные");
        if (response.status === 401) throw new Error("Ошибка при авторизации");
        throw new Error("Failed to fetch");
      }
      if (response.status === 204) return;
      if (response.headers.get("content-length") === "0") {
        return response;
      }
      if (!response.headers.get("Content-type")?.includes("application/json"))
        return response;
      return await response.json();
    },
    []
  );
  return request;
};
export default useHttp;
