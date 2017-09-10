import React, { Component } from 'react'
import { connect } from 'react-redux'

class Rates extends Component {
  render() {
    const exchangeRates = this.props.exchangeRates.map(({ currency, rate }) => (
      <tr key={ currency }>
        <td>{currency}</td>
        <td>{rate}</td>
      </tr>
    ))
    return (
      <table className="rates_table">
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
          </tr>
        </thead>
        <tbody>
          { exchangeRates }
        </tbody>
      </table>
    )
  }
}


export default connect(({ rates: { exchangeRates } }) => ({
  exchangeRates
}))(Rates)
