<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o"
            :main="category.name" sub="Categoria"> 
            <!-- EVOLUIR CRIANDO UMA MIGRATION, COM DESCRIÇÃO DA CATEGORIA ":sub="category.description"" -->
            <ul>
                <li v-for="article in articles" :key="article.id">
                    <ArticleItem :article="article">
                        
                    </ArticleItem>
                </li>
            </ul>
            <div class="load-more">
                <button v-if="loadMore" class="btn btn-lg btn-outline-primary"
                @click="getArticles">Carregar Mais Artigos</button>
            </div>
        </PageTitle>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle.vue'
import ArticleItem from './ArticleItem.vue'
 
export default {
    nome: 'ArticlesByCategory',
    components: { PageTitle, ArticleItem },
    data: function() {
        return {
            categoy: {},
            articles: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getCategory() {
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios(url).then(res=> this.category = res.data)
        },
        getArticles() {
            const url = `${baseApiUrl}/articles/${this.category.id}/articles?page${this.page}`
             axios(url).then(res=> {
                 this.articles = this.articles.concat(res.data)
                 this.page++

                 if(res.data.lenght === 0) this.loadMore = false
             })
        }     
    },
    watch: {  /* método que faz a troca entre a navegação do menu */
        $route(to) {
            this.category.id = params.id
            this.articles = []
            this.page = 1
            this.loadMore = true 

            this.getCategory()
            this.getArticles()
        }
    },
    mounted() {
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getArticles()
    }
}
</script>

<style>
 .articles-by-category ul {
     list-style-type: none;
     padding: 0px;
 }

  .articles-by-category .load-more {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 25px;
  }
</style>