import api from "../../../app/api";

export const getCategories = async () => {
  const response = await api.get("/V1/Category/getCategories");
  console.log("getCategories response:", response.data); // Log the response data
  return response.data;
};

export const addCategory = async (categoryData) => {
  const response = await api.post("/V1/Category/addCategory", categoryData);
  return response.data;
};

export const getSubCategories = async () => {
  const response = await api.get("/V1/Category/getSubCategories");
  return response.data;
};

export const addSubCategory = async (subCategoryData) => {
  const response = await api.post(
    "/V1/Category/addSubCategory",
    subCategoryData,
  );
  return response.data;
};
