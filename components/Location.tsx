import {useState} from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Location(props: {location:
string}) {
    const [weather, setWeather] = useState<{
    main: {
        temp: Number,
        feels_like: Number,
        temp_min: Number,
        temp_max: Number,
    },
    weather: {
        description: string
    }[]
} |null>(null);

    useEffect(()=> {
        axios.get("https://api.openweathermap.org/data/2.5/weather",{
            params: {
                q: props.location,
                appid: "bac6bfaf684d6effc8a6baf422235257"
            }
        }). then(res => {
            setWeather(res.data);

        }).catch(e => console.log(e));
    },[]);
    return (
        <div className = "p-4 border border-black flex">
                <div className = "text-xl">
                    <p className="font-bold">{props.location}</p>
                    {weather && (
                        <p>{Math.round((weather.main.temp - 276) * 9/5 + 32)} F</p>
                    )}
                    
                </div>
                {weather && (
                    <div className = "ml-auto text-right">
                    <p>Feels like {Math.round((weather.main.feels_like - 276)* 9/5 + 32)}/{weather.weather[0].description}</p>
                    <p> Min {Math.round((weather.main.temp_min - 276)* 9/5 + 32)} F /
                    Max {Math.round((weather.main.temp_max - 276)* 9/5 + 32)} F</p>
                </div>
                )}
                
            </div>
    )
}