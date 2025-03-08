import axios from "axios";

import { API_URL } from "./config"; // Import API_URL

export const fetchItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

export const getItem = async (id) => { // ✅ Ensure this function is here
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching item:", error);
  }
};

export const createItem = async (item) => {
  try {
    const response = await axios.post(API_URL, item);
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
  }
};

export const updateItem = async (id, updatedItem) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedItem);
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

export const deleteItem = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
