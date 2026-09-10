export interface CompanyInfo {
  fullName: string;
  shortName: string;
  displayName: string;
  englishName: string;
  phone: string;
  tel: string;
  address: string;
  shortAddress: string;
  foundingDate: string;
  postalAddress: {
    addressCountry: string;
    addressRegion: string;
    addressLocality: string;
    streetAddress: string;
  };
  serviceArea: string[];
  description: string;
}

export interface Service {
  id: "new-home" | "renovation" | "partial" | "design";
  title: string;
  shortDescription: string;
  description: string;
  benefits: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingMinutes: number;
  publishedAt: string;
  image: string;
  relatedServiceIds: Service['id'][];
  sections: GuideSection[];
}

const companyName = "凯里绿色家装饰";
const companyPhone = "19885332380";
const companyStreetAddress = "城西街道迎宾大道77号隆源公馆商铺11-3-202";

export const company: CompanyInfo = {
  fullName: companyName,
  shortName: companyName,
  displayName: companyName,
  englishName: "GREENHOME",
  phone: companyPhone,
  tel: `tel:${companyPhone}`,
  address:
    `贵州省黔东南苗族侗族自治州凯里市${companyStreetAddress}`,
  shortAddress: "凯里市迎宾大道77号 · 隆源公馆",
  foundingDate: "2023-02-01",
  postalAddress: {
    addressCountry: "CN",
    addressRegion: "贵州省",
    addressLocality: "凯里市",
    streetAddress: companyStreetAddress,
  },
  serviceArea: ["凯里", "黔东南"],
  description:
    `${companyName}面向凯里及黔东南家庭，提供新房装修、旧房翻新、局部改造与住宅设计服务。装修咨询电话：${companyPhone}，可沟通户型、预算与装修范围。`,
};

export const services: Service[] = [
  {
    id: "new-home",
    title: "新房装修",
    shortDescription: "从一张户型图，到一家人的日常。",
    description:
      "把生活习惯、空间布局与预算一起考虑，围绕设计、材料选配、施工和工程管理，逐步落实新家的装修方案。",
    benefits: [
      "家庭需求与户型沟通",
      "材料配置与预算清单",
      "施工组织与节点验收",
    ],
  },
  {
    id: "renovation",
    title: "旧房翻新",
    shortDescription: "留住熟悉的生活，改善住得不顺的地方。",
    description:
      "先看清原有水电、墙面和防水状况，再决定保留、维修或更换的范围，让翻新回应采光、收纳与使用上的真实问题。",
    benefits: [
      "房屋现状与改造需求评估",
      "拆改范围与成品保护沟通",
      "新旧工序与材料衔接",
    ],
  },
  {
    id: "partial",
    title: "局部改造",
    shortDescription: "从厨房、卫浴或一面墙，开始改变。",
    description:
      "围绕厨房、卫生间、墙面或水电等局部需求制定方案，同时考虑相邻空间保护、设备点位和施工期间的生活安排。",
    benefits: [
      "明确单个空间的使用需求",
      "核对水电与设备安装条件",
      "评估与原有空间的衔接",
    ],
  },
  {
    id: "design",
    title: "住宅设计",
    shortDescription: "好看的背后，是更合适的尺度与动线。",
    description:
      "从户型、常住成员、生活习惯和预算出发，讨论动线、采光、收纳与材料搭配，让设计兼顾居住感受和施工落地。",
    benefits: [
      "生活习惯与功能需求梳理",
      "空间布局与收纳规划",
      "设计、选材与施工协同",
    ],
  },
];

export const companyFaqItems: FaqItem[] = [
  {
    question: `${company.fullName}网站是做什么的？`,
    answer: company.description,
  },
  {
    question: `装修怎么联系${company.fullName}？`,
    answer:
      `${company.fullName}装修咨询电话为 ${company.phone}。如有凯里及黔东南地区的装修需求，可以先电话说明房屋位置、面积和现状，并准备户型图、大致预算与装修需求。具体承接范围需沟通确认。`,
  },
];

export const faqItems: FaqItem[] = [
  ...companyFaqItems,
  {
    question: "凯里绿色家装饰在哪里？可以服务哪些地方？",
    answer:
      `${company.fullName}位于${company.address}，主要服务凯里及黔东南地区。周边县市、乡镇项目需要结合位置、施工内容和现场管理条件确认，建议先电话沟通。`,
  },
  {
    question: "第一次咨询，需要准备什么？",
    answer:
      "可以先准备户型图、房屋所在位置、面积、房屋现状，以及大致预算和期望入住时间。再想一想常住人口、收纳需求和目前最想解决的问题，方便围绕实际生活沟通方案。",
  },
  {
    question: "只知道房屋面积，可以直接报价吗？",
    answer:
      "面积可以帮助初步沟通，但不能单独决定总价。房屋现状、拆改范围、水电改造量、柜体数量及材料配置都会影响费用。建议结合量房和明确方案，逐项核对工程量、材料规格与预算清单。",
  },
  {
    question: "旧房的水电一定要全部重新做吗？",
    answer:
      "不一定。需要检查原有管线材质、老化情况、容量及布局，再结合新的电器和空间需求判断。现场检查后决定保留、局部调整或整体更换，比只按房龄判断更稳妥。",
  },
  {
    question: "只翻新厨房或卫生间，可以做吗？",
    answer:
      "可以围绕厨房、卫生间等局部改造需求沟通。具体范围需要检查原有防水、管道、墙地面基层和设备条件，并确认成品保护、施工衔接和生活安排，最终以现场方案为准。",
  },
  {
    question: "装修过程中，哪些地方需要重点验收？",
    answer:
      "建议在水电、防水、瓷砖、吊顶及墙面等关键工序分别核验。尤其是后续会被覆盖的水电和防水，应核对材料、保留照片与测试记录，发现问题后及时处理，再衔接后续施工。",
  },
  {
    question: "人在外地，能先沟通凯里的房子装修吗？",
    answer:
      "可以先通过电话沟通房屋情况和装修需求，再确认项目适合的沟通方式。材料、隐蔽工程验收和设计变更等重要节点，建议由业主本人或授权人员确认；具体现场管理安排需结合项目约定。",
  },
  {
    question: "工期和售后保修怎么约定？",
    answer:
      "工期需要结合施工范围、材料交付和物业要求确定。签约时应分别确认各项目的保修范围、期限、报修方式与责任，并保存合同、材料清单和验收记录。公司具体工期与售后政策以正式合同为准。",
  },
];

export const guides: Guide[] = [
  {
    slug: "compare-renovation-quotes",
    publishedAt: "2026-09-04",
    image: "/images/detail.webp",
    relatedServiceIds: ["new-home", "design"],
    title: "看懂装修报价，先把两份清单放在同一把尺上",
    description:
      "总价之前，先核对项目范围、工程量、材料型号与变更规则，让每一笔预算有具体去处。",
    category: "预算准备",
    readingMinutes: 3,
    sections: [
      {
        heading: "先确认两份报价，做的是不是同一件事",
        paragraphs: [
          "面对两份总价不同的报价，先别急着选便宜的一份。把户型、需要装修的区域、拆改范围和材料档次对齐，再比较费用。同样写着“厨房装修”，可能一份包含拆除、清运和基层处理，另一份只列铺贴与安装。总价只有放在相同范围里，才有比较的意义。",
          "可以把需求整理成一页清单：哪些空间要做，哪些设施保留，哪些材料自己购买。让每家按相同需求说明包含项与未包含项，减少沟通中的误解。",
        ],
      },
      {
        heading: "看清计量方式，也看清材料具体是谁",
        paragraphs: [
          "逐项核对名称、单位、工程量和单价。墙面面积怎么计算，柜体按什么方式计量，水电是按实际工程量还是约定范围计费，都应写清。遇到“按实际发生结算”的项目，进一步确认测量与确认方式。",
          "材料只写品牌往往还不够，同一品牌不同系列和规格也会有差别。预算附件应尽量明确品牌、型号、规格、使用位置和数量，并说明送货、搬运、安装与退补货由谁负责。",
        ],
      },
      {
        heading: "把变化的处理方式，放在开工之前",
        paragraphs: [
          "旧房拆除后可能发现原有基层或管线问题，业主也可能调整需求。与其只问“会不会增项”，更有用的是确认发生变化时如何记录、如何计价、由谁批准，以及是否影响工期。新增或减少的项目，应先形成书面确认，再安排施工。",
          "最后将设计方案、预算清单、材料配置和付款节点一起核对。重要沟通留存到合同附件或变更单中。凯里绿色家装饰的具体报价需结合房屋现状与方案确定；带上户型图和需求清单，会让第一次预算沟通更有效。",
        ],
      },
    ],
  },
  {
    slug: "plan-an-old-home-renovation",
    publishedAt: "2026-09-04",
    image: "/images/living.webp",
    relatedServiceIds: ["renovation", "partial"],
    title: "旧房翻新之前，先决定什么值得留下",
    description:
      "从房屋现状和生活问题开始，理清保留、维修与更换的边界，再安排预算和施工。",
    category: "旧房改造",
    readingMinutes: 3,
    sections: [
      {
        heading: "从住得不顺的地方开始",
        paragraphs: [
          "旧房翻新不必一开始就照着效果图全部重来。先记录日常最不方便的地方：厨房插座不够、卫生间收纳不足、客厅采光被遮挡，还是老人起居动线太绕。再区分“必须解决”和“希望改善”，让预算先照顾真正影响生活的问题。",
          "同时盘点准备保留的家具、电器、门窗和地板，记录尺寸、状态和位置。能够继续使用的物品，也需要确认是否适合新的布局，以及施工期间如何搬移和保护。",
        ],
      },
      {
        heading: "先检查，再决定拆改范围",
        paragraphs: [
          "旧房的风险往往藏在表面之下。勘查时应关注墙面基层、渗水痕迹、原有管道、电路容量和设备点位。水电是否全部更换，需要结合材料、老化情况、实际负荷和新需求判断，不能只按房龄做决定。涉及结构、燃气和公共管线的改动，应先交由相关专业方确认。",
          "将需要保留、维修和更换的内容分别写入方案。暂时无法确认的隐蔽问题，也应提前说明检查条件和后续处理流程，避免把不确定项目当作已经确定的施工范围。",
        ],
      },
      {
        heading: "把施工期间的生活，也纳入方案",
        paragraphs: [
          "拆除清运、噪声、用水用电和材料搬运，都会影响日常生活。开工前了解物业施工要求，确认公共区域保护与垃圾清运安排；如果翻新厨房或卫生间，还需要提前安排做饭、洗浴和临时居住。",
          "旧房预算应关注拆除、基层修复和成品保护等容易漏看的项目，并为经检查确认的调整留出沟通空间。每次变更先确认范围、费用和工期，再进入施工。凯里绿色家装饰可围绕凯里及黔东南住宅翻新需求沟通，具体方案以现场检查结果和正式约定为准。",
        ],
      },
    ],
  },
  {
    slug: "check-water-electricity-waterproofing",
    publishedAt: "2026-09-04",
    image: "/images/kitchen.webp",
    relatedServiceIds: ["new-home", "renovation", "partial"],
    title: "水电与防水，验收要赶在它们被覆盖之前",
    description:
      "核对材料、检查重点节点、保留测试与影像记录，让看不见的工程也有据可查。",
    category: "施工验收",
    readingMinutes: 3,
    sections: [
      {
        heading: "开工前，把使用需求和材料先对齐",
        paragraphs: [
          "水电验收的准备从施工前就开始。把主要电器、插座、照明和用水设备的位置与设计方案对照，避免施工后才发现点位不够或被家具遮挡。材料进场时核对品牌、型号和规格，确认与清单一致，再进入相应工序。",
          "对普通业主而言，重点是看清方案和记录；电气检测、管道测试等专业操作应由具备相应能力的人员完成，不宜自行拆接线路或操作带电设备。",
        ],
      },
      {
        heading: "水电验收，不只看排列是否整齐",
        paragraphs: [
          "现场核验应关注管线布局是否符合方案、固定与保护是否到位、强弱电处理是否规范，以及设备安装位置是否方便使用和维护。整齐的照片可以辅助了解施工，却不能替代功能与安全检查。",
          "封槽或覆盖前，应按适用规范和项目要求完成相应测试，保留检测结果、整改记录和管线走向照片。照片尽量能识别房间与位置，方便日后安装柜体、打孔或检修时查阅。",
        ],
      },
      {
        heading: "防水看节点，也看后续保护",
        paragraphs: [
          "防水施工应关注基层情况，以及墙地交界、管根、地漏和门槛等部位的处理。防水范围与施工方法需结合使用区域、材料说明和项目方案确定，不能只凭涂层颜色判断质量。完成后由施工方按适用要求进行闭水或蓄水检查，并协调观察相关位置有无渗漏。",
          "验收发现的问题应整改并复查，再衔接后续工序；后续铺贴和安装也要注意保护已完成的防水层。最终留存材料清单、现场照片、测试和验收记录。这篇是业主沟通清单，具体施工参数与验收标准应由专业人员按项目条件确认，售后责任以正式合同为准。",
        ],
      },
    ],
  },
];
