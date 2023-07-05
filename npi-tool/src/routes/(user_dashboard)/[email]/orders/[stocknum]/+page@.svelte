<!-- Tabbed interface component -->
<!-- Example usage of tabbed interface component -->
<script>
  import TabbedInterface from '$lib/orderfiles/TabbedInterface.svelte';

  export let data;

  const { files_dict, customers, ccl_path } = data;
  
  let tabs = [];
  for (const dir of Object.getOwnPropertyNames(files_dict)) {
    tabs.push({
      title: dir,
      content: files_dict[dir]
    });
  }
</script>

<TabbedInterface {tabs} {customers} {ccl_path}/>
<button><a href="../">Go back</a></button>
