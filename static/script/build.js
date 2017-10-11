
var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var readline = require('readline');

const PUBLIC_NAME = require('../config').PUBLIC_NAME;

const MAIN = async () => {
    let dir_path = path.join(__dirname, `../../${PUBLIC_NAME}`);
    let index_html_path = path.join(__dirname, '../src/index.html');
    if(fs.existsSync(dir_path)){
        let code = await EXEC_UNIX_CLI(`rm -rf ${dir_path}`);
        if(code){
            return ;
        }
    }   
    fs.mkdirSync(dir_path);
    if(fs.existsSync(index_html_path)){
        let sHtml = '';
        let fRead = fs.createReadStream(index_html_path);
        let b = false;
        let rl = readline.createInterface({
            input: fRead
        });
        rl.on('line', (cmd) => {
            let s = cmd.trim();
            if(b && /^<\/script\>$/.test(s)){
                b = false;
                sHtml += `<script src="./dist/build.min.js?v=${new Date().getTime()}"></script>`;
                return ;
            }
            if(b){
                return ;
            }
            if(/^\<script\>$/.test(s)){
                b = true;
            }else{
                sHtml += s;
            }
            
        });
        rl.on('close', () => {
            WRITE_STREAM_DATA(sHtml);
        });
    }else{
        console.log('src目录下不存在index.html文件...');
        console.log('如果希望不存在跳过,不中断,请在执行时添加参数');
        return ;
    }
};

const WRITE_STREAM_DATA = (sHtml) => {
    let new_index_html_oath = path.join(__dirname, `../../${PUBLIC_NAME}/index.html`);
    fs.open(new_index_html_oath, 'w', (err, fd) => {
        if(err){
            console.log('打包index.html发生了错误');
            return ;
        }
        fs.writeFileSync(new_index_html_oath, sHtml);
        EXEC_UNIX_CLI('npm run pro', (result_log) => {console.log(result_log);});
    });
};

const EXEC_UNIX_CLI = async (s, fn) => {
    return await new Promise((resolve, reject) => {
        cp.exec(s, (err, stdout, stderr) => {
            if(err){
                console.log(`发生了错误: ${err.toString()}`);
                reject(1);
                return ;
            }
            if(fn){
                fn(stdout);
            }
            resolve(0);
        });
    });
};




MAIN();

