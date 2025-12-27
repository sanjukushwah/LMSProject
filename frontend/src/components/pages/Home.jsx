import React from 'react'
import Layout from '../common/Layout'
import Hero from '../common/Hero'
import FeaturedCategoried from '../common/FeaturedCategoried'
import FeaturedCourses from '../common/FeaturedCourses'

const Home = () => {
  return (
    <>
    <Layout>
      <Hero/>
      <FeaturedCategoried/>
      <FeaturedCourses/>
    </Layout>
    </>
  )
}

export default Home