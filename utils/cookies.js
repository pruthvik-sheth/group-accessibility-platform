const cookie = require('cookie')

const setCookies = (res, { token, email, id }) => {
    res.cookie('token', token, { httpOnly: true })
    res.cookie('email', email, { httpOnly: true })
    res.cookie('auth-uid', id)
}

const clearCookies = (res) => {
    res.clearCookie('token')
    res.clearCookie('email')
    res.clearCookie('auth-uid')
}

const cookieParser = (req, res, next) => {
    const headersCookie = req.headers.cookie
    if (headersCookie) {
        const cookies = cookie.parse(req.headers.cookie)
        req.cookies = cookies
    }
    next()
}

module.exports = { setCookies, clearCookies, cookieParser }