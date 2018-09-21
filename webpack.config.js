const path = require('path');
const htmlPlugin= require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports={
    mode: 'production',
    //入口文件的配置项
    entry:{
        main:'./src/main.js'
    },
    //出口文件的配置项
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{
        rules:[
            // {
            //     test:/\.css$/,
            //     use:['style-loader','css-loader']
            // },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
                    "css-loader"
                ]
              },
            {
                test:/\.(png|jpg|gif)/ ,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:10000,
                        outputPath:'/images/',
                    }
                }]
             },
             {
                test: /\.(htm|html)$/i,
                 use:[ 'html-withimg-loader'] 
            }
        ]
    },
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true 
          }),
          new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
        ]
      },
    //插件，用于生产模版和各项功能
    plugins:[
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].[hash].css",
            chunkFilename: "css/[id].[hash].css"
          })
    ],
    //配置webpack开发服务功能
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:1717
    }
}