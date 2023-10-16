import Head from "next/head";
import { toast } from "react-hot-toast";
import Layout from "../../components/layout";
import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";

export default function Page() {

  return (
    <Layout>
      <Head>
        <title>Newsletter</title>
      </Head>

    <div className="w-full flex flex-col gap-4 items-start">
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input type="text" variant="faded" label="Nombre" required />
          <Input type="email" variant="faded" label="Email" required/>
        </div>
      <Button color="secondary">
          Suscribirme
      </Button>
    </div>  

    </Layout>
  )
}
