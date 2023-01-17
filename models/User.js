import mongoose from "mongoose";

//Модели - это то что будет отображаться в таблице базы данных MongoDB, например юзеры
const UserSchema = new mongoose.Schema(
	{
		// Не обязательные свойства можем писать без объекта, такие как avatarUrl
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		avatarUrl: String,
	},
	{
		timestamps: true, // дата создания и обновления этой сущности
	}
);

export default mongoose.model("User", UserSchema);
