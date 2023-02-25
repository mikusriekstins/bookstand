import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next'
import Bookmark from '../components/Bookmark'
import type { BookmarkType } from '../components/Bookmark/Bookmark'

const API_KEY = "?auth_token=mikusriekstins:994f6905503d78348c94&format=json&results=50"
const API_ENDPOINT = "https://api.pinboard.in/v1/posts/all"

export const getServerSideProps: GetServerSideProps<{ bookmarks: BookmarkType[] }> = async (context) => {
  const res = await fetch(API_ENDPOINT + API_KEY)
  const data = await res.json()

  return {
    props: {
      bookmarks: data,
    },
  }
}
const Home: NextPage = (props: any) => {
  const { bookmarks, ...rest } = props;

  return (
    <div className='container'>
      { bookmarks.map((bookmark: BookmarkType, key: number) => {
        return <Bookmark key={ key } data={ bookmark } />
      }) }
    </div>
  )
}

export default Home
