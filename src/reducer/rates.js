import { UPDATE_RATES, CHANGE_BASE_CURRENCY, SELECT_EXCHANGE_CURRENCY, DELETE_EXCHANGE_CURRENCY } from '../constants'

const defaultState = {
  exchangeRates: [],
  selected: [],
  baseCurrency: undefined
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_RATES:
      return { ...state, exchangeRates: payload }

    case CHANGE_BASE_CURRENCY:
      return { ...state, baseCurrency: payload }

    case SELECT_EXCHANGE_CURRENCY:
      return { ...state, selected: [...state.selected, payload] }

    case DELETE_EXCHANGE_CURRENCY:
      return { ...state, selected: state.selected.filter(ticker => ticker !== payload) }

    default: return state
  }

}
