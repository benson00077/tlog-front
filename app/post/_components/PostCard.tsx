'use client'
import NoScrollLink from 'app/_components/NoScrollLink/NoScrollLink'
import { formatDate } from 'app/_utils/utils'
import { IPostItem } from '../types'
import TagWithIcon from './TagWithIcon'
import Image from 'next/image'

type Props = {
  post: IPostItem
  href: string
}

export default function PostCard({ post, href: url }: Props) {
  const { _id, createdAt, posterUrl, title, pv, like, tags, summary } = post

  return (
    <section className="relative block overflow-hidden rounded-lg shadow-2xl cursor-pointer group">
      <NoScrollLink href={url} passHref>
        <div className="h-0">
          <Image
            src={posterUrl}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            className="absolute transition-all opacity-0 group-hover:opacity-100 blur group-hover:blur-0 group-hover:scale-105 -z-10"
          />
        </div>
        <div className="group-hover:absolute group-hover:w-full group-hover:h-full group-hover:bg-white group-hover:opacity-10"></div>

        <div className="p-4">
          <div className="flex justify-center">
            <TagWithIcon tag={tags[0]} size={40} />
          </div>
          <h5 className="py-10 text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-white">{title}</h5>
          <div className="h-28">
            <p className="px-10 text-center line-clamp-3 mt-50">{summary}</p>
          </div>
          <div className="flex justify-end">
            {/* <div>
                <span>Preview: {pv}</span>
                </div>
                <div>
                <span>Likes: {like}</span>
              </div> */}
            <span className="opacity-50">{formatDate(createdAt)}</span>
          </div>
        </div>
      </NoScrollLink>
    </section>
  )
}
