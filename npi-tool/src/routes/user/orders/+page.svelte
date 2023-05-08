<script>
    import OrderTable from "$lib/OrderTable.svelte";
	import Navbar from "$lib/navbar.svelte";
    export let data;
    const { rows, columns, roles } = data;
    const role = roles;
</script>

<h1>My Orders</h1>
<OrderTable {rows} {columns}/>
<Navbar {role} />