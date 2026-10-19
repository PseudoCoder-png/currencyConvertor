import DropDown from "./dropDown"
import CurrencyTab from "./currencyTab"
import { useEffect, useRef, useState } from "react";
export default function Tab(){
    const [valueA,setA] = useState("");
    const [valueB,setB] = useState("");
    const [currA,setCurrA] = useState("INR");
    const [currB,setCurrB] = useState("USD");
    const [rate,setRate] = useState(null);
    const [hash,setHash]=useState([]);
    
    useEffect(()=>{
        async function fetchRate(){
            try{
                const response = await fetch(`https://api.frankfurter.dev/v2/rates?base=${currA}`);
                const result = await response.json();
                const match = result.find(item => item.quote === currB);
                setRate(match ? match.rate : null);
                setHash(result);
                if (match && valueA !== "") {
                    setB(valueA * match.rate);
                }
            }catch(error){
                console.log(error);
            }
        }
        fetchRate();
    },[currA, currB])

    const handleChange = (e) =>{
        const newValue = e.target.value;
        setA(newValue);
        setB(rate !== null && newValue !== "" ? newValue * rate : "");
    }
    const setcurrA = (c) =>{
        const newCurr = c.target.value;
        setCurrA(newCurr);
    }
    const setcurrB = (c) =>{
        const newCurr = c.target.value;
        setCurrB(newCurr);
        const match = hash.find(item => item.quote === newCurr);
        setRate(match ? match.rate : null);
        if (match && valueA !== "") {
            setB(valueA * match.rate);
        }
    }
    return <div className="box content">
        <CurrencyTab
            ddVal={currA}
            ddonChange={setcurrA}
            title = "Currency A"
            value = {valueA}
            onChange = {handleChange}
            readOnly={false}
        />
        <CurrencyTab
            ddonChange={setcurrB}
            ddVal={currB}
            title = "Currency B" 
            value = {valueB}
            readOnly = {true}

        />
    </div>
}