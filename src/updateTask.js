const AWS = require("aws-sdk");

const updateTask = async (event) => {
	const dynamodb = new AWS.DynamoDB.DocumentClient();
	const { id } = event.pathParameters;

	const { title, description, done } = JSON.parse(event.body);

	await dynamodb
		.update({
			TableName: "TaskTable",
			Key: { id },
			UpdateExpression: "set done = :done, title = :title, description = :description",
			ExpressionAttributeValues: { ":done": done, ":title": title, ":description": description },
			ReturnValues: "ALL_NEW",
		})
		.promise();

	return { status: 200, body: { message: "tarea actualizada correctamente" } };
};
module.exports = { updateTask };
