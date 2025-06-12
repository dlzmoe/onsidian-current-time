# Current Time Inserter

Current Time Inserter（当前时间插入器）是一个简单的 Obsidian 插件，用于快速插入当前时间。

https://github.com/user-attachments/assets/9a41e613-7b5c-4bd5-a6b8-5ae36660e01c

## 功能

- 输入斜杠 `/` 后可以选择 `time` 命令快速插入当前时间
- 插入的时间会自动用星号包裹，如 `*2023-05-20 13:45:30*`
- 可以通过设置面板自定义时间格式，支持年月日时分秒

## 使用方法

1. 在编辑器中输入斜杠 `/`
2. 从弹出的建议列表中选择 "time - 插入当前时间"
3. 当前时间将以 `*YYYY-MM-DD HH:mm:ss*` 格式插入到文档中

此外，你还可以通过命令面板（按下 `Ctrl+P` 或 `Cmd+P`）搜索"插入当前时间"来使用此功能。

## 设置

在插件设置中，你可以自定义时间格式：

- `YYYY` - 年份（四位数）
- `MM` - 月份（两位数，带前导零）
- `DD` - 日期（两位数，带前导零）
- `HH` - 小时（24小时制，带前导零）
- `mm` - 分钟（带前导零）
- `ss` - 秒（带前导零）

默认格式为 `YYYY-MM-DD HH:mm:ss`，你可以根据自己的需要修改格式。

## 安装

### 通过 BRAT 插件安装

1. 安装 [Obsidian BRAT](https://github.com/TfTHacker/obsidian42-brat) 插件
2. 在 BRAT 插件设置中，点击"添加Beta插件"
3. 输入此仓库地址: `https://github.com/yourusername/obsidian-current-time`
4. 点击"添加插件"按钮
5. 在"已安装插件"中启用"Current Time Inserter"插件

### 手动安装

1. 下载 `main.js`、`manifest.json` 和 `styles.css` 文件
2. 将这些文件复制到你的 Obsidian 仓库的 `.obsidian/plugins/obsidian-current-time` 目录中
3. 重启 Obsidian
4. 在设置 > 第三方插件中启用此插件

## 开发

该插件遵循标准的 Obsidian 插件结构：

1. 克隆此仓库
2. 运行 `npm i` 安装依赖
3. 运行 `npm run dev` 开始开发
4. 对代码进行必要的更改
5. 运行 `npm run build` 构建插件

## 许可证

[Apache-2.0 license](LICENSE)
