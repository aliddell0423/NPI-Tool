<script>
    /** @type {import('./$types').PageData} */
    import Navbar from '$lib/dashboard/user/Navbar_User.svelte'

    export let data;
    export let { first_name, last_name, roles, email, notifications } = data;
</script>

<head>
  <title>
    NPI dashboard for {first_name} {last_name}
  </title>
</head>

<slot/>

<Navbar {email} {notifications}/>


