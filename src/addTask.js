const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addTask = async (event) => {
	try {
		const dynamodb = new AWS.DynamoDB.DocumentClient();

		const { title, description } = JSON.parse(event.body);
		const createdAt = new Date().toUTCString();
		const id = v4();

		const newTask = {
			id,
			title,
			description,
			createdAt,
		};

		await dynamodb
			.put({
				TableName: "TaskTable",
				Item: newTask,
			})
			.promise();

		console.log("netTask: ", newTask);

		return {
			status: 200,
			body: newTask,
		};
	} catch (error) {
		return error;
	}
};

module.exports = { addTask };
