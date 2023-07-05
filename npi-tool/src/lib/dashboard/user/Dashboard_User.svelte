<script>
  export let rows, columns;
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
</script>

<Table striped={true}>
  <TableHead>
      {#each columns as column}
        <TableHeadCell>{column}</TableHeadCell>
      {/each}
  </TableHead>
  <TableBody>
    {#each rows as row, rowIndex}
      <TableBodyRow>
        {#each row as cell}
          <TableBodyCell>{cell}</TableBodyCell>
        {/each}
      </TableBodyRow>
    {/each}
    </TableBody>
</Table>