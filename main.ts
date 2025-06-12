import { App, Editor, MarkdownView, Plugin, PluginSettingTab, Setting, EditorSuggest, EditorPosition, EditorSuggestContext, EditorSuggestTriggerInfo } from 'obsidian';

// Remember to rename these classes and interfaces!

interface CurrentTimePluginSettings {
	timeFormat: string;
}

const DEFAULT_SETTINGS: CurrentTimePluginSettings = {
	timeFormat: 'YYYY-MM-DD HH:mm:ss'
}

export default class CurrentTimePlugin extends Plugin {
	settings: CurrentTimePluginSettings;

	async onload() {
		await this.loadSettings();

		// 添加一个斜杠命令来插入当前时间
		this.registerEditorSuggest(new CurrentTimeSuggester(this));

		// 添加一个命令，可以通过命令面板触发
		this.addCommand({
			id: 'insert-current-time',
			name: '插入当前时间',
			editorCallback: (editor: Editor) => {
				const currentTime = this.getCurrentTime();
				editor.replaceSelection(`*${currentTime}*`);
			}
		});

		// 添加设置选项卡
		this.addSettingTab(new CurrentTimeSettingTab(this.app, this));
	}

	onunload() {
		// 清理
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	getCurrentTime(): string {
		const now = new Date();
		return this.formatTime(now, this.settings.timeFormat);
	}

	formatTime(date: Date, format: string): string {
		// 创建一个结果字符串的副本，避免直接修改原始字符串
		let result = format;
		
		// 获取日期/时间组件
		const year = date.getFullYear().toString();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		const seconds = date.getSeconds().toString().padStart(2, '0');
		
		// 按特定顺序替换（长到短），避免部分替换问题
		result = result.replace(/YYYY/g, year);
		result = result.replace(/MM/g, month);
		result = result.replace(/DD/g, day);
		result = result.replace(/HH/g, hours);
		result = result.replace(/mm/g, minutes);
		result = result.replace(/ss/g, seconds);
		
		return result;
	}
}

class CurrentTimeSuggester extends EditorSuggest<string> {
	plugin: CurrentTimePlugin;

	constructor(plugin: CurrentTimePlugin) {
		super(plugin.app);
		this.plugin = plugin;
	}

	onTrigger(cursor: EditorPosition, editor: Editor): EditorSuggestTriggerInfo | null {
		const line = editor.getLine(cursor.line);
		const subString = line.substring(0, cursor.ch);
		
		// 检查触发条件：输入斜杠
		const match = subString.match(/\/$/);
		if (!match) return null;

		return {
			start: {
				line: cursor.line,
				ch: match.index || 0
			},
			end: cursor,
			query: match[0]
		};
	}

	getSuggestions(context: EditorSuggestContext): string[] {
		return ["time - 插入当前时间"];
	}

	renderSuggestion(suggestion: string, el: HTMLElement): void {
		el.setText(suggestion);
	}

	selectSuggestion(suggestion: string): void {
		if (!this.context) return;
        
		const editor = this.context.editor;
		const currentTime = this.plugin.getCurrentTime();
		
		// 替换触发文本为当前时间，并用星号包裹
		editor.replaceRange(
			`*${currentTime}*`,
			this.context.start,
			this.context.end
		);
	}
}

class CurrentTimeSettingTab extends PluginSettingTab {
	plugin: CurrentTimePlugin;

	constructor(app: App, plugin: CurrentTimePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('时间格式')
			.setDesc('支持设置的时间格式 (YYYY, MM, DD, HH, mm, ss)')
			.addText(text => text
				.setPlaceholder('YYYY-MM-DD HH:mm:ss')
				.setValue(this.plugin.settings.timeFormat)
				.onChange(async (value) => {
					this.plugin.settings.timeFormat = value;
					await this.plugin.saveSettings();
				}));

		containerEl.createEl('div', {
			text: '示例: YYYY-MM-DD HH:mm:ss → 2023-05-20 13:45:30'
		}).addClass('setting-item-description');
	}
}
