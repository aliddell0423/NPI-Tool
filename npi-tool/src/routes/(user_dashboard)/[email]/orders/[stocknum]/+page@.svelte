<!-- Tabbed interface component -->
<!-- Example usage of tabbed interface component -->
<script>
  import TabbedInterface from '$lib/dashboard/user/TabbedInterface.svelte';
  import { SpeedDial, SpeedDialButton, Button } from 'flowbite-svelte';

  export let data;

  const { files_dict, customers, ccl_path } = data;
  
</script>

<TabbedInterface {files_dict} {customers} {ccl_path}/>

<a href="../"><Button class="mt-12">Go back</Button></a>

<SpeedDial defaultClass="absolute right-2 bottom-6" trigger="hover" tooltip="left">
  <SpeedDialButton name="Release to Pilot">
  </SpeedDialButton>
</SpeedDial>