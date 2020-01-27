const scriptModule = require('../js/dependency');



// INPUT TEST
test('test empty input', () => {
  expect(scriptModule.isEmpty('')).toBe(true);
});
test('test empty input with space', () => {
  expect(scriptModule.isEmpty(' ')).toBe(true);
});

test('test 1 character input', () => {
  expect(scriptModule.isEmpty('a')).toBe(false);
});

test('test 1 character input with space', () => {
  expect(scriptModule.isEmpty(' a')).toBe(false);
});


//EMAIL CHECK TEST
test('bad syntax email', () => {
  expect(scriptModule.isEmailCorrect('a@a.a')).toBe(false);
  expect(scriptModule.isEmailCorrect('cool@email.a')).toBe(false);
  expect(scriptModule.isEmailCorrect('@gmail.com')).toBe(false);
  expect(scriptModule.isEmailCorrect('a@com')).toBe(false);
  expect(scriptModule.isEmailCorrect('a@.com')).toBe(false);
  expect(scriptModule.isEmailCorrect('acom')).toBe(false);
  expect(scriptModule.isEmailCorrect('a.com')).toBe(false);
  expect(scriptModule.isEmailCorrect('a')).toBe(false);
});

test('correct syntax email', () => {
  expect(scriptModule.isEmailCorrect('hey@mail.com')).toBe(true);
  expect(scriptModule.isEmailCorrect('a@a.de')).toBe(true);
});



// TEST SAVED TOKEN
localStorage.removeItem("jsonAuth");


var jsonAuth = { 'name': 'testname', 'token': 'testtoken123' };
localStorage.setItem('jsonAuth', JSON.stringify(jsonAuth));

test('Token stored', () => {
expect(scriptModule.getToken().token).toBe('testtoken123');
});
