

const Notification = ({message}) => {
    let notificationStyle;
  //  console.log(message)
    if (message === null) {
        return null
    } else {
        if (!message.includes('Information of') && !message.includes('validation') && !message.includes('Validation failed')) {
           
         notificationStyle = {
            backgroundColor: 'lightgrey',
            border: '1px solid green',
            borderRadius: '5px',
            color: 'green',
            fontSize: 20,
            fontWeight: 700
        }
    } else {
        notificationStyle = {
            backgroundColor: 'lightgrey',
            border: '1px solid red',
            borderRadius: '5px',
            color: 'red',
            fontSize: 20,
            fontWeight: 700
        }
    }
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
 }

}
export default Notification;