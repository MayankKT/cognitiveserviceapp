var webpack = require('webpack');
const path = require('path');

var config = {
    entry: {
     'Module': ['babel-polyfill', './index.js']     
    },
    
    mode: "development",

    output: {
        path: path.resolve('./'),
        filename: "[name].bundle.js"
    },

    plugins: [
              new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }),
              new webpack.ProvidePlugin({ moment: "moment" }),
          
              /*new webpack.DllReferencePlugin({
              manifest: require("./js/common/vendor-manifest.json"),
              scope: 'ui'
              })*/
    ],

    devServer: {
        inline: true,
        port: 8080
    },

    resolve: {
  modules: ['node_modules', 'Module', 'Plugins', 'Images', 'js'],
        extensions: ['.js', '.jsx', '.png', '.asmx']
    },

    optimization: {
    splitChunks: {
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                reuseExistingChunk: true,
                enforce: true,
                chunks: 'all'
                }
           }
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"  //  LOADER FOR CSS
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.(png|gif|jpg|jpeg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]' //  LOADER FOR IMAGES
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                query: { presets: ["@babel/preset-react", "@babel/preset-env"]} //  LOADER FOR BABEL
            },
            {
                test: /\.json$/,
                loader: "json-loader" //  LOADER FOR JSON
            }

      ]
    }
}

if (process.env.NODE_ENV === 'production') {    
    config.plugins.push(new webpack.DefinePlugin({
                            'process.env.NODE_ENV': JSON.stringify('production')
                         }));

    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

config.plugins.push(function(){
    this.plugin('done', function(stats) {
        console.log(('\n[' + new Date().toLocaleString() + ']') + ' Begin a new compilation.\n');
    });
});

module.exports = config;
