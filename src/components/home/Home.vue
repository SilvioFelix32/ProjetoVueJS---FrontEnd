<template>
  <div class="home">
    <PageTitle
      icon="fa fa-home"
      main="Painel de Controle"
      sub="Base de Conhecimento"
    ></PageTitle>
    <!-- ALTERAR TITULOS -->
    <div class="statistic">
      <Statistic title="Categorias" :value="statistic.categories" icon="fa fa-folder" color="#d54d50"></Statistic>
      <Statistic title="Artigos" :value="statistic.articles" icon="fa fa-file" color="#3bc480"></Statistic>
      <Statistic title="Usuários" :value="statistic.users" icon="fa fa-user" color="#3282cd"></Statistic>
      
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import Statistic from "./Statistic.vue";
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "Home",
  components: { PageTitle, Statistic },
  data: function () {
    return {
      statistic: {},
    };
  },
  methods: {
    getStatistic() {
      axios
        .get(`${baseApiUrl}/statistic`)
        .then((res) => (this.statistic = res.data));
    },
  },
  mounted() { /* quando o componente for montado, ele faz a requisição */
    this.getStatistic();
  },
};
</script>

<style>
  .statitics {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>