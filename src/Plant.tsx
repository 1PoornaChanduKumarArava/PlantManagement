import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router"
import { Link } from "react-router-dom";

const Plant = () => {
    const navigate=useNavigate();
    const LoginState=useSelector((state:any)=>state.LoginState);
    const[PlantList,setPlantList]=useState([]);

    console.log(PlantList);

    useEffect(()=>{
      axios.get(`https://localhost:44351/api/PlantManagement/PlantList?n=${1}`).then((response:any)=>{
        setPlantList(response.data)
        console.log(LoginState,"LoginState");        
        console.log("List",response.data)
      })
    })


    const handleAddPlant = () =>{
      navigate("/AddPlant")
    }

    const handleDelete = (e:any)=>{
      axios.post(`https://localhost:44351/DeleteSP?plantCode=${e}`);
    }
    
  return (
    <>
    <div className="w-100 d-flex space-between">
      <button className="add-plant-btn" onClick={handleAddPlant}>Add Plant</button>
      <button className="green-btn" onClick={()=>{navigate('/')}}>LOGOUT</button>
    </div>
      <div className="plant-container d-flex w-100">
          <div className="plant-list-container d-flex w-100">
              {PlantList.map((item:any) => (
                  <div className="plant-item w-28" key={item.plantCode1}>
                      <img src={item.imagePath}/>
                      <h1>Plant Name: {item.plantName}</h1>
                      <p className="bold">Phone Number: {item.phoneNum}</p>                    
                      <p className={item.transportAvail == 1 ? 'active' : 'inactive'}>
                          {item.transportAvail == 1 ? 'Transportation Available' : 'Transportation Not Available'}
                      </p>
                      
                        {item.transportAvail!=0 &&
                        (<p className="bold">Transporter Name: {item.transporterName}</p>)}
                      
                      
                      <p className={item.isWareHouse == 1 ? 'active' : 'inactive'}>
                          {item.isWareHouse==1 ? 'Ware House Available' : 'Ware House Not Available'}
                      </p>
                      <p className="bold">Addresss: {item.cityName}, {item.stateName}, {item.countryName}.</p>  
                      <Link to='/EditPlant' state={item}>
                        <button className="green-btn">EDIT</button>
                      </Link>
                      <button className="delete-btn" onClick={()=>{handleDelete(item.plantCode1)}}>DELETE</button>
                  </div>
              ))}
          </div>
      </div>    
    </>
  )
}

export default Plant
