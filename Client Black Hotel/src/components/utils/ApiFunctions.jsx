import axios from "axios";

export const api = axios.create({
    baseURL:"http://localhost:9192"
})



/* This function adds new room to database */
export async function addRoom(photo, roomType,roomPrice){
    const formData = new FormData();

    formData.append("photo",photo);
    formData.append("roomType",roomType);
    formData.append("roomPrice",roomPrice);

    const response = await api.post("/rooms/add/newroom",formData);
        if(response.status === 201) {
            return true;
        }else{
            return false;
        }
}


/* This function get all room types from database */
export async function getRoomTypes(){
    try {
        const response = await api.get("/rooms/roomtype");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching room type")
    }
}
