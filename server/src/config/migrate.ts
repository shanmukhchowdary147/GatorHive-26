// import Umzug from "umzug";
// import { Sequelize } from "sequelize";
// import { migrationsPath } from "./vars";

// export const runMigrations = (sequelize: Sequelize) => {
//   const umzug = new Umzug({
//     storage: "sequelize",
//     storageOptions: {
//       sequelize,
//     },

//     migrations: {
//       params: [
//         sequelize.getQueryInterface(),
//         sequelize.constructor,
//         () => {
//           throw new Error(
//             'Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.'
//           );
//         },
//       ],
//       path: migrationsPath,
//       pattern: /\.js$/,
//     },
//   });

//   return umzug.up();
// };

// ///Yet to properly code this
