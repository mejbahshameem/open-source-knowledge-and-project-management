const createModule = require('../js/forgotpassword');



// Submit password and email WITH NO INPUT TESTS
test('test with empty inputs', () => {
  document.getElementById("email").value = "";
  document.getElementById("pass").value = "";
  document.getElementById("pass2").value = "";
  expect(createModule.submitPass()).toBeUndefined();
});

test('test with empty email input', () => {
  document.getElementById("email").value = "";
  document.getElementById("pass").value = "test";
  document.getElementById("pass2").value = "test";
  expect(createModule.submitPass()).toBeUndefined();
});

test('test with empty first password input', () => {
  document.getElementById("email").value = "test";
  document.getElementById("pass").value = "";
  document.getElementById("pass2").value = "test";
  expect(createModule.submitPass()).toBeUndefined();
});


test('test with empty second password input', () => {
  document.getElementById("email").value = "test";
  document.getElementById("pass").value = "test";
  document.getElementById("pass2").value = "";
  expect(createModule.submitPass()).toBeUndefined();
});


// Submit wrong email
test('test with wrong email', () => {
  document.getElementById("email").value = "test";
  document.getElementById("pass").value = "test";
  document.getElementById("pass2").value = "test";
  expect(createModule.submitPass()).toBeUndefined();
});