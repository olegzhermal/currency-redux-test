import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import store from '../store'
import { changeBaseCurrency } from '../AC'

class Converter extends Component {
  changeBaseCurrency = ({ value }) => {
    this.props.changeBaseCurrency(value)
  }

  render() {
    console.log('in converter');
    console.log(this.props);

    const selectOptions = this.props.exchangeRates.map(({ pair }) => ({
      label: pair,
      value: pair,
    }))

    return (
      <div>
        <div>
          <label htmlFor="baseCurrency">Базовая валюта</label>
          <Select
            name="base_currency"
            value="one"
            options={selectOptions}
            onChange={this.changeBaseCurrency}
          />
          <input type="text" id="baseCurrency" />
        </div>
        <div>
          <input type="text" className="currency" />
          <div>Курс обмена</div>
          <div>Удалить</div>
        </div>
        <div>Знак добавления поля</div>
      </div>
    )
  }
}


export default connect(({ rates: { exchangeRates } }) => ({
  exchangeRates
}), { changeBaseCurrency })(Converter)
