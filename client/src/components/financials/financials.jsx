import React from 'react'
import Overview from './overview.jsx'
import IncomeStatement from './incomeStatement.jsx'
import BalanceSheet from './balanceSheet.jsx'
import CashFlowStatement from './cashFlowStatement.jsx'
import ComparisonAnalysis from './comparisons.jsx'

const Financials = (props) => {
  return (
    <div>
      <Overview overviewData={props.overviewData}/>
      <IncomeStatement incomeStatementData={props.incomeStatementData}/>
      <BalanceSheet balanceSheetData={props.balanceSheetData}/>
      <CashFlowStatement cashFlowStatementData={props.cashFlowStatementData}/>
      <ComparisonAnalysis financialStatements={props}/>
    </div>
  )
}

export default Financials