//SITE_QUESTIONS
//SITE_ANSWERS
var USER_SLIDE = 0;
var USER_Q = 1;
var USER_ANS = ["",0,0,0,0,0,0,0,0,0,0];
var ANI_ON = false;
var WINDOW_600 = false;
var CACHE_SLIDE = 0;
var NAME_INPUT;

window.onload = function ()
{
	loadImgAsync();
	generateBlueNavLine();
	
	WINDOW_600 = window.innerWidth <= 600 ? true : false; 
}

window.onresize = function ()
{
	//cool responsive logic that resets nav line if 600px breakpoint is crossed from either direction
	if(window.innerWidth > 600)
	{
		if(WINDOW_600) { resetBlueNavLine(); WINDOW_600 = false;}
	}
	else
	{
		if(!WINDOW_600) { resetBlueNavLine(); WINDOW_600 = true;}
	}
}

function loadImgAsync()
{
	var slideImageTarget = document.getElementById("slide-image");
	var asyncImage = new Image();
	asyncImage.onload = function(){
		slideImageTarget.src = this.src;   
		
		setTimeout(function () { 
			document.getElementById("logo-animation").style.animation = "none";
		}, 1000);
		
		setTimeout(function () { 
			document.getElementById("logo-animation").style.opacity = "0";
			document.getElementById("slide_overlay").style.display = "block";
			document.getElementById("slide").style.opacity = "1";
		}, 1030);
		
		setTimeout(function () {
			USER_SLIDE = 1;
		}, 1530);
		
		setTimeout(function () {
			document.querySelector(".circleDashStroke").style.animation = "none";
		}, 2000);
	};
	
	asyncImage.src = "./app-business-calculator-907489.jpg";
}

function generateBlueNavLine()
{
	var bnl = document.createElement("div");
	bnl.id = "blue-nav-line";
	bnl.style.position = "absolute";
	bnl.style.top = ((document.getElementById("title-bar").offsetTop + document.getElementById("title-bar").offsetHeight) - 1) + "px";
	bnl.style.left = document.getElementById("logo-text").offsetLeft + "px";
	bnl.style.height = "1px";
	bnl.style.width = document.getElementById("logo-text").offsetWidth;
	bnl.style.zIndex = "50";
	bnl.style.transition = "width cubic-bezier(.17,.67,.16,.99) 500ms, left cubic-bezier(.17,.67,.16,.99) 250ms";
	bnl.style.backgroundColor = "#009adb";
	document.body.appendChild(bnl);
	
	//event handlers
	document.getElementById("logo-text").onmouseover = moveBlueNavLine;
	document.getElementById("survey-text").onmouseover = moveBlueNavLine;
	document.getElementById("raw-data-text").onmouseover = moveBlueNavLine;
	
	document.getElementById("logo-text").onmouseout = resetBlueNavLine;
	document.getElementById("survey-text").onmouseout = resetBlueNavLine;
	document.getElementById("raw-data-text").onmouseout = resetBlueNavLine;
}

function moveBlueNavLine()
{
	document.getElementById("blue-nav-line").style.left = this.offsetLeft + (this.offsetWidth - this.clientWidth);
	document.getElementById("blue-nav-line").style.width = this.clientWidth;
}

function resetBlueNavLine()
{
	switch(USER_SLIDE)
	{
		case 0:
		case 1:
			document.getElementById("blue-nav-line").style.left = document.getElementById("logo-text").offsetLeft;
			document.getElementById("blue-nav-line").style.width = document.getElementById("logo-text").offsetWidth;
		break;
		
		case 2:
			document.getElementById("blue-nav-line").style.left = document.getElementById("survey-text").offsetLeft;
			document.getElementById("blue-nav-line").style.width = document.getElementById("survey-text").offsetWidth;
		break;
		
		case 3:
			document.getElementById("blue-nav-line").style.left = document.getElementById("raw-data-text").offsetLeft + 10;
			document.getElementById("blue-nav-line").style.width = document.getElementById("raw-data-text").clientWidth;
		break;
		
	}
}

function generatePreviousButton()
{
	var pb = document.createElement("img");
	pb.id = "ap";
	pb.src = "./arrow-prev.png";
	pb.style.top = (document.getElementsByClassName("survey-question")[0].offsetTop + 5) + "px";
	pb.style.left = (document.getElementsByClassName("survey-question")[0].offsetLeft - 25) + "px";
	pb.onclick = function () { changeQuestion('previous') };
	document.getElementById("survey-div").appendChild(pb);
}

function changeSlide(slideName)
{
	if(ANI_ON || USER_SLIDE === 0) { return; }
	
	switch(slideName)
	{
		case 'survey':
		
			if(USER_SLIDE === 2) { return; }
			
			ANI_ON = true;
			USER_SLIDE = 2;
			
			deleteFrame();
			
			document.getElementById("slide").style.transform = "translateX(-100%)";
			document.getElementById("slide_overlay").style.transform = "translateX(-200%)";
			document.getElementById("survey-div").style.transform = "translateX(100vw)";
			document.getElementById("survey-text").setAttribute('data-nav', 'true');
			document.getElementById("raw-data-text").setAttribute('data-nav', 'false');
			
			setTimeout(function () { 
				document.getElementById("survey-div").style.transition = "opacity 500ms, transform cubic-bezier(.17,.67,.16,.99) 1s";
				document.getElementById("survey-div").style.transform = "translateX(0px)";
			}, 30);
			
			setTimeout(function () { 
				
				document.getElementById("logo-text").innerHTML = "FriendFinder";
				/* ^^^^^^^^^^^^^^^^
				Updates the DOM to fix mobile white space. Not sure why this works.
				Best I can gather is that an update to the DOM after the translations 
				finish must be activating a clean up routine that a tells the browser 
				to stop including the elements to the left of the viewport in the total
				viewport width.
				*/ 
				
				ANI_ON = false;
				
			}, 1030);
		break;
		
		case 'slide':
			if(USER_SLIDE === 1) { return; }
			
			ANI_ON = true;
			USER_SLIDE = 1;
			
			deleteFrame();
			
		    document.querySelector("#text_overlay button").textContent = USER_Q === 10 ? "Survey Results" : "Continue survey";
			document.getElementById("survey-text").setAttribute('data-nav', 'false');
			document.getElementById("raw-data-text").setAttribute('data-nav', 'false');
			document.getElementById("survey-div").style.transform = "translateX(100vw)";
			document.getElementById("slide_overlay").style.transform = "translateX(0px)";
			document.getElementById("slide").style.transform = "translateX(0px)";
			
			setTimeout(function () { 
				document.getElementById("survey-div").style.transition = "none";
				document.getElementById("survey-div").style.transform = "translateX(-100vw)";
				document.getElementById("logo-text").innerHTML = "FriendFinder";
				ANI_ON = false;
			}, 1030);
		break;
	}
	
	resetBlueNavLine();
}

function enableButton(questionDiv)
{
	var radios = document.getElementsByName('qs');
	var radioCheckPassed = false;

	for (var i = 0, length = radios.length; i < length; i++)
	{
		 if (radios[i].checked)
		 {
			  USER_ANS[USER_Q] = i + 1;
			  radioCheckPassed = true;
			  break;
		 }
	}
	
	var button_state = document.getElementsByClassName("button-state-container")[0];
	if ( button_state.innerHTML.indexOf("blue") === -1 && radioCheckPassed)
	{
			if(USER_Q === 9) 
			{ 
				button_state.innerHTML = '<button class="blue" onclick="showFinishModal()" ontouchstart="showFinishModal()">Finish Survey</button>';
			}
			else if(USER_Q !== 10)
			{
				button_state.innerHTML = '<button class="blue" onclick="changeQuestion(\'advance\')">Next Question &nbsp; &nbsp; &nbsp; &nbsp; <img src="./arrow.png" width="50px" height="50px"></button>';
			}
	}
	else
	{
		//already fired
	}
}

function changeQuestion(action)
{
	switch(action)
	{
		case 'advance':
			if(USER_Q === 10) { return; }
			
			USER_Q++;
			
			if(!document.getElementById("ap") && USER_Q === 2)
			{
				generatePreviousButton();
			}
			
		break;
		
		case 'previous':
			if(USER_Q === 1) { return; }
			
			USER_Q--;
			
			if(document.getElementById("ap") && USER_Q === 1)
			{
				document.getElementById("ap").remove();
			}
			
		break;
	}
	
	switch(action)
	{
		case 'advance':
		case 'previous':
		
		var button_state = document.getElementsByClassName("button-state-container")[0];
				
			if(USER_Q === 9) 
			{ 
				button_state.innerHTML = '<button class="gray">Finish Survey</button>';
			}
			else
			{
				button_state.innerHTML = '<button class="gray">Next Question &nbsp; &nbsp; &nbsp; &nbsp; <img src="./arrow.png" width="50px" height="50px"></button>';
			}

			//update question
			document.querySelector("span.survey-question").innerHTML = "<strong>Question " + USER_Q + ":</strong> " + SITE_QUESTIONS[USER_Q];
			
			//update answers
			var allAnswers = Array.prototype.slice.call(document.querySelectorAll('span.answerHTML'));
			allAnswers.map((answerSpan, ANS) => answerSpan.innerHTML = SITE_ANSWERS[USER_Q][ANS]);
			
			//clear selection
			var allRadios = Array.prototype.slice.call(document.getElementsByName('qs'));
			allRadios.map((radio) => radio.checked = false);
			
			//add selection if exists
			if((USER_ANS[USER_Q]) !== 0)
			{
				allRadios[USER_ANS[USER_Q] - 1].checked = true;
			}
		
		break;
	}
}

function deleteFrame()
{
	if(document.getElementsByTagName("iframe")[0])
	{
		document.getElementById("location-status-bar-text").remove();
		document.getElementsByTagName("iframe")[0].style.animation = "none";
			
		setTimeout(function () {
			document.getElementsByTagName("iframe")[0].style.animation = "showFrame 250ms reverse forwards";
		}, 30);
		setTimeout(function () {
			document.getElementsByTagName("iframe")[0].remove();
		}, 1030);
	}
}

//RawData button
function showRawData()
{
	if(ANI_ON || USER_SLIDE === 0) { return; }
	
	if(USER_SLIDE !== 3)
	{
		var newInlineFrame = document.createElement("iframe");
		newInlineFrame.src = "./api/friends";
		document.body.appendChild(newInlineFrame);
		
		document.getElementById("survey-text").setAttribute('data-nav', 'false');
		document.getElementById("raw-data-text").setAttribute('data-nav', 'true');
		CACHE_SLIDE = USER_SLIDE;
		USER_SLIDE = 3;
		ANI_ON = true;
		
		setTimeout(showLocationInStatusBar, 1030);
	}
	else
	{
		USER_SLIDE = CACHE_SLIDE;
		document.getElementById("raw-data-text").setAttribute('data-nav', 'false');
		if(USER_SLIDE === 2)
		{
			document.getElementById("survey-text").setAttribute('data-nav', 'true');
		}
			
		deleteFrame();
	}
}

function showLocationInStatusBar()
{
	ANI_ON = false;
	var lt = document.createElement("div");
	lt.id = "location-status-bar-text";
	lt.onclick = function () { window.open("./api/friends", '_blank'); };
	lt.textContent = window.location + "api/friends/";
	document.body.appendChild(lt);
}

/*/////////////////////////////*/

function showFinishModal()
{
	USER_Q = 10;
	ANI_ON = true;
	document.getElementById("survey-div").style.opacity = "0.2";
	
	var button_state = document.getElementsByClassName("button-state-container")[0];
	button_state.innerHTML = '<button class="gray">Finish Survey</button>';

	var fm = document.createElement("div");
	fm.id = "finish-modal";
	fm.innerHTML = "<p>&nbsp; Submit Survey</p>" +
				   "<div id='hr-line'></div>" + 
				   "<div id='name-box'><div id='name-input-label' onclick='this.parentElement.lastElementChild.focus()'>Name</div><input type='text' onfocus='showNameBoxBorder()' onblur='hideNameBoxBorder()' onkeyup='enableSubmitButton(this)'></div>" + 
				   "<p><button class='gray'>Submit</button></p>" + 
				   "<div id='x-button' onClick='hideFinishModal()' ontouchstart='hideFinishModal()'>X</div>";
	document.body.appendChild(fm);
}

function hideFinishModal()
{
	if(ANI_ON === false) { return; }
	
	USER_Q = 9;
	ANI_ON = false;
	
	var button_state = document.getElementsByClassName("button-state-container")[0];
			
	document.getElementById("finish-modal").style.animation = "none";
			
	setTimeout(function () {
		document.getElementById("finish-modal").style.animation = "showModal 250ms reverse forwards";
	}, 30);
	setTimeout(function () {
		if(button_state) { button_state.innerHTML = '<button class="blue" onclick="showFinishModal()" ontouchstart="showFinishModal()">Finish Survey</button>'; }
		document.getElementById("survey-div").style.opacity = "1";
		document.getElementById("finish-modal").remove();
	}, 280);
}

function showNameBoxBorder()
{
	document.getElementById("name-box").style.borderLeft = "2px solid #009adb";
}

function hideNameBoxBorder()
{
	document.getElementById("name-box").style.borderLeft = "0px solid #009adb";
}

function enableSubmitButton(input)
{
	NAME_INPUT = input;
	var submitButton = document.querySelector("#finish-modal button");
	
	if(input.value.length > 0)
	{
		submitButton.classList.remove("gray");
		submitButton.classList.add("blue");
		submitButton.onclick = postToFriends;
	}
	else
	{
		submitButton.classList.remove("blue");
		submitButton.classList.add("gray");
		submitButton.onclick = function () { return null };
	}
}

function postToFriends()
{
	var newFriend = { "name": NAME_INPUT.value,
					"scores": USER_ANS.slice(1)
	}
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) 
		{
			//successful POST
			var matchingNameArray = JSON.parse(this.responseText);
			var matchHTML_string = "<br><span class='survey-title'>Survey Match</span>";
			matchingNameArray.forEach(function(value) { 
				matchHTML_string += "<p>You matched with " + value.name + "!</p>";
			});
			matchHTML_string += "<span class='survey-title'>Breakdown</span>";
			
			var addThisArray = [];
			for(var at = 0; at < 10; at++)
			{
				addThisArray.push(Math.abs(USER_ANS[at+1] - matchingNameArray[0].scores[at]))
			}
			
			var colAdd = addThisArray.reduce(function (a, b) { return a+b;}, 0); 
			
			var myBreakdownTable = 
			`${matchHTML_string}
			<div class="Rtable Rtable--3cols">

			  <div style="order:0;" class="Rtable-cell Rtable-cell--head"><h3>${NAME_INPUT.value}</h3></div>
			  <div style="order: 1;" class="Rtable-cell">${USER_ANS[1]}</div>
			  <div style="order: 2;" class="Rtable-cell">${USER_ANS[2]}</div>
			  <div style="order: 3;" class="Rtable-cell">${USER_ANS[3]}</div>
			  <div style="order: 4;" class="Rtable-cell">${USER_ANS[4]}</div>
			  <div style="order: 5;" class="Rtable-cell">${USER_ANS[5]}</div>
			  <div style="order: 6;" class="Rtable-cell">${USER_ANS[6]}</div>
			  <div style="order: 7;" class="Rtable-cell">${USER_ANS[7]}</div>
			  <div style="order: 8;" class="Rtable-cell">${USER_ANS[8]}</div>
			  <div style="order: 9;" class="Rtable-cell">${USER_ANS[9]}</div>
			  <div style="order: 10;" class="Rtable-cell">${USER_ANS[10]}</div>
			  <div style="order: 11;" class="Rtable-cell Rtable-cell--foot"><strong></strong></div>
			  
			  <div style="order:0;" class="Rtable-cell Rtable-cell--head"><h3>${matchingNameArray[0].name}</h3></div>
			  <div style="order: 1;" class="Rtable-cell">${matchingNameArray[0].scores[0]}</div>
			  <div style="order: 2;" class="Rtable-cell">${matchingNameArray[0].scores[1]}</div>
			  <div style="order: 3;" class="Rtable-cell">${matchingNameArray[0].scores[2]}</div>
			  <div style="order: 4;" class="Rtable-cell">${matchingNameArray[0].scores[3]}</div>
			  <div style="order: 5;" class="Rtable-cell">${matchingNameArray[0].scores[4]}</div>
			  <div style="order: 6;" class="Rtable-cell">${matchingNameArray[0].scores[5]}</div>
			  <div style="order: 7;" class="Rtable-cell">${matchingNameArray[0].scores[6]}</div>
			  <div style="order: 8;" class="Rtable-cell">${matchingNameArray[0].scores[7]}</div>
			  <div style="order: 9;" class="Rtable-cell">${matchingNameArray[0].scores[8]}</div>
			  <div style="order: 10;" class="Rtable-cell">${matchingNameArray[0].scores[9]}</div>
			  <div style="order: 11;" class="Rtable-cell Rtable-cell--foot"><strong></strong></div>
			  
			  <div style="order:0;" class="Rtable-cell Rtable-cell--head"><h3>Difference</h3></div>
			  <div style="order: 1;" class="Rtable-cell ${cellCalc(addThisArray[0])}">${addThisArray[0]}</div>
			  <div style="order: 2;" class="Rtable-cell ${cellCalc(addThisArray[1])}">${addThisArray[1]}</div>
			  <div style="order: 3;" class="Rtable-cell ${cellCalc(addThisArray[2])}">${addThisArray[2]}</div>
			  <div style="order: 4;" class="Rtable-cell ${cellCalc(addThisArray[3])}">${addThisArray[3]}</div>
			  <div style="order: 5;" class="Rtable-cell ${cellCalc(addThisArray[4])}">${addThisArray[4]}</div>
			  <div style="order: 6;" class="Rtable-cell ${cellCalc(addThisArray[5])}">${addThisArray[5]}</div>
			  <div style="order: 7;" class="Rtable-cell ${cellCalc(addThisArray[6])}">${addThisArray[6]}</div>
			  <div style="order: 8;" class="Rtable-cell ${cellCalc(addThisArray[7])}">${addThisArray[7]}</div>
			  <div style="order: 9;" class="Rtable-cell ${cellCalc(addThisArray[8])}">${addThisArray[8]}</div>
			  <div style="order: 10;" class="Rtable-cell ${cellCalc(addThisArray[9])}">${addThisArray[9]}</div>
			  <div style="order: 11;" class="Rtable-cell Rtable-cell--foot"><strong>${colAdd}</strong></div>

			</div>
			`;
			
			document.getElementById("survey-div").innerHTML = myBreakdownTable;
			hideFinishModal();
		}
	};
	xhttp.open("POST", "./api/friends", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(newFriend));
}

function cellCalc(number)
{
	if(number === 0)
	{
		return "cell-calc";
	}
	else
	{
		return "";
	}
}