<!-- EditableSpreadsheet.svelte -->
<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Input, Button, List, Li, Checkbox, Listgroup } from 'flowbite-svelte';

  export let tableData, assignmentData, engineer_dict;
  let editMode = false;
  let editSelection = false;
  let selectionList = [];
  let currentlySelected;



   export async function confirmChanges() {
    editMode = false;
    const response = await fetch('/api/orders', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tableData, assignmentData }),
    });
    
  }

  export function editAssignments(work_order) {
    if(!editSelection){
      for(const obj of assignmentData[work_order]) {
        selectionList.push(obj["engineer_email"]);
      }
      editSelection = true;
      currentlySelected = work_order;
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

<div class="overflow-x-auto max-w-full">
  <Table>
    <TableHead>
      { #each Object.keys(tableData[0]) as column }
        <TableHeadCell>{column.replace(/_/g, " ")}</TableHeadCell>
      { /each }
      <TableHeadCell>
        Assigned Engineers
      </TableHeadCell>
    </TableHead>
    <TableBody>
      {#each tableData as order}
      <TableBodyRow>
        {#each Object.keys(tableData[0]) as column }
          <TableBodyCell>
            {#if editMode}
              <Input type="text" bind:value={order[column]}/>
            {:else}
              {order[column]}
            {/if}
          </TableBodyCell>
        { /each }
        <List list="none" class="py-4">
            {#each assignmentData[order["work_order"]] as email}
              {#if editMode}
                <p class="cursor-pointer" on:click={() => editAssignments(order["work_order"])}>{engineer_dict[email["engineer_email"]]}</p> 
              {:else}
                <Li>
                  {engineer_dict[email["engineer_email"]]}
                </Li>
              {/if}
            {/each}
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
      <Button>Add Order</Button>
    </div>
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