import { useState } from 'react'
import { Formik, Form } from 'formik'
import { Button, TextField, Typography, Box, Alert, CircularProgress } from '@mui/material'
import * as Yup from 'yup'
import { apiEndpoint, ENDPOINTS } from '../api'
import { useNavigate, useParams } from 'react-router-dom'
import theme from '../theme'

interface Formvalues {
  option1: string
  option2: string
  option3: string
  option4: string
  option5: string
}

const ChoiceForm = () => {
  const [success, setSuccess] = useState<boolean>(false)
  const { id, poll } = useParams()
  const navigate = useNavigate()

  const submitForm = (values: Formvalues) => {
    console.log('submitting')
    Object.values(values)?.forEach((element) => {
      if (element !== '') {
        apiEndpoint(ENDPOINTS.choices)
          .post(JSON.parse(`{"text": "${element}", "poll_id": ${id}}`))
          .then((res) => {
            setSuccess(true)
            setTimeout(() => {
              setSuccess(false)
              navigate('/')
            }, 4000)
          })
          .catch((err) => console.log(err))
      }
    })
  }
  const validationFields = Yup.object({
    option1: Yup.string()
      .required('This field is required')
      .max(50, 'The maximum number of characters is 50'),
    option2: Yup.string()
      .required('This field is required')
      .max(50, 'The maximum number of characters is 50'),
    option3: Yup.string().max(50, 'The maximum number of characters is 50'),
    option4: Yup.string().max(50, 'The maximum number of characters is 50'),
    option5: Yup.string().max(50, 'The maximum number of characters is 50')
  })
  const initialValues = {
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    option5: ''
  }

  const cancelAdd = () => {
    apiEndpoint(ENDPOINTS.polls)
      .delete(Number(id))
      .then((res) => {
        navigate('/')
      })
      .catch((err) => console.log(err))
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationFields}
      onSubmit={(values) => submitForm(values)}
    >
      {({ errors, handleBlur, handleChange, touched, values }) => {
        return (
          <>
            <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
              <Box
                display="flex"
                justifyContent="center"
                sx={{
                  minWidth: '50vw',
                  borderRadius: 2,
                  backgroundColor: theme.colors.white,
                  p: 5
                }}
              >
                <Box
                  sx={{
                    maxWidth: '80%'
                  }}
                >
                  {success ? (
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <Alert variant="outlined" severity="success" sx={{ m: 3 }}>
                        <Typography sx={{ wordBreak: 'break-word' }}>{`New Poll ${poll} added successfully`}</Typography>
                      </Alert>
                      <CircularProgress color="success" />
                    </Box>
                  ) : (
                    <>
                      <Typography variant="h4" sx={{ pb: 2, wordBreak: 'break-word' }}>
                        Choose options for the poll: {poll}
                      </Typography>
                      <Form>
                        <TextField
                          id="option1"
                          error={Boolean(touched.option1 && errors.option1)}
                          fullWidth
                          required
                          helperText={touched.option1 && errors.option1}
                          label="First Option"
                          name="option1"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          value={values.option1}
                          variant="outlined"
                          margin="dense"
                        />
                        <TextField
                          id="option2"
                          error={Boolean(touched.option2 && errors.option2)}
                          fullWidth
                          required
                          helperText={touched.option2 && errors.option2}
                          label="Second Option"
                          name="option2"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          value={values.option2}
                          variant="outlined"
                          margin="dense"
                        />
                        <TextField
                          error={Boolean(touched.option3 && errors.option3)}
                          fullWidth
                          helperText={touched.option3 && errors.option3}
                          label="Third Option (Optional)"
                          name="option3"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          value={values.option3}
                          variant="outlined"
                          margin="dense"
                        />
                        <TextField
                          error={Boolean(touched.option4 && errors.option4)}
                          fullWidth
                          helperText={touched.option4 && errors.option4}
                          label="Fourth Option (Optional)"
                          name="option4"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          value={values.option4}
                          variant="outlined"
                          margin="dense"
                        />
                        <TextField
                          error={Boolean(touched.option5 && errors.option5)}
                          fullWidth
                          helperText={touched.option5 && errors.option5}
                          label="Fifth Option (Optional)"
                          name="option5"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          value={values.option5}
                          variant="outlined"
                          margin="dense"
                        />
                        <Button
                          id="submitchoices"
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
                          id="cancelForm"
                          type="button"
                          onClick={cancelAdd}
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
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </>
        )
      }}
    </Formik>
  )
}

export default ChoiceForm
