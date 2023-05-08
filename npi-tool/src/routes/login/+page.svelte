<script>
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<h1>Login</h1>
<form method="post">
    <h3>Email</h3>
    <input type="text" name="Email">

    <h3>Password</h3>
    <input type="password" name="Password" >

    <div>
        <button type="submit" formaction="?/loginPost">Login</button>
    </div>

    {#if form?.missing}<p class="error">Missing either email or password.</p>{/if}
    {#if form?.invalid}<p class="error">Invalid email or password.</p>{/if}
</form>

<button onclick="window.location.href='/register';">register</button>