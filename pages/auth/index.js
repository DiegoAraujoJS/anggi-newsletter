import styles from '../subscribe/subscribe.module.css'

export default function Page() {
  return (
    <div>
      <form className={`${styles['form-container']} top-25`}>
        <div className={styles['form-group']}>
          <label className={styles['form-label']} htmlFor="name">Contraseña:</label>
          <input className={styles['form-input']} type="text" id="name" name="name" required/>
        </div>
        <button type="submit" onSubmit={(e) => {
          // Save form value in localStorage as adminPassword.
          // const value = ...
          // localStorage.setItem('adminPassword', value)
          // Redirect to Home
          // redirectHome()
        }}>Ingresar</button>
      </form>
    </div>
  )
}
