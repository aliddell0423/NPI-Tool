<!-- EditableSpreadsheet.svelte -->
<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Input, Button, List, Li, Checkbox, Listgroup, Alert } from 'flowbite-svelte';
  import { fly } from 'svelte/transition';
  import OrderModal from '$lib/dashboard/admin/New_Order_Modal.svelte'

  export let tableData, assignmentData, engineer_dict, adminEmail;
  let editMode = false;
  let editSelection = false;
  let selectionList = [];
  let currentlySelected, submissionError, errorMessage;



   export async function confirmChanges() {
    editMode = false;
    const response = await fetch('/api/orders', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tableData, assignmentData, adminEmail }),
    });

    submissionError = !response.ok;
    if(submissionError) {
      errorMessage = await response.text();
    }
    
  }

  export function editAssignments(db_id) {
    if(!editSelection){
      for(const obj of assignmentData[db_id]) {
        selectionList.push(obj["engineer_email"]);
      }
      editSelection = true;
      currentlySelected = db_id;
    }
  }

  export function confirmAssignments() {
    const newAssignList = [];
    for(const email of selectionList) {
      const obj = {"engineer_email": email};
      newAssignList.push(obj);
    }

    assignmentData[currentlySelected] = newAssignList;
    editSelection = false;
    currentlySelected = null;
    selectionList = [];
  }

</script>

  {#if submissionError}
    <Alert color="red" dismissable transition={fly}>
      <span class="font-medium">Submission Error: </span> {errorMessage}
    </Alert>
  {/if}

  <div class="min-w-full">
    <Table class="!min-w-full" shadow>
      <TableHead>
        { #each Object.keys(tableData[0]) as column }
        {#if column !== "db_order_id"}
          <TableHeadCell class="px-3 py-2">{column.replace(/_/g, " ")}</TableHeadCell>
        {/if}
        { /each }
        <TableHeadCell>
          Assigned Engineers
        </TableHeadCell>
      </TableHead>
      <TableBody>
        {#each tableData as order}
        <TableBodyRow class="divide-y-2 divide-x-2">
          {#each Object.keys(tableData[0]) as column }
          {#if column !== "db_order_id"}
            <TableBodyCell class="!px-2 !py-1 !whitespace-normal">
              {#if editMode}
                <Input type="text" bind:value={order[column]}/>
              {:else}
                {order[column] === -1 ? "LATE": order[column]}
              {/if}
            </TableBodyCell>
          {/if}
          { /each }
          <List list="none" class="py-4">
            {#if assignmentData[order["db_order_id"]].length}
              {#each assignmentData[order["db_order_id"]] as email}
                {#if editMode}
                  <p class="cursor-pointer" on:click={() => editAssignments(order["db_order_id"])}>{engineer_dict[email["engineer_email"]]}</p> 
                {:else}
                  <Li>
                    {engineer_dict[email["engineer_email"]]}
                  </Li>
                {/if}
              {/each}
            {:else}
              {#if editMode}
                <p class="cursor-pointer" on:click={() => editAssignments(order["db_order_id"])}>TBD</p>
              {:else}
                <p>TBD</p>
              {/if}
            {/if}
          </List>
        </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>

{#if !editSelection}
  {#if editMode}
    <Button on:click={confirmChanges}>Confirm Changes</Button>
  {:else}
    <div class="flex flex-row space-x-6 p-x-4">
      <Button on:click={() => editMode = !editMode}>Edit Table</Button>
    </div>
    <OrderModal/>
  {/if}
{/if}

{#if editSelection}
  <div class="w-60 overflow-y-auto h-40">
    <Listgroup items={Object.keys(engineer_dict)} let:item>
      <Checkbox bind:group={selectionList} value={item}>{engineer_dict[item]}</Checkbox>
    </Listgroup>
  </div>
  <Button on:click={confirmAssignments}>Confirm Assignments</Button>
{/if}
