// const createKey = require('./createKey');

// createKey({ id: 1 })
//   .then(key => console.log(key))
//   .catch(err => console.error(err));

const updateKey = require('./updateKey');

updateKey(1)
  .then(key => console.log(key))
  .catch(err => console.error(err));
