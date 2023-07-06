<script>
    /** @type {import('./$types').PageData} */
    import Spreadsheet from '$lib/dashboard/user/Dashboard_User.svelte';
    
    export let data;
    let { tableData, assignmentData, engineer_dict } = data;
</script>

<Spreadsheet {tableData} {assignmentData} {engineer_dict} />
