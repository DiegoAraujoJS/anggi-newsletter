import Layout from '../../components/layout';
import { getAllPostsIds, getPostData } from '../../lib/posts';

export default function Post({id, title, date}) {
  return (
    <Layout>
      {id}
      <br/>
      {title}
      <br/>
      {date}
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: getAllPostsIds(),
    fallback: false
  }
}

export function getStaticProps({params}) {
  const id = params.id
  return {
    props: getPostData(id)
  }
}
