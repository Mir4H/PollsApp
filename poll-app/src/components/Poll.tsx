import {
  Card,
  CardContent,
  Collapse,
  CardHeader,
  ClickAwayListener,
  CardActions
} from '@mui/material'
import { useEffect, useState } from 'react'
import { apiEndpoint, ENDPOINTS } from '../api'
import dayjs from 'dayjs'
import Masonry from 'react-masonry-css'
import theme from '../theme'
import ShowResults from './ShowResults'
import ShowOptions from './ShowOptions'
import PollsButton from './PollsButton'

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

const Poll = () => {
  const [polls, setPolls] = useState<Polls[]>([])
  const [openResults, setOpenResults] = useState<number>(-1)
  const [openPoll, setOpenPoll] = useState<number>(-1)
  const [answers, setAnswers] = useState<Answers[]>([])
  const [answer, setAnswer] = useState<string>('')

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

  const handleClickAway = () => {
    setOpenResults(-1)
    setOpenPoll(-1)
    setAnswers([])
  }

  const handleClick = (i: number, select: string) => {
    select === 'results' ? setOpenResults(i) : setOpenPoll(i)
  }

  const submitAnswer = (id: number, i: number) => {
    apiEndpoint(ENDPOINTS.choices)
      .put(JSON.parse(answer))
      .then((res) => {
        setOpenPoll(-1)
        setAnswer('')
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        getAnswers(i)
      })
    setOpenResults(id)
  }

  const getAnswers = (id: number) => {
    apiEndpoint(ENDPOINTS.choices)
      .fetchById(id)
      .then((res) => {
        setAnswers(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const answerPoll = (id: number, i: number) => {
    getAnswers(id)
    openPoll !== i ? setOpenPoll(i) : setOpenPoll(-1)
    openResults === i ? setOpenResults(i) : setOpenResults(-1)
  }

  const showResult = (i: number) => {
    openResults !== i ? setOpenResults(i) : setOpenResults(-1)
    openPoll !== i ? setOpenPoll(i) : setOpenPoll(-1)
  }

  const close = () => {
    setOpenResults(-1)
    setOpenPoll(-1)
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
              '&:hover':
                openResults === index || openPoll === index
                  ? null
                  : {
                      backgroundColor: theme.colors.attention,
                      color: theme.colors.white
                    }
            }}
          >
            <div style={clickStyle} onClick={() => answerPoll(poll.poll_id, index)}>
              <CardHeader
                titleTypographyProps={{ variant: 'h5' }}
                title={poll.title}
                subheader={dayjs(poll.created_at).format('DD.MM.YYYY')}
              />
            </div>
            <Collapse in={openResults === index} timeout="auto" unmountOnExit>
              <ClickAwayListener onClickAway={handleClickAway}>
                <>
                  <CardContent
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClick(index, 'results')
                    }}
                  >
                    <ShowResults answers={answers} index={index} />
                  </CardContent>
                  <CardActions>
                    <PollsButton
                      text={'Answer poll'}
                      func={() => showResult(index)}
                      disabled={false}
                    />
                    <PollsButton text={'Close'} func={close} disabled={false} />
                  </CardActions>
                </>
              </ClickAwayListener>
            </Collapse>
            <Collapse in={openPoll === index} timeout="auto" unmountOnExit>
              <ClickAwayListener onClickAway={handleClickAway}>
                <>
                  <CardContent
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClick(index, 'poll')
                    }}
                  >
                    <ShowOptions answers={answers} setAnswer={setAnswer} />
                  </CardContent>
                  <CardActions>
                    <PollsButton
                      text={'Confirm selection'}
                      func={() => submitAnswer(index, poll.poll_id)}
                      disabled={answer === ''}
                    />
                    <PollsButton
                      text={'Show Results'}
                      func={() => showResult(index)}
                      disabled={false}
                    />
                  </CardActions>
                </>
              </ClickAwayListener>
            </Collapse>
          </Card>
        </div>
      ))}
    </Masonry>
  ) : null
}

export default Poll
