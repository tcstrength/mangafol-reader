import { Spinner } from "react-bootstrap";

function Loading(props) {
  var size = "sm";
  if (props.size !== undefined) {
    size = props.size;
  }
  return (
    <Spinner
      {...props}
      size={size}
      as="span"
      animation="border"
      role="status"
      aria-hidden="true"
    />
  )
}

export default Loading;