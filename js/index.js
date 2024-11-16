const input = document.getElementById("input");
const contentDiv = document.getElementById("content");
const fileName = document.getElementById("fileName");

input.addEventListener("change", () => {
  let inputFile = document.querySelector("input[type=file]").files[0];

  fileName.innerText = inputFile.name;
})



function Parse() {
  var file = input.files[0];
  var reader = new FileReader();
  
  reader.addEventListener('load', (e) => {

    var result = e.target.result;
    try {
      var content = JSON.parse(result);
      var list = Process(content);
      Display(list);
    } catch (e) {
      fileName.innerText = e.message;
    } 
  });

  reader.readAsText(file)
}
//

function Order(dict) {
  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });

  items.sort(function(first, second) {
    return second[1] - first[1];
  });
  console.log(items.slice(0, Object.keys(dict).length))
  return items.slice(0, Object.keys(dict).length);
}
//
function Process(jsonContent) {
  var blockList = {};
  
  for (let i = 0; i < Object.keys(jsonContent).length; i++) {
  
    var key = Object.keys(jsonContent)[i];

    if (key.includes("universal_minecraft") == false) {
      fileName.textContent = "JSON format not supported";
      return "error";
    }
    
    if (key == "universal_minecraft:air") {
      continue;
    } else if (key.includes("upper")) {
      continue;
    } else if (key.includes("foot")) {
      continue;
    }

    var split = key.split(":");
    var name = split[1];

    if (name.includes("[")) {
      var nameSplit = name.split("[");
      name = nameSplit[0];
      var selector = "[" + nameSplit[1];

      if (selector.includes("material")) {
        var data = selector.split("material=\"");
        var material = data[1].split("\"", 1);
        name = material[0] + "_" + name;

        if (selector.includes("true") && (name.includes("log") || name.includes("wood"))) {
          name = "stripped_" + name;
        }
      } else if (selector.includes("color")) {
        if (name.includes("stained_terracotta")) {
          name = "terracotta"
        }
        var data = selector.split("color=\"");
        var material = data[1].split("\"", 1);
        if (material[0] != "default") {
          name = material[0] + "_" + name;
        }
      } else if (selector.includes("polished")) {
        if (selector.includes("true")) {
          name = "polished_" + name;
        }
      } else if (selector.includes("coral_type")) {
        var data = selector.split("coral_type=\"");
        var material = data[1].split("\"", 1);
        name = material[0] + "_" + name;

        if (data[1].includes("true")) {
          name = "dead_" + name;
        }
      } else if (selector.includes("plant_type")) {
        var data = selector.split("plant_type=\"");
        var material = data[1].split("\"", 1);
        name = material[0];
      } else if (selector.includes("variant")) {
        var data = selector.split("variant=\"");
        var material = data[1].split("\"", 1);
        name = material[0] + "_" + name;
      } else if (selector.includes("wet")) {
        if (selector.includes("true")) {
          name = "wet_" + name;
        }
      } else if (selector.includes("mob")) {
        var data = selector.split("mob=\"");
        var material = data[1].split("\"", 1);
        name = "head";
        if (material[0] != "player") {
          name = material[0] + "_" + name;
        }
      }
      if (name.includes("mushroom_stem")) {
        name = "brown_mushroom_block";
      }
      if (name.includes("redstone_wire")) {
        name = name.slice(0, 8);
      }
    }

    var fName = Format(name);
    if (fName in blockList) {
      blockList[fName] += jsonContent[key];
    } else {
      blockList[fName] = jsonContent[key];
    }
    
  }
  return blockList;
}
//

function Format(string) {
  var strings = string.split("_");
  var final = "";
  for (let x = 0; x < strings.length; x++) {
    var word = strings[x][0].toUpperCase() + strings[x].substring(1);
    final = final + word + " ";
  }
  return final;
}
//

function Display(list) {
  var oList = Order(list);
  var submit = "{"
  for (let i = 0; i < oList.length; i++) {
    submit = submit + "\"" + oList[i][0] + "\":" + oList[i][1] + ",";
  }
  submit = submit.slice(0, -1);
  submit = submit + "}";
  window.location.href = "content.html?list=" + submit;
  
}

