const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const workFlowRouter = require('./routers/workflow');
const taskRouter = require('./routers/task');
const commentRouter = require('./routers/comment');
const userworkflowRouter = require('./routers/userworkflowcontrol');
require('./utility/cronjobs');

const app = express();

// app.get('/', (_, res) => res.json({ test: 'Working' }));
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Methods',
		'GET, PUT, POST, DELETE, OPTIONS, PATCH'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization, Content-Length, X-Requested-With'
	);
	next();
});

app.use(express.json());
app.use(userRouter);
app.use(workFlowRouter);
app.use(taskRouter);
app.use(commentRouter);
app.use(userworkflowRouter);

module.exports = app;
