const createModule = require('../js/createWorkflow');



// CREATE TASK WITH NO INPUT TESTS
test('test all empty inputs', () => {
  document.getElementById("taskstep").value = "";
  document.getElementById("taskname").value = "";
  document.getElementById("taskdesc").value = "";
  document.getElementById("taskdays").value = "";
  expect(createModule.taskCreateFunction()).toBeUndefined();
});

test('test step empty input', () => {
  document.getElementById("taskstep").value = "";
  document.getElementById("taskname").value = "test";
  document.getElementById("taskdesc").value = "test";
  document.getElementById("taskdays").value = "1";
  expect(createModule.taskCreateFunction()).toBeUndefined();
});

test('test name empty input', () => {
  document.getElementById("taskstep").value = "1";
  document.getElementById("taskname").value = "";
  document.getElementById("taskdesc").value = "test";
  document.getElementById("taskdays").value = "1";
  expect(createModule.taskCreateFunction()).toBeUndefined();
});

test('test description empty input', () => {
  document.getElementById("taskstep").value = "1";
  document.getElementById("taskname").value = "test";
  document.getElementById("taskdesc").value = "";
  document.getElementById("taskdays").value = "1";
  expect(createModule.taskCreateFunction()).toBeUndefined();
});

test('test days empty input', () => {
  document.getElementById("taskstep").value = "1";
  document.getElementById("taskname").value = "test";
  document.getElementById("taskdesc").value = "test";
  document.getElementById("taskdays").value = "";
  expect(createModule.taskCreateFunction()).toBeUndefined();
});


// CREATE TASK WITH WRONG STEP/DAYS TESTS
test('test step wrong input', () => {
  document.getElementById("taskstep").value = "-1";
  document.getElementById("taskname").value = "test";
  document.getElementById("taskdesc").value = "test";
  document.getElementById("taskdays").value = "1";
  expect(createModule.taskCreateFunction()).toBeUndefined();
});

test('test step wrong input', () => {
  document.getElementById("taskstep").value = "0";
  document.getElementById("taskname").value = "test";
  document.getElementById("taskdesc").value = "test";
  document.getElementById("taskdays").value = "1";
  expect(createModule.taskCreateFunction()).toBeUndefined();
});

test('test days wrong input', () => {
  document.getElementById("taskstep").value = "1";
  document.getElementById("taskname").value = "test";
  document.getElementById("taskdesc").value = "test";
  document.getElementById("taskdays").value = "-1";
  expect(createModule.taskCreateFunction()).toBeUndefined();
});


// Save Workflow WITH NO INPUT TESTS
test('test without any input', () => {
  document.getElementById("workflowname1").value = "";
  document.getElementById("workflowdesc1").value = "";
  document.getElementById("workflowlocation1").value = "";
  expect(createModule.saveWorkflowChanges()).toBeUndefined();
});

test('test without workflow name', () => {
  document.getElementById("workflowname1").value = "";
  document.getElementById("workflowdesc1").value = "test";
  document.getElementById("workflowlocation1").value = "test";
  expect(createModule.saveWorkflowChanges()).toBeUndefined();
});

test('test without workflow description', () => {
  document.getElementById("workflowname1").value = "test";
  document.getElementById("workflowdesc1").value = "";
  document.getElementById("workflowlocation1").value = "test";
  expect(createModule.saveWorkflowChanges()).toBeUndefined();
});

test('test without workflow location', () => {
  document.getElementById("workflowname1").value = "test";
  document.getElementById("workflowdesc1").value = "test";
  document.getElementById("workflowlocation1").value = "";
  expect(createModule.saveWorkflowChanges()).toBeUndefined();
});

