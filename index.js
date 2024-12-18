let mybutton=document.getElementById(&quot;myBtn&quot;);window.onscroll=function(){scrollFunction()};function scrollFunction(){if(document.body.scrollTop&gt;50||document.documentElement.scrollTop&gt;50){mybutton.style.display=&quot;block&quot;}else{mybutton.style.display=&quot;none&quot;}}
function topFunction(){document.body.scrollTop=0;document.documentElement.scrollTop=0};

const cursor=document.querySelector(&quot;.cursor&quot;);var timeout;document.addEventListener(&quot;mousemove&quot;,(e)=&gt;{let x=e.pageX;let y=e.pageY;cursor.style.top=y+&quot;px&quot;;cursor.style.left=x+&quot;px&quot;;cursor.style.display=&quot;block&quot;;function mouseStopped(){cursor.style.display=&quot;none&quot;}clearTimeout(timeout);timeout=setTimeout(mouseStopped,5000)});document.addEventListener(&quot;mouseout&quot;,()=&gt;{cursor.style.display=&quot;none&quot;});


var prinshm1 = window.location.toString();
if (prinshm1.indexOf(&quot;?m=1&quot;,&quot;?m=1&quot;) &gt; 0) {
var clean_nprinsh = prinshm1.substring(0, prinshm1.indexOf(&quot;?m=1&quot;));
window.history.replaceState({}, document.title, clean_nprinsh);};