import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions';

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {

    const [roomType, setRoomType] = useState([]);
    const [showNewRoomTypeInput,setShowNewRoomTypeInput] = useState(false);
    const [newRoomType , setNewRoomType] = useState("");

    useEffect(()=>{
        getRoomTypes().then((data) =>{
            setRoomType(data)
        })
    },[])


    const handleNewRoomInputChange =(e) =>{
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () =>{
        if(newRoomType !== ""){
            setRoomType([...roomType,newRoomType]);
            setNewRoomType("");
            setShowNewRoomTypeInput(false)
        }
    }

  return (
    <>
    
    {roomType.length> 0 && (
        <div>
            <select name="roomType" id="roomType" value={newRoom.roomType}
            onChange={(e)=>{
                if(e.target.value === "Add New"){
                    setShowNewRoomTypeInput(true)
                }else{
                    handleRoomInputChange(e)
                }
            }}>
                <option value={""}>Select a room type</option>
                <option value={"Add New"}>Add New</option>
                {roomType.map((type,index) =>(
                    <option value={type} key={index}>{type}</option>
                ))}
            </select>
            {showNewRoomTypeInput && (
                <div className='input-group'>
                    <input type="text" className='form-control' placeholder='Enter a new room type' onChange={handleNewRoomInputChange} />
                    <button className='nbtn btn-hotel' type='button' onClick={handleAddNewRoomType}>Add</button>
                </div>
            )}
        </div>
    )}

    </>
  )
}

export default RoomTypeSelector