import React from 'react'

const Header = (props) => {
  return (
    <div>
      Header
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