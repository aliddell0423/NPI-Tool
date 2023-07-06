<script>
  import TimeOffTable from '$lib/dashboard/user/Time_Off_Table.svelte';
  import RequestTimeOff from '$lib/dashboard/user/Request_Time_Off.svelte';
  import { Accordion, AccordionItem, } from 'flowbite-svelte';
  export let email, time_off;
</script>

<Accordion>
  <AccordionItem>
    <span slot="header">Time Off</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400 pb-8">Here is your current time off.</p>
    <TimeOffTable {time_off} />
  </AccordionItem>
  <AccordionItem>
    <span slot="header">Request Time Off</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400 pb-8">Here you can set your time off after you have requested it from UGK.</p>
    <RequestTimeOff {email} />
  </AccordionItem>
</Accordion>