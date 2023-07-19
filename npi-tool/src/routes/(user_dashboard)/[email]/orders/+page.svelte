<script>
    import OrderTable from "$lib/dashboard/user/OrderTable.svelte";
    import { Button } from "flowbite-svelte";
    export let data;
    let selected_wo, selected_sn, selected_type, selected_build;
    const { tableList, email } = data;

    function navigateToPage() {
        window.location.href = window.location.href + `/${selected_sn}`;
    }   
    
    async function changeState(status) {
      const response = await fetch('/api/orders', {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ work_order: selected_wo, status }),
      });

      if(response.ok) {
        location.reload();
      }
    }
    
</script>

<div class="flex flex-col h-screen w-screen p-8 space-y-4">
    {#each Object.keys(tableList) as tableTitle}
        <h1>{tableTitle}</h1>
            <OrderTable tableData={tableList[tableTitle]} 
                bind:selected_wo 
                bind:selected_sn 
                bind:selected_build 
                bind:selected_type type={tableTitle}/>
    {/each}
</div>

{#if selected_wo}
    <div class="flex flex-col absolute top-12 right-12 space-y-4">
        {#if selected_type.includes("Build")}
            {#if selected_build.includes("Proto")}
                <Button size="xl" on:click={() => changeState("COMPLETE")}>Build Complete Order</Button>
            {:else}
                <Button size="xl" on:click={() => changeState("AWAIT")}>Waiting on Approval</Button>
            {/if}
        {:else if selected_type.includes("Await")}
            <Button size="xl" on:click={() => changeState("PILOT")}>Release to Pilot</Button>
        {:else}
             <Button size="xl" on:click={() => changeState("COMPLETE")}>Completed Pilot</Button>
        {/if}
        <Button size="xl" on:click={navigateToPage}>
            Edit
        </Button>
    </div>
{/if}