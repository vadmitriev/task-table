import users from 'assets/data/data.json';

export const getAll = (page, amount) => {
  const start = Number(page) * Number(amount);
  const end = start + Number(amount);

  return new Promise((resolve => {
      setTimeout(() => {
          resolve({
              count: users.length,
              results: users.slice(start, end),
          });
      }, 500);
  }));
};

export const getUserByName = (name, amount) => {

    return new Promise((resolve => {
        setTimeout(() => {
            const results = name
                ? users.filter((user) => {
                    return user.Fullname
                        .toLowerCase()
                        .includes(name.toLowerCase())
                })
                : users;

            resolve({
                count: results.length <= amount ? results.length: amount,
                results: results.slice(0, amount),
            });
        }, 500);
    }));
};
