
# 初始化项目脚本

sudo npm install -g cnpm --registry=https://registry.npm.taobao.org

cd ../../
cnpm install

gem sources -r https://rubygems.org/
gem sources -a http://gems.ruby-china.org/
gem sources -u

sudo gem install sass
sudo gem install compass


echo "初始化完成..."
echo "请去读readme.md 文档,开始你的旅程......"


