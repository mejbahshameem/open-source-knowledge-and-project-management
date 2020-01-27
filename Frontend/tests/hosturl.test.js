const createModule = require('../js/dependency');



// TEST HOST NAME
test('test hostname url', () => {
  expect(createModule.getHostUrl()).toBe('http://localhost');
});
