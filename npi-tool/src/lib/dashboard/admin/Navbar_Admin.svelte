  <script>
	import NotificationsDrawer from '$lib/NotificationsDrawer.svelte';
  import { page } from '$app/stores';
  import { SpeedDial, SpeedDialButton } from 'flowbite-svelte';
  export let notifications;
  export let hidden = true;
  let spanClass = 'flex-1 ml-3 whitespace-nowrap';
  $: baseUrl = $page.url.pathname.split("/")[0];
</script>

<NotificationsDrawer bind:hidden1={hidden} {notifications}/>

<SpeedDial defaultClass="absolute right-2 bottom-6" trigger="hover" tooltip="left">

  <SpeedDialButton name="Dashboard" href='{baseUrl}/admin'>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22C8 22 8 20 8 20H16C16 20 16 22 12 22Z" />
      <path d="M19 14C19 16.33 18.54 18.4 17.71 20H6.29C5.46 18.4 5 16.33 5 14V10C5 5.03 8.58 1 12 1C15.42 1 19 5.03 19 10V14Z" />
      <path d="M12 22V23M19 14L20 15M5 14L4 15" />
    </svg>
  </SpeedDialButton>
  <SpeedDialButton name="Workload Graph" href='{baseUrl}/admin/workload-graph'>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="5" width="16" height="16" rx="2" ry="2"></rect>
      <line x1="16" y1="3" x2="16" y2="7"></line>
      <line x1="8" y1="3" x2="8" y2="7"></line>
      <line x1="4" y1="11" x2="20" y2="11"></line>
      <line x1="11" y1="15" x2="12" y2="15"></line>
      <line x1="12" y1="15" x2="12" y2="18"></line>
    </svg>
  </SpeedDialButton>
  <SpeedDialButton name="Admin Settings" {spanClass} href='{baseUrl}/admin/settings'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" /></svg>
  </SpeedDialButton>
  <SpeedDialButton name="Notifications History" {spanClass} href='{baseUrl}/admin/notifications-history'>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 5h18M3 12h18M3 19h18M8 5h13M8 12h13M8 19h13"/>
    </svg>
  </SpeedDialButton>
  <SpeedDialButton name="Notifications {notifications.length > 0 ? `(${notifications.length})` : ""}" {spanClass} on:click={() => hidden = !hidden}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" /></svg>
  </SpeedDialButton>
  <SpeedDialButton data-sveltekit-preload-data="tap" name="Logout" href='{baseUrl}/logout'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
  </SpeedDialButton>
</SpeedDial>