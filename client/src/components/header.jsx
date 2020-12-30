import React from 'react'

const Header = (props) => {
  return (
    <div>
      <div>
        {props.data.Name}
      </div>
      <div>
        {props.data.Symbol}
      </div>
    </div>
  )
}

export default Header