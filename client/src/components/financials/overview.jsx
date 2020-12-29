import React from 'react'

const Overview = (props) => {
  return (
    <div>
      Overview
      <div>
        Anuual Dividend Per Share: {props.overviewData.DividendPerShare}
      </div>
      <div>
        Quarterly Dividend Per Share: {props.overviewData.DividendPerShare / 4}
      </div>
      <div>
        Earnings Per Share: {props.overviewData.EPS}
      </div>
      <div>
        Shares Outstanding: {(props.overviewData.SharesOutstanding / 1000000).toFixed(2)}M
      </div>
      <div>
        Shares Float: {(props.overviewData.SharesFloat / 1000000).toFixed(2)}M
      </div>
      <div>
        Shares Short: {(props.overviewData.SharesShort / 1000000).toFixed(2)}M
      </div>
    </div>
  )
}

export default Overview