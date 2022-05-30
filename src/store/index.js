import { createStore } from 'vuex'

export default createStore({
  state: {
    articles: [],
    isAuth: false,
  },
  getters: {
    articles(state) {
      return state.articles;
    }
  },
  mutations: {
    setArticles(state, articles) {
      state.articles = articles;
    },
    setIsAuth(state, isAuth) {
      state.isAuth = isAuth;
    }
  },
  actions: {
    getArticles(context, articles) {
      context.commit('setArticles', articles);
    }
  },
  modules: {
  }
})
