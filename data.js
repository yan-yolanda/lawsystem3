(function () {
  const DIRECTION_SEEDS = [
    { direction: "数字法治", type: "重点项目", keywords: ["数据要素", "算法治理", "平台责任", "个人信息保护", "数字证据"], titles: ["生成式人工智能服务中的平台责任边界研究", "数据要素市场配置中的公共法治理机制研究", "算法推荐场景下个人信息保护义务研究", "跨境数据流动的合规审查与监管协同研究", "数字取证规则在网络犯罪治理中的适用研究"] },
    { direction: "刑事法治", type: "一般项目", keywords: ["认罪认罚", "轻罪治理", "证据规则", "网络犯罪", "程序分流"], titles: ["轻罪治理背景下认罪认罚从宽制度优化研究", "涉众型网络犯罪的证据标准与证明责任研究", "刑事速裁程序中的程序保障边界研究", "数字证据审查规则在刑事审判中的适用研究", "未成年人网络犯罪的分层治理机制研究"] },
    { direction: "民商法治", type: "青年项目", keywords: ["合同治理", "平台交易", "消费者权益", "侵权责任", "公司治理"], titles: ["平台经济背景下格式条款效力认定研究", "网络直播带货场景中的消费者救济机制研究", "数据侵权案件中的损害赔偿计算规则研究", "公司控制权争夺中的董事信义义务研究", "智能合约履行争议的私法回应研究"] },
    { direction: "知识产权法", type: "重点项目", keywords: ["著作权", "专利治理", "商标保护", "平台传播", "人工智能"], titles: ["生成式人工智能训练数据的著作权边界研究", "高价值专利培育中的行政与司法协同保护研究", "短视频二创生态中的作品合理使用规则研究", "平台电商场景中商标混淆责任认定研究", "开源模型应用中的知识产权风险分配研究"] },
    { direction: "国际法治", type: "重大项目", keywords: ["涉外法治", "国际仲裁", "合规治理", "出口管制", "投资保护"], titles: ["涉外法治建设中的企业合规审查机制研究", "国际商事仲裁中临时措施执行问题研究", "出口管制规则对跨国供应链合同的影响研究", "海外投资争端中的国家责任抗辩研究", "数字贸易规则重构中的中国法治回应研究"] },
    { direction: "行政法治", type: "一般项目", keywords: ["行政裁量", "政府数据开放", "比例原则", "行政处罚", "复议改革"], titles: ["行政裁量基准公开化的法治化路径研究", "政府数据开放中的公共利益衡量规则研究", "新行政处罚法实施中的过罚相当原则研究", "行政复议主渠道定位下程序协同研究", "基层综合执法改革中的权责配置研究"] },
    { direction: "司法制度", type: "重点项目", keywords: ["审判管理", "案例指导", "司法公开", "审级职能", "数字法院"], titles: ["数字法院建设中的审判权运行机制研究", "类案检索在裁判统一中的功能边界研究", "审级职能定位改革下再审启动规则研究", "司法公开与个人隐私保护的平衡机制研究", "案例指导制度提升裁判可预期性的路径研究"] },
    { direction: "社会治理法", type: "青年项目", keywords: ["基层治理", "劳动法", "平台用工", "社会保障", "纠纷预防"], titles: ["平台用工关系认定的劳动法路径研究", "灵活就业群体社会保障法治保障研究", "社区矛盾纠纷预防中的法治资源配置研究", "新业态劳动者职业伤害保障制度研究", "基层协商治理中的规则嵌入机制研究"] }
  ];

  const EXPERT_SEEDS = [["陈知衡", "华东政法大学"], ["林予安", "中国政法大学"], ["周明谦", "清华大学法学院"], ["顾南乔", "北京大学法学院"], ["宋砚秋", "复旦大学法学院"], ["沈若川", "武汉大学法学院"], ["梁思远", "吉林大学法学院"], ["许澄怀", "中南财经政法大学"], ["贺清岚", "厦门大学法学院"], ["唐景澜", "南京大学法学院"], ["裴知序", "上海交通大学凯原法学院"], ["程叙白", "中国人民大学法学院"], ["夏闻笛", "西南政法大学"], ["郑书宁", "山东大学法学院"], ["高言蹊", "浙江大学光华法学院"], ["何知礼", "四川大学法学院"], ["徐景行", "南开大学法学院"], ["柳承泽", "中山大学法学院"], ["傅清尘", "对外经济贸易大学法学院"], ["苏望舒", "华中科技大学法学院"], ["姜以衡", "中国社会科学院大学"], ["白令仪", "深圳大学法学院"], ["方既明", "兰州大学法学院"], ["罗闻致", "苏州大学王健法学院"]];
  const LECTURE_THEMES = ["数字法治前沿论坛", "刑事治理与证据规则工作坊", "平台经济与民商法青年沙龙", "涉外法治与合规治理研讨会", "知识产权与人工智能圆桌", "司法制度现代化专题讲座", "社会治理法治创新论坛", "行政法治实践案例会"];

  function unique(list) { return Array.from(new Set(list)); }
  function tokenize(text) {
    return unique(String(text || "").toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]+/g, " ").split(/\s+/).filter(Boolean).flatMap((token) => /^[\u4e00-\u9fa5]{2,}$/.test(token) ? [token].concat(token.split("")) : [token]));
  }

  function buildTopics() {
    const topics = [];
    const titleSuffixes = ["", "的实证评估", "与治理体系优化", "的比较法考察", "的案例检验", "的规范展开", "的协同治理路径", "的制度重构"];
    const perspectiveKeywords = ["法教义学", "实证研究", "案例分析", "比较法", "技术治理", "司法回应", "风险预防", "协同监管"];
    const stageKeywords = ["制度完善", "机制创新", "规范协调", "程序优化", "场景治理", "风险防控"];
    let id = 1;
    DIRECTION_SEEDS.forEach((seed, seedIndex) => {
      for (let variant = 0; variant < titleSuffixes.length; variant += 1) {
        seed.titles.forEach((title, titleIndex) => {
          const year = 2012 + ((seedIndex * 11 + variant * 3 + titleIndex * 2) % 14);
          const suffix = titleSuffixes[variant];
          const perspective = perspectiveKeywords[(seedIndex + variant + titleIndex) % perspectiveKeywords.length];
          const stageKeyword = stageKeywords[(seedIndex * 2 + variant + titleIndex) % stageKeywords.length];
          const leadExpertIndexes = [(seedIndex * 3 + titleIndex + variant) % EXPERT_SEEDS.length, (seedIndex * 3 + titleIndex + variant + 5) % EXPERT_SEEDS.length, (seedIndex * 3 + titleIndex + variant + 11) % EXPERT_SEEDS.length];
          topics.push({
            id: "LAW-" + String(id).padStart(3, "0"),
            title: title + suffix,
            year: year,
            type: seed.type,
            direction: seed.direction,
            keywords: unique(seed.keywords.concat([seed.direction, year >= 2021 ? "高质量发展" : stageKeyword, titleIndex % 2 === 0 ? "司法实践" : "规范解释", perspective])),
            leadExperts: leadExpertIndexes.map((index) => EXPERT_SEEDS[index][0]),
            x: 8 + ((seedIndex * 17 + titleIndex * 7 + variant * 5) % 84),
            y: 8 + ((seedIndex * 13 + titleIndex * 11 + variant * 6) % 84)
          });
          id += 1;
        });
      }
    });
    return topics;
  }

  const TOPICS = buildTopics();

  function buildExperts(topics) {
    return EXPERT_SEEDS.map((seed, index) => {
      const name = seed[0];
      const institution = seed[1];
      const relatedTopics = topics.filter((topic) => topic.leadExperts.includes(name));
      return {
        id: "EXP-" + String(index + 1).padStart(2, "0"),
        name: name,
        institution: institution,
        title: ["教授", "副教授", "研究员"][index % 3],
        directions: unique(relatedTopics.map((topic) => topic.direction)).slice(0, 3),
        topics: relatedTopics.map((topic) => topic.id).slice(0, 12),
        profile: name + "长期关注" + unique(relatedTopics.map((topic) => topic.direction)).slice(0, 3).join("、") + "等议题，兼具规范研究与实践评估经验。"
      };
    });
  }

  const EXPERTS = buildExperts(TOPICS);

  function buildLectures(experts) {
    const lectures = [];
    for (let i = 0; i < 56; i += 1) {
      const indexes = [i % experts.length, (i + 4) % experts.length, (i + 10) % experts.length, (i + 16) % experts.length];
      lectures.push({
        id: "LEC-" + String(i + 1).padStart(3, "0"),
        name: LECTURE_THEMES[i % LECTURE_THEMES.length] + "第" + (Math.floor(i / 8) + 1) + "期",
        date: (2019 + (i % 7)) + "-" + String((i % 12) + 1).padStart(2, "0") + "-" + String(((i * 3) % 27) + 1).padStart(2, "0"),
        experts: indexes.map((index) => experts[index].name)
      });
    }
    return lectures;
  }

  const LECTURES = buildLectures(EXPERTS);

  function getTopicByTitle(title) { return TOPICS.find((topic) => topic.title === title) || null; }
  function getExpertByName(name) { return EXPERTS.find((expert) => expert.name === name) || null; }
  function scoreTopicSimilarity(queryTopic, referenceTopic) {
    const queryTokens = new Set(tokenize([queryTopic.title || "", queryTopic.direction || "", (queryTopic.keywords || []).join(" ")].join(" ")));
    const refTokens = new Set(tokenize([referenceTopic.title, referenceTopic.direction, referenceTopic.keywords.join(" ")].join(" ")));
    let overlap = 0;
    queryTokens.forEach((token) => { if (refTokens.has(token)) { overlap += 1; } });
    const union = new Set([].concat(Array.from(queryTokens), Array.from(refTokens))).size || 1;
    return overlap / union;
  }
  function findSimilarTopics(queryTopic, limit) {
    return TOPICS.map((topic) => Object.assign({}, topic, { similarity: scoreTopicSimilarity(queryTopic, topic) })).filter((topic) => topic.similarity > 0).sort((a, b) => b.similarity - a.similarity || b.year - a.year).slice(0, limit || 5);
  }
  function buildLeadRecommendDetail(queryTopic, expert) {
    const queryKeywords = queryTopic.keywords || [];
    const relatedTopics = TOPICS.filter((topic) => expert.topics.includes(topic.id));
    const directionTopics = relatedTopics.filter((topic) => topic.direction === queryTopic.direction);
    const alignedTopics = relatedTopics.filter((topic) => topic.direction === queryTopic.direction || topic.keywords.some((keyword) => queryKeywords.includes(keyword)));
    const sharedKeywords = unique(alignedTopics.flatMap((topic) => topic.keywords.filter((keyword) => queryKeywords.includes(keyword) && keyword.length >= 2))).slice(0, 6);
    const typeMap = {};
    directionTopics.forEach((topic) => { typeMap[topic.type] = (typeMap[topic.type] || 0) + 1; });
    const years = directionTopics.map((topic) => topic.year);
    const minYear = years.length ? Math.min.apply(null, years) : null;
    const maxYear = years.length ? Math.max.apply(null, years) : null;
    const sampleTitles = directionTopics.slice().sort((a, b) => b.year - a.year).slice(0, 2).map((topic) => topic.title);
    const crossDirections = expert.directions.filter((direction) => direction !== queryTopic.direction);
    const sections = [];
    if (expert.directions.includes(queryTopic.direction)) {
      sections.push({ title: "方向契合：", text: "主研领域覆盖本课题所属的“" + queryTopic.direction + "”方向，与立项论证中的问题意识、制度工具选择和评价指标具有直接对应关系，可保证研究主线不走偏。" });
    } else {
      sections.push({ title: "方向契合：", text: "核心方向为" + expert.directions.join("、") + (crossDirections.length ? "，与“" + queryTopic.direction + "”存在交叉议题衔接" : "") + "，适合从相邻制度场景切入本课题。" });
    }
    if (directionTopics.length) {
      const typeText = Object.keys(typeMap).map((type) => type + typeMap[type] + "项").join("、");
      sections.push({ title: "立项经验：", text: "在相同方向累计参与" + directionTopics.length + "项历史课题（" + minYear + "—" + maxYear + "年），其中" + typeText + "，对课题设计、阶段成果和结项论证均有成熟经验。" });
      if (sampleTitles.length) {
        sections.push({ title: "代表课题：", text: sampleTitles.map((item) => "《" + (item.length > 22 ? item.slice(0, 22) + "…" : item) + "》").join("、") + "，与本课题在研究对象、规范路径或治理工具上具有可迁移性。" });
      }
    } else if (alignedTopics.length) {
      sections.push({ title: "立项经验：", text: "虽同方向直接课题较少，但参与" + alignedTopics.length + "项关键词相近的历史项目，可借助既有分析框架快速进入本课题。" });
    } else {
      sections.push({ title: "立项经验：", text: "跨方向参与" + relatedTopics.length + "项法学课题，具备较强的议题整合与团队协作能力，适合作为综合型负责人。" });
    }
    if (sharedKeywords.length) {
      sections.push({ title: "关键词衔接：", text: "与申报关键词在“" + sharedKeywords.join("”“") + "”等方面高度重合，意味着文献积累、经验样本和政策语境可复用，立项风险相对可控。" });
    } else if (queryKeywords.length) {
      sections.push({ title: "关键词衔接：", text: "可围绕“" + queryKeywords.slice(0, 4).join("”“") + "”等申报关键词快速搭建研究框架，并通过相近课题补全论证链条。" });
    }
    sections.push({ title: "团队适配：", text: expert.institution + expert.title + "。" + expert.profile + "作为负责人，有利于统筹规范分析、实证评估与政策表达。" });
  return { sections: sections };
  }
  function recommendExperts(queryTopic, limit) {
    return EXPERTS.map((expert) => {
      const directionScore = expert.directions.includes(queryTopic.direction) ? 0.45 : 0;
      const topicMatches = TOPICS.filter((topic) => expert.topics.includes(topic.id) && (topic.direction === queryTopic.direction || topic.keywords.some((keyword) => (queryTopic.keywords || []).includes(keyword)))).length;
      const score = Math.min(0.98, directionScore + topicMatches * 0.1 + Math.min(expert.topics.length, 12) * 0.015);
      return Object.assign({}, expert, { score: score, matchDetail: buildLeadRecommendDetail(queryTopic, expert) });
    }).sort((a, b) => b.score - a.score).slice(0, limit || 5);
  }
  function buildExpertNetwork(targetName) {
    const edgeMap = new Map();
    LECTURES.forEach((lecture) => {
      if (!lecture.experts.includes(targetName)) { return; }
      for (let i = 0; i < lecture.experts.length; i += 1) {
        for (let j = i + 1; j < lecture.experts.length; j += 1) {
          const pair = [lecture.experts[i], lecture.experts[j]].sort().join("__");
          edgeMap.set(pair, (edgeMap.get(pair) || 0) + 1);
        }
      }
    });
    const related = new Set([targetName]);
    edgeMap.forEach((value, pair) => { if (value > 0 && pair.includes(targetName)) { pair.split("__").forEach((name) => related.add(name)); } });
    const nodes = Array.from(related).map((name, index) => {
      const expert = getExpertByName(name);
      const angle = (Math.PI * 2 * index) / Math.max(related.size, 1);
      const radius = name === targetName ? 0 : 140;
      return { id: name, name: name, x: 200 + Math.cos(angle) * radius, y: 180 + Math.sin(angle) * radius, value: name === targetName ? 26 : 16, category: name === targetName ? "core" : "related", institution: expert ? expert.institution : "", directions: expert ? expert.directions : [] };
    });
    const links = Array.from(edgeMap.entries()).map((entry) => { const names = entry[0].split("__"); return { source: names[0], target: names[1], value: entry[1] }; }).filter((link) => related.has(link.source) && related.has(link.target));
    return { nodes: nodes, links: links };
  }
  const POLICY_CONTENT = {
    "数字中国建设整体布局规划": {
      issuer: "中共中央、国务院",
      date: "2023年2月",
      summary: "系统部署数字中国建设总体框架，强调数据资源体系与数字治理能力建设。",
      clauses: [
        { label: "总体要求", text: "到2025年，基本形成横向打通、纵向贯通、协调有力的一体化推进格局，数字中国建设取得重要进展。数据资源体系初步建成，数字基础设施更加高效普惠。", tags: ["数据"] },
        { label: "夯实数字中国建设基础", text: "释放数据要素价值，健全数据基础制度体系，加强数据资源整合共享和开发利用，推动数据资源跨部门、跨层级、跨地区流通利用。", tags: ["数据"] }
      ]
    },
    "“十四五”数字经济发展规划": {
      issuer: "国务院",
      date: "2022年1月",
      summary: "明确“十四五”时期数字经济发展目标与重点任务，突出数据要素市场化配置。",
      clauses: [
        { label: "第三章 优化升级数字基础设施", text: "统筹布局绿色智能的数据与算力基础设施，推进国家枢纽节点和大数据中心集群建设，提升数据供给质量和流通效率。", tags: ["数据"] },
        { label: "第四章 充分发挥数据要素作用", text: "强化高质量数据要素供给，加快数据要素市场化流通，创新数据要素开发利用机制，促进数据高效合规流通使用。", tags: ["数据"] }
      ]
    },
    "网络数据安全管理条例": {
      issuer: "国务院",
      date: "2024年12月公布",
      summary: "规范网络数据处理活动，保障网络数据安全，促进网络数据依法合理有效利用。",
      clauses: [
        { label: "第三条", text: "网络数据处理活动应当遵守法律、行政法规，尊重社会公德和伦理，遵守商业道德和职业道德，诚实守信，履行数据安全保护义务，承担社会责任，不得危害国家安全、公共利益，不得损害个人、组织的合法权益。", tags: ["数据"] },
        { label: "第十二条", text: "网络数据处理者开展数据处理活动，应当建立健全全流程数据安全管理制度，组织开展数据安全教育培训，采取相应的技术措施和其他必要措施，保障数据安全。", tags: ["数据", "算法"] }
      ]
    },
    "互联网信息服务算法推荐管理规定": {
      issuer: "国家互联网信息办公室等四部门",
      date: "2022年3月1日起施行",
      summary: "规范算法推荐服务，保障用户知情权、选择权与公平交易条件。",
      clauses: [
        { label: "第十七条", text: "算法推荐服务提供者应当向用户提供不针对其个人特征的选项，或者向用户提供便捷的关闭算法推荐服务的选项。用户选择关闭算法推荐服务的，算法推荐服务提供者应当立即停止提供相关服务。", tags: ["算法"] },
        { label: "第二十四条", text: "算法推荐服务提供者向消费者销售商品或者提供服务的，应当保护消费者公平交易的权利，不得根据消费者的兴趣爱好、交易习惯等特征，利用算法在交易价格等交易条件上实行不合理的差别待遇等违法行为。", tags: ["算法", "平台"] }
      ]
    },
    "新一代人工智能发展规划": {
      issuer: "国务院",
      date: "2017年7月",
      summary: "确立人工智能发展的战略目标和重点任务，推动人工智能与经济社会深度融合。",
      clauses: [
        { label: "总体要求", text: "坚持科技引领、系统布局、市场主导、开源开放，形成适应人工智能发展的制度安排，构建技术先进、产业发达、布局合理、支撑有力的人工智能发展格局。", tags: ["人工智能", "算法"] },
        { label: "重点任务", text: "加快人工智能在教育、医疗卫生、司法、交通、城市管理、金融等领域的创新应用，提高公共服务和社会治理水平。", tags: ["人工智能"] }
      ]
    },
    "生成式人工智能服务管理暂行办法": {
      issuer: "国家互联网信息办公室等七部门",
      date: "2023年8月15日起施行",
      summary: "规范生成式人工智能服务，明确提供者义务与内容治理要求。",
      clauses: [
        { label: "第四条", text: "提供和使用生成式人工智能服务，应当遵守法律、行政法规，尊重社会公德和伦理道德，遵守商业道德，维护社会主义核心价值，尊重知识产权，保护个人合法权益，不得危害国家安全、公共利益和他人合法权益。", tags: ["人工智能", "算法"] },
        { label: "第十四条", text: "提供者应当采取有效措施，防范生成虚假信息、歧视性内容、侵犯知识产权等风险，对违法内容及时采取停止生成、停止传输、消除等处置措施。", tags: ["人工智能", "算法"] }
      ]
    },
    "关于平台经济领域的反垄断指南": {
      issuer: "国务院反垄断委员会",
      date: "2021年2月",
      summary: "明确平台经济领域反垄断执法原则，规制滥用市场支配地位等行为。",
      clauses: [
        { label: "第六条 市场支配地位认定因素", text: "认定平台经营者具有市场支配地位，应当结合相关行业竞争状况、平台经营者市场份额、控制市场的能力、财力和技术条件、其他经营者对其依赖程度、进入相关市场的难易程度等因素综合分析。", tags: ["平台"] },
        { label: "第十七条 差别待遇", text: "具有市场支配地位的平台经营者，没有正当理由，不得对交易条件相同的交易相对人实行差别待遇，排除、限制市场竞争。", tags: ["平台", "算法"] }
      ]
    },
    "“十四五”市场监管现代化规划": {
      issuer: "国务院",
      date: "2022年1月",
      summary: "推进市场监管体系和监管能力现代化，服务构建新发展格局。",
      clauses: [
        { label: "专栏 强化平台经济监管", text: "完善平台经济领域反垄断、反不正当竞争规则，加强平台企业合规管理，规范平台内经营者行为，维护公平竞争市场秩序。", tags: ["平台"] },
        { label: "提升智慧监管能力", text: "运用大数据、人工智能等技术手段，提升风险预警、精准监管和协同监管能力，推动线上线下一体化监管。", tags: ["平台", "数据"] }
      ]
    },
    "关于适用认罪认罚从宽制度的指导意见": {
      issuer: "最高人民法院等五机关",
      date: "2019年10月",
      summary: "统一认罪认罚从宽案件办理标准，规范量刑建议与程序适用。",
      clauses: [
        { label: "基本原则", text: "贯彻宽严相济刑事政策，对于认罪认罚的犯罪嫌疑人、被告人，依法从宽处理；坚持罪刑法定、罪责刑相适应，确保办案质量。", tags: ["认罪认罚", "刑事"] },
        { label: "量刑建议", text: "人民检察院提出量刑建议，一般应当确定刑；对常见、多发、量刑幅度相对固定的案件，可以提出确定刑量刑建议。", tags: ["认罪认罚"] }
      ]
    },
    "法治中国建设规划（2020-2025年）": {
      issuer: "中共中央",
      date: "2021年1月",
      summary: "统筹推进科学立法、严格执法、公正司法、全民守法，建设法治中国。",
      clauses: [
        { label: "加强重点领域立法", text: "加强数字经济、互联网金融、人工智能、大数据、云计算等新兴领域立法研究，及时回应新技术新产业新业态新模式发展需求。", tags: ["数据", "算法", "刑事", "证据", "涉外", "合规"] },
        { label: "推进公正司法", text: "深化司法责任制综合配套改革，健全审判权、检察权运行和监督机制，提高司法公信力。", tags: ["刑事", "证据"] }
      ]
    },
    "“八五”普法规划": {
      issuer: "中共中央、国务院转印",
      date: "2021年6月",
      summary: "明确第八个五年法治宣传教育的目标任务与工作措施。",
      clauses: [
        { label: "工作原则", text: "坚持党的全面领导，坚持以人民为中心，坚持服务大局、突出重点，坚持与法治实践深度融合，推动全社会尊法学法守法用法。", tags: ["刑事"] },
        { label: "重点对象", text: "实行国家机关“谁执法谁普法”普法责任制，加强青少年法治教育，提升基层干部群众法治素养。", tags: ["刑事"] }
      ]
    },
    "关于加强新时代检察机关法律监督工作的意见": {
      issuer: "中共中央",
      date: "2021年8月",
      summary: "强化检察机关法律监督职能，提升监督质效与协同水平。",
      clauses: [
        { label: "刑事检察", text: "深化刑事诉讼监督，加强侦查监督与审判监督，规范认罪认罚从宽案件办理，统一司法尺度。", tags: ["证据", "刑事", "认罪认罚"] },
        { label: "证据审查", text: "完善对证据收集、固定、审查、运用的监督机制，防止因证据问题导致冤错案件。", tags: ["证据"] }
      ]
    },
    "知识产权强国建设纲要（2021-2035年）": {
      issuer: "中共中央、国务院",
      date: "2021年9月",
      summary: "建设中国特色、世界水平的知识产权强国，服务创新驱动发展。",
      clauses: [
        { label: "发展目标", text: "到2025年，知识产权保护更加严格，社会满意度达到并保持较高水平；到2035年，知识产权综合竞争力跻身世界前列。", tags: ["著作权", "专利", "商标"] },
        { label: "版权产业", text: "健全著作权登记、集体管理和司法保护衔接机制，促进网络视听、数字出版等新业态版权治理。", tags: ["著作权"] }
      ]
    },
    "“十四五”国家知识产权保护和运用规划": {
      issuer: "国务院",
      date: "2021年10月",
      summary: "完善知识产权全链条保护体系，提升知识产权创造、运用、保护、管理和服务水平。",
      clauses: [
        { label: "专利保护", text: "健全专利侵权纠纷行政裁决制度，完善专利无效宣告与侵权诉讼衔接机制，加大高价值专利保护力度。", tags: ["专利"] },
        { label: "商标与地理标志", text: "严厉打击商标恶意抢注和侵权假冒行为，加强驰名商标、地理标志、老字号商标保护。", tags: ["商标"] }
      ]
    },
    "关于加强新时代涉外法治工作的意见": {
      issuer: "中共中央、国务院",
      date: "2023年",
      summary: "统筹推进国内法治和涉外法治，提升涉外法治体系和能力。",
      clauses: [
        { label: "涉外立法", text: "加强涉外领域立法，完善反制裁、反干涉、反“长臂管辖”法律法规，健全涉外法律规范体系。", tags: ["涉外", "合规"] },
        { label: "涉外法律服务", text: "培育国际一流仲裁机构、律师事务所，提升企业涉外合规能力和争议解决能力。", tags: ["涉外", "仲裁", "合规"] }
      ]
    },
    "法治政府建设实施纲要（2021-2025年）": {
      issuer: "中共中央、国务院",
      date: "2021年8月",
      summary: "全面建设职能科学、权责法定、执法严明、公开公正、智能高效、廉洁诚信、人民满意的法治政府。",
      clauses: [
        { label: "依法全面履行职能", text: "推进机构、职能、权限、程序、责任法定化，深化“放管服”改革，持续优化法治化营商环境。", tags: ["行政"] },
        { label: "数字法治政府", text: "加快推进政务数据有序共享，推动政务服务“一网通办”，以数字化手段提升政府治理效能。", tags: ["行政", "数据"] }
      ]
    },
    "“十四五”推进国家政务信息化规划": {
      issuer: "国家发展改革委",
      date: "2021年12月",
      summary: "统筹政务信息系统建设，提升政务数字化智能化水平。",
      clauses: [
        { label: "数据共享", text: "建立健全政务数据共享协调机制，推进政务数据跨层级、跨地域、跨部门、跨业务、跨系统共享利用。", tags: ["行政", "数据"] },
        { label: "安全保障", text: "落实网络安全等级保护、关键信息基础设施安全保护等制度，保障政务信息系统安全稳定运行。", tags: ["行政", "数据"] }
      ]
    },
    "“十四五”就业促进规划": {
      issuer: "国务院",
      date: "2022年",
      summary: "强化就业优先政策，促进更加充分更高质量就业。",
      clauses: [
        { label: "支持灵活就业", text: "破除不合理限制，拓宽灵活就业发展渠道，完善与新就业形态相适应的劳动保障制度。", tags: ["劳动"] },
        { label: "重点群体", text: "做好高校毕业生、农民工、退役军人等重点群体就业工作，加强就业服务和职业技能培训。", tags: ["劳动"] }
      ]
    },
    "关于维护新就业形态劳动者劳动保障权益的指导意见": {
      issuer: "人力资源和社会保障部等八部门",
      date: "2021年7月",
      summary: "维护新就业形态劳动者合法权益，补齐平台用工劳动保障短板。",
      clauses: [
        { label: "合理界定劳动关系", text: "符合确立劳动关系情形的，用人单位应当依法与劳动者订立劳动合同；不完全符合确立劳动关系情形但企业对劳动者进行劳动管理的，指导企业与劳动者订立书面协议。", tags: ["劳动", "平台"] },
        { label: "保障基本权益", text: "推动平台企业制定并公布算法、派单、计酬、奖惩等直接涉及劳动者权益的制度规则和公示办法，保障劳动者知情权和监督权。", tags: ["劳动", "平台", "算法"] }
      ]
    },
    "涉外法治建设重点工作安排": {
      issuer: "中央全面依法治国委员会",
      date: "2024年",
      summary: "部署涉外法治建设阶段性重点任务，服务高水平对外开放。",
      clauses: [
        { label: "涉外仲裁", text: "支持国际商事仲裁机构发展，完善涉外仲裁司法审查规则，提升仲裁国际公信力和竞争力。", tags: ["仲裁", "涉外"] },
        { label: "人才培养", text: "加强涉外法治人才培养，建设通晓国际规则、善于处理涉外法律事务的法治人才队伍。", tags: ["仲裁", "涉外", "合规"] }
      ]
    }
  };

  function pickPolicyClauses(doc, keyword) {
    if (!doc || !doc.clauses || !doc.clauses.length) return [];
    const matched = doc.clauses.filter((clause) => !keyword || (clause.tags || []).includes(keyword) || clause.text.includes(keyword) || clause.label.includes(keyword));
    return (matched.length ? matched : doc.clauses).slice(0, 3);
  }

  function enrichPolicyItem(item) {
    const doc = POLICY_CONTENT[item.name];
    if (!doc) {
      return Object.assign({}, item, {
        issuer: "",
        effectiveDate: "",
        summary: "",
        clauses: [{ label: "政策要点", text: "暂未收录该文件的具体条文摘要，请查阅正式文本或官方发布平台。" }]
      });
    }
    return Object.assign({}, item, {
      issuer: doc.issuer,
      effectiveDate: doc.date,
      summary: doc.summary,
      clauses: pickPolicyClauses(doc, item.keyword)
    });
  }

  const POLICY = [
    ["数据", ["数字中国建设整体布局规划", "“十四五”数字经济发展规划", "网络数据安全管理条例"]],
    ["算法", ["互联网信息服务算法推荐管理规定", "新一代人工智能发展规划", "生成式人工智能服务管理暂行办法"]],
    ["人工智能", ["生成式人工智能服务管理暂行办法", "新一代人工智能发展规划"]],
    ["平台", ["关于平台经济领域的反垄断指南", "“十四五”市场监管现代化规划"]],
    ["认罪认罚", ["关于适用认罪认罚从宽制度的指导意见", "法治中国建设规划（2020-2025年）"]],
    ["刑事", ["法治中国建设规划（2020-2025年）", "“八五”普法规划"]],
    ["证据", ["关于加强新时代检察机关法律监督工作的意见", "法治中国建设规划（2020-2025年）"]],
    ["著作权", ["知识产权强国建设纲要（2021-2035年）", "“十四五”国家知识产权保护和运用规划"]],
    ["专利", ["知识产权强国建设纲要（2021-2035年）", "“十四五”国家知识产权保护和运用规划"]],
    ["涉外", ["关于加强新时代涉外法治工作的意见", "法治中国建设规划（2020-2025年）"]],
    ["行政", ["法治政府建设实施纲要（2021-2025年）", "“十四五”推进国家政务信息化规划"]],
    ["劳动", ["“十四五”就业促进规划", "关于维护新就业形态劳动者劳动保障权益的指导意见"]],
    ["商标", ["“十四五”国家知识产权保护和运用规划", "知识产权强国建设纲要（2021-2035年）"]],
    ["合规", ["关于加强新时代涉外法治工作的意见", "法治中国建设规划（2020-2025年）"]],
    ["仲裁", ["涉外法治建设重点工作安排", "关于加强新时代涉外法治工作的意见"]]
  ];

  function policiesForTopic(topic) {
    const matched = new Set();
    POLICY.forEach(([key, values]) => {
      if (topic.title.includes(key) || topic.direction.includes(key) || (topic.keywords || []).some((keyword) => keyword.includes(key))) {
        values.forEach((value) => matched.add(value));
      }
    });
    if (!matched.size) matched.add("法治中国建设规划（2020-2025年）");
    return [...matched];
  }

  function findRelatedPolicies(queryTopic, limit) {
    const items = [];
    const queryKeywords = queryTopic.keywords || [];
    POLICY.forEach(([key, policyNames]) => {
      const inTitle = queryTopic.title && queryTopic.title.includes(key);
      const inDirection = queryTopic.direction && queryTopic.direction.includes(key);
      const inKeywords = queryKeywords.some((keyword) => keyword.includes(key));
      if (!inTitle && !inDirection && !inKeywords) return;
      const reason = inTitle ? "课题标题关联" : inDirection ? "研究方向关联" : "申报关键词关联";
      policyNames.forEach((name) => items.push({ name: name, keyword: key, reason: reason, score: (inTitle ? 3 : 0) + (inDirection ? 2 : 0) + (inKeywords ? 2 : 0) }));
    });
    const map = new Map();
    items.forEach((item) => {
      const prev = map.get(item.name);
      if (!prev || item.score > prev.score) map.set(item.name, item);
    });
    let result = [...map.values()].sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
    if (!result.length) {
      result = [{ name: "法治中国建设规划（2020-2025年）", keyword: "法治", reason: "基础政策语境", score: 1 }];
    }
    return result.slice(0, limit || 8).map(enrichPolicyItem);
  }

  function inferDirectionFromTitle(title) {
    const rules = [["数据", "数字法治"], ["算法", "数字法治"], ["平台", "民商法治"], ["认罪认罚", "刑事法治"], ["刑事", "刑事法治"], ["证据", "刑事法治"], ["著作权", "知识产权法"], ["专利", "知识产权法"], ["商标", "知识产权法"], ["涉外", "国际法治"], ["仲裁", "国际法治"], ["合规", "国际法治"], ["行政", "行政法治"], ["复议", "行政法治"], ["案例", "司法制度"], ["审判", "司法制度"], ["劳动", "社会治理法"], ["用工", "社会治理法"]];
    const matched = rules.find((rule) => title.indexOf(rule[0]) !== -1);
    return matched ? matched[1] : "数字法治";
  }

  function clampNum(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function topicTokenSet(topic) {
    return tokenize([topic.title || "", topic.direction || "", (topic.keywords || []).join(" ")].join(" "));
  }

  function tokenOverlapSimilarity(topicA, topicB) {
    const a = new Set(topicTokenSet(topicA));
    const b = new Set(topicTokenSet(topicB));
    let overlap = 0;
    a.forEach((token) => { if (b.has(token)) overlap += 1; });
    const union = new Set([].concat(Array.from(a), Array.from(b))).size || 1;
    return overlap / union;
  }

  function policyOrientationParagraph(topic, policy) {
    const trigger = policy.keyword || (topic.keywords && topic.keywords[0]) || topic.direction;
    const clause = policy.clauses && policy.clauses[0];
    const excerpt = clause ? "政策明确要求：" + clause.text : policy.summary || "该文件与当前选题方向高度契合。";
    return "在「" + topic.direction + "」视域下，课题以「" + trigger + "」对接《" + policy.name + "》（" + (policy.reason || "政策关联") + "）。" + excerpt + "据此，可将本课题定位于回应" + trigger + "相关制度供给不足、规则协同不畅或救济机制待完善等实践问题，并在论证中突出政策目标与法学命题之间的对应关系。";
  }

  function technologiesForTopic(topic) {
    const techMap = [
      ["数据", ["大数据治理", "数据确权", "隐私计算"]],
      ["算法", ["算法推荐系统", "模型可解释性", "算法审计"]],
      ["人工智能", ["生成式人工智能", "大语言模型", "内容审核"]],
      ["平台", ["平台治理系统", "交易风控", "用户画像"]],
      ["证据", ["电子取证", "司法区块链", "证据存证"]],
      ["跨境", ["跨境数据流转", "合规审计系统", "数据分类分级"]],
      ["专利", ["专利信息分析", "知识图谱", "技术情报挖掘"]],
      ["著作权", ["数字水印", "内容识别", "版权追踪"]],
      ["劳动", ["平台调度算法", "职业伤害监测", "灵活用工管理"]],
      ["审判", ["类案检索", "裁判文书分析", "智慧法院"]],
      ["行政", ["政务数据开放", "数字政府平台", "智能审批"]]
    ];
    const matched = new Set();
    techMap.forEach(([key, vals]) => {
      if (topic.title.indexOf(key) !== -1 || (topic.keywords || []).some((item) => item.indexOf(key) !== -1)) {
        vals.forEach((val) => matched.add(val));
      }
    });
    if (!matched.size) {
      matched.add("案例数据库分析");
      matched.add("法律文本挖掘");
    }
    return Array.from(matched).slice(0, 5);
  }

  function adviceForTopic(topic, top, policyList, techList) {
    const similarity = top ? top.similarity : 0;
    if (similarity >= 0.84) {
      return "建议以「" + topic.direction + "」为主轴，重点强化新场景、新对象或新机制表达，避免与既有样本过近。";
    }
    if (similarity >= 0.68) {
      return "建议保留当前选题框架，并围绕 " + (policyList.slice(0, 2).map((item) => item.name).join("、") || "国家政策") + " 进一步充实立项依据。";
    }
    return "建议突出问题导向与前瞻价值，并补充 " + (techList.slice(0, 2).join("、") || "研究方法") + " 等支撑，增强论证完整度。";
  }

  function riskForTopic(top, policyList, techList) {
    const notes = [];
    if (top && top.similarity >= 0.86) notes.push("与历史样本贴近度较高，需避免重复表述。");
    if (policyList.length <= 2) notes.push("政策锚点偏少，可补足更直接的国家政策依据。");
    if (techList.length <= 2) notes.push("技术或方法支撑偏弱，建议补充案例、数据或工具路径。");
    return notes.length ? notes.join(" ") : "当前重复风险与支撑风险整体可控。";
  }

  function computeApprovalMetrics(topic, top, policyList, sim, policyWeightPercent) {
    const policyRaw = policyList.length
      ? policyList.reduce((sum, item) => sum + Math.min(Number(item.score) || 1, 5), 0) / (policyList.length * 5)
      : 0.34;
    const policyScore = Math.round(clampNum(policyRaw * 100, 36, 98));
    const simSlice = sim && sim.length ? sim.slice(0, 3) : [];
    let expBase = 0.35;
    if (simSlice.length) {
      expBase = simSlice.reduce((sum, item) => sum + item.similarity, 0) / simSlice.length;
    } else if (top) {
      expBase = top.similarity;
    } else {
      const peers = TOPICS.filter((item) => item.direction === topic.direction);
      if (peers.length) {
        expBase = peers.reduce((sum, item) => sum + tokenOverlapSimilarity(topic, item), 0) / peers.length;
      }
    }
    const experienceScore = Math.round(clampNum(expBase * 100, 28, 96));
    const policyW = clampNum(policyWeightPercent, 0, 100) / 100;
    const approvalIndex = Math.round(policyScore * policyW + experienceScore * (1 - policyW));
    return { policyScore: policyScore, experienceScore: experienceScore, approvalIndex: approvalIndex };
  }

  function buildDirectionPositionRows(topic, sim) {
    const byYear = new Map();
    function ingest(year, score) {
      const y = Number(year);
      const s = Number(score) || 0;
      if (!y || s <= 0) return;
      const prev = byYear.get(y);
      if (!prev || s > prev.score) byYear.set(y, { year: y, score: s });
    }
    TOPICS.filter((item) => item.direction === topic.direction).forEach((item) => ingest(item.year, tokenOverlapSimilarity(topic, item)));
    (sim || []).forEach((item) => ingest(item.year, item.similarity));
    let rows = Array.from(byYear.values()).sort((a, b) => b.year - a.year).slice(0, 6);
    if (!rows.length) return [];
    const scores = rows.map((row) => row.score);
    const maxS = Math.max.apply(null, scores);
    const minS = Math.min.apply(null, scores);
    const span = maxS - minS;
    const yearSpan = Math.max(1, rows[0].year - rows[rows.length - 1].year);
    return rows.slice(0, 5).map((row, idx) => {
      let value;
      if (span < 0.06) {
        const recency = (row.year - rows[rows.length - 1].year) / yearSpan;
        value = Math.round(clampNum(52 + recency * 36 + (maxS - row.score) * 8 - idx * 2, 36, 92));
      } else {
        const norm = (row.score - minS) / span;
        const recency = (row.year - rows[rows.length - 1].year) / yearSpan;
        value = Math.round(clampNum(40 + norm * 46 + recency * 14, 36, 94));
      }
      return { year: row.year, value: value };
    });
  }

  function expertRelationship(leadName, reviewerName) {
    const network = buildExpertNetwork(leadName);
    const link = network.links.find((item) => {
      return (item.source === leadName && item.target === reviewerName) || (item.source === reviewerName && item.target === leadName);
    });
    const times = link ? link.value : 0;
    const closeness = times >= 5 ? "高" : times >= 3 ? "中" : times >= 1 ? "低" : "弱";
    return { times: times, closeness: closeness };
  }

  function reviewerReasonLines(lead, expert) {
    const lines = [];
    const primaryDirection = expert.directions[0] || "法学交叉研究";
    lines.push("评审建议：重点关注其在" + primaryDirection + "方向的规范研究与实践评估经验，与负责人形成互补。");
    if (lead) {
      const relation = expertRelationship(lead.name, expert.name);
      lines.push("关系说明：与负责人的合作熟悉度为" + relation.closeness + "（共同讲座 " + relation.times + " 次），用于辅助判断评议独立性。");
    }
    if (expert.matchDetail && expert.matchDetail.sections && expert.matchDetail.sections.length) {
      expert.matchDetail.sections.forEach((section) => {
        lines.push(section.title + section.text);
      });
    }
    return lines;
  }

  function buildTopicAnalysisReport(topic, options) {
    options = options || {};
    const lead = options.lead || null;
    const selectedReviewers = options.selectedReviewers || [];
    const recommendedReviewers = options.recommendedReviewers || recommendExperts(topic, 6).filter((expert) => !lead || expert.name !== lead.name);
    const approvalPolicyWeight = typeof options.approvalPolicyWeight === "number" ? options.approvalPolicyWeight : 45;
    const sim = findSimilarTopics(topic, 5);
    const top = sim[0] || null;
    const policyList = findRelatedPolicies(topic, 5);
    const policyCatalog = findRelatedPolicies(topic, 8);
    const techList = technologiesForTopic(topic);
    const metrics = computeApprovalMetrics(topic, top, policyList, sim, approvalPolicyWeight);
    const directionRows = buildDirectionPositionRows(topic, sim);
    const same = top ? (topic.keywords || []).filter((keyword) => top.keywords.includes(keyword)).slice(0, 5) : [];
    const uniqueKeywords = unique(topic.keywords || []);
    const diff = uniqueKeywords.filter((keyword) => !same.includes(keyword)).slice(0, 5);
    const lines = [
      "课题立项论证报告",
      "生成时间：" + new Date().toLocaleString("zh-CN"),
      "",
      "【课题名称】" + topic.title,
      "【研究方向】" + topic.direction,
      "",
      "══════════════════════════════════════",
      "一、单题专项分析（工作台）",
      "══════════════════════════════════════",
      "",
      "（一）立项指数评估",
      "政策匹配得分：" + metrics.policyScore,
      "经验参照得分：" + metrics.experienceScore,
      "推荐立项指数：" + metrics.approvalIndex,
      "权重说明：综合得分 = 政策匹配 " + approvalPolicyWeight + "% + 经验参照 " + (100 - approvalPolicyWeight) + "%",
      "",
      "（二）单题与历史方向位置关系（按年份降序）"
    ];
    if (directionRows.length) {
      directionRows.forEach((row) => {
        lines.push(row.year + " 年 · 方向位置指数 " + row.value);
      });
    } else {
      lines.push("暂无足够接近的历史方向样本。");
    }
    lines.push(
      "",
      "（三）关键词关系",
      "共性关键词：" + (same.length ? same.join("、") : "较少"),
      "差异关键词：" + (diff.length ? diff.join("、") : "较少"),
      "",
      "（四）政策导向分析"
    );
    if (policyList.length) {
      policyList.forEach((policy, index) => {
        lines.push("");
        lines.push(index + 1 + ". 《" + policy.name + "》");
        if (policy.summary) lines.push("政策摘要：" + policy.summary);
        lines.push(policyOrientationParagraph(topic, policy));
        if (policy.clauses && policy.clauses[0]) {
          lines.push("政策条文：" + policy.clauses[0].label + " — " + policy.clauses[0].text);
        }
      });
    } else {
      lines.push("暂未匹配到国家政策，请补充课题标题或关键词。");
    }
    lines.push(
      "",
      "（五）案例趋势与论证建议",
      "最接近历史课题：" + (top ? top.title + "（相似度 " + Math.round(top.similarity * 100) + "%）" : "暂无明显匹配"),
      "与历史课题的共性：" + (same.length ? same.join("、") : "当前共性关键词较少，说明该题目更偏新议题，或仍需补充法学核心术语。"),
      "与历史课题的差异：" + (diff.length ? diff.join("、") : "当前表述较稳健，创新点可能更多体现在场景组合而非关键词本身。"),
      "立项建议：" + adviceForTopic(topic, top, policyList, techList),
      "风险提示：" + riskForTopic(top, policyList, techList)
    );
    if (sim.length) {
      lines.push("", "（六）对标历史样本");
      sim.slice(0, 3).forEach((item, index) => {
        lines.push(
          index + 1 + ". " + item.title,
          "   相似度 " + Math.round(item.similarity * 100) + "% · " + item.direction + " · " + item.year + " 年 · " + item.type,
          "   关联关键词：" + item.keywords.slice(0, 5).join("、")
        );
      });
    }
    lines.push(
      "",
      "══════════════════════════════════════",
      "二、团队配置",
      "══════════════════════════════════════",
      ""
    );
    if (lead) {
      lines.push("【项目负责人】", lead.name + " · " + lead.institution + " · " + lead.title);
      if (lead.matchDetail && lead.matchDetail.sections) {
        lead.matchDetail.sections.forEach((section) => lines.push(section.title + section.text));
      }
      lines.push("");
    }
    lines.push("【评审专家】");
    if (selectedReviewers.length) {
      lines.push("（以下专家已确定为评审组成员）");
      selectedReviewers.forEach((expert, index) => {
        lines.push("");
        lines.push(index + 1 + ". " + expert.name + " · " + expert.institution);
        reviewerReasonLines(lead, expert).forEach((line) => lines.push("   " + line));
      });
    } else {
      lines.push("（尚未最终确定评审专家，以下为系统推荐名单及推荐理由，供遴选参考）");
      recommendedReviewers.slice(0, 5).forEach((expert, index) => {
        lines.push("");
        lines.push(index + 1 + ". " + expert.name + " · " + expert.institution + " · 匹配度 " + Math.round(expert.score * 100) + "%");
        lines.push("   研究方向：" + expert.directions.join("、"));
        reviewerReasonLines(lead, expert).forEach((line) => lines.push("   " + line));
      });
    }
    lines.push(
      "",
      "══════════════════════════════════════",
      "三、补充材料（详情页）",
      "══════════════════════════════════════",
      "",
      "【相似历史课题】"
    );
    sim.slice(0, 5).forEach((item, index) => {
      lines.push(index + 1 + ". " + item.title + "（" + item.year + " 年，相似度 " + Math.round(item.similarity * 100) + "%）");
    });
    if (!sim.length) lines.push("暂无高相似历史课题。");
    lines.push("", "【相关政策清单】");
    policyCatalog.forEach((policy, index) => {
      lines.push(index + 1 + ". " + policy.name + (policy.keyword ? "（关联词：" + policy.keyword + "）" : ""));
    });
    lines.push("", "—— 本报告由法学研究选题平台自动生成，仅供立项论证演示参考。");
    return lines.join("\n");
  }

  window.ResearchPlatformData = { TOPICS: TOPICS, EXPERTS: EXPERTS, LECTURES: LECTURES, POLICY: POLICY, tokenize: tokenize, getTopicByTitle: getTopicByTitle, getExpertByName: getExpertByName, findSimilarTopics: findSimilarTopics, findRelatedPolicies: findRelatedPolicies, policiesForTopic: policiesForTopic, recommendExperts: recommendExperts, buildLeadRecommendDetail: buildLeadRecommendDetail, buildExpertNetwork: buildExpertNetwork, inferDirectionFromTitle: inferDirectionFromTitle, buildTopicAnalysisReport: buildTopicAnalysisReport };
}());
