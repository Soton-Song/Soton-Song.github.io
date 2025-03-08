// 模拟的 JSON 数据
const data = [
  {
    character: "许医生",
    date: "冬4日",
    preferences: {
      favorite: [
        { item: "持刀玩偶", points: 20 },
        { item: "西兰花王冠", points: 18 },
        { item: "气球饮料瓶", points: 15 },
        { item: "精钢小铲子", points: 15 },
        { item: "东漫游记", points: 15 },
        { item: "橙色沙发", points: 15 },
        { item: "深思者", points: 15 },
        { item: "神灯", points: 12 },
        { item: "神奇玻璃罐", points: 12 },
        { item: "酱烤鲑鱼片", points: 10 },
        { item: "玫瑰花", points: 10 },
        { item: "椰汁牛排", points: 10 },
        { item: "锥形壁灯", points: 10 }
      ],
      like: [
        { item: "护身符", points: 8 },
        { item: "红宝石", points: 8 },
        { item: "药汁", points: 6 },
        { item: "草药泥", points: 6 },
        { item: "简易药膏", points: 6 },
        { item: "苹果汁", points: 3 },
        { item: "蘑菇炖肉", points: 3 },
        { item: "解毒草", points: 2 },
        { item: "草药", points: 2 },
        { item: "白色木槿花", points: 2 }
      ],
      neutral: [
        { item: "蔬菜", points: 2 },
        { item: "牛奶", points: 3 }
      ]
    }
  },
  {
    character: "盖斯特",
    date: "夏11日",
    preferences: {
      favorite: [
        { item: "三明治", points: 30 },
        { item: "双层床", points: 30 }
      ],
      like: [
        { item: "卡鲁模型", points: 15 },
        { item: "凯旋模型", points: 12 }
      ],
      neutral: [
        { item: "红宝石", points: 8 },
        { item: "蔬菜", points: 2 }
      ]
    }
  }
];

// 搜索功能
const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  resultsDiv.innerHTML = ""; // 清空结果

  if (query) {
    data.forEach(character => {
      const matchedItems = [];

      // 搜索角色名
      if (character.character.includes(query)) {
        matchedItems.push(...Object.entries(character.preferences).flatMap(([key, items]) =>
          items.map(item => ({ ...item, type: key }))
        ));
      }

      // 搜索物品名
      Object.entries(character.preferences).forEach(([key, items]) => {
        items.forEach(item => {
          if (item.item.includes(query)) {
            matchedItems.push({ ...item, type: key });
          }
        });
      });

      // 显示匹配结果
      if (matchedItems.length > 0) {
        const characterDiv = document.createElement("div");
        characterDiv.className = "character";
        characterDiv.textContent = `角色: ${character.character} (${character.date})`;
        resultsDiv.appendChild(characterDiv);

        matchedItems.forEach(match => {
          const itemDiv = document.createElement("div");
          itemDiv.className = "item";
          itemDiv.textContent = `${match.type === "favorite" ? "喜爱" : match.type === "like" ? "喜欢" : "中立"}: ${match.item} (+${match.points})`;
          resultsDiv.appendChild(itemDiv);
        });
      }
    });
  }
});
