function TextureRect(gl,programIn) {
    this.vcount=6;
    this.vertices=
        [
            -28,28,0,
            -28,-28,0,
            28,-28,0,

            28,-28,0,
            28,28,0,
            -28,28,0
        ];
    this.cubeBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,this.cubeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertices),gl.STATIC_DRAW);

    this.texCoor=//顶点颜色值数组，每个顶点4个色彩值RGBA
        [
            1,0, 1,1, 0,1,
            0,1, 0,0, 1,0
        ];
    this.cubeTexBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,this.cubeTexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.texCoor),gl.STATIC_DRAW);

    this.program=programIn;
    this.drawSelf=function(ms,texture)
    {
        gl.useProgram(this.program);
        gl.uniform1i(gl.getUniformLocation(this.program, "sTexture"), 0);
        //送入总矩阵
        var uMVPMatrixHandle=gl.getUniformLocation(this.program, "uMVPMatrix");
        gl.uniformMatrix4fv(uMVPMatrixHandle,false,new Float32Array(ms.getFinalMatrix()));

        //启用顶点数据
        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aPosition"));
        //将顶点数据送入渲染管线
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeBuffer);
        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "aPosition"), 3, gl.FLOAT, false, 0, 0);

        //启用纹理坐标数据
        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aTexCoor"));
        //将顶点纹理坐标数据送入渲染管线
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeTexBuffer);
        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "aTexCoor"), 2, gl.FLOAT, false, 0, 0);

        //绑定纹理
        gl.bindTexture(gl.TEXTURE_2D, texture);

        //用顶点法绘制物体
        gl.drawArrays(gl.TRIANGLES, 0, this.vcount);
    }
}