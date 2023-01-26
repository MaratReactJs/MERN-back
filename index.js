import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";
import {
	registerValidation,
	loginValidation,
	postCreateValidation,
} from "./validation.js";

mongoose.set("strictQuery", true);
mongoose
	.connect(mongoUri)
	.then(() => console.log("MongoDB OK"))
	.catch((err) => console.log("MongoDB ERROR", err));

const app = express();

// загрузка картинок
const storage = multer.diskStorage({
	destination: (vv, m, cb) => {
		cb(null, "uploads");
	},
	filename: (dd, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

app.use(express.json()); // позволяет читать json запросы

app.use(cors()); // разрешаем делать запрос на наш бэкэнд с любых доменов, без него мы могли запрашивать толь с нашего 4444

app.use("/uploads", express.static("uploads")); // показываем экспресу где искать наши файлы

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
	res.json({
		url: `uploads/${req.file.originalname}`, // вернем на клиент ссылку на файл
	});
});

app.post(
	"/auth/register",
	registerValidation,
	handleValidationErrors,
	UserController.register
);
app.post(
	"/auth/login",
	loginValidation,
	handleValidationErrors,
	UserController.login
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.get("/tags", PostController.getLastTags);
app.post(
	"/posts",
	checkAuth,
	postCreateValidation,
	handleValidationErrors,
	PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, postCreateValidation, PostController.update);

app.listen(process.env.PORT || 4444, (err) => {
	if (err) {
		console.log(err);
	}
	console.log("Server OK!");
});
