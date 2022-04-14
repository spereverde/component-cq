<script>
  import { onMount } from "svelte";
  import { apiData, cqElements } from "./store.js";

  onMount(async () => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        apiData.set(data);
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  });
  export let cq;
</script>

<main>
  <h1>CQ: {cq}</h1>
  <ul>
    {#each $cqElements as cqElement}
      <li>{cqElement}</li>
    {/each}
  </ul>
</main>

<style>
</style>
