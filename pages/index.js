import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Soy maquilladora profesional e hize este blog para compartir mi pasión con el mundo.</p>
        <p>Sígueme para que me conozcas un poco más.</p>
        <Link href={"/subscribe"}>¡Suscríbete al Newsletter!</Link>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(post => {
            return (
              <li className={utilStyles.listItem} key={post.id}>
                <Link href={`/posts/${post.id}`}> {post.title} </Link>
                <br/>
                {post.date}
              </li>
            )
          })}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}
