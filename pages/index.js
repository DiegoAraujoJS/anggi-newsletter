import Head from 'next/head';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout, { siteTitle } from '../components/layout';
import { getAllPostsTitles } from '../lib/database/queries/posts';
import useStore from '../store/store';
import utilStyles from '../styles/utils.module.css';

export default function Home({allPostsData}) {
  const {isAdmin} = useStore()
  const router = useRouter()

  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>Soy maquilladora profesional e hize este blog para compartir mi pasión con el mundo.</p>
        <p>Sígueme para que me conozcas un poco más.</p>
        <Link href={"/subscribe"} className="text-red-800">¡Suscríbete al Newsletter!</Link>
      </section>

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
                  {isAdmin ? <button className='btn btn-secondary min-h-0 h-full' onClick={() => fetch(`/api/posts/deletePost`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(post.id)
                  })
                    .then(() => location.reload())
                  }>Eliminar</button> : null}
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

export async function getServerSideProps() {
  const allPostsData = await getAllPostsTitles()
  return {
    props: {
      allPostsData : allPostsData
    }
  }
}
