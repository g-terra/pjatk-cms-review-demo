import FeaturedPostSection from '../src/components/blog/featured/FeaturedPostSection';
import MainFeaturedPost from '../src/components/blog/latest/main-post'
import Layout from '../src/components/layout/layout'
import landingService from '../src/services/landing.sercice'
import layoutService from '../src/services/layout.service';

export default function Home({ data, locale }) {

  console.log(data);

  return (
    <Layout>
      <MainFeaturedPost post={data.latest} locale={locale}></MainFeaturedPost>
      <FeaturedPostSection posts={data.featured} locale={locale}></FeaturedPostSection>
    </Layout>
  )
}

export async function getServerSideProps(context) {

  console.log(context.locale);

  const landing = await landingService.get(context.locale);

  const locale = await layoutService.getComponentLocale(context.locale)


  return {
    props: { data: landing.data, locale: locale }
  }
}

