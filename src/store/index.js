import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducer'
import simpleLogger from '../middlewares/simpleLogger'

const enhancer = compose(applyMiddleware(simpleLogger))

const store = createStore(reducer, {}, enhancer)

export default store
