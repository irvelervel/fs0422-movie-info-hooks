import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MovieCard from './components/MovieCard'
import MovieForm from './components/MovieForm'

const App = () => {
  // state = {
  //   selectedMovieTitle: 'Doctor Strange',
  // }

  const [selectedMovieTitle, setSelectedMovieTitle] = useState('Doctor Strange')

  const changeSelectedMovieTitle = (newMovieTitle) => {
    // this.setState({
    //   selectedMovieTitle: newMovieTitle,
    // })
    setSelectedMovieTitle(newMovieTitle)
  }

  return (
    <div className="App">
      <Container>
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={6}>
            <h1>Movie Info App!</h1>
            <MovieForm
              selectedMovieTitle={selectedMovieTitle} // READS THE VALUE
              changeSelectedMovieTitle={changeSelectedMovieTitle} // CHANGES THE VALUE
            />
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={6} className="text-dark">
            {/* MovieCard goes here! */}
            <MovieCard selectedMovieTitle={selectedMovieTitle} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
