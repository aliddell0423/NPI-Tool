<script>
    import { Accordion, AccordionItem, Datepicker, Button} from 'flowbite-svelte';
</script>

<Accordion>
  <AccordionItem>
    <span slot="header">Time Off</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">Here you can set your time off after you have requested it from UGK.</p>
    <div class="flex space-x-6">
        <Datepicker range datepickerButtons />
        <Button shadow color="blue">Submit</Button>
    </div>
  </AccordionItem>
</Accordion>