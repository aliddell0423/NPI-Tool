<script>
    import OrderTable from "$lib/dashboard/user/OrderTable.svelte";
    export let data;
    const { rows, columns } = data;
</script>

<h1>My Orders</h1>
<OrderTable {rows} {columns}/>