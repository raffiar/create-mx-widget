import * as path from "path";
import * as fs from "fs";
import * as prompts from "prompts";
import * as chalk from "chalk";
import { satisfies, valid } from "semver";
import { getQuestions } from "./questions";
import { toKebabCase } from "./utils";
import generateFiles from "./files";

export default async(widgetName: string) => {
  const {
    pathToWidget,
    name = widgetName,
    version,
  } = await prompts(getQuestions(widgetName ? ["name"] : []), {
    onCancel: () => process.exit(),
  });

  const folderName = `${toKebabCase(name)}-web`;
  const folderPath = path.join(process.cwd(), `${pathToWidget}/${folderName}`);
  if (!valid(version) || !satisfies(version, ">=0.0.1")) {
    return console.info(chalk.red("Not a valid format (x.x.x)"));
  }
  if (fs.existsSync(folderPath)) {
    console.info(chalk.red("Destination path already exists!"));
    return process.exit();
  }

  const listOfFiles = generateFiles(name, version);
  for (const file of listOfFiles) {
    const dir = path.join(process.cwd(), `${pathToWidget}/${folderName}${file.path}${file.name}${file.extension}`);
    const folderDir = path.join(process.cwd(), `${pathToWidget}/${folderName}${file.path}`);
    if (!fs.existsSync(folderDir)) {
      fs.mkdirSync(folderDir, { recursive: true });
    }
    fs.writeFile(dir, file.content, (err: any) => {
      if (err) {
        return console.info(chalk.red(err));
      }
      console.info(chalk.green(`The file ${file.name}${file.extension} is created!`));
    });
  }
};
