import Layout from '../../components/layout';
import { getAllPostsIds, getPostData } from '../../lib/posts';

export default function Post({id, title, date, contentHtml}) {

  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Layout>
      <p className={`bg-primary text-3xl rounded-lg p-2 mb-4`}>
      {title}
      </p>
      {isClient ? new Date(date).toLocaleDateString() : null}
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
