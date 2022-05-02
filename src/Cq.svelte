<svelte:options tag="cq-component" />
<svelte:head>
    <!-- both this and import at the bottom seems to be needed to make the icons work -->
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Material+Icons&family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Source+Serif+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap");
    </style>
</svelte:head>
<script>
    export let cq;
    export let language_setting;
    let language = "";
    let cqElements = []

    $: language_setting === "en" ? language = "-en" : language = "";
  
    let apiBaseUrl = "https://search-es6.q.icts.kuleuven.be/oa";
    $: url = (cq != null && language != null)? apiBaseUrl + language + "/_doc/" + cq : null;

    $: if (url != null){
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
          cqElements = map_data(data);
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
    }

    // $: console.log("cqElements: "+JSON.stringify(cqElements)); putting this in above if reactive statement causes infinte loop

    function map_data(data){
        if (data._source && data._source.ProgrammeSet) {
            let cq_data = data._source.ProgrammeSet.map(
                (programmeTitle) => programmeTitle,
                (city) => city,
                (educationLevel) => educationalLevel,
                (credits) => credits,
                (dhoLanguage) => dhoLanguage
            );
            return cq_data;
        }
        else{
            return []
        }
    }

</script>
  
<div>
    <h1>CQ: {cq}</h1>
    <div>
        {#each cqElements as cq}
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
  