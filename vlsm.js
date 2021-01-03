function clear_form(){
	var b=document.getElementById("nets").innerHTML;
	for(var a=1;a<=b;a++){
		document.getElementById("name"+a).value="Host"+a;
		document.getElementById("hosts"+a).value=""}
	}
function change_subnet_number(){
	var e=document.getElementById("nets").innerHTML;
	var c=document.getElementById("input_num_of_subnets").value;
	c=c.replace(/^\s+|\s+$/g,"");
	if(isNaN(c)){
		alert("Please enter an integer between 2 and 999")
	}else{
		if((c%1)!==0){
			alert("Please enter a whole integer  - no decimals or commas, please")
		}else{if((c>999)||(c<2)){
			alert("Please enter a positive integer between 2 and 999")
		}else{paragraph="<span class='column'>Subnet Names:</span> <span class='column'>Number of hosts:</span><br>";
		for(var b=1;b<=c;b++){if((document.getElementById("name"+b))!=null){
			var d=document.getElementById("name"+b).value;
			var a=document.getElementById("hosts"+b).value}else{var d="Lan"+b;
			if((document.getElementById("hosts"+b))!=null)
				{var a=document.getElementById("hosts"+b).value}else{var a=""}}paragraph+="<input type='text' id='name"+b+"' value='"+d+"'> <input type='text' id='hosts"+b+"' tabindex='"+b+"' value='"+a+"'><br>"}document.getElementById("nets").innerHTML=c;
			document.getElementById("subnet_pargraph").innerHTML=paragraph}}}}function vlsm()
			{var h=document.getElementById("input_network").value;h=h.replace(/^\s+|\s+$/g,"");
			if(!validate(h)){
				document.getElementById("not_valid_ip").innerHTML="<b>This does not seem like a valid network</b>";
				return}
				document.getElementById("not_valid_ip").innerHTML="";
				var n=return_slash(h);var g=find_hosts(n);
				var m=return_ip(h);var q=find_mask(n);
				var c=find_net_add(m,q);
				var f=find_wildcard(q);
				var p=find_broadcast(f,m);
				var o=document.getElementById("nets").innerHTML;
				var a=sum_hosts(o);var d=ordered_hosts(o);
				var s="<p>The network "+c[0]+"."+c[1]+"."+c[2]+"."+c[3]+"/"+n+" has "+g+" hosts.<br>Your subnets need "+a+" hosts.</p>";
				var t="<table border='1'><tr><td>Name</td><td>Hosts Needed</td><td>Hosts Available</td><td>Unused Hosts</td><td>Network Address</td><td>Slash</td><td>Mask</td><td>Usable Range</td><td>Broadcast</td><td>Wildcard</td></tr>";
				var b=c;
				var k=0;
				for(var r=0;r<d.length;r++){
					var j=find_slash(d[r][0]);
					var u=find_mask(j);
					var e=find_net_add(b,u);
					var l=find_wildcard(u);
					k+=(find_hosts(j)+2);
					t+="<tr><td>"+d[r][1]+"</td>";
					t+="<td>"+d[r][0]+"</td>";
					t+="<td>"+find_hosts(j)+"</td>";
					t+="<td>"+(find_hosts(j)-d[r][0])+"</td>";
					t+="<td>"+e[0]+"."+e[1]+"."+e[2]+"."+e[3]+"</td>";
					t+="<td>/"+j+"</td>";
					b=find_broadcast(l,e);
					t+="<td>"+u[0]+"."+u[1]+"."+u[2]+"."+u[3]+"</td>";
					t+="<td>"+e[0]+"."+e[1]+"."+e[2]+"."+(e[3]+1)+" - "+b[0]+"."+b[1]+"."+b[2]+"."+(b[3]-1)+"</td>";
					t+="<td>"+b[0]+"."+b[1]+"."+b[2]+"."+b[3]+"</td>";
					t+="<td>"+l[0]+"."+l[1]+"."+l[2]+"."+l[3]+"</td>";
					b=next_net_add(b)}t+="</table>";
					if(k>g+2)
						{s+="<span style='background-color:yellow;'>Looks like those subnets will not fit into that network, but here is something else that may work for you:</span><br>"}
					t=s+t;document.getElementById("ans").innerHTML=t}
					function validate(b){var a=/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/([1-9]|[1-2][0-9]|3[0-2])$/;if(b.match(a)){return(true)}return(false)}
					function return_slash(a){var b=a.split("/");
					return b[1]}function return_ip(a){var b=a.split("/");
					return b[0].split(".")}
					function find_hosts(a){return(Math.pow(2,(32-a))-2)}function find_mask(c){var a=new Array();
						for(var b=0;b<4;b++){a[b]=0}if(c<8){a[0]=256-Math.pow(2,(32-(c+24)))}else{if(c<16){a[0]=255;a[1]=256-Math.pow(2,(32-(c+16)))}else{if(c<24){a[0]=255;a[1]=255;a[2]=256-Math.pow(2,(32-(c+8)))}else{a[0]=255;a[1]=255;a[2]=255;a[3]=256-Math.pow(2,(32-c))}}}return a}
							function find_net_add(a,b){var c=new Array();for(var d=0;d<4;d++){c[d]=a[d]&b[d]}return c}
							function find_wildcard(a){var c=new Array();for(var b=0;b<4;b++){c[b]=255-a[b]}return c}
							function find_broadcast(b,a){var d=new Array();for(var c=0;c<4;c++){d[c]=b[c]|parseInt(a[c])}return d}
							function ordered_hosts(a){var c=new Array();var b=0;for(var f=1;f<=a;f++){var e="name"+f;var d="hosts"+f;e=document.getElementById(e).value;d=document.getElementById(d).value;if(d>=1){c[b]=[d,e];b++}}c.sort(function(h,g){return g[0]-h[0]});return c}function sum_hosts(a){var d=0;for(var c=1;c<=a;c++){var b="hosts"+c;b=parseInt(document.getElementById(b).value);
							if(b>=1){d+=b}}return d}
							function next_net_add(a){if(a[3]<255){a[3]++}else{if(a[2]<255){a[3]=0;a[2]++}else{if(a[1]<255){a[3]=0;a[2]=0;a[1]++}else{a[3]=0;a[2]=0;a[1]=0;a[0]++}}}return a}
							function find_slash(a){for(var b=2;b<33;b++){if(a<=(Math.pow(2,b)-2)){return 32-b}}return"TOO BIG"};