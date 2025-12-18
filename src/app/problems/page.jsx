import React, { Suspense } from 'react'
import ProblemsPage from './ProblemsPage'

function page() {
  return (
    <Suspense fallback={<></>}>
      <ProblemsPage />
    </Suspense>
  )
}

export default page