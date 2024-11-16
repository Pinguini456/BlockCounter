const contentTable = document.getElementById("content");

function getQuery() {
  var qString = window.location.search;
  var qParams = new URLSearchParams(qString);
  var q = qParams.get('list');
  return q;
}

function parseQuery() {
  var query = getQuery();
  var content = JSON.parse(query);
  return content;
}

function displayContent() {
  var content = parseQuery();
  for (let i = 0; i < Object.keys(content).length; i++) {
    var key = Object.keys(content)[i];
    var multiWord = false;
    var row = document.createElement("tr");
    var name = document.createElement("td");
    var number = document.createElement("td");
    var stack = document.createElement("td");
    var shulker = document.createElement("td");
    var oName = key.slice(0, -1);
    if (oName.includes(" ")){
      var sName = oName.split(" ");
      multiWord = true;
    } else {
      var sName = oName;
      multiWord = false;
    }
    var iconName = "icon-minecraft icon-minecraft-"
    if (multiWord) {
      for (let i = 0; i < sName.length; i++) {
        iconName += sName[i].toLowerCase();
        if (i != sName.length - 1) {
          iconName += "-";
        }
      }
    } else {
      iconName += sName.toLowerCase();
    }
    // correcting icon and block names
    if (oName == "Brick Block") {
      iconName = "icon-minecraft icon-minecraft-bricks";
      oName = "Bricks";
    } else if (oName == "Grass Path") {
      iconName = "icon-minecraft icon-minecraft-dirt-path";
      oName = "Dirt Path";
    } else if (oName == "Crimson Log") {
      iconName = "icon-minecraft icon-minecraft-crimson-stem";
      oName = "Crimson Stem";
    } else if (oName == "Stripped Crimson Log") {
      iconName = "icon-minecraft icon-minecraft-stripped-crimson-stem";
      oName = "Stripped Crimson Stem";
    } else if (oName == "Warped Log") {
      iconName = "icon-minecraft icon-minecraft-warped-stem";
      oName = "Warped Stem";
    } else if (oName == "Stripped Warped Log") {
      iconName = "icon-minecraft icon-minecraft-stripped-warped-stem";
      oName = "Stripped Warped Stem";
    } else if (oName == "Normal Red Sandstone") {
      iconName = "icon-minecraft icon-minecraft-red-sandstone";
      oName = "Red Sandstone";
    } else if (oName == "Normal Sandstone") {
      iconName = "icon-minecraft icon-minecraft-sandstone";
      oName = "Sandstone";
    } else if (oName == "Head") {
      iconName = "icon-minecraft icon-minecraft-player-head";
      oName = "Player Head";
    } else if (oName == "Skeleton Head") {
      iconName = "icon-minecraft icon-minecraft-skeleton-skull";
      oName = "Skeleton Skull";
    } else if (oName == "Wither Skeleton Head") {
      iconName = "icon-minecraft icon-minecraft-wither-skeleton-skull";
      oName = "Wither Skeleton Skull";
    } else if (oName == "Crimson Wood") {
      iconName = "icon-minecraft icon-minecraft-crimson-hyphae";
      oName = "Crimson Hyphae";
    } else if (oName == "Stripped Crimson Wood") {
      iconName = "icon-minecraft icon-minecraft-stripped-crimson-hyphae";
      oName = "Stripped Crimson Hyphae";
    } else if (oName == "Warped Wood") {
      iconName = "icon-minecraft icon-minecraft-warped-hyphae";
      oName = "Warped Hyphae";
    } else if (oName == "Stripped Warped Wood") {
      iconName = "icon-minecraft icon-minecraft-stripped-warped-hyphae";
      oName = "Stripped Warped Hyphae";
    } else if (oName == "Normal Stone Bricks") {
      iconName = "icon-minecraft icon-minecraft-stone-bricks";
      oName = "Stone Bricks";
    } else if (oName == "Tripwire") {
      oName = "String";
    } 
    var icon = "<i class='" + iconName + " " + "icons" + "'></i>";
    name.textContent = oName;
    name.insertAdjacentHTML("afterbegin", icon);
    number.textContent = content[key];
    if (content[key] >= 64) {
      stack.textContent = Math.floor((content[key] / 64)) + " + " + (content[key] % 64);
    } else {
      stack.textContent = '0';
    }
    if (Math.floor(content[key] / 64) >= 27) {
      shulker.textContent = (Math.floor(content[key] / 64) / 27).toFixed(1);
    } else {
      shulker.textContent = '0';
    }
    row.appendChild(name);
    row.appendChild(number);
    row.appendChild(stack);
    row.appendChild(shulker);
    name.className = 'name';
    number.className = 'data';
    stack.className = 'data';
    shulker.className = 'data1';
    row.className = 'row';
    contentTable.appendChild(row);
  }
}

displayContent();

document.addEventListener('click', function (e) {
  if (e.target.className == 'data' || e.target.className == 'name' || e.target.className == 'data1') {
    if (e.target.parentElement.style.textDecoration.includes("line-through")) {
      e.target.parentElement.style.textDecoration = "none";
      e.target.parentElement.style.color = "#fff";
    } else {
      e.target.parentElement.style.textDecoration = "line-through";
      e.target.parentElement.style.textDecorationThickness = "2px";
      e.target.parentElement.style.color = "#45474B";
    }
  } else if (e.target.className.includes('icons')) {
    if (e.target.parentElement.parentElement.style.textDecoration.includes("line-through")) {
      e.target.parentElement.parentElement.style.textDecoration = "none";
      e.target.parentElement.parentElement.style.color = "#fff";
    } else {
      e.target.parentElement.parentElement.style.textDecoration = "line-through";
      e.target.parentElement.parentElement.style.textDecorationThickness = "2px";
      e.target.parentElement.parentElement.style.color = "#45474B";
    }
  }
});


// for the icons
// https://www.gamergeeks.net/apps/minecraft/web-developer-tools/css-blocks-and-entities 