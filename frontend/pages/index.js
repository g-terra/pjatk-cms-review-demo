import MainFeaturedPost from '../src/components/blog/latest/main-post'
import Layout from '../src/components/layout/layout'
import landingService from '../src/services/landing.sercice'

export default function Home({ data }) {


  return (
    <Layout>
        <MainFeaturedPost post={data.latest}></MainFeaturedPost>
    </Layout>
  )
}


export async function getStaticProps(context) {

  console.log(context.locale);

  const res = await landingService.get(context.locale);

  return {
    props: res
  }
}

