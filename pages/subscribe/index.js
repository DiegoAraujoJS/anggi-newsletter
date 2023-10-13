import Head from "next/head";
import Layout from "../../components/layout";
import styles from './subscribe.module.css'


export default function Page() {
  return (
    <Layout>
      <Head>
        <title>Newsletter</title>
      </Head>
      <form class={styles['form-container']}>
        <div class={styles['form-group']}>
          <label class={styles['form-label']} for="name">Nombre:</label>
          <input class={styles['form-input']} type="text" id="name" name="name" required/>
        </div>
        <div class={styles['form-group']}>
          <label class={styles['form-label']} for="email">Email:</label>
          <input class={styles['form-input']} type="email" id="email" name="email" required/>
        </div>
        <button>Enviar</button>
      </form>

    </Layout>
  )
}
