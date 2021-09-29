<template>
    <header class="header">
        <a class="toogle" @click="toogleMenu" v-if="!hideToogle">
            <i class="fa fa-lg" :class="icon"></i>
        </a>
        <h1 class="title">
             <router-link to="/">{{ title }}</router-link>
        </h1>
        <UserDropdown v-if="!hideUserDropdown"> </UserDropdown>
    </header>
</template>

<script>
import UserDropdown from './UserDropdown.vue'

export default {
    name: 'Header',
    components: { UserDropdown },
    props: {
        title: String,
        hideToogle: Boolean,
        hideUserDropdown: Boolean
    },
    computed: {
        icon() { /* Icone da seta esqueda do menu */
            return  this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
        }
    },
    methods: {
        toogleMenu() {
            this.$store.commit('toogleMenu')
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background:  linear-gradient(to right, darkblue, skyblue);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        color: white;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a {
        color: white;
        text-decoration: none;
    }

    .title a:hover {
        color: white;
        text-decoration: none;
    }

    header.header > a.toogle {
        width: 60px;
        height: 100%;
        color: white;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toogle:hover {
        color: white;
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>