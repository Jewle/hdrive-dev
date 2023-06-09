export function HTML(data) {
    return `
        <div class="hour-form">
        <div class="login-wrap">
  <h2 hclick = foo>Login</h2>
  
  <div class="form" >
    <form action="" hform method="post">
        <div herror></div>
        <input type="text" placeholder="Username" hinput="login" name="un" />
        <input type="password" placeholder="Password" hinput="password" name="pw" />
        <button type="button" data-role="log"> Sign in </button>
        <span > <p>  <a href="#hello/register">Don't have an account? Register</a> </p></span>
</form>
  </div>
</div>

</div>
    `
}
