// 小学 4-6 年级 36 单元配套习题数据
// 每单元 5 题（3 选择 + 2 填空），共 180 题
// 配套「天津武清区小学英语4-6年级知识点调研」使用

export const EXERCISES: any = {
  meta: {
    title: "小学 4-6 年级 36 单元配套习题集",
    coverage: "人教精通版 4上→6下 共 6 册 36 单元",
    structure: "每单元 5 题：3 选择 + 2 填空",
    note: "习题基于课本知识点设计，含答案与解析"
  },

  grades: [
    // ============================================================
    //  四年级上册
    // ============================================================
    {
      id: "g4up",
      name: "四年级上册",
      units: [
        {
          num: 1,
          title: "This is my new friend",
          topic: "国家、朋友、基础职业",
          questions: [
            { type: "选择", stem: "— Where are you from? — I'm from _____.", options: ["China", "chinese", "china", "Chinese"], answer: "A", analysis: "国家名首字母必须大写：China（√）；Chinese 是中文/中国人。" },
            { type: "选择", stem: "— What _____ your father do? — He's a teacher.", options: ["do", "does", "is", "are"], answer: "B", analysis: "主语 your father 是第三人称单数，疑问句助动词用 does。" },
            { type: "选择", stem: "My mother is _____ nurse.", options: ["a", "an", "the", "/"], answer: "A", analysis: "nurse 以辅音音素开头，用 a；an 用于元音开头（如 an apple）。" },
            { type: "填空", before: "Tom is from America. He is my new ", after: " (朋友).", answer: "friend", analysis: "friend 朋友，注意拼写不是 freind。" },
            { type: "填空", before: "— What does your mother do? — She is a ", after: " (医生).", answer: "doctor", analysis: "doctor 医生，注意 or 后缀，不写 er。" }
          ]
        },
        {
          num: 2,
          title: "What's your number?",
          topic: "数字 1-20、班级、年级",
          questions: [
            { type: "选择", stem: "— Which class are you in? — I'm in Class _____, Grade Four.", options: ["one", "One", "first", "First"], answer: "B", analysis: "Class One 首字母必须大写，且用基数词不是序数词。" },
            { type: "选择", stem: "Three and five is _____.", options: ["seven", "eight", "nine", "ten"], answer: "B", analysis: "3+5=8，eight 拼写注意 e-i-g-h-t。" },
            { type: "选择", stem: "— What's the time? — It's _____ .", options: ["seven twenty", "seven twenty o'clock", "twenty seven", "seven and twenty"], answer: "A", analysis: "时间读法：先小时后分钟，直接读数字，不加 o'clock。" },
            { type: "填空", before: "What's your n", after: "? — I'm number fourteen.", answer: "number", analysis: "number 数字/编号，注意首字母大写完整形式。" },
            { type: "填空", before: "Thirteen and seven is t", after: " (20).", answer: "twenty", analysis: "13+7=20，twenty 拼写注意 tw-en-ty。" }
          ]
        },
        {
          num: 3,
          title: "It's a pineapple",
          topic: "水果、蔬菜、a/an 用法",
          questions: [
            { type: "选择", stem: "— What's this? — It's _____ orange.", options: ["a", "an", "the", "/"], answer: "B", analysis: "orange 元音音素开头，用 an；apple/eggplant 也是 an。" },
            { type: "选择", stem: "— Do you like _____? — Yes, I do.", options: ["banana", "bananas", "a banana", "the banana"], answer: "B", analysis: "like 后接可数名词复数，泛指一类事物用复数 bananas。" },
            { type: "选择", stem: "— What's this _____ English? — It's a tomato.", options: ["on", "in", "at", "by"], answer: "B", analysis: "in English 用英语说，固定搭配。" },
            { type: "填空", before: "Carrots and tomatoes are v", after: " (蔬菜).", answer: "vegetables", analysis: "vegetable 蔬菜，复数加 s，注意拼写 ve-ge-ta-ble。" },
            { type: "填空", before: "P", after: " are yellow and sweet. Monkeys like them. (梨)", answer: "Pears", analysis: "pear 梨，注意首字母大写复数加 s，与 pair（一双）区分。" }
          ]
        },
        {
          num: 4,
          title: "How's the weather today?",
          topic: "天气形容词",
          questions: [
            { type: "选择", stem: "— How's the weather today? — It's _____.", options: ["sun", "sunny", "suns", "sunning"], answer: "B", analysis: "天气问句答语用形容词：sunny/cloudy/windy/rainy。" },
            { type: "选择", stem: "It's _____ today. Put on your raincoat.", options: ["rain", "rains", "rainy", "rainning"], answer: "C", analysis: "rainy 是形容词，描述天气；rain 是名词/动词。" },
            { type: "选择", stem: "It's _____ today. Shall we go to the zoo?", options: ["cool", "cools", "cooly", "cooling"], answer: "A", analysis: "描述天气用形容词原形 cool，不用副词。" },
            { type: "填空", before: "It's w", after: " in spring. Trees have new green leaves. (温暖的)", answer: "warm", analysis: "warm 温暖的，注意 w-ar-m 不是 worm（虫子）。" },
            { type: "填空", before: "Today is cloudy and w", after: " (刮风的).", answer: "windy", analysis: "wind + y = windy 刮风的，注意 y 前是辅音字母直接加 y。" }
          ]
        },
        {
          num: 5,
          title: "I like those shoes",
          topic: "服装、购物用语",
          questions: [
            { type: "选择", stem: "— Can I help you? — Please _____ me that jacket.", options: ["show", "see", "look", "watch"], answer: "A", analysis: "show 给...看；see 看见；look 看；watch 观看。" },
            { type: "选择", stem: "— May I try the shoes _____? — Certainly.", options: ["on", "in", "at", "to"], answer: "A", analysis: "try on 试穿；代词放中间：try it on，不能说 try on it。" },
            { type: "选择", stem: "— Where _____ my shorts? — Here they are.", options: ["is", "are", "am", "be"], answer: "B", analysis: "shorts 复数名词作主语，be 动词用 are。" },
            { type: "填空", before: "These j", after: " are too long. I need short ones. (牛仔裤)", answer: "jeans", analysis: "jeans 牛仔裤，复数名词，与 short pants 都是成对出现的服装。" },
            { type: "填空", before: "It's cold. Put on your s", after: " (毛衣).", answer: "sweater", analysis: "sweater 毛衣，注意 sw-ea-ter 拼写，ea 发 /iː/。" }
          ]
        },
        {
          num: 6,
          title: "I'm tall",
          topic: "形容词、外貌描述",
          questions: [
            { type: "选择", stem: "Look at the elephant. It _____ big ears.", options: ["have", "has", "is", "are"], answer: "B", analysis: "主语 it 是第三人称单数，have 变 has。" },
            { type: "选择", stem: "I'm _____. You're short.", options: ["tall", "long", "big", "small"], answer: "A", analysis: "tall 表身高，long 表长度，注意区分。" },
            { type: "选择", stem: "A rabbit has long ears and a short _____.", options: ["leg", "tail", "neck", "arm"], answer: "B", analysis: "tail 尾巴；兔子有短尾巴，符合常识。" },
            { type: "填空", before: "Look! Tom is t", after: " and strong. (高的、强壮的)", answer: "tall", analysis: "tall 高的，注意与 tall（高）反义是 short（矮）。" },
            { type: "填空", before: "Twins look the same. B", after: " of them are tall. (两者都)", answer: "Both", analysis: "both 两者都；Both A and B 句型，注意首字母大写。" }
          ]
        }
      ]
    },

    // ============================================================
    //  四年级下册
    // ============================================================
    {
      id: "g4down",
      name: "四年级下册",
      units: [
        {
          num: 1,
          title: "Transport",
          topic: "交通工具、出行方式",
          questions: [
            { type: "选择", stem: "— How do you go to school? — I go to school _____ bike.", options: ["on", "in", "by", "with"], answer: "C", analysis: "by + 交通工具不加冠词：by bike/bus/plane。" },
            { type: "选择", stem: "She _____ to the park by car.", options: ["go", "goes", "going", "gone"], answer: "B", analysis: "主语 she 是第三人称单数，动词加 es：go→goes。" },
            { type: "选择", stem: "I often take a _____ to the zoo.", options: ["bus", "bike", "car", "plane"], answer: "A", analysis: "take a + 交通工具需加 a；by + 交通工具不加。" },
            { type: "填空", before: "It's far. Let's go there by t", after: " (火车).", answer: "train", analysis: "train 火车，注意 tr-ai-n 拼写。" },
            { type: "填空", before: "We go to school by s", after: " every day. (地铁)", answer: "subway", analysis: "subway 地铁，美式英语；英式用 underground 或 tube。" }
          ]
        },
        {
          num: 2,
          title: "School subjects",
          topic: "学科、喜好表达",
          questions: [
            { type: "选择", stem: "— What subjects do you like? — I like _____ and Music.", options: ["English", "english", "the English", "an English"], answer: "A", analysis: "学科名首字母大写，前面不加冠词。" },
            { type: "选择", stem: "— What subject do you like _____? — I like PE best.", options: ["good", "well", "better", "best"], answer: "D", analysis: "like...best 最喜欢；best 是 well 的最高级。" },
            { type: "选择", stem: "Maths is _____ but interesting.", options: ["easy", "difficult", "long", "short"], answer: "B", analysis: "difficult 困难的；与 interesting 转折，应为不易但有趣。" },
            { type: "填空", before: "We have six l", after: " today. (课)", answer: "lessons", analysis: "lesson 课，复数加 s；have a lesson 上课。" },
            { type: "填空", before: "I like PE best. It's i", after: " (有趣的).", answer: "interesting", analysis: "interesting 有趣的；修饰物，修饰人用 interested。" }
          ]
        },
        {
          num: 3,
          title: "After-school activities",
          topic: "课外活动、like+doing",
          questions: [
            { type: "选择", stem: "I like _____ pictures after school.", options: ["draw", "drawing", "draws", "drew"], answer: "B", analysis: "like + doing 喜欢做某事，draw→drawing。" },
            { type: "选择", stem: "— What do you do after school? — I often _____ football.", options: ["play", "plays", "playing", "played"], answer: "A", analysis: "助动词 do 后接动词原形 play；play + 球类不加 the。" },
            { type: "选择", stem: "She _____ plays the piano.", options: ["some times", "sometimes", "sometime", "some time"], answer: "B", analysis: "sometimes 有时候，频度副词，一个词；sometime 某时候。" },
            { type: "填空", before: "Do you like s", after: " songs after school? (唱)", answer: "singing", analysis: "like + doing：sing→singing；sing songs 唱歌。" },
            { type: "填空", before: "They like r", after: " in the playground. (跑)", answer: "running", analysis: "run→running 双写 n 加 ing；in the playground 在操场上。" }
          ]
        },
        {
          num: 4,
          title: "Weekend activities",
          topic: "周末活动、第三人称单数特殊变形",
          questions: [
            { type: "选择", stem: "— What does your father do on weekends? — He usually _____ housework.", options: ["do", "does", "doing", "did"], answer: "B", analysis: "主语 he 三单，do→does；does 既是助动词又是实义动词。" },
            { type: "选择", stem: "She often _____ swimming on Saturdays.", options: ["go", "goes", "going", "went"], answer: "B", analysis: "主语 she 三单，go→goes（o 结尾加 es）。" },
            { type: "选择", stem: "— What do you do on weekends? — I usually visit my grandparents _____ Sundays.", options: ["in", "on", "at", "by"], answer: "B", analysis: "on + 星期：on Sundays/on Sunday。" },
            { type: "填空", before: "What d", after: " your mother do on weekends? (助动词)", answer: "does", analysis: "主语 mother 三单，疑问句助动词用 does。" },
            { type: "填空", before: "We fly kites t", after: " on weekends. (一起)", answer: "together", analysis: "together 一起，注意 to-get-her 拼写。" }
          ]
        },
        {
          num: 5,
          title: "Special days",
          topic: "中外节日、序数词、日期",
          questions: [
            { type: "选择", stem: "— When is Children's Day? — It's _____ June 1st.", options: ["in", "on", "at", "by"], answer: "B", analysis: "on + 具体日期：on June 1st；in + 月份：in June。" },
            { type: "选择", stem: "New Year's Day is in _____.", options: ["January", "February", "March", "April"], answer: "A", analysis: "元旦是1月1日，在 January 一月。" },
            { type: "选择", stem: "— When is Teachers' Day? — It's on September _____.", options: ["one", "first", "ten", "tenth"], answer: "D", analysis: "教师节是9月10日；10 的序数词 tenth。" },
            { type: "填空", before: "We eat d", after: " at Spring Festival. (饺子)", answer: "dumplings", analysis: "dumpling 饺子，复数加 s；at Spring Festival 春节期间。" },
            { type: "填空", before: "When is N", after: " Day? (国庆节)", answer: "National", analysis: "National Day 国庆节，注意 N 首字母大写。" }
          ]
        },
        {
          num: 6,
          title: "Asking for directions",
          topic: "问路、方位介词、祈使句",
          questions: [
            { type: "选择", stem: "— Excuse me, where is the bookstore? — It's _____ the zoo.", options: ["next", "near", "in", "on"], answer: "B", analysis: "near 在附近；next 要加 to：next to。" },
            { type: "选择", stem: "— How can I get to the hospital? — _____ left and go straight.", options: ["Turn", "Go", "Walk", "Run"], answer: "A", analysis: "Turn left 左转，祈使句动词原形开头。" },
            { type: "选择", stem: "The park is _____ to the post office.", options: ["near", "next", "in front", "behind"], answer: "B", analysis: "next to 紧邻，固定搭配，next 后必须有 to。" },
            { type: "填空", before: "Excuse me, w", after: " is the zoo? (哪里)", answer: "where", analysis: "where 哪里，疑问副词，问地点。" },
            { type: "填空", before: "Turn right and go s", after: " . (直走)", answer: "straight", analysis: "straight 直地，注意 str-aight 拼写，go straight 直走。" }
          ]
        }
      ]
    },

    // ============================================================
    //  五年级上册
    // ============================================================
    {
      id: "g5up",
      name: "五年级上册",
      units: [
        {
          num: 1,
          title: "Around the world",
          topic: "国家与城市、be from",
          questions: [
            { type: "选择", stem: "— Where are you from? — I'm from _____.", options: ["the USA", "USA", "us", "U.S.A"], answer: "A", analysis: "the USA 必须加 the；us 是 we 的宾格，U.S.A 是缩写不常用。" },
            { type: "选择", stem: "— Where is he from? — He _____ from Australia.", options: ["am", "is", "are", "be"], answer: "B", analysis: "主语 he 三单，be 动词用 is。" },
            { type: "选择", stem: "This is a _____ city in the world.", options: ["famous", "famouse", "fame", "famously"], answer: "A", analysis: "famous 著名的，形容词；拼写不是 famouse。" },
            { type: "填空", before: "Sydney Opera House is in A", after: " . (澳大利亚)", answer: "Australia", analysis: "Australia 澳大利亚，注意 Au-stra-lia 拼写。" },
            { type: "填空", before: "Tower Bridge is a famous landmark in the U", after: " . (英国)", answer: "UK", analysis: "the UK 英国，必须加 the；缩写大写。" }
          ]
        },
        {
          num: 2,
          title: "Jobs",
          topic: "职业、What's sb's job、want to be",
          questions: [
            { type: "选择", stem: "— What's your father's _____? — He is a doctor.", options: ["work", "job", "do", "name"], answer: "B", analysis: "job 工作；What's sb's job? 询问职业。" },
            { type: "选择", stem: "He is _____ actor.", options: ["a", "an", "the", "/"], answer: "B", analysis: "actor 元音音素开头，用 an；与 a teacher 区分。" },
            { type: "选择", stem: "— What do you want to _____? — I want to be a pilot.", options: ["do", "be", "have", "go"], answer: "B", analysis: "want to be 想成为...；be 是 be 动词原形。" },
            { type: "填空", before: "My father is a w", after: " . He writes stories. (作家)", answer: "writer", analysis: "writer 作家，注意 wr- 不发音 w；write→writer。" },
            { type: "填空", before: "Lily's mother is a teacher. This is L", after: " classroom. (莉莉的)", answer: "Lily's", analysis: "名词所有格 's；Lily's 莉莉的，注意大写 L。" }
          ]
        },
        {
          num: 3,
          title: "Workplaces",
          topic: "工作场所、Where does...work、一般现在时三单",
          questions: [
            { type: "选择", stem: "— Where does your mother work? — She _____ in a hospital.", options: ["work", "works", "working", "worked"], answer: "B", analysis: "主语 she 三单，动词加 s：work→works。" },
            { type: "选择", stem: "My father works _____ a big factory.", options: ["on", "in", "at", "by"], answer: "B", analysis: "in a factory 在工厂里，in 表示在内部。" },
            { type: "选择", stem: "— Where _____ you work? — I work in a school.", options: ["do", "does", "is", "are"], answer: "A", analysis: "主语 you 复数，助动词用 do；does 用于三单主语。" },
            { type: "填空", before: "She works in an o", after: " . (办公室)", answer: "office", analysis: "office 办公室，注意 of-fice 拼写，双 f。" },
            { type: "填空", before: "Pilots work at an a", after: " . (机场)", answer: "airport", analysis: "airport 机场，由 air + port 组合而成。" }
          ]
        },
        {
          num: 4,
          title: "Putting things in order",
          topic: "整理物品、祈使句、方位介词",
          questions: [
            { type: "选择", stem: "_____ your books in the box.", options: ["Put", "Puts", "Putting", "To put"], answer: "A", analysis: "祈使句动词原形开头，主语 you 省略。" },
            { type: "选择", stem: "_____ put your toys on the desk.", options: ["Not", "Don't", "Doesn't", "Isn't"], answer: "B", analysis: "否定祈使句用 Don't + 动词原形。" },
            { type: "选择", stem: "Please put things _____ order.", options: ["on", "in", "at", "to"], answer: "B", analysis: "in order 整齐，固定搭配，put...in order 整理。" },
            { type: "填空", before: "K", after: " your desk clean. (保持)", answer: "Keep", analysis: "keep 保持，祈使句动词原形；Keep + 形容词。" },
            { type: "填空", before: "Don't put the books o", after: " the desk. (在上面)", answer: "on", analysis: "on the desk 在桌上，有接触面；in the box 在盒子里。" }
          ]
        },
        {
          num: 5,
          title: "A tidy house",
          topic: "房间、There be 句型、名词所有格",
          questions: [
            { type: "选择", stem: "— Whose bedroom is this? — It's _____.", options: ["Lily", "Lilys", "Lily's", "Lilys'"], answer: "C", analysis: "名词所有格 's：Lily's 莉莉的。" },
            { type: "选择", stem: "There _____ a sofa in the living room.", options: ["is", "are", "am", "be"], answer: "A", analysis: "There is + 单数名词；There are + 复数名词。" },
            { type: "选择", stem: "— _____ bedroom is this? — It's Tom's.", options: ["Who", "Who's", "Whose", "Whos"], answer: "C", analysis: "Whose 谁的，疑问代词；Who's 是 who is 缩写。" },
            { type: "填空", before: "The room is clean and t", after: " . (整洁的)", answer: "tidy", analysis: "tidy 整洁的；clean and tidy 干净又整洁。" },
            { type: "填空", before: "Our kitchen is on the first f", after: " . (楼层)", answer: "floor", analysis: "floor 楼层；on the first floor 在一楼（用 on 不用 in）。" }
          ]
        },
        {
          num: 6,
          title: "Be yourself",
          topic: "性格描述、Be + adj、反身代词",
          questions: [
            { type: "选择", stem: "I'm active _____ clever.", options: ["and", "but", "or", "so"], answer: "A", analysis: "and 连接两个并列形容词；but 转折；or 选择。" },
            { type: "选择", stem: "_____ be shy! Be yourself!", options: ["Not", "Don't", "Doesn't", "No"], answer: "B", analysis: "否定祈使句用 Don't + be + 形容词。" },
            { type: "选择", stem: "Believe in _____.", options: ["you", "your", "yours", "yourself"], answer: "D", analysis: "believe in yourself 相信你自己，反身代词。" },
            { type: "填空", before: "Don't be s", after: " . Please speak loudly. (害羞的)", answer: "shy", analysis: "shy 害羞的；Don't be + 形容词，否定祈使句。" },
            { type: "填空", before: "We are all d", after: " . Everyone is special. (不同的)", answer: "different", analysis: "different 不同的；be + 形容词描述状态。" }
          ]
        }
      ]
    },

    // ============================================================
    //  五年级下册
    // ============================================================
    {
      id: "g5down",
      name: "五年级下册",
      units: [
        {
          num: 1,
          title: "Welcome to our school!",
          topic: "学校功能室、序数词、方位",
          questions: [
            { type: "选择", stem: "— Where is your classroom? — It's _____ the first floor.", options: ["in", "on", "at", "by"], answer: "B", analysis: "楼层用 on 不用 in：on the first/second floor。" },
            { type: "选择", stem: "— Welcome _____ our school! — Thank you.", options: ["to", "in", "at", "for"], answer: "A", analysis: "Welcome to + 地点，欢迎到...来。" },
            { type: "选择", stem: "Our library is on the _____ floor.", options: ["one", "first", "two", "second"], answer: "D", analysis: "序数词 first/second/third 表楼层，注意 the + 序数词。" },
            { type: "填空", before: "We often borrow books from the l", after: " . (图书馆)", answer: "library", analysis: "library 图书馆，注意变复数 libraries（y 变 i 加 es）。" },
            { type: "填空", before: "We have a meeting in the meeting r", after: " . (房间)", answer: "room", analysis: "meeting room 会议室；room 房间。" }
          ]
        },
        {
          num: 2,
          title: "Can I help you?",
          topic: "购物、How much、Can/May",
          questions: [
            { type: "选择", stem: "— _____ is it? — It's ten yuan.", options: ["How many", "How much", "How old", "How long"], answer: "B", analysis: "How much 问价格；How many 问数量。" },
            { type: "选择", stem: "— Can I help you? — Yes, I want _____ a toy car.", options: ["buy", "to buy", "buying", "buys"], answer: "B", analysis: "want to + 动词原形：want to buy 想买。" },
            { type: "选择", stem: "Can I try the shoes _____?", options: ["in", "on", "at", "to"], answer: "B", analysis: "try on 试穿；代词放中间：try them on。" },
            { type: "填空", before: "These trousers are too e", after: " . I can't buy them. (昂贵的)", answer: "expensive", analysis: "expensive 昂贵的，注意 ex-pen-sive 拼写。" },
            { type: "填空", before: "This dress looks p", after: " . I like it. (漂亮的)", answer: "pretty", analysis: "pretty 漂亮的；look + 形容词，看起来..." }
          ]
        },
        {
          num: 3,
          title: "We should obey the rules",
          topic: "规则、should/shouldn't、must/mustn't",
          questions: [
            { type: "选择", stem: "We _____ obey the rules at school.", options: ["should", "should to", "shoulding", "shoulded"], answer: "A", analysis: "should + 动词原形；should 后不加 to 不加 ing。" },
            { type: "选择", stem: "You _____ be late for school.", options: ["should", "shouldn't", "must", "can"], answer: "B", analysis: "shouldn't 不应该；上学不应迟到。" },
            { type: "选择", stem: "You _____ cross the street when the light is red.", options: ["must", "mustn't", "should", "can"], answer: "B", analysis: "mustn't 禁止；红灯禁止过马路。" },
            { type: "填空", before: "We should keep q", after: " in class. (安静)", answer: "quiet", analysis: "keep quiet 保持安静；quiet 是形容词。" },
            { type: "填空", before: "You must w", after: " for the green light. (等待)", answer: "wait", analysis: "wait for 等待；must + 动词原形。" }
          ]
        },
        {
          num: 4,
          title: "What's wrong with you?",
          topic: "病情、have a...、should 建议",
          questions: [
            { type: "选择", stem: "— What's wrong with you? — I have a _____.", options: ["headache", "headaches", "the headache", "a headache"], answer: "A", analysis: "have a + 疾病：have a headache 头痛。" },
            { type: "选择", stem: "He _____ a fever yesterday.", options: ["have", "has", "had", "having"], answer: "C", analysis: "主语 he 三单 + 过去时 yesterday，用 had。" },
            { type: "选择", stem: "You should _____ some medicine.", options: ["take", "eat", "drink", "have"], answer: "A", analysis: "take medicine 吃药，固定搭配，不用 eat。" },
            { type: "填空", before: "I have a t", after: " . I should see a dentist. (牙痛)", answer: "toothache", analysis: "toothache 牙痛，tooth + ache 复合词。" },
            { type: "填空", before: "You should drink more w", after: " and have a rest. (水)", answer: "water", analysis: "water 水，不可数名词，drink more water 多喝水。" }
          ]
        },
        {
          num: 5,
          title: "I'm cleaning my room",
          topic: "现在进行时、家务活动",
          questions: [
            { type: "选择", stem: "Look! I _____ my room.", options: ["clean", "cleans", "cleaning", "am cleaning"], answer: "D", analysis: "Look! 提示现在进行时：be + doing。" },
            { type: "选择", stem: "— What are you doing? — I _____ a story.", options: ["tell", "tells", "am telling", "telling"], answer: "C", analysis: "现在进行时：am/is/are + doing。" },
            { type: "选择", stem: "Dad is _____ an email now.", options: ["write", "writes", "writing", "wrote"], answer: "C", analysis: "write→writing 去 e 加 ing；is + writing。" },
            { type: "填空", before: "Mum is w", after: " the clothes now. (洗)", answer: "washing", analysis: "wash→washing 去 e 加 ing；be + washing 表正在洗。" },
            { type: "填空", before: "Look! They are p", after: " football on the playground. (踢)", answer: "playing", analysis: "play→playing 直接加 ing；Look! 提示进行时。" }
          ]
        },
        {
          num: 6,
          title: "We're watching the games",
          topic: "现在进行时拓展、运动",
          questions: [
            { type: "选择", stem: "We're _____ the football game.", options: ["watch", "watching", "watches", "watched"], answer: "B", analysis: "be + doing：are + watching。" },
            { type: "选择", stem: "The boys _____ playing basketball now.", options: ["is", "are", "am", "be"], answer: "B", analysis: "主语 boys 复数，be 动词用 are。" },
            { type: "选择", stem: "— Are they doing the high jump? — No, they _____ .", options: ["are", "aren't", "do", "don't"], answer: "B", analysis: "现在进行时疑问句用 be 动词，否定回答用 aren't。" },
            { type: "填空", before: "He is r", after: " fast. He is the champion. (跑)", answer: "running", analysis: "run→running 双写 n 加 ing；be + running。" },
            { type: "填空", before: "They are c", after: " loudly for their team. (欢呼)", answer: "cheering", analysis: "cheer→cheering 直接加 ing；cheer for 为...欢呼。" }
          ]
        }
      ]
    },

    // ============================================================
    //  六年级上册
    // ============================================================
    {
      id: "g6up",
      name: "六年级上册",
      units: [
        {
          num: 1,
          title: "Travelling",
          topic: "旅行、一般将来时 be going to",
          questions: [
            { type: "选择", stem: "I _____ visit my grandparents this weekend.", options: ["am going to", "is going to", "are going to", "going to"], answer: "A", analysis: "主语 I 用 am going to + 动词原形。" },
            { type: "选择", stem: "— What _____ you do tomorrow? — I'm going to travel.", options: ["do", "are", "are going to", "will going to"], answer: "B", analysis: "疑问句 be 动词提前：What are you going to do?" },
            { type: "选择", stem: "She will _____ to Beijing next week.", options: ["go", "goes", "going", "went"], answer: "A", analysis: "will + 动词原形，不加 to 不加 ing。" },
            { type: "填空", before: "I am g", after: " to travel to Sanya by plane. (打算)", answer: "going", analysis: "be going to + 动词原形；going to travel。" },
            { type: "填空", before: "Will you go to the p", after: " tomorrow? (派对)", answer: "party", analysis: "party 派对，复数变 y 为 i 加 es：parties。" }
          ]
        },
        {
          num: 2,
          title: "My Feelings",
          topic: "情绪表达、主系表结构",
          questions: [
            { type: "选择", stem: "I _____ happy today.", options: ["feel", "feels", "feeling", "felt"], answer: "A", analysis: "主语 I，feel + 形容词；feel 是动词原形。" },
            { type: "选择", stem: "She looks _____. What's wrong with her?", options: ["sad", "sadly", "sadden", "sadness"], answer: "A", analysis: "look + 形容词作表语；looks sad 看起来难过。" },
            { type: "选择", stem: "I am proud _____ my son.", options: ["of", "for", "with", "about"], answer: "A", analysis: "be proud of 为...自豪，固定搭配。" },
            { type: "填空", before: "The news is e", after: " . We are excited. (令人兴奋的)", answer: "exciting", analysis: "exciting 修饰事物；excited 修饰人。" },
            { type: "填空", before: "I feel t", after: " . I want to have a rest. (累的)", answer: "tired", analysis: "feel + 形容词；tired 累的，注意 ti-red 拼写。" }
          ]
        },
        {
          num: 3,
          title: "Planting and Growing",
          topic: "种植、一般现在时客观描述",
          questions: [
            { type: "选择", stem: "First, we plant the seeds _____ the soil.", options: ["on", "in", "at", "to"], answer: "B", analysis: "in the soil 在土壤里，in 表示在内部。" },
            { type: "选择", stem: "Plants _____ water and sunlight.", options: ["need", "needs", "needing", "needed"], answer: "A", analysis: "客观事实用一般现在时；主语 plants 复数动词原形。" },
            { type: "选择", stem: "We should take care _____ plants.", options: ["of", "for", "with", "to"], answer: "A", analysis: "take care of 照顾，固定搭配。" },
            { type: "填空", before: "Look at the green l", after: " on the trees. (叶子)", answer: "leaves", analysis: "leaf 复数 leaves，f 变 v 加 es。" },
            { type: "填空", before: "We should w", after: " the flowers every day. (浇水)", answer: "water", analysis: "water 既是名词又是动词；water the flowers 浇花。" }
          ]
        },
        {
          num: 4,
          title: "Seasons",
          topic: "四季、季节活动",
          questions: [
            { type: "选择", stem: "Spring is the _____ season.", options: ["one", "first", "two", "second"], answer: "B", analysis: "first 第一；the + 序数词。" },
            { type: "选择", stem: "— What's spring _____? — It's warm.", options: ["like", "likes", "look", "look like"], answer: "A", analysis: "What's...like? 询问特征；答语用形容词。" },
            { type: "选择", stem: "In winter, children make _____.", options: ["snowman", "snowmen", "a snowman", "snowmans"], answer: "B", analysis: "snowman 复数 snowmen，man→men 不规则变化。" },
            { type: "填空", before: "Children fly k", after: " in spring. (风筝)", answer: "kites", analysis: "kite 风筝，复数加 s；fly kites 放风筝。" },
            { type: "填空", before: "We have summer h", after: " in July and August. (假期)", answer: "holidays", analysis: "holiday 假期，复数加 s；summer holidays 暑假。" }
          ]
        },
        {
          num: 5,
          title: "Celebration days",
          topic: "中外节日对比",
          questions: [
            { type: "选择", stem: "Spring Festival is _____ January or February.", options: ["in", "on", "at", "by"], answer: "A", analysis: "in + 月份；at Spring Festival 在春节期间。" },
            { type: "选择", stem: "— When is Christmas? — It's _____ December 25th.", options: ["in", "on", "at", "by"], answer: "B", analysis: "on + 具体日期；Christmas Day 在12月25日。" },
            { type: "选择", stem: "Children get _____ at Christmas.", options: ["presents", "present", "a present", "the present"], answer: "A", analysis: "presents 复数泛指礼物；get presents 收礼物。" },
            { type: "填空", before: "We eat m", after: " at Mid-Autumn Festival. (月饼)", answer: "moon cakes", analysis: "moon cake 月饼，复数加 s；at Mid-Autumn Festival 中秋节期间。" },
            { type: "填空", before: "How do people c", after: " the New Year? (庆祝)", answer: "celebrate", analysis: "celebrate 庆祝，注意 ce-le-brate 拼写。" }
          ]
        },
        {
          num: 6,
          title: "Heroes",
          topic: "英雄人物、品格教育",
          questions: [
            { type: "选择", stem: "He is _____ and clever. He saved many people.", options: ["brave", "shy", "quiet", "tired"], answer: "A", analysis: "brave 勇敢的；救人需要勇气。" },
            { type: "选择", stem: "We should learn _____ heroes.", options: ["from", "of", "with", "for"], answer: "A", analysis: "learn from 向...学习，固定搭配。" },
            { type: "选择", stem: "There are many _____ in Chinese history.", options: ["hero", "heros", "heroies", "heroes"], answer: "D", analysis: "hero 复数 heroes，o 前是辅音字母加 es。" },
            { type: "填空", before: "He is a great h", after: " in our country. (英雄)", answer: "hero", analysis: "hero 英雄，注意复数 heroes 不是 heros。" },
            { type: "填空", before: "We should learn from h", after: " . (他们)", answer: "them", analysis: "learn from them 向他们学习；them 是 they 的宾格。" }
          ]
        }
      ]
    },

    // ============================================================
    //  六年级下册
    // ============================================================
    {
      id: "g6down",
      name: "六年级下册",
      units: [
        {
          num: 1,
          title: "I went to Sanya for my holiday",
          topic: "一般过去时（was/were + 规则动词过去式）",
          questions: [
            { type: "选择", stem: "I _____ to Sanya last summer.", options: ["go", "goes", "went", "going"], answer: "C", analysis: "last summer 过去时；go 过去式 went。" },
            { type: "选择", stem: "— Did you have a good time? — Yes, I _____.", options: ["do", "does", "did", "didn't"], answer: "C", analysis: "过去时疑问句用 did，肯定回答 Yes, I did。" },
            { type: "选择", stem: "She _____ at home yesterday.", options: ["is", "was", "were", "are"], answer: "B", analysis: "yesterday 过去时；主语 she 单数用 was。" },
            { type: "填空", before: "Yesterday I p", after: " football with my friends. (踢)", answer: "played", analysis: "play 过去式 played，规则加 ed。" },
            { type: "填空", before: "We w", after: " very happy last weekend. (是)", answer: "were", analysis: "主语 we 复数，过去时用 were；last weekend 是过去时间。" }
          ]
        },
        {
          num: 2,
          title: "Past Stories",
          topic: "一般过去时（不规则动词）",
          questions: [
            { type: "选择", stem: "Yesterday I _____ to the zoo and saw many animals.", options: ["go", "goes", "went", "going"], answer: "C", analysis: "yesterday 过去时；go 不规则过去式 went。" },
            { type: "选择", stem: "She _____ a new book last night.", options: ["buy", "buys", "bought", "buyed"], answer: "C", analysis: "buy 过去式 bought，不规则变化。" },
            { type: "选择", stem: "— What did you do last weekend? — I _____ football.", options: ["play", "played", "playing", "plays"], answer: "B", analysis: "did 后接动词原形还是过去式？注意：陈述句中用过去式 played。" },
            { type: "填空", before: "He t", after: " a photo of the beautiful flowers yesterday. (拍)", answer: "took", analysis: "take 过去式 took，不规则变化；take a photo 拍照。" },
            { type: "填空", before: "I s", after: " a film with my parents last night. (看)", answer: "saw", analysis: "see 过去式 saw；see a film 看电影。" }
          ]
        },
        {
          num: 3,
          title: "Future Plans",
          topic: "一般将来时综合（will / be going to）",
          questions: [
            { type: "选择", stem: "I _____ be a doctor when I grow up.", options: ["will", "am going", "won't to", "will to"], answer: "A", analysis: "will + 动词原形，不加 to。" },
            { type: "选择", stem: "— Will you go to the party? — No, I _____.", options: ["will", "won't", "don't", "doesn't"], answer: "B", analysis: "will 的否定回答用 won't。" },
            { type: "选择", stem: "What _____ you going to do this summer?", options: ["do", "are", "will", "is"], answer: "B", analysis: "be going to 疑问句把 be 动词提前：What are you going to..." },
            { type: "填空", before: "I w", after: " go to Beijing next week. (将)", answer: "will", analysis: "will + 动词原形；next week 是将来时间。" },
            { type: "填空", before: "She won't c", after: " to school tomorrow. (来)", answer: "come", analysis: "won't + 动词原形；won't = will not。" }
          ]
        },
        {
          num: 4,
          title: "Four Tenses Review",
          topic: "四大时态对比复习",
          questions: [
            { type: "选择", stem: "I play football every day. (判断时态)", options: ["一般现在时", "现在进行时", "一般过去时", "一般将来时"], answer: "A", analysis: "every day 是一般现在时标志词。" },
            { type: "选择", stem: "Look! They _____ basketball now.", options: ["play", "are playing", "played", "will play"], answer: "B", analysis: "Look! + now 提示现在进行时。" },
            { type: "选择", stem: "I _____ my homework yesterday.", options: ["do", "did", "am doing", "will do"], answer: "B", analysis: "yesterday 过去时，用 did。" },
            { type: "填空", before: "She usually g", after: " to school by bike. (去)", answer: "goes", analysis: "usually 一般现在时；主语 she 三单动词加 es。" },
            { type: "填空", before: "We will t", after: " a trip next month. (旅行)", answer: "take", analysis: "will + 动词原形；take a trip 旅行。" }
          ]
        },
        {
          num: 5,
          title: "Reading & Writing Practice",
          topic: "顺序词、because/so/but",
          questions: [
            { type: "选择", stem: "First, I get up. _____, I have breakfast.", options: ["Next", "Last", "Finally", "End"], answer: "A", analysis: "顺序词：First → Next/Then → Finally。" },
            { type: "选择", stem: "I like spring _____ it's warm.", options: ["but", "so", "because", "and"], answer: "C", analysis: "because 表原因；so 表结果，两者不并用。" },
            { type: "选择", stem: "I went to the park, _____ it rained.", options: ["and", "but", "so", "because"], answer: "B", analysis: "but 转折；去公园 vs 下雨，转折关系。" },
            { type: "填空", before: "F", after: " , let me introduce myself. (首先)", answer: "First", analysis: "First 首先，注意首字母大写。" },
            { type: "填空", before: "I was tired, s", after: " I went to bed early. (所以)", answer: "so", analysis: "so 所以，表结果；与 because 不能同时用。" }
          ]
        },
        {
          num: 6,
          title: "General Revision",
          topic: "小学总复习 + 小升初衔接",
          questions: [
            { type: "选择", stem: "— _____ do you go to school? — By bike.", options: ["What", "Where", "How", "When"], answer: "C", analysis: "How 问方式；by bike 是出行方式。" },
            { type: "选择", stem: "— _____ is the book? — Ten yuan.", options: ["How many", "How much", "How old", "How long"], answer: "B", analysis: "How much 问价格；十元是价格。" },
            { type: "选择", stem: "Tom is _____ boy in our class.", options: ["tall", "taller", "the tallest", "tallest"], answer: "C", analysis: "三者以上比较用最高级：the tallest。" },
            { type: "填空", before: "I am a s", after: " . I study in primary school. (学生)", answer: "student", analysis: "student 学生；study 学习；记忆：stu-dent。" },
            { type: "填空", before: "My favourite s", after: " is English. (科目)", answer: "subject", analysis: "subject 科目；favourite subject 最喜欢的科目。" }
          ]
        }
      ]
    }
  ]
};

