import axios from "axios";
import { DOMAIN } from "../configs/constants";

export const getAllRooms = async () => {
  try {
    const result = await axios.get(`${DOMAIN}/get-room?id=all`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomByNumber = async (num) => {
  try {
    const result = await axios.get(`${DOMAIN}/get-room?id=${num}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const editRoom = async (num, data) => {
  try {
    const result = await axios.put(`${DOMAIN}/edit-room?id=${num}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRoom = async (num) => {
  try {
    const result = await axios.delete(`${DOMAIN}/delete-room?id=${num}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllServices = async () => {
  try {
    const result = await axios.get(`${DOMAIN}/get-service?name=all`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getService = async (name) => {
  try {
    const result = await axios.get(`${DOMAIN}/get-service?name=${name}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const editService = async (name, data) => {
  try {
    const result = await axios.put(`${DOMAIN}/edit-service?name=${name}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteService = async (name) => {
  try {
    const result = await axios.delete(`${DOMAIN}/delete-service?name=${name}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllStaffs = async () => {
  try {
    const result = await axios.get(`${DOMAIN}/get-staff?email=all`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStaff = async (email) => {
  try {
    const result = await axios.get(`${DOMAIN}/get-staff?email=${email}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteStaff = async (email) => {
  try {
    const result = await axios.delete(`${DOMAIN}/delete-staff?email=${email}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (data) => {
  try {
    const result = await axios.post(`${DOMAIN}/login`, data);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (data) => {
  try {
    const result = await axios.post(`${DOMAIN}/register`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (data) => {
  try {
    const result = await axios.put(`${DOMAIN}/edit-user`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (data) => {
  try {
    const result = await axios.put(`${DOMAIN}/change-pass`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const booking = async (data) => {
  try {
    const result = await axios.post(`${DOMAIN}/booking`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserBooking = async (id) => {
  try {
    const result = await axios.get(`${DOMAIN}/user-get-booking/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBooking = async () => {
  try {
    const result = await axios.get(`${DOMAIN}/get-all-booking`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserBooking = async (id) => {
  try {
    const result = await axios.delete(`${DOMAIN}/delete-booking/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleRequest = async (id, data) => {
  try {
    const result = await axios.put(`${DOMAIN}/handle-request/${id}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAdminBooking = async (id) => {
  try {
    const result = await axios.delete(`${DOMAIN}/admin-delete-booking/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
