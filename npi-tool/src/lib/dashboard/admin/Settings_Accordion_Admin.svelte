<script>
    import { Accordion, AccordionItem, Input, Button, Alert } from 'flowbite-svelte';
    import HolidayList from '$lib/dashboard/admin/Holiday_List.svelte';

    export let holidays;
    export let submittedHoliday;
    export let submissionError = false;

    export async function addHoliday(holiday) {

        const response = await fetch('/api/holidays', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ holiday }),
        });

        if(response.ok) {
            submissionError = false;
            holidays.push(holiday);
            holidays = [...holidays];
        }
        else {
            submissionError = true;
        }

        submittedHoliday = ''
    }
</script>

<Accordion>
  <AccordionItem>
    <span slot="header">Holiday Dates</span>
    <div class="flex flex-col space-y-4 w-20">
        <HolidayList {holidays} />
        <div class="border-2 rounded-xl"><Input bind:value={submittedHoliday}/></div>
        <Button on:click={() => addHoliday(submittedHoliday)}>Add Holiday</Button>
    </div>
    {#if submissionError}
        <Alert color="red">
            <span class="font-medium">Error:</span> Please enter a valid date.
        </Alert>
    {/if}
    <p class="mb-2 text-gray-500 dark:text-gray-400">Here will be the holidays for exemption from the working day count.</p>
  </AccordionItem>
</Accordion>