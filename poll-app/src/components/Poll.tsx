import { Card, CardContent, Collapse, CardHeader, Typography, CardActions } from '@mui/material'
import { useEffect, useState } from 'react'
import { apiEndpoint, ENDPOINTS } from '../api'
import dayjs from 'dayjs'
import Masonry from 'react-masonry-css'
import theme from '../theme'
import ShowResults from './ShowResults'
import ShowOptions from './ShowOptions'
import PollsButton from './PollsButton'
import { IAnswers, IPolls } from '../types'
import { clickStyle, breakpoints } from '../helpers'

const Poll = () => {
  const [polls, setPolls] = useState<IPolls[]>([])
  const [openResults, setOpenResults] = useState<number>(-1)
  const [openPoll, setOpenPoll] = useState<number>(-1)
  const [answers, setAnswers] = useState<IAnswers[]>([])
  const [answer, setAnswer] = useState<number>(-1)

  useEffect(() => {
    apiEndpoint(ENDPOINTS.polls)
      .fetch()
      .then((res) => {
        setPolls(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const submitAnswer = (id: number, i: number) => {
    const votes = Number(answers.find(a => a.choice_id === answer)?.votes)+1
    apiEndpoint(ENDPOINTS.polls)
      .put(i, answer, JSON.parse(`{"votes": "${votes}"}`))
      .then((res) => {
        console.log(res.data)
        setAnswers(res.data.choices)
        setOpenPoll(-1)
        setAnswer(-1)
      })
      .catch((err) => {
        console.log(err)
      })
    setOpenResults(id)
  }

  const answerPoll = (id: number, i: number) => {
    apiEndpoint(ENDPOINTS.polls)
      .fetchById(id)
      .then((res) => {
        setAnswers(res.data.choices)
      })
      .catch((err) => {
        console.log(err)
      })
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
                title={
                  <Typography variant="h5" sx={{ wordBreak: 'break-word' }}>
                    {poll.title}
                  </Typography>
                }
                subheader={dayjs(poll.created_at).format('DD.MM.YYYY')}
              />
            </div>
            <Collapse in={openResults === index} timeout="auto" unmountOnExit>
              <CardContent>
                <ShowResults answers={answers} />
              </CardContent>
              <CardActions>
                <PollsButton id="answer" text={'Answer poll'} func={() => showResult(index)} />
                <PollsButton text={'Close'} func={close} />
              </CardActions>
            </Collapse>
            <Collapse in={openPoll === index} timeout="auto" unmountOnExit>
              <CardContent>
                <ShowOptions answers={answers} setAnswer={setAnswer} />
              </CardContent>
              <CardActions>
                <PollsButton
                  id="confirm"
                  text={'Confirm selection'}
                  func={() => submitAnswer(index, poll.poll_id)}
                  disabled={answer === -1}
                />
                <PollsButton id="results" text={'Show Results'} func={() => showResult(index)} />
              </CardActions>
            </Collapse>
          </Card>
        </div>
      ))}
    </Masonry>
  ) : null
}

export default Poll

