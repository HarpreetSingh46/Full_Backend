const postRoute = express.Router()
const postcontroller = require("../controller/post.controller");

postRoute.post("/",postcontroller.CreatePost)



module.exports = postRoute