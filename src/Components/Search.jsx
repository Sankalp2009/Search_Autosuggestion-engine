/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'
import SearchInput from './SearchInput'
import SuggestionDisplay from './SuggestionDisplay'
SuggestionDisplay
function Search() {
  // Raja ke alag alag khajane ko chupane ke liye sandook (state)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  // API Handling
  useEffect(() => {
    const trimmed = encodeURIComponent(query.trim())
    if (!trimmed && trimmed.length < 2) {
      setResults([])
      setIsLoading(false)
      setIsError(null)
      return 
    }
    
    const FetchSearch = async () => {
      try {
        setIsLoading(true)
        setIsError(null)
        let res = await fetch(
          `https://dummyjson.com/products/search?q=${trimmed}`
        )
        let data = await res.json()
        console.log(data?.products)

        if (!data?.products) {
          throw new Error('Data Not Found')
        }
        setResults(data?.products || [])
      } catch (error) {
        console.error(error)
        setIsError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    // Optimization
    const timerID = setTimeout(() => {
      FetchSearch()
    }, 300);

    return ()=>{
      clearTimeout(timerID);
    }

  }, [query])

  return (
    <div>
      {/* Kabootar ke liye Dana bhejo papa ke ghr se (props)*/}
      <SearchInput query={query} setQuery={setQuery} />
      {isLoading && <h2>Loading</h2>}
      {isError && <h2>{isError}</h2>}
      {!isLoading && query && results.length === 0 && <h2>No Results Found</h2>}
      <div className="search_wrapper">
        <SuggestionDisplay data={results} />
      </div>
    </div>
  )
}

export default Search
