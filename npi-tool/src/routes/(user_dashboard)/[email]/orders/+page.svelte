<script>
    import OrderTable from "$lib/dashboard/user/OrderTable.svelte";
    export let data;
    const { tableData, email } = data;
</script>

<h1>My Orders</h1>
<OrderTable {tableData} {email}/>