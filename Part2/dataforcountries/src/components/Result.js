const Result = (props) => {
    return (
      <div>
        <p>{props.country.name} <button value={props.country.name} onClick={props.handleShow}>show</button></p>
      </div>
    )
  }

export default Result