function SuggestionDisplay({data}) {
  return (
    <div>
      {
        data.map(el=>
          <div key={el.id}>
            {el.title}
          </div>
        )
      }
    </div>
  )
}

export default SuggestionDisplay