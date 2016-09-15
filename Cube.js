/*
RUBIKS CUBE
By Zachary Connelly

Powered By My...
3D CANVAS RENDERING ENGINE

ZACHARY CONNELLY
SUMMER 2010
*/
var twistri;
var twistfi;
var twistui;
var twistdi;
var twistli;
var twistbi;
var turnxi;
var turnyi;
var sdown = false;

function load() {
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
ctx.translate(250,250);
focaldistance = 300;
camx = 0;
camy = 0;
camz = 500;
rotdegsx = -30;
rotdegsy = 0;
rotdegsz = 0;
totalrotx = 0;
totalroty = 0;
totalrotz = 0;
filterby = 1;
get3ddata();
rot = 'x';
}

function get3ddata() {
grad(-250,-250,500,500,'white','blue');
env3d = new Array();
rubiks();
render();
}

function render() {
var zary = new Array();
var mzary = new Array();
for (var i=0;i<env3d.length;i++) {
for (var j=0;j<env3d[i][5].length;j++) {
if (filterby == 1) {
var x1 = camx;
var y1 = camy;
var z1 = camz;
var x2 = env3d[i][5][j][0];
var y2 = env3d[i][5][j][1];
var z2 = env3d[i][5][j][2];
var xd = x2-x1;
var yd = y2-y1;
var zd = z2-z1;
var dist = Math.sqrt(xd*xd + yd*yd + zd*zd);
zary[zary.length] = dist;
}
if (filterby == 0) {
zary[zary.length] = env3d[i][5][j][2];
}
}
zary = zary.sort(sortingfunction);
mzary[mzary.length] = [zary[zary.length-1],i,zary[0]];
zary = [];
}
mzary = mzary.sort(secondsortingfunction);
for(var i=0;i<env3d.length;i++) {
//
if (env3d[mzary[i][1]][2] != 'black') {
dpoly(env3d[mzary[i][1]][0],env3d[mzary[i][1]][1],env3d[mzary[i][1]][2],env3d[mzary[i][1]][3],env3d[mzary[i][1]][4]);
}
//
}
}

function sortingfunction(a,b) {
var a;
var b;
if (filterby == 0) {
return a-b;
}
if (filterby == 1) {
return b-a;
}
}

function secondsortingfunction(a,b) {
var a;
var b;
var aa = a[0];
var bb = b[0];
if (filterby == 0) {
return bb-aa;
}
if (filterby == 1) {
return aa-bb;
}
}

function mdown(e) {
sdown = e.shiftKey;
if (e.keyCode == 38) {
if (turnxi == null) {
turnxi = 0;
}
for (var i=0;i<=99;i++) {
setTimeout(turnxprime,10);
}
}
if (e.keyCode == 39) {
if (turnyi == null) {
turnyi = 0;
}
for (var i=0;i<=9;i++) {
setTimeout(turnyprime,10);
}
}
if (e.keyCode == 40) {
if (turnxi == null) {
turnxi = 0;
}
for (var i=0;i<=99;i++) {
setTimeout(turnx,10);
}
}
if (e.keyCode == 37) {
if (turnyi == null) {
turnyi = 0;
}
for (var i=0;i<=9;i++) {
setTimeout(turny,10);
}
}
if (e.keyCode == 13) {
ctx.clearRect(-250,-250,500,500);
rotdegsz=3;
totalrotz+=rotdegsz;
rot = 'z';
rotate();
}
if (e.keyCode == 81) {
ctx.clearRect(-250,-250,500,500);
camz+=30
get3ddata();
}
if (e.keyCode == 87) {
ctx.clearRect(-250,-250,500,500);
camy-=30;
get3ddata();
}
if (e.keyCode == 69) {
ctx.clearRect(-250,-250,500,500);
camz-=30;
get3ddata();
}
if (e.keyCode == 65) {
ctx.clearRect(-250,-250,500,500);
camx+=30;
get3ddata();
}
if (e.keyCode == 83) {
ctx.clearRect(-250,-250,500,500);
camy+=30;
get3ddata();
}
if (e.keyCode == 82) {
if (twistri == null) {
twistri = 0;
}
if (sdown == false) {
for (var i=0;i<=9;i++) {
setTimeout(twistr,10);
}
} else {
for (var i=0;i<=9;i++) {
setTimeout(twistrprime,10);
}
}
}
if (e.keyCode == 70) {
if (twistfi == null) {
twistfi = 0;
}
if (sdown == false) {
for (var i=0;i<=9;i++) {
setTimeout(twistf,10);
}
} else {
for (var i=0;i<=9;i++) {
setTimeout(twistfprime,10);
}
}
}
if (e.keyCode == 85) {
if (twistui == null) {
twistui = 0;
}
if (sdown == false) {
for (var i=0;i<=9;i++) {
setTimeout(twistu,10);
}
} else {
for (var i=0;i<=9;i++) {
setTimeout(twistuprime,10);
}
}
}
if (e.keyCode == 68) {
if (twistdi == null) {
twistdi = 0;
}
if (sdown == false) {
for (var i=0;i<=9;i++) {
setTimeout(twistd,10);
}
} else {
for (var i=0;i<=9;i++) {
setTimeout(twistdprime,10);
}
}
}
if (e.keyCode == 76) {
if (twistli == null) {
twistli = 0;
}
if (sdown == false) {
for (var i=0;i<=9;i++) {
setTimeout(twistl,10);
}
} else {
for (var i=0;i<=9;i++) {
setTimeout(twistlprime,10);
}
}
}
if (e.keyCode == 66) {
if (twistbi == null) {
twistbi = 0;
}
if (sdown == false) {
for (var i=0;i<=9;i++) {
setTimeout(twistb,10);
}
} else {
for (var i=0;i<=9;i++) {
setTimeout(twistbprime,10);
}
}
}
}

function twistr () {
twistri++;
var cubies = [16,12,17,7,3,9,19,26,21];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=30;
rot = 'x';
rotatethese(set);
rotdegsy=-45;
rot = 'y';
rotatethese(set);
rotdegsz=-9;
rot = 'z';
rotatethese(set);
rotdegsy=45;
rot = 'y';
rotatethese(set);
rotdegsx=-30;
rot = 'x';
rotatethese(set);
if (twistri == 10) {
twistri = 0;
var flip = [19,7,16,26,3,12,21,9,17];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function twistrprime () {
twistri++;
var cubies = [16,12,17,7,3,9,19,26,21];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=30;
rot = 'x';
rotatethese(set);
rotdegsy=-45;
rot = 'y';
rotatethese(set);
rotdegsz=9;
rot = 'z';
rotatethese(set);
rotdegsy=45;
rot = 'y';
rotatethese(set);
rotdegsx=-30;
rot = 'x';
rotatethese(set);
if (twistri == 10) {
twistri = 0;
var flip = [17,9,21,12,3,26,16,7,19];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function twistl () {
twistli++;
var cubies = [18,11,15,10,5,8,22,23,20];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=30;
rot = 'x';
rotatethese(set);
rotdegsy=-45;
rot = 'y';
rotatethese(set);
rotdegsz=-9;
rot = 'z';
rotatethese(set);
rotdegsy=45;
rot = 'y';
rotatethese(set);
rotdegsx=-30;
rot = 'x';
rotatethese(set);
if (twistli == 10) {
twistli = 0;
var flip = [22,10,18,23,5,11,20,8,15];
var flipset = new Array();function twistb () {
twistbi++;
var cubies = [17,13,15,9,2,8,21,25,20];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=30;
rot = 'x';
rotatethese(set);
rotdegsy=45;
rot = 'y';
rotatethese(set);
rotdegsz=9;
rot = 'z';
rotatethese(set);
rotdegsy=-45;
rot = 'y';
rotatethese(set);
rotdegsx=-30;
rot = 'x';
rotatethese(set);
if (twistbi == 10) {
twistbi = 0;
var flip = [21,9,17,25,2,13,20,8,15];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function twistlprime () {
twistli++;
var cubies = [18,11,15,10,5,8,22,23,20];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=30;
rot = 'x';
rotatethese(set);
rotdegsy=-45;
rot = 'y';
rotatethese(set);
rotdegsz=9;
rot = 'z';
rotatethese(set);
rotdegsy=45;
rot = 'y';
rotatethese(set);
rotdegsx=-30;
rot = 'x';
rotatethese(set);
if (twistli == 10) {
twistli = 0;
var flip = [15,8,20,11,5,23,18,10,22];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function twistf () {
twistfi++;
var cubies = [18,14,16,10,4,7,22,24,19];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=30;
rot = 'x';
rotatethese(set);
rotdegsy=45;
rot = 'y';
rotatethese(set);
rotdegsz=-9;
rot = 'z';
rotatethese(set);
rotdegsy=-45;
rot = 'y';
rotatethese(set);
rotdegsx=-30;
rot = 'x';
rotatethese(set);
if (twistfi == 10) {
twistfi = 0;
var flip = [22,10,18,24,4,14,19,7,16];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function twistfprime () {
twistfi++;
var cubies = [18,14,16,10,4,7,22,24,19];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=30;
rot = 'x';
rotatethese(set);
rotdegsy=45;
rot = 'y';
rotatethese(set);
rotdegsz=9;
rot = 'z';
rotatethese(set);
rotdegsy=-45;
rot = 'y';
rotatethese(set);
rotdegsx=-30;
rot = 'x';
rotatethese(set);
if (twistfi == 10) {
twistfi = 0;
var flip = [16,7,19,14,4,24,18,10,22];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function twistb () {
twistbi++;
var cubies = [17,13,15,9,2,8,21,25,20];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=30;
rot = 'x';
rotatethese(set);
rotdegsy=45;
rot = 'y';
rotatethese(set);
rotdegsz=9;
rot = 'z';
rotatethese(set);
rotdegsy=-45;
rot = 'y';
rotatethese(set);
rotdegsx=-30;
rot = 'x';
rotatethese(set);
if (twistbi == 10) {
twistbi = 0;
var flip = [21,9,17,25,2,13,20,8,15];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function twistbprime () {
twistbi++;
var cubies = [17,13,15,9,2,8,21,25,20];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=30;
rot = 'x';
rotatethese(set);
rotdegsy=45;
rot = 'y';
rotatethese(set);
rotdegsz=-9;
rot = 'z';
rotatethese(set);
rotdegsy=-45;
rot = 'y';
rotatethese(set);
rotdegsx=-30;
rot = 'x';
rotatethese(set);
if (twistbi == 10) {
twistbi = 0;
var flip = [15,8,20,13,2,25,17,9,21];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function twistu () {
twistui++;
var cubies = [18,11,15,14,1,13,16,12,17];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=-60;
rot = 'x';
rotatethese(set);
rotdegsz=-9;
rot = 'z';
rotatethese(set);
rotdegsx=60;
rot = 'x';
rotatethese(set);
if (twistui == 10) {
twistui = 0;
var flip = [16,14,18,12,1,11,17,13,15];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function twistuprime () {
twistui++;
var cubies = [18,11,15,14,1,13,16,12,17];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=-60;
rot = 'x';
rotatethese(set);
rotdegsz=9;
rot = 'z';
rotatethese(set);
rotdegsx=60;
rot = 'x';
rotatethese(set);
if (twistui == 10) {
twistui = 0;
var flip = [15,13,17,11,1,12,18,14,16];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function twistd () {
twistdi++;
var cubies = [19,26,21,24,6,25,22,23,20];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=120;
rot = 'x';
rotatethese(set);
rotdegsz=-9;
rot = 'z';
rotatethese(set);
rotdegsx=-120;
rot = 'x';
rotatethese(set);
if (twistdi == 10) {
twistdi = 0;
var flip = [22,24,19,23,6,26,20,25,21];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function twistdprime () {
twistdi++;
var cubies = [19,26,21,24,6,25,22,23,20];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=120;
rot = 'x';
rotatethese(set);
rotdegsz=9;
rot = 'z';
rotatethese(set);
rotdegsx=-120;
rot = 'x';
rotatethese(set);
if (twistdi == 10) {
twistdi = 0;
var flip = [21,25,20,26,6,23,19,24,22];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function turny () {
turnyi++;
var cubies = [18,11,15,10,5,8,22,23,20,14,1,13,4,0,2,24,6,25,16,12,17,7,3,9,19,26,21];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=30;
rot = 'x';
rotate();
rotdegsy=9;
rot = 'y';
rotate();
rotdegsx=-30;
rot = 'x';
rotate();
if (turnyi == 10) {
turnyi = 0;
var flip = [15,13,17,8,2,9,20,25,21,11,1,12,5,0,3,23,6,26,18,14,16,10,4,7,22,24,19];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function turnyprime () {
turnyi++;
var cubies = [18,11,15,10,5,8,22,23,20,14,1,13,4,0,2,24,6,25,16,12,17,7,3,9,19,26,21];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=30;
rot = 'x';
rotate();
rotdegsy=-9;
rot = 'y';
rotate();
rotdegsx=-30;
rot = 'x';
rotate();
if (turnyi == 10) {
turnyi = 0;
var flip = [16,14,18,7,4,10,19,24,22,12,1,11,3,0,5,26,6,23,17,13,15,9,2,8,21,25,20];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function turnx () {
turnxi++;
var cubies = [18,11,15,10,5,8,22,23,20,14,1,13,4,0,2,24,6,25,16,12,17,7,3,9,19,26,21];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=1.8;
rot = 'x';
rotate();
if (turnxi == 100) {
turnxi = 0;
var flip = [22,24,19,10,4,7,18,14,16,23,6,26,5,0,3,11,1,12,20,25,21,8,2,9,15,13,17];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function turnxprime () {
turnxi++;
var cubies = [18,11,15,10,5,8,22,23,20,14,1,13,4,0,2,24,6,25,16,12,17,7,3,9,19,26,21];
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}
rotdegsx=-1.8;
rot = 'x';
rotate();
if (turnxi == 100) {
turnxi = 0;
var flip = [22,24,19,10,4,7,18,14,16,23,6,26,5,0,3,11,1,12,20,25,21,8,2,9,15,13,17];
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}
var old = new Array();
for (var m=0;m<env3d.length;m++) {
old[m] = env3d[m];
}
for (var k=0;k<flipset.length;k++) {
env3d[set[k]] = old[flipset[k]];
}
}
}

function rotatethese(cubies) {
ctx.clearRect(-250,-250,500,500);
grad(-250,-250,500,500,'white','blue');
oldenv = env3d;
env3d = new Array();
for (var i=0;i<oldenv.length;i++) {
if (cubies.indexOf(i) != -1) {
var fcol = oldenv[i][2];
var lcol = oldenv[i][3];
var lwid = oldenv[i][4];
var coordsary = oldenv[i][5];
if (rot == 'x') {
var coordsary = rotatex(coordsary,rotdegsx);
}
if (rot == 'y') {
var coordsary = rotatey(coordsary,rotdegsy);
}
if (rot == 'z') {
var coordsary = rotatez(coordsary,rotdegsz);
}
d3dface(coordsary,fcol,lcol,lwid);
} else {
var fcol = oldenv[i][2];
var lcol = oldenv[i][3];
var lwid = oldenv[i][4];
var coordsary = oldenv[i][5];
d3dface(coordsary,fcol,lcol,lwid);
}
}
render();
}

function rubiks() {
var cxs = [0,0,50*Math.sqrt(2),50*Math.sqrt(2),-50*Math.sqrt(2),-50*Math.sqrt(2),0,0,0,100*Math.sqrt(2),-100*Math.sqrt(2),-50*Math.sqrt(2),50*Math.sqrt(2),50*Math.sqrt(2),1-50*Math.sqrt(2),0,0,100*Math.sqrt(2),-100*Math.sqrt(2),0,0,100*Math.sqrt(2),-100*Math.sqrt(2),-50*Math.sqrt(2),-50*Math.sqrt(2),50*Math.sqrt(2),50*Math.sqrt(2)];
var cys = [0,100,0,0,0,0,-100,0,0,0,0,100,100,100,100,100,100,100,100,-100,-100,-100,-100,-100,-100,-100,-100];
var czs = [0,0,50*Math.sqrt(2),-50*Math.sqrt(2),-50*Math.sqrt(2),50*Math.sqrt(2),0,-100*Math.sqrt(2),100*Math.sqrt(2),0,0,50*Math.sqrt(2),-50*Math.sqrt(2),50*Math.sqrt(2),-50*Math.sqrt(2),100*Math.sqrt(2),-100*Math.sqrt(2),0,0,-100*Math.sqrt(2),100*Math.sqrt(2),0,0,50*Math.sqrt(2),-50*Math.sqrt(2),50*Math.sqrt(2),-50*Math.sqrt(2)];
var c1s = ['black','black','black','red','black','black','black','red','black','red','black','black','red','black','black','black','red','red','black','red','black','red','black','black','black','black','red'];
var c2s = ['black','black','black','black','green','black','black','green','black','black','green','black','black','black','green','black','green','black','green','green','black','black','green','black','green','black','black'];
var c3s = ['black','white','black','black','black','black','black','black','black','black','black','white','white','white','white','white','white','white','white','black','black','black','black','black','black','black','black'];
var c4s = ['black','black','black','black','black','black','yellow','black','black','black','black','black','black','black','black','black','black','black','black','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'];
var c5s = ['black','black','black','black','black','orange','black','black','orange','black','orange','orange','black','black','black','orange','black','black','orange','black','orange','black','orange','orange','black','black','black'];
var c6s = ['black','black','blue','black','black','black','black','black','blue','blue','black','black','black','blue','black','blue','black','blue','black','black','blue','blue','black','black','black','blue','black'];
for (var i=0;i<c1s.length;i++) {
centerx = cxs[i];
centery = cys[i];
centerz = czs[i];
size = 100;
c1 = c1s[i];
c2 = c2s[i];
c3 = c3s[i];
c4 = c4s[i];
c5 = c5s[i];
c6 = c6s[i];
linecol = 'black';
linewid = 1;
newsize = size/2;
coo1 = [[centerx,newsize+centery,-newsize*Math.sqrt(2)+centerz],[centerx,-newsize+centery,-(newsize*Math.sqrt(2))+centerz],[newsize*Math.sqrt(2)+centerx,-newsize+centery,centerz],[newsize*Math.sqrt(2)+centerx,newsize+centery,centerz]];
coo2 = [[centerx,newsize+centery,-newsize*Math.sqrt(2)+centerz],[centerx,-newsize+centery,-(newsize*Math.sqrt(2))+centerz],[-newsize*Math.sqrt(2)+centerx,-newsize+centery,+centerz],[-newsize*Math.sqrt(2)+centerx,newsize+centery,+centerz]];
coo3 = [[centerx,newsize+centery,-newsize*Math.sqrt(2)+centerz],[-newsize*Math.sqrt(2)+centerx,newsize+centery,+centerz],[centerx,newsize+centery,newsize*Math.sqrt(2)+centerz],[newsize*Math.sqrt(2)+centerx,newsize+centery,+centerz]];
coo4 = [[centerx,-newsize+centery,-newsize*Math.sqrt(2)+centerz],[-newsize*Math.sqrt(2)+centerx,-newsize+centery,+centerz],[centerx,-newsize+centery,newsize*Math.sqrt(2)+centerz],[newsize*Math.sqrt(2)+centerx,-newsize+centery,+centerz]];
coo5 = [[centerx,newsize+centery,newsize*Math.sqrt(2)+centerz],[centerx,-newsize+centery,newsize*Math.sqrt(2)+centerz],[-newsize*Math.sqrt(2)+centerx,-newsize+centery,+centerz],[-newsize*Math.sqrt(2)+centerx,newsize+centery,+centerz]];
coo6 = [[centerx,newsize+centery,newsize*Math.sqrt(2)+centerz],[centerx,-newsize+centery,newsize*Math.sqrt(2)+centerz],[newsize*Math.sqrt(2)+centerx,-newsize+centery,+centerz],[newsize*Math.sqrt(2)+centerx,newsize+centery,+centerz]];
coo1 = rotatex(coo1,rotdegsx);
coo2 = rotatex(coo2,rotdegsx);
coo3 = rotatex(coo3,rotdegsx);
coo4 = rotatex(coo4,rotdegsx);
coo5 = rotatex(coo5,rotdegsx);
coo6 = rotatex(coo6,rotdegsx);
coo1 = rotatey(coo1,rotdegsy);
coo2 = rotatey(coo2,rotdegsy);
coo3 = rotatey(coo3,rotdegsy);
coo4 = rotatey(coo4,rotdegsy);
coo5 = rotatey(coo5,rotdegsy);
coo6 = rotatey(coo6,rotdegsy);
coo1 = rotatez(coo1,rotdegsz);
coo2 = rotatez(coo2,rotdegsz);
coo3 = rotatez(coo3,rotdegsz);
coo4 = rotatez(coo4,rotdegsz);
coo5 = rotatez(coo5,rotdegsz);
coo6 = rotatez(coo6,rotdegsz);
d3dface(coo1,c1,linecol,linewid);
d3dface(coo2,c2,linecol,linewid);
d3dface(coo3,c3,linecol,linewid);
d3dface(coo4,c4,linecol,linewid);
d3dface(coo5,c5,linecol,linewid);
d3dface(coo6,c6,linecol,linewid);
render();
//alert(i);
}
}

function getcube(middlecoords,height,width,depth,xrot,yrot,zrot) {
var x = middlecoords[0];
var y = middlecoords[1];
var z = middlecoords[2];
var s1 = [[x-width/2,y+height/2,z+depth/2],[x-width/2,y-height/2,z+depth/2],[x+width/2,y-height/2,z+depth/2],[x+width/2,y+height/2,z+depth/2]];
var s2 = [[x+width/2,y+height/2,z-depth/2],[x+width/2,y-height/2,z-depth/2],[x-width/2,y-height/2,z-depth/2],[x-width/2,y+height/2,z-depth/2]];
var s3 = [[x-width/2,y+height/2,z-depth/2],[x-width/2,y-height/2,z-depth/2],[x-width/2,y-height/2,z+depth/2],[x-width/2,y+height/2,z+depth/2]];
var s4 = [[x+width/2,y+height/2,z+depth/2],[x+width/2,y-height/2,z+depth/2],[x+width/2,y-height/2,z-depth/2],[x+width/2,y+height/2,z-depth/2]];
var s5 = [[x-width/2,y+height/2,z-depth/2],[x-width/2,y+height/2,z+depth/2],[x+width/2,y+height/2,z+depth/2],[x+width/2,y+height/2,z-depth/2]];
var s6 = [[x+width/2,y-height/2,z-depth/2],[x+width/2,y-height/2,z+depth/2],[x-width/2,y-height/2,z+depth/2],[x-width/2,y-height/2,z-depth/2]];
s1 = rotatex(s1,xrot);
s2 = rotatex(s2,xrot);
s3 = rotatex(s3,xrot);
s4 = rotatex(s4,xrot);
s5 = rotatex(s5,xrot);
s6 = rotatex(s6,xrot);
s1 = rotatey(s1,yrot);
s2 = rotatey(s2,yrot);
s3 = rotatey(s3,yrot);
s4 = rotatey(s4,yrot);
s5 = rotatey(s5,yrot);
s6 = rotatey(s6,yrot);
s1 = rotatez(s1,zrot);
s2 = rotatez(s2,zrot);
s3 = rotatez(s3,zrot);
s4 = rotatez(s4,zrot);
s5 = rotatez(s5,zrot);
s6 = rotatez(s6,zrot);
return [s1,s2,s3,s4,s5,s6];
}

function getprism(centerofbase,height,width,depth) {
var x = centerofbase[0];
var y = centerofbase[1];
var z = centerofbase[2];
var base = getcube(centerofbase,height,width,depth,0,0,0);
var trif = [[x,y+height,z-depth/2],base[5][0],base[5][3]];
var trib = [[x,y+height,z+depth/2],base[5][1],base[5][2]];
var roof1 = [trib[2],trif[2],trif[0],trib[0]];
var roof2 = [trif[1],trib[1],trib[0],trif[0]];
return [base[5],trif,trib,roof1,roof2];
}

function rotate() {
ctx.clearRect(-250,-250,500,500);
grad(-250,-250,500,500,'white','blue');
oldenv = env3d;
env3d = new Array();
for (var i=0;i<oldenv.length;i++) {
var fcol = oldenv[i][2];
var lcol = oldenv[i][3];
var lwid = oldenv[i][4];
var coordsary = oldenv[i][5];
if (rot == 'x') {
var coordsary = rotatex(coordsary,rotdegsx);
}
if (rot == 'y') {
var coordsary = rotatey(coordsary,rotdegsy);
}
if (rot == 'z') {
var coordsary = rotatez(coordsary,rotdegsz);
}
d3dface(coordsary,fcol,lcol,lwid);
}
render();
}

function rotatex(initial,degs) {
var initial;
var returnthis = new Array();
for (var i=0;i<initial.length;i++) {
var x = initial[i][0];
var y = initial[i][1];
var z = initial[i][2];
var ynew = y*Math.cos(degs*Math.PI/180) - z*Math.sin(degs*Math.PI/180);
var znew = z*Math.cos(degs*Math.PI/180) + y*Math.sin(degs*Math.PI/180);
var temp = new Array();
temp[0] = x;
temp[1] = ynew;
temp[2] = znew;
returnthis[returnthis.length] = temp;
}
return returnthis;
}

function rotatey(initial,degs) {
var initial;
var returnthis = new Array();
for (var i=0;i<initial.length;i++) {
var x = initial[i][0];
var y = initial[i][1];
var z = initial[i][2];
var xnew = x*Math.cos(degs*Math.PI/180) - z*Math.sin(degs*Math.PI/180);
var znew = z*Math.cos(degs*Math.PI/180) + x*Math.sin(degs*Math.PI/180);
var temp = new Array();
temp[0] = xnew;
temp[1] = y;
temp[2] = znew;
returnthis[returnthis.length] = temp;
}
return returnthis;
}

function rotatez(initial,degs) {
var initial;
var returnthis = new Array();
for (var i=0;i<initial.length;i++) {
var x = initial[i][0];
var y = initial[i][1];
var z = initial[i][2];
var xn = x*Math.cos(degs*Math.PI/180) - y*Math.sin(degs*Math.PI/180);
var yn = y*Math.cos(degs*Math.PI/180) + x*Math.sin(degs*Math.PI/180);
var temp = new Array();
temp[0] = xn;
temp[1] = yn;
temp[2] = z;
returnthis[returnthis.length] = temp;
}
return returnthis;
}

function d3dface(coordsary,fillcolor,linecolor,linewidth) {
var coordsary;
var tempary = new Array();
for (i=0;i<coordsary.length;i++) {
tempary[i] = threed22d(coordsary[i]);
}
var xcoords = new Array();
var ycoords = new Array();
for (i=0;i<tempary.length;i++) {
xcoords[xcoords.length] = tempary[i][0];
ycoords[ycoords.length] = tempary[i][1];
}
if (!fillcolor) {
fillcolor = null;
}
if (!linecolor) {
linecolor = null;
}
if (!linewidth) {
linewidth = null;
}
env3d[env3d.length] = [xcoords,ycoords,fillcolor,linecolor,linewidth,coordsary];
}

function threed22d (threedcoordsxyz) {
var threedx = threedcoordsxyz[0];
var threedy = threedcoordsxyz[1];
var threedz = threedcoordsxyz[2]+200;
var x = (threedx+camx)*focaldistance/(threedz+camz);
var y = -1*(threedy+camy)*focaldistance/(threedz+camz);
return [x,y];
}

function randpoly() {
var verts = Math.ceil(Math.random()*10 + 2);
var xary = new Array();
var yary = new Array();
for (var i=0;i<verts;i++) {
xary[xary.length] = Math.floor((Math.random()-.5)*500);
yary[yary.length] = Math.floor((Math.random()-.5)*500);
}
var r = Math.floor(Math.random()*256);
var g = Math.floor(Math.random()*256);
var b = Math.floor(Math.random()*256);
var a = Math.random();
var col = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
dpoly(xary,yary,col);
}

function dpoly(xcoords,ycoords,fillcolor,linecolor,linewidth) {
if (fillcolor) {
ctx.fillStyle = fillcolor;
}
if (linecolor) {
ctx.strokeStyle = linecolor;
}
if (linewidth) {
ctx.strokeWidth = linewidth;
}
if (xcoords.length != ycoords.length) {
alert('X-Coordinates and Y-Coordinates are not the same length!');
}
ctx.moveTo(xcoords[0],ycoords[0]);
ctx.beginPath();
for(var i=0;i<xcoords.length;i++) {
ctx.lineTo(xcoords[i],ycoords[i]);
}
ctx.closePath();
if ((linecolor) || (linewidth)) {
ctx.stroke();
}
if (fillcolor) {
ctx.fill();
}
}

function grad(x,y,width,height,firstcolor,secondcolor) {
var grd = ctx.createLinearGradient(x,y,width,height);
grd.addColorStop(0,firstcolor);
grd.addColorStop(0.5,secondcolor);
ctx.fillStyle = grd;
frect(x,y,width,height,grd);
}

function frect(x,y,width,height,color) {
ctx.fillStyle = color;
ctx.fillRect(x,y,width,height);
}

function drect(x,y,width,height,color,borderwidth) {
ctx.strokeStyle = color;
ctx.lineWidth = borderwidth;
ctx.strokeRect(x,y,width,height);
}

function crect(x,y,width,height) {
ctx.clearRect(x,y,width,height);
}
