import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";


const AddPlant = () => {
    const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const[plantCode]=useState(0);
  //const { register, handleSubmit } = useForm();
  const[FileArray,setFileArray]=useState([]);
  const [PlantName, setPlantName] = useState("");
  const [WareHouse, setWareHouse] = useState<number>(0);
  const [Country, setCountry] = useState("");
  const [State, setState] = useState("");
  const [City, setCity] = useState("");
  const [transport, setTransport] = useState(0);
  const [PhoneNum, setPhoneNum] = useState(0);
  const [PlantPhoto, setPlantPhoto] = useState<File[] | null>([]);
  const [TransporterName, setTransporterName] = useState("");
  const { handleSubmit} = useForm();
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`https://localhost:44351/api/PlantManagement/Countries`).then((response: any) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`https://localhost:44351/api/PlantManagement/States?CountryName=${Country}`).then((response: any) => {
      setStates(response.data);
    });
  }, [Country]);

  useEffect(() => {
    axios.get(`https://localhost:44351/api/PlantManagement/Cities?StateName=${State}`).then((response: any) => {
      setCities(response.data);
    });
  }, [State]);

  useEffect(()=>{
    const element=document.getElementById("TablePlaneName")
    if (element){
      element.innerHTML=PlantName;
    }
  },[PlantName])

  const onSubmit = async () => {
    console.log(PlantName,WareHouse,Country,State,City,transport,PhoneNum,TransporterName);
    console.log(PlantPhoto);
    
    
    const formData = new FormData();
    formData.append("PlantCode1",String(plantCode));
    formData.append("PlantName", PlantName);
    formData.append("IsWareHouse", String(WareHouse));
    formData.append("TransportAvail", String(transport));
    formData.append("PhoneNum", String(PhoneNum));
    formData.append("TransporterName", TransporterName);
    formData.append("PlantAvailable",String(1));
    formData.append("CountryName", Country);
    formData.append("StateName", State);
    formData.append("CityName", City);
    if(PlantPhoto!=null){
      for(let i=0;i<PlantPhoto.length;i++){
        formData.append("Images",PlantPhoto[i]);
      }
    }


    try {
      const response = await axios.post("https://localhost:44351/api/PlantManagement/AddPlant1", formData);
      // Handle success
      console.log(response.data);
      navigate('/PlantListEdit')
    } catch (error) {
      // Handle error
      console.error("Error adding plant:", error);
    }
  };

  const handleTable =()=>{

  }




  // function handleDelete(name: any) {
  //     setFileArray(prev=>prev.filter((item:any)=>item.name!=name));
      // const response=PlantPhoto? PlantPhoto.filter(item=>item.name!=name) : null;
      // setPlantPhoto(response);
  // }

  return (
    
    <>
      <form className="bg-form" onSubmit={handleSubmit(onSubmit)}>
        <label className='dis-block '>Enter Plant Name: </label>
        <input className="form-input-size2" placeholder="Enter Plant Name" value={PlantName} onChange={(e)=>{setPlantName(e.target.value)}}/>
        <br/>

        <label>Is Ware House: </label>
        <label>Yes </label>
        <input name='IsWareHouse' type='radio' value={1} onChange={(e)=>{setWareHouse(parseInt(e.target.value))}} />
        <label>No </label>
        <input name='IsWareHouse' type='radio' value={0} onChange={(e)=>{setWareHouse(parseInt(e.target.value))}} />
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
        <input name='Transport' type='checkbox' checked={transport===0} onChange={()=>{setTransport(0)}} />
        <br/><br/>

        <label>Phone Number: </label>
        <input className="form-input-size2" type="tel"  placeholder="Enter 10-digit phone number" value={PhoneNum} onChange={(e)=>{setPhoneNum(parseInt(e.target.value.slice(0,10)))}}/>
        <br/>
        <label>Upload Plant Photo: </label>
        {/* <input type="file" accept=".jpg, .jpeg, .png, .gif, .pdf" onChange={(event:any)=>{handleFileChange(event)}}/> */}
        
        <input
          type="file" multiple
          accept=".jpg, .jpeg, .png, .gif"
          onChange={(e: any) =>{
            setPlantPhoto(e.target.files); handleTable();
            console.log(PlantPhoto,"File List"); 
            const files:any=Array.from(e.target.files);
            setFileArray(files);         
          }}
          />


        <br/><br/>
        {FileArray.length>0 && (
                    <table>
                    <tr>
                        <th>File Name</th>
                        <th>File Type</th>
                        <th>File Size</th>
                        <th>Image </th>
                        {/* <th>Delete</th> */}
                    </tr>
                    
                        
                    
                      {FileArray.map((item:any)=>(
                        <>
                            <tr>
                                <td>{item.name}</td>
                                <td>{(item.size/1024).toFixed(2)} KB</td>
                                <td>{item.type}</td>
                                <td><img height={20} width={30} src={URL.createObjectURL(item)}/></td>
                                {/* <td><button onClick={()=>{handleDelete(item.name)}}>Delete</button></td> */}
                            </tr>
                        </>
                    ))}
                </table>
        )}<br/>



        
        {
            (transport ==1 && 
                <>
                <label>Transporter Name</label>
                <input placeholder="Enter Transporter Name" value={TransporterName} onChange={(e) => { setTransporterName(e.target.value); } } />
                <br/><br/>
                </>

                )
        }   

        <input type="submit" className="form-input-size2"/>   
        <button className="back-btn" onClick={()=>{navigate('/PlantListEdit')}}>BACK</button>   

        
        
      </form>
    </>
  )
}

export default AddPlant
