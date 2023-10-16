import Head from "next/head";
import { toast } from "react-hot-toast";
import Layout from "../../components/layout";

export default function Page() {

  return (
    <Layout>
      <Head>
        <title>Newsletter</title>
      </Head>

        <div className="sm:col-span-4">
          <label for="name" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
          <div className="mt-2">
            <input id="name" name="name" type="text" className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"/>
          </div>
        </div>
        <div className="sm:col-span-4">
          <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div className="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"/>
          </div>
        </div>
        <button type="submit" class="rounded-md bg-palette-1 px-3 py-2 text-sm text-palette-4 shadow-sm">Suscribirme</button>
    </Layout>
  )
}
