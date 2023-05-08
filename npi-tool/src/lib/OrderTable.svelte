<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  export let rows, columns;
</script>

<Table striped={true}>
    <TableHead>
        {#each columns as column}
          <TableHeadCell>{column}</TableHeadCell>
        {/each}
    </TableHead>
    <TableBody>
      {#each rows as row}
        <TableBodyRow>
          {#each row as cell}
            <TableBodyCell>
              {cell}
            </TableBodyCell>
          {/each}
          <TableBodyCell>
            <a href="orders/{row[13]}" class="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Edit
            </a>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
</Table>
