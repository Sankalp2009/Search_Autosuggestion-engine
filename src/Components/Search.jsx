/* eslint-disable react-hooks/set-state-in-effect */
import React, {useState, useEffect} from 'react'
import SearchInput from './SearchInput'
function Search() {

  // Raja ke alag alag khajane ko chupane ke liye sandook (state)
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] =  useState(false);
  const [isError, setIsError] = useState(null);

  console.log(query);
  
  // API Handling
  useEffect(()=>{

    const trimmed = encodeURIComponent(query.trim());

    if(!trimmed && trimmed.length < 2){
      setResults([]);
      setIsLoading(false);
      setIsError(null);
    }

    const FetchSearch = async()=>{
      try {
        setIsLoading(true);
        let res = await fetch(`https://dummyjson.com/products/search?q=${trimmed}`);
        let data = await res.json();
        console.log(data?.products);

        if(!data?.products) return false;

        setResults(data?.products || []);

      } catch (error) {
        console.error(error)
        setIsError({
          message:error.message
        })
      }finally{
        setIsLoading(false);
      }
    }

    FetchSearch();
  },[query]);





  return (
    <div>
      {/* Kabootar ke liye Dana bhejo papa ke ghr se (props)*/}
      <SearchInput query={query} setQuery={setQuery} />
    </div>
  )
}

export default Search