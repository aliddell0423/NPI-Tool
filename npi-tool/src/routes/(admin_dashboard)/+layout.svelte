<script>
    /** @type {import('./$types').PageData} */
    import Navbar from '$lib/dashboard/admin/Navbar_Admin.svelte'
    
    export let data;
    export let { first_name, last_name, email, roles, notifications } = data;

</script>

<head>
  <title>
    NPI dashboard for {first_name} {last_name}
  </title>
</head>
<div class="space-y-8">
    <slot/>

<Navbar {notifications}/>

</div>