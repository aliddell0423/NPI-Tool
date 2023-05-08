<!-- Tabbed interface component -->
<script>
  let activeTabIndex = 0;
  export let tabs;
</script>

<ul class="tabs">
  {#each tabs as tab, i}
    <li class:tab class:active="{activeTabIndex === i}" on:click={() => activeTabIndex = i}>{tab.title}</li>
  {/each}
</ul>

<div class="tab-panel">
    <ul>
      {#each tabs[activeTabIndex].content as file}
      {#if file.split(".").length === 2}
        <li>
          {file}
        </li>
      {:else}
        <li>
          <button>
            {file + "/"}
          </button>
        </li>
      {/if}
      {/each}
    </ul>
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
</style>