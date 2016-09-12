var $ = {
    canvas: null,
    ctx: null,
    width: undefined,
    height: undefined,
    initialize: function(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    },
    clear: function(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
    }
};

var Clock = {

//Overall radius settings
    inRadius: 140,
    outRadius: 148,

//Division settings
    //Quadrant divisions
    divCap: 'round',
    mainDivCol: '#33A',
    mainDivWidth: 10,
    //Hour divisions
    divCol: '#000',
    divWidth:7,
    //Subdivisions
    subDivCol: '#00A',
    subDivWidth: '3',

//Hand settings
    //Hour hand
    hourHandLength: 130,
    hourHandButt: 10,
    hourHandWidth: 8,
    //Minute hand
    minHandLength: 140,
    minHandButt: 20,
    minHandWidth: 6,
    //Second hand
    secHandLength: 139,
    secHandButt: 30,
    secHandWidth: 2,
};

function OnLoad () {
    $.initialize('clock');
    $.ctx.translate($.width / 2, $.height / 2);
    setInterval(Update, 1000);
}

function Update () {
  $.clear("white");
  drawDivisions();
  drawAllHands();
}

function drawDivisions () {
  //Draw subdivisons for seconds
  for (let i = 0; i < 60; i++) {
    $.ctx.save();
    $.ctx.rotate(i * Math.PI /30);
    $.ctx.beginPath();
    $.ctx.strokeStyle = Clock.subDivCol;
    $.ctx.lineWidth = Clock.subDivWidth;
    $.ctx.lineCap = Clock.divCap;
    $.ctx.moveTo(Clock.inRadius, 0);
    $.ctx.lineTo(Clock.outRadius, 0);
    $.ctx.stroke();
    $.ctx.closePath();
    $.ctx.restore();
  }

  //Draw divisions for hours
  for (let i = 0; i < 12; i++) {
    $.ctx.save();
    $.ctx.rotate(i * Math.PI /6);
    $.ctx.beginPath();
    $.ctx.lineCap = Clock.divCap;
    if(i % 3 == 0){
      $.ctx.strokeStyle = Clock.mainDivCol;
      $.ctx.lineWidth = Clock.mainDivWidth;
      $.ctx.moveTo(0.99 * Clock.inRadius, 0);
      $.ctx.lineTo(1.02 * Clock.outRadius, 0);
    }
    else{
      $.ctx.strokeStyle = Clock.divCol;
      $.ctx.lineWidth = Clock.divWidth;
      $.ctx.moveTo(Clock.inRadius, 0);
      $.ctx.lineTo(Clock.outRadius, 0);
    }
    $.ctx.stroke();
    $.ctx.closePath();
    $.ctx.restore();
  }
}

function drawAllHands () {
  var t = new Date();
  var hours = t.getHours();
  var mins = t.getMinutes();
  var secs = t.getSeconds();
  //Draw hour hand
  { let angle = (Math.PI * hours / 6) + (Math.PI * mins / 360) - (Math.PI/2);
    $.ctx.save();
    $.ctx.rotate(angle);
    $.ctx.beginPath();
    $.ctx.strokeStyle = "black";
    $.ctx.lineWidth = Clock.hourHandWidth;
    $.ctx.moveTo(-Clock.hourHandButt, 0);
    $.ctx.lineTo(Clock.hourHandLength, 0);
    $.ctx.stroke();
    $.ctx.closePath();
    $.ctx.restore();
  }
  //Draw minute hand
  { let angle = (Math.PI * mins / 30) + (Math.PI * secs / 3600) - (Math.PI/2);
    $.ctx.save();
    $.ctx.rotate(angle);
    $.ctx.beginPath();
    $.ctx.strokeStyle = "black";
    $.ctx.lineWidth = Clock.minHandWidth;
    $.ctx.moveTo(-Clock.minHandButt, 0);
    $.ctx.lineTo(Clock.minHandLength, 0);
    $.ctx.stroke();
    $.ctx.closePath();
    $.ctx.restore();
  }
  //Draw second hand
  { let angle = (Math.PI * secs / 30) - (Math.PI/2);
    $.ctx.save();
    $.ctx.rotate(angle);
    $.ctx.beginPath();
    $.ctx.strokeStyle = "black";
    $.ctx.lineWidth = Clock.secHandWidth;
    $.ctx.moveTo(-Clock.secHandButt, 0);
    $.ctx.lineTo(Clock.secHandLength, 0);
    $.ctx.stroke();
    $.ctx.closePath();
    $.ctx.restore();
  }
}
