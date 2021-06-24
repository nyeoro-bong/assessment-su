"use strict";
const body = document.getElementsByTagName("body")[0];
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const fukidashiContent =
  document.getElementsByClassName("fukidashi-content")[0];
const catBody = document.getElementsByClassName("cat-body")[0];
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");

// body の高さをブラウザのwindowの高さにフィットさせる
body.style.height = `${window.innerHeight}px`;
window.addEventListener("resize", () => {
  body.style.height = `${window.innerHeight}px`;
});
/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    // 子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成

  // 新しく要素を追加しないのでremoveもしない
  // removeAllChildren(resultDivided);
  // 「診断結果」は書かないことにする
  // const header = document.createElement('h3');
  // header.innerText = '診断結果';
  // resultDivided.appendChild(header);

  // 新しく要素を追加しない
  // const paragraph = document.createElement('p');
  const result = assessment(userName);
  // paragraph.innerText = result;
  // resultDivided.appendChild(paragraph);

  // 文字の透明化
  fukidashiContent.classList.add("transparent");
  // 猫をカラフルに
  catBody.classList.add("colorful-body");
  // 透明化が終了したら文字を挿入
  setTimeout(() => {
    // 太字にする処理
    const result4HTML = result.replaceAll(
      userName,
      `<span class="bold">${userName}</span>`
    );

    // 猫を元の色に戻す
    catBody.classList.remove("colorful-body");

    // 吹き出しに要素を挿入
    // 結果にタグを含めているため、innerHTML に変更。このメソッドは危険性をもっていますが、それは2章以降で学んでいきます。
    resultDivided.innerHTML = result4HTML;

    // ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement("a");
    const hrefValue =
      "https://twitter.com/intent/tweet?button_hashtag=" +
      encodeURIComponent("あなたのいいところ") +
      "&ref_src=twsrc%5Etfw";
    anchor.setAttribute("href", hrefValue);
    anchor.className = "twitter-hashtag-button";
    anchor.setAttribute("data-text", result);
    anchor.innerText = "Tweet #あなたのいいところ";
    tweetDivided.appendChild(anchor);

    // widgets.js の設定
    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    tweetDivided.appendChild(script);

    // 透明化の解除
    fukidashiContent.classList.remove("transparent");
  }, 2500);
};

// 語尾の変更 // 「チャン」をつけるあたりは某アイドルプロデュースコンテンツの影響を受けています
const answers = [
  "{userName}のいいところは声だにゃ。{userName}チャンの特徴的な声はみなを惹きつけ、心に残るのにゃ。",
  "{userName}のいいところはまなざしだにゃ。{userName}チャンに見つめられた人は、気になって仕方がないのにゃ。",
  "{userName}のいいところは情熱だにゃ。{userName}チャンの情熱に周りの人は感化されるのにゃ。",
  "{userName}のいいところは厳しさだにゃ。{userName}チャンの厳しさがものごとをいつも成功に導くのにゃ。",
  "{userName}のいいところは知識だにゃ。博識な{userName}チャンを多くの人が頼りにしているのにゃ。",
  "{userName}のいいところはユニークさだにゃ。{userName}チャンだけのその特徴が皆を楽しくさせるのにゃ。",
  "{userName}のいいところは用心深さだにゃ。{userName}チャンの洞察に、多くの人が助けられるのにゃ。",
  "{userName}のいいところは見た目だにゃ。内側から溢れ出る{userName}チャンの良さに皆が気を惹かれるのにゃ。",
  "{userName}のいいところは決断力だにゃ。{userName}チャンがする決断にいつも助けられる人がいるのにゃ。",
  "{userName}のいいところは思いやりだにゃ。{userName}チャンに気をかけてもらった多くの人が感謝しているのにゃ。",
  "{userName}のいいところは感受性だにゃ。{userName}チャンが感じたことに皆が共感し、わかりあうことができるのにゃ。",
  "{userName}のいいところは節度だにゃ。強引すぎない{userName}チャンの考えに皆が感謝しているのにゃ。",
  "{userName}のいいところは好奇心だにゃ。新しいことに向かっていく{userName}チャンの心構えが多くの人に魅力的に映るのにゃ。",
  "{userName}のいいところは気配りだにゃ。{userName}チャンの配慮が多くの人を救っているのにゃ。",
  "{userName}のいいところはその全てだにゃ。ありのままの{userName}チャン自身がいいところなのにゃ。",
  "{userName}のいいところは自制心だにゃ。やばいと思ったときにしっかりと衝動を抑えられる{userName}チャンが皆から評価されているのにゃ。",
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll("{userName}", userName);
  return result;
}

// テストコード
// 基本的に通らなくなってしまったのでコメントアウト
// console.assert(
//   assessment("太郎") ===
//     "太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。",
//   "診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。"
// );
// console.assert(
//   assessment("太郎") === assessment("太郎"),
//   "入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。"
// );
