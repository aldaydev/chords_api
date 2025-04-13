const notesController = require('../src/controllers/notes.controller.js');

test('should return 400 if ID is missing', () => {
  const req = { params: {} };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  notesController.getAll(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'Missing ID' });
});