/* global path */

let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .sass('resources/assets/sass/theme-light.scss', 'public/css')
    .sass('resources/assets/sass/theme-dark.scss', 'public/css')
    .webpackConfig({
        resolve: {
            alias: {
                '@': path.resolve('resources/assets/js')
            }
        },
        output: {
            chunkFilename: 'js/[name].js'
        }
    })
    .babelConfig({ plugins: ['syntax-dynamic-import'] });
