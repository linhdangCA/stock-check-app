import React from 'react'


const Sidebar = (props) => {
  return (
    <div>
      <div>
        Top 100
      </div>
      <div>
        {props.top100.map((ticker, index) => {})}
      </div>
    </div>
  )
}

export default Sidebar