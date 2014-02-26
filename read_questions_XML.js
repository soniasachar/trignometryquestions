//this function has been used for converting degrees value in radiams
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// this function has been used for calculating the value of given question 
function calcul(randq)
{
	
  randq = randq.trim();  
  temp=randq.split("(");
  temp1=temp[1].split(")");
  chars=temp1[0].split("");
  //here we are taking out number and operator in 2 diffrent arrent number in array n and operator in array op
 var n = [], op = [], index = 0, oplast = true;
 
  for(c=0;c<chars.length;c++)
  {
    if (isNaN(parseInt(chars[c])))
     {
        op[index] = chars[c];
            index++;
            n[index] = "";
            oplast = true;
     }
     else
     {      if(n[index])
            n[index] += chars[c];
            else
            n[index]= chars[c];
            oplast = false;
     }
    
  }
 //alert(randq);
 //here we are removing the blank entry from number array.
 var n = n.filter(function(v){return v!==''});
 //alert(n);
 // As some case we will get only one operator that case in op array first position adding oeration plus operator.
 if(op.length==1)
 {
	 op.unshift("+");
 }
 //alert(op);
res=0;
  // res = op[0] + parseInt(n[0]) + op[1] + parseInt(n[1]);
	 //here we are calculating the number value
	 for(i=0;i<op.length;i++)
	 {		 
		 if(op[i].trim()=="+")
		 res=res + parseInt(n[i]);
		 else
		 res=res - parseInt(n[i]);
	 }
	 
//here calculating final result value and doing round of to dicimal 2 digit.	 
if(temp[0].trim()=='sin')
       {	 
	   ans=Math.round(Math.sin(Math.radians(res))*100)/100;
	   }
if(temp[0].trim()=='cos')
 {
	 ans=Math.round(Math.cos(Math.radians(res))*100)/100;
 }
 //alert(res);
 //alert(ans);
 return ans;
}


$(document).ready(function(){
    
    //site that returns xml
    var site = 'http://stanford.edu/~kmickey/cgi-bin/myrand.php';
    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + site + '"') + '&format=xml&callback=?';
    
    //intialization of vairiables used
    correctcount=0;
    var qcount=1; 
    var res_str=''; 
	var optarr = [];
	// Request that YSQL string, and run a callback function. Pass a defined function to prevent cache-busting.
	$.getJSON(yql, function (data) {
							 
    	xml = data.results[0];
    	 //alert(xml);
		xmlDoc = $.parseXML(xml);
		//Refrence url: http://stackoverflow.com/questions/12003796/what-does-xml-xmldoc-do
		//It creates a jQuery object based on the xml specified above, enabling you to use jQuery's methods on it to find nodes and manipulate them.
		//The $ symbol at the start of variable is purely just for naming convention (of jquery objects). It's a way of reminding you that this variable is a jquery object and can therefore have functions such as find() called on it.
		
    	$xml = $( xmlDoc );
        
        id=qcount;
        
        // code for getting the number of question.  
        var p=0;
         randsize=1;
        while(p<1)
        {
            var rand_chk = $xml.find("randq"+randsize).text();
			//alert(rand_chk+" "+randsize);
          if(rand_chk.length>0) 
          {
            randsize=randsize+1;
          }
          else
          {
            p=1;
          } 
        }
        randsize=randsize-2;
        //End of getting number of question      
        randx = $xml.find("randx"+id).text();
        randq = $xml.find("randq"+id).text();
        
		
		//alert(Math.sin(Math.radians(randx)) + "\n" + Math.cos(Math.radians(randx)));
        
        
        $("#a").html(randq);
        
        optarr = new Array();
        optarrres = new Array();
        var  e= "cos";
        var  b= "-sin";
        var  c= "-cos";
        var  d= "sin";
		// here calculating the possible result value till dicimal 2 place
        optarrres[0]=Math.round(Math.cos(Math.radians(randx))*100)/100; optarrres[1]=-1 * Math.round(Math.sin(Math.radians(randx))*100)/100;optarrres[2]=-1 * Math.round(Math.cos(Math.radians(randx))*100)/100;optarrres[3]=Math.round(Math.sin(Math.radians(randx))*100)/100;
        
		var wr1= e.concat(randx);
        var wr2= b.concat(randx);
		var wr3= c.concat(randx);
		var wr4= d.concat(randx);
        
        optarr.push(wr1);
		optarr.push(wr2);optarr.push(wr3);optarr.push(wr4);
          
        $("#ans1").html(randx);
        $("#ans2").html(randx);
		$("#ans3").html(randx);
		$("#ans4").html(randx)
        $(':radio').attr('checked', false);
        //31 Jan Changes start
	    var dt = new Date();
		 nt = dt.getTime(); 
       //31 Jan Changes end  
    });
    
    $('input:radio').change(function() {
        //31 Jan Changes start 
       var dt1 = new Date();
		var nt1 = dt1.getTime();
        //31 Jan Changes end
        var ans;
        //checking options values and getting the proper answer
        if($('.opa').is(':checked'))
        {
            ans=0;
        }
	    else if($('.opb').is(':checked'))
	    {
           ans=1;
        }
	    else if($('.opc').is(':checked'))
	    {
           ans=2;
        }
	    else
        {     
            ans=3;
        }
	    answer=optarr[ans];
		// here I am checking the answer given by user is correct or not.
         
		if(calcul(randq)==optarrres[ans])
		{
			finalans="correct";
            correctcount=correctcount+1;
           // alert(correctcount);
			//alert to see the actual result, given result by user and possible results.
			//alert("Correct Answer" + "\n"+ calcul(randq) +"\n"+ optarrres[ans]+"\n"+optarrres);
		}
		else
		{
			finalans="wrong";
			// to see the actual result, given result by user and possible results.
			//alert("Wrong Answer" + "\n"+ calcul(randq) +"\n"+ optarrres[ans]+"\n"+optarrres);
		}
        
        //incrementing the question count by 1
        // result string generated
        // Changes 
		timediff=Math.round(((nt1-nt)/1000)*100)/100;
        
        res_str=res_str+'Question: '+qcount+'   '+randq+' <br />Your Answer :'+answer+' is '+finalans +'<br /> reaction time is:'+ timediff+' Second<br />';
        //changes end
        //alert((nt1-nt)/1000);
        //here we are checking the number of itration number of question and showing result.
        
		if(qcount>39)
        {
             //Changes start
            Correctanspersentage=(correctcount*100)/40;
            res_str=res_str+'<BR /><strong>Out of 40 Question you have given ' +correctcount+ ' correct answer. your total % of correct Answer is '+Correctanspersentage+'%</strong>';
            //Changes End
            $("#main").hide();            
            $("#res").html(res_str);
            res_str='';qcount=1;
        }               
			 //alert(xml);      
              id=qcount+1;
              qcount=id;         
            
            randx = $xml.find("randx"+id).text();
            randq = $xml.find("randq"+id).text();
            
            $("#a").html(randq);
            
            optarr = new Array();
            var  e= "cos";
            var  b= "-sin";
            var  c= "-cos";
            var  d= "sin";
            
            var	wr1= e.concat(randx);
            var	wr2= b.concat(randx);
            var	wr3= c.concat(randx);
            var	wr4= d.concat(randx);
		
			optarr.push(wr1);
			optarr.push(wr2);optarr.push(wr3);optarr.push(wr4);
            
            $("#ans1").html(randx);
            $("#ans2").html(randx);
            $("#ans3").html(randx);
            $("#ans4").html(randx);
		    $(':radio').attr('checked', false);
			// Changes start
            var dt = new Date();
		   nt = dt.getTime();
           // Changes end	    	
	});
});
