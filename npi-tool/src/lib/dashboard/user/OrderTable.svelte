<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Button } from 'flowbite-svelte';
  export let tableData;
  
  export function gotoLink(stocknum) {
    window.location.href = window.location.href + `/${stocknum}`;
  }

</script>

  <Table>
    <TableHead>
      { #each Object.keys(tableData[0]) as column }
        <TableHeadCell>{column.replace(/_/g, " ")}</TableHeadCell>
      { /each }
    </TableHead>
    <TableBody>
      {#each tableData as order}
      <TableBodyRow>
        {#each Object.keys(tableData[0]) as column }
          <TableBodyCell>
              {order[column]}
          </TableBodyCell>
        { /each }
        <TableBodyCell>
          <Button on:click={() => gotoLink(order.stock_number)}>Edit</Button>
        </TableBodyCell>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
