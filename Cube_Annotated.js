/*
RUBIKS CUBE
By Zachary Connelly

Powered By My...
3D CANVAS RENDERING ENGINE

ZACHARY CONNELLY
SUMMER 2010
*/

/* GLOBAL VARIABLE DECLARATION */

// these variables come in the form "twist" + x + [i/ii];
// the x is the side that is being twisted (r=right, l=left...)
// and i means it's clockwise, ii is counter-clockwise
// these variables count the number of 9 degree turns of the side specified in the direction specified, so 10 will be once complete cycle, and graphically, will appear as a continuous turn
var twistri = 0;
var twistrii = 0;
var twistfi = 0;
var twistfii = 0;
var twistui = 0;
var twistuii = 0;
var twistdi = 0;
var twistdii = 0;
var twistli = 0;
var twistlii = 0;
var twistbi = 0;
var twistbii = 0;
var turnxi = 0;
var turnxii = 0;
var turnyi = 0;
var turnyii = 0;

// sdown essentially = event.shiftKey... (why essentially and not actually? we'll get to that later...)
var sdown = false;

// twisting = 0 if no side is currently being twisted, twisting = 1 when there is a side that's being twisted
var twisting = 0;

// the stack of twists to be performed
var stack = new Array();

/* LOAD FUNCTION */

function load() {

// grab the canvas
canvas = document.getElementById('canvas');

// grab the 2d context within the canvas
ctx = canvas.getContext('2d');

// move the canvas so that the center is (0,0) (rather than 250,250)
ctx.translate(250,250);

// set the focal distance of the camera
focaldistance = 300;

// set the camera coordinates (0,0,500)
camx = 0;
camy = 0;
camz = 500;

// set the initial rotation of the cube
rotdegsx = -30;
rotdegsy = 0;
rotdegsz = 0;

// filterby... (0) means it paints the polygons from highest z-index to lowest z-index(1) means it paints them from furthest from the camera, to nearest the camera
filterby = 1;

// this calls get3ddata with is essentially the 'control' function for starting the program
get3ddata();

// rot is the variable that will only allow one rotation at a time, in this case an 'x' rotation (a rotation about the x axis)
rot = 'x';
}


// the control function for starting up the program... this function will make the canvas go from white to having rendered a rubik's cube, and be ready to accept input from the user
function get3ddata() {

// make a gradient from the top left corner to the bottom right corner going from white to blue
grad(-250,-250,500,500,'white','blue');

// initialize the env3d array...
// this is the "Master Array" as it contains all of the 3d data for the program... and is designed as follows...

// env3d = [polygon1,polygon2,polygon3...];
// polygon1 = [2dxcoordinates,2dycoordinates,fillcolor,linecolor,linewidth,coordsary];
// 2dxcoordinates = [xcoordinate1,xcoordinate2,xcoordinate3...];
// 2dycoordinates = [ycoordinate1,ycoordinate2,ycoordinate3...];
// coordsary = [point1,point2,point3...];
// point1 = [x,y,z];

// Also, starting with env3d[0] (polygon1), each group of 6 polygons is a cubie on the rubik's cube...
// The polygons that make up the cube are defined in this order... (R,F,U,D,L,B)

// Examples...
// env3d[4] is the 5th polygon...
// env3d[4][0] is the 2 Dimensional X-coordinates for the 5th polygon
// env3d[4][5][1][2] is the z coordinate of the second point of the 3d coordinates for the 5th polygon...
env3d = new Array();

// this floods env3d with the starting 3d data
rubiks();

// this renders the 3d environment based on the data in env3d;
// it's like ctx.paint(); except in 3d...
render();
}

// This renders the 3d environment based on the data in env3d;
// think of it like ctx.paint(); except the 3d version...
function render() {
// this function works in two seperate ways based on the value of filterby.
// (1)- means the first designation of filterby
// (0)- means the zero designation of filterby

// array to be filled with (1)- distances of points from camera (0)- z coordinates in 3d space
var zary = new Array();

// the max of the zary for each polygon
var mzary = new Array();

// for each polygon...
for (var i=0;i<env3d.length;i++) {

// for each point on that polygon...
for (var j=0;j<env3d[i][5].length;j++) {

// if using the more advanced filter method
if (filterby == 1) {

// grab the 3d coordinates of the camera
var x1 = camx;
var y1 = camy;
var z1 = camz;

// grab the 3d coordinates of the point
var x2 = env3d[i][5][j][0];
var y2 = env3d[i][5][j][1];
var z2 = env3d[i][5][j][2];

// find the distance between those points
var xd = x2-x1;
var yd = y2-y1;
var zd = z2-z1;
var dist = Math.sqrt(xd*xd + yd*yd + zd*zd);

// store that distance in the zary
zary[zary.length] = dist;
}

// if using the less advanced filter function...
if (filterby == 0) {

// grab the z coordinate of the point in question, and store it in the zary
zary[zary.length] = env3d[i][5][j][2];
}
}

// sort the zary (1)- ascending or (0)- descending
zary = zary.sort(sortingfunction);

// grab the (1)- maximum or (0)- minimum of the zary, and put it on mzary, along with the polygon index and the first element in zary
mzary[mzary.length] = [zary[zary.length-1],i,zary[0]];

// clear zary
zary = [];
}


//sort the mzary (1)- descending or (0)- ascending
mzary = mzary.sort(secondsortingfunction);

// for each polygon
for(var i=0;i<env3d.length;i++) {
//
// if that polygon is not black (is a face on the outside of the cube)
if (env3d[mzary[i][1]][2] != 'black') {

// draw the polygon
dpoly(env3d[mzary[i][1]][0],env3d[mzary[i][1]][1],env3d[mzary[i][1]][2],env3d[mzary[i][1]][3],env3d[mzary[i][1]][4]);
}
//
}
}

// sorts elements in (1)- ascending order or (0)- descending order
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

// sorts elements in (1)- descending order or (0)- ascending orde
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

// this is the main (as of now only) action listener for the cube
// e is the event, ekc is event.keyCode, and human = 0 for being called internally, or human = 1 if the function was called externally (by a human)
function mdown(e,ekc,human) {

// if this function was called by the user, add the command to the stack (e = event.shiftKey, ekc = event.keyCode)
if (human == 1) {
stack.unshift([e,ekc]);
}

// if no sides are currently being twisted...
if (twisting == 0) {

// sdown = e = event.shiftKey;
sdown = e;

// all of these functions work the same way, so I'll explain one...

// if the 'whatever' key is pressed...
if (ekc == 38) {

// yes, there will be twisting involved.
twisting = 1;

// setInterval (TURN THAT SIDE);
myint = setInterval(turnxprime,3);

// set Interval (if the side has been turned to 1 less than completion, turn it once more, clear the interval, and free up the code for another command
setInterval("if (turnxii == 99) {turnxprime();clearInterval(myint); twisting = 0;}",10);
}
if (ekc == 39) {
twisting = 1;
myint = setInterval(turnyprime,30);
setInterval("if (turnyii == 9) {turnyprime();clearInterval(myint); twisting = 0;}",10);
}
if (ekc == 40) {
twisting = 1;
myint = setInterval(turnx,3);
setInterval("if (turnxi == 99) {turnx();clearInterval(myint); twisting = 0;}",10);
}
if (ekc == 37) {
twisting = 1;
myint = setInterval(turny,30);
setInterval("if (turnyi == 9) {turny();clearInterval(myint); twisting = 0;}",10);
}
if (ekc == 82) {

// this, evidently, is the first actual twist, rather than a cube rotation... if the shift key is down it will do the same thing, in the opposite direction...
if (sdown == false) {
twisting = 1;
myint = setInterval(twistr,30);
setInterval("if (twistri == 9) {twistr();clearInterval(myint); twisting = 0;}",10);
} else {
twisting = 1;
myint = setInterval(twistrprime,30);
setInterval("if (twistrii == 9) {twistrprime();clearInterval(myint); twisting = 0;}",10);
}
}
if (ekc == 70) {
if (sdown == false) {
twisting = 1;
myint = setInterval(twistf,30);
setInterval("if (twistfi == 9) {twistf();clearInterval(myint); twisting = 0;}",10);
} else {
twisting = 1;
myint = setInterval(twistfprime,30);
setInterval("if (twistfii == 9) {twistfprime();clearInterval(myint); twisting = 0;}",10);
}
}
if (ekc == 85) {
if (sdown == false) {
twisting = 1;
myint = setInterval(twistu,30);
setInterval("if (twistui == 9) {twistu();clearInterval(myint); twisting = 0;}",10);
} else {
twisting = 1;
myint = setInterval(twistuprime,30);
setInterval("if (twistuii == 9) {twistuprime();clearInterval(myint); twisting = 0;}",10);
}
}
if (ekc == 68) {
if (sdown == false) {
twisting = 1;
myint = setInterval(twistd,30);
setInterval("if (twistdi == 9) {twistd();clearInterval(myint); twisting = 0;}",10);
} else {
twisting = 1;
myint = setInterval(twistdprime,30);
setInterval("if (twistdii == 9) {twistdprime();clearInterval(myint); twisting = 0;}",10);
}
}
if (ekc == 76) {
if (sdown == false) {
twisting = 1;
myint = setInterval(twistl,30);
setInterval("if (twistli == 9) {twistl();clearInterval(myint); twisting = 0;}",10);
} else {
twisting = 1;
myint = setInterval(twistlprime,30);
setInterval("if (twistlii == 9) {twistlprime();clearInterval(myint); twisting = 0;}",10);
}
}
if (ekc == 66) {
if (sdown == false) {
twisting = 1;
myint = setInterval(twistb,30);
setInterval("if (twistbi == 9) {twistb();clearInterval(myint); twisting = 0;}",10);
} else {
twisting = 1;
myint = setInterval(twistbprime,30);
setInterval("if (twistbii == 9) {twistbprime();clearInterval(myint); twisting = 0;}",10);
}
}

// delete the item at the end of the stack of commands
stack.length = stack.length - 1;
} else {

// this is called if twisting = 1;
// essentially is manually recalls the function in 15 milliseconds (if there's still stuff left in the stack) to see if the twisting is done...
setTimeout("if (stack.length > 0) {mdown(stack[stack.length-1][0],stack[stack.length-1][1],0);}",15);
}
}

// these functions come in the form "twist" + direction + prime?
// meaning "twist the cube in [direction] clockwise / (or if prime) counterclockwise"
// they all work in the same manner... so I'll describe only this first one...
function twistr () {

// it's been twisted twistri times (add one);
twistri++;

// these are the cubies that are to be twisted... and no, they're not in any sort of logical order...
var cubies = [16,12,17,7,3,9,19,26,21];

// each cubie index is the first of 6 polygons that make up the cubie that are contained in env3d...
// this takes the index and 'blows it up' into the index of all of the polygons that need be rotated...
var set = new Array();
for (var i=0;i<cubies.length;i++) {
set[set.length] = cubies[i]*6;
set[set.length] = cubies[i]*6+1;
set[set.length] = cubies[i]*6+2;
set[set.length] = cubies[i]*6+3;
set[set.length] = cubies[i]*6+4;
set[set.length] = cubies[i]*6+5;
}

// these rotations will rotate the cubies 9 degrees (in most cases)
// so when it's called 10 times there will be a full 90 degree rotation
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

// if you're done twisting all the cubies...
if (twistri == 10) {

// reset the counter
twistri = 0;

// grab the new location of the cubies
var flip = [19,7,16,26,3,12,21,9,17];

// flipset = the 'blown up' version of the new location
var flipset = new Array();
for (var j=0;j<cubies.length;j++) {
flipset[flipset.length] = flip[j]*6;
flipset[flipset.length] = flip[j]*6+1;
flipset[flipset.length] = flip[j]*6+2;
flipset[flipset.length] = flip[j]*6+3;
flipset[flipset.length] = flip[j]*6+4;
flipset[flipset.length] = flip[j]*6+5;
}

// this 'tells' the environment of the new location of all its cubies (ex. after a R rotation the cubie 19 is now in position 16!
// since this program grabs the cubie simply by it's location within env3d, we just need to put the old cubies into new positions, and it's just like that's where they started!
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
twistrii++;
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
if (twistrii == 10) {
twistrii = 0;
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

function twistlprime () {
twistlii++;
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
if (twistlii == 10) {
twistlii = 0;
var flip = [22,10,18,23,5,11,20,8,15];
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
twistfii++;
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
if (twistfii == 10) {
twistfii = 0;
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
twistbii++;
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
if (twistbii == 10) {
twistbii = 0;
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
twistuii++;
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
if (twistuii == 10) {
twistuii = 0;
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
twistdii++;
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
if (twistdii == 10) {
twistdii = 0;
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
turnyii++;
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
if (turnyii == 10) {
turnyii = 0;
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
turnxii++;
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
if (turnxii == 100) {
turnxii = 0;
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

// rotate() rotates all the points... this is it's "little cousin" which rotates only the polygons specified...
function rotatethese(cubies) {

// clear the canvas
ctx.clearRect(-250,-250,500,500);

// put the background back
grad(-250,-250,500,500,'white','blue');

// copy env3d into oldenv (for reference when rebuilding env3d)
oldenv = env3d;

// clear env3d (for rebuilding)
env3d = new Array();

// for each polygon...
for (var i=0;i<oldenv.length;i++) {

// if the polygon is on the list of polygons it should rotate...
if (cubies.indexOf(i) != -1) {

// grab the fillcolor, linecolor, and linewidth of that polygon
var fcol = oldenv[i][2];
var lcol = oldenv[i][3];
var lwid = oldenv[i][4];

// grab the coordinates of that polygon
var coordsary = oldenv[i][5];

// rotate either the x,y, or z coordinates of that polygon (depending on the current rotation being performed)
if (rot == 'x') {
var coordsary = rotatex(coordsary,rotdegsx);
}
if (rot == 'y') {
var coordsary = rotatey(coordsary,rotdegsy);
}
if (rot == 'z') {
var coordsary = rotatez(coordsary,rotdegsz);
}

// re-draw that polygon
d3dface(coordsary,fcol,lcol,lwid);
} else {

// if the polygon isn't on the list...

// grab the fillcolor, linecolor, linewidth, and coordinates array
var fcol = oldenv[i][2];
var lcol = oldenv[i][3];
var lwid = oldenv[i][4];
var coordsary = oldenv[i][5];

// redraw that polygon without rotating it...
d3dface(coordsary,fcol,lcol,lwid);
}
}

// at this point env3d will have been re-filled with it's new data
// now we render that new data
render();
}


// this function floods env3d with 3d data such that the 3d environment will contain a rubik's cube, rotated 30 degrees downward, white on top , green in front and red to the left.
function rubiks() {

// the 3d coordinates of the center of all 8 of the verticies on the cube, (cxs[i],cys[i],czs[i]) being a point
var cxs = [0,0,50*Math.sqrt(2),50*Math.sqrt(2),-50*Math.sqrt(2),-50*Math.sqrt(2),0,0,0,100*Math.sqrt(2),-100*Math.sqrt(2),-50*Math.sqrt(2),50*Math.sqrt(2),50*Math.sqrt(2),1-50*Math.sqrt(2),0,0,100*Math.sqrt(2),-100*Math.sqrt(2),0,0,100*Math.sqrt(2),-100*Math.sqrt(2),-50*Math.sqrt(2),-50*Math.sqrt(2),50*Math.sqrt(2),50*Math.sqrt(2)];
var cys = [0,100,0,0,0,0,-100,0,0,0,0,100,100,100,100,100,100,100,100,-100,-100,-100,-100,-100,-100,-100,-100];
var czs = [0,0,50*Math.sqrt(2),-50*Math.sqrt(2),-50*Math.sqrt(2),50*Math.sqrt(2),0,-100*Math.sqrt(2),100*Math.sqrt(2),0,0,50*Math.sqrt(2),-50*Math.sqrt(2),50*Math.sqrt(2),-50*Math.sqrt(2),100*Math.sqrt(2),-100*Math.sqrt(2),0,0,-100*Math.sqrt(2),100*Math.sqrt(2),0,0,50*Math.sqrt(2),-50*Math.sqrt(2),50*Math.sqrt(2),-50*Math.sqrt(2)];

// the colors for each of the faces of each of the cubies
// c1s = right face
// c2s = front face
// c3s = top face
// c4s = bottom face
// c5s = left face
// c6s = back face
// c1/2/3/4/5/6s[i] is the 1/2/3/4/5/6th side of the (i+1)th cubie;
// (not put very well ^)
// example... c1s[5] is the color of the right side of the 6th cubie
var c1s = ['black','black','black','red','black','black','black','red','black','red','black','black','red','black','black','black','red','red','black','red','black','red','black','black','black','black','red'];
var c2s = ['black','black','black','black','green','black','black','green','black','black','green','black','black','black','green','black','green','black','green','green','black','black','green','black','green','black','black'];
var c3s = ['black','white','black','black','black','black','black','black','black','black','black','white','white','white','white','white','white','white','white','black','black','black','black','black','black','black','black'];
var c4s = ['black','black','black','black','black','black','yellow','black','black','black','black','black','black','black','black','black','black','black','black','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'];
var c5s = ['black','black','black','black','black','orange','black','black','orange','black','orange','orange','black','black','black','orange','black','black','orange','black','orange','black','orange','orange','black','black','black'];
var c6s = ['black','black','blue','black','black','black','black','black','blue','blue','black','black','black','blue','black','blue','black','blue','black','black','blue','blue','black','black','black','blue','black'];

// for each cubie
for (var i=0;i<c1s.length;i++) {

// grab the center coordinates of the cubie
centerx = cxs[i];
centery = cys[i];
centerz = czs[i];

// declare the size of the cubie
size = 100;

// get the colors of each side of the cubie
c1 = c1s[i];
c2 = c2s[i];
c3 = c3s[i];
c4 = c4s[i];
c5 = c5s[i];
c6 = c6s[i];

// declare the line color
linecol = 'black';

// declare the line width
linewid = 1;

// size is an important variable, but size/2 is more important... we'll use that instead...
newsize = size/2;

// using the size of the cubie, the center point of the cubie, and some maths... gather the coordinates of each vertex on the cubie
coo1 = [[centerx,newsize+centery,-newsize*Math.sqrt(2)+centerz],[centerx,-newsize+centery,-(newsize*Math.sqrt(2))+centerz],[newsize*Math.sqrt(2)+centerx,-newsize+centery,centerz],[newsize*Math.sqrt(2)+centerx,newsize+centery,centerz]];
coo2 = [[centerx,newsize+centery,-newsize*Math.sqrt(2)+centerz],[centerx,-newsize+centery,-(newsize*Math.sqrt(2))+centerz],[-newsize*Math.sqrt(2)+centerx,-newsize+centery,+centerz],[-newsize*Math.sqrt(2)+centerx,newsize+centery,+centerz]];
coo3 = [[centerx,newsize+centery,-newsize*Math.sqrt(2)+centerz],[-newsize*Math.sqrt(2)+centerx,newsize+centery,+centerz],[centerx,newsize+centery,newsize*Math.sqrt(2)+centerz],[newsize*Math.sqrt(2)+centerx,newsize+centery,+centerz]];
coo4 = [[centerx,-newsize+centery,-newsize*Math.sqrt(2)+centerz],[-newsize*Math.sqrt(2)+centerx,-newsize+centery,+centerz],[centerx,-newsize+centery,newsize*Math.sqrt(2)+centerz],[newsize*Math.sqrt(2)+centerx,-newsize+centery,+centerz]];
coo5 = [[centerx,newsize+centery,newsize*Math.sqrt(2)+centerz],[centerx,-newsize+centery,newsize*Math.sqrt(2)+centerz],[-newsize*Math.sqrt(2)+centerx,-newsize+centery,+centerz],[-newsize*Math.sqrt(2)+centerx,newsize+centery,+centerz]];
coo6 = [[centerx,newsize+centery,newsize*Math.sqrt(2)+centerz],[centerx,-newsize+centery,newsize*Math.sqrt(2)+centerz],[newsize*Math.sqrt(2)+centerx,-newsize+centery,+centerz],[newsize*Math.sqrt(2)+centerx,newsize+centery,+centerz]];

// rotate those coordinates accordingly...
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

// d3dface converts the data from the 3d face provided into 2d data, and puts all that data into the env3d array
d3dface(coo1,c1,linecol,linewid);
d3dface(coo2,c2,linecol,linewid);
d3dface(coo3,c3,linecol,linewid);
d3dface(coo4,c4,linecol,linewid);
d3dface(coo5,c5,linecol,linewid);
d3dface(coo6,c6,linecol,linewid);
}
}

// this is a generic 'cube' function... not used in Cubie (I don't think...).. but is part of the 3d library, so I will explain it.

// this returns the coordinates of each side of the cube (rectangular prism really) of the specified middle, height, width, depth, and rotated according to (xrot,yrot,zrot)
function getcube(middlecoords,height,width,depth,xrot,yrot,zrot) {

// grab the middle coordinates
var x = middlecoords[0];
var y = middlecoords[1];
var z = middlecoords[2];

// grab the first,second, third,fourth, fifth, and sixth sides...
var s1 = [[x-width/2,y+height/2,z+depth/2],[x-width/2,y-height/2,z+depth/2],[x+width/2,y-height/2,z+depth/2],[x+width/2,y+height/2,z+depth/2]];
var s2 = [[x+width/2,y+height/2,z-depth/2],[x+width/2,y-height/2,z-depth/2],[x-width/2,y-height/2,z-depth/2],[x-width/2,y+height/2,z-depth/2]];
var s3 = [[x-width/2,y+height/2,z-depth/2],[x-width/2,y-height/2,z-depth/2],[x-width/2,y-height/2,z+depth/2],[x-width/2,y+height/2,z+depth/2]];
var s4 = [[x+width/2,y+height/2,z+depth/2],[x+width/2,y-height/2,z+depth/2],[x+width/2,y-height/2,z-depth/2],[x+width/2,y+height/2,z-depth/2]];
var s5 = [[x-width/2,y+height/2,z-depth/2],[x-width/2,y+height/2,z+depth/2],[x+width/2,y+height/2,z+depth/2],[x+width/2,y+height/2,z-depth/2]];
var s6 = [[x+width/2,y-height/2,z-depth/2],[x+width/2,y-height/2,z+depth/2],[x-width/2,y-height/2,z+depth/2],[x-width/2,y-height/2,z-depth/2]];

// rotate the sides to specifications...
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

// and return the sides
return [s1,s2,s3,s4,s5,s6];
}

// although it says 'getprism' it returns a barn-shaped item... tweaked to the specified conditions
function getprism(centerofbase,height,width,depth) {

// grab the center of the base
var x = centerofbase[0];
var y = centerofbase[1];
var z = centerofbase[2];

// uses the getcube function to calculate the coordinates of the rectangular base
var base = getcube(centerofbase,height,width,depth,0,0,0);

// grab the front and back triangle coordinates, as well as both the roof coordinates
var trif = [[x,y+height,z-depth/2],base[5][0],base[5][3]];
var trib = [[x,y+height,z+depth/2],base[5][1],base[5][2]];
var roof1 = [trib[2],trif[2],trif[0],trib[0]];
var roof2 = [trif[1],trib[1],trib[0],trif[0]];

// put it all together and return it!
return [base[5],trif,trib,roof1,roof2];
}

// this function rotates the entire 3d environment around the origin, as per rotdegsx,y, and z
function rotate() {

// clear the canvas
ctx.clearRect(-250,-250,500,500);

// redraw the background
grad(-250,-250,500,500,'white','blue');

// save the current 3d environment
oldenv = env3d;

// clear the 3d environment data array (to be refilled with new, rotated, data)
env3d = new Array();

// for each polygon
for (var i=0;i<oldenv.length;i++) {

// grab the fill color, linecolor, and linewidth, as well as the 3d coordinates...
var fcol = oldenv[i][2];
var lcol = oldenv[i][3];
var lwid = oldenv[i][4];
var coordsary = oldenv[i][5];

// rotate those coordinates as indicated...
if (rot == 'x') {
var coordsary = rotatex(coordsary,rotdegsx);
}
if (rot == 'y') {
var coordsary = rotatey(coordsary,rotdegsy);
}
if (rot == 'z') {
var coordsary = rotatez(coordsary,rotdegsz);
}

// add that new , rotated, polygon back into the 3d environment...
d3dface(coordsary,fcol,lcol,lwid);
}

// render the 3d environment
render();
}

// rotatex, rotatey, and rotatez all operate in a similar fashion... so I'll explain one...
function rotatex(initial,degs) {
// var degs = the number of degrees to rotate the coordinates about the x axis...

// the initial array of 3d coordinates
var initial;

// array to be constucted and returned...
var returnthis = new Array();

// for each set of 3d coordinates in the array...
for (var i=0;i<initial.length;i++) {

// grab the 3d coordinates...
var x = initial[i][0];
var y = initial[i][1];
var z = initial[i][2];

// rotate those coordinates...
// this 'pretends' (mathematically) that 0,0,0 is the center of a disc... and x,y,z is sitting on the edge of said disc, and then the disc is spun degs (see arguments) degrees
var ynew = y*Math.cos(degs*Math.PI/180) - z*Math.sin(degs*Math.PI/180);
var znew = z*Math.cos(degs*Math.PI/180) + y*Math.sin(degs*Math.PI/180);

// a temporary array to assimilate the 3d coordinates...
var temp = new Array();
temp[0] = x;
temp[1] = ynew;
temp[2] = znew;

// add the temporary array to the array that is to be returned
returnthis[returnthis.length] = temp;
}

//return the new coordinates!
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


// this function takes the coordinates of the 3d polygon, converts them to 2d coordinates, and adds the 2d representation of the 3d polygon to the 3d environment...
function d3dface(coordsary,fillcolor,linecolor,linewidth) {

// the coordinates of the polygon
var coordsary;

// a temporary array, to be filled with new (2d) coordinates
var tempary = new Array();

// for each set of coordinates
for (i=0;i<coordsary.length;i++) {

// convert those 3d coordinates to 2d coordinates, and store them in tempary
tempary[i] = threed22d(coordsary[i]);
}

// x-coordinates
var xcoords = new Array();

// y-coordinates
var ycoords = new Array();

// currently the tempary looks like this[[x1,y1],[x2,y2]...] but we need it like this... [[x1,x2,x3...],[y1,y2,y3...]];
// so...
// for each [x,y] pair
for (i=0;i<tempary.length;i++) {

// add the x to the x-array
xcoords[xcoords.length] = tempary[i][0];

// and add the y to the y-array
ycoords[ycoords.length] = tempary[i][1];
}

// substitute placeholders (nulls) for undefined variables
if (!fillcolor) {
fillcolor = null;
}
if (!linecolor) {
linecolor = null;
}
if (!linewidth) {
linewidth = null;
}

// add the new coordinates to the 3d environment...
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
