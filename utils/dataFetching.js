import cookie from 'cookie'

export const fetchAPI = async (method, url, body) => {
    try {
        let data
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Accept', 'application/json')

        const request = {
            method,
            headers,
            credentials: 'include'
        }

        if (method !== 'GET' && body) {
            request.body = JSON.stringify(body)
        }

        const response = await fetch(`/api${url}`, request)

        try {
            data = await response.json()
        } catch (err) {
            console.error(err)
            throw new Error('Failed to parse Response Data')
        }

        if (!response.ok) {
            throw new Error(data.message)
        }

        return { status: response.status, data: data.body, message: data.message }
    } catch (err) {
        console.error(err)
        throw new Error(err.message || 'Something went wrong')
    }
}

export const fetchCookie = () => {
    return cookie.parse(document.cookie)
}