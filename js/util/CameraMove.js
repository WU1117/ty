/**
 * Created by ~ on 2017/9/14.
 */
function cameraMove(currentAngleX,currentAngleY) {
    currentAngleX = currentAngleX*0.017453;//方位角0
    currentAngleY = currentAngleY*0.017453;//仰角（弧度）5
    cy=target*Math.sin(currentAngleY);
    var xz=target*Math.cos(currentAngleY);
    cx=xz*Math.sin(currentAngleX);//获得摄像机x
    cz=xz*Math.cos(currentAngleX);//获得摄像机z
    var cameraNor=new vecor3(cx,cy,cz).getNormal();//对摄像机向量标量化
    var tempNor=cameraNor.cProduct(new vecor3(0,1,0));//视线和(0 1 0)叉乘；
    var upNor=tempNor.cProduct(cameraNor);//得出结果后与视线叉乘
    upX=upNor.x;//对摄像机up向量赋值
    upY=upNor.y;//对摄像机up向量赋值
    upZ=upNor.z;//对摄像机up向量赋值
    ms.setCamera(cx,cy,cz,0,0,0,upX,upY,upZ);
}
function vecor3(vx,vy,vz){
    this.x=vx;
    this.y=vy;
    this.z=vz;
    this.getNormal=function(){
      var total=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
      return new vecor3(this.x/total,this.y/total,this.z/total);
    }
    this.cProduct=function(v){
       return new vecor3(this.y*v.z-v.y*this.z,this.z*v.x-v.z*this.x,this.x*v.y-v.x*this.y);
    }
}