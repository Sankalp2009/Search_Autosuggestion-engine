/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from 'react'
import SearchInput from './SearchInput'
import SuggestionDisplay from './SuggestionDisplay'
function Search() {
  // Raja ke alag alag khajane ko chupane ke liye sandook (state)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const cache = useRef({});
  // API Handling
  useEffect(() => {
    const trimmed = encodeURIComponent(query.trim())
    if (!trimmed || trimmed.length < 2) {
      setResults([])
      setIsLoading(false)
      setIsError(null)
      return 
    }
    const controller = new AbortController();

    const FetchSearch = async () => {
      try {
        setIsLoading(true)
        setIsError(null)

        // Cache Check
        if(cache.current[trimmed]){
          setResults(cache.current[trimmed])
          setIsLoading(false);
          return
        }

        let res = await fetch(
          `https://dummyjson.com/products/search?q=${trimmed}`,{
            signal: controller.signal
          }
        )
        let data = await res.json()
        console.log(data?.products)

        if (!data?.products) {
          throw new Error('Data Not Found')
        }

        // Store the Cache or already check results
        cache.current[trimmed] = data?.products || [];

        setResults(data?.products || [])
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.log(error)
          setIsError(error.message)
        }
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
      controller.abort();
    }

  }, [query])

  return (
    <div className="search_page">
    <div className="search_card">
  
      <SearchInput query={query} setQuery={setQuery} />
  
      {isLoading && <h2>Loading</h2>}
  
      {isError && <h2>{isError}</h2>}
  
      {!isLoading && query && results.length === 0 && (
        <h2>No Results Found</h2>
      )}
  
      <SuggestionDisplay
        data={results}
        setSelectedProduct={setSelectedProduct}
      />
  
      {
        selectedProduct && (
          <div className="selected_product">
  
            <div className="selected_image">
              <img
                src={selectedProduct.thumbnail}
                alt={selectedProduct.title}
              />
            </div>
  
            <div className="selected_info">
              <h2>{selectedProduct.title}</h2>
  
              <p className="selected_desc">
                {selectedProduct.description}
              </p>
  
              <div className="selected_meta">
                <span>${selectedProduct.price}</span>
  
                <span>
                  ★ {selectedProduct.rating}
                </span>
              </div>
            </div>
  
          </div>
        )
      }
  
    </div>
  </div>
  )
}

export default Search
