// @ts-ignore
import Card from 'react-animated-3d-card'

interface WeatherCardProps {
    weather_data: WeatherData
    location_data: LocationData

}

interface ConditionData {
    icon: string
    text: string
}

export interface WeatherData {
    is_day: boolean
    last_updated: Date
    temp_c: number
    temp_f: number
    wind_mph: number
    humidity: number
    icon: string
    condition: ConditionData
}

export interface LocationData {
    country: string
    name: string
    localtime_epoch: number
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather_data, location_data }) => {

    const currentDate = (epoch_time: number) => {
        const date = new Date(0);
        date.setUTCSeconds(epoch_time);
        return date;
    }

    return <Card
        style={{
            background: 'linear-gradient(to right, #2569b8, #488fe0, #2477d6)',
            width: '450px',
            height: '500px',
            cursor: 'pointer'
        }}
        onClick={() => console.log(weather_data, location_data)}
    >
        <div>
            <img
                style={{
                    position: 'absolute',
                    left: '25px',
                    top: '25px',
                    height: '50px'
                }}
                src={weather_data.condition.icon}
                className='card-item__chip'
                alt={weather_data.condition.text}
            ></img>
            <label style={{
                color: 'white',
                position: 'absolute',
                top: '65px',
                left: '25px',
                opacity: 0.5
            }}>{weather_data.condition.text}</label>
            <i
                style={{
                    position: 'absolute',
                    right: '25px',
                    top: '25px',
                    fontSize: "2em",
                    color: "white"
                }}
                className={`bi ${weather_data.is_day ?
                    "bi-sun-fill" :
                    "bi-moon-stars-fill"}`}
            ></i>
        </div>
        <div
            style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div
                style={{
                    fontSize: '30px',
                    fontFamily: 'Fira Code',
                    color: 'white',
                    height: "100%",
                    display: "inherit",
                    flexDirection: "column",
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div className='weather-card-header' style={{ display: 'flex', alignItems: "center" }}>
                    <i className="bi bi-thermometer-half" style={{ fontSize: '2em' }}></i>
                    <h2>{weather_data.temp_f.toString()}° F</h2>
                </div>
                <div
                    className='weather-info'
                    style={{
                        display: 'grid',
                        gap: '1px',
                        gridTemplateColumns: '1fr 1fr', // Two equal columns
                    }}>
                    <div className='row'>
                        <i className="bi bi-moisture"></i>
                        <p>{weather_data.humidity.toString()}</p>
                    </div>
                    <div className='row'>
                        <i className="bi bi-wind"></i>
                        <p> {weather_data.wind_mph.toString()} mph</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <label
                style={{
                    color: 'white',
                    position: 'absolute',
                    bottom: '60px',
                    left: '25px',
                    opacity: 0.5
                }}
            >
                Location
            </label>
            <label
                style={{
                    color: 'white',
                    position: 'absolute',
                    bottom: '60px',
                    right: '25px',
                    opacity: 0.5
                }}
            >
                Local Time
            </label>
        </div>

        <div>
            <label
                style={{
                    color: 'white',
                    position: 'absolute',
                    bottom: '25px',
                    left: '25px',
                    opacity: 1,
                    fontSize: '25px'
                }}
            >
                {location_data.name}
            </label>
            <label
                style={{
                    color: 'white',
                    position: 'absolute',
                    bottom: '25px',
                    right: '25px',
                    opacity: 1,
                    fontSize: '25px'
                }}
            >
                {currentDate(location_data.localtime_epoch).toLocaleTimeString([], {
                    weekday: 'short',
                    hour: 'numeric',
                    hourCycle: 'h12',
                    minute: '2-digit',
                })}
            </label>
        </div>
    </Card>;
}

export default WeatherCard;