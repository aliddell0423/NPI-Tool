<script>
    /** @type {import('./$types').PageData} */
    import Navbar from '$lib/Navbar.svelte'
    import Spreadsheet from '$lib/dashboard/user/Dashboard_User.svelte';

    export let data;
    export let { orderColumns, first_name, roles, orders } = data;
    export let rows = orders;
    export let columns = orderColumns;
    export let role = roles;
</script>

<head>
  <title>
    NPI dashboard for {first_name}
  </title>
</head>

<h1>User Dashboard</h1>

<Spreadsheet {columns} {rows} />

<Navbar {role}/>


