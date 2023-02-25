import styles from './Bookmark.module.scss'

import Tag from '../Tag/Tag'
import {useMemo} from 'react'

export type BookmarkType = {
  href: string
  description: string
  extended: string
  meta: string
  hash: string
  time: string
  shared: string
  toread: string
  tags: string
}

interface BookmarkProps {
  data: BookmarkType
}

const Bookmark = ({ data }: BookmarkProps) => {

  // Split tags into an array only when data changes
  const tags = useMemo(() => {
    return data.tags.split(' ')
  }, [ data ])

  return (
    <div className={ styles.bookmark }>
      <a className={ styles.title } href={ data.href } target="_blank">
        { data.description }
      </a>
      <div className={ styles.tags }>
        { tags.map((tag, key) => {
          return <Tag key={ key }>{ tag }</Tag>
        })}
      </div>
    </div>
  );
};

export default Bookmark;
