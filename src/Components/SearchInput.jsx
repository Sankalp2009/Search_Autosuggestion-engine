function SearchInput({query, setQuery}) {
  return (
    <div>
      <input
      className="search_input" 
      type="text" 
      name="Search"
      value={query}
      onChange={(e)=>{
        setQuery(e.target.value)
      }}
      placeholder='Enter Search...'
      />
    </div>
  )
}

export default SearchInput