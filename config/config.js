import { defineConfig } from 'umi';

export default defineConfig({
     routes: [{
        "path": "/",
        "component": '@/layouts/index.js',
        "routes": [{
            "path": "/",
            "exact": true,
            "component": '@/pages/index.js'
          },{
            "path": "/user",
            "exact": true,
            "component": '@/pages/user.tsx'
          }]
    }]

});