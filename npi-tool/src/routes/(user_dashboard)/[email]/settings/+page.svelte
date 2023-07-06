<script>
    import Settings from '$lib/dashboard/user/Settings_Accordion_User.svelte';
    export let data;
    export let { email, time_off } = data;
</script>

<h1>This is the settings page.</h1>

<Settings {email} {time_off}/>
