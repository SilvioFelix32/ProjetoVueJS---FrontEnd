import Vue from 'vue'

export const userKey = '__usuario-inicial'
export const baseApiUrl = 'http://lolcalhost:3306'  /* porta do MySQL */

export function showError(e) { /* e = erro, mensagem de erro pro backend */
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }