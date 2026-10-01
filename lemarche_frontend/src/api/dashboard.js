import API from "./axios";
// récupérer dashboard global
export const getGlobalDashboard =
  async () => {
  try {
    const response =
      await API.get(
        "/dashboard/global/"
      );
    return response.data;
  } catch (error) {
    console.log(
      "DASHBOARD ERROR:",
      error.response?.data
    );
    return null;
  }
};