import React from 'react'
import Overview from './overview.jsx'
import IncomeStatement from './incomeStatement.jsx'
import BalanceSheet from './balanceSheet.jsx'
import CashFlowStatement from './cashFlowStatement.jsx'
import ComparisonAnalysis from './comparisons.jsx'
import Graph from './graph.jsx'

const Financials = (props) => {
  return (
    <div>
      <Graph incomeStatementData={props.incomeStatementData}/>
      <ComparisonAnalysis
        companies={props.companies}
        getTickerFinancials={props.getTickerFinancials}
        removeCompany={props.removeCompany}
        changeCurrentTickerDisplay={props.changeCurrentTickerDisplay}
        handleTickerFormSubmit={props.handleTickerFormSubmit}
        handleTickerOnChange={props.handleTickerOnChange}
        ticker={props.ticker}
      />
      <Overview overviewData={props.overviewData}/>
      <IncomeStatement incomeStatementData={props.incomeStatementData}/>
      <BalanceSheet balanceSheetData={props.balanceSheetData}/>
      <CashFlowStatement cashFlowStatementData={props.cashFlowStatementData}/>
    </div>
  )
}

export default Financials