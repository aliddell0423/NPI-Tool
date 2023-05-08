<script>
  export let options, checkedList;
  import { selectedOptions } from "./dashboard_buffer.js"

  function updateStore() {
    selectedOptions.update(selections => checkedList);
  }

</script>

<div style="width: 200px; height: 100px; overflow-y: auto;">
  {#each options as option}
    <div>
      <input type="checkbox" bind:group={checkedList} value={option} on:change={updateStore}>
      <label for={option}>{option}</label>
    </div>
  {/each}
</div>
