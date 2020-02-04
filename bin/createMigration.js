const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const migrationsDir = path.join(__dirname, '..', 'api', 'migrations');
const migrations = fs.readdirSync(migrationsDir);

const MIGRATION_TEMPLATE = `module.exports = {
  up: function (q, Sequelize) {
    return q.addColumn('table', 'column_name', Sequelize.STRING);
  },
  down: function (q, Sequelize) {
    return q.removeColumn('table', 'column_name');
  }
};
`;

let currentIndex = 1;
migrations.forEach(name => {
  const match = name.match(/^(\d\d\d\d)_[\.\w]+$/);

  if (!match) {
    throw new Error(`Bad filename ${name}`);
  }

  if (parseInt(match[1]) !== currentIndex) {
    throw new Error(`Migration ${name} should be ${currentIndex.toString().padStart(4, '0')}`);
  }

  currentIndex++;
});

inquirer.prompt([
  {
    type: 'string',
    name: 'name',
    message: 'Name the file:'
  }
])
  .then(answers => {
    const filename = `${currentIndex.toString().padStart(4, '0')}_${answers.name.replace(/ +/g, '_')}.js`;
    const fullpath = path.join(migrationsDir, filename);

    console.log(`Creating ${filename}`);

    fs.writeFileSync(fullpath, MIGRATION_TEMPLATE, { encoding: 'utf8' });

    console.log('Done!');
  })
  .catch(err => console.error(err));
