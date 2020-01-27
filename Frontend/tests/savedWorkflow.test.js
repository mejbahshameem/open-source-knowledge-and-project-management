const createModule = require('../js/savedWorkflow');



// CREATE COMMENT WITH NO INPUT TESTS
test('test with empty inputs', () => {
  document.getElementById("commentInput").value = "";
  expect(createModule.writeComment()).toBeUndefined();
});

test('test with empty inputs and space', () => {
  document.getElementById("commentInput").value = " ";
  expect(createModule.writeComment()).toBeUndefined();
});