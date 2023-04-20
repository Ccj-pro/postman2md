
const fs = require("fs");
var path = require('path');
/**
 * postman导出的json接口文档 转化为md格式的文档
 */
function main() {
    try {
        let fileList = fs.readdirSync("./");
        if (fileList.length == 0) {
            return;
        }
        fileList.forEach(name => {
            if (path.extname(name) !== ".json") {
                console.log('跳过非.json文件： ', name);
                return;
            }
            let res = fs.readFileSync("./" + name, "utf8");
            let result = ``;
            res = JSON.parse(res);
            let item = res.item;
            for (let index = 0; index < item.length; index++) {
                const val = item[index];
                // 拼地址
                let requestUrl = val.request.url;
                if (!requestUrl) {
                    console.log('api地址为空: ', val);
                    continue;
                }
                let url = '';
                for (let j = 0; j < requestUrl.path.length; j++) {
                    let path = requestUrl.path[j];
                    if (!path) {
                        url = url + '/' + ":id";
                    } else {
                        url = url + '/' + path;
                    }
                }
                if (requestUrl && requestUrl.raw) {
                    result = result + `## ${val.name}\n### 接口地址\n>${url}\n### 接口地址示例\n>${requestUrl.raw}\n### 请求方式\n>${val.request.method}\n### 请求参数\n`;
                }
                // 拼参数
                result = result + `|参数名|示例值|参数说明|\n|:---:|:---:|:---:|\n`;
                let query = requestUrl.query;
                if (query) {
                    query.forEach(param => {
                        result = result + `|${param.key}|${param.value}|${param.description}|\n`;
                    });
                }
                // 拼返回值
                if (val.response[0]) {
                    result = result + `### 返回格式\n>JSON\n### 返回参数\n>${val.response[0].body}\n`;
                }
                result = result + '***\n';
            }
            fs.writeFileSync('./index.md', result);
        });

    } catch (error) {
        console.log(error);
    }
}
main()