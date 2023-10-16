import Head from "next/head";
import { toast } from "react-hot-toast";
import Layout from "../../components/layout";

export default function Page() {

  return (
    <Layout>
      <Head>
        <title>Newsletter</title>
      </Head>
      <form onSubmit={(e) => {
        e.preventDefault()
        return fetch(`/api/subscribe`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({name: e.target.name.value, email: e.target.email.value})
        })
          .then(res => {
            if (res.status == 200) {
              return toast.success('Se guardó la subscripción 🤗')
            }
            return res.text().then(toast.error)
          })
      }}>
        <div className="sm:col-span-4">
          <label htmlFor="name" className="block text-sm font-medium leading-6">Nombre</label>
          <div className="mt-2">
            <input type="text" id="name" name="name" className="input input-bordered input-primary w-full" required />
          </div>
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="email" className="block text-sm font-medium leading-6">Email</label>
          <div className="mt-2">
            <input type="email" id="email" name="email" autoComplete="email" className="input input-bordered input-primary w-full" required />
          </div>
        </div>
        <br/>
        <button type="submit" className="btn btn-primary">Suscribirme</button>
      </form>
    </Layout>
  )
}
