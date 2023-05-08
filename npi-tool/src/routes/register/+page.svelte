<script>
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<h1>Register Account</h1>
<form method="post">

    <h3>First Name</h3>
    <input type="text" name="FirstName">

    <h3>Last Name</h3>
    <input type="text" name="LastName">

    <h3>Email</h3>
    <input type="text" name="Email">

    <h3>Password</h3>
    <input type="password" name="Password" >

    <div>
        <button type="submit" formaction="?/addUserPost">Register</button>
    </div>
    
    {#if form?.missing}<p class="error">All fields are required.</p>{/if}
    {#if form?.account_exists}<p class="error">There is already an email associated with this account.</p>{/if}
    {#if form?.invalid_email}<p class="error">Please register your valid Arrow email.</p>{/if}
</form>