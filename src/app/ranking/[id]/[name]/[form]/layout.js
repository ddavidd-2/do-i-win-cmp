import { Suspense } from "react"
import Page from "./page"
import Loading from "./loading"

export default function Layout({ params }) {

  return (
    <Suspense fallback={<Loading />}>
      <Page
        params={params}
      />
    </Suspense>
  )
}