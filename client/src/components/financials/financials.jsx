import React from 'react'
import Overview from './overview.jsx'
import IncomeStatement from './incomeStatement.jsx'

const Financials = (props) => {
  return (
    <div>
      <Overview overviewData={props.overviewData}/>
      <IncomeStatement incomeStatementData={props.incomeStatementData}/>
      <div>
        Balance Sheet
      </div>
      <div>
        Cash Flow Statement
      </div>
      <div>
        Comparison Analysis
      </div>
    </div>
  )
}

export default Financials