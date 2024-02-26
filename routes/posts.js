import {Router} from "express";
import {checkAuth} from "../utils/checkAuth.js";
import {createPost,getAll,getById,getMyPost,removePost,updatePost} from "../controllers/posts.js";
const router = new Router()

router.post('/', checkAuth,createPost)
router.get('/',getAll)
router.get('/:id',getById)
router.get('/user/me',checkAuth,getMyPost)
router.delete('/:id',checkAuth,removePost)
router.put('/:id',checkAuth,updatePost)
export default router