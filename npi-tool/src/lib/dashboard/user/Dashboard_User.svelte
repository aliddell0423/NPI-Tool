<script>
  export let rows, columns;
  import '$lib/dashboard/dashboard.css'
</script>

<div class="spreadsheet-container">
<table >
  <thead >
    <tr >
      {#each columns as column}
        <th>{column}</th>
      {/each}
    </tr>
  </thead>
  <tbody >
    {#each rows as row, rowIndex}
      <tr>
        {#each row as cell}
          <td class:assigned_eng_column="{rowIndex === row.length-1}">{cell}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
</div>


<style>
  .assigned_eng_column {
    max-width: 650px;
  }
/* Style the table */
</style>