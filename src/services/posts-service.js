import axios from 'axios'

const getPosts = async (offset) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_POSTS_SERVICE_BASE_URL}/12077/posts/?app_id=f0afca337586413cae1e68689d5f50b5&app_secret=${process.env.REACT_APP_POSTS_SERVICE_SECRET_KEY}&offset=${offset}&limit=10`
    )
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

export default getPosts
