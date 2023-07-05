<!-- EditableSpreadsheet.svelte -->
<script>
  import Checkbox from "./Checkbox.svelte";
  import { selectedOptions } from "./dashboard_buffer.js"
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

  export let rows, columns, options;
  let editingCell = null;

 function startEditing(row, column) {
    editingCell = { row, column };
  }

  function stopEditing() {
    editingCell = null;
  }

  function confirmEngineers() {
    const { row, column } = editingCell;
    rows[row][column] = $selectedOptions.join(", ");
    stopEditing();
  }

  function onInput(event) {
    const { value } = event.target;
    const { row, column } = editingCell;

    rows[row][column] = value;
  }
</script>

<Table striped={true}>
  <TableHead>
      {#each columns as header}
        <TableHeadCell>
          {header}
        </TableHeadCell>
      {/each}
  </TableHead>
  <TableBody>
    {#each rows as row, rowIndex}
      <TableBodyRow>
        {#each row as cellValue, columnIndex}
          <TableBodyCell on:click={() => startEditing(rowIndex, columnIndex)}>
            {#if editingCell && editingCell.row === rowIndex && 
                                      editingCell.column === columnIndex}
              {#if columnIndex === row.length - 1}
                <div style="display:flex;">
                  <Checkbox {options} checkedList={row[row.length-1]}/>
                  <button type="button" on:click={confirmEngineers}>Confirm</button>
                </div>
              {:else}
              <input type="text" value={cellValue} on:input={onInput} /> 
              {/if}
            {:else if !cellValue && cellValue !== 0}
              None
            {:else}
              {cellValue}
            {/if}
              </TableBodyCell>
        {/each}
        </TableBodyRow>
    {/each}
  </TableBody>
</Table>