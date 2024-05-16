import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});

/* This function adds new room to database */
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();

  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const response = await api.post("/rooms/add/newroom", formData);
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}

/* This function get all room types from database */
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/roomtype");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room type");
  }
}

/* This function gets all rooms from the database*/
export async function getAllRooms() {
  try {
    const result = await api.get("/rooms/allrooms");
    return result.data;
  } catch (error) {
    throw new Error("Error fetching rooms");
  }
}

/* This function delete a room by id */
export async function deleteRoom(roomId) {
  try {
    const result = await api.delete(`/rooms/deleteroom/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting room ${error.message}`);
  }
}

/** This function is to update room */
export async function updateRoom(roomId, roomData) {
  const formData = new FormData();

  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);

  try {
    const response = await api.put(`/rooms/update/${roomId}`, formData);
    return response;
  } catch (error) {
    throw new Error(`Error updating room ${roomId}`);
  }
}

/** This function gets a room by the id*/
export async function getRoomById(roomId) {
  try {
    const result = await api.get(`/rooms/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching romm ${roomId}`);
  }
}

/** This function saves a new booking to the database */
export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(
      `/bookings/room/${roomId}/booking`,
      booking
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error booking room : ${error.message}`);
    }
  }
}

/** This function get all bookings from the database */
export async function getAllBookings() {
  try {
    const result = await api.get("/bookings/allbookings");
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching booking :${error.message}`);
  }
}

/** This function get booking by the confirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error find booking : ${error.message}`);
    }
  }
}

/** This function cancels booking */
export async function cancelBooking(bookingId) {
  try {
    const result = await api.delete(`/bookings//booking/${bookingId}/delete`);
    return result.data;
  } catch (error) {
    throw new Error(`Error cancelling booking :${error.message}`);
  }
}
