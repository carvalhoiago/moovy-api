import { getRepository } from 'typeorm'
import { Movies } from '../entity/Movie'
import { Request, Response } from 'express'
import { print } from 'util'

export const getMovies = async (request: Request, response: Response) => {
  const movies = await getRepository(Movies).find()
  return response.json(movies)
}

export const saveMovie = async (request: Request, response: Response) => {
  const movie = await getRepository(Movies).save(request.body)
  return response.json(movie)
}

export const getMovie = async (request: Request, response: Response) => {
  const { id } = request.params
  const movie = await getRepository(Movies).findOne(id)
  
  if(movie === undefined){
    return response.status(404).json({message: "movie not found"})
  }

  return response.json(movie)
}

export const updateMovie = async (request: Request, response: Response) => {
  const { id } = request.params

  const movie = await getRepository(Movies).update(id, request.body)

  if (movie.affected === 1){
    const movieUpdated =  await getRepository(Movies).findOne(id)
    return response.json(movieUpdated)
  }

  return response.status(404).json({message: "movie not found"})
}

export const deleteMovie = async (request: Request, response: Response) => {
  const { id } = request.params

  const movie = await getRepository(Movies).delete(id)

  if (movie.affected === 1){
    return response.json({message: "movie succesfully deleted"})
  }

  return response.status(404).json({message: "movie not found"})
}