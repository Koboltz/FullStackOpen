import Result from './Result';
import Info from './Info';

const Results = (props) => {

    const data = props.countries.filter(country => country.name.toLowerCase().includes(props.filter.toLowerCase()))
  
    if (data.length === 1) {
    
      return (
        <Info country={data[0]} />
      )
    } else if (data.length > 10) {
        return 'Too many matches. Be more specific';
    } else {
        return (
      
          data.map(country => <Result key={country.alpha3Code} country={country} handleShow={props.handleShow}/>)
     
        )
    }
  }

  export default Results;