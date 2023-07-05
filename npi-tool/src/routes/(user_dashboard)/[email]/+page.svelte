<script>
    /** @type {import('./$types').PageData} */
    import Spreadsheet from '$lib/dashboard/user/Dashboard_User.svelte';

    export let data;
    export let { orderColumns, orders } = data;
    export let rows = orders;
    export let columns = orderColumns;
</script>

<h1>User Dashboard</h1>

<Spreadsheet {columns} {rows} />
