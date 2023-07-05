<script>
    /** @type {import('./$types').PageData} */
    import Spreadsheet from '$lib/dashboard/admin/Dashboard_Admin.svelte';
    
    export let data;
    export let { orderColumns, orders, names } = data;
    export let rows = orders;
    export let columns = orderColumns;
    export let options = names;
    export let rowString;

    $: rowString = JSON.stringify(rows);
   
</script>



<form style="display:flex;" method="post">
  <Spreadsheet {columns} bind:rows = {rows} {options}/>
  <input
    type="hidden"
    name="rows"
    bind:value={rowString}
    >
  <button type="submit" formaction="?/pushTableChanges">Push Table Data</button>
</form>


