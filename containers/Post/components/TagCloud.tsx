import Link from "next/link"

type props = {
  tags: string[]
}

export default function TagCloud({ tags }: props){
  return (
    <div>
      <h3>Tag Cloud</h3>
      {tags.map((tag, i) => (
        <Link href={`/post?tag=${tag}`} key={i}>
          <a>
            <span>{tag}</span>
          </a>
        </Link>
      ))}
    </div>
  )
}