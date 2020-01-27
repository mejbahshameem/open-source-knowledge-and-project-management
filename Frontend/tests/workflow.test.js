const createModule = require('../js/workflow');



// CREATE COMMENT WITH NO INPUT TESTS
test('test with empty inputs', () => {
  document.getElementById("commentInput").value = "";
  expect(createModule.writeComment()).toBeUndefined();
});

test('test with empty inputs', () => {
  document.getElementById("commentInput").value = " ";
  expect(createModule.writeComment()).toBeUndefined();
});



// Save Workflow WITH NO INPUT TESTS
test('test without any input', () => {
  document.getElementById("workflowname1").value = "";
  document.getElementById("workflowdesc1").value = "";
  document.getElementById("workflowlocation1").value = "";
  expect(createModule.saveChanges()).toBeUndefined();
});

test('test without workflow name', () => {
  document.getElementById("workflowname1").value = "";
  document.getElementById("workflowdesc1").value = "test";
  document.getElementById("workflowlocation1").value = "test";
  expect(createModule.saveChanges()).toBeUndefined();
});

test('test without workflow description', () => {
  document.getElementById("workflowname1").value = "test";
  document.getElementById("workflowdesc1").value = "";
  document.getElementById("workflowlocation1").value = "test";
  expect(createModule.saveChanges()).toBeUndefined();
});

test('test without workflow location', () => {
  document.getElementById("workflowname1").value = "test";
  document.getElementById("workflowdesc1").value = "test";
  document.getElementById("workflowlocation1").value = "";
  expect(createModule.saveChanges()).toBeUndefined();
});

