const request = require('postman-request')
const url ='http://api.weatherstack.com/current?access_key=70175a9ccb387aac7a88e9f249fdc190&query=-0.8951988971758919,%20100.34998187681799'
request({ url: url}, (eror, response) => {
    // console.log(response)
const data = JSON.parse(response.body)
// console.log(data)
// console.log(data.current)
console.log(data.current.temperature)
})