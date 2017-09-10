import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import store from '../store'
import { changeBaseCurrency, selectExchangeCurrency, deleteExchangeCurrency } from '../AC'

class Converter extends Component {
  state = {
    quantity: 0
  }

  changeBaseCurrencyQuantity = ({target: { value: quantity }}) => {
    this.setState({ quantity })
  }

  changeBaseCurrency = currency => {
    if (currency) this.props.changeBaseCurrency(currency.value)
      else this.props.changeBaseCurrency(undefined)
  }

  selectExchangeCurrency = id => currency => {
    if (!currency) {
      this.props.deleteExchangeCurrency(id);
    } else {
      this.props.selectExchangeCurrency(currency.value)
    }
  }

  render() {
    const { exchangeRates, baseCurrency, selected } = this.props
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
        const baseCurrencyRateRub = baseCurrency ? exchangeRates.find(element => element.ticker === baseCurrency).rate : null
        const currencyRateRub = exchangeRates.find(element => element.ticker === ticker).rate
        const exchangeRate = baseCurrencyRateRub ? baseCurrencyRateRub/currencyRateRub * this.state.quantity : null

        const exchangeRateMessage = baseCurrency && this.state.quantity ?
          `${exchangeRate} за ${this.state.quantity} ед. базовой валюты` :
          `для получения обменного курса нужно выбрать базовую валюту и количество`

        return (
          <div key={ `${ticker}-${index}` }>
            <Select
              name="exchange_currency"
              value={ ticker }
              options={ baseSelectOptions }
              onChange={ this.selectExchangeCurrency(ticker) }
            />
            <div>{ exchangeRateMessage }</div>
            <button onClick={() => {}}>Удалить</button>
          </div>
        )
      })

    return (
      <div>
        <div>
          <label htmlFor="baseCurrency">Базовая валюта</label>
          <Select
            name="base_currency"
            value={ baseCurrency }
            options={ baseSelectOptions }
            onChange={ this.changeBaseCurrency }
          />
          Количество <input type="text" id="baseCurrency" onChange={this.changeBaseCurrencyQuantity} />
        </div>

        {selectedCurrenciesFields}
        <div>
          <Select
            name="exchange_currency"
            value="one"
            options={selectOptions}
            onChange={this.selectExchangeCurrency()}
          />
          <div>Здесь будет отображаться курс обмена</div>
          <button onClick={() => {}}>Удалить</button>
        </div>
      </div>
    )
  }
}


export default connect(({ rates: { exchangeRates, baseCurrency, selected } }) => ({
  exchangeRates,
  baseCurrency,
  selected
}), { changeBaseCurrency, selectExchangeCurrency, deleteExchangeCurrency })(Converter)
