/* no React USAR O Redux */
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        user: null
    },
    mutations: {
        toogleMenu(state, isVisible) {
            if (!state.user) {
                state.isMenuVisible = false
                return  
            }

            if (isVisible === undefined) {
                state.isMenuVisible = !this.state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user) {  /* SE HOUVER USUÁRIO / MENU VÁLIDO*/
            state.user = user  
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.name}`  
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})