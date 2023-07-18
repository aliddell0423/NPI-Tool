<!-- Tabbed interface component -->
<!-- Example usage of tabbed interface component -->
<script>
  import TabbedInterface from '$lib/dashboard/user/TabbedInterface.svelte';
  import { Button } from 'flowbite-svelte';

  export let data;

  const { files_dict, customers, ccl_path } = data;
  
</script>

<TabbedInterface {files_dict} {customers} {ccl_path}/>
<a href="../"><Button class="mt-12">Go back</Button></a>
