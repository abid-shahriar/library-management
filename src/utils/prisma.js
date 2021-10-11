const recordSelectOptions = {
  id: true,
  issueDate: true,
  returnDate: true,
  book: {
    select: {
      id: true,
      name: true,
      author: true,
      year: true,
      category: true
    }
  },
  customer: {
    select: {
      id: true,
      name: true,
      email: true
    }
  }
};

module.exports = { recordSelectOptions };
