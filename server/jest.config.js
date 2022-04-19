module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testEnvironment: "node",
  testMatch: ["**/**/*.test.js"],
  verbose: true,
  forceExit: true,
  setupFiles : ['./setupJest.js']
  //   clearMock: true
};
