import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    cq: "50268948",
    languageSetting: "en",
  },
});

export default app;
