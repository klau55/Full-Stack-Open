import { useState, useEffect } from 'react'
import dataService from './services/countries'

const api_key = import.meta.env.VITE_SOME_KEY
 

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  useEffect(() => {
    dataService
    .getAll()
    .then(initialData => {
      setCountries(initialData)
    })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase())
    if (search)
    {
      searchingAlgorithm()
      countriesToShow()
    }

  }
   const countryFound = (res) => {
    const languagesArray = Object.entries(res.languages);
    return (
        <>
          <h1>{res.name.common}</h1>
          <a>capital {res.capital}</a>
          <br />
          <a>area {res.area}</a>
          <br />
          <b>languages:</b>
          <ul>
          {languagesArray.map(([key, name]) => (
          <li key={key}>{name}</li>
				  ))}
			    </ul>
          <img width="150" alt={res.flags.alt} src={res.flags.png} />
          <h2>Weather in {res.capital}</h2>
          <a>temperature </a>
        </>
      )
    } 
  const pressShow =  di  => {
    console.log(di)
    setSearch(di.name.common.toLowerCase());
  }

  const Display = ({ display, pressShow }) => {
    if (display.length == 1)
    {
      return (countryFound(display[0]))
    }
    else if (display.length < 10)
    {
      return (display.map((di, index) => 
      <p key={index}>{di.name.common} <button onClick={() =>pressShow(di)}>show</button></p>
      ))
    }
    else if (search.length > 0)
     return (<p>Too many matches, specify another filter</p>)
  }



  const searchingAlgorithm = () => {
    return countries.filter(country =>
          country.name.common.toLowerCase().includes(search))
  }
  const countriesToShow = () => search ? searchingAlgorithm() : countries;
  return (
    <>
      <div>
        find countries  <input onChange={handleSearchChange} />
      </div>
      <Display display={countriesToShow()} pressShow={pressShow} />
    </>
  )
}

export default App
