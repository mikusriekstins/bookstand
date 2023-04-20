import type { 
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage
} from 'next'
import React, { useEffect } from 'react'
//import { useQuery } from 'react-query'

import Bookmark from '../components/Bookmark'
import Search from '../components/Search'
import Tag from '../components/Tag'
import type { BookmarkType } from '../components/Bookmark/Bookmark'

export const getServerSideProps: GetServerSideProps<{ bookmarks: BookmarkType[] }> = async (context) => {
  const bookmarksRes = await fetch(process.env.API_ENDPOINT + "posts/all/" + process.env.API_KEY + "&format=json&results=1000")
  const tagsRes = await fetch(process.env.API_ENDPOINT + "tags/get/" + process.env.API_KEY + "&format=json")
  const bookmarkData = await bookmarksRes.json()
  const tagsData = await tagsRes.json()

  return {
    props: {
      bookmarks: bookmarkData,
      tags: tagsData
    },
  }
}

const Home: NextPage = (props: any) => {
  const { bookmarks, tags, ...rest } = props;
  const [ searchPhrase, setSearchPhrase ] = React.useState('')
  const [ bookmarkList, setBookmarkList ] = React.useState(bookmarks)
  const [ tagList, setTagList ] = React.useState(Object.keys(tags))

  useEffect(() => {
    const filteredBookmarks = bookmarks.filter((bookmark:BookmarkType) => {
      if (searchPhrase.length < 1) {
        return bookmark
      }

      if (bookmark.description.toLowerCase().includes(searchPhrase.toLowerCase())) {
        return bookmark
      }
    })

    const tagKeys = Object.keys(tags)
    const filteredTags = tagKeys.filter((tag:string) => {
      if (searchPhrase.length < 1) {
        return tag
      }

      if (tag.toLowerCase().includes(searchPhrase.toLowerCase())) {
        return tag
      }
    })

    setBookmarkList(filteredBookmarks)
    setTagList(filteredTags)
  }, [ searchPhrase, bookmarks, tags ])

  const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(event.target.value)
  }

  return (
    <div className='container'>
      <h1>All Bookmarks</h1>
      <Search onChange={ (e) => { handleSearch(e) } } />
      <div className='grid'>
        <div className='col col--xl-3'>
          { tagList.map((tag: string, key: number) => {
            return <Tag type="block" key={ key } href={ "/tag/" + tag }>{ tag }</Tag>
          }) }
        </div>
        <div className='col col--xl-9'>
          { bookmarkList.map((bookmark: BookmarkType, key: number) => {
            return <Bookmark key={ key } data={ bookmark } />
          }) }
        </div>
      </div>
    </div>
  )
}

export default Home
