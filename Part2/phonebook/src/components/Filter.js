
const Filter = (props) => {
    const { filter, handleChange } = props;
    return (
    <p>filter shown with <input value={filter} onChange={handleChange}/></p>
    )
}

export default Filter