<script>
    /** @type {import('./$types').PageData} */
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Input, Label } from 'flowbite-svelte';
    export let data;
    export let { notifications } = data;

    console.log(notifications);

    let recipientSearch = '';
    let messageSearch = '';
    let filtteredResults = [];

    $: filtteredResults = notifications.filter(item => item.recipient.toLowerCase().includes(recipientSearch.toLowerCase()) && item.content.toLowerCase().includes(messageSearch.toLowerCase()));

</script>

<h1>Here is the notifications list.</h1>


<div class="grid gap-6 mb-6 md:grid-cols-8">
    <div>
      <Label class="mb-2">Search Recipient</Label>
      <Input type="text" bind:value={recipientSearch}/>
    </div>
    <div>
      <Label class="mb-2">Search Message</Label>
      <Input type="text" bind:value={messageSearch}/>
    </div>
</div>

<div class="flex max-w-30">
<Table>
  <TableHead>
    <TableHeadCell>Recipient</TableHeadCell>
    <TableHeadCell>Content</TableHeadCell>
    <TableHeadCell>Acknowledged</TableHeadCell>
  </TableHead>
  <TableBody class="divide-y">
    {#each filtteredResults as notif}
    <TableBodyRow>
      <TableBodyCell>{notif.recipient}</TableBodyCell>
      <TableBodyCell>{notif.content}</TableBodyCell>
      <TableBodyCell>{notif.read ? "yes" : "no"}</TableBodyCell>
    </TableBodyRow>
    {/each}
  </TableBody>
</Table>
</div>