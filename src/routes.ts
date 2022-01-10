import { Router, Request, Response } from 'express';
import { getMovies, saveMovie, getMovie, updateMovie, deleteMovie, uploadReview, deleteReview } from './controller/MovieController'
const routes = Router();
const multer = require('multer')
var path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + '/../public/'))
        },
        filename: function (req, file, cb) {
            cb(null,Date.now() + path.extname(file.originalname))
        }
   })

   var upload = multer({storage: storage});

interface MulterRequest extends Request {
    file: any;
}

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Hello World!'})
})

routes.get('/movies', getMovies)
routes.post('/movies', saveMovie)
routes.get('/movies/:id', getMovie)
routes.put('/movies/:id', updateMovie)
routes.delete('/movies/:id', deleteMovie)

routes.put('/upload', upload.single('review'), uploadReview)
routes.put('/delete-review/:id', deleteReview)




export default routes
