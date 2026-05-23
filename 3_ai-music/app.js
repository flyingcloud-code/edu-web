var promptManuallyEdited = false;

function get(id) {
  return document.getElementById(id);
}

function scrollToId(id) {
  var el = get(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function val(id, fallback) {
  var el = get(id);
  var value = el ? String(el.value || "").trim() : "";
  return value || fallback;
}

function checked(name) {
  return Array.from(document.querySelectorAll('input[name="' + name + '"]:checked')).map(function (el) {
    return el.value;
  });
}

function radio(name) {
  var el = document.querySelector('input[name="' + name + '"]:checked');
  return el ? el.value : "";
}

function setStory(title, hero, scene, story) {
  get("title").value = title;
  get("hero").value = hero;
  get("scene").value = scene;
  get("storyText").value = story;
  makeLyrics();
}

function makeLyrics() {
  var hero = val("hero", "我").replace("一只", "");
  var scene = val("scene", "远方");
  get("lyrics").value = [
    "我和" + hero + "来到" + scene,
    "看见光芒在前方轻轻闪亮",
    "心里有一点紧张又期待",
    "我要把梦想唱给远方"
  ].join("\n");
  refresh(true);
}

function loadLyricsPreset(key) {
  if (!window.LYRICS_PRESETS || !window.LYRICS_PRESETS[key]) {
    alert("没有找到这个歌词模板。");
    return;
  }
  get("lyrics").value = window.LYRICS_PRESETS[key].lyrics;
  var songRadio = document.querySelector('input[name="songType"][value="song"]');
  if (songRadio) songRadio.checked = true;
  refresh(true);
}

function structureValue(selectId, customId) {
  var selected = get(selectId).value;
  var custom = val(customId, "");
  if (selected === "自定义" && custom) return custom;
  if (selected === "自定义") return "自定义音乐变化：请描述这一段的声音变化。";
  return selected;
}

function data() {
  return {
    type: radio("songType") || "bgm",
    title: val("title", "我的音乐作品"),
    hero: val("hero", "一个主角"),
    scene: val("scene", "一个场景"),
    story: val("storyText", "一个故事"),
    lyrics: val("lyrics", ""),
    moods: checked("moods").join("、") || "开心",
    tempo: get("tempo").value,
    usage: get("usage").value,
    voice: get("voice").value,
    style: checked("style").join(" + ") || "儿童动画",
    instruments: checked("instruments").join("、") || "钢琴",
    s1: structureValue("s1", "s1Custom"),
    s2: structureValue("s2", "s2Custom"),
    s3: structureValue("s3", "s3Custom"),
    s4: structureValue("s4", "s4Custom"),
    reason: val("reason", "我觉得这一版最适合我的故事。")
  };
}

function typeName(type) {
  if (type === "song") return "带歌词歌曲";
  if (type === "lyrics_ai") return "AI 补歌词歌曲";
  return "纯音乐 BGM";
}

function buildPrompt() {
  var d = data();
  var lines = [];

  if (d.type === "song") {
    lines.push("请生成一首适合小学生 AI MV 的中文歌曲，需要有人声演唱。");
  } else if (d.type === "lyrics_ai") {
    lines.push("请先根据故事补全一段四句儿童歌词，再生成一首适合小学生 AI MV 的中文歌曲，需要有人声演唱。");
  } else {
    lines.push("请生成一段适合小学生 AI MV 的纯音乐配乐。不要人声，不要歌词。");
  }

  lines.push("");
  lines.push("作品名：" + d.title);
  lines.push("故事：" + d.story);
  lines.push("主角：" + d.hero);
  lines.push("场景：" + d.scene);

  if (d.type !== "bgm") {
    lines.push("");
    lines.push("歌词：");
    lines.push(d.lyrics);
  }

  lines.push("");
  lines.push("音乐情绪：" + d.moods);
  lines.push("音乐风格：" + d.style);
  lines.push("速度：" + d.tempo);
  lines.push("希望使用的乐器或声音：" + d.instruments);

  if (d.type !== "bgm") {
    lines.push("人声要求：" + d.voice);
  }

  lines.push("用途：" + d.usage);
  lines.push("");
  lines.push("音乐结构：");
  lines.push("0–8秒：" + d.s1);
  lines.push("8–20秒：" + d.s2);
  lines.push("20–35秒：" + d.s3);
  lines.push("35–45秒：" + d.s4);
  lines.push("");
  lines.push("要求：");
  lines.push("1. 长度约 30 秒到 1 分钟。");
  lines.push("2. 旋律简单清楚，适合儿童动画或 AI MV。");
  lines.push("3. 情绪要和故事匹配，不要太吵，不要太吓人。");
  lines.push("4. 请生成 2 个不同版本，方便课堂比较选择。");

  if (d.type !== "bgm") {
    lines.push("5. 歌词吐字要清楚，适合小朋友听懂。");
  }

  return lines.join("\n");
}

function buildCard() {
  var d = data();
  return [
    "作品名：" + d.title,
    "故事：" + d.story,
    "类型：" + typeName(d.type),
    "情绪：" + d.moods,
    "风格：" + d.style,
    "结构：开头 → 发展 → 高潮 → 结尾",
    "选择理由：" + d.reason
  ].join("<br>");
}

function setPromptStatus(message) {
  var status = get("promptStatus");
  if (status) status.textContent = message;
}

function refresh(forceRegenerate) {
  var promptBox = get("promptBox");
  var workCard = get("workCard");

  if (promptBox && (forceRegenerate || !promptManuallyEdited)) {
    promptBox.value = buildPrompt();
    promptManuallyEdited = false;
    setPromptStatus("当前提示词由页面自动生成，可以直接编辑；复制时会复制编辑框里的内容。");
  }

  if (workCard) {
    workCard.innerHTML = buildCard();
  }
}

function regeneratePrompt() {
  promptManuallyEdited = false;
  refresh(true);
}

function showToast() {
  var toast = get("toast");
  if (!toast) return;
  toast.style.display = "block";
  setTimeout(function () {
    toast.style.display = "none";
  }, 1300);
}

function fallbackCopy(text) {
  var textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  showToast();
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(showToast).catch(function () {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function copyPrompt() {
  var promptBox = get("promptBox");
  copyText(promptBox ? promptBox.value : buildPrompt());
}

function copyCard() {
  var workCard = get("workCard");
  copyText(workCard ? workCard.innerText : buildCard().replace(/<br>/g, "\n"));
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("input, textarea, select").forEach(function (el) {
    if (el.id === "promptBox") return;
    el.addEventListener("input", function () { refresh(false); });
    el.addEventListener("change", function () { refresh(false); });
  });

  var promptBox = get("promptBox");
  if (promptBox) {
    promptBox.addEventListener("input", function () {
      promptManuallyEdited = true;
      setPromptStatus("当前是手动编辑版；点击“重新生成提示词”会用页面选择覆盖编辑内容。");
    });
  }

  refresh(true);
});
