const Notification = ({error, message}) => {

    const errorStyle = {
        color: "red",
        backgroundColor: "lightgrey",
        padding: "20px",
        border: "1px solid red",
        borderRadius: "5px"
    }

    const notificationStyle = {
        color: "green",
        backgroundColor: "lightgrey",
        padding: "20px",
        border: "1px solid green",
        borderRadius: "5px"
    }

    if (error === true) {
        return <h2 style={errorStyle}>{message}</h2>
    }
     
    if (message !== '') {
    return <h2 style={notificationStyle}>{message}</h2>
    }

    return null
   

}

export default Notification