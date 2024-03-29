import { Api } from "./apiRequest";

export const GetUsers = async () => {
  try {
    const response = await Api.get("/");
    if (response.status !== 200) {
      throw new Error("Error");
    } else {
      // return response.data;
      const filteredata = response.data.filter((user) => user.id > 100);
      return filteredata;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export const GetSingleUser = async (userId) => {
  try {
    const response = await Api.get(`/${userId}`);
    if (response.status !== 200) {
      throw new Error("Error");
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
