import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import PropTypes from 'prop-types'
import Moment from 'moment'
import cn from 'classnames'
import '../Post.css'

function Post(props) {
  const time = Moment(props.creationtime)
    .local()
    .format('MM-DD-YYYY hh:mm:ss')

  return (
    <Card
      onClick={props.onClick}
      className={cn({ activePost: props.active })}
      sx={{ maxWidth: 345, mx: 'auto', mb: '20px' }}>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div">
            {time}
          </Typography>
          {props.postid}
          <Typography
            variant="body2"
            color="text.secondary">
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

Post.propTypes = {
  text: PropTypes.string,
  creationtime: PropTypes.string,
  postid: PropTypes.number,
  active: PropTypes.bool,
  onClick: PropTypes.func
}

export default Post
