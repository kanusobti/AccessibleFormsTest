var isPasswordValid = false;
var rules = [
  {
    Pattern: "[A-Z]",
    Target: "UpperCase",
  },
  {
    Pattern: "[a-z]",
    Target: "LowerCase",
  },
  {
    Pattern: "[0-9]",
    Target: "Numbers",
  },
];
function ValidatePassword(pwd) {
  document.getElementById("lblPassword").style.color = "black";
  var password = pwd.value;
  var passedRules = [];
  for (var i = 0; i < rules.length; i++) {
    new RegExp(rules[i].Pattern).test(password)
      ? (removeClass(document.getElementById(rules[i].Target), "pwdFail"),
        addClass(document.getElementById(rules[i].Target), "pwdOk"),
        (document.getElementById(rules[i].Target + "Span").style.color =
          "Green"),
        (document.getElementById(rules[i].Target + "Span").innerHTML =
          "\u2714"),
        passedRules.push(rules[i].Target))
      : (removeClass(document.getElementById(rules[i].Target), "pwdOk"),
        addClass(document.getElementById(rules[i].Target), "pwdFail"),
        (document.getElementById(rules[i].Target + "Span").innerHTML =
          "\u2717"),
        (document.getElementById(rules[i].Target + "Span").style.color =
          "Red"));
  }
  passedRules.length == 3
    ? (isPasswordValid = true)
    : (isPasswordValid = false);
}

function resetUsername() {
  document.getElementById("lblUsername").style.color = "black";
}

function checkPassword(usrName, pwd) {
  if (usrName == "level" && pwd == "Access123") {
    alert("Login Successful!");
    return isPasswordValid;
  } else {
    isPasswordValid = false;
    return isPasswordValid;
  }
}

function removeClass(element, vclassName) {
  element.className = element.className
    .replace(new RegExp("( |^)" + vclassName + "( |$)", "g"), " ")
    .trim();
}

function addClass(element, name) {
  var classesString;
  classesString = element.className || "";
  if (classesString.indexOf(name) == -1) {
    element.className += " " + name;
  }
}

function checkForm(form) {
  var node = document.getElementById("loginError");
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  if (form.username.value == "" && form.password.value == "") {
    document.getElementById("lblUsername").style.color = "red";
    document.getElementById("lblPassword").style.color = "red";
    var vErrorMsg = "";
    vErrorMsg =
      "Error: An error has occurred! Please address the following errors and re-submit the form.\n- Username field may not be blank.\n- Password field may not be blank.";
    handleErrors(vErrorMsg);
    alert(vErrorMsg);
    document.getElementById("loginError").focus();
    return false;
  }

  if (form.password.value != "") {
    if (!checkPassword(form.username.value, form.password.value)) {
      vErrorMsg =
        "Error: The username and password combination was not recognized!";
      handleErrors(vErrorMsg);
      alert(vErrorMsg);
      //Reset Validations
      for (var i = 0; i < rules.length; i++) {
        removeClass(document.getElementById(rules[i].Target), "pwdOk");
        addClass(document.getElementById(rules[i].Target), "pwdFail");
        document.getElementById(rules[i].Target + "Span").innerHTML = "\u2717";
        document.getElementById(rules[i].Target + "Span").style.color = "Red";
      }
      document.getElementById("loginError").focus();
      form.password.value = "";
      return false;
    }
  } else {
    vErrorMsg = "Error: Please fill in your password!";
    handleErrors(vErrorMsg);
    alert(vErrorMsg);
    document.getElementById("loginError").focus();
    return false;
  }
  return true;
}

function displayRules() {
  document.getElementById("passwordRequirements").style.display = "block";
}

function handleErrors(pError) {
  var node = document.getElementById("loginError");
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  var vError = "";
  var vErrorPlaceholder = document.createElement("div");
  vErrorPlaceholder.id = "errorBanner";
  vErrorPlaceholder.style.fontFamily = "Roboto,sans-serif";
  vErrorPlaceholder.style.padding = "20px";
  vErrorPlaceholder.style.marginTop = ".4em";
  vErrorPlaceholder.style.border = "1px solid #b91a0e";
  vErrorPlaceholder.style.borderTop = "10px solid #b91a0e";
  var vErrorHeader = document.createElement("span");
  vErrorHeader.style.display = "flex";
  vErrorHeader.style.display = "-webkit-box";
  vErrorHeader.style.display = "-ms-flexbox";
  vErrorHeader.style.display = "-webkit-flex";
  vErrorHeader.style.color = "black";

  var vErrorHeading = document.createElement("h3");
  vErrorHeading.style.paddingLeft = "1em";
  vErrorHeading.innerText = "Alert";

  vErrorHeader.appendChild(vErrorHeading);

  var vErrorTag = document.createElement("p");
  vErrorTag.id = "error";
  vErrorTag.style.textAlign = "left";
  vErrorTag.style.paddingLeft = "4.6em";
  vErrorTag.style.color = "#b91a0e";
  vErrorTag.style.border = "none";
  var vErrorText = document.createTextNode(pError);
  vErrorTag.appendChild(vErrorText);

  vErrorPlaceholder.appendChild(vErrorHeader);
  vErrorPlaceholder.appendChild(vErrorTag);

  document.getElementById("loginError").appendChild(vErrorPlaceholder);
}
