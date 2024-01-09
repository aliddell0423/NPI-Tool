<script>
    import OrderTable from "$lib/dashboard/user/OrderTable.svelte";
    import { Button, Input, Label, Checkbox, Range } from "flowbite-svelte";
    export let data;
    let selected_wo, selected_sn, selected_type, selected_build, selected_on_hold, selected_percent, selected_date;
    let new_date;
    let changeMade = false;

    let inputChange = false;
    let rangeChange = false;
    let holdChange = false;

    const { tableList, email } = data;

    $: changeMade = inputChange || rangeChange || holdChange;

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

    async function changeAttributes() {
      const response = await fetch('/api/orders', {
      method: 'OPTIONS',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        work_order: selected_wo,
        comp_date: selected_date,
        completion: selected_percent,
        hold: Number(selected_on_hold)
      }),
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
                bind:selected_on_hold
                bind:selected_percent
                bind:selected_date
                bind:changeMade
                bind:selected_type type={tableTitle}/>
    {/each}
</div>

{#if selected_wo}
    <div class="flex flex-col absolute top-12 right-12 space-y-8">
        {#if selected_type.includes("Build")}
            {#if selected_build.includes("Proto")}
                <Button size="xl" on:click={() => changeState("COMPLETE")}>Build Complete Order</Button>
            {:else}
                <Button size="xl" on:click={() => changeState("AWAIT")}>Waiting on Approval</Button>
            {/if}
        {:else if selected_type.includes("Await")}
            <Button size="xl" disabled={selected_on_hold} on:click={() => changeState("PILOT")}>Release to Pilot</Button>
        {:else}
             <Button size="xl" disabled={selected_on_hold} on:click={() => changeState("COMPLETE")}>Complete Pilot</Button>
        {/if}
        <Button size="xl" on:click={navigateToPage}>
            Edit
        </Button>

        {#if !selected_type.includes("Build")}
        <div>
            <Label class="mt-4" for="bp_date">Build Plan Completion Date</Label>
            <Input on:change={() => inputChange = true} disabled={selected_on_hold} name="bp_date" type="text" bind:value={selected_date}/>
        </div>
        <div>
            <Label for="bp_comp_range">Percent of Build Plan Complete</Label>
            <Range on:change={() => rangeChange = true} disabled={selected_on_hold} step="10" name="bp_comp_range" min="0" max="100" bind:value={selected_percent}/>
            <p>{selected_percent}%</p>
        </div>
        <div class="space-x-4">
            <Label for="bp_date" class="space-x-2">
                <Checkbox on:change={() => holdChange = true} bind:checked={selected_on_hold} name="on_hold"/>
                ON HOLD
            </Label>
        </div>
            {#if changeMade}
                <Button on:click={changeAttributes}>Update</Button>
            {/if}
        {/if}
    </div>
{/if}