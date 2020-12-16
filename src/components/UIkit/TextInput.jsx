import React from 'react'
import TextField from "@material-ui/core/TextField"


const TextInput = (props) => {
  return (
    <TextField
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      type={props.type}
      onChange={props.onChange}
      value={props.value}
    />
  )

}

export default TextInput