import {
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material'
import { SOProps } from '../types'

const ShowOptions = ({ answers, setAnswer }: SOProps) => {
  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value)
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
              label={<Typography sx={{ wordBreak: "break-word" }}>{item.text}
            </Typography>}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  )
}

export default ShowOptions
