'use client'
import axios from "axios";
import { use, useEffect, useState } from "react";



export default function Openweather() {

    const [result,setResult] = useState([]);
    const [main,setMain] = useState([]);
    const [loct,setLoct] = useState([]);
    const [desc,setDesc] = useState([]);
    const [hum,setHum] = useState([]);
    const [descMain,setDescMain] = useState([]);
    const [feelsLike,setFeelsLike] = useState([]);
    const [resultIcon,setResultIcon] = useState([]);

    useEffect(() => {
        function weatherRes() {
            fetch("https://ipapi.co/json")
                .then((response) => response.json())
                .then(async (data) => {
                    const city = data["city"]
                    const country = data["country_code"]
                    const rest = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}`+`,`+`${country}&appid=ee2817d55ae07e91c4ab32847aca45db`)
                    var iconAdd = JSON.stringify(rest.data.weather[0].icon)
                    iconAdd=iconAdd.replaceAll('"','');
                    const icon = `https://openweathermap.org/img/wn/${iconAdd}@2x.png`
                    setMain(JSON.stringify(parseInt(rest.data.main.feels_like-273.15)))
                    setFeelsLike(JSON.stringify(parseInt(rest.data.main.temp-273.15)))
                    setResult(JSON.stringify(rest.data))
                    var des = JSON.stringify(rest.data.weather[0].main)
                    des = des.replaceAll('"','');
                    var desMain = JSON.stringify(rest.data.weather[0].description)
                    desMain = desMain.replaceAll('"','');
                    var loc = JSON.stringify(rest.data.name)
                    loc = loc.replaceAll('"','');
                    setLoct(loc)
                    setResultIcon(icon)
                    setDesc(des)
                    setDescMain(desMain)
                    setHum(JSON.stringify(rest.data.main.humidity))
                })
        }
        weatherRes()
    },[])
    


    return (
        <div className="flex flex-col m-3">
        <div>
        {
                loct
            }
        </div>
        
            <div>
            <img src={resultIcon}/>
            </div>
            

            <div>
            {
                desc
            },{
                descMain
            }
            </div>
            
            

            <div>
            <p>Temperature:{
                main
            }°C
            </p>
            </div>

            
            <div>
            <p>Feels like: {
                feelsLike
            }°C</p>
            </div>
            
            <div>
            <p>Humidity:{
                hum
            }</p>
            </div>
            
            


            {/* {
                result
            } */}
            
        </div>

    
        
        )
}