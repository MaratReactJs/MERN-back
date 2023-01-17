import mongoose from "mongoose";

//Модели - это то что будет отображаться в таблице базы данных MongoDB, например юзеры
const PostSchema = new mongoose.Schema(
	{
		// Не обязательные свойства можем писать без объекта, такие как avatarUrl
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		tags: {
			type: Array,
			default: [],
		},
		viewsCont: {
			type: Number,
			default: 0,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		imageUrl: String,
	},
	{
		timestamps: true, // дата создания и обновления этой сущности
	}
);

export default mongoose.model("Post", PostSchema);
