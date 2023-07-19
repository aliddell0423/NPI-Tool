<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, List, Li } from 'flowbite-svelte';
  export let tableData, assignmentData, engineer_dict;
</script>

<div class="w-min-full">
  <Table class="w-min-full" shadow>
    <TableHead class="px-3 py-2">
      { #each Object.keys(tableData[0]) as column }
        <TableHeadCell>{column.replace(/_/g, " ")}</TableHeadCell>
      { /each }
      <TableHeadCell>
        Assigned Engineers
      </TableHeadCell>
    </TableHead>
    <TableBody>
      {#each tableData as order}
      <TableBodyRow class="divide-y-2 divide-x-2">
        {#each Object.keys(tableData[0]) as column }
          <TableBodyCell class="!px-2 !py-1 !whitespace-normal">
              {order[column] === -1 ? "LATE" : order[column]}
          </TableBodyCell>
        { /each }
        <List list="none" class="py-4">
            {#each assignmentData[order["work_order"]] as email}
              <Li>
                {engineer_dict[email["engineer_email"]]}
              </Li>
            {/each}
        </List>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>