<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Digite para filtrar..."
                v-model="treeFilter" class="filter-field">
        </div>
        <Tree :data="treeData" :options="treeOptions"
           :filter="treeFilter" ref="tree"></Tree>
    </aside>
</template>

<script>
import { mapState } from 'vuex'
import Tree from 'liquor-tree'
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {    
    name: 'Menu',
    components: { Tree },
    computed: mapState(['isMenuVisible']),
    data: function() {
        return {
            treeFilter: '',
            treeData: this.getTreeData(),
            treeOptions: {
                propertyNames: { 'text': 'name' },
                filter: {
                    emptyText: 'Categoria não encontrada'
                }
            }
        }
    },
    methods: {
        getTreeData() {
            const url = `${baseApiUrl}/categories/tree`
            return axios.get(url).then(res => res.data)  /* Retornei uma promisse com o liquor-tree */
        },
        onNodeSelect(node) { /* navegação do link no menu */
            this.$router.push({
                name:'articlesByCategory',
                params: { id: node.id }
            })

            if(this.$mq === 'xs' || this.$mq === 'sm') {
                this.$store.commit('toogleMenu', false) 
            }
        }
    },
    mounted() {
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345); 
        /* MUDAR COR DO MENU A ESQUERDA - BACKGROUND: LINEAR-GRADIENT (to right, color 1, color2)*/

        display: flex;
        flex-direction: column;
        flex-wrap: wrap; /* permitir quebra de linha */
    }

    .menu a,
    .menu a:hover {
        color: white;
        text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover{
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child {
        filter: brightness(2);
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        margin-bottom: 8px;
        border-bottom: 1px solid white;

    }

    .menu .menu-filter i {
        color: white;
        margin-right: 10px;
    }

    .menu input {
        color: whitesmoke;
        font-size: 1.3rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty {
        color: whitesmoke;
        font-size: 1.3rem;
        margin-left: 20px;
    }
</style>