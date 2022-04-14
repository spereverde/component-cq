<svelte:options accessors />

<script>
  import { onMount } from "svelte";
  import { apiData, cqElements } from "./store.js";

  export let cq;
  export let languageSetting;
  let language = "";
  if ((languageSetting = "en")) {
    language = "-en";
  }

  let apiBaseUrl = "https://search-es6.q.icts.kuleuven.be/oa";
  let url = apiBaseUrl + language + "/_doc/" + cq;

  onMount(async () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        apiData.set(data);
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  });
</script>

<main>
  <h1 class="hidden">CQ: {cq}</h1>

  {#each $cqElements as cq}
    <p><strong>{cq.programmeTitle}</strong></p>
    <p>{cq.city}</p>
    <p>{cq.educationalLevel}</p>
    <p>{cq.credits}</p>
    <p>{cq.dhoLanguage}</p>
  {/each}
</main>

<style>
</style>
