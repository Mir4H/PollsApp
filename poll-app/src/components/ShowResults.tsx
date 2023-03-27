import {
  Typography,
  List,
  ListItem,
  ListItemText,
  LinearProgress
} from '@mui/material'
import { Answers } from './Poll'

const ShowResults = ({ answers, index }: { answers: Answers[]; index: number }) => {
  const sumVotes = (answers: Answers[]): number => {
    const sum = answers.reduce((accumulator, currentValue) => accumulator + currentValue.votes, 0)
    return sum
  }

  const getPercentage = (i: number): number => {
    const sum = sumVotes(answers)
    const result: number = (answers[i].votes / sum) * 100
    return Number((Number.isNaN(result) ? 0 : result).toFixed(2))
  }

  return (
    <>
      <Typography paragraph>This poll has {sumVotes(answers)} answers, the results are:</Typography>
      <List>
        {answers.map((item, i) => (
          <ListItem key={item.choice_id}>
            <ListItemText
              primary={
                <>
                  <Typography>{item.text}</Typography>
                  <LinearProgress variant="determinate" value={getPercentage(i)} />
                  <Typography variant="body2" color="text.secondary">{`${getPercentage(
                    i
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
