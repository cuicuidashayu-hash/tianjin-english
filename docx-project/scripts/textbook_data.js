// 天津市武清区小学英语（人教精通版 三年级起点）4-6年级知识点数据
// 数据来源：电子课本网、教习网、21CN教育、人教社官网、网络教学计划
// 注：4上/4下/5上/5下/6上为已发布新版数据；6下为基于课标与小升初衔接要点推断（新版2027春即将使用）

const TEXTBOOK_DATA = {
  meta: {
    region: "天津市武清区",
    publisher: "人教精通版（三年级起点）",
    note: "本数据基于2024版义务教育英语课程标准，4上/4下/5上/5下/6上为已发布新版数据；6下为新版2027春待发布，内容为合理推断",
    difficultyLegend: {
      "★": "课本要求 - 学生必会基础",
      "★★": "考试重点 - 单元检测/期中期末常考",
      "★★★": "难点易错 - 拓题难度，机构重点突破"
    }
  },

  grades: [
    // ============================================================
    //  四年级上册（新版 2025秋）
    // ============================================================
    {
      id: "g4up",
      name: "四年级上册",
      version: "新版 2025秋版",
      units: [
        {
          num: 1,
          title: "This is my new friend",
          topic: "国家、朋友、基础职业",
          vocab: [
            { word: "China", cn: "中国", star: 2 },
            { word: "America", cn: "美国", star: 2 },
            { word: "England", cn: "英国", star: 2 },
            { word: "Singapore", cn: "新加坡", star: 1 },
            { word: "Canada", cn: "加拿大", star: 2 },
            { word: "friend", cn: "朋友", star: 2 },
            { word: "brother", cn: "兄弟", star: 2 },
            { word: "sister", cn: "姐妹", star: 2 },
            { word: "boy / girl", cn: "男孩/女孩", star: 1 },
            { word: "teacher", cn: "老师", star: 2 },
            { word: "farmer", cn: "农民", star: 2 },
            { word: "postman", cn: "邮递员", star: 2 },
            { word: "doctor", cn: "医生", star: 2 },
            { word: "nurse", cn: "护士", star: 2 },
            { word: "driver", cn: "司机", star: 2 }
          ],
          sentences: [
            { en: "This is my new friend.", cn: "这是我的新朋友。", star: 2 },
            { en: "Where are you from?", cn: "你来自哪里？", star: 3 },
            { en: "I'm from China.", cn: "我来自中国。", star: 3 },
            { en: "Who's this boy? He's my brother.", cn: "这个男孩是谁？他是我兄弟。", star: 2 },
            { en: "What does your father do? He's a teacher.", cn: "你爸爸做什么工作？他是老师。", star: 3 },
            { en: "Nice to meet you. — Nice to meet you, too.", cn: "见到你很高兴。— 我也是。", star: 2 }
          ],
          grammar: [
            { point: "be from 表示\"来自\"", detail: "be动词随人称变化：I am / you are / he, she is from...", star: 3 },
            { point: "What does...do? 询问职业", detail: "答语：He/She is a + 职业名称。注意 does 是第三人称助动词", star: 3 },
            { point: "国家专有名词首字母大写", detail: "China, America, England 等；the UK / the USA 需加定冠词 the", star: 2 }
          ],
          phonetics: [
            { rule: "字母 b 发音 /b/", examples: "boy, book, bag, big", star: 1 },
            { rule: "字母 p 发音 /p/", examples: "pen, paint, pig, picture", star: 1 },
            { rule: "字母 c 发音 /k/（在a/o/u前）", examples: "cat, cake, car, come", star: 1 }
          ],
          difficulties: [
            { error: "国家名拼写首字母不大写", detail: "china（×）→ China（√）；the UK / the USA 不能漏 the", star: 3 },
            { error: "be from 漏写 be 动词", detail: "I from China（×）→ I am from China（√）", star: 3 },
            { error: "What do/does 用法混淆", detail: "主语是 he/she/it 用 does；主语是 I/you/we/they 用 do", star: 2 },
            { error: "a/an 用错", detail: "an egg / an orange（元音开头），a teacher / a doctor（辅音开头）", star: 2 }
          ]
        },
        {
          num: 2,
          title: "What's your number?",
          topic: "数字 1-20、班级、年级、时间",
          vocab: [
            { word: "one ~ twenty", cn: "1-20", star: 3 },
            { word: "thirteen ~ nineteen", cn: "13-19（-teen 后缀）", star: 3 },
            { word: "class", cn: "班级", star: 2 },
            { word: "grade", cn: "年级", star: 2 },
            { word: "number", cn: "数字；编号", star: 2 },
            { word: "count", cn: "数数", star: 1 }
          ],
          sentences: [
            { en: "Which class are you in? — I'm in Class One, Grade Four.", cn: "你在几班？— 我在四年级一班。", star: 3 },
            { en: "What's your number? — I'm number fourteen.", cn: "你的编号是多少？— 我是14号。", star: 2 },
            { en: "What's one and two? — It's three.", cn: "一加二等于几？— 等于三。", star: 2 },
            { en: "What's the time? — It's 7:20.", cn: "几点了？— 七点二十。", star: 3 }
          ],
          grammar: [
            { point: "\"几年级几班\"表达", detail: "Class + 数字（首字母大写）, Grade + 数字：Class One, Grade Four", star: 3 },
            { point: "数字 13-19 拼写规则", detail: "个位数 + teen 后缀，注意重音在 teen 上：thirteen, fourteen, fifteen, eighteen 特殊", star: 3 },
            { point: "时间表达法", detail: "It's + 数字 + o'clock；半小时：half past；刻：a quarter past/to", star: 2 }
          ],
          phonetics: [
            { rule: "字母 t 发音 /t/", examples: "tall, ten, time, table", star: 1 },
            { rule: "字母 d 发音 /d/", examples: "day, dog, do, daily", star: 1 },
            { rule: "字母 l 发音 /l/", examples: "long, look, like, lesson", star: 1 }
          ],
          difficulties: [
            { error: "13-19 拼写错误", detail: "thriteen（×）→ thirteen；fiveteen（×）→ fifteen；eightteen（×）→ eighteen", star: 3 },
            { error: "Class / Grade 首字母不大写", detail: "class 1, grade 4（×）→ Class One, Grade Four（√）", star: 2 },
            { error: "时间读法不规范", detail: "7:20 读 seven twenty 或 twenty past seven；非 seven two zero", star: 2 }
          ]
        },
        {
          num: 3,
          title: "It's a pineapple",
          topic: "水果、蔬菜、a/an 用法",
          vocab: [
            { word: "pineapple", cn: "菠萝", star: 2 },
            { word: "lemon", cn: "柠檬", star: 2 },
            { word: "apple", cn: "苹果", star: 1 },
            { word: "pear", cn: "梨", star: 1 },
            { word: "watermelon", cn: "西瓜", star: 2 },
            { word: "kiwi fruit", cn: "猕猴桃", star: 2 },
            { word: "orange", cn: "橙子；橙色", star: 2 },
            { word: "banana", cn: "香蕉", star: 1 },
            { word: "potato", cn: "土豆", star: 2 },
            { word: "tomato", cn: "西红柿", star: 2 },
            { word: "carrot", cn: "胡萝卜", star: 2 },
            { word: "cucumber", cn: "黄瓜", star: 2 },
            { word: "eggplant", cn: "茄子", star: 2 },
            { word: "green pepper", cn: "青椒", star: 2 }
          ],
          sentences: [
            { en: "What's this? — It's an apple.", cn: "这是什么？— 是个苹果。", star: 3 },
            { en: "What's that? — It's a lemon.", cn: "那是什么？— 是个柠檬。", star: 2 },
            { en: "What's this in English? — It's a tomato.", cn: "这个用英语怎么说？— 是西红柿。", star: 3 },
            { en: "Do you like bananas? — Yes, I do. / No, I don't.", cn: "你喜欢香蕉吗？— 是的，喜欢。/ 不，不喜欢。", star: 3 }
          ],
          grammar: [
            { point: "a/an 用法区别", detail: "辅音音素开头用 a (a tomato)；元音音素开头用 an (an orange, an apple, an eggplant)", star: 3 },
            { point: "可数名词复数", detail: "apple→apples；banana→bananas；以 o 结尾加 es：potato→potatoes, tomato→tomatoes", star: 3 },
            { point: "Do you like...? 喜好询问", detail: "后面接可数名词复数或不可数名词，不用单数形式", star: 2 }
          ],
          phonetics: [
            { rule: "字母 m 发音 /m/", examples: "morning, monkey, mum, man", star: 1 },
            { rule: "字母 n 发音 /n/", examples: "nose, name, number, nine", star: 1 },
            { rule: "字母 h 发音 /h/", examples: "happy, hot, have, hand", star: 1 }
          ],
          difficulties: [
            { error: "a/an 混淆", detail: "an banana（×）→ a banana；a orange（×）→ an orange（orange 元音开头）", star: 3 },
            { error: "复数加 -s 还是 -es", detail: "potato→potatoes, tomato→tomatoes（加 es）；photo→photos（加 s）", star: 3 },
            { error: "Do you like 后接单数", detail: "Do you like banana?（×）→ Do you like bananas?（√）", star: 2 }
          ]
        },
        {
          num: 4,
          title: "How's the weather today?",
          topic: "天气形容词",
          vocab: [
            { word: "fine / nice", cn: "晴朗的；好的", star: 2 },
            { word: "warm", cn: "温暖的", star: 2 },
            { word: "cool", cn: "凉爽的", star: 2 },
            { word: "hot", cn: "炎热的", star: 2 },
            { word: "cold", cn: "寒冷的", star: 2 },
            { word: "sunny", cn: "晴朗的", star: 3 },
            { word: "cloudy", cn: "多云的", star: 3 },
            { word: "windy", cn: "刮风的", star: 3 },
            { word: "rainy", cn: "下雨的", star: 3 },
            { word: "snowy", cn: "下雪的", star: 3 },
            { word: "weather", cn: "天气", star: 3 }
          ],
          sentences: [
            { en: "How's the weather today? — It's sunny.", cn: "今天天气怎么样？— 晴朗。", star: 3 },
            { en: "It's cool today. Shall we go to the zoo?", cn: "今天很凉爽。我们去动物园好吗？", star: 2 },
            { en: "Can I have some cold water, please? — Here you are.", cn: "请给我一些凉水好吗？— 给你。", star: 2 },
            { en: "It's rainy. Put on your shirt.", cn: "下雨了。穿上你的衬衫。", star: 2 }
          ],
          grammar: [
            { point: "天气形容词构词法", detail: "名词 + y → 形容词：sun→sunny, wind→windy, rain→rainy, snow→snowy, cloud→cloudy", star: 3 },
            { point: "天气两种问法", detail: "How's the weather? = What's the weather like? 答语：It's + 天气形容词", star: 3 },
            { point: "Shall we...? 提建议", detail: "Shall we go to the zoo? 我们去动物园好吗？答：OK. / Good idea!", star: 2 }
          ],
          phonetics: [
            { rule: "字母组合 ay 发音 /eɪ/", examples: "day, play, say, today", star: 2 },
            { rule: "字母 y 在词尾发音 /i/", examples: "sunny, cloudy, windy, rainy", star: 2 }
          ],
          difficulties: [
            { error: "天气名词变形容词拼写错", detail: "suny（×）→ sunny（双写n）；rainny（×）→ rainy（不双写）", star: 3 },
            { error: "天气问法混淆", detail: "What's the weather?（×）→ What's the weather like? / How's the weather?（√）", star: 2 },
            { error: "It's 和 Its 混淆", detail: "It's = It is（它是）；Its = 它的（无撇号）", star: 2 }
          ]
        },
        {
          num: 5,
          title: "I like those shoes",
          topic: "服装、购物用语",
          vocab: [
            { word: "cap / hat", cn: "无边帽/有边帽", star: 2 },
            { word: "T-shirt", cn: "T恤衫", star: 2 },
            { word: "dress", cn: "连衣裙", star: 2 },
            { word: "blouse", cn: "女衬衫", star: 2 },
            { word: "jacket", cn: "夹克衫", star: 2 },
            { word: "raincoat", cn: "雨衣", star: 2 },
            { word: "sweater", cn: "毛衣", star: 2 },
            { word: "skirt", cn: "短裙", star: 2 },
            { word: "shirt", cn: "衬衫", star: 2 },
            { word: "shorts", cn: "短裤", star: 3 },
            { word: "jeans", cn: "牛仔裤", star: 3 },
            { word: "socks", cn: "短袜", star: 3 },
            { word: "shoes", cn: "鞋子", star: 3 },
            { word: "try on", cn: "试穿", star: 2 },
            { word: "pretty", cn: "漂亮的", star: 2 }
          ],
          sentences: [
            { en: "Can I help you? — Please show me that jacket.", cn: "需要帮助吗？— 请给我看看那件夹克。", star: 3 },
            { en: "Can we look at the blue shorts, please? — Here you are.", cn: "请给我们看看那条蓝色短裤好吗？— 给你。", star: 2 },
            { en: "May I try the shoes on? — Certainly.", cn: "我可以试穿这双鞋吗？— 当然可以。", star: 3 },
            { en: "Where are my shorts? — Here they are.", cn: "我的短裤在哪？— 在这。", star: 2 }
          ],
          grammar: [
            { point: "服装类复数名词（成对出现的）", detail: "shorts, jeans, socks, shoes, trousers 等作主语时谓语动词用复数（are/were）", star: 3 },
            { point: "try on 用法", detail: "try on + 名词：try on the coat；try + 代词 + on：try it on（不能说 try on it）", star: 3 },
            { point: "Can/May I...? 请求允许", detail: "May 比 Can 更正式委婉；答语：Certainly / Sure / Of course / OK", star: 2 }
          ],
          phonetics: [
            { rule: "字母组合 sh 发音 /ʃ/", examples: "shirt, shoes, shorts, wash", star: 2 },
            { rule: "字母组合 ck 发音 /k/", examples: "jacket, clock, black, duck", star: 1 }
          ],
          difficulties: [
            { error: "复数服装名词作主语用 is", detail: "The shorts is new（×）→ The shorts are new（√）", star: 3 },
            { error: "try on 代词位置错", detail: "try on it（×）→ try it on（√）；try on the coat = try the coat on", star: 3 },
            { error: "Can/May 混淆", detail: "May 更正式；Can 更口语。建议都用 May I...? 表示礼貌请求", star: 2 }
          ]
        },
        {
          num: 6,
          title: "I'm tall",
          topic: "形容词、外貌描述",
          vocab: [
            { word: "big / small", cn: "大的/小的", star: 2 },
            { word: "long / short", cn: "长的/短的", star: 2 },
            { word: "tall / short", cn: "高的/矮的", star: 2 },
            { word: "fat / thin", cn: "胖的/瘦的", star: 2 },
            { word: "strong", cn: "强壮的", star: 2 },
            { word: "new / old", cn: "新的/旧的", star: 2 },
            { word: "happy", cn: "快乐的", star: 2 },
            { word: "both", cn: "两者都", star: 3 },
            { word: "twins", cn: "双胞胎", star: 2 }
          ],
          sentences: [
            { en: "Look at the elephant. It has big ears.", cn: "看那头大象。它有大耳朵。", star: 3 },
            { en: "A rabbit has long ears and a short tail.", cn: "兔子有长耳朵和短尾巴。", star: 3 },
            { en: "I'm tall. You're short.", cn: "我很高。你很矮。", star: 2 },
            { en: "I'm strong. You're thin.", cn: "我很强壮。你很瘦。", star: 2 },
            { en: "Happy New Year!", cn: "新年快乐！", star: 1 }
          ],
          grammar: [
            { point: "have/has 第三人称单数", detail: "I/you/we/they 用 have；he/she/it/单数名词 用 has", star: 3 },
            { point: "反义词成对记忆", detail: "big↔small, long↔short, tall↔short, fat↔thin, new↔old, happy↔sad", star: 2 },
            { point: "both 用法", detail: "both A and B：A 和 B 都...；The twins are both tall. 双胞胎都很高", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 th 发音 /θ/ 或 /ð/", examples: "thin, both, tall（不发音）；this, that, the", star: 2 }
          ],
          difficulties: [
            { error: "have/has 用错", detail: "He have big eyes（×）→ He has big eyes（√）；I has a book（×）→ I have a book（√）", star: 3 },
            { error: "both 位置错", detail: "Both they are tall（×）→ They are both tall / Both of them are tall（√）", star: 3 },
            { error: "thin/thick 混淆", detail: "thin 瘦的/薄的；thick 厚的/粗的", star: 2 }
          ]
        }
      ]
    },

    // ============================================================
    //  四年级下册（新版 2026春）
    // ============================================================
    {
      id: "g4down",
      name: "四年级下册",
      version: "新版 2026春版",
      units: [
        {
          num: 1,
          title: "Transport",
          topic: "交通工具、出行方式",
          vocab: [
            { word: "bike", cn: "自行车", star: 2 },
            { word: "bus", cn: "公共汽车", star: 2 },
            { word: "car", cn: "小汽车", star: 2 },
            { word: "taxi", cn: "出租车", star: 2 },
            { word: "ship", cn: "船", star: 2 },
            { word: "boat", cn: "小船", star: 2 },
            { word: "plane", cn: "飞机", star: 2 },
            { word: "train", cn: "火车", star: 2 },
            { word: "subway", cn: "地铁", star: 3 },
            { word: "transport", cn: "交通工具", star: 1 },
            { word: "way", cn: "方式", star: 1 },
            { word: "often", cn: "经常", star: 2 }
          ],
          sentences: [
            { en: "How do you go to school? — I go to school by bike.", cn: "你怎么去上学？— 我骑自行车上学。", star: 3 },
            { en: "She goes to the park by car.", cn: "她乘小汽车去公园。", star: 3 },
            { en: "Let's go there by taxi.", cn: "我们乘出租车去那里吧。", star: 2 },
            { en: "I often take a bus to the zoo.", cn: "我经常乘公交去动物园。", star: 2 },
            { en: "Do you go home by subway? — Yes, I do. / No, I don't.", cn: "你乘地铁回家吗？— 是的。/ 不是。", star: 3 }
          ],
          grammar: [
            { point: "by + 交通工具（不加冠词）", detail: "by bike, by bus, by plane, by subway 都不加 a/an/the", star: 3 },
            { point: "take a + 交通工具", detail: "take a bus, take a taxi, take a train 需加 a/an", star: 3 },
            { point: "第三人称单数动词变化", detail: "主语 he/she/单数名词，动词 go→goes, do→does, study→studies, fly→flies", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 sh 发音 /ʃ/", examples: "ship, shop, fish, wash", star: 1 },
            { rule: "字母组合 tr 发音 /tr/", examples: "train, tree, try, travel", star: 2 }
          ],
          difficulties: [
            { error: "by 后加 a/an", detail: "by a bike（×）→ by bike（√）；take bus（×）→ take a bus（√）", star: 3 },
            { error: "第三人称单数动词忘加 -s/es", detail: "She go to school（×）→ She goes to school（√）", star: 3 },
            { error: "go to school 漏 to 或多 the", detail: "go school（×）→ go to school（√）；go to the school（指去学校办事，不一定上学）", star: 2 }
          ]
        },
        {
          num: 2,
          title: "School subjects",
          topic: "学科、喜好表达",
          vocab: [
            { word: "Chinese", cn: "语文", star: 2 },
            { word: "Maths / Math", cn: "数学", star: 2 },
            { word: "English", cn: "英语", star: 2 },
            { word: "Music", cn: "音乐", star: 2 },
            { word: "Art", cn: "美术", star: 2 },
            { word: "PE", cn: "体育", star: 2 },
            { word: "Science", cn: "科学", star: 3 },
            { word: "Computer Studies", cn: "计算机课", star: 3 },
            { word: "subject", cn: "科目", star: 2 },
            { word: "lesson", cn: "课", star: 2 },
            { word: "class", cn: "班级；课", star: 2 },
            { word: "interesting / easy / difficult", cn: "有趣的/简单的/困难的", star: 3 }
          ],
          sentences: [
            { en: "What subjects do you like? — I like English and Music.", cn: "你喜欢什么科目？— 我喜欢英语和音乐。", star: 3 },
            { en: "What subject do you like best? — I like PE best. It's interesting.", cn: "你最喜欢什么科目？— 我最喜欢体育。它很有趣。", star: 3 },
            { en: "We have six lessons today.", cn: "我们今天有六节课。", star: 2 },
            { en: "Do you like Maths? — Yes, I do. It's easy.", cn: "你喜欢数学吗？— 是的。它很简单。", star: 2 }
          ],
          grammar: [
            { point: "特殊疑问词 what", detail: "What subjects（复数） / What subject（单数）do you like? 搭配助动词 do/does", star: 3 },
            { point: "形容词修饰名词/作表语", detail: "an interesting book（前置）；PE is interesting（表语，be动词后）", star: 2 },
            { point: "like...best 最喜欢", detail: "I like English best. 我最喜欢英语。best 是 well 的最高级", star: 2 }
          ],
          phonetics: [
            { rule: "字母组合 ch 发音 /tʃ/", examples: "Chinese, chicken, chair, watch", star: 2 },
            { rule: "字母组合 th 发音 /θ/", examples: "maths, thank, three, mouth", star: 2 }
          ],
          difficulties: [
            { error: "subject 单复数与动词不一致", detail: "What subject do you like?（多个科目）→ What subjects do you like? 才规范", star: 2 },
            { error: "interest/interesting/interested 混淆", detail: "interest 名词/动词；interesting 修饰事物（the book is interesting）；interested 修饰人（I am interested）", star: 3 },
            { error: "学科名首字母不大写", detail: "math, english, pe（×）→ Maths, English, PE（√）", star: 2 }
          ]
        },
        {
          num: 3,
          title: "After-school activities",
          topic: "课外活动、like+doing",
          vocab: [
            { word: "play football / basketball / ping-pong", cn: "踢足球/打篮球/打乒乓", star: 3 },
            { word: "run / jump", cn: "跑/跳", star: 2 },
            { word: "draw pictures", cn: "画画", star: 2 },
            { word: "sing songs", cn: "唱歌", star: 2 },
            { word: "read books", cn: "读书", star: 2 },
            { word: "after school", cn: "放学后", star: 3 },
            { word: "afternoon", cn: "下午", star: 2 },
            { word: "often / sometimes", cn: "经常/有时", star: 3 },
            { word: "activity", cn: "活动", star: 1 },
            { word: "game", cn: "游戏；比赛", star: 2 }
          ],
          sentences: [
            { en: "What do you do after school? — I often play football with my friends.", cn: "你放学后做什么？— 我经常和朋友们踢足球。", star: 3 },
            { en: "She sometimes draws pictures after school.", cn: "她放学后有时画画。", star: 3 },
            { en: "They like running in the playground.", cn: "他们喜欢在操场上跑步。", star: 2 },
            { en: "Do you often read books after school? — Yes, I do. / No, I don't.", cn: "你放学后经常读书吗？— 是的。/ 不是。", star: 2 }
          ],
          grammar: [
            { point: "一般现在时（频度副词）", detail: "often, sometimes, usually, always 表习惯性动作，放动词前/be 动词后", star: 3 },
            { point: "like + doing 喜欢做某事", detail: "like running, like reading；动词变 ing：直接+ing / 去e+ing / 双写+ing", star: 3 },
            { point: "play + 球类不加 the", detail: "play football（√）；play the football（×，乐器才加 the）", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 ing 发音 /ɪŋ/", examples: "running, reading, drawing, playing", star: 2 },
            { rule: "字母组合 ou 发音 /aʊ/", examples: "playground（美）/out, about, house", star: 2 }
          ],
          difficulties: [
            { error: "like + doing 漏 ing", detail: "I like play football（×）→ I like playing football（√）", star: 3 },
            { error: "频度副词位置错", detail: "I play often football（×）→ I often play football（√）；频度副词放实义动词前", star: 3 },
            { error: "play + 球类 + the", detail: "play the football（×）→ play football（√）；但 play the piano 要加 the", star: 3 },
            { error: "第三人称单数动词忘加 s", detail: "She sometimes draw pictures（×）→ She sometimes draws pictures（√）", star: 3 }
          ]
        },
        {
          num: 4,
          title: "Weekend activities",
          topic: "周末活动、第三人称单数特殊变形",
          vocab: [
            { word: "go shopping", cn: "去购物", star: 3 },
            { word: "go swimming", cn: "去游泳", star: 3 },
            { word: "go hiking", cn: "去远足", star: 3 },
            { word: "visit grandparents", cn: "看望祖父母", star: 2 },
            { word: "watch TV", cn: "看电视", star: 2 },
            { word: "do housework", cn: "做家务", star: 3 },
            { word: "fly a kite", cn: "放风筝", star: 2 },
            { word: "weekend", cn: "周末", star: 3 },
            { word: "Saturday / Sunday", cn: "周六/周日", star: 2 },
            { word: "usually", cn: "通常", star: 3 },
            { word: "together", cn: "一起", star: 2 }
          ],
          sentences: [
            { en: "What do you do on weekends? — I usually visit my grandparents on Sundays.", cn: "你周末做什么？— 我周日通常看望祖父母。", star: 3 },
            { en: "She often goes swimming on Saturdays.", cn: "她周六经常去游泳。", star: 3 },
            { en: "Do you go shopping on weekends?", cn: "你周末去购物吗？", star: 2 },
            { en: "What does your father do on weekends? — He usually does housework.", cn: "你爸爸周末做什么？— 他通常做家务。", star: 3 }
          ],
          grammar: [
            { point: "第三人称单数特殊变形", detail: "go→goes, do→does, fly→flies, study→studies, watch→watches", star: 3 },
            { point: "时间介词 on + 星期/周末", detail: "on Saturdays, on Sundays, on weekends；at + 时刻；in + 月/年/季节", star: 3 },
            { point: "does 作为助动词 + 实义动词", detail: "What does he do? （does 是助动词，do 是实义动词原形）", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 ch 发音 /tʃ/", examples: "watch, chair, chicken, much", star: 2 },
            { rule: "字母 y 在重读开音节发音 /aɪ/", examples: "fly, sky, by, why", star: 2 }
          ],
          difficulties: [
            { error: "does 后加动词过去式", detail: "Does he goes（×）→ Does he go（√）；does 后接动词原形", star: 3 },
            { error: "时间介词混淆", detail: "in Sunday（×）→ on Sunday（√）；on weekend（×）→ on weekends / at the weekend", star: 3 },
            { error: "第三人称单数忘变形", detail: "He go shopping（×）→ He goes shopping（√）；She do housework（×）→ She does housework（√）", star: 3 }
          ]
        },
        {
          num: 5,
          title: "Special days",
          topic: "中外节日、序数词、日期",
          vocab: [
            { word: "New Year's Day", cn: "元旦", star: 3 },
            { word: "Spring Festival", cn: "春节", star: 3 },
            { word: "Tree Planting Day", cn: "植树节", star: 2 },
            { word: "Children's Day", cn: "儿童节", star: 3 },
            { word: "Teachers' Day", cn: "教师节", star: 3 },
            { word: "National Day", cn: "国庆节", star: 3 },
            { word: "Christmas", cn: "圣诞节", star: 3 },
            { word: "January / June / September / October", cn: "1月/6月/9月/10月", star: 3 },
            { word: "first / second / tenth", cn: "第一/第二/第十", star: 3 },
            { word: "have a party", cn: "举办派对", star: 2 },
            { word: "eat dumplings", cn: "吃饺子", star: 2 }
          ],
          sentences: [
            { en: "When is New Year's Day? — It's in January.", cn: "元旦是什么时候？— 一月。", star: 3 },
            { en: "When is Children's Day? — It's on June 1st.", cn: "儿童节是什么时候？— 六月一日。", star: 3 },
            { en: "We eat dumplings at Spring Festival.", cn: "我们春节吃饺子。", star: 2 },
            { en: "What do you do on Children's Day? — We have a party.", cn: "你儿童节做什么？— 我们举办派对。", star: 2 }
          ],
          grammar: [
            { point: "时间介词 in / on 区分", detail: "in + 月份（in January）；on + 具体日期（on June 1st）；at + 节日（at Spring Festival）", star: 3 },
            { point: "序数词用法", detail: "1st, 2nd, 3rd, 4th-12th, 21st, 22nd, 23rd；日期表达用序数词", star: 3 },
            { point: "月份首字母大写", detail: "January, February... 首字母必须大写", star: 2 }
          ],
          phonetics: [
            { rule: "字母组合 st 发音 /st/", examples: "first, festival, must, post", star: 1 },
            { rule: "字母组合 ar 发音 /ɑː/", examples: "March, party, car, far", star: 2 }
          ],
          difficulties: [
            { error: "in / on 用错", detail: "on January（×）→ in January（√）；in June 1st（×）→ on June 1st（√）", star: 3 },
            { error: "月份首字母不大写", detail: "january, june（×）→ January, June（√）", star: 2 },
            { error: "序数词拼写错", detail: "first 写成 one；second 写成 two；twenty-first 漏连字符", star: 3 }
          ]
        },
        {
          num: 6,
          title: "Asking for directions",
          topic: "问路、方位介词、祈使句",
          vocab: [
            { word: "hospital", cn: "医院", star: 2 },
            { word: "bookstore", cn: "书店", star: 2 },
            { word: "zoo", cn: "动物园", star: 2 },
            { word: "park", cn: "公园", star: 2 },
            { word: "school", cn: "学校", star: 1 },
            { word: "bank", cn: "银行", star: 2 },
            { word: "post office", cn: "邮局", star: 3 },
            { word: "left / right", cn: "左/右", star: 3 },
            { word: "straight", cn: "直地", star: 3 },
            { word: "turn", cn: "转向", star: 3 },
            { word: "near / next to / in front of / behind", cn: "附近/紧邻/前面/后面", star: 3 },
            { word: "excuse me", cn: "打扰一下", star: 3 }
          ],
          sentences: [
            { en: "Excuse me, where is the bookstore? — It's near the zoo.", cn: "打扰一下，书店在哪？— 在动物园附近。", star: 3 },
            { en: "How can I get to the hospital? — Turn left and go straight.", cn: "我怎么去医院？— 左转然后直走。", star: 3 },
            { en: "The park is next to the post office.", cn: "公园紧邻邮局。", star: 2 },
            { en: "Is the park far from here? — No, it isn't.", cn: "公园离这远吗？— 不远。", star: 2 }
          ],
          grammar: [
            { point: "方位介词", detail: "near 附近；next to 紧邻；in front of 前面；behind 后面；between A and B 在...之间", star: 3 },
            { point: "祈使句（指路）", detail: "Turn left. / Turn right. / Go straight. 主语 you 省略，动词原形开头", star: 3 },
            { point: "How can I get to...? 问路", detail: "How can I get to the hospital? 我怎么去医院？回答用祈使句指路", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 str 发音 /str/", examples: "straight, street, string, strong", star: 2 },
            { rule: "字母组合 ar 发音 /ɑː/", examples: "park, far, car, garden", star: 2 }
          ],
          difficulties: [
            { error: "next to / near 混淆", detail: "next to 紧邻（很近）；near 在附近（不一定紧邻）", star: 2 },
            { error: "in front of / in the front of 混淆", detail: "in front of 在外部前面；in the front of 在内部前部", star: 3 },
            { error: "祈使句加主语", detail: "You turn left（×，祈使句不加 you）→ Turn left.（√）", star: 2 }
          ]
        }
      ]
    },

    // ============================================================
    //  五年级上册（新版 2026秋）
    // ============================================================
    {
      id: "g5up",
      name: "五年级上册",
      version: "新版 2026秋版",
      units: [
        {
          num: 1,
          title: "Around the world",
          topic: "国家与城市、be from",
          vocab: [
            { word: "country", cn: "国家", star: 3 },
            { word: "world", cn: "世界", star: 3 },
            { word: "China", cn: "中国", star: 2 },
            { word: "the UK", cn: "英国", star: 3 },
            { word: "the USA", cn: "美国", star: 3 },
            { word: "Canada", cn: "加拿大", star: 2 },
            { word: "Australia", cn: "澳大利亚", star: 3 },
            { word: "city", cn: "城市", star: 3 },
            { word: "kangaroo", cn: "袋鼠", star: 2 },
            { word: "Tower Bridge", cn: "塔桥", star: 2 },
            { word: "Sydney Opera House", cn: "悉尼歌剧院", star: 2 },
            { word: "famous", cn: "著名的", star: 3 }
          ],
          sentences: [
            { en: "Where are you from? — I'm from China.", cn: "你来自哪里？— 我来自中国。", star: 3 },
            { en: "Where is he/she from? — He/She is from Australia.", cn: "他/她来自哪里？— 他/她来自澳大利亚。", star: 3 },
            { en: "This is a famous city.", cn: "这是一座著名的城市。", star: 2 },
            { en: "It's in the UK.", cn: "它在英国。", star: 2 }
          ],
          grammar: [
            { point: "be from 表\"来自\"", detail: "I am from / you are from / he, she, it is from / they are from", star: 3 },
            { point: "国家专有名词首字母大写 + the UK / the USA 加 the", detail: "China, America, England 不加 the；the UK, the USA 必须加 the", star: 3 },
            { point: "come from = be from", detail: "I'm from China. = I come from China. （两者可互换）", star: 2 }
          ],
          phonetics: [
            { rule: "字母组合 ee 发音 /iː/", examples: "see, tree, green, three", star: 2 },
            { rule: "字母组合 ea 发音 /iː/ 或 /e/", examples: "beach, please（/iː/）；head, bread（/e/）", star: 3 }
          ],
          difficulties: [
            { error: "the UK / the USA 漏 the", detail: "I'm from UK（×）→ I'm from the UK（√）", star: 3 },
            { error: "be 动词随人称变化错", detail: "He are from China（×）→ He is from China（√）", star: 3 },
            { error: "country / city 混淆", detail: "country 国家（如 China）；city 城市（如 Beijing）", star: 2 },
            { error: "famous 拼写错", detail: "famouse（×）→ famous（√）", star: 2 }
          ]
        },
        {
          num: 2,
          title: "Jobs",
          topic: "职业、What's sb's job、want to be",
          vocab: [
            { word: "job", cn: "工作", star: 3 },
            { word: "doctor / nurse / teacher / worker", cn: "医生/护士/老师/工人", star: 2 },
            { word: "driver / farmer / pilot / artist", cn: "司机/农民/飞行员/艺术家", star: 3 },
            { word: "people", cn: "人；人们", star: 2 },
            { word: "want to be", cn: "想成为…", star: 3 },
            { word: "in the future", cn: "将来", star: 2 }
          ],
          sentences: [
            { en: "What's your father's job? — He is a doctor.", cn: "你爸爸做什么工作？— 他是医生。", star: 3 },
            { en: "What do you want to be? — I want to be a pilot.", cn: "你将来想成为什么？— 我想成为飞行员。", star: 3 },
            { en: "My mother is a great worker.", cn: "我妈妈是一名优秀的工人。", star: 2 },
            { en: "What does your aunt do? — She is a nurse.", cn: "你阿姨做什么工作？— 她是护士。", star: 2 }
          ],
          grammar: [
            { point: "询问职业 What's sb's job? = What does sb do?", detail: "两种问法可互换；答语都用 He/She is a + 职业名称", star: 3 },
            { point: "不定冠词 a/an", detail: "a 用于辅音开头（a teacher, a doctor）；an 用于元音开头（an actor, an artist, an engineer）", star: 3 },
            { point: "名词所有格 's", detail: "your father's job 你爸爸的工作；Lily's mother 莉莉的妈妈；以 s 结尾的复数加 ' 即可（teachers' room）", star: 3 },
            { point: "want to be 想成为", detail: "want to + 动词原形；be 动词原形。I want to be a teacher.", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 er 在词尾发音 /ə/", examples: "teacher, worker, driver, farmer", star: 2 },
            { rule: "字母组合 or 在词尾发音 /ə/", examples: "doctor, actor, sailor", star: 2 }
          ],
          difficulties: [
            { error: "job 前漏 a", detail: "He is doctor（×）→ He is a doctor（√）", star: 3 },
            { error: "want to 后加 -ing 或过去式", detail: "I want to being a teacher（×）→ I want to be a teacher（√）", star: 3 },
            { error: "名词所有格 's 漏写或写错位置", detail: "your fathers job（×）→ your father's job（√）；Lilys mother（×）→ Lily's mother（√）", star: 3 },
            { error: "a/an 用错", detail: "an doctor（×）→ a doctor（√）；a artist（×）→ an artist（√）", star: 2 }
          ]
        },
        {
          num: 3,
          title: "Workplaces",
          topic: "工作场所、Where does...work、一般现在时三单",
          vocab: [
            { word: "workplace", cn: "工作场所", star: 2 },
            { word: "hospital", cn: "医院", star: 2 },
            { word: "school", cn: "学校", star: 1 },
            { word: "farm", cn: "农场", star: 2 },
            { word: "factory", cn: "工厂", star: 3 },
            { word: "office", cn: "办公室", star: 3 },
            { word: "airport", cn: "机场", star: 3 },
            { word: "work", cn: "工作", star: 3 }
          ],
          sentences: [
            { en: "Where does he/she work? — He/She works in a hospital.", cn: "他/她在哪工作？— 他/她在医院工作。", star: 3 },
            { en: "What does he/she do? — He/She is a doctor.", cn: "他/她做什么工作？— 他/她是医生。", star: 2 },
            { en: "My father works in a big factory.", cn: "我爸爸在一家大工厂工作。", star: 2 },
            { en: "Where do you work? — I work in a school.", cn: "你在哪工作？— 我在学校工作。", star: 2 }
          ],
          grammar: [
            { point: "一般现在时第三人称单数", detail: "主语 he/she/it/单数名词，动词 + s/es；work→works, study→studies, go→goes, do→does", star: 3 },
            { point: "介词 in + 工作地点", detail: "in a hospital, in a school, in a factory, in an office（in 表示在...内部）", star: 3 },
            { point: "Where does sb work? 问工作地点", detail: "答语：sb works in + 地点。注意主语是 he/she 时动词加 s", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 or 发音 /ɔː/", examples: "work, word, world, doctor", star: 3 },
            { rule: "字母组合 f 发音 /f/", examples: "factory, farm, family, office", star: 1 }
          ],
          difficulties: [
            { error: "三单动词忘加 -s", detail: "He work in a hospital（×）→ He works in a hospital（√）", star: 3 },
            { error: "in / on 混淆（地点）", detail: "on a hospital（×）→ in a hospital（√）", star: 2 },
            { error: "factory 拼写错", detail: "factory 不能拼成 factry；office 不能拼成 offce", star: 2 },
            { error: "does 后动词变形", detail: "Where does he works?（×）→ Where does he work?（√）；助动词后接动词原形", star: 3 }
          ]
        },
        {
          num: 4,
          title: "Putting things in order",
          topic: "整理物品、祈使句、方位介词",
          vocab: [
            { word: "order", cn: "顺序", star: 3 },
            { word: "thing", cn: "东西", star: 2 },
            { word: "book / toy / desk / chair / box", cn: "书/玩具/书桌/椅子/盒子", star: 2 },
            { word: "put", cn: "放", star: 3 },
            { word: "keep", cn: "保持", star: 3 },
            { word: "right / wrong", cn: "正确的/错误的", star: 2 },
            { word: "clean", cn: "干净的", star: 2 }
          ],
          sentences: [
            { en: "Put your books in the box.", cn: "把你的书放进盒子里。", star: 3 },
            { en: "Don't put your toys on the desk.", cn: "不要把你的玩具放在书桌上。", star: 3 },
            { en: "Please put things in order.", cn: "请把物品摆放整齐。", star: 2 },
            { en: "Keep your desk clean.", cn: "保持你的书桌整洁。", star: 2 }
          ],
          grammar: [
            { point: "祈使句（肯定）", detail: "动词原形开头，无主语：Put.../ Keep.../ Please + 动词原形", star: 3 },
            { point: "祈使句（否定）", detail: "Don't + 动词原形：Don't put your toys on the desk.", star: 3 },
            { point: "方位介词 in / on", detail: "in 在...里面（in the box）；on 在...上面（on the desk，有接触）", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 th 发音 /θ/", examples: "thing, think, three, mouth", star: 2 },
            { rule: "字母 o 在重读闭音节发音 /ɒ/", examples: "box, on, dog, clock", star: 1 }
          ],
          difficulties: [
            { error: "祈使句加主语 you", detail: "You put your books in the box（×，作为命令时）→ Put your books in the box.（√）", star: 3 },
            { error: "否定祈使句用 don't / doesn't 错", detail: "Doesn't put...（×）→ Don't put...（√）；祈使句否定永远用 Don't", star: 3 },
            { error: "in / on 混淆", detail: "on the box（在盒子上）vs in the box（在盒子里）；语境不同意义不同", star: 2 }
          ]
        },
        {
          num: 5,
          title: "A tidy house",
          topic: "房间、There be 句型、名词所有格",
          vocab: [
            { word: "tidy", cn: "整洁的", star: 3 },
            { word: "house", cn: "房子", star: 2 },
            { word: "room / bedroom / living room / kitchen / bathroom", cn: "房间/卧室/客厅/厨房/浴室", star: 3 },
            { word: "sofa / table / floor", cn: "沙发/桌子/地板", star: 2 },
            { word: "clean", cn: "干净的", star: 2 }
          ],
          sentences: [
            { en: "Whose bedroom is this? — It's Lily's.", cn: "这是谁的卧室？— 是莉莉的。", star: 3 },
            { en: "The room is clean and tidy.", cn: "这个房间干净又整洁。", star: 2 },
            { en: "Look at the living room.", cn: "看这间客厅。", star: 1 },
            { en: "There is a sofa in the living room.", cn: "客厅里有一张沙发。", star: 3 }
          ],
          grammar: [
            { point: "Whose 引导的特殊疑问句", detail: "Whose + 名词 + is this? 询问物品归属；答语：It's + 名词所有格（'s）", star: 3 },
            { point: "There be 句型（There is）", detail: "There is + 单数名词/不可数名词 + 地点，表示某地有某物", star: 3 },
            { point: "and 连接两个形容词", detail: "clean and tidy 又干净又整洁；nice and warm 暖洋洋的", star: 2 }
          ],
          phonetics: [
            { rule: "字母组合 oo 发音 /uː/ 或 /ʊ/", examples: "room, zoo, food（/uː/）；book, look, good（/ʊ/）", star: 3 },
            { rule: "字母组合 sh 发音 /ʃ/", examples: "shoe, shop, fish, wash", star: 1 }
          ],
          difficulties: [
            { error: "Whose 和 Who's 混淆", detail: "Whose（谁的，疑问代词）vs Who's（who is 的缩写）", star: 3 },
            { error: "There is 后接复数", detail: "There is two sofas（×）→ There are two sofas（√）", star: 3 },
            { error: "名词所有格 's 位置错", detail: "Lilys bedroom（×）→ Lily's bedroom（√）；the room of Lily's（√，更正式）", star: 2 }
          ]
        },
        {
          num: 6,
          title: "Be yourself",
          topic: "性格描述、Be + adj、反身代词",
          vocab: [
            { word: "yourself", cn: "你自己", star: 3 },
            { word: "happy / shy / active / quiet", cn: "快乐的/害羞的/积极的/安静的", star: 3 },
            { word: "clever / kind / strong", cn: "聪明的/善良的/强壮的", star: 3 },
            { word: "different", cn: "不同的", star: 3 },
            { word: "believe", cn: "相信", star: 2 }
          ],
          sentences: [
            { en: "I'm active and clever.", cn: "我积极又聪明。", star: 2 },
            { en: "Don't be shy. Be yourself.", cn: "不要害羞。做你自己。", star: 3 },
            { en: "We are all different.", cn: "我们每个人都是不一样的。", star: 2 },
            { en: "Believe in yourself.", cn: "相信你自己。", star: 3 }
          ],
          grammar: [
            { point: "be + 形容词 描述性格", detail: "I am happy. / She is shy. / They are kind. be 动词后接形容词作表语", star: 3 },
            { point: "祈使句 Be + adj / Don't be + adj", detail: "Be quiet! 安静！/ Don't be shy! 不要害羞！Don't 后必须加 be", star: 3 },
            { point: "反身代词 yourself", detail: "Believe in yourself. 相信你自己。主语 you（单数）→ yourself；复数 → yourselves", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 ve 发音 /v/", examples: "believe, live, five, give", star: 2 },
            { rule: "字母 y 在词尾发音 /i/", examples: "happy, shy, busy, easy", star: 2 }
          ],
          difficulties: [
            { error: "Don't 后漏 be", detail: "Don't shy（×）→ Don't be shy（√）；Don't + 形容词（缺 be 动词）", star: 3 },
            { error: "yourself / yourselves 混淆", detail: "Believe in yourself（单数 you）→ Believe in yourselves（复数 you）", star: 3 },
            { error: "active 主动语态错用", detail: "I am activity（×）→ I am active（√）；active 是形容词，activity 是名词", star: 2 }
          ]
        }
      ]
    },

    // ============================================================
    //  五年级下册（新版 2027春，基于现有内容推断）
    // ============================================================
    {
      id: "g5down",
      name: "五年级下册",
      version: "新版 2027春版（基于人教精通版课标内容整理）",
      units: [
        {
          num: 1,
          title: "Welcome to our school!",
          topic: "学校功能室、序数词、方位",
          vocab: [
            { word: "welcome", cn: "欢迎", star: 3 },
            { word: "our", cn: "我们的", star: 2 },
            { word: "school", cn: "学校", star: 1 },
            { word: "classroom", cn: "教室", star: 2 },
            { word: "library", cn: "图书馆", star: 3 },
            { word: "playground", cn: "操场", star: 3 },
            { word: "office (teacher's office)", cn: "办公室（教师办公室）", star: 2 },
            { word: "gym", cn: "体育馆", star: 3 },
            { word: "lab (science lab)", cn: "实验室（科学实验室）", star: 3 },
            { word: "computer room", cn: "计算机室", star: 2 },
            { word: "art room / music room", cn: "美术室/音乐室", star: 2 },
            { word: "floor", cn: "楼层", star: 3 },
            { word: "first / second / third", cn: "第一/第二/第三", star: 3 },
            { word: "show", cn: "展示；带", star: 2 },
            { word: "around", cn: "周围；到处", star: 2 }
          ],
          sentences: [
            { en: "Welcome to our school!", cn: "欢迎来到我们学校！", star: 3 },
            { en: "Where is your classroom? — It's on the first floor.", cn: "你们的教室在哪？— 在一楼。", star: 3 },
            { en: "Let me show you around.", cn: "让我带你们四处看看。", star: 2 },
            { en: "This way, please.", cn: "请这边走。", star: 3 },
            { en: "This is our library. We can read books here.", cn: "这是我们的图书馆。我们可以在这里看书。", star: 2 },
            { en: "Our computer room is on the second floor.", cn: "我们的计算机室在二楼。", star: 2 }
          ],
          grammar: [
            { point: "序数词 first/second/third", detail: "用于表达楼层 on the first/second/third floor；序数词前通常加 the", star: 3 },
            { point: "方位介词 on + 楼层", detail: "on the first floor 在一楼（不用 in the first floor）", star: 3 },
            { point: "指示代词 this/that/these/those", detail: "This is... / These are... 介绍场所；this/these 指近，that/those 指远", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 ir 发音 /ɜː/", examples: "first, third, bird, girl", star: 3 },
            { rule: "字母组合 or 发音 /ɔː/", examples: "second, world, work, word", star: 3 }
          ],
          difficulties: [
            { error: "序数词拼写错", detail: "first 漏 r；second 漏 n；third 与 three 混淆", star: 3 },
            { error: "in the first floor", detail: "in the first floor（×）→ on the first floor（√）；楼层用 on 不用 in", star: 3 },
            { error: "library 复数拼写", detail: "librarys（×）→ libraries（√）；变 y 为 i 加 es", star: 3 },
            { error: "This is / These are 单复数不匹配", detail: "These is our classrooms（×）→ These are our classrooms（√）", star: 2 }
          ]
        },
        {
          num: 2,
          title: "Can I help you?",
          topic: "购物、How much、Can/May",
          vocab: [
            { word: "help", cn: "帮助", star: 3 },
            { word: "can / may", cn: "能/可以", star: 3 },
            { word: "want / buy", cn: "想要/买", star: 3 },
            { word: "toy (train/plane/ship/boat)", cn: "玩具（火车/飞机/船/小船）", star: 2 },
            { word: "doll / ball / car / kite / bike", cn: "洋娃娃/球/汽车/风筝/自行车", star: 2 },
            { word: "how much", cn: "多少（询问价格）", star: 3 },
            { word: "yuan", cn: "元", star: 2 },
            { word: "only", cn: "仅仅", star: 2 },
            { word: "cheap / expensive", cn: "便宜的/昂贵的", star: 3 },
            { word: "nice / pretty", cn: "漂亮的/可爱的", star: 2 },
            { word: "try on", cn: "试穿", star: 3 }
          ],
          sentences: [
            { en: "Can I help you? — Yes, I want a toy car.", cn: "我能帮你吗？— 是的，我想要一辆玩具汽车。", star: 3 },
            { en: "What can I do for you? — I want to buy a doll.", cn: "我能为你做些什么？— 我想买一个洋娃娃。", star: 3 },
            { en: "How much is it? — It's ten yuan.", cn: "它多少钱？— 十元。", star: 3 },
            { en: "How much are these shorts? — They're sixty-five yuan.", cn: "这些短裤多少钱？— 65元。", star: 3 },
            { en: "Can I try it on? — Sure.", cn: "我能试穿一下吗？— 当然。", star: 2 }
          ],
          grammar: [
            { point: "情态动词 can/may 表请求", detail: "Can I help you? / May I help you?；may 更正式委婉", star: 3 },
            { point: "how much 问价格 vs how many 问数量", detail: "How much is it? 问价格；How many dolls? 问数量；how much + 不可数名词", star: 3 },
            { point: "want 用法", detail: "want sth 想要某物（want a toy）；want to do sth 想要做某事（want to buy a doll）", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 ch 发音 /tʃ/", examples: "much, chair, chicken, cheap", star: 2 },
            { rule: "字母组合 ex 发音 /ɪks/", examples: "expensive, exercise, exam", star: 3 }
          ],
          difficulties: [
            { error: "how much / how many 混淆", detail: "How many is it?（×）→ How much is it?（√，问价格）；How much dolls?（×）→ How many dolls?（√，问数量）", star: 3 },
            { error: "try on 代词位置错", detail: "try on it（×）→ try it on（√）；try on the coat = try the coat on", star: 3 },
            { error: "I want buy", detail: "I want buy a car（×）→ I want to buy a car（√）；want to + 动词原形", star: 3 },
            { error: "cheap / expensive 拼写", detail: "cheap 不能拼成 cheep（cheep 是鸟叫声）；expensive 不能拼成 expansive", star: 2 }
          ]
        },
        {
          num: 3,
          title: "We should obey the rules",
          topic: "规则、should/shouldn't、must/mustn't、祈使句",
          vocab: [
            { word: "should / shouldn't", cn: "应该/不应该", star: 3 },
            { word: "must / mustn't", cn: "必须/禁止", star: 3 },
            { word: "obey", cn: "遵守", star: 3 },
            { word: "rule / school rules / class rules", cn: "规则/校规/班规", star: 3 },
            { word: "keep", cn: "保持", star: 2 },
            { word: "quiet / quietly", cn: "安静的/安静地", star: 3 },
            { word: "listen to", cn: "听...", star: 3 },
            { word: "be late", cn: "迟到", star: 2 },
            { word: "on time", cn: "准时", star: 2 },
            { word: "turn off", cn: "关掉", star: 3 },
            { word: "light / door / window", cn: "灯/门/窗", star: 2 },
            { word: "make noise", cn: "喧闹", star: 3 },
            { word: "cross the street", cn: "过马路", star: 3 },
            { word: "wait for", cn: "等待", star: 2 }
          ],
          sentences: [
            { en: "We should obey the rules.", cn: "我们应该遵守规则。", star: 3 },
            { en: "We shouldn't be late.", cn: "我们不应该迟到。", star: 3 },
            { en: "We should keep quiet in class.", cn: "我们在课堂上应该保持安静。", star: 3 },
            { en: "We should listen to the teacher carefully.", cn: "我们应该认真听老师讲课。", star: 2 },
            { en: "You mustn't cross the street now.", cn: "你现在不能过马路。", star: 3 },
            { en: "You must wait for the green light.", cn: "你必须等绿灯。", star: 3 },
            { en: "Keep quiet! / Turn off the light!", cn: "保持安静！/ 关灯！", star: 3 }
          ],
          grammar: [
            { point: "should / shouldn't + 动词原形", detail: "should 表应该，shouldn't 表不应该；后面均接动词原形：We should keep quiet", star: 3 },
            { point: "must / mustn't + 动词原形", detail: "must 表必须，mustn't 表禁止；语气比 should 强", star: 3 },
            { point: "副词修饰动词", detail: "listen carefully, listen quietly；副词通常在动词后", star: 3 },
            { point: "祈使句（命令）", detail: "Keep quiet! / Turn off the light! 动词原形开头，否定用 Don't", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 ould 发音 /ʊd/", examples: "should, would, could", star: 3 },
            { rule: "字母组合 qu 发音 /kw/", examples: "quiet, queen, question, quick", star: 2 }
          ],
          difficulties: [
            { error: "should 后加 -ing 或 -ed", detail: "We should keeping quiet（×）→ We should keep quiet（√）；should + 动词原形", star: 3 },
            { error: "must / mustn't 语气判断错", detail: "mustn't = 禁止（不能做）；don't have to = 不必（可以不做）", star: 3 },
            { error: "quiet / quietly 混淆", detail: "quiet 形容词（be quiet）；quietly 副词（listen quietly）", star: 3 },
            { error: "be late 漏 be", detail: "I late for school（×）→ I am late for school / I shouldn't be late for school（√）", star: 3 }
          ]
        },
        {
          num: 4,
          title: "What's wrong with you?",
          topic: "病情、have a...、should 建议",
          vocab: [
            { word: "wrong", cn: "错误的；不舒服", star: 3 },
            { word: "ill / sick", cn: "生病的", star: 3 },
            { word: "have a headache", cn: "头痛", star: 3 },
            { word: "have a fever", cn: "发烧", star: 3 },
            { word: "have a cold", cn: "感冒", star: 3 },
            { word: "have a cough", cn: "咳嗽", star: 3 },
            { word: "have a toothache", cn: "牙痛", star: 3 },
            { word: "have a stomachache", cn: "胃痛", star: 3 },
            { word: "tired", cn: "累的", star: 2 },
            { word: "have a rest", cn: "休息", star: 2 },
            { word: "drink more water", cn: "多喝水", star: 2 },
            { word: "take medicine", cn: "吃药", star: 3 },
            { word: "feel better", cn: "感觉好多了", star: 2 }
          ],
          sentences: [
            { en: "What's wrong with you? — I have a headache.", cn: "你怎么了？— 我头痛。", star: 3 },
            { en: "What's wrong with him/her? — He/She has a fever.", cn: "他/她怎么了？— 他/她发烧了。", star: 3 },
            { en: "You should have a rest.", cn: "你应该休息。", star: 2 },
            { en: "You should take some medicine and drink more water.", cn: "你应该吃点药并多喝水。", star: 3 },
            { en: "I feel better now.", cn: "我现在感觉好多了。", star: 2 }
          ],
          grammar: [
            { point: "have / has 表疾病", detail: "have a + 疾病；第三人称单数用 has：He has a fever.", star: 3 },
            { point: "should 表建议", detail: "should + 动词原形；You should drink more water. 你应该多喝水", star: 3 },
            { point: "feel + 形容词", detail: "feel better 感觉好多了；better 是 well/good 的比较级", star: 2 }
          ],
          phonetics: [
            { rule: "字母组合 ach 发音 /k/ 或 /tʃ/", examples: "headache, stomachache（/k/）；watch, catch（/tʃ/）", star: 3 }
          ],
          difficulties: [
            { error: "have/has 混淆", detail: "I has a headache（×）→ I have a headache（√）；He have a fever（×）→ He has a fever（√）", star: 3 },
            { error: "固定搭配漏 a", detail: "have headache（×）→ have a headache（√）；have fever（×）→ have a fever（√）", star: 3 },
            { error: "take medicine 用错", detail: "take a medicine（×）→ take some medicine（√）；medicine 是不可数名词", star: 3 },
            { error: "feel better / feel good 混淆", detail: "feel better（比较级，感觉更好）vs feel good（一般感觉好）", star: 2 }
          ]
        },
        {
          num: 5,
          title: "I'm cleaning my room",
          topic: "现在进行时、家务活动",
          vocab: [
            { word: "clean", cn: "打扫", star: 3 },
            { word: "cleaning", cn: "打扫（现在分词）", star: 3 },
            { word: "room / desk / chair / bed / floor / window / door", cn: "房间/书桌/椅子/床/地板/窗/门", star: 2 },
            { word: "put away", cn: "收好", star: 3 },
            { word: "tidy up", cn: "整理", star: 3 },
            { word: "sweep", cn: "扫地", star: 3 },
            { word: "wash", cn: "洗", star: 2 },
            { word: "make a call", cn: "打电话", star: 3 },
            { word: "write an email", cn: "写电子邮件", star: 3 },
            { word: "tell a story", cn: "讲故事", star: 3 },
            { word: "sing a song", cn: "唱歌", star: 2 },
            { word: "play the guitar / piano / violin", cn: "弹吉他/钢琴/小提琴", star: 3 },
            { word: "look at", cn: "看", star: 2 },
            { word: "talk about", cn: "谈论", star: 2 }
          ],
          sentences: [
            { en: "I'm cleaning my room.", cn: "我正在打扫我的房间。", star: 3 },
            { en: "What are you doing? — I'm cleaning the room.", cn: "你正在做什么？— 我正在打扫房间。", star: 3 },
            { en: "Dad is writing an email.", cn: "爸爸正在写电子邮件。", star: 3 },
            { en: "Mum is washing the clothes.", cn: "妈妈正在洗衣服。", star: 3 },
            { en: "What's Li Yan doing? — She's singing a song.", cn: "李艳正在做什么？— 她正在唱歌。", star: 3 },
            { en: "Is he looking at the moon? — No, he isn't. He is looking at the sun.", cn: "他正在看月亮吗？— 不，他正在看太阳。", star: 3 }
          ],
          grammar: [
            { point: "现在进行时结构", detail: "be (am/is/are) + 动词-ing 形式；表示正在进行的动作", star: 3 },
            { point: "动词-ing 变化规则", detail: "① 直接加 ing：clean-cleaning, sweep-sweeping；② 去不发音 e 加 ing：wash-washing, write-writing；③ 重读闭音节双写尾字母加 ing：put-putting, swim-swimming, run-running", star: 3 },
            { point: "现在进行时疑问句", detail: "be 动词提前：Are you cleaning? / Is he sweeping? 答语：Yes, I am. / No, I'm not.", star: 3 },
            { point: "play + 球类不加 the vs play + the + 乐器", detail: "play football（不加 the）；play the piano（必须加 the）", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 ing 发音 /ɪŋ/", examples: "cleaning, sweeping, washing, writing", star: 3 }
          ],
          difficulties: [
            { error: "现在进行时漏 be 动词", detail: "I cleaning my room（×）→ I'm cleaning my room（√）", star: 3 },
            { error: "动词-ing 拼写错", detail: "wash-washng（×）→ washing（去 e 加 ing）；run-runing（×）→ running（双写 n）", star: 3 },
            { error: "现在进行时 vs 一般现在时混淆", detail: "I clean my room every day（习惯）→ I'm cleaning my room now（正在做）", star: 3 },
            { error: "play the piano / play piano 混淆", detail: "play piano（×）→ play the piano（√，乐器加 the）", star: 3 }
          ]
        },
        {
          num: 6,
          title: "We're watching the games",
          topic: "现在进行时拓展、运动",
          vocab: [
            { word: "watch", cn: "观看", star: 3 },
            { word: "game / games", cn: "比赛", star: 2 },
            { word: "play football / volleyball / basketball", cn: "踢足球/打排球/打篮球", star: 3 },
            { word: "play badminton / tennis / ping-pong / baseball", cn: "打羽毛球/网球/乒乓/棒球", star: 3 },
            { word: "do the high jump / long jump", cn: "跳高/跳远", star: 3 },
            { word: "run / jump / swim", cn: "跑/跳/游泳", star: 2 },
            { word: "win", cn: "赢", star: 2 },
            { word: "cheer", cn: "欢呼", star: 3 },
            { word: "excited / exciting", cn: "兴奋的/令人兴奋的", star: 3 },
            { word: "loudly", cn: "大声地", star: 2 }
          ],
          sentences: [
            { en: "We're watching the games.", cn: "我们正在观看比赛。", star: 3 },
            { en: "The boys are playing football.", cn: "男孩们正在踢足球。", star: 3 },
            { en: "What are they doing? — They are playing tennis.", cn: "他们正在做什么？— 他们正在打网球。", star: 3 },
            { en: "Are you watching the high jump? — Yes, we are.", cn: "你们正在看跳高吗？— 是的。", star: 3 },
            { en: "He's running fast. / She's jumping high.", cn: "他跑得很快。/ 她跳得很高。", star: 2 },
            { en: "They're cheering loudly.", cn: "他们正在大声欢呼。", star: 2 }
          ],
          grammar: [
            { point: "现在进行时拓展运用", detail: "watching, playing, running, jumping, cheering 都用 be + ing", star: 3 },
            { point: "副词修饰动词", detail: "run fast（fast 修饰 run）；jump high（high 修饰 jump）；cheer loudly（loudly 修饰 cheer）", star: 3 },
            { point: "excited vs exciting", detail: "excited 修饰人（We are excited）；exciting 修饰事物（The game is exciting）", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 ee 发音 /iː/", examples: "see, tree, green, three", star: 2 },
            { rule: "字母组合 ay 发音 /eɪ/", examples: "play, day, say, today", star: 2 }
          ],
          difficulties: [
            { error: "现在进行时与一般现在时混淆", detail: "They play basketball（一般现在时，表习惯）→ They're playing basketball（现在进行时，表正在做）", star: 3 },
            { error: "动词-ing 拼写错", detail: "run-runing（×）→ running（双写 n）；swim-swiming（×）→ swimming（双写 m）", star: 3 },
            { error: "excited / exciting 混淆", detail: "The game is excited（×）→ The game is exciting（√，修饰事物）；We are exciting（×）→ We are excited（√，修饰人）", star: 3 }
          ]
        }
      ]
    },

    // ============================================================
    //  六年级上册（新版 2026秋）
    // ============================================================
    {
      id: "g6up",
      name: "六年级上册",
      version: "新版 2026秋版",
      units: [
        {
          num: 1,
          title: "Travelling",
          topic: "旅行、一般将来时 be going to",
          vocab: [
            { word: "travel / travelling", cn: "旅行", star: 3 },
            { word: "go on a trip", cn: "去旅行", star: 3 },
            { word: "by plane / by train / by ship", cn: "乘飞机/火车/船", star: 3 },
            { word: "go to Beijing / Shanghai / Sanya", cn: "去北京/上海/三亚", star: 2 },
            { word: "tomorrow / next week / next month", cn: "明天/下周/下个月", star: 3 },
            { word: "this weekend / this summer", cn: "本周末/今年夏天", star: 3 },
            { word: "holiday / summer holiday", cn: "假期/暑假", star: 3 },
            { word: "visit", cn: "参观；看望", star: 2 },
            { word: "stay at home", cn: "待在家", star: 2 }
          ],
          sentences: [
            { en: "I am going to visit my grandparents this weekend.", cn: "我这个周末要去看望祖父母。", star: 3 },
            { en: "What are you going to do tomorrow? — I'm going to go on a trip.", cn: "你明天打算做什么？— 我要去旅行。", star: 3 },
            { en: "She is going to travel to Sanya by plane.", cn: "她将乘飞机去三亚旅行。", star: 3 },
            { en: "We will go to Beijing next week.", cn: "我们下周要去北京。", star: 3 },
            { en: "Are you going to stay at home this summer? — Yes, I am.", cn: "今年夏天你打算待在家吗？— 是的。", star: 3 }
          ],
          grammar: [
            { point: "一般将来时 be going to 结构", detail: "主语 + am/is/are + going to + 动词原形；表打算、计划做某事", star: 3 },
            { point: "一般将来时 will 结构", detail: "主语 + will + 动词原形；表将要发生的动作，比 be going to 更通用", star: 3 },
            { point: "be going to 的疑问句", detail: "be 动词提前：Are you going to...? 答语：Yes, I am. / No, I'm not.", star: 3 },
            { point: "将来时间标志词", detail: "tomorrow, next week/month/year, this weekend/summer, soon, in + 时间段（in two days 两天后）", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 ow 发音 /aʊ/ 或 /əʊ/", examples: "how, now, cow（/aʊ/）；show, know, low（/əʊ/）", star: 3 },
            { rule: "字母组合 ou 发音 /aʊ/", examples: "out, about, house, ground", star: 2 }
          ],
          difficulties: [
            { error: "be going to 后加 -ing", detail: "I am going to visiting（×）→ I am going to visit（√）", star: 3 },
            { error: "be going to 漏 be 动词", detail: "I going to visit（×）→ I am going to visit（√）", star: 3 },
            { error: "be going to 与 will 混淆", detail: "be going to 强调计划打算；will 强调临时决定或预测；两者多数情况可互换", star: 3 },
            { error: "by + 交通工具错用", detail: "by a plane（×）→ by plane（√）；take a plane（√，加 a）", star: 2 }
          ]
        },
        {
          num: 2,
          title: "My Feelings",
          topic: "情绪表达、主系表结构",
          vocab: [
            { word: "happy / sad / angry / excited", cn: "开心/难过/生气/兴奋", star: 3 },
            { word: "tired / bored / nervous / proud", cn: "累/无聊/紧张/自豪", star: 3 },
            { word: "feel / feeling", cn: "感觉/感受", star: 3 },
            { word: "look / sound", cn: "看起来/听起来", star: 3 }
          ],
          sentences: [
            { en: "I feel happy today.", cn: "我今天感觉很开心。", star: 3 },
            { en: "She looks sad. What's wrong with her?", cn: "她看起来很难过。她怎么了？", star: 3 },
            { en: "How do you feel? — I feel excited.", cn: "你感觉怎么样？— 我感觉很兴奋。", star: 3 },
            { en: "The music sounds beautiful.", cn: "这音乐听起来很美。", star: 2 },
            { en: "I am proud of my son.", cn: "我为我的儿子感到自豪。", star: 3 }
          ],
          grammar: [
            { point: "主系表结构", detail: "主语 + be动词 / 系动词 + 形容词；系动词：be, look, sound, feel, taste, smell", star: 3 },
            { point: "feel + 形容词", detail: "feel happy, feel tired, feel excited；不用 feel + 副词", star: 3 },
            { point: "be proud of 为...骄傲", detail: "be proud of + 名词/代词/动名词；I am proud of my son. 我为儿子骄傲", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 ee 发音 /iː/", examples: "feel, see, tree, three", star: 2 },
            { rule: "字母组合 ou 发音 /ʌ/", examples: "touch, country, double, trouble", star: 3 }
          ],
          difficulties: [
            { error: "feel + 副词", detail: "I feel happily（×）→ I feel happy（√）；feel 后接形容词", star: 3 },
            { error: "excited / exciting 混淆", detail: "I am exciting（×）→ I am excited（√，修饰人）；The news is excited（×）→ The news is exciting（√，修饰事物）", star: 3 },
            { error: "be proud of 漏 of", detail: "I am proud my son（×）→ I am proud of my son（√）", star: 3 }
          ]
        },
        {
          num: 3,
          title: "Planting and Growing",
          topic: "种植、一般现在时客观描述",
          vocab: [
            { word: "plant / plant flowers / plant trees", cn: "种植/种花/种树", star: 3 },
            { word: "seed", cn: "种子", star: 3 },
            { word: "water (v.)", cn: "浇水", star: 3 },
            { word: "grow / grow up", cn: "生长/长大", star: 3 },
            { word: "leaf / leaves", cn: "叶子（复数）", star: 3 },
            { word: "root / stem / flower / fruit", cn: "根/茎/花/果实", star: 3 },
            { word: "sun / sunlight", cn: "太阳/阳光", star: 2 },
            { word: "soil / earth", cn: "土壤/泥土", star: 3 },
            { word: "dig", cn: "挖", star: 3 }
          ],
          sentences: [
            { en: "First, we plant the seeds in the soil.", cn: "首先，我们把种子种在土里。", star: 3 },
            { en: "Then we water them every day.", cn: "然后我们每天给它们浇水。", star: 3 },
            { en: "The plants grow and grow.", cn: "植物不断生长。", star: 2 },
            { en: "They have green leaves and beautiful flowers.", cn: "它们有绿叶和美丽的花朵。", star: 2 },
            { en: "We should take care of plants.", cn: "我们应该爱护植物。", star: 2 }
          ],
          grammar: [
            { point: "一般现在时表客观描述", detail: "Plants need water and sunlight. / Leaves are green. 客观事实用一般现在时", star: 3 },
            { point: "first, then, next, finally 顺序词", detail: "用于描述步骤：First... Then... Next... Finally...", star: 3 },
            { point: "take care of 照顾", detail: "take care of + 名词/代词；take good care of 好好照顾", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 ee 发音 /iː/", examples: "seed, tree, green, need", star: 2 },
            { rule: "字母组合 ou 发音 /ʌ/", examples: "country, touch, sun, run", star: 2 }
          ],
          difficulties: [
            { error: "water 既是名词又是动词混淆", detail: "I water the plants（动词，浇水）；I drink water（名词，水）", star: 3 },
            { error: "leaf 复数加 -s 还是 -es", detail: "leafs（×）→ leaves（√，f 变 v 加 es）", star: 3 },
            { error: "grow / grow up 混淆", detail: "grow 生长（植物）；grow up 长大（人）；The plants grow / I want to grow up", star: 2 }
          ]
        },
        {
          num: 4,
          title: "Seasons",
          topic: "四季、季节活动",
          vocab: [
            { word: "spring / summer / autumn / winter", cn: "春/夏/秋/冬", star: 3 },
            { word: "season", cn: "季节", star: 3 },
            { word: "warm / hot / cool / cold", cn: "温暖/炎热/凉爽/寒冷", star: 3 },
            { word: "go on spring outings", cn: "去春游", star: 3 },
            { word: "go swimming", cn: "去游泳", star: 2 },
            { word: "pick apples", cn: "摘苹果", star: 3 },
            { word: "make a snowman", cn: "堆雪人", star: 3 },
            { word: "fly kites", cn: "放风筝", star: 2 },
            { word: "have summer holidays", cn: "过暑假", star: 2 },
            { word: "wake up", cn: "醒来", star: 2 }
          ],
          sentences: [
            { en: "Spring is the first season.", cn: "春天是第一个季节。", star: 3 },
            { en: "What's spring like? — It's warm. Trees have new green leaves.", cn: "春天是什么样的？— 很温暖。树有新的绿叶。", star: 3 },
            { en: "What do people do in spring? — They fly kites and go on spring outings.", cn: "人们在春天做什么？— 他们放风筝，去春游。", star: 3 },
            { en: "What do students do on summer holidays?", cn: "学生在暑假做什么？", star: 2 },
            { en: "In winter, children make snowmen.", cn: "冬天，孩子们堆雪人。", star: 2 }
          ],
          grammar: [
            { point: "What's...like? 询问特征", detail: "What's spring like? 春天是什么样的？答语用形容词描述", star: 3 },
            { point: "in + 季节/月", detail: "in spring, in summer, in January；on + 具体日期；at + 时刻", star: 3 },
            { point: "复数名词作主语", detail: "Trees have new leaves. / Children make snowmen. 复数主语动词用原形", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 ea 发音 /iː/ 或 /e/", examples: "leaves, please（/iː/）；head, bread（/e/）", star: 3 }
          ],
          difficulties: [
            { error: "What's spring like? 答语错用", detail: "—It's spring（×）→ —It's warm（√，应描述特征）", star: 3 },
            { error: "季节介词错", detail: "on spring（×）→ in spring（√）；on January（×）→ in January（√）", star: 3 },
            { error: "snowman 复数错", detail: "make snowman（×）→ make snowmen（√）；man→men 不规则变化", star: 3 }
          ]
        },
        {
          num: 5,
          title: "Celebration days",
          topic: "中外节日对比",
          vocab: [
            { word: "Spring Festival / Mid-Autumn Festival", cn: "春节/中秋节", star: 3 },
            { word: "Dragon Boat Festival", cn: "端午节", star: 3 },
            { word: "Christmas / Thanksgiving Day", cn: "圣诞节/感恩节", star: 3 },
            { word: "New Year's Day / National Day", cn: "元旦/国庆节", star: 3 },
            { word: "celebrate", cn: "庆祝", star: 3 },
            { word: "have a party", cn: "举办派对", star: 2 },
            { word: "eat dumplings / moon cakes", cn: "吃饺子/月饼", star: 3 },
            { word: "give presents", cn: "送礼物", star: 2 },
            { word: "watch fireworks", cn: "看烟花", star: 3 }
          ],
          sentences: [
            { en: "When is Spring Festival? — It's in January or February.", cn: "春节什么时候？— 一月或二月。", star: 3 },
            { en: "What do people do at Spring Festival? — They eat dumplings and have a party.", cn: "人们春节做什么？— 他们吃饺子，办派对。", star: 3 },
            { en: "How do people celebrate Christmas?", cn: "人们怎么庆祝圣诞节？", star: 2 },
            { en: "Children get presents at Christmas.", cn: "孩子们在圣诞节收到礼物。", star: 2 }
          ],
          grammar: [
            { point: "at + 节日 vs on + 具体日期", detail: "at Spring Festival, at Christmas；on New Year's Day, on National Day", star: 3 },
            { point: "How 引导疑问句", detail: "How do people celebrate...? 人们怎么庆祝...？答语用动词短语描述", star: 3 },
            { point: "中西方文化对比表达", detail: "Chinese people eat... / Western people eat... 对比文化习俗", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 ch 发音 /tʃ/ 或 /k/", examples: "Christmas, school（/k/）；chair, watch（/tʃ/）", star: 3 }
          ],
          difficulties: [
            { error: "at / on 节日介词错", detail: "on Spring Festival（×）→ at Spring Festival（√）；at Christmas（√，节日持续期间）", star: 3 },
            { error: "圣诞节时间表达错", detail: "Christmas 在12月25日，可用 on Christmas Day（具体日期）或 at Christmas（节日期间）", star: 3 },
            { error: "庆祝活动动词搭配错", detail: "eat dumplings 吃饺子；make dumplings 包饺子；give presents 送礼物（不用 send presents 在此语境）", star: 2 }
          ]
        },
        {
          num: 6,
          title: "Heroes",
          topic: "英雄人物、品格教育",
          vocab: [
            { word: "hero / heroine", cn: "英雄/女英雄", star: 3 },
            { word: "brave / clever / kind / strong", cn: "勇敢的/聪明的/善良的/强壮的", star: 3 },
            { word: "great / famous", cn: "伟大的/著名的", star: 3 },
            { word: "help others", cn: "帮助他人", star: 3 },
            { word: "save", cn: "拯救", star: 3 },
            { word: "fight", cn: "战斗", star: 3 },
            { word: "die for", cn: "为...献身", star: 3 }
          ],
          sentences: [
            { en: "Who is your hero? — My hero is...", cn: "你的英雄是谁？— 我的英雄是...", star: 3 },
            { en: "He is brave and clever.", cn: "他勇敢又聪明。", star: 2 },
            { en: "He saved many people.", cn: "他救了许多人。", star: 3 },
            { en: "She is a great hero in Chinese history.", cn: "她是中国历史上的伟大英雄。", star: 3 },
            { en: "We should learn from heroes.", cn: "我们应该向英雄学习。", star: 2 }
          ],
          grammar: [
            { point: "描述人物品质", detail: "主语 + be + 形容词：He is brave. / She is clever. / They are great.", star: 3 },
            { point: "一般过去时初步引入（不规则动词）", detail: "save→saved（规则）；fight→fought（不规则）；give→gave（不规则）", star: 3 },
            { point: "learn from 向...学习", detail: "learn from + 人；We should learn from heroes.", star: 2 }
          ],
          phonetics: [
            { rule: "字母组合 er / or 在词尾发音 /ə/", examples: "hero, teacher, doctor, river", star: 2 },
            { rule: "字母组合 gh 不发音", examples: "fight, right, light, high", star: 3 }
          ],
          difficulties: [
            { error: "hero 复数加 -es 还是 -s", detail: "heros（×）→ heroes（√，o 前是辅音字母加 es）", star: 3 },
            { error: "brave 与 save 拼写混", detail: "brave 勇敢的（形容词）；save 拯救（动词，过去式 saved）", star: 2 },
            { error: "die for / die of 混淆", detail: "die for 为...献身；die of 死于（疾病）", star: 3 }
          ]
        }
      ]
    },

    // ============================================================
    //  六年级下册（新版 2027春，基于课标和小升初衔接要点推断）
    // ============================================================
    {
      id: "g6down",
      name: "六年级下册",
      version: "新版 2027春版（小学收官总复习，基于2022课标与小升初衔接要点）",
      units: [
        {
          num: 1,
          title: "I went to Sanya for my holiday",
          topic: "一般过去时（was/were + 规则动词过去式）",
          vocab: [
            { word: "go → went", cn: "去（过去式）", star: 3 },
            { word: "visit → visited", cn: "参观（过去式）", star: 3 },
            { word: "play → played", cn: "玩（过去式）", star: 3 },
            { word: "watch → watched", cn: "观看（过去式）", star: 3 },
            { word: "yesterday / last weekend / last night", cn: "昨天/上周末/昨晚", star: 3 },
            { word: "...ago (two days ago)", cn: "...前（两天前）", star: 3 },
            { word: "in 2020 / last year", cn: "在2020年/去年", star: 3 },
            { word: "trip / holiday", cn: "旅行/假期", star: 3 }
          ],
          sentences: [
            { en: "I went to Sanya for my holiday last summer.", cn: "去年夏天我去三亚度假了。", star: 3 },
            { en: "Where did you go yesterday? — I went to the park.", cn: "你昨天去哪了？— 我去了公园。", star: 3 },
            { en: "Did you have a good time? — Yes, I did.", cn: "你玩得开心吗？— 是的。", star: 3 },
            { en: "She was at home yesterday.", cn: "她昨天在家。", star: 3 },
            { en: "We were very happy last weekend.", cn: "我们上周末很开心。", star: 3 }
          ],
          grammar: [
            { point: "一般过去时基本结构（be动词）", detail: "主语 + was/were + 其他；I/he/she/it 用 was；we/you/they 用 were", star: 3 },
            { point: "一般过去时（实义动词）", detail: "主语 + 动词过去式 + 其他；规则动词加 -ed：played, visited, watched", star: 3 },
            { point: "规则动词过去式变化规则", detail: "① 直接加 -ed：play→played, visit→visited；② 以 e 结尾加 d：live→lived, dance→danced；③ 辅音+y 结尾变 y 为 i 加 ed：study→studied, carry→carried；④ 重读闭音节双写尾字母加 ed：stop→stopped, plan→planned", star: 3 },
            { point: "一般疑问句 Did + 主语 + 动词原形", detail: "Did you go? 答语：Yes, I did. / No, I didn't.", star: 3 }
          ],
          phonetics: [
            { rule: "-ed 发音 /t/ /d/ /ɪd/", examples: "watched /t/, played /d/, wanted /ɪd/", star: 3 }
          ],
          difficulties: [
            { error: "did 后接动词过去式", detail: "Did you went?（×）→ Did you go?（√）；助动词后接原形", star: 3 },
            { error: "be 动词与主语不一致", detail: "I were at home（×）→ I was at home（√）；She were happy（×）→ She was happy（√）", star: 3 },
            { error: "规则动词过去式拼写错", detail: "studyed（×）→ studied；stoped（×）→ stopped；liveed（×）→ lived", star: 3 },
            { error: "过去时间标志词判断错", detail: "看到 yesterday/last/ago 等就用一般过去时", star: 3 }
          ]
        },
        {
          num: 2,
          title: "Past Stories",
          topic: "一般过去时（不规则动词）",
          vocab: [
            { word: "go → went", cn: "去", star: 3 },
            { word: "do → did", cn: "做", star: 3 },
            { word: "have → had", cn: "有", star: 3 },
            { word: "eat → ate", cn: "吃", star: 3 },
            { word: "see → saw", cn: "看见", star: 3 },
            { word: "buy → bought", cn: "买", star: 3 },
            { word: "take → took", cn: "拿", star: 3 },
            { word: "make → made", cn: "制作", star: 3 },
            { word: "give → gave", cn: "给", star: 3 },
            { word: "get → got", cn: "得到", star: 3 },
            { word: "sing → sang", cn: "唱歌", star: 3 },
            { word: "swim → swam", cn: "游泳", star: 3 },
            { word: "come → came", cn: "来", star: 3 },
            { word: "run → ran", cn: "跑", star: 3 },
            { word: "story / tell a story", cn: "故事/讲故事", star: 3 }
          ],
          sentences: [
            { en: "Yesterday I went to the zoo and saw many animals.", cn: "昨天我去了动物园，看到了很多动物。", star: 3 },
            { en: "What did you do last weekend? — I played football and did my homework.", cn: "你上周末做什么了？— 我踢足球和做作业了。", star: 3 },
            { en: "She bought a new book and read it last night.", cn: "她昨晚买了一本新书并读了。", star: 3 },
            { en: "Did you have breakfast this morning? — Yes, I did.", cn: "你今早吃早饭了吗？— 是的。", star: 3 },
            { en: "He took a photo of the beautiful flowers.", cn: "他拍了一张美丽花朵的照片。", star: 2 }
          ],
          grammar: [
            { point: "不规则动词过去式（必须背）", detail: "go-went, do-did, have-had, eat-ate, see-saw, buy-bought, take-took, make-made, give-gave, get-got, sing-sang, swim-swam, come-came, run-ran", star: 3 },
            { point: "过去时的特殊疑问句", detail: "What did + 主语 + do + 过去时间?；Where did + 主语 + go?", star: 3 },
            { point: "并列连词 and / but / so", detail: "连接两个并列动作：went... and saw...；but 表转折；so 表因果", star: 3 }
          ],
          phonetics: [
            { rule: "不规则动词过去式发音需逐个记忆", examples: "went /went/, saw /sɔː/, ate /eɪt/, took /tʊk/", star: 3 }
          ],
          difficulties: [
            { error: "不规则动词过去式不熟", detail: "go→goed（×）→ go→went（√）；see→seed（×）→ see→saw（√）", star: 3 },
            { error: "并列句动词时态不一致", detail: "Yesterday I went to the zoo and see animals（×）→ went and saw（√）", star: 3 },
            { error: "助动词 did 后动词变形", detail: "Did you went?（×）→ Did you go?（√）", star: 3 }
          ]
        },
        {
          num: 3,
          title: "Future Plans",
          topic: "一般将来时综合运用（will / be going to）",
          vocab: [
            { word: "plan", cn: "计划", star: 3 },
            { word: "will / won't", cn: "将/将不", star: 3 },
            { word: "be going to", cn: "打算；将要", star: 3 },
            { word: "tomorrow / next week / next year", cn: "明天/下周/明年", star: 3 },
            { word: "in the future", cn: "将来", star: 3 },
            { word: "soon", cn: "很快；不久", star: 2 },
            { word: "want to be", cn: "想成为", star: 3 }
          ],
          sentences: [
            { en: "I will be a doctor when I grow up.", cn: "我长大后要当医生。", star: 3 },
            { en: "What are you going to do this summer? — I'm going to learn English.", cn: "你今年夏天打算做什么？— 我要学英语。", star: 3 },
            { en: "Will you go to the party? — Yes, I will. / No, I won't.", cn: "你会去参加派对吗？— 是的。/ 不会。", star: 3 },
            { en: "She won't come to school tomorrow.", cn: "她明天不会来学校。", star: 2 }
          ],
          grammar: [
            { point: "will / won't + 动词原形", detail: "I will go. / She won't come. 否定直接在 will 后加 not（won't）", star: 3 },
            { point: "will vs be going to 区别", detail: "will 表临时决定、预测；be going to 表已有计划、打算；多数情况可互换", star: 3 },
            { point: "时间状语从句（when 引导）", detail: "I will be a doctor when I grow up. 主将从现（主句将来时，从句现在时）", star: 3 }
          ],
          phonetics: [
            { rule: "字母组合 ll 在词中发音 /l/", examples: "will, hill, fall, call", star: 2 }
          ],
          difficulties: [
            { error: "will 后加 to", detail: "I will to go（×）→ I will go（√）；will 后直接接动词原形", star: 3 },
            { error: "be going to 后加 -ing", detail: "I am going to learning（×）→ I am going to learn（√）", star: 3 },
            { error: "主将从现混淆", detail: "When I will grow up, I will be a doctor（×）→ When I grow up, I will be a doctor（√）", star: 3 },
            { error: "won't / don't 混淆", detail: "He won't come tomorrow（将来）；He doesn't come today（现在）", star: 3 }
          ]
        },
        {
          num: 4,
          title: "Four Tenses Review",
          topic: "四大时态对比复习",
          vocab: [
            { word: "always / usually / often / sometimes / never", cn: "频度副词（一般现在时标志）", star: 3 },
            { word: "now / look / listen", cn: "现在进行时标志", star: 3 },
            { word: "yesterday / last / ago", cn: "一般过去时标志", star: 3 },
            { word: "tomorrow / next / soon", cn: "一般将来时标志", star: 3 }
          ],
          sentences: [
            { en: "I play football every day. (一般现在时)", cn: "我每天踢足球。", star: 3 },
            { en: "I am playing football now. (现在进行时)", cn: "我现在正在踢足球。", star: 3 },
            { en: "I played football yesterday. (一般过去时)", cn: "我昨天踢足球了。", star: 3 },
            { en: "I will play football tomorrow. (一般将来时)", cn: "我明天要踢足球。", star: 3 }
          ],
          grammar: [
            { point: "一般现在时（习惯/客观真理）", detail: "主语 + 动词原形/三单形式；标志词：always, usually, often, sometimes, every day, on Sundays", star: 3 },
            { point: "现在进行时（正在做）", detail: "主语 + am/is/are + 动词-ing；标志词：now, look, listen, at the moment", star: 3 },
            { point: "一般过去时（已发生）", detail: "主语 + 动词过去式；标志词：yesterday, last week, ...ago, in 2020", star: 3 },
            { point: "一般将来时（将发生）", detail: "主语 + will + 动词原形 / am/is/are going to + 动词原形；标志词：tomorrow, next..., soon", star: 3 }
          ],
          phonetics: [
            { rule: "时态综合复习，无新语音点", examples: "复习前5册所有语音规则", star: 2 }
          ],
          difficulties: [
            { error: "时态判断错（看时间标志词）", detail: "看到 yesterday 用过去时；看到 tomorrow 用将来时；看到 now 用进行时", star: 3 },
            { error: "三单动词忘加 s", detail: "He play football every day（×）→ He plays football every day（√）", star: 3 },
            { error: "进行时漏 be 动词", detail: "I playing now（×）→ I am playing now（√）", star: 3 },
            { error: "动词过去式不规则不熟", detail: "go→goed（×）→ go→went（√）；see→seed（×）→ see→saw（√）", star: 3 }
          ]
        },
        {
          num: 5,
          title: "Reading & Writing Practice",
          topic: "阅读理解 + 写作训练",
          vocab: [
            { word: "first / next / then / finally", cn: "顺序词", star: 3 },
            { word: "because / so / but / and", cn: "连接词", star: 3 },
            { word: "after that", cn: "之后", star: 2 },
            { word: "in a word", cn: "总之", star: 3 }
          ],
          sentences: [
            { en: "First, I get up. Then I have breakfast. After that, I go to school. Finally, I have classes.", cn: "首先我起床，然后吃早饭，之后去上学，最后上课。", star: 3 },
            { en: "I like spring because it's warm.", cn: "我喜欢春天因为很温暖。", star: 3 },
            { en: "I went to the park, but it rained.", cn: "我去了公园，但下雨了。", star: 3 }
          ],
          grammar: [
            { point: "顺序词组织段落", detail: "first, next, then, finally 让叙述更有条理", star: 3 },
            { point: "because 表原因", detail: "because + 句子；so 表结果；because 和 so 不能同时用", star: 3 },
            { point: "but 表转折", detail: "I went out, but it rained. 我出去了，但下雨了", star: 3 }
          ],
          phonetics: [
            { rule: "无新语音点", examples: "综合复习", star: 1 }
          ],
          difficulties: [
            { error: "because 和 so 连用", detail: "Because it rained, so I stayed at home（×）→ Because it rained, I stayed at home（√）", star: 3 },
            { error: "but 和 and 混淆", detail: "I went to the park, and it rained（×，无转折）→ I went to the park, but it rained（√）", star: 3 },
            { error: "段落顺序混乱", detail: "写作时用 first/next/then/finally 顺序词让文章更连贯", star: 3 }
          ]
        },
        {
          num: 6,
          title: "General Revision & Transition to Junior High",
          topic: "小学总复习 + 小升初衔接",
          vocab: [
            { word: "小学阶段所有核心词汇", cn: "约 800 词", star: 3 },
            { word: "不规则动词表（小学核心 40 个）", cn: "AAA/AAB/ABA/ABB/ABC 五类", star: 3 },
            { word: "高频短语（go to school, have breakfast, take a walk 等）", cn: "约 100 个高频短语", star: 3 }
          ],
          sentences: [
            { en: "复习所有 6 个年级的核心句型", cn: "句型综合复习", star: 3 },
            { en: "I am a student. I am from China. I'm 12 years old.", cn: "自我介绍综合", star: 3 },
            { en: "I get up at 6:30, then I have breakfast, and I go to school by bike.", cn: "日常作息描述", star: 3 }
          ],
          grammar: [
            { point: "四大时态综合对比", detail: "一般现在时 / 现在进行时 / 一般过去时 / 一般将来时；时态判断看时间标志词", star: 3 },
            { point: "情态动词综合", detail: "can / should / shouldn't / must / mustn't / may；后接动词原形", star: 3 },
            { point: "句型转换", detail: "肯定→否定→一般疑问→特殊疑问；4 种句式灵活转换", star: 3 },
            { point: "小升初衔接重点", detail: "时态综合运用、短文阅读理解、5-8 句小作文、基础语法（a/an、名词所有格、There be 等）", star: 3 }
          ],
          phonetics: [
            { rule: "小学阶段全部语音知识复习", examples: "字母发音规则、字母组合发音、自然拼读", star: 2 }
          ],
          difficulties: [
            { error: "时态判断混淆", detail: "时间标志词判断错；动词变化（三单、过去式、过去分词）不熟", star: 3 },
            { error: "阅读理解抓不住主旨", detail: "训练找关键词、概括段落大意的能力", star: 3 },
            { error: "小作文格式不规范", detail: "句子首字母大写、句末标点、连接词使用、段落顺序", star: 3 },
            { error: "句型转换不熟练", detail: "练习肯定→否定→疑问→特殊疑问的完整转换", star: 3 }
          ]
        }
      ]
    }
  ],

  // ============================================================
  //  视角 B：按知识点纵贯
  // ============================================================
  byCategory: {
    vocabulary: [
      { category: "国家与城市", grades: "4上U1, 5上U1", items: ["China, America, England, Canada", "the UK, the USA, Australia", "city, country, famous"] },
      { category: "数字与时间", grades: "4上U2, 4下U5", items: ["one-twenty 基础数字", "thirteen-nineteen -teen 后缀", "first, second, third 序数词", "January-December 月份", "Monday-Sunday 星期"] },
      { category: "水果与蔬菜", grades: "4上U3", items: ["apple, banana, orange, pear, watermelon", "pineapple, lemon, kiwi fruit", "potato, tomato, carrot, cucumber, eggplant, green pepper"] },
      { category: "服装与购物", grades: "4上U5, 5下U2", items: ["cap, hat, T-shirt, dress, jacket, sweater, skirt, shirt", "shorts, jeans, socks, shoes（成对复数）", "toy train, toy plane, doll, ball, kite, bike", "cheap, expensive, pretty, nice"] },
      { category: "天气与季节", grades: "4上U4, 6上U4", items: ["sunny, cloudy, windy, rainy, snowy（n.+y→adj.）", "warm, hot, cool, cold", "spring, summer, autumn, winter"] },
      { category: "交通工具", grades: "4下U1, 6上U1", items: ["bike, bus, car, taxi, ship, boat, plane, train, subway", "by + 交通工具（不加 a/an）", "take a + 交通工具"] },
      { category: "学科与课外活动", grades: "4下U2, 4下U3", items: ["Chinese, Maths, English, Music, Art, PE, Science, Computer Studies", "play football, play basketball, play ping-pong", "draw pictures, sing songs, read books, run, jump"] },
      { category: "学校场所", grades: "5下U1", items: ["classroom, library, playground, office, gym, lab", "computer room, art room, music room", "floor, first/second/third"] },
      { category: "职业", grades: "4上U1, 5上U2", items: ["teacher, farmer, postman, doctor, nurse, driver", "writer, singer, dancer, worker, actor, actress, policeman, policewoman, reporter", "pilot, artist, journalist, dentist"] },
      { category: "工作场所", grades: "5上U3", items: ["school, hospital, farm, factory, office, airport, bank, restaurant, supermarket, cinema"] },
      { category: "家居与房间", grades: "5上U5", items: ["house, room, bedroom, living room, kitchen, bathroom", "sofa, table, floor", "tidy, clean, dirty"] },
      { category: "规则与祈使", grades: "5下U3", items: ["rule, school rules, class rules", "keep quiet, listen to, turn off, be late, on time", "obey, must, mustn't"] },
      { category: "疾病与健康", grades: "5下U4", items: ["have a headache/fever/cold/cough/toothache/stomachache", "feel tired, have a rest, drink more water, take medicine, feel better"] },
      { category: "运动与比赛", grades: "5下U6", items: ["play football/volleyball/basketball/badminton/tennis/ping-pong/baseball", "do the high jump, do the long jump", "watch the games, cheer, win, excited, loudly"] },
      { category: "情绪与品质", grades: "6上U2, 6上U6", items: ["happy, sad, angry, excited, tired, bored, nervous, proud", "brave, clever, kind, strong, great, famous", "feel, look, sound"] },
      { category: "节日与庆典", grades: "4下U5, 6上U5", items: ["New Year's Day, Spring Festival, Tree Planting Day, Children's Day, Teachers' Day, National Day, Christmas", "Dragon Boat Festival, Mid-Autumn Festival, Thanksgiving Day", "celebrate, have a party, eat dumplings/moon cakes, give presents, watch fireworks"] },
      { category: "英雄与历史", grades: "6上U6", items: ["hero, heroine, brave, save, fight, die for, learn from"] }
    ],

    sentences: [
      { category: "问候与介绍", grades: "3-6 综合", items: ["Nice to meet you. — Nice to meet you, too.", "This is my new friend.", "Where are you from? — I'm from China.", "Welcome to our school/class!"] },
      { category: "询问信息（特殊疑问）", grades: "4-6 综合", items: ["What's your name? — My name is...", "What's your number? — I'm number fourteen.", "What's this/that? — It's a pineapple.", "How's the weather today? — It's sunny.", "What subjects do you like? — I like English and Music.", "What do you do after school? — I often play football.", "What does your father do? — He's a teacher.", "Where do you work? — I work in a school.", "Whose bedroom is this? — It's Lily's.", "How much is it? — It's ten yuan.", "How do you go to school? — By bike.", "When is Children's Day? — It's on June 1st.", "Where is the bookstore? — It's near the zoo.", "How can I get to the hospital? — Turn left and go straight.", "What's wrong with you? — I have a headache.", "What are you doing? — I'm cleaning my room.", "What did you do yesterday? — I went to the park.", "What are you going to do tomorrow? — I'm going to travel.", "What's your hobby? — My hobby is reading.", "What's spring like? — It's warm.", "How do you feel? — I feel happy.", "Who is your hero? — My hero is..."] },
      { category: "一般疑问句", grades: "4-6 综合", items: ["Do you like bananas? — Yes, I do. / No, I don't.", "Can you swim? — Yes, I can. / No, I can't.", "May I try the shoes on? — Certainly.", "Shall we go to the zoo? — OK.", "Is this your schoolbag? — No, it isn't. It's his.", "Are you watching the games? — Yes, we are.", "Did you have a good time? — Yes, I did.", "Will you go to the party? — Yes, I will."] },
      { category: "祈使句", grades: "4-6 综合", items: ["Put your books in the box.", "Don't put your toys on the desk.", "Keep quiet!", "Turn off the light!", "Turn left and go straight.", "Be yourself!", "Don't be shy!"] },
      { category: "There be 句型", grades: "5上U5", items: ["There is a sofa in the living room.", "There are two bedrooms in my house."] },
      { category: "提建议", grades: "4-6 综合", items: ["Shall we go to the zoo? — OK.", "Let's play ping-pong together. — Great!", "You should have a rest.", "You shouldn't read in bed."] }
    ],

    grammar: [
      { category: "be 动词用法", grades: "3-6 全程", detail: "I am / you are / he,she,it is / we,they are；过去时：was/were", star: 3 },
      { category: "一般现在时（第三人称单数）", grades: "4上-6下 全程", detail: "主语是 he/she/it/单数名词，动词 + s/es；do→does, go→goes, study→studies, watch→watches, fly→flies", star: 3 },
      { category: "现在进行时", grades: "5下U5-U6", detail: "be (am/is/are) + 动词-ing；表正在做的动作；动词 ing 变化规则：直接加 / 去e加 / 双写加", star: 3 },
      { category: "一般过去时（be动词）", grades: "6下U1", detail: "was/were + 其他；I/he/she/it 用 was；we/you/they 用 were", star: 3 },
      { category: "一般过去时（实义动词）", grades: "6下U1-U2", detail: "动词过去式 + 其他；规则变化加 -ed；不规则变化（go-went, do-did, have-had, see-saw, take-took, make-made 等）", star: 3 },
      { category: "一般将来时", grades: "6上U1, 6下U3", detail: "will + 动词原形；am/is/are + going to + 动词原形；表将来发生的动作", star: 3 },
      { category: "情态动词", grades: "4上-6下 全程", detail: "can (能) / should (应该) / shouldn't (不应该) / must (必须) / mustn't (禁止) / may (可以)；均后接动词原形", star: 3 },
      { category: "名词所有格", grades: "4下U5, 5上U2, 5上U5", detail: "'s 表\"...的\"：Lily's mother, your father's job；以 s 结尾的复数加 '：teachers' room", star: 3 },
      { category: "There be 句型", grades: "5上U5", detail: "There is + 单数名词/不可数名词；There are + 复数名词；就近原则", star: 3 },
      { category: "祈使句", grades: "4下U6, 5上U4, 5下U3", detail: "动词原形开头，主语 you 省略；否定用 Don't + 动词原形；Be + adj / Don't be + adj", star: 3 },
      { category: "a / an / the 用法", grades: "4上-6下 全程", detail: "a 用于辅音开头（a teacher）；an 用于元音开头（an orange）；the 用于特指（play the piano）", star: 3 },
      { category: "名词复数", grades: "4上-6下 全程", detail: "规则：+s / +es（s,x,ch,sh 后）；以 o 结尾加 es（potato→potatoes）；辅音+y 变 ies；不规则：man→men, child→children, foot→feet, tooth→teeth, mouse→mice", star: 3 },
      { category: "介词 in/on/at", grades: "4下U4-5, 5下U1", detail: "in + 月/年/季节；on + 星期/日期；at + 时刻/节日；in + 大地点；on + 楼层；at + 小地点", star: 3 },
      { category: "频度副词", grades: "4下U3-4, 6上U1", detail: "always > usually > often > sometimes > never；位置：be 动词后，实义动词前", star: 3 }
    ],

    phonetics: [
      { category: "字母发音（基础）", grades: "4上", items: ["b /b/: boy, book, big", "p /p/: pen, paint, pig", "c /k/: cat, cake, car", "t /t/: tall, ten, time", "d /d/: day, dog, do", "l /l/: long, look, like", "m /m/: morning, mum", "n /n/: nose, name, nine", "h /h/: happy, hot, have"] },
      { category: "字母组合（中阶）", grades: "4下-5上", items: ["sh /ʃ/: ship, shirt, shoes", "ch /tʃ/: chair, watch, Chinese", "th /θ/ 或 /ð/: thin, both, this, that", "ay /eɪ/: day, play, say", "y 在词尾 /i/: sunny, cloudy, happy", "ee /iː/: see, tree, green", "ea /iː/ 或 /e/: beach, bread", "oo /uː/ 或 /ʊ/: room, book", "ar /ɑː/: car, park, party", "or /ɔː/: work, world, doctor", "ir /ɜː/: first, third, bird", "tr /tr/: train, tree, try", "str /str/: straight, street, strong"] },
      { category: "字母组合（高阶）", grades: "5下-6下", items: ["ould /ʊd/: should, would, could", "qu /kw/: quiet, queen, question", "ing /ɪŋ/: cleaning, washing, writing", "er /ə/: teacher, worker, driver", "or /ə/: doctor, actor, sailor", "ed /t/ /d/ /ɪd/: watched, played, wanted", "ou /aʊ/: out, about, house", "ow /aʊ/ 或 /əʊ/: how, now, show, know", "gh 不发音: fight, right, light, high", "ck /k/: jacket, clock, black"] }
    ],

    difficulties: [
      { category: "时态判断错误", grades: "6年级最易错", detail: "时间标志词判断错；yesterday→过去时；tomorrow→将来时；now→进行时；often/every→一般现在时", star: 3 },
      { category: "动词变化不熟", grades: "4-6 全程", detail: "三单忘加 s；过去式不规则不熟（go-went, see-saw, take-took）；现在分词双写规则不熟（run-running, swim-swimming）", star: 3 },
      { category: "a/an/the 混淆", grades: "4-6 全程", detail: "an orange（元音开头用 an）；a teacher（辅音开头用 a）；play the piano（乐器加 the）；play football（球类不加 the）", star: 3 },
      { category: "介词选择错", grades: "4-6 全程", detail: "in/on/at 时间介词；in/on/at 地点介词；by + 交通工具不加 a/an", star: 3 },
      { category: "be 动词漏写", grades: "5-6 年级", detail: "I from China（×）→ I am from China；I cleaning my room（×）→ I am cleaning my room", star: 3 },
      { category: "主谓一致错", grades: "4-6 全程", detail: "He have a book（×）→ He has a book；The shorts is new（×）→ The shorts are new；There is two sofas（×）→ There are two sofas", star: 3 },
      { category: "拼写混淆", grades: "5-6 年级", detail: "song/sung；sand/sent；quiet/quietly；cheap/cheep；famous/famouse", star: 3 },
      { category: "句型转换不熟", grades: "6年级", detail: "肯定→否定→一般疑问→特殊疑问的完整转换；助动词 do/does/did 后接动词原形", star: 3 }
    ]
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = TEXTBOOK_DATA;
}
