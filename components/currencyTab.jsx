import DropDown from "./dropDown";
import { useEffect, useState,useRef } from "react";

export default function CurrencyTab(props){
    //Api call
    const [data,setData] = useState();
    let link = "https://api.frankfurter.dev/v1/currencies";
    useEffect(()=>{
        async function fetchData() {
            try{
                const response =await  fetch( link )
                const result =await  response.json();
                setData(Object.entries(result));
            }catch(error){
                console.log("failed");
            }
        }
        fetchData();
    },[]);
    // [] means run once when the component loads

    //the strucuture
    return <div className="tab-curr box">
        <h3>{props.title}</h3>
        
        <DropDown 
            array={data}
            ddVal={props.ddVal}
            onChange={props.ddonChange}
        />
        
        <label htmlFor="Currency">
            <input
                readOnly = {props.readOnly}
                value={props.value || ""}
                type="text" 
                name="Currency"  
                onChange={props.onChange}
                placeholder="C U R R E N C Y" 
            />
        </label>
        
    </div>
}