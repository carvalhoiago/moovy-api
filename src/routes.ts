import { Router, Request, Response } from 'express';
import { getMovies, saveMovie, getMovie, updateMovie, deleteMovie } from './controller/MovieController'

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Hello World!'})
})

routes.get('/movies', getMovies)
routes.post('/movies', saveMovie)
routes.get('/movies/:id', getMovie)
routes.put('/movies/:id', updateMovie)
routes.delete('/movies/:id', deleteMovie)

export default routes
