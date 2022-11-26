import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  createIncompleteList(inputText);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // テキストボックスの値を取得し、初期化する
  const inputText = text;
  document.getElementById("add-text").value = "";

  // li タグ生成
  const li = document.createElement("li");
  // div 生成
  const div = document.createElement("div");
  div.className = "list-row";
  // p 作成
  const p = document.createElement("p");
  p.innerText = inputText;
  // button 作成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 完了リストに追加する要素
    const addTargetDiv = completeButton.parentNode;
    const text = addTargetDiv.firstElementChild.innerText; // Todo内容テキスト

    // incomplete-list から削除
    // ul -> li -> div -> button という順番なので2回遡る
    //const todoText = completeButton.parentNode.childNodes.item(0).innerText;
    deleteFromIncompleteList(completeButton.parentNode.parentNode);

    // li タグ
    const li = document.createElement("li");

    // ++ div以下を初期化
    const div = document.createElement("div");
    div.className = "list-row";

    // 内容テキスト
    const p = document.createElement("p");
    p.innerText = text;
    // 戻すボタン
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 未完了リストに追加する要素
      const addTargetDiv = backButton.parentNode;
      const text = addTargetDiv.firstElementChild.innerText; // Todo内容テキスト

      // incomplete-list から削除
      // ul -> li -> div -> button という順番なので2回遡る
      const deleteTarget = backButton.parentNode.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);
      // 再帰させる
      createIncompleteList(text);
    });

    // li タグに要素追加していく
    li.appendChild(div);
    div.appendChild(p);
    div.appendChild(backButton);
    // 未完了リストに追加
    document.getElementById("complete-list").appendChild(li);
  });
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //　押された削除ボタンの親タグ(li)を未完了リストから削除する
    // ul -> li -> div -> button という順番なので2回遡る
    deleteFromIncompleteList(deleteButton.parentNode.parentNode);
  });
  //liタグの子要素に各要素を設定
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  li.appendChild(div);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};
