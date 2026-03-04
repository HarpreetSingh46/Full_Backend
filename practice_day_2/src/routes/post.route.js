const postRoute = express.Router()
const postcontroller = require("../controller/post.controller");

postRoute.post("/",  upload.single("image"),postcontroller.CreatePost)

postRoute.get("/",postcontroller.Getpost)



module.exports = postRoute