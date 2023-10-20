import Head from "next/head";
import Layout from "../../../components/layout";
import dynamic from 'next/dynamic'
import { useState } from "react";
import { useRouter } from "next/router";

const RichTextEditor = dynamic(
  () => import( "../../../components/RichTextEditor"),
  {ssr: false}
)

export default function Page() {
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [body, setBody] = useState('')

  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>Nuevo Post</title>
      </Head>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Título</span>
        </label>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={e => setTitle(e.target.value)}/>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Subtítulo</span>
        </label>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={e => setSubTitle(e.target.value)}/>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Cuerpo</span>
        </label>
      </div>
      <RichTextEditor value={body} handleChange={(html) => setBody(html)}/>
      <br/>
      <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_1').showModal()}>Postear</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <p className={`bg-primary text-3xl rounded-lg p-2 mb-4`}>
            {title}
          </p>
          {new Date().toLocaleDateString()}
          <div dangerouslySetInnerHTML={{__html: body}}>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={() => fetch(`/api/posts/createPost`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({title, subTitle, body, date: new Date().toISOString()})
            })
              .then(response => response.json())
              .then(post => {
                return router.push(`/posts/${post.id}`)
              })
            }>Postear</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cerrar</button>
            </form>
          </div>
        </div>
      </dialog>
    </Layout>
  )
}
