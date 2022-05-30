<template>
  <h1 class="font-bold text-3xl text-gray-900">News</h1>
    <ul v-for="article in articles" class="rounded overflow-hidden shadow-lg">
      <li class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ article.author }}</div>
        <p class="text-gray-700 text-base">
          {{ article.title }}
        </p>
      </li>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#news</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#blog</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#bbc</span>
      </div>
    </ul>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from 'vuex';
import { computed } from 'vue'

const articles = computed(() => store.getters.articles)

const store = useStore();

function getArticles() {
  fetch('https://newsapi.org/v2/everything?q=tesla&from=2022-04-30&sortBy=publishedAt&apiKey=d65ac836229f486888026243f47931b0')
    .then(res => res.json())
    .then((data) => {
      store.dispatch('getArticles', data.articles);
    })
    .catch((err) => console.log(err))
}

onMounted(() => {
  getArticles();
});
</script>