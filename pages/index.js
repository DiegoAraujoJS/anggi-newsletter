import Head from 'next/head';
import Link from 'next/link';
import Carousel from '../components/carousel';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"/>
      </Head>

      <section>
        <Carousel/>
      </section>
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
