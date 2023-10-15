import Head from "next/head";
import { toast } from "react-hot-toast";
import Layout from "../../components/layout";
import styles from './subscribe.module.css'

export default function Page() {
  return (
    <Layout>
      <Head>
        <title>Newsletter</title>
      </Head>
      <form className={styles['form-container']} onSubmit={(e) => {
        e.preventDefault()
        return fetch(`/api/subscribe`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({name: e.target.name.value, email: e.target.email.value})
        })
        .then(res => {
            console.log(res.body)
            if (res.status == 200) {
              return toast.success('Se guardó la subscripción 🤗')
            }
            return res.text().then(toast.error)
          })
      }}>
        <div className={styles['form-group']}>
          <label className={styles['form-label']} htmlFor="name">Nombre:</label>
          <input className={styles['form-input']} type="text" id="name" name="name" required/>
        </div>
        <div className={styles['form-group']}>
          <label className={styles['form-label']} htmlFor="email">Email:</label>
          <input className={styles['form-input']} type="email" id="email" name="email" required/>
        </div>
        <button type="submit">Suscribirme</button>
      </form>

    </Layout>
  )
}
