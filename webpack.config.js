var path=require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack=require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {

entry: {
    app:[
            'webpack-dev-server/client?http://localhost:8080',  // 热更新监听此地址                                                     
            'webpack/hot/dev-server',  // 启用热更新
            path.resolve(__dirname, './src/App.jsx') 
        ]
},
//入口文件配置为app.js文件。若入口文件为index.js,这里可以直接写成'./src'
//入口文件很多的话，可以写成下面的格式：
/*
entry:{
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
}
*/
output: {
    filename:'bundle.js',//js合并后的输出的文件，命名为bundle.js
    path:path.resolve(__dirname,'build'),//指令的意思是：把合并的js文件，放到根目录build文件夹下面
    //publicPath:'',生成文件的公共路径，‘/work/reactweb/dist’ 生产环境下所有的文件路径将会添加这个公共路径
},
//多个入口的输出文件格式
/*
output: {
    filename:'[name].js',//name相当于变量，等同于pageOne/pageTwo/pageThree
    path:path.resolve(__dirname,'build'),//
}
*/
    resolve: {
        extensions: ['.js', '.jsx']
    },

plugins:[
new webpack.HotModuleReplacementPlugin(),
new HtmlwebpackPlugin({

    title:'游戏记录板',
    appMountId: 'root',
    template: 'template.ejs',
    inject: false,
    filename: 'index.html',

   /* 全部都是可选项
    title:"reactwebpack",   配置html 的title
    filename: , html文件的名字，默认是index
    template:'', 模板文件路径
    inject:true|'body'|'head'|'false', 设置为 true|'body':js文件引入的位置为body的结束标签之前
    favicon:'',  设置html的icon图标
    minify:{}|false, 暂时不理解这个参数的使用
    hash:true|false,  将添加唯一的webpack编译hash到所有包含的脚本和css文件
    cache:true|false, 默认为true，仅仅在文件修改之后才会发布
    showErrors:true|false, 默认为true，错误信息写入HTML页面中
    chunks: 允许添加某些块（比如unit test）
    chunksSortMode: 允许控制块在添加到页面之前的排序方式
    excludeChunks: 允许跳过模型块，比如单元测试块
  */
}),
new ExtractTextPlugin("styles.css")
],

module:{
    rules:[{
        test:/\.css$/,
        use:ExtractTextPlugin.extract({    //使用ExtractTextPlugin 插件
            fallback:"style-loader",
            use:"css-loader"
        }),
    },
    {   //配置辅助loader,处理图片  
        test:/\.(png|jpg|gif)$/,
        loader:'url-loader',
        options:{limit:8192,name:"images/[name].[ext]"}
    },
    { //处理图片外的其他文件类型
        test:/\.(appcache|svg|eot|ttf|woff|woff2|mp3|pdf)(\?|$)/,
        include:path.resolve(__dirname,'src'),
        loader:'file-loader?name=[name].[ext]' 
    },
    {
        test:/\.js[x]?$/,
        exclude:/(node_modules|bower_components)/,//排除XXX类型文件
        use:{
            loader:'babel-loader',
            options: {
                    presets: ['es2015', 'stage-3', 'react']
                }           
        }
    }
]
},

resolve:{
    extensions:['.js','jsx','less','.css','.scss']//后缀名自动补全
}
}