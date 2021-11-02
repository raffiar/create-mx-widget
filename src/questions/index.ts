import { PromptObject } from "prompts";

const questions: PromptObject[] = [
  {
    type: "confirm",
    name: "pathToWidget",
    message: "Is this the path to your widget? 'packages/pluggableWidgets'",
    initial: true,
    format: () => "packages/pluggableWidgets",
  },
  {
    type: (prev) => (!prev ? "text" : null),
    name: "pathToWidget",
    message: "Please specify the path",
  },
  {
    type: "text",
    name: "name",
    message: "What is the name of widget?",
    initial: "widget",
  },
  {
    type: "text",
    name: "version",
    message: "What is the version of widget?",
    initial: "1.0.0",
  },
];

// Later we can make this more generic
const getQuestions = (excludeProps: string[]): PromptObject[] => {
  let result = questions;
  if (excludeProps.includes("name")) {
    result = questions.filter((question) => question.name !== "name");
  }
  return result;
};

export { getQuestions };