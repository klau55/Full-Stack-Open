import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  /*Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  } */

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      
      {props.buttonLabel2 ? 
      <div style={showWhenVisible} className="togglableContent">
        <button onClick={toggleVisibility}>{props.buttonLabel2 ? props.buttonLabel2 : "cancel"}</button>
        {props.children}
      </div>
      :  
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>{props.buttonLabel2 ? props.buttonLabel2 : "cancel"}</button>
      </div>
      }
    </div>
  )
})

export default Togglable