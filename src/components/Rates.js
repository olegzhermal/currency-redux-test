import React, { Component } from 'react'
import { connect } from 'react-redux'

class Rates extends Component {
  render() {
    const exchangeRates = this.props.exchangeRates.map(({ pair, rate }) => (
      <tr key={ pair }>
        <td>{pair}</td>
        <td>{rate}</td>
      </tr>
    ))
    return (
      <table>
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
