<svelte:options tag="cq-component" />
<svelte:head>
    <!-- both this and import at the bottom seems to be needed to make the icons work -->
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Material+Icons&family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Source+Serif+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap");
    </style>
</svelte:head>
<script>
    import { apiData, cqElements } from "./store.js";

    export let cq;
    export let language_setting;
    let language = "";
    $: if ((language_setting == "en")) {
      language = "-en";
    }
  
    let apiBaseUrl = "https://search-es6.q.icts.kuleuven.be/oa";
    $: url = (cq != null && language != null)? apiBaseUrl + language + "/_doc/" + cq : null;

    $: console.log("url:" + url);

    $: if (url != null){
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          apiData.set(data);
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
    }

    // $: console.log("language_setting: "+language_setting);
    // console.log("cq: "+cq);

    // fetch(url)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //       apiData.set(data);
    //     })
  
    // onMount(async () => {
    //     await tick();
    //     console.log("in onMount");
    //     let url = apiBaseUrl + language + "/_doc/" + cq;
    //     console.log("in onmount url: "+url);
    //   fetch(url)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       // console.log(data);
    //       apiData.set(data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       return [];
    //     });
    // });
  </script>
  
<div>
    <!-- <link rel='stylesheet' href="https://fonts.googleapis.com/css2?family=Material+Icons&family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Source+Serif+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"> -->

    <h1>CQ: {cq}</h1>
    <div>
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
</div>
  
<style>
    @import url("https://fonts.googleapis.com/css2?family=Material+Icons&family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Source+Serif+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap");
</style>
  