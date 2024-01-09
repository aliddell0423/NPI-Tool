<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Radio } from 'flowbite-svelte';
  export let tableData;
  let columns = ["", "Type", "Customer Name", "Assembly", "Work Order", "Quantity", "Stock Number", "Start Date", "Est Completion Date"]
  export let selected_wo, selected_sn, selected_type, type, selected_build, selected_on_hold, selected_percent, selected_date, changeMade;
  
  export function gotoLink(stocknum) {
    window.location.href = window.location.href + `/${stocknum}`;
  }

  export function select(work_order, stock_number, build, on_hold, percent, date) {
    if (!changeMade){
      selected_wo = work_order;
      selected_sn = stock_number;
      selected_type = type;
      selected_build = build;
      selected_on_hold = on_hold;
      selected_percent = percent;
      selected_date = date;
    }
  }

</script>

<div style="max-width: 1200px;" class="overflow-x-visible overflow-y-auto h-screen max-h-[calc(100vh/3)]">

  <Table hoverable={true} shadow>
    <TableHead>
      { #each columns as column }
        <TableHeadCell>{column}</TableHeadCell>
      { /each }
    </TableHead>
    {#if tableData.length}
    <TableBody >
      {#each tableData as order}
      <TableBodyRow on:click={() => select(order.work_order, order.stock_number, order.type, order.on_hold, order.bp_comp_percent, order.bp_comp_date)} class="cursor-pointer">
        <TableBodyCell>
            <Radio bind:group={selected_wo} value={order.work_order}/>
        </TableBodyCell>
        <TableBodyCell>
            {order.type}
        </TableBodyCell>
        <TableBodyCell>
            {order.customer_name}
        </TableBodyCell>
        <TableBodyCell>
            {order.assembly}
        </TableBodyCell>
        <TableBodyCell>
            {order.work_order}
        </TableBodyCell>
        <TableBodyCell>
            {order.order_quantity}
        </TableBodyCell>
        <TableBodyCell>
            {order.stock_number}
        </TableBodyCell>
        <TableBodyCell>
            {order.start_date}
        </TableBodyCell>
        <TableBodyCell>
            {order.est_complete_date}
        </TableBodyCell>
        {#if order.on_hold}
          <TableBodyCell class="text-red">
            ON HOLD
          </TableBodyCell>
        {/if}
      </TableBodyRow>
      {/each}
    </TableBody>
    {/if}
  </Table>
</div>
