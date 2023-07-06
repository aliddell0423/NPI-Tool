<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, Button } from 'flowbite-svelte';
    export let time_off;
    let selected = [];

    export async function deleteTimeOff() {

      const response = await fetch('/api/time-off', {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selected }),
      });

      location.reload();

    }
</script>


<div class="w-80 space-y-4">
<Table>
    <TableHead>
    <TableHeadCell>
    </TableHeadCell>
    <TableHeadCell>
        Start Date
    </TableHeadCell>
    <TableHeadCell>
        End Date
    </TableHeadCell>
    </TableHead>
    <TableBody>
    {#each time_off as time}
        <TableBodyRow>
            <TableBodyCell>
                <Checkbox bind:group={selected} value={time.id}/>
            </TableBodyCell>
            <TableBodyCell>
                {time.start_date}
            </TableBodyCell>
            <TableBodyCell>
                {time.end_date}
            </TableBodyCell>
        </TableBodyRow>
    {/each}
    </TableBody>
</Table>
<Button on:click={deleteTimeOff}>Delete</Button>
</div>