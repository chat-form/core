export const ad = [
  {
    "id": "start",
    "question": "您是否考虑过在抖音上投放广告？",
    "answers": [
      {
        "name": "是",
        "key": "yes",
        "next": "budget"
      },
      {
        "name": "否",
        "key": "no",
        "next": "Thanks"
      }
    ]
  },
  {
    "id": "budget",
    "question": "您的广告预算是多少？",
    "answers": [
      {
        "name": "1000元以下",
        "key": "less-than-1000",
        "next": "ad-format"
      },
      {
        "name": "1000元-5000元",
        "key": "1000-5000",
        "next": "ad-format"
      },
      {
        "name": "5000元以上",
        "key": "more-than-5000",
        "next": "ad-format"
      }
    ]
  },
  {
    "id": "ad-format",
    "question": "您更喜欢哪种广告形式？",
    "answers": [
      {
        "name": "图片",
        "key": "image",
        "next": "target-audience"
      },
      {
        "name": "视频",
        "key": "video",
        "next": "target-audience"
      }
    ]
  },
  {
    "id": "target-audience",
    "question": "您的目标受众是哪些人群？",
    "answers": [
      {
        "name": "青年人",
        "key": "youth",
        "next": "ad-frequency"
      },
      {
        "name": "中年人",
        "key": "middle-aged",
        "next": "ad-frequency"
      },
      {
        "name": "老年人",
        "key": "elderly",
        "next": "ad-frequency"
      }
    ]
  },
  {
    "id": "ad-frequency",
    "question": "您希望您的广告在用户看到多少次后停止展示？",
    "answers": [
      {
        "name": "1-3次",
        "key": "1-3",
        "next": "ad-placement"
      },
      {
        "name": "3-5次",
        "key": "3-5",
        "next": "ad-placement"
      },
      {
        "name": "5次以上",
        "key": "more-than-5",
        "next": "ad-placement"
      }
    ]
  },
  {
    "id": "ad-placement",
    "question": "您希望您的广告放置在哪个位置？",
    "answers": [
      {
        "name": "首页",
        "key": "homepage",
        "next": "ad-length"
      },
      {
        "name": "搜索页",
        "key": "search-page",
        "next": "ad-length"
      },
      {
        "name": "个人主页",
        "key": "personal-page",
        "next": "ad-length"
      }
    ]
  },
  {
    "id": "ad-length",
    "question": "您希望您的广告时长是多长？",
    "answers": [
      {
        "name": "15秒以下",
        "key": "less-than-15",
        "next": "ad-position"
      },
      {
        "name": "15秒-30秒",
        "key": "15-30",
        "next": "ad-position"
      },
      {
        "name": "30秒以上",
        "key": "more-than-30",
        "next": "ad-position"
      }
    ]
  },
  {
    "id": "ad-position",
    "question": "您希望您的广告在视频中的哪个位置出现？",
    "answers": [
      {
        "name": "开头",
        "key": "beginning",
        "next": "ad-effectiveness"
      },
      {
        "name": "中间",
        "key": "middle",
        "next": "ad-effectiveness"
      },
      {
        "name": "结尾",
        "key": "end",
        "next": "ad-effectiveness"
      }
    ]
  },
  {
    "id": "ad-effectiveness",
    "question": "您希望您的广告达到什么效果？",
    "answers": [
      {
        "name": "品牌知名度提升",
        "key": "brand-awareness",
        "next": "ad-purpose"
      },
      {
        "name": "产品销售提升",
        "key": "product-sales",
        "next": "ad-purpose"
      },
      {
        "name": "用户互动提升",
        "key": "user-engagement",
        "next": "ad-purpose"
      }
    ]
  },
  {
    "id": "ad-purpose",
    "question": "您希望您的广告达到什么目的？",
    "answers": [
      {
        "name": "提高品牌知名度",
        "key": "brand-awareness",
        "next": "ad-budget"
      },
      {
        "name": "增加产品销售",
        "key": "product-sales",
        "next": "ad-budget"
      },
      {
        "name": "增加用户互动",
        "key": "user-engagement",
        "next": "ad-budget"
      }
    ]
  },
  {
    "id": "ad-budget",
    "question": "您希望您的广告总预算是多少？",
    "answers": [
      {
        "name": "5000元以下",
        "key": "less-than-5000",
        "next": "ad-schedule"
      },
      {
        "name": "5000元-10000元",
        "key": "5000-10000",
        "next": "ad-schedule"
      },
      {
        "name": "10000元以上",
        "key": "more-than-10000",
        "next": "ad-schedule"
      }
    ]
  },
  {
    "id": "ad-schedule",
    "question": "您希望您的广告投放时间是？",
    "answers": [
      {
        "name": "全天",
        "key": "all-day",
        "next": "ad-region"
      },
      {
        "name": "工作日",
        "key": "weekday",
        "next": "ad-region"
      },
      {
        "name": "周末",
        "key": "weekend",
        "next": "ad-region"
      }
    ]
  },
  {
    "id": "ad-region",
    "question": "您希望您的广告投放地域是？",
    "answers": [
      {
        "name": "全国",
        "key": "all-country",
        "next": "ad-platform"
      },
      {
        "name": "区域",
        "key": "region",
        "next": "ad-platform"
      },
      {
        "name": "城市",
        "key": "city",
        "next": "ad-platform"
      }
    ]
  },
  {
    "id": "ad-platform",
    "question": "您希望您的广告在哪个平台展示？",
    "answers": [
      {
        "name": "抖音",
        "key": "douyin",
        "next": "ad-type"
      },
      {
        "name": "抖音火山版",
        "key": "huoshan",
        "next": "ad-type"
      }
    ]
  },
  {
    "id": "ad-type",
    "question": "您希望您的广告是什么类型？",
    "answers": [
      {
        "name": "品牌广告",
        "key": "brand-ad",
        "next": "ad-form"
      },
      {
        "name": "电商广告",
        "key": "ecommerce-ad",
        "next": "ad-form"
      },
      {
        "name": "游戏广告",
        "key": "game-ad",
        "next": "ad-form"
      }
    ]
  },
  {
    "id": "ad-form",
    "question": "您希望您的广告是哪种形式？",
    "answers": [
      {
        "name": "橱窗广告",
        "key": "window-ad",
        "next": "ad-target"
      },
      {
        "name": "直接购买",
        "key": "direct-purchase",
        "next": "ad-target"
      },
      {
        "name": "转化营销",
        "key": "conversion-marketing",
        "next": "ad-target"
      }
    ]
  },
  {
    "id": "ad-target",
    "question": "您希望您的广告的投放目标是？",
    "answers": [
      {
        "name": "提高品牌知名度",
        "key": "brand-awareness",
        "next": "Thanks"
      },
      {
        "name": "增加产品销售",
        "key": "product-sales",
        "next": "Thanks"
      },
      {
        "name": "增加用户互动",
        "key": "user-engagement",
        "next": "Thanks"
      }
    ]
  },
  {
    "id": "Thanks",
    "question": "感谢您的回答！",
    "answers": []
  }
]