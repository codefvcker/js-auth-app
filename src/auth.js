export function getAuthForm() {
    return `
    <form class="mui-form" id='auth-form'>
      <div class="mui-textfield mui-textfield--float-label">
          <input type="email" id='email' required>
          <label for='email'>Email:</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
          <input type="password" id='password' required>
          <label for='password'>Password:</label>
      </div>
      <button type="submit" id="submit" class="mui-btn mui-btn--raised mui-btn--primary">
          Log in
      </button>
    </form>
    `
}

export function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyDdImWX9Ucn1qe7uQk-M1MaczBqm3qKwsc'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
}