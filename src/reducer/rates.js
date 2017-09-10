import {
  UPDATE_RATES,
  CHANGE_BASE_CURRENCY,
  CHANGE_BASE_CURRENCY_Q,
  SELECT_EXCHANGE_CURRENCY,
  CHANGE_EXCHANGE_CURRENCY,
  DELETE_EXCHANGE_CURRENCY
} from '../constants'

const defaultState = {
  exchangeRates: [],
  selected: [],
  baseCurrency: undefined,
  baseCurrencyQ: 0
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_RATES:
      return { ...state, exchangeRates: payload }

    case CHANGE_BASE_CURRENCY:
      return { ...state, baseCurrency: payload }

    case CHANGE_BASE_CURRENCY_Q:
      return { ...state, baseCurrencyQ: payload }

    case CHANGE_EXCHANGE_CURRENCY:
      const { prevTicker, newTicker } = payload
      const indexToChange = state.selected.findIndex(ticker => ticker === prevTicker)
      const newSelected = state.selected.slice()
      newSelected.splice(indexToChange, 1, newTicker)
      return { ...state, selected: newSelected }

    case SELECT_EXCHANGE_CURRENCY:
      return { ...state, selected: [...state.selected, payload] }

    case DELETE_EXCHANGE_CURRENCY:
      return { ...state, selected: state.selected.filter(ticker => ticker !== payload) }

    default: return state
  }

}
