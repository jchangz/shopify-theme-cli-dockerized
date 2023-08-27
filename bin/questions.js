export const installQuestions = {
  message: "Choose your installation directory",
  choices: [
    {
      name: "Current directory",
      value: "current",
      description: "Create files in this directory",
    },
    {
      name: "New folder",
      value: "new",
      description: "Create files in a new named folder in this directory",
    },
  ],
}

export const folderNameQuestion = {
  message: "Enter your folder name",
  default: "my-app",
}
