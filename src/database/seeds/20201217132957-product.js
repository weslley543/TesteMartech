module.exports = {
  up: (QueryInterface) => {
    return QueryInterface.bulkInsert(
      'produto',
      [
        {
          description: 'Camiseta',
          preco_unitario: 18.99,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Calça',
          preco_unitario: 20.49,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Bracelete',
          preco_unitario: 20.49,
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  down: () => {},
};
