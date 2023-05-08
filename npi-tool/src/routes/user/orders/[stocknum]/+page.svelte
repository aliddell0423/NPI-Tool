<!-- Tabbed interface component -->
<!-- Example usage of tabbed interface component -->
<script>
  import TabbedInterface from '$lib/orderfiles/TabbedInterface.svelte';

  export let data;

  const { files_dict } = data;

  console.log(files_dict);
  
  let tabs = [];
  for (const dir of Object.getOwnPropertyNames(files_dict)) {
    tabs.push({
      title: dir,
      content: files_dict[dir]
    });
  }

  function addTab() {
    tabs = [...tabs, {
      title: `Tab ${tabs.length + 1}`,
    }];
  }
</script>

<TabbedInterface {tabs} />
<button on:click={addTab}>Add Tab</button>
<button><a href="../">Go back</a></button>
