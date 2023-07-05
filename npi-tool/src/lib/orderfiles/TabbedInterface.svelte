<!-- Tabbed interface component -->
<script>
  let activeTabIndex = 0;
  export let tabs, customers, selectedValue, selected_customer, selected_build, ccl_path;
  let current_display;
  let prev_dict_path = [];
  let current_path = [tabs[activeTabIndex].title];
  let customer_selected = false;

  $: current_dict_path = tabs[activeTabIndex].content;
  $: current_dir = tabs[activeTabIndex].content;
  $: current_display = Object.keys(current_dir);
  $: selected_customer = selectedValue;

  function descend_directory(directory) {
    prev_dict_path.push(current_dict_path);
    current_dict_path = current_dict_path[directory];
    current_dir = current_dict_path;
    current_path.push(directory);
  }

  function ascend_directory() {
    if (prev_dict_path.length > 0) {
      current_dict_path = prev_dict_path.pop();
      current_dir = current_dict_path;
    }
  
  }

  function change_tabs(tab_index) {
    activeTabIndex = tab_index;
    current_path = [tabs[activeTabIndex].title];
  }

  function select_customer() {
    customer_selected = !customer_selected
    selected_customer = selectedValue;
  }


</script>


<ul class="tabs">
  {#each tabs as tab, i}
    <li class:tab class:active="{activeTabIndex === i}" on:click={() => change_tabs(i)}>{tab.title}</li>
  {/each}
</ul>

<div class="tab-panel">

{#if tabs[activeTabIndex].title === "CCL"}

  {#if ccl_path}
  <p>Path found!</p>
  {:else}

  <div>
    <form method="post">

      <select name="Customer" bind:value={selectedValue} on:change={() => selected_build = null}>
        {#each Object.keys(customers) as customer}
          <option>{customer}</option>
        {/each}
      </select>
      {#if selected_customer}
        <select name="Build" bind:value={selected_build}>
          {#each customers[selected_customer] as build}
            <option>{build}</option>
          {/each}
        </select>

        <button type="submit" formaction="?/postCCL">
          Get CCL
        </button>
      {/if}
    </form>

  </div>
  {/if}

{:else}

  <div class="back_button">
    <button on:click={ascend_directory}>&lt=====</button>
  </div>
    <ul>
      {#each current_display as file}
      {#if !current_dict_path[file]}
        <li>
          {file}
        </li>
      {:else}
        <li>
          <button on:click={() => descend_directory(file)}>
            {file + "/"}
          </button>
        </li>
      {/if}
      {/each}
    </ul>
  {/if}
</div>

<style>
  .tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .tab {
    cursor: pointer;
    margin-right: 1rem;
    padding: 0.5rem;
    border-radius: 0.25rem 0.25rem 0 0;
    color: #333;
    background-color: #f0f0f0;
  }

  .active {
    color: #fff;
    background-color: #333;
  }

  .tab-panel {
    border: 1px solid #ddd;
    border-radius: 0 0.25rem 0.25rem 0.25rem;
    padding: 1rem;
  }

  .back_button {
    padding-bottom: 20px;
  }
</style>