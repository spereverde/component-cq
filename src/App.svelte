<svelte:options accessors />
<svelte:head>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Material+Icons&family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Source+Serif+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap");
    </style>
</svelte:head>

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
  <div class="card-body">
  {#each $cqElements as cq}
    {#if cq.programmeTitle}
      <p><strong> {cq.programmeTitle}</strong></p>
    {/if}
    {#if cq.city}
      <p><i class="material-icons">place</i>{cq.city}</p>
    {/if}
    {#if cq.educationalLevel}
      <p><i class="material-icons">school</i> {cq.educationalLevel}</p>
    {/if}
    {#if cq.credits}
      <p><i class="material-icons">schedule</i> {Math.trunc(cq.credits)}</p>
    {/if}
    {#if cq.dhoLanguage}
      <p><i class="material-icons">language</i> {cq.dhoLanguage}</p>
    {/if}
  {/each}
  </div>
</main>

<style>
  .card-body{
    padding: 30px;
  }
</style>
