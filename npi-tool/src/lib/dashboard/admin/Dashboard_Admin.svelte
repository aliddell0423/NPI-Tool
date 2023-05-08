<!-- EditableSpreadsheet.svelte -->
<script>
  import Checkbox from "./Checkbox.svelte";
  import { selectedOptions } from "./dashboard_buffer.js"
  import "$lib/dashboard/dashboard.css";

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

<table>
  <thead>
    <tr>
      {#each columns as header}
        <th>{header}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each rows as row, rowIndex}
      <tr>
        {#each row as cellValue, columnIndex}
          <td on:click={() => startEditing(rowIndex, columnIndex)} class:assigned_eng_column="{columnIndex === row.length - 1}">
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
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .assigned_eng_column {
    width: 650px;
  }
</style>