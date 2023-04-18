
const fs = require("fs");

/**
 * postman导出的json接口文档 转化为md格式的文档
 */
function main() {
    try {
        let res = fs.readFileSync("./index.json", "utf8");
        let result = ``;
        res = JSON.parse(res);
        let item = res.item;
        for (let index = 0; index < item.length; index++) {
            const val = item[index];
            let url = '';
            for (let j = 0; j < val.request.url.path.length; j++) {
                let path = val.request.url.path[j];
                if (!path) {
                    url = url + '/' + ":id";
                } else {
                    url = url + '/' + path;
                }
            }
            result = result + `## ${val.name}\n### 接口地址\n>${url}\n### 接口地址示例\n>${val.request.url.raw}\n### 请求方式\n>${val.request.method}\n### 请求参数\n`;
            result = result + `|参数名|示例值|参数说明|\n|:---:|:---:|:---:|\n`;
            let query = val.request.url.query;
            if (query) {
                query.forEach(param => {
                    result = result + `|${param.key}|${param.value}|${param.description}|\n`;
                });
            }
            if (val.response[0]) {
                result = result + `### 返回格式\n>JSON\n### 返回参数\n>${val.response[0].body}\n`;
            }
            result = result + '***\n';
        }
        fs.writeFileSync('./index.md', result);
    } catch (error) {
        console.log(error);
    }
}
main()