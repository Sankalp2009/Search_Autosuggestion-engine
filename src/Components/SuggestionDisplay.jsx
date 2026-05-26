function SuggestionDisplay({ data, setSelectedProduct }) {

  return (
    <div className="results_container">
      {data && data?.map((el) => (
        <div className="result_item" key={el.id} onClick={() => setSelectedProduct(el)}>
          
          <div className="image_wrapper">
            <img src={el.thumbnail} alt={el.title} />
          </div>

          <div className="product_info">
            <h3>{el.title}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SuggestionDisplay