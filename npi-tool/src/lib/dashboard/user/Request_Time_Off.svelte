<script>
    import { Button, Label, Input, Alert } from 'flowbite-svelte';
    export let email;
    export let submissionError = false;
    let submittedStart, submittedEnd;

    export async function addTimeOff(startDate, endDate, email) {

      const response = await fetch('/api/time-off', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startDate, endDate, email }),
      });

      submissionError = !response.ok;

      submittedEnd = '';
      submittedStart = '';
    }
</script>

<div class="flex flex-row space-x-6">
    <Label>Start Date</Label>
    <div class="w-60">
        <Input type="text" placeholder="mm/dd/yyyy" bind:value={submittedStart}></Input>
    </div>
    <Label>End Date</Label>
    <div class="w-60">
        <Input type="text" placeholder="mm/dd/yyyy" bind:value={submittedEnd}></Input>
    </div>
    <Button shadow color="blue" on:click={() => addTimeOff(submittedStart, submittedEnd, email)}>Submit</Button>
</div>
{#if submissionError}
    <Alert color="red">
        <span class="font-medium">Error:</span> Please enter a valid date.
    </Alert>
{/if}