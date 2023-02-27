import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'

import Bookmark from '../components/Bookmark'
import Search from '../components/Search'
import type { BookmarkType } from '../components/Bookmark/Bookmark'

export const getServerSideProps: GetServerSideProps<{ bookmarks: BookmarkType[] }> = async (context) => {
  const bookmarksRes = await fetch(process.env.API_ENDPOINT + "posts/all/" + process.env.API_KEY + "&format=json&results=1000")
  const data = await bookmarksRes.json()

  return {
    props: {
      bookmarks: data,
    },
  }
}
const Home: NextPage = (props: any) => {
  const { bookmarks, ...rest } = props;
  const [searchPhrase, setSearchPhrase] = React.useState('')
  const [bookmarkList, setBookmarkList] = React.useState(bookmarks)

  useEffect(() => {
    const filteredList = bookmarks.filter((bookmark:BookmarkType) => {
      if (searchPhrase.length < 1) {
        console.log("nothing")
        return bookmark
      }

      if (bookmark.description.toLowerCase().includes(searchPhrase.toLowerCase())) {
        console.log("something")
        return bookmark
      }
    })

    setBookmarkList(filteredList)
  }, [ searchPhrase, bookmarks ])

  const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(event.target.value)
  }

  return (
    <div className='container'>
      <h1>All Bookmarks</h1>
      <Search onChange={ (e) => { handleSearch(e) } } />
      { bookmarkList.map((bookmark: BookmarkType, key: number) => {
        return <Bookmark key={ key } data={ bookmark } />
      }) }
    </div>
  )
}

export default Home
