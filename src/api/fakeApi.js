import users from './../assets/data/data.json';

export const getAll = (page, amount) => {
  const start = page * amount;
  const end = start + amount;

  return new Promise((resolve => {
      setTimeout(() => {
          resolve({
              count: users.length,
              results: users.slice(start, end),
          });
      }, 500);
  }));
};
