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
      <ComparisonAnalysis companies={props.companies} getTickerFinancials={props.getTickerFinancials} removeCompany={props.removeCompany}/>
      <IncomeStatement incomeStatementData={props.incomeStatementData}/>
      <BalanceSheet balanceSheetData={props.balanceSheetData}/>
      <CashFlowStatement cashFlowStatementData={props.cashFlowStatementData}/>
    </div>
  )
}

export default Financials