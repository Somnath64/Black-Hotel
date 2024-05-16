import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getRoomById, updateRoom } from '../utils/ApiFunctions';

const EditRoom = () => {

    const [room,setRoom] = useState({
        photo:null,
        roomType:"",
        roomPrice:""
    })
    
    const [imagePreview,setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const {roomId} = useParams()

    const handleImageChange = (e) =>{    
        const selectedImage = e.target.files[0];
        console.log(selectedImage);
        setRoom({...room,photo:selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (e) =>{
        const {name,value} = e.target;
        setRoom({...room,[name]:value});
    }

    useEffect(()=>{
        const fetchRoom = async () =>{
            try {
                const roomData = await getRoomById(roomId);
                setRoom(roomData);
                setImagePreview(roomData.photo);
            } catch (error) {
                console.error(error)                
            }
        }
        fetchRoom();
    },[roomId])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const response = await updateRoom(roomId,room);
            if(response.status  === 200){
                setSuccessMessage("Room updated successfully!")
                const updateRoomData = await getRoomById(roomId);
                setRoom(updateRoomData);
                setImagePreview(updateRoomData.photo);
                setErrorMessage("")
            }else{
                setErrorMessage("Error updating room");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message)
            
        }
    }

    return (
        <>
            <div className='container, mt-5 mb-5'>
                <h3 className='text-center mb-5 mt-5'>Edit Room</h3>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                           
                        {successMessage && (
                            <div className='alert alert-success fade show'>{successMessage}</div>
                        )}
                        { errorMessage && (
                            <div className='alert alert-danger fade show'>{errorMessage}</div>
                        )}
    
    
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3 '>
                                <label htmlFor='roomType' className='form-label'>Room Type</label>
                               <input type="text" className='form-control' id='roomType' name='roomType' value={room.roomType} onChange={handleInputChange} />
                            </div>
    
                            <div className='mb-3 '>
                                <label htmlFor='roomPrice' className='form-label hotel-color'>Room Price</label>
                                <input type="number" className='form-control' required id='roomPrice' name='roomPrice' value={room.roomPrice} onChange={handleInputChange} />
                            </div>
    
                            <div className='mb-3 '>
                                <label htmlFor='photo' className='form-label hotel-color'>Room Photo</label>
                                <input required  type="file" id='photo' name='photo' className='form-control' onChange={handleImageChange}/>
                                {imagePreview && (
                                    <img src={`data:image/jpeg;base64,${imagePreview}`} alt="Room photo" style={{maxWidth:"400px",maxHeight:"400px"}} className='mb-3'/>
                                )}
                            </div>
                            <div className='d-grid gap-2 d-md-flex mt-2'>
                              
                              <Link to={"/existing-rooms"} className='btn btn-outline-info ml-5' >
                                back
                              </Link>
                              
                                <button  className='btn btn-outline-warning' type='submit'>
                                    Edit Room    
                                </button>
                            </div>
                        </form>
    
                    </div>
                </div>
            </div>
        </>
      )
}

export default EditRoom