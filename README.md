# postman2md
postman markdown nodejs 
# 使用方式 #
1.下载该项目
2.在项目目录下建一个index.json文件
3.将postman导出的接口文档内容粘贴到index.json文件中
4.运行json2markdown.js (node run json2markdown.js)
5.在改目录下会生成一个index.md文件

# **注意事项** #
1.运行该脚本需要node环境
2.该脚本只用于postman2.1版本的接口文档
3.如果需要将接口返回值也添加到文档，可在postman中保存返回值作为e.g. 
