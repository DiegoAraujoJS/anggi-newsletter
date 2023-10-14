import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostsIds, getPostData } from '../../lib/posts';
import styles from './post.module.css'

export default function Post({id, title, date, contentHtml}) {
  return (
    <Layout>
      <p className={styles.title}>
      {title}
      </p>
      {new Date(date).toLocaleDateString()}
      <div dangerouslySetInnerHTML={{__html: contentHtml}}></div>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: getAllPostsIds(),
    fallback: false
  }
}

export async function getStaticProps({params}) {
  const id = params.id
  return {
    props: await getPostData(id)
  }
}
