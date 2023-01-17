import PostModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
	try {
		const posts = await PostModel.find().limit(5).exec();
		const tags = posts
			.map((obj) => obj.tags)
			.flat()
			.slice(0, 4);
		res.json(tags);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Не удалось получить статьи" });
	}
};

export const getAll = async (req, res) => {
	try {
		const posts = await PostModel.find().populate("user").exec(); // populate для того чтобы сделать связь постов с юзерами,  посту мы сможем найти все данные автора
		res.json(posts);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Не удалось получить статьи" });
	}
};

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id;

		PostModel.findByIdAndUpdate(
			{
				_id: postId, // найти пост
			},
			{
				$inc: { viewsCont: 1 }, // метод из Mongo $inc - инкрементировать что то в посте
			},
			{ returnDocument: "after" }, // после обновления вернуть пост
			(err, doc) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Не удалось вернуть статью" });
				}

				if (!doc) {
					return res.status(404).json({ message: "Статья не найдена" });
				}

				res.json(doc);
			}
		);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Не удалось получить статьи" });
	}
};

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			tags: req.body.tags,
			imageUrl: req.body.imageUrl,
			user: req.userId,
		});

		const post = await doc.save();
		res.json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Не удалось создать статью" });
	}
};

export const remove = async (req, res) => {
	try {
		const postId = req.params.id;
		PostModel.findOneAndDelete({ _id: postId }, (err, doc) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Не удалось удалить статью" });
			}

			if (!doc) {
				return res.status(404).json({ message: "cerf" });
			}

			res.json({ success: true });
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Не удалось получить статью" });
	}
};

export const update = async (req, res) => {
	try {
		const postId = req.params.id;
		await PostModel.findOneAndUpdate(
			{ _id: postId },
			{
				title: req.body.title,
				text: req.body.text,
				tags: req.body.tags,
				imageUrl: req.body.imageUrl,
				user: req.userId,
			}
		);

		res.json({ success: true });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Не удалось обновить статью" });
	}
};
