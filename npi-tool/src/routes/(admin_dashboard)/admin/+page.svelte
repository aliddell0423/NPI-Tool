<script>
    /** @type {import('./$types').PageData} */
    import Spreadsheet from '$lib/dashboard/admin/Dashboard_Admin.svelte';
    
    export let data;
    let { tableData, assignmentData, engineer_dict, adminEmail } = data;
</script>

<Spreadsheet {tableData} {assignmentData} {engineer_dict} {adminEmail} />


