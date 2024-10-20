import { useEffect, useState } from 'react'

function App() {
  const [city, setCity] = useState('')
  const [temperature, setTemperature] = useState(null)
  const [wind, setWind] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [weatherStatus, setWeatherStatus] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return // avoid fetching when city is empty

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=a60713cadd364da09f2faabac1313300`
        )
        const data = await res.json();
        // console.log(data);
        
        if (Number(data.cod) === 404) {
          setError(true);
          setWeatherStatus('');
          setHumidity(null);
          setWind(null);
          setTemperature(null);
        } else {
          setError(false);
          setWeatherStatus(data.weather[0].main);
          setHumidity(data.main.humidity);
          setWind(data.wind.speed);
          setTemperature(Math.round(data.main.temp));
        }

      } catch (error) {
        console.log('Error fetching weather data:', error);        
      }
    }

    fetchWeather()
  }, [city])

  const handleCityChange = (e) => {
    setCity(e.target.value)
  }

  return (
    <div className='flex items-center text-center justify-center w-full h-screen bg-gray-800 text-white'>
      <div className='w-[24rem] bg-sky-400 rounded-xl p-4 py-6 bg-[url("https://img.freepik.com/free-photo/mesmerizing-scenery-green-mountains-with-cloudy-sky-surface_181624-27189.jpg?t=st=1727872003~exp=1727875603~hmac=32282c7e49b97e6a343c4e26182b596fd76b732ff0769a80805f6c88841d2dbc&w=826")]' >
        <div className='w-full' >
          <input
            value={city}
            onChange={handleCityChange}
            type="text"
            placeholder='Search'
            className='w-full py-2 px-3 rounded-full outline-none text-gray-800 font-semibold'
          />
          {error && <p className='text-red-600 mt-1'>Invalid city name</p>}
        </div>
        <div>
          <div className='my-5'>
            <img src={`../public/${weatherStatus.toLowerCase()}.png `} width="100px" className='mx-auto' alt="" />
            <h5 className='text-2xl font-semibold'>
              {weatherStatus}
            </h5>
            <h2 className='text-[4.5rem] font-semibold'>
              {temperature}°C
            </h2>
            <h2 className='text-3xl font-semibold leading-3'>
              {city.toLocaleUpperCase()}
            </h2>
          </div>
          <div className='mt-14 flex items-center justify-around'>
            <div className='flex items-center justify-center'>
              <img src="../public/humidity.png" width="40px" alt="" />
              <p className='text-lg leading-6 font-semibold ms-3'>{humidity}% <br /> Humidity</p>
            </div>
            <div className='flex items-center justify-center'>
              <img src="../public/wind.png" width="40px" alt="" />
              <p className='text-lg leading-6 font-semibold ms-3'>{wind} km/h<br /> Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}


export default App
