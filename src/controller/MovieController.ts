import { getRepository } from 'typeorm'
import { Movies } from '../entity/Movie'
import { Request, Response } from 'express'
import { unlink } from 'fs';
var path = require('path')

interface MulterRequest extends Request {
  file: any;
}

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

  const findMovie = await getRepository(Movies).findOne(id)
  
  if(findMovie === undefined){
    return response.status(404).json({message: "movie not found"})
  } else{
    if (findMovie.filename){
      let filepath = path.join(__dirname + '/../../public/' + findMovie.filename)

      unlink(filepath, async (err) => {
        if (err) {
          console.log("erro ao deletar review ", err)
          return response.status(500).json({message: "Internal error"})
        }
      })
    }
  }

  const movie = await getRepository(Movies).delete(id)

  if (movie.affected === 1){
    return response.json({message: "movie succesfully deleted"})
  }

  return response.status(404).json({message: "movie not found"})
}

export const uploadReview = async (request: MulterRequest, response: Response) => {
  const id = request.body.id

  const temp =  {
    filename: request.file.path.split('/').pop(),
  }

  const movie = await getRepository(Movies).update(id, temp)

  if (movie.affected === 1){
    const movieUpdated =  await getRepository(Movies).findOne(id)
    return response.json(movieUpdated)
  }

  return response.status(404).json({message: "movie not found"})
}

export const deleteReview = async (request: Request, response: Response) => {
  const { id } = request.params

  const findMovie = await getRepository(Movies).findOne(id)
  
  if(findMovie === undefined){
    return response.status(404).json({message: "movie not found"})
  } else{

    let filepath = path.join(__dirname + '/../../public/' + findMovie.filename)

    unlink(filepath, async (err) => {
      if (err) {
        console.log("erro ao deletar review ", err)
        return response.status(500).json({message: "Internal error"})
      }
      const temp = {
        filename: null,
      }
      const movie = await getRepository(Movies).update(id, temp)

      if (movie.affected === 1){
        const movieUpdated =  await getRepository(Movies).findOne(id)
        return response.json(movieUpdated)
      }
      return response.status(404).json({message: "movie not found"})
    })
  }
  
}