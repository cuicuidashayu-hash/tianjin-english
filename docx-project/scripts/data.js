// 数据文件：试卷错题、练习题、不规则动词表
// 此文件不直接执行，被 generate.js 引用

// ============================================================
//  试卷 Task 3 错题数据（16题）
// ============================================================
// 字段：num, originalText（学生写的版本）, studentAns, correctAns,
//       analysis（错因）, knowledge（知识点延伸）
const TASK3_ERRORS = [
  {
    num: 1,
    original: "A lot of trees plants every spring. (plant)",
    studentAns: "plants",
    correctAns: "are planted",
    analysis: "学生只写了 plant 的第三人称单数形式 plants，没有构成被动语态。本题主语是 a lot of trees（很多树），是动作\"种植\"的承受者（树被种），不是发出者，所以必须用被动语态。而且 trees 是复数，be 动词要用 are。",
    knowledge: "一般现在时被动语态结构：am/is/are + 过去分词。判断主语复数：a lot of + 可数名词复数 → 复数主语 → are。例如：A lot of apples are picked every autumn.（每年秋天采摘很多苹果。）",
  },
  {
    num: 2,
    original: "This letter wrote by my father yesterday. (write)",
    studentAns: "wrote",
    correctAns: "was written",
    analysis: "学生写了 write 的过去式 wrote，但句子已有 by my father（被我爸），说明信是被爸写的，必须用被动语态。yesterday（昨天）提示一般过去时，且 letter 是单数，所以 be 动词用 was。write 的过去分词是 written（不规则），不是 wrote。",
    knowledge: "一般过去时被动语态结构：was/were + 过去分词。write-wrote-written 是 ABC 型不规则动词，被动语态必须用过去分词 written，不能用过去式 wrote。常见错误：把过去式当过去分词。",
  },
  {
    num: 3,
    original: "English speaking in many countries around the world now. (speak)",
    studentAns: "speaking",
    correctAns: "is spoken",
    analysis: "学生写了 speaking，可能是想到\"现在进行时 be+doing\"，但这不是进行时句子！English（英语）是被说的对象，要用被动语态。now（现在）提示一般现在时（此处 now 强调\"目前的状态\"），English 是单数，所以 be 动词用 is。speak 的过去分词是 spoken（ABC 型不规则）。",
    knowledge: "now 不一定代表进行时，可表示\"现在的状态\"。被动语态：is + spoken。注意 speaking 是现在分词，过去分词才是 spoken。speak-spoke-spoken（ABC 型）。例如：Chinese is spoken in China.（中国说中文。）",
  },
  {
    num: 4,
    original: "The house built last year. (build)",
    studentAns: "built",
    correctAns: "was built",
    analysis: "学生只写了 build 的过去式 built，没有加 be 动词。last year（去年）提示一般过去时，house 是单数，所以 be 动词用 was。built 既是过去式也是过去分词（ABB 型），但被动语态要求 be + 过去分词，所以必须加 was。",
    knowledge: "build-built-built 是 ABB 型不规则动词（过去式=过去分词）。被动语态永远需要 be 动词 + 过去分词，缺一不可。这是学生最常见的错误——只写动词过去分词而漏掉 be 动词。",
  },
  {
    num: 5,
    original: "Many toys make in this factory every day. (make)",
    studentAns: "make",
    correctAns: "are made",
    analysis: "学生写了动词原形 make，既没有变被动语态，也没有用过去分词。every day（每天）提示一般现在时，many toys 是复数，be 动词用 are。make 的过去分词是 made（ABB 型）。",
    knowledge: "一般现在时被动：am/is/are + 过去分词。make-made-made（ABB 型）。例如：Many cars are made in this city every year.（这个城市每年生产很多车。）",
  },
  {
    num: 6,
    original: "My bike repaired last week. (repair)",
    studentAns: "repaired",
    correctAns: "was repaired",
    analysis: "学生写了 repaired（过去分词/过去式），但漏了 be 动词。last week（上周）提示一般过去时，bike 是单数，be 动词用 was。repair 是规则动词，过去式和过去分词都是 repaired，但被动语态必须 was/were + 过去分词。",
    knowledge: "规则动词的过去式和过去分词同形（+ed），但被动语态仍需 be 动词。判断时态看时间标志词：last week/year/night → 一般过去时 → was/were。",
  },
  {
    num: 7,
    original: "Nice cards draw by the students every Christmas. (draw)",
    studentAns: "draw",
    correctAns: "are drawn",
    analysis: "学生写了动词原形 draw。every Christmas（每年圣诞节）提示一般现在时，cards 是复数，be 动词用 are。draw 的过去分词是 drawn（ABC 型不规则：draw-drew-drawn）。",
    knowledge: "draw-drew-drawn（ABC 型）。被动语态：are + drawn。学生常见错误：用原形 draw 或过去式 drew。记住：被动语态永远用过去分词。例如：Beautiful pictures are drawn by him every day.",
  },
  {
    num: 8,
    original: "The cake cooked by my mum yesterday. (cook)",
    studentAns: "cooked",
    correctAns: "was cooked",
    analysis: "学生写了 cooked（过去分词/过去式），漏了 be 动词。yesterday 提示一般过去时，cake 是单数，be 动词用 was。cook 是规则动词，被动语态：was + cooked。",
    knowledge: "规则动词 cook-cooked-cooked。被动语态：was/were + cooked。常见错误：以为写了 -ed 就是被动语态，其实必须有 be 动词。",
  },
  {
    num: 9,
    original: "Lots of photos took when we were on holiday. (take)",
    studentAns: "took",
    correctAns: "were taken",
    analysis: "学生写了 take 的过去式 took，没有构成被动。when we were on holiday（当我们度假时）提示过去的事，photos 是复数，be 动词用 were。take 的过去分词是 taken（ABC 型：take-took-taken）。",
    knowledge: "take-took-taken（ABC 型）。被动语态：were + taken。注意复数主语（lots of photos）用 were 而不是 was。例如：Many photos were taken by tourists last summer.",
  },
  {
    num: 10,
    original: "The window broke by Tom yesterday. (break)",
    studentAns: "broke",
    correctAns: "was broken",
    analysis: "学生写了 break 的过去式 broke。by Tom（被 Tom）和 yesterday 都提示被动语态 + 过去时。window 是单数，be 动词用 was。break 的过去分词是 broken（ABC 型：break-broke-broken）。",
    knowledge: "break-broke-broken（ABC 型）。被动语态：was + broken。常见错误：把过去式 broke 当作过去分词使用。区分：broke 是过去式（主动），broken 是过去分词（用于被动/完成时）。",
  },
  {
    num: 11,
    original: "Many beautiful pictures show in this museum every year. (show)",
    studentAns: "show",
    correctAns: "are shown",
    analysis: "学生写了动词原形 show。every year（每年）提示一般现在时，pictures 是复数，be 动词用 are。show 的过去分词是 shown（特殊：show-showed-shown，过去式可规则变化也可用 shown，但被动语态常用 shown）。",
    knowledge: "show 的过去分词是 shown。被动语态：are + shown。例如：Many old things are shown in the museum every year. 学生易写成 showed，但被动语态中必须用过去分词 shown。",
  },
  {
    num: 12,
    original: "That nice song song at the party last night. (sing)",
    studentAns: "song",
    correctAns: "was sung",
    analysis: "学生把 sing 的过去分词 sung 错写成了 song（歌，名词）。这是拼写/词形混淆错误！last night（昨晚）提示一般过去时，song（实为 sing 的过去分词 sung）动作承受者，song（题目里的 nice song）是单数，be 动词用 was。sing 的过去分词是 sung（ABC 型：sing-sang-sung）。",
    knowledge: "sing-sang-sung（ABC 型）。song 是名词\"歌曲\"，sung 是动词 sing 的过去分词。两者长得像但完全不同！被动语态：was + sung。例如：A beautiful song was sung by her at the party.",
  },
  {
    num: 13,
    original: "All the letters sand by the secretary yesterday. (send)",
    studentAns: "sand",
    correctAns: "were sent",
    analysis: "学生把 send 的过去分词 sent 错写成了 sand（沙子）！这是严重的拼写错误。yesterday 提示过去时，letters 是复数，be 动词用 were。send 的过去分词是 sent（ABB 型：send-sent-sent）。",
    knowledge: "send-sent-sent（ABB 型）。sent 是动词过去分词，sand 是名词\"沙子\"，完全不同！被动语态：were + sent。常见混淆词：sent/sand、sung/song、wrote/written。要熟记不规则动词表。",
  },
  {
    num: 14,
    original: "This game love by children all over the world these days. (love)",
    studentAns: "love",
    correctAns: "is loved",
    analysis: "学生写了动词原形 love。these days（这些天/如今）提示一般现在时，game 是单数，be 动词用 is。love 是规则动词，过去分词是 loved（love+ d，因为以 e 结尾只加 d）。",
    knowledge: "规则动词 love-loved-loved（以 e 结尾只加 d）。被动语态：is + loved。these days 提示一般现在时（指现在的常态）。例如：Football is loved by people all over the world these days.",
  },
  {
    num: 15,
    original: "My watch sold in the shop two days ago. (sell)",
    studentAns: "sold",
    correctAns: "was sold",
    analysis: "学生写了 sell 的过去式 sold，漏了 be 动词。two days ago（两天前）提示一般过去时，watch 是单数，be 动词用 was。sell 的过去分词也是 sold（ABB 型：sell-sold-sold），但被动语态需要 was + sold。",
    knowledge: "sell-sold-sold（ABB 型）。被动语态：was + sold。注意：sold 既是过去式也是过去分词，但单独写 sold 不是被动语态，必须加 be 动词。例如：The bike was sold yesterday.",
  },
  {
    num: 16,
    original: "Fresh vegetables bring to the market every morning. (bring)",
    studentAns: "bring",
    correctAns: "are brought",
    analysis: "学生写了动词原形 bring。every morning（每天早上）提示一般现在时，vegetables 是复数，be 动词用 are。bring 的过去分词是 brought（ABB 型：bring-brought-brought）。",
    knowledge: "bring-brought-brought（ABB 型）。被动语态：are + brought。例如：Fresh flowers are brought to the shop every morning. 学生易用原形 bring 或错写 brought，要牢记过去分词。",
  },
];

// ============================================================
//  选择题第8-10题（图片上看不到完整题干，仅有选项和学生答案）
// ============================================================
const MC_ERRORS = [
  {
    num: 8,
    options: ["new", "old", "long", "short"],
    studentAns: "B. old",
    note: "本题为完形填空或阅读选择题的一部分。学生选了 B. old（旧的），根据图片可见选项为四组反义词（new/old、long/short），考查形容词词义辨析。建议结合完整试卷的上下文段落核对答案。如该题考查\"这件东西很___，需要换新的\"，则 old 是正确答案；若考查\"这件衣服太___，不能穿\"，则可能为 short。",
    knowledge: "做此类题的关键是回原文定位上下文，找关键词提示（如：need a new one/looks worn-out/has been used for years 等）。",
  },
  {
    num: 9,
    options: ["During", "With", "About", "At"],
    studentAns: "A. During",
    note: "本题为介词辨析。学生选了 A. During（在…期间）。During 通常接时间段（如 during the holiday, during the night），表示\"在某段时间内\"。如上下文是\"______ the holiday, we visited many places\"，则 During 正确。With 表\"用/和…一起\"，About 表\"关于\"，At 表\"在…时刻/地点\"。",
    knowledge: "介词口诀：During+时间段（during the week），At+时刻/小地点（at 8 o'clock/at school），About+话题（talk about），With+工具/人（write with a pen / play with friends）。",
  },
  {
    num: 10,
    options: ["see", "look", "saw", "sees"],
    studentAns: "B. look",
    note: "本题为动词时态/词义辨析。学生选 B. look（看，原形/现在时）。根据参考答案版图片，正确答案应为 C. saw（see 的过去式）。这说明本题考查过去时——上下文应有过去时间标志词。see-saw-seen（ABC 型不规则）。look 是\"看\"的动作（强调动作），see 是\"看见\"（强调结果）。",
    knowledge: "see vs look：look 强调\"看\"的动作（look at），see 强调\"看见\"的结果（I saw a bird）。判断时态：有 yesterday/last/ago 等标志词 → 过去时 → saw。学生选 look 可能混淆了词义，也忽略了时态提示。",
  },
];

// ============================================================
//  错题情况一览表数据
// ============================================================
const OVERVIEW_ROWS = [
  // [题号, 学生答案, 正确答案, 错误类型]
  ["1", "plants", "are planted", "未加 be 动词 + 未用过去分词"],
  ["2", "wrote", "was written", "用过去式代替过去分词 + 漏 be"],
  ["3", "speaking", "is spoken", "现在分词/过去分词混淆 + 漏 be"],
  ["4", "built", "was built", "漏 be 动词"],
  ["5", "make", "are made", "用原形 + 漏 be + 未变过去分词"],
  ["6", "repaired", "was repaired", "漏 be 动词"],
  ["7", "draw", "are drawn", "用原形 + 漏 be + 未变过去分词"],
  ["8", "cooked", "was cooked", "漏 be 动词"],
  ["9", "took", "were taken", "用过去式代替过去分词 + 漏 be"],
  ["10", "broke", "was broken", "用过去式代替过去分词 + 漏 be"],
  ["11", "show", "are shown", "用原形 + 漏 be + 未变过去分词"],
  ["12", "song", "was sung", "拼写混淆（sung/song）+ 漏 be"],
  ["13", "sand", "were sent", "拼写混淆（sent/sand）+ 漏 be"],
  ["14", "love", "is loved", "用原形 + 漏 be + 未变过去分词"],
  ["15", "sold", "was sold", "漏 be 动词"],
  ["16", "bring", "are brought", "用原形 + 漏 be + 未变过去分词"],
];

// ============================================================
//  一般现在时被动语态练习题（15题，混合）
// ============================================================
const PRACTICE_PRESENT = [
  // === 5道填空题 ===
  {
    type: "填空",
    num: 1,
    before: "Many trees ",
    after: " (plant) in our city every year.",
    answer: "are planted",
    analysis: "every year（每年）提示一般现在时；主语 many trees 是复数，be 动词用 are；plant 的过去分词是 planted（规则动词）。结构：are + planted。",
  },
  {
    type: "填空",
    num: 2,
    before: "English ",
    after: " (speak) by many people in the world now.",
    answer: "is spoken",
    analysis: "now 表示\"现在的状态\"，用一般现在时；主语 English 是不可数名词，be 动词用 is；speak 的过去分词是 spoken（speak-spoke-spoken，ABC 型）。",
  },
  {
    type: "填空",
    num: 3,
    before: "The flowers ",
    after: " (water) by my mother every morning.",
    answer: "are watered",
    analysis: "every morning 提示一般现在时；主语 flowers 是复数，be 动词用 are；water 作动词时是规则动词，过去分词 watered。",
  },
  {
    type: "填空",
    num: 4,
    before: "Rice ",
    after: " (grow) in the south of China.",
    answer: "is grown",
    analysis: "本句陈述普遍事实，用一般现在时；rice 是不可数名词，be 动词用 is；grow-grew-grown（ABC 型），过去分词 grown。",
  },
  {
    type: "填空",
    num: 5,
    before: "Our classroom ",
    after: " (clean) by the students every day.",
    answer: "is cleaned",
    analysis: "every day 提示一般现在时；classroom 单数，be 动词用 is；clean 是规则动词，过去分词 cleaned。",
  },
  // === 5道句型转换（主动→被动）===
  {
    type: "句型转换",
    num: 6,
    transform: "People speak English in many countries.",
    answer: "English is spoken (by people) in many countries.",
    analysis: "原句：People（主语）+ speak（一般现在时动词）+ English（宾语）。变被动：原宾语 English 作新主语（单数，be 动词用 is）+ is spoken + by people（动作发出者，可省略）。in many countries 保持不变。",
  },
  {
    type: "句型转换",
    num: 7,
    transform: "We plant trees every spring.",
    answer: "Trees are planted (by us) every spring.",
    analysis: "原句：We + plant + trees（宾语）。变被动：trees 作新主语（复数，be 动词用 are）+ are planted + by us。every spring 时间状语不变。注意主语复数 → 用 are。",
  },
  {
    type: "句型转换",
    num: 8,
    transform: "The librarian gives us books every week.",
    answer: "We are given books by the librarian every week. / Books are given to us by the librarian every week.",
    analysis: "give sb. sth. = give sth. to sb.，有两种被动形式。建议用人（us）作主语：We are given books...（更常用）。或用物（books）作主语：Books are given to us... 注意：books 复数 → are given。",
  },
  {
    type: "句型转换",
    num: 9,
    transform: "They sell fresh vegetables in this market.",
    answer: "Fresh vegetables are sold in this market (by them).",
    analysis: "原句：They + sell + fresh vegetables（宾语）。变被动：fresh vegetables 作新主语（复数，be 动词用 are）+ are sold + in this market。by them 通常可省略。",
  },
  {
    type: "句型转换",
    num: 10,
    transform: "Students do their homework every evening.",
    answer: "Their homework is done by students every evening.",
    analysis: "do-did-done（ABC 型）。变被动：homework（不可数，单数意义）作主语，be 动词用 is + done。注意 do 的过去分词是 done，不是 did 或 do。",
  },
  // === 5道四选一 ===
  {
    type: "选择",
    num: 11,
    stem: "The old bridge ___ every year.",
    options: ["repairs", "is repaired", "repairing", "repaired"],
    answer: "B. is repaired",
    analysis: "every year 提示一般现在时；主语 bridge（桥）是被修理的对象，用被动语态；bridge 单数，be 动词用 is + repaired。A 主动 C 进行时 D 过去式（缺 be）。",
  },
  {
    type: "选择",
    num: 12,
    stem: "Chinese ___ by more and more people in the world now.",
    options: ["speaks", "spoke", "is spoken", "is speaking"],
    answer: "C. is spoken",
    analysis: "now 提示现在的事实；主语 Chinese（中文）是被说的对象，用被动；Chinese 不可数，单数，be 动词用 is + spoken。speak-spoke-spoken（ABC 型）。A 错拼写（speaks），B 过去式 D 进行时都不构成被动。",
  },
  {
    type: "选择",
    num: 13,
    stem: "These storybooks ___ well in our shop.",
    options: ["sell", "are sold", "sold", "is sold"],
    answer: "B. are sold",
    analysis: "主语 storybooks 是复数 → be 动词用 are。\"sell well\"是\"销路好\"，常用被动表主动意义。注意：sell 在此为及物动词的被动形式。D 单数 be 动词与复数主语不匹配。",
  },
  {
    type: "选择",
    num: 14,
    stem: "The blackboard ___ by the students every morning.",
    options: ["cleans", "cleaned", "is cleaned", "is cleaning"],
    answer: "C. is cleaned",
    analysis: "every morning 提示一般现在时；blackboard 是被擦的对象，用被动；blackboard 单数，be 动词用 is + cleaned（规则动词）。A 主动 B 缺 be D 进行时。",
  },
  {
    type: "选择",
    num: 15,
    stem: "A lot of food ___ to the old people every week.",
    options: ["gives", "gave", "is given", "is giving"],
    answer: "C. is given",
    analysis: "every week 提示一般现在时；food 是被给的对象，用被动；food 不可数，单数意义，be 动词用 is + given（give-gave-given，ABC 型）。",
  },
];

// ============================================================
//  一般过去时被动语态练习题（15题，混合）
// ============================================================
const PRACTICE_PAST = [
  // === 5道填空题 ===
  {
    type: "填空",
    num: 1,
    before: "The window ",
    after: " (break) by Tom yesterday.",
    answer: "was broken",
    analysis: "yesterday 提示一般过去时；window 单数，be 动词用 was；break-broke-broken（ABC 型），过去分词 broken。结构：was + broken。",
  },
  {
    type: "填空",
    num: 2,
    before: "This book ",
    after: " (write) by Lu Xun in 1920.",
    answer: "was written",
    analysis: "in 1920 提示一般过去时；book 单数，be 动词用 was；write-wrote-written（ABC 型），过去分词 written。注意不能用 wrote（过去式）代替 written。",
  },
  {
    type: "填空",
    num: 3,
    before: "The thieves ",
    after: " (catch) by the police last night.",
    answer: "were caught",
    analysis: "last night 提示一般过去时；thieves（小偷们）是复数，be 动词用 were；catch-caught-caught（ABB 型），过去分词 caught。注意复数主语用 were 不是 was。",
  },
  {
    type: "填空",
    num: 4,
    before: "The classroom ",
    after: " (clean) an hour ago.",
    answer: "was cleaned",
    analysis: "an hour ago 提示一般过去时；classroom 单数，be 动词用 was；clean 规则动词，过去分词 cleaned。",
  },
  {
    type: "填空",
    num: 5,
    before: "Many gifts ",
    after: " (give) to the children on Christmas Day.",
    answer: "were given",
    analysis: "on Christmas Day 在过去语境中提示一般过去时；gifts 复数，be 动词用 were；give-gave-given（ABC 型），过去分词 given。",
  },
  // === 5道句型转换 ===
  {
    type: "句型转换",
    num: 6,
    transform: "Tom broke the window yesterday.",
    answer: "The window was broken by Tom yesterday.",
    analysis: "原句：Tom（主语）+ broke（过去式）+ the window（宾语）。变被动：window 作新主语（单数，be 动词用 was）+ broken（break 的过去分词）+ by Tom。时间状语 yesterday 不变。",
  },
  {
    type: "句型转换",
    num: 7,
    transform: "People built this house in 1990.",
    answer: "This house was built (by people) in 1990.",
    analysis: "in 1990 提示过去时；house 单数，be 动词用 was；build-built-built（ABB 型），过去分词 built。by people 可省略。",
  },
  {
    type: "句型转换",
    num: 8,
    transform: "The teacher praised the student last week.",
    answer: "The student was praised by the teacher last week.",
    analysis: "last week 过去时；student 单数，be 动词用 was；praise 是规则动词，过去分词 praised（直接 +d 因为以 e 结尾）。",
  },
  {
    type: "句型转换",
    num: 9,
    transform: "They sold all the tickets yesterday.",
    answer: "All the tickets were sold (by them) yesterday.",
    analysis: "yesterday 过去时；tickets 复数，be 动词用 were；sell-sold-sold（ABB 型），过去分词 sold。",
  },
  {
    type: "句型转换",
    num: 10,
    transform: "We took a lot of photos during the trip.",
    answer: "A lot of photos were taken by us during the trip.",
    analysis: "during the trip 在过去语境中；photos 复数，be 动词用 were；take-took-taken（ABC 型），过去分词 taken（不是 took！）。",
  },
  // === 5道四选一 ===
  {
    type: "选择",
    num: 11,
    stem: "The letter ___ yesterday morning.",
    options: ["wrote", "is written", "was written", "writes"],
    answer: "C. was written",
    analysis: "yesterday morning 过去时；letter 单数，be 动词用 was；write-wrote-written（ABC 型），过去分词 written。A 过去式主动 B 现在时被动 D 主动现在时。",
  },
  {
    type: "选择",
    num: 12,
    stem: "These photos ___ when we were on holiday.",
    options: ["took", "were taken", "are taken", "take"],
    answer: "B. were taken",
    analysis: "when we were on holiday 过去时；photos 复数，be 动词用 were；take-took-taken（ABC 型），过去分词 taken。注意复数 → were。",
  },
  {
    type: "选择",
    num: 13,
    stem: "The window ___ by the boy last night.",
    options: ["broke", "is broken", "was broken", "breaks"],
    answer: "C. was broken",
    analysis: "last night 过去时；window 单数，be 动词用 was；break-broke-broken（ABC 型），过去分词 broken。注意不能用 broke（过去式）。",
  },
  {
    type: "选择",
    num: 14,
    stem: "All the letters ___ by the secretary the day before yesterday.",
    options: ["sent", "were sent", "are sent", "send"],
    answer: "B. were sent",
    analysis: "the day before yesterday 过去时；letters 复数，be 动词用 were；send-sent-sent（ABB 型），过去分词 sent（不是 sand！）。",
  },
  {
    type: "选择",
    num: 15,
    stem: "My bike ___ last week.",
    options: ["repaired", "is repaired", "was repaired", "repairs"],
    answer: "C. was repaired",
    analysis: "last week 过去时；bike 单数，be 动词用 was；repair 规则动词，过去分词 repaired。注意：必须有 be 动词才算被动语态。",
  },
];

// ============================================================
//  不规则动词表（40个，按变化模式分类）
// ============================================================
// 模式：AAA=三者同形 / AAB=原形=过去式≠过去分词 / ABA=原形=过去分词≠过去式 /
//      ABB=过去式=过去分词≠原形 / ABC=三者皆不同
const VERB_GROUPS = [
  {
    pattern: "AAA 型",
    desc: "原形 — 过去式 — 过去分词（三者同形）",
    tip: "最省心的一组，三种形式都长得一样。注意 read 三种形式拼写相同但发音不同（原形读 /riːd/，过去式和过去分词读 /red/）。",
    verbs: [
      ["put", "put", "put", "放"],
      ["cut", "cut", "cut", "切"],
      ["cost", "cost", "cost", "花费"],
      ["hit", "hit", "hit", "打、击中"],
      ["hurt", "hurt", "hurt", "伤害"],
      ["let", "let", "let", "让"],
      ["read", "read", "read", "读"],
      ["set", "set", "set", "设置、放置"],
    ],
  },
  {
    pattern: "AAB 型",
    desc: "原形 = 过去式 ≠ 过去分词",
    tip: "原形和过去式同形，过去分词不同。这一组只有 1 个常用词，要重点记。",
    verbs: [
      ["beat", "beat", "beaten", "击败、打"],
    ],
  },
  {
    pattern: "ABA 型",
    desc: "原形 = 过去分词 ≠ 过去式",
    tip: "原形和过去分词同形，过去式不同。常见\"来去\"类动词。",
    verbs: [
      ["come", "came", "come", "来"],
      ["run", "ran", "run", "跑"],
      ["become", "became", "become", "成为"],
    ],
  },
  {
    pattern: "ABB 型",
    desc: "原形 ≠ 过去式 = 过去分词",
    tip: "过去式和过去分词同形，是最多的类型。被动语态中要用的就是过去分词（=过去式）。",
    verbs: [
      ["build", "built", "built", "建造 ★试卷"],
      ["bring", "brought", "brought", "带来 ★试卷"],
      ["buy", "bought", "bought", "买"],
      ["catch", "caught", "caught", "抓、接"],
      ["teach", "taught", "taught", "教"],
      ["think", "thought", "thought", "想"],
      ["send", "sent", "sent", "发送 ★试卷"],
      ["make", "made", "made", "制造 ★试卷"],
      ["have", "had", "had", "有"],
      ["sell", "sold", "sold", "卖 ★试卷"],
      ["tell", "told", "told", "告诉"],
      ["sit", "sat", "sat", "坐"],
      ["win", "won", "won", "赢"],
      ["get", "got", "got", "得到"],
      ["sleep", "slept", "slept", "睡觉"],
      ["sweep", "swept", "swept", "扫"],
      ["keep", "kept", "kept", "保持"],
      ["feel", "felt", "felt", "感觉"],
    ],
  },
  {
    pattern: "ABC 型",
    desc: "原形 — 过去式 — 过去分词（三者都不同）",
    tip: "最容易出错的一组！必须三个形式都背熟。被动语态中永远用过去分词（第三列），不能用过去式（第二列）。",
    verbs: [
      ["write", "wrote", "written", "写 ★试卷"],
      ["speak", "spoke", "spoken", "说 ★试卷"],
      ["take", "took", "taken", "拿 ★试卷"],
      ["break", "broke", "broken", "打破 ★试卷"],
      ["show", "showed", "shown", "给…看 ★试卷"],
      ["sing", "sang", "sung", "唱 ★试卷"],
      ["draw", "drew", "drawn", "画 ★试卷"],
      ["see", "saw", "seen", "看见"],
      ["do", "did", "done", "做"],
      ["give", "gave", "given", "给"],
    ],
  },
];

module.exports = {
  TASK3_ERRORS, MC_ERRORS, OVERVIEW_ROWS,
  PRACTICE_PRESENT, PRACTICE_PAST, VERB_GROUPS,
};
