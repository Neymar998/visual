const express = require('express')
const axios = require('axios')
const app = express()
const data = require('./data.json')
const router = express.Router()

router.get('/', async (req, res) => {
    // const result = await axios.post('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf')
    // res.json({
    //     ...result.data.data
    // })
    res.send(data)
})

app.use('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
app.use('/', router)

app.listen(8080, () => {
    console.log('http://localhost:8080');
})