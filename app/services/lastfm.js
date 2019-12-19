const rp = require('request-promise')
const utf8 = require('utf8');
const LASTFM_API = "http://ws.audioscrobbler.com/2.0/"
const API_KEY = "44744c0aec4d6a4e2c2584cb3dcdcc1e"
const { LASTFM_METHODS, DATA_FIELD } = require('../const')

async function sendRequestToLastFm(httpMethod, method, body, query = {}) {
    try {
        const qs = {
            format: "json",
            method,
            api_key: API_KEY,
            ...query,
        }
        const r = await rp({ uri: `${LASTFM_API}`, method: httpMethod, body, qs, json: true });
        return r;
    } catch (e) {
        console.error(e)
        throw e
    }
}

async function getSession(token) {
    const method = 'auth.getSession';
    const api_sig = utf8.encode(`api_key${API_KEY}method${method}token${token}`);
    const query = { token }
    return sendRequestToLastFm(method)
}

async function handlePagination(httpMethod, method, body, query = {}) {
    // const data = await sendRequestToLastFm(httpMethod, method, body, query);
return  await sendRequestToLastFm(httpMethod, method, body, query);

    const field = DATA_FIELD[method];

    if (!field)
        throw 'No such LASTFM method';

    const metaData = data[field]['@attr'];

    const { totalPages } = metaData;
    if (totalPages <= 1)
        return data;
    let paginationRequests = []
    for (let i = 2; i <= totalPages; i++) {
        paginationRequests.push(
            sendRequestToLastFm(httpMethod, method, body, { ...query, page: i })
        )
    }
    const restPages = await Promise.all(paginationRequests);
    restPages.forEach(page => {
        // TODO hardcode

        data[field].track.push(...page[field].track);
    })
    return data 
}

module.exports = {
    getSession,
    sendRequestToLastFm,
    handlePagination,
}