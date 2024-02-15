import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router'

const EditPlant = () => {

    const location=useLocation();
    const data=location.state;
    const navigate = useNavigate();

    const[countries,setCountries]=useState([]);
    const[states,setStates]=useState([]);
    const[cities,setCities]=useState([]);
    const[PlantCode]=useState(data.plantCode1);
    console.log(data.plantPhoto,"Plant Photo From FE");
    const[FileData,setFileData]=useState([]);
    const[FileData2,setFileData2]=useState([]);
    const[DeletedFiles,setDeletedFiles]=useState([]);

    const[PlantName,setPlantName]=useState(data.plantName);
    const[WareHouse,setWareHouse]=useState(data.isWareHouse);   
    const[Country,setCountry]=useState(data.countryName);
    const[State,setState]=useState(data.stateName);
    const[City,setCity]=useState(data.cityName);
    const[transport,setTransport]=useState(data.transportAvail);
    const[PhoneNum,setPhoneNum]=useState(data.phoneNum);
    const[PlantPhoto,setPlantPhoto]=useState<File[] | String |FileList | null>();
    console.log(PlantPhoto);
    const[TransporterName,setTransporterName]=useState(data.transporterName);

    useEffect(()=>{
        axios.get(`https://localhost:44351/api/PlantManagement/Countries`).then((response:any)=>{
            console.log("Countries",response.data)
            setCountries(response.data)            
        })
    },[]) 

    useEffect(()=>{
        axios.get(`https://localhost:44351/api/PlantManagement/States?CountryName=${Country}`).then((response:any)=>{
            console.log("States",response.data)
            setStates(response.data)            
        })
    },[Country])

    useEffect(()=>{
        axios.get(`https://localhost:44351/api/PlantManagement/Cities?StateName=${State}`).then((response:any)=>{
            console.log("States",response.data)
            setCities(response.data)            
        })
    },[State])

    useEffect(()=>{
        axios.get(`https://localhost:44351/api/PlantManagement/PlantList?n=${PlantCode}`).
        then((response:any)=>{
            setFileData(response.data)
        })
    },[PlantCode])

    const handleEditUpload=async(PlantPhoto:any,PlantCode:number)=>{
        const formData=new FormData();
        formData.append("PlantCode",PlantCode.toString());        
        if(PlantPhoto!=null){
            for(let i=0;i<PlantPhoto.length;i++){
                formData.append("Images",PlantPhoto[i]);
            }
        }
        console.log(formData,PlantCode);
        const response=await axios.post(`https://localhost:44351/api/PlantManagement/GetFileDetails`,formData);
        console.log(response.data,"NewFileData");
        setFileData2(response.data);
    }


    const handleSave=async()=>{
        console.log(DeletedFiles,"Deleted Files");
        console.log(FileData2,"Adding Files");
        const Data=[...DeletedFiles,...FileData2];
        console.log(Data,"Data")
        await axios.post(`https://localhost:44351/api/PlantManagement/InsertDeleteFiles`,Data);
        navigate('/PlantListEdit');

        if(data.plantName!=PlantName || data.isWareHouse!=WareHouse || data.countryName!=Country
            || data.stateName!=State || data.cityName!=City || data.transportAvail!=transport
            || data.phoneNum!=PhoneNum || data.transporterName!=TransporterName){

                const formData = new FormData();
                formData.append("PlantCode", PlantCode);
                formData.append("PlantName", PlantName);
                formData.append("IsWareHouse", String(WareHouse));
                formData.append("Country", Country);
                formData.append("State", State);
                formData.append("City", City);
                formData.append("TransportAvail", String(transport));
                formData.append("PhoneNum", String(PhoneNum));
                formData.append("TransporterName", TransporterName);
        
                try {
                    const response = await axios.post(`https://localhost:44351/EditPlant`, formData);
                    console.log(response.data);
                    navigate('/PlantListEdit');
                } catch (error) {
                    console.log(error); 
                }

        }




    }


    const handleDelete = (path:string)=>{
        const DeletedFile=FileData.filter((item:any)=>item.imagePath===path);
        setDeletedFiles(prev=>[...prev, ...DeletedFile]);
        setFileData(prev=>prev.filter((item:any)=>item.imagePath!=path))
        
        
    }
    const handleDelete2 =(path:string)=>{
        setFileData2(prev=>prev.filter((item:any)=>item.imagePath!=path))

        
    }


    

    


  return (
    <>
      <div className="bg-form">
        <label className='dis-block '>Enter Plant Name: </label>
        <input className="form-input-size2" placeholder="Enter Plant Name" value={PlantName} onChange={(e)=>{setPlantName(e.target.value)}}/>
        <br/>
        
        <label>Is Ware House: </label>
        <label>Yes </label>
        <input name='IsWareHouse' type='radio' value={1} checked={WareHouse==1} onChange={(e)=>{setWareHouse(parseInt(e.target.value))}} />
        <label>No </label>
        <input name='IsWareHouse' type='radio' value={0} checked={WareHouse==0} onChange={(e)=>{setWareHouse(parseInt(e.target.value))}} />
        <br/><br/>

        <label>Country: </label>
        <select  className="form-input-size2" name="Countries" value={Country} onChange={(e)=>{setCountry(e.target.value)}}>
            <option key='default' value='default'>Select Country</option>
            {
                countries.map((item:any)=>(
                    <option key={item.countryName} value={item.countryName}>
                        {item.countryName}
                    </option>
                ))
            }
        </select>


        <br/>
        <label>State: </label>
        <select className="form-input-size2" name="States" value={State} onChange={(e)=>{setState(e.target.value)}}>
            <option key='default' value='default'>Select State</option>
            {
                states.map((item:any)=>(
                    <option key={item.stateName} value={item.stateName}>
                        {item.stateName}
                    </option>
                ))
            }
        </select>
        <br/>
        <label>City: </label>
        <select className="form-input-size2" name="Cities" value={City} onChange={(e)=>{setCity(e.target.value)}}>
            <option key='default' value='default'>Select City</option>
            {
                cities.map((item:any)=>(
                    <option key={item.cityName} value={item.cityName}>
                        {item.cityName}
                    </option>
                ))
            }
        </select>
        <br/>

        <label>Is Transportation Available: </label>
        <label>Yes </label>
        <input name='Transport' type='checkbox' checked={transport===1} onChange={()=>{setTransport(1)}} />
        <label>No </label>
        <input name='Transport' type='checkbox' checked={transport===0} onChange={()=>{setTransport(0);setTransporterName("");}} />
        <br/><br/>

        <label>Phone Number: </label>
        <input className="form-input-size2" type="tel" pattern="[0-9]{10}" placeholder="Enter 10-digit phone number" value={PhoneNum.toString()} onChange={(e)=>{setPhoneNum(parseInt(e.target.value.slice(0,10)))}}/>
        <br/>
         &nbsp;
        <label>Upload New Plant Photo: </label><br/><br/>
        <input type="file" accept=".jpg, .jpeg, .png, .gif" multiple onChange={(e:any)=>{setPlantPhoto(e.target.files); handleEditUpload(e.target.files,PlantCode)}}/><br/>
        <br/><br/>
        
        <table>
            <tr>
                <th>File Name</th>
                <th>File Size</th>
                <th>File Type</th>
                <th>Image </th>
                <th>Delete</th>
            </tr>
            
                {
                    FileData.map((item:any)=>(
                        <>
                            <tr>
                                <td>{item.fileName}</td>
                                <td>{(item.fileSize/1024).toFixed(2)} KB</td>
                                <td>{item.fileType}</td>
                                <td><img height={20} width={30} src={item.imagePath}/></td>
                                <td><button onClick={()=>{handleDelete(item.imagePath)}}>Delete</button></td>
                            </tr>
                        </>
                    ))
                }

                {
                    FileData2.map((item:any)=>(
                        <>
                            <tr>
                                <td>{item.fileName}</td>
                                <td>{(item.fileSize/1024).toFixed(2)} KB</td>
                                <td>{item.fileType}</td>
                                <td><img height={20} width={30} src={`https://localhost:44351${item.imagePath}`}/></td>
                                <td><button onClick={()=>{handleDelete2(item.imagePath)}}>Delete</button></td>
                            </tr>
                        </>
                    ))
                }
            
        </table>  <br/><br/>
        
        {
            (transport ==1 && 
                <>
                <label>Transporter Name</label>
                <input placeholder="Enter Transporter Name" value={TransporterName} onChange={(e) => { setTransporterName(e.target.value); } } />
                <br/><br/>
                </>

                )
        }   

        <button className="back-btn" onClick={()=>{navigate('/PlantListEdit')}}>BACK</button>
        <button className="submit-btn m-1" onClick={handleSave}>SAVE</button>   

        
        
      </div>  
    </>
  )
}

export default EditPlant
