import Head from "next/head";
import Layout from "../../components/layout";
import styles from './subscribe.module.css'

export default function Page() {
  return (
    <Layout>
      <Head>
        <title>Newsletter</title>
      </Head>
      <form className={styles['form-container']}>
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
