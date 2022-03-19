export default {
  namespaced: true,
  state: ()=>({
    //假装有token
    token: localStorage.getItem("token") || "",
  }),
  mutations: {
    setToken(state, token) {
      localStorage.setItem("token", token);
    }
  }
};
