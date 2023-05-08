<script>
    /** @type {import('./$types').PageData} */
    import Spreadsheet from '$lib/dashboard/admin/Dashboard_Admin.svelte';
    
    export let data;
    export let { orderColumns, first_name, roles, orders, names } = data;
    export let rows = orders;
    export let columns = orderColumns;
    export let options = names;
    export let rowString;

    $: rowString = JSON.stringify(rows);
   
</script>

<head>
  <title>
    NPI dashboard for {first_name}
  </title>
</head>

<h1>Admin Dashboard</h1>

<form style="display:flex;" method="post">
  <Spreadsheet {columns} bind:rows = {rows} {options}/>
  <input
    type="hidden"
    name="rows"
    bind:value={rowString}
    >
  <button type="submit" formaction="?/pushTableChanges">Push Table Data</button>
</form>


<p>Your role is {roles}</p>
<button onclick="window.location.href='/logout';">Hello {first_name}, logout</button>
