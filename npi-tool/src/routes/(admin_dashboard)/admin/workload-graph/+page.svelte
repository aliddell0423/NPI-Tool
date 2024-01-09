<script>
    /** @type {import('./$types').PageData} */
    import WorkloadGraph from '$lib/dashboard/admin/Workload_Graph.svelte';
    import { Range, Label } from 'flowbite-svelte';

    export let data;
    export let weeks;
    let start = 26;
    let end = 37;
    let { graph_data, eng_dict } = data;

    let total_weeks = [];
    for (let i = 1; i <= 56; i++) {
        total_weeks.push(`W${i}`);
    }

    $: weeks = total_weeks.slice(start, end);

</script>

<WorkloadGraph {graph_data} {eng_dict} bind:weeks />

<Range min="1" max="56" bind:value={start}/>