import Link from "next/link"

export default function notFound(name, form) {
  return (
    <>
      <div>
        The Pokemon "{name}" with the form "{form}" was not found within our Pokedex
      </div>
      <div>
        <Link
          href="/ranking"
        >
          Back to Search
        </Link>
      </div>
    </>
  )
}