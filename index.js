let mybutton=document.getElementById("myBtn");window.onscroll=function(){scrollFunction()};function scrollFunction(){if(document.body.scrollTop>50||document.documentElement.scrollTop>50){mybutton.style.display="block"}else{mybutton.style.display="none"}}
    function topFunction(){document.body.scrollTop=0;document.documentElement.scrollTop=0};
  
 const cursor=document.querySelector(".cursor");var timeout;document.addEventListener("mousemove",(e)=>{let x=e.pageX;let y=e.pageY;cursor.style.top=y+"px";cursor.style.left=x+"px";cursor.style.display="block";function mouseStopped(){cursor.style.display="none"}clearTimeout(timeout);timeout=setTimeout(mouseStopped,5000)});document.addEventListener("mouseout",()=>{cursor.style.display="none"});
  

    var prinshm1 = window.location.toString();
    if (prinshm1.indexOf("?m=1","?m=1") > 0) {
    var clean_nprinsh = prinshm1.substring(0, prinshm1.indexOf("?m=1"));
    window.history.replaceState({}, document.title, clean_nprinsh);};
