import Head from 'next/head';
import Link from "next/link";
import { useRouter } from 'next/router';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import useStore from '../store/store';
import utilStyles from '../styles/utils.module.css';

export default function Home({allPostsData}) {
  const {isAdmin} = useStore()

  console.log(isAdmin)
  const router = useRouter()

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
                <Link href={`/posts/${post.id}`} className="text-red-800"> {post.title} </Link>
                <br/>
                {new Date(post.date).toLocaleDateString()}
              </li>
            )
          })}
        </ul>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}
