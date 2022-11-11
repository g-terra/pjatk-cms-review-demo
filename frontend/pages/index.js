import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FeaturedPostSection from '../src/components/blog/featured/FeaturedPostSection';
import MainFeaturedPost from '../src/components/blog/latest/main-post'
import Layout from '../src/components/layout/layout'
import { useAppLocaleContext } from '../src/context/appLocale.context';
import { alertService } from '../src/services/alert.service';
import landingService from '../src/services/landing.sercice'
import layoutService from '../src/services/layout.service';

export default function Home({ data }) {

  const router = useRouter();

  return (

    <Layout>
      <MainFeaturedPost post={data.latest}></MainFeaturedPost>
      <FeaturedPostSection posts={data.featured}></FeaturedPostSection>
      <Button onClick={
        () => {
          alertService.success('Registration successful', { keepAfterRouteChange: true });

        }
      }>test</Button>
    </Layout>

  )
}

export async function getServerSideProps(context) {

  const landing = await landingService.get(context.locale);

  console.log("landing", JSON.stringify(landing));
  return {
    props: { data: landing.data }
  }
}

