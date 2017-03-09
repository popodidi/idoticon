var defaultGenerator = require('../lib/renderer/default');

defaultGenerator.default("A", 500, 20, "./", "A").catch((err) => {
    console.log(err);
    throw err;
});
