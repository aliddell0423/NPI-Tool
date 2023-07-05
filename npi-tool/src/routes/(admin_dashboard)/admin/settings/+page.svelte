<script>
    import Settings from '$lib/dashboard/admin/Settings_Accordion_Admin.svelte';
    export let data;
    export let { holidays } = data;
</script>

<h1>This is the settings page.</h1>

<Settings {holidays}/>
