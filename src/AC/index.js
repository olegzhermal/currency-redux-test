import { UPDATE_RATES, CHANGE_BASE_CURRENCY } from '../constants'
import currencies from '../fixtures/currencies'
import getRatePromises from '../helpers/getRatePromises'

export function updateRates(dispatch) {
  Promise.all(getRatePromises(currencies)).then(values => {
    const rates = values.map(({ text }) => {
      const { query:
        { results:
          { row: { col0: pair, col1: rate} }
        }
      } = JSON.parse(text)
      return { pair, rate }
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
