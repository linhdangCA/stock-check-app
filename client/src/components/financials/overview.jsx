import React from 'react'

const Overview = (props) => {
  return (
    <div>
      Overview
      <div>
        Anuual Dividend: {props.overviewData.DividendPerShare}
      </div>
      <div>
        Quarterly Dividend: {props.overviewData.DividendPerShare / 4}
      </div>
      <div>
        EPS: {props.overviewData.EPS}
      </div>
    </div>
  )
}

export default Overview