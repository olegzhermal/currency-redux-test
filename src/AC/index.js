import {
  UPDATE_RATES,
  CHANGE_BASE_CURRENCY,
  CHANGE_BASE_CURRENCY_Q,
  SELECT_EXCHANGE_CURRENCY,
  CHANGE_EXCHANGE_CURRENCY,
  DELETE_EXCHANGE_CURRENCY
} from '../constants'
import currencies from '../fixtures/currencies'
import getRatePromises from '../helpers/getRatePromises'

export function updateRates(dispatch) {
  const tickers = currencies.map(({ ticker }) => ticker)

  Promise.all(getRatePromises(tickers)).then(values => {
    const rates = values.map(({ text }) => {
      const { query:
        { results:
          { row: { col0: pair, col1: rate} }
        }
      } = JSON.parse(text)

      const ticker = pair.slice(0,3)
      const currency = currencies.find(element => element.ticker === ticker).name

      return {
        currency,
        ticker,
        rate
      }
    })

    dispatch({
        type: UPDATE_RATES,
        payload: rates,
    })
  })
}

export function changeBaseCurrency(baseCurrency) {
  return {
    type: CHANGE_BASE_CURRENCY,
    payload: baseCurrency,
  }
}

export function changeBaseCurrencyQ(quantity) {
  return {
    type: CHANGE_BASE_CURRENCY_Q,
    payload: quantity,
  }
}

export function selectExchangeCurrency(exchangeCurrency) {
  return {
    type: SELECT_EXCHANGE_CURRENCY,
    payload: exchangeCurrency,
  }
}

export function changeExchangeCurrency(prevTicker, newTicker) {
  return {
    type: CHANGE_EXCHANGE_CURRENCY,
    payload: { prevTicker, newTicker },
  }
}

export function deleteExchangeCurrency(exchangeCurrency) {
  return {
    type: DELETE_EXCHANGE_CURRENCY,
    payload: exchangeCurrency,
  }
}
