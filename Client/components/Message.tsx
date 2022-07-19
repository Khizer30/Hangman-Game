// Message Props Interface
interface MessageProps
{
  message: string
  type: string
} ;

// Message
function Message(props: MessageProps): JSX.Element
{
  return (
  <>
    <div role="alert" className={ "alert marginTB bold " + props.type + ((props.message === "NULL") ? " invisible" : "") }>
      <span className="messageSpan"> { props.message } </span>
    </div>
  </>
  ) ;
}

// Export Message
export default Message ;