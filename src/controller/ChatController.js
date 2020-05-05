const connection = require('../data/connection');

module.exports = {
  async create(request, response) {
    try {
      const room = `room-${request.body.investor}-${request.body.professional}`;

      await connection('chats').insert({
        investor: request.body.investor,
        professional: request.body.professional,
        room,
      });

      return response.json({
        investor: request.body.investor,
        professional: request.body.professional,
        room,
      });
    } catch (error) {
      console.log(error, 'error');

      response.status(500).json({ error: 'Error during create chat.' });
    }
  },

  async index(request, response) {
    try {
      const professional = await connection('chats')
        .select('*')
        .where('professional', request.userId);

      const investor = await connection('chats')
        .select('*')
        .where('investor', request.userId);

      const result = [...professional, ...investor];

      return response.json(result);
    } catch (error) {
      console.log(error, 'error');
      response.status(500).json({ error: 'Error during get chats.' });
    }
  },
};
