import { UPDATE_RATES, CHANGE_BASE_CURRENCY, DELETE_BASE_CURRENCY } from '../constants'

const defaultState = {
  exchangeRates: [],
  selected: [],
  baseCurrency: ''
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_RATES:
      return { ...state, exchangeRates: payload }

    case CHANGE_BASE_CURRENCY:
      return { ...state, baseCurrency: payload }
  }

  return state
}
