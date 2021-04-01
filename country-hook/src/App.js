import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const getSingleCountryFromApi = async (name) => {
  let response = null
  const baseUrl = 'https://restcountries.eu/rest/v2/name/'
  const endUrl = '?fullText=true'
  if (name === '') { 
    return response
  } 

  try {
    response = await axios.get(baseUrl+name+endUrl)
  } catch (e) {
    response = 'not_found'
  }
  return response
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    getSingleCountryFromApi(name)
      .then(c => setCountry(c))
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country === 'not_found') {
    return (
      <div>
        not found...
      </div>
    )
  }

  const countryData = country.data[0]

  return (
    <div>
      <h3>{countryData.name} </h3>
      <div>capital {countryData.capital} </div>
      <div>population {countryData.population}</div> 
      <img src={countryData.flag} height='100' alt={`flag of ${countryData.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
