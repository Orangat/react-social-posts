import Post from './post'
import { useEffect, useState } from 'react'
import getPosts from '../services/posts-service'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

function Posts() {
  const [posts, setPosts] = useState([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [activePost, setActivePost] = useState(false)
  const PER_PAGE = 10
  const count = Math.ceil(totalPosts / PER_PAGE)
  let offset = 0

  const checkNewPosts = (firstPage) => {
    return setInterval(async () => {
      const LongPollingData = await getPosts(0)
      if (
        JSON.stringify(firstPage) !==
        JSON.stringify(LongPollingData?.posts)
      ) {
        setPosts(LongPollingData?.posts)
        setCurrentPage(1)
        offset = 0
      }
    }, 30000)
  }

  useEffect(async () => {
    const data = await getPosts(offset)
    const firstPage = data?.posts

    setPosts(data?.posts)
    setTotalPosts(data?.total)

    const postsInterval = checkNewPosts(firstPage)

    return () => clearInterval(postsInterval)
  }, [posts, totalPosts, activePost, currentPage])

  const paginationChange = async (e, page) => {
    setCurrentPage(page)
    offset = page * PER_PAGE - PER_PAGE

    if (page !== currentPage) {
      const data = await getPosts(offset)
      setPosts(data.posts)
    }
  }

  const handlePostClick = (post) => {
    setActivePost(post)
  }

  const postList = posts?.map((post) => {
    return (
      <Post
        onClick={() => handlePostClick(post)}
        key={post.postid}
        postid={post.postid}
        creationtime={post.creationtime}
        text={post.text}
        active={post.postid === activePost.postid}
      />
    )
  })

  return (
    <Container fixed>
      <Typography
        m="25px 0"
        fontSize={32}
        variant="h1"
        component="div">
        Social Posts
      </Typography>

      {postList}

      <Stack spacing={2}>
        {posts?.length > 0 && (
          <Pagination
            sx={{ mx: 'auto', my: '40px' }}
            count={count}
            page={currentPage}
            onChange={paginationChange}
            variant="outlined"
          />
        )}
      </Stack>
    </Container>
  )
}

export default Posts
