const CORS = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.set('Access-Control-Allow-Credentials', true)
    res.set('Access-Control-Allow-Methods', ['GET', 'POST', 'OPTIONS'])
    res.set('Access-Control-Allow-Headers', ['Origin', 'Content-Type', 'Accept'])
    next()
}

module.exports = CORS