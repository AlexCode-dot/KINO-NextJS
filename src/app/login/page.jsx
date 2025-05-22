export default function Login() {
  return (
    <main className="loginPage">
      <div className="loginPage__container">
        <h1 className="loginPage__Title">Login</h1>
        <section className="loginPage__section">
          <form className="loginPage__form">
            <h3 className="loginPage__form_name">Username</h3>
            <input className="loginPage__username" type="text" />
            <h3 className="loginPage__form_password">Password</h3>
            <input className="loginPage__password" type="text" />
            <button className="loginPage__button">Login</button>
          </form>
        </section>
      </div>
    </main>
  )
}
