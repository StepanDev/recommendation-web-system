const rp = require('request-promise')
const utf8 = require('utf8');
const LASTFM_API = "blabla"
const API_KEY = "bla"

async function sendRequestToLastFm(httpMethod, method, body, query = {}) {
    try {
        const qs = {
            format: "json",
            method,
            api_key: API_KEY,
            ...query,
        }
        const r = await rp({ uri: `${LASTFM_API}`, method: httpMethod, body, qs, json: true });
        // console.log(r)
        return r;
    } catch (e) {
        console.error(e)
        return
    }
}

async function getSession(token) {
    const method = 'auth.getSession';
    const api_sig = utf8.encode(`api_key${API_KEY}method${method}token${token}`);
    const query = { token }
    return sendRequestToLastFm(method)
}

module.exports = {
    getSession,
    sendRequestToLastFm,
}