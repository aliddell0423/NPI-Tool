<script>
  import { Drawer, Button, CloseButton, Card, P } from 'flowbite-svelte';
  import { sineIn } from 'svelte/easing';
  export let hidden1 = true; 
  export let notifications;

  async function closeNotif(notif_code) {
    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notif_code }),
    });

    for( const notif of notifications) {
      if(notif.id === notif_code) {
        notif.closed = true;
      }
    }

    notifications = [...notifications];

    const responseData = await response.json();
  }


  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn
  };
</script>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id='sidebar1'>
  <CloseButton on:click={() => (hidden1 = true)} class='mb-4 dark:text-white'/>

  <div class="flex flex-col space-y-4">
  { #each notifications as notif }
      <Card>
          {#if !notif.closed}
          <div class="flex justify-end">
            <CloseButton class="mt-0 mr-0" on:click={() => closeNotif(notif.id)}/>
          </div>
          <p>
            {notif.content}
          </p>
          {:else}
          <p class="italic">Marked as read.</p>
          {/if}
      </Card>
  {/each}
  </div>
</Drawer>