import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import store from './store'
import { updateRates } from './AC'
import Converter from './components/Converter'
import Rates from './components/Rates'
import './App.css'

export default class App extends Component {
  componentWillMount() {
    // console.log(this.props.updateRates());
    updateRates(store.dispatch)
  }

  render() {
    return (
      <Provider store = {store}>
        <Tabs>
         <TabList>
           <Tab>Курсы</Tab>
           <Tab>Конвертер</Tab>
         </TabList>

         <TabPanel>
           <Rates />
         </TabPanel>
         <TabPanel>
           <Converter />
         </TabPanel>
       </Tabs>
     </Provider>
    );
  }
}
