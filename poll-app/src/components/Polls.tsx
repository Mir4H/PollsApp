import {
  Card,
  CardHeader,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { apiEndpoint, ENDPOINTS } from '../api'
import Masonry from 'react-masonry-css'
import dayjs from 'dayjs'
import theme from '../theme'

interface Polls {
  poll_id: number
  title: string
  created_at: string
}

export interface Answers {
  choice_id: number
  text: string
  votes: number
  poll_id: number
}

const clickStyle = {
  cursor: 'pointer'
}

const Polls = () => {
  const [polls, setPolls] = useState<Polls[]>([])

  useEffect(() => {
    apiEndpoint(ENDPOINTS.polls)
      .fetch()
      .then((res) => {
        setPolls(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const breakpoints = {
    default: 3,
    1200: 2,
    900: 1
  }

  return polls.length !== 0 ? (
    <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {polls.map((poll, index) => (
        <div key={poll.poll_id}>
          <Card
            sx={{
              borderLeft: 2,
              borderColor: theme.colors.attention,
              p: 2,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: theme.colors.attention,
                color: theme.colors.white
              }
            }}
          >
            <CardHeader
              titleTypographyProps={{ variant: 'h5' }}
              title={poll.title}
              subheader={dayjs(poll.created_at).format('DD.MM.YYYY')}
            />
          </Card>
        </div>
      ))}
    </Masonry>
  ) : null
}

export default Polls
