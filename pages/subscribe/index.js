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
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
          <div className="mt-2">
            <input type="text" id="name" name="name" className="input input-bordered input-primary w-full" />
          </div>
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div className="mt-2">
            <input type="email" id="email" name="email" autoComplete="email" className="input input-bordered input-primary w-full" />
          </div>
        </div>
        <br/>
        <button type="submit" className="rounded-md bg-palette-1 px-3 py-2 text-sm text-palette-4 shadow-sm ">Suscribirme</button>
      </form>
    </Layout>
  )
}
