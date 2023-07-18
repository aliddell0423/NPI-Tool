<script>
  import { Button, Modal, Label, Input, Select } from 'flowbite-svelte'
  let defaultModal = false;

    let postData = {
            organization: "",
            type: "",
            customer_name: "",
            assembly: "",
            sales_order: "",
            work_order: "",
            order_quantity: "",
            region: "",
            start_date: "",
            est_complete_date: "",
            stock_number: "",
            solutions_architect: ""
        };
    
    async function postOrder() {

        const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postData }),
        });
    }

</script>

<Button on:click={() => defaultModal = true}>Add New Order</Button>
<div>
    <Modal title="New Order" bind:open={defaultModal} autoclose>
        <div class="p-2">
            {#each Object.keys(postData) as field}
                <div class="py-2">
                    <Label>{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</Label>
                    <Input bind:value={postData[field]}/>
                </div>
            {/each}
            <div class="py-6">
                <Button on:click={postOrder}>Add</Button>
            </div>
        </div>
    </Modal>
</div>