import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions';

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {

    const [roomTypes, setRoomTypes] = useState([""]);
    const [showNewRoomTypeInput,setShowNewRoomTypeInput] = useState(false);
    const [newRoomType , setNewRoomType] = useState("");

    useEffect(()=>{
        getRoomTypes().then((data) =>{
            setRoomTypes(data)
        })
    },[])


    const handleNewRoomInputChange =(e) =>{
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () =>{
        if(newRoomType !== ""){
            setRoomTypes([...roomTypes,newRoomType]);
            setNewRoomType("");
            setShowNewRoomTypeInput(false)
        }
    }

  return (
    <>
    
    {roomTypes.length> 0 && (
        <div>
            <select required className='form-select mb-2' name="roomType" id="roomType" value={newRoom.roomType}
            onChange={(e)=>{
                if(e.target.value === "Add New"){
                    setShowNewRoomTypeInput(true)
                }else{
                    handleRoomInputChange(e)
                }
            }}>
                <option value={""}>Select a room type</option>
                <option value={"Add New"}>Add New</option>
                {roomTypes.map((type,index) =>(
                    <option value={type} key={index}>{type}</option>
                ))}
            </select>
            {showNewRoomTypeInput && (
                <div className='input-group'>
                    <input type="text" className='form-control' placeholder='Enter a new room type' onChange={handleNewRoomInputChange} />
                    <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>Add</button>
                </div>
            )}
        </div>
    )}

    </>
  )
}

export default RoomTypeSelector