**Documentation for CRA with Eslint using Airbnb and Prettier**

CRA (Create React App) is a great way to start building a new React project quickly. Eslint is a popular tool for linting JavaScript code, and Airbnb provides a widely-used set of style guidelines. Prettier is a code formatter that can be integrated with Eslint. Here are the steps to configure your CRA project with Eslint using Airbnb and Prettier:

1. Create React App already comes with ESLint, so we need only to extend its configuration. In your project, use the following command to **install the peer dependencies required for Airbnb configuration**:

```
npx install-peerdeps --dev eslint-config-airbnb
```

2. **Initialize Eslint**: Use the following command to initialize Eslint configuration:

```
eslint --init
```

Answer the questions as per your requirement. You can choose "React" as a framework while configuring.

3. Use the following commands to **set up Prettier**:

```
npm install prettier --save-dev
npm install eslint-config-prettier --save-dev
npm install eslint-plugin-prettier --save-dev
```

6. **Update the .eslintrc.json file** in your project root directory with the following content:

```
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "react-app",
    "react-app/jest",
    "airbnb",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended"
  ],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "prettier/prettier": [
      "error",
      {
        "semi": false,
        "singleQuote": true,
        "trailingComma": "none"
      }
    ]
  }
}

```

This configuration extends the "airbnb" rules and also includes the "prettier" plugin for formatting.

7. Use the following commands to **run Eslint and Prettier**:

```
npx prettier --write .
eslint .
eslint . --fix
```

This command will format all files in the project using Prettier, then run Eslint to check for any linting errors and then --fix will automatically fix some of the linting errors for you.

**In the case of a Create React App project, where the source files are typically located in the src directory, running eslint src is a good option to limit eslint to only the source files in your project.**

```
eslint src
eslint src --fix 
```

8. Merge Prettier configurations: If you want to merge and override any config set with .prettierrc files, use the following option in your .eslintrc.json file:

```
{
  "prettier/prettier": [
    "error",
    {
      "singleQuote": true,
      "parser": "flow"
    }
  ]
}
```

That's it! Your CRA project is now configured with Eslint using Airbnb and Prettier.

Few links you can go through:
https://blog.logrocket.com/validate-react-props-proptypes/#why-validate-props-react

https://www.youtube.com/watch?v=xinJSYiOB6Q

https://medium.com/@pppped/extend-create-react-app-with-airbnbs-eslint-config-prettier-flow-and-react-testing-library-96627e9a9672

https://dev.to/ankitt8/setting-up-eslint-airbnb-configuration-prettier-and-husky-pre-commit-hooks-in-cra-5dbo
