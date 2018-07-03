  	function loadchObjFile(url)
		{
		    var req = new XMLHttpRequest();
		    req.onreadystatechange = function () { processBallLoadObj(req) };
		    req.open("GET", url, true);
		    req.responseType = "text";
		    req.send(null);
		}
		
		function createBall(objDataIn)
		{
		   if(shaderProgArray[1])
		   {
		      //创建绘制用的物体
          ooTri=new ObjObject(gl,objDataIn.vertices,objDataIn.normals,shaderProgArray[1]);
		   }
		   else
		   {
		      setTimeout(function(){createBall(objDataIn);},10); //定时调用createBall（）方法，只调用一次
		   }
		}

		function processBallLoadObj(req)
		{
		    if (req.readyState == 4)
		    {
		        var objStr = req.responseText;
		        var dataTemp=fromObjStrToObjectData(objStr);
		        createBall(dataTemp);
		    }
		}
