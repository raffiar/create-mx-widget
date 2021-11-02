import { FileType } from "../types";
import { capitalize, toKebabCase, toCamelCase } from "../utils";

export default function (name: string, version: string): FileType[] {
  const camelName = capitalize(toCamelCase(name));
  const kebabName = toKebabCase(name);
  const tsConfig = {
    name: "tsconfig",
    extension: ".json",
    path: "/",
    content: `{
    "extends": "@mendix/pluggable-widgets-tools/configs/tsconfig.base",
    "baseUrl": "./",
    "include": ["./src", "./typings"]
}`,
  };

  const packageJson = {
    name: "package",
    extension: ".json",
    path: "/",
    content: `{
  "name": "${kebabName}-web",
  "widgetName": "${camelName}",
  "version": "${version}",
  "description": "${name}",
  "copyright": "© Mendix Technology BV 2021. All rights reserved.",
  "license": "Apache-2.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/mendix/widgets-resources.git"
  },
  "config": {
    "mendixHost": "http://localhost:8080",
    "developmentPort": 3000
  },
  "marketplace": {
    "minimumMXVersion": "9.6.0",
    "marketplaceId": 0
  },
  "testProject": {
    "githubUrl": "https://github.com/mendix/testProjects",
    "branchName": "${kebabName}-web"
  },
  "packagePath": "com.mendix.widget.web",
  "scripts": {
    "start": "pluggable-widgets-tools start:server",
    "dev": "pluggable-widgets-tools start:web",
    "build": "pluggable-widgets-tools build:web",
    "format": "pluggable-widgets-tools format",
    "lint": "eslint --config ../../../.eslintrc.js --ext .jsx,.js,.ts,.tsx src/",
    "test": "pluggable-widgets-tools test:unit:web",
    "pretest:e2e": "node ../../../scripts/test/updateAtlas.js --latest-atlas",
    "test:e2e": "pluggable-widgets-tools test:e2e:web",
    "test:e2e:dev": "pluggable-widgets-tools test:e2e:web:dev",
    "release": " pluggable-widgets-tools release:web",
    "release:marketplace": "node ../../../scripts/release/marketplaceRelease.js"
  },
  "devDependencies": {
    "@mendix/pluggable-widgets-tools": ">=8.9.2",
    "@types/classnames": "^2.2.6",
    "eslint": "^7.20.0"
  },
  "dependencies": {
    "@mendix/piw-utils-internal": "^1.0.0",
  }
}
`,
  };
  const gitignore = {
    name: ".gitignore",
    extension: "",
    path: "/",
    content: `/tests/TestProjects/**/.classpath
/tests/TestProjects/**/.project
/tests/TestProjects/**/javascriptsource
/tests/TestProjects/**/javasource
/tests/TestProjects/**/resources
/tests/TestProjects/**/userlib

/tests/TestProjects/Mendix8/theme/styles/native
/tests/TestProjects/Mendix8/theme/styles/web/sass
/tests/TestProjects/Mendix8/theme/*.*
!/tests/TestProjects/Mendix8/theme/components.json
!/tests/TestProjects/Mendix8/theme/favicon.ico
!/tests/TestProjects/Mendix8/theme/LICENSE
!/tests/TestProjects/Mendix8/theme/settings.json
`,
  };

  const component = {
    path: "/src/components/",
    name: camelName,
    extension: ".ts",
    content: `import { createElement, CSSProperties, ReactElement, ReactNode, useCallback, useRef, useState } from "react";
export interface Props {
}

export const ${camelName} = (props: Props): ReactElement => {
    return null;
};`,
  };

  const readme = {
    path: "/",
    name: "README",
    extension: ".md",
    content: `Please see [${name}](https://docs.mendix.com/appstore/widgets/${kebabName}) in the Mendix documentation for details.`,
  };

  const changelog = {
    path: "/",
    name: "CHANGELOG",
    extension: ".md",
    content: `# Changelog

All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]`,
  };

  const spec = {
    path: "/src/components/__test__/",
    name: camelName,
    extension: ".spec.ts",
    content: `import { createElement } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";

interface Props {}
describe("${camelName}", () => {
    beforeEach(() => {
    });

    it("dummy test", () => {
        expect(1+1).toEqual(2);
    });
});
`,
  };

  const mainXML = {
    name: camelName,
    extension: ".xml",
    path: "/src/",
    content: `<?xml version="1.0" encoding="utf-8" ?>
<widget id="com.mendix.widget.web.${camelName.toLowerCase()}.${camelName}"
        needsEntityContext="true"
        pluginWidget="true"
        offlineCapable="true" xmlns="http://www.mendix.com/widget/1.0/"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.mendix.com/widget/1.0/ ../../../../node_modules/mendix/custom_widget.xsd">
    <name>${capitalize(name)}</name>
    <description/>
    <studioProCategory>Display</studioProCategory>
    <studioCategory>Display</studioCategory>
    <helpUrl>https://docs.mendix.com/appstore/widgets/${kebabName}></helpUrl>
    <properties>
        <propertyGroup caption="General">
            <propertyGroup caption="General">
            </propertyGroup>
        </propertyGroup>
    </properties>
</widget>`,
  };

  const packageXML = {
    name: "package",
    extension: ".xml",
    path: "/src/",
    content: `<?xml version="1.0" encoding="utf-8" ?>
<package xmlns="http://www.mendix.com/package/1.0/">
    <clientModule name="${camelName}" version="1.0.0" xmlns="http://www.mendix.com/clientModule/1.0/">
        <widgetFiles>
            <widgetFile path="${camelName}.xml"/>
        </widgetFiles>
        <files>
            <file path="com/mendix/widget/web/${camelName.toLowerCase()}"/>
        </files>
    </clientModule>
</package>
`,
  };

  const editorPreview = {
    name: `${camelName}.editorPreview`,
    extension: ".ts",
    path: "/src/",
    content: `import { createElement, ReactElement } from "react";

interface Props {
}

export const preview = (props: Props): ReactElement => {
    return null
};`,
  };

  const editorConfig = {
    name: `${camelName}.editorConfig`,
    extension: ".ts",
    path: "/src/",
    content: `import { hidePropertiesIn, Problem, Properties } from "@mendix/piw-utils-internal";

interface Props {
}
export function getProperties(values: Props, defaultValues: Properties): Properties {
    return defaultValues;
}

export function check(values: Props): Problem[] {
    const errors: Problem[] = [];
    return errors;
}
`,
  };
  return [tsConfig, packageJson, gitignore, component, readme, changelog, spec, mainXML, packageXML, editorPreview, editorConfig];
}
