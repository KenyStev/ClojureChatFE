(function (global) {
  System.config({
    paths: {
      'npm:': 'node_modules/'
    },
    map: {
      'primeng':                   'npm:primeng'                
    },
    packages: {
      primeng: {
          defaultExtension: 'js'
      }
    }
  });
})(this);