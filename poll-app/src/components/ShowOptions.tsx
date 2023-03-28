import {
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material'
import { Answers } from './Poll'

interface Props {
  answers: Answers[],
  setAnswer: (value: string) => void,
}

const ShowOptions = ({ answers, setAnswer }: Props) => {
  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value)
    console.log(e.target.value)
  }

  return (
    <>
      <Typography paragraph>Please select an option:</Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          {answers.map((item, i) => (
            <FormControlLabel
              id={item.text}
              key={item.choice_id}
              value={`{"choice_id": ${item.choice_id}, "votes": ${item.votes + 1}}`}
              control={<Radio onChange={onOptionChange} />}
              label={item.text}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  )
}

export default ShowOptions
