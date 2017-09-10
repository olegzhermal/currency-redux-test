import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import CurrencyInput from 'react-currency-input'
import {
  changeBaseCurrency,
  changeBaseCurrencyQ,
  selectExchangeCurrency,
  changeExchangeCurrency,
  deleteExchangeCurrency
} from '../AC'

class Converter extends Component {
  changeBaseCurrencyQuantity = ({target: { value: quantity }}) => {
    this.setState({ quantity })
  }

  changeBaseCurrency = currency => {
    if (currency) this.props.changeBaseCurrency(currency.value)
      else this.props.changeBaseCurrency(undefined)
  }
  changeBaseCurrencyQ = quantity => {
    this.props.changeBaseCurrencyQ(quantity)
  }

  selectExchangeCurrency = id => currency => {
    if (!currency) {
      this.props.deleteExchangeCurrency(id);
    } else if (!this.props.selected.includes(currency.value)){
      if (id) {
        this.props.changeExchangeCurrency(id, currency.value)
      } else {
        this.props.selectExchangeCurrency(currency.value)
      }
    }
  }

  render() {
    const { exchangeRates, baseCurrency, baseCurrencyQ, selected } = this.props
    const filteredExchangeRates = exchangeRates.filter(({ ticker }) => !selected.includes(ticker))


    const baseSelectOptions = exchangeRates.map(({ currency, ticker }) => ({
      label: currency,
      value: ticker,
    }))
    const selectOptions = filteredExchangeRates.map(({ currency, ticker }) => ({
      label: currency,
      value: ticker,
    }))

    const selectedCurrenciesFields = selected.length === 0 ? null :
      selected.map( (ticker, index) => {
        const baseCurrencyQuantityNumber = baseCurrencyQ ? +baseCurrencyQ.replace(/\s/g,'') : undefined
        const baseCurrencyRateRub = baseCurrency ? exchangeRates.find(element => element.ticker === baseCurrency).rate : null
        const currencyRateRub = exchangeRates.find(element => element.ticker === ticker).rate
        const exchangeRate = baseCurrencyRateRub ? baseCurrencyRateRub/currencyRateRub * baseCurrencyQuantityNumber : null

        const exchangeRateMessage = baseCurrency && baseCurrencyQ ?
          `${exchangeRate.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} за ${baseCurrencyQ} ${baseCurrency}` :
          `не введена базовая валюта или количество`

        return (
          <div key={ `${ticker}-${index}` } className='currency_box'>
            <Select
              name="exchange_currency"
              value={ ticker }
              options={ baseSelectOptions }
              onChange={ this.selectExchangeCurrency(ticker) }
            />
            <div className="exchange_rate">{ exchangeRateMessage }</div>
          </div>
        )
      })

    return (
      <div>
        <div className='currency_box base_currency_box'>
          <Select
            name="base_currency"
            placeholder="Базовая валюта"
            value={ baseCurrency }
            options={ baseSelectOptions }
            onChange={ this.changeBaseCurrency }
          />
          <CurrencyInput
            decimalSeparator="."
            thousandSeparator=" "
            value={ baseCurrencyQ }
            onChange={ this.changeBaseCurrencyQ }
          />
        </div>

        <hr />

        {selectedCurrenciesFields}

        <div className='currency_box'>
          <Select
            name="exchange_currency"
            placeholder="Добавьте валюту"
            value="one"
            options={selectOptions}
            onChange={this.selectExchangeCurrency()}
          />
        </div>
      </div>
    )
  }
}


export default connect(({ rates: { exchangeRates, baseCurrency, baseCurrencyQ, selected } }) => ({
  exchangeRates,
  baseCurrency,
  baseCurrencyQ,
  selected
}), {
  changeBaseCurrency,
  changeBaseCurrencyQ,
  selectExchangeCurrency,
  changeExchangeCurrency,
  deleteExchangeCurrency
})(Converter)
