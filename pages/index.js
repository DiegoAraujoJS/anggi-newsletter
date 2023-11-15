import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Layout, { siteTitle } from '../components/layout';
import { getAllPostsTitles } from '../lib/database/queries/posts';
import { getPresentation } from '../lib/database/queries/presentation';
import useStore from '../store/store';
import utilStyles from '../styles/utils.module.css';

const RichTextEditor = dynamic(
  () => import("../components/RichTextEditor"),
  {ssr: false}
)

export default function Home({allPostsData, presentation}) {
  const {isAdmin} = useStore()
  const router = useRouter()
  const [postToDelete, setPostToDelete] = useState({title: ""})

  const [isClient, setIsClient] = useState(false)

  const [body, setBody] = useState(presentation)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  console.log(body)

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          Seguro que querés eliminar "{postToDelete.title}"?
          <div className="modal-action">
            <button className="btn btn-primary" onClick={() => fetch(`/api/posts/deletePost`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('adminPassword')
              },
              body: JSON.stringify(postToDelete.id)
            })
              .then(() => location.reload())            
            }>Eliminar</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cerrar</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <div dangerouslySetInnerHTML={{__html: body}}></div>
          <div className='modal-action'>
            <button className='btn' onClick={() => {
              fetch(`/api/presentation`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: localStorage.getItem('adminPassword')
                },
                body: JSON.stringify({body})
              })
                .then((res) => {
                  if (res.status === 200) {
                    return res.text().then(toast.success)
                  }
                })
                .then(() => setTimeout(() => location.reload(), 2000))
            }}>Update</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cerrar</button>
            </form>
          </div>
        </div>
      </dialog>

      {isAdmin ? <div>
        <RichTextEditor value={body} handleChange={html => setBody(html)}/>
        <button className='btn' onClick={() => document.getElementById('my_modal_3').showModal()}>Update</button>
      </div> : <section className={utilStyles.headingMd}>
          <div dangerouslySetInnerHTML={{__html: body.replace(`target="_blank"`, '')}}></div>
        </section>}


      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <div className='flex items-center text-2xl w-1/5 justify-between'>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          {isAdmin ? <button className="btn btn-circle btn-primary" onClick={() => router.push("/posts/create")}>+</button>
            : null}
        </div>

        <ul className={utilStyles.list}>
          {allPostsData.map(post => {
            return (
              <li className={utilStyles.listItem} key={post.id}>
                <div className='flex justify-between'>
                  <Link href={`/posts/${post.id}`} className="text-red-800"> {post.title} </Link>
                  {isAdmin ? <button className='btn btn-secondary min-h-0 h-full' onClick={() => {setPostToDelete({...post}); document.getElementById('my_modal_2').showModal()}}>Eliminar</button> : null}
                </div>
                {isClient ? new Date(post.createdAt).toLocaleDateString() : null}
              </li>
            )
          })}
        </ul>
      </section>
    </Layout>
  );
}

export function getServerSideProps() {
  return Promise.all([
    getAllPostsTitles(),
    getPresentation()
  ])
    .then(([allPostsData, presentation]) => {
      return {
        props: {
          allPostsData: allPostsData,
          presentation: presentation?.richText || ""
        }
      }
    })
}
