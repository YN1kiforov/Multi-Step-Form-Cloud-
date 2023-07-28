const readline = require('readline');
const fs = require('fs');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const packageJsonPath = './package.json';

function readPackageJson() {
  const data = fs.readFileSync(packageJsonPath);
  return JSON.parse(data);
}

function writePackageJson(data) {
  fs.writeFileSync(packageJsonPath, JSON.stringify(data, null, 2));
}

async function updateDependencies(packageJson, outdatedDependencies) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('Необновленные зависимости:');
  outdatedDependencies.forEach((dep) => {
    console.log(`${dep.name}: ${dep.current} -> ${dep.latest}`);
  });

  const answer = await new Promise((resolve) => {
    rl.question('Вы хотите обновить зависимости? (y/n): ', (input) => {
      resolve(input.toLowerCase());
      rl.close();
    });
  });

  if (answer === 'y') {
    outdatedDependencies.forEach((dep) => {
      packageJson.dependencies[dep.name] = `${dep.latest}`;
    });
    writePackageJson(packageJson);
    console.log('Зависимости успешно обновлены!');
  } else {
    console.log('Обновление зависимостей отменено.');
  }
}

// Функция для получения последней версии зависимости из npm
async function getLatestVersionFromNpm(depName) {
  try {
    const { stdout, stderr } = await exec(`npm show ${depName} version`);
    return stdout.trim();
  } catch (error) {
    throw new Error(`Не удалось получить последнюю версию для ${depName}: ${error.message}`);
  }
}

// Основной код
async function postinstall() {
  try {
    const packageJson = readPackageJson();
    const outdatedDependencies = [];

    for (const depName in packageJson.dependencies) {
      const currentVersion = packageJson.dependencies[depName];
      const latestVersion = await getLatestVersionFromNpm(depName);

      if (currentVersion !== latestVersion) {
        outdatedDependencies.push({
          name: depName,
          current: currentVersion,
          latest: latestVersion,
        });
      }
    }

    if (outdatedDependencies.length > 0) {
      await updateDependencies(packageJson, outdatedDependencies);
    } else {
      console.log('Все зависимости уже обновлены.');
    }
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}

postinstall();


// (function script(){
//   const packageJson = JSON.parse(fs.readFileSync(packageJsonPath))

// })()

// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// function askPermission() {
//   return new Promise((resolve) => {
//     rl.question('Хотите ли вы продолжить установку зависимостей? (yes/no): ', (answer) => {
//       rl.close();
//       resolve(answer.toLowerCase() === 'yes');
//     });
//   });
// }

// async function checkPermission() {
//   const permission = await askPermission();
//   if (!permission) {
//     console.log('Установка зависимостей отменена.');
//     process.exit(0);
//   }
// }

// checkPermission();
