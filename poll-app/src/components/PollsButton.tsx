import {
    Button
  } from '@mui/material'
  import theme from '../theme'

interface Props {
    id?: string,
    text: string, 
    func?: () => void,
    disabled?: boolean,
  }

const PollsButton = ({id, text, func, disabled}: Props) => {
  return (
    <Button
      id={id}
      onClick={func}
      variant="outlined"
      size="small"
      sx={{
        color: theme.colors.secondary,
        '&:hover': {
          backgroundColor: theme.colors.secondary,
          color: theme.colors.white
        }
      }}
      disabled={disabled}
    >
      {text}
    </Button>
  )
}
export default PollsButton