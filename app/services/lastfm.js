const rp = require('request-promise')
const utf8 = require('utf8');
const LASTFM_API = "http://ws.audioscrobbler.com/2.0/"
const API_KEY = "44744c0aec4d6a4e2c2584cb3dcdcc1e"

async function sendRequestToLastFm(httpMethod, method, body, query = {}) {
    try {
        const qs = {
            format: "json",
            method,
            api_key: API_KEY,
            ...query,
        }
        const r = await rp({ uri: `${LASTFM_API}`, method: httpMethod, body, qs, json: true });
        console.log(r)
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