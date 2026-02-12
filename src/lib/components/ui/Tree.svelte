<script lang="ts">
    let myCanvas: HTMLCanvasElement;
    $effect(() => {
        var ctx = myCanvas.getContext("2d");
        var rnd_rot = 10 + Math.floor(Math.random() * 10);
        var rnd_len = 100;
        var rnd_width = 4 + Math.floor(Math.random() * 3);
        function drawTree(startX: number, startY: number, len: number, angle: number, branchWidth: number) {
            if(!ctx) return;
            ctx.lineWidth = branchWidth;

            ctx.beginPath();
            ctx.save();
            ctx.strokeStyle = `rgb(0,0,0)`;
            ctx.fillStyle = "black";
            ctx.shadowBlur = 5;
            ctx.shadowColor = "rgba(0,0,0,0.8)";

            ctx.translate(startX, startY);
            ctx.rotate(angle * Math.PI/180);
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -len);
            ctx.stroke();


            if(len < 4) {
                ctx.restore();
                return;
            }
            
            drawTree(0, -len, len*0.8, angle-rnd_rot, branchWidth*0.8);
            drawTree(0, -len, len*0.8, angle+rnd_rot, branchWidth*0.8);
            ctx.restore();
        }
        drawTree(300, 600, rnd_len, 0, rnd_width)
    });
</script>
<canvas bind:this={myCanvas} width="600" height="600" ></canvas>