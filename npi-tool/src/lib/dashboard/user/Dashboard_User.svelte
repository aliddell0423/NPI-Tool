<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, List, Li } from 'flowbite-svelte';
  export let tableData, assignmentData, engineer_dict;
</script>

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
              {order[column]}
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