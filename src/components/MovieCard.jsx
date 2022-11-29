// Because MovieCard is a component that will be in charge of fetching
// data from the omdbAPI, this already tells me that MovieCard needs to be
// created as a Class Component

import { useEffect, useState } from 'react'
import { Alert, Card, Spinner } from 'react-bootstrap'

const MovieCard = ({ selectedMovieTitle }) => {
  // this.props.selectedMovieTitle is the movie chosen in the dropdown
  // we're receiving it from the App component, which is passing it to us as a prop

  // componentDidMount is a lifecycle method that executes JUST ONCE
  // it is meant to fetch data for filling up the interface of a component on launch

  // every time you fetch something from the internet and you need your interface
  // to use it, put it into the state: after setState your interface will render
  // again to show the new data
  // state = {
  //   selectedMovieObject: null,
  //   // null is the perfect initial value for an OBJECT STATE PROPERTY
  //   isLoading: true,
  // }

  const [selectedMovieObject, setSelectedMovieObject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // componentDidMount = () => {
  //   // stuff launched here will execute one time upon launch!
  //   console.log('MovieCard component finished mounting!')
  //   // we're going to perform our fetch here! :)
  //   this.fetchMovieDetails()
  // }

  useEffect(() => {
    console.log('MovieCard component finished mounting!')
    fetchMovieDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // componentDidMount is perfect for fetching data initially, to fill up our
  // component with dynamic content for its initial load

  // when we need an operation like a fetch to be re-executed though, we
  // might need to interact with the updating phase of a component...
  // a component updates whenever a change is detected in its STATE or in its PROPS
  // to intercept these updating phases and inject your own logic into them
  // you need to work with componentDidUpdate, which is a lifecycle method
  // that is being automatically executed just AFTER the detection of an update

  // componentDidUpdate = (prevProps, prevState) => {
  //   console.log('MOVIECARD HAS BEEN UPDATED!')
  //   console.log('prevProps', prevProps)
  //   console.log('current props', this.props)
  //   // this.fetchMovieDetails()
  //   // unfortunately just re-invoking the fetchMovieDetails function at
  //   // every update solves the problem, but also creates a bigger one: an infinite loop.
  //   // because our fetchMovieDetails function sets the state, and that is enough
  //   // for componentDidUpdate to launch again :(

  //   // what can we do to solve this problem?
  //   // we'd like this componentDidUpdate method to be launched in this situation
  //   // whenever the title changes from the props, but NOT when the state is set!

  //   // every time you use componentDidUpdate, you have to put a constraint!
  //   // you want to pull the handbrake

  //   if (prevProps.selectedMovieTitle !== this.props.selectedMovieTitle) {
  //     console.log("NOW IT'S THE TIME TO FETCH THE NEW MOVIE!")
  //     this.fetchMovieDetails()
  //     // this if statement launches the fetch function JUST when the selectedMovieTitle
  //     // changes from the props, NOT when the state is being set one more time
  //   }
  // }

  useEffect(() => {
    fetchMovieDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMovieTitle])

  const fetchMovieDetails = async () => {
    try {
      let response = await fetch(
        'http://www.omdbapi.com/?apikey=24ad60e9&s=' + selectedMovieTitle
      )
      // http://www.omdbapi.com/?apikey=24ad60e9&s=Doctor%20Strange
      console.log(response)
      if (response.ok) {
        let data = await response.json() // this extracts the body from the Response object
        let chosenMovieInfo = data.Search[0]
        console.log('chosen movie info', chosenMovieInfo)
        // this.setState({
        //   selectedMovieObject: chosenMovieInfo,
        //   isLoading: false,
        // })
        setSelectedMovieObject(chosenMovieInfo)
        setIsLoading(false)
        // ...now render() will fire again!
      } else {
        console.log('something went wrong :(')
        // this.setState({
        //   isLoading: false,
        // })
        setIsLoading(false)
        setIsError(true)
      }
    } catch (error) {
      console.log(error)
      // this.setState({
      //   isLoading: false,
      // })
      setIsLoading(false)
      setIsError(true)
    }
  }

  return (
    <div>
      {/* the ternary operator ?: renders a portion of JSX or another one,
        depending on the value you're checking on! */}
      {isLoading ? (
        <Spinner animation="border" variant="warning" />
      ) : isError ? (
        <Alert variant="danger">Whoopsie, error happened! :(</Alert>
      ) : (
        <Card>
          <Card.Img variant="top" src={selectedMovieObject.Poster} />
          <Card.Body>
            <Card.Title>{selectedMovieObject.Title}</Card.Title>
            <Card.Text>
              {selectedMovieObject.Year} - {selectedMovieObject.imdbID}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  )
}

export default MovieCard
