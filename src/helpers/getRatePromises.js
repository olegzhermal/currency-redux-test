import request from 'superagent'

function getRate(currency, resolve) {
    const url = `https://query.yahooapis.com/v1/public/yql?q=select * from csv where url%3D%22http%3A%2F%2Ffinance.yahoo.com%2Fd%2Fquotes.csv%3Fe%3D.csv%26f%3Dnl1d1t1%26s%3D${currency}rub%3DX%22%3B&format=json&callback=`
    request
      .get(url)
      .end((err, res) => {
        resolve(res)
      })
}

const getRatePromises = currencies => (
  currencies.map(currency => {
    return new Promise((resolve, rej) => {
      getRate(currency, resolve);
    })
  })
)

export default getRatePromises
