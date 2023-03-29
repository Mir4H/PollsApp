import { Typography, List, ListItem, ListItemText, LinearProgress } from '@mui/material'
import { getPercentage, sumVotes } from '../helpers'
import { IAnswers } from '../types'

const ShowResults = ({ answers }: { answers: IAnswers[] }) => {
  return (
    <>
      <Typography paragraph>This poll has {sumVotes(answers)} answers, the results are:</Typography>
      <List>
        {answers.map((item, i) => (
          <ListItem key={item.choice_id}>
            <ListItemText
              primary={
                <>
                  <Typography sx={{ wordBreak: 'break-word' }}>{item.text}</Typography>
                  <LinearProgress variant="determinate" value={getPercentage(i, answers)} />
                  <Typography variant="body2" color="text.secondary">{`${getPercentage(
                    i,
                    answers
                  )}%`}</Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default ShowResults
