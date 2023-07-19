<script>
  import { Tabs, TabItem, Button } from 'flowbite-svelte';

  export let files_dict;

  export let currentFiles = {};
  export let directoryStack = [];
  
  export function changeTab(tab) {
    currentFiles = files_dict[tab];
    directoryStack = [];
  }

  export function descendFile(file) {
    directoryStack.push(currentFiles);
    currentFiles = currentFiles[file];
  }

  export function ascendDirectory() {
    if (directoryStack.length > 0) {
      currentFiles = directoryStack.pop(); // Pop the top directory from the stack
    }
  }

</script>
<Tabs style="full" defaultClass="flex">
  {#each Object.keys(files_dict) as tab}
  <TabItem title={tab} on:click={() => changeTab(tab)} class="w-full">
    <div style="max-height: 500px;" class="overflow-y-scroll">
      {#if directoryStack.length > 0}
        <div class="mb-6">
          <Button on:click={ascendDirectory}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>

          </Button>
        </div>
      {/if}
      {#each Object.keys(currentFiles) as file}
        {#if currentFiles[file]}
        <p class="cursor-pointer" on:click={() => descendFile(file)}>{file + "/"}</p>
        {:else}
        <p>{file}</p>
        {/if}
      {/each}
    </div>
  </TabItem>
  {/each}
</Tabs>
