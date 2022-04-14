import { writable, derived } from "svelte/store";

/** Store for your data. 
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/
export const apiData = writable([]);

/** Data transformation.
For our use case, we only care about some values inside the ProgrammeSet of the CQ information.
Here, we'll create a derived store to hold the CQ elements we need to display.
**/
export const cqElements = derived(apiData, ($apiData) => {
  if ($apiData._source) {
    // console.log($apiData._source.ProgrammeSet);
    let cq_data = $apiData._source.ProgrammeSet.map(
      (programmeTitle) => programmeTitle,
      (city) => city,
      (educationLevel) => educationalLevel,
      (credits) => credits,
      (dhoLanguage) => dhoLanguage
    );
    console.log(cq_data);
    return cq_data;
  }
  return [];
});
