export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
     "^.+\\.(svg|png|jpg|jpeg)$": "<rootDir>/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.jsx"],
};
