const notesController = require('../src/controllers/notes.controller.js');

test('should return 200 if there is no issues', async () => {
  const req = {};
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  await notesController.getAll(req, res, next); // importante el await

  expect(res.status).toHaveBeenCalledWith(200);
});