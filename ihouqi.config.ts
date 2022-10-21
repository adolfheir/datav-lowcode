module.exports = (config) => {
  config.resolve = {
    alias: {
      '@public': "/public",
      '@app': "/src/app",
      '@assets': "/src/assets",
      '@model': "/src/model",
      '@common': "/src/common",
      '@constants': "/src/common/constants",
      '@utils': "/src/common/utils",
      '@hooks': "/src/common/hooks",
      '@components': "/src/common/components",
      '@materia': "/src/common/materia",
      '@pages': "/src/pages",
      //see: https://github.com/kevinold/repro-vite-amplify/commit/4d6b42291dbbcc9cee08f0ec52b416efd5ed7145
      // './runtimeConfig': './runtimeConfig.browser',
      //see https://github.com/socketio/socket.io-client/issues/1549
      "xmlhttprequest-ssl": "./node_modules/engine.io-client/lib/xmlhttprequest.js"
    }
  }
  config.server = {
    port: 31813
  }

  return config;
};

