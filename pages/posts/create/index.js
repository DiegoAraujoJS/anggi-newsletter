import Head from "next/head";
import Layout from "../../../components/layout";
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PostBody from "../../../components/post";
import { toast } from "react-hot-toast";

const RichTextEditor = dynamic(
  () => import( "../../../components/RichTextEditor"),
  {ssr: false}
)

export default function Page() {
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    setTitle(localStorage.getItem('title') ?? '')
    setSubTitle(localStorage.getItem('subTitle') ?? '')
    setBody(localStorage.getItem('body') ?? '')
  }, [])

  /**
   * @param {string} input
   * @param {(s: string) => void} setState 
   * @param {string} key
   */
  const setStateAndSaveToLocalStorage = (input, setState, key) => {
    setState(input)
    return new Promise(() => localStorage.setItem(key, input))
  }

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
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={title} onChange={e => setStateAndSaveToLocalStorage(e.target.value, setTitle, 'title')}/>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Subtítulo</span>
        </label>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={subTitle} onChange={e => setStateAndSaveToLocalStorage(e.target.value, setSubTitle, 'subTitle')}/>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Cuerpo</span>
        </label>
      </div>
      <RichTextEditor value={body} handleChange={(html) => setStateAndSaveToLocalStorage(html, setBody, 'body')}/>
      <br/>
      <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_1').showModal()}>Postear</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <PostBody title={title} body={body} date={new Date().toLocaleDateString()}/>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={() => fetch(`/api/posts/createPost`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('adminPassword')
              },
              body: JSON.stringify({title, subTitle, body, date: new Date().toISOString()})
            })
              .then(async (response) => {
                if (response.status !== 200) return response.text().then(toast.error)
                const post = await response.json()
                router.push(`/posts/${post.id}`)
                localStorage.removeItem('title')
                localStorage.removeItem('subTitle')
                localStorage.removeItem('body')
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
