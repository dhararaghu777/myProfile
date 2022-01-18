import React from 'react'
import { makeStyles } from '@mui/styles'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Box } from '@mui/system'

const useStyles = makeStyles((theme) => ({
  Card: {
    width: '27rem',
    height: '13.5rem',
    display: 'flex',
    padding: '0.5rem',

    [theme.breakpoints.down('sm')]: {
      width: '16rem',
      display: 'flex',
      padding: '0.3rem',
    },
  },
  Box1: {
    width: '12rem',
    marginRight: '0.5rem',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  Box2: {
    width: '15rem',
  },

  CardContent: {
    '& div': {
      fontWeight: 500,
    },
    [theme.breakpoints.down('sm')]: {
      '& div': {
        fontWeight: 'bold',
      },
    },
  },
  CardButton: {},

  Text: {
    wordWrap: 'break-word',
    fontSize: '0.8rem',
  },
}))

const alternateImage =
  'https://res.cloudinary.com/raghudara/image/upload/v1638719809/programmer_agkrsx.png'

function UserCard({ user }) {
  const classes = useStyles()
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Card sx={{}} className={classes.Card}>
      <Box className={classes.Box1}>
        <CardMedia
          component='img'
          height='150'
          image={user.image ? user.image : alternateImage}
          alt='User Pic'
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box className={classes.Box2}>
        <CardActionArea>
          <CardContent className={classes.CardContent}>
            <Typography variant='span' className={classes.Text}>
              Name:
            </Typography>
            <Typography
              variant={media ? 'body1' : 'h6'}
              gutterBottom
              component='div'
              color='primary'
              className={classes.Text}
            >
              {user.name}
            </Typography>
            <Typography variant='span' className={classes.Text}>
              Email Id:
            </Typography>
            <Typography
              variant={media ? 'body2' : 'body1'}
              gutterBottom
              component='div'
              className={classes.Text}
            >
              {user.email}
            </Typography>
            <Typography variant='span' className={classes.Text}>
              Username:
            </Typography>
            <Typography
              variant={media ? 'body2' : 'body1'}
              className={classes.Text}
              component='div'
            >
              {user.username}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.CardButton}>
          <Button variant='outlined' size='small'>
            View Profile
          </Button>
        </CardActions>
      </Box>
    </Card>
  )
}

export default UserCard
