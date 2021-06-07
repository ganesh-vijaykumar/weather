import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'

export default function Home() {
  const [city, setCity] = React.useState('')
  const [weather, setWeather] = React.useState('')
  const [isCelsius, setIsCelsius] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('./api/hello', {
        method: 'POST',
        body: city,
      })
      const data = await response.json()
      setWeather(data)
    } catch (error) {
      console.error(error)
    }
    setCity('')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
        <meta name='description' content='Weather App created using Next.js' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <form className={styles.form}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          name='city'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type='submit' onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </form>
      {weather !== '' && weather.data !== 'error' ? (
        <div className={styles.dataContainer}>
          <div className={styles.condition}>
            <img
              src={weather.data.current.condition.icon}
              alt={weather.data.current.condition.text}
              height={100}
            />
            <div>{weather.data.current.condition.text}</div>
          </div>
          <div className={styles.temperature}>
            {isCelsius ? (
              <span>{weather.data.current.temp_c}</span>
            ) : (
              <span>{weather.data.current.temp_f}</span>
            )}
            <span
              onClick={() => setIsCelsius(true)}
              style={
                isCelsius
                  ? { fontWeight: 'bold', cursor: 'pointer' }
                  : { fontWeight: 'normal', cursor: 'pointer' }
              }
            >
              {' '}
              °C{' '}
            </span>
            <span>|</span>
            <span
              onClick={() => setIsCelsius(false)}
              style={
                !isCelsius
                  ? { fontWeight: 'bold', cursor: 'pointer' }
                  : { fontWeight: 'normal', cursor: 'pointer' }
              }
            >
              {' '}
              °F{' '}
            </span>
          </div>
          <div className={styles.otherInfo}>
            <div>Humidity: {weather.data.current.humidity}%</div>
            {isCelsius ? (
              <div>Wind: {weather.data.current.wind_kph} km/h</div>
            ) : (
              <div>Wind: {weather.data.current.wind_mph} mph</div>
            )}
          </div>
          <div className={styles.location}>
            {weather.data.location.name}, {weather.data.location.region},{' '}
            {weather.data.location.country}
          </div>
        </div>
      ) : weather.data === 'error' ? (
        <div>No results found</div>
      ) : (
        <div></div>
      )}
    </div>
  )
}
