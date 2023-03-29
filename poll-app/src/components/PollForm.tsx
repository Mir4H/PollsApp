import { Formik, Form } from 'formik'
import { Button, TextField, Typography, Box } from '@mui/material'
import * as Yup from 'yup'
import { apiEndpoint, ENDPOINTS } from '../api'
import { useNavigate } from 'react-router-dom'
import theme from '../theme'
import { FormvaluesPF } from '../types'

const PollForm = () => {
  const navigate = useNavigate()

  const submitForm = (values: FormvaluesPF) => {
    apiEndpoint(ENDPOINTS.polls)
      .post(JSON.parse(`{"title": "${values.poll}"}`))
      .then((res) => {
        navigate(`/choices/${res.data}/${values.poll}`)
      })
      .catch((err) => console.log(err))
  }

  return (
    <Formik
      initialValues={{
        poll: ''
      }}
      validationSchema={Yup.object({
        poll: Yup.string()
          .required('This field is required')
          .max(50, 'The maximum number of characters is 50')
      })}
      onSubmit={(values) => submitForm(values)}
    >
      {({ errors, handleBlur, handleChange, touched, values }) => {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
            <Box
              sx={{
                minWidth: '50vw',
                borderRadius: 2,
                backgroundColor: theme.colors.white,
                p: 5
              }}
            >
              <Typography variant="h3" sx={{ pb: 2 }}>
                Create a Poll
              </Typography>

              <Form>
                <TextField
                  error={Boolean(touched.poll && errors.poll)}
                  fullWidth
                  required
                  helperText={touched.poll && errors.poll}
                  label="Poll to insert"
                  id="poll"
                  name="poll"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.poll}
                  variant="outlined"
                  margin="dense"
                />
                <Button
                  id="submit"
                  type="submit"
                  variant="outlined"
                  size="large"
                  sx={{
                    mr: 1,
                    mt: 1,
                    color: theme.colors.secondary,
                    '&:hover': {
                      backgroundColor: theme.colors.secondary,
                      color: theme.colors.white
                    }
                  }}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate('/')}
                  variant="outlined"
                  size="large"
                  sx={{
                    mr: 1,
                    mt: 1,
                    color: theme.colors.secondary,
                    '&:hover': {
                      backgroundColor: theme.colors.secondary,
                      color: theme.colors.white
                    }
                  }}
                >
                  Cancel
                </Button>
              </Form>
            </Box>
          </Box>
        )
      }}
    </Formik>
  )
}

export default PollForm
