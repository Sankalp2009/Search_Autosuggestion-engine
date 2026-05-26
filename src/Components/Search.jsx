import React, {useState, useEffect} from 'react'
import SearchInput from './SearchInput'
function Search() {
  
  // Raja ke khajane to chupane ke liye sandook(state)
  const [query, setQuery] = useState("");
  
  console.log(query);

  return (
    <div>
      {/* Kabootar ke liye Dana bhejo papa ke ghr se (props)*/}
      <SearchInput query={query} setQuery={setQuery} />
    </div>
  )
}

export default Search