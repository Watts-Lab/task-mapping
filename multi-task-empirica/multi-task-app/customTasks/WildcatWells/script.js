// // used to create 2d arrays in /game/gameboards 
// const fs = require('fs')
// const MAP_W = 500; 
// const MAP_H = 500;

// const seedrandom = require('seedrandom');

// var map = null;

// function initializeMap(w, h, v) {
//     map = new Array(w);
//     for (var x = 0; x < w; x++) {
//         map[x] = new Array(h);
//         for (var y = 0; y < h; y++) {
//             map[x][y] = v; 
//         }
//     }
// }

// function buildMap(seed) { 
//     for (var i = 2; i <= 5; i++) {
//         var min = 0;
//         var max = 1 / Math.pow(2, i - 2);
//         var sharpness = i + 1;
//         addInterval(Math.pow(2,i), Math.pow(2,i), min, max, sharpness, seed);
//     }
//     for (var x = 0; x < MAP_W; x++) {
//         for (var y = 0; y < MAP_H; y++) {
//             map[x][y] = parseFloat((map[x][y]).toFixed(3)); 
//         }
//     }
// }

// function addInterval(x_sections, y_sections, min, max, exponent, seed) {
//     var w = x_sections+3;
//     var h = y_sections+3;
//     var span = max-min;
    
//     var rng = seedrandom(seed);

//     var input = new Array(w);
//     for (var x = 0; x < w; x++) {
//         input[x] = new Array(h);
//         for (var y = 0; y < h; y++) {
//             input[x][y] = min + Math.pow(rng(), exponent) * span;
//         }
//     }
    
//     fillBicubic(input, w, h, map, MAP_W, MAP_H);  
// }

// function fillBicubic(p, iw, ih, output, ow, oh) {
//     var sx = ow / (iw - 3); // output samples per input section
//     var sy = oh / (ih - 3);
    
//     for (var ix = 0; ix < iw - 3; ix++) {  // input_x this is 1 before the current section
//         for (var iy = 0; iy < ih - 3; iy++) { // input_y this is 1 before the current section
//             // set coefficients for the section
//             var a00 =     p[ix+1][iy+1];
//             var a01 = -.5*p[ix+1][iy+0] +   .5*p[ix+1][iy+2];
//             var a02 =     p[ix+1][iy+0] -  2.5*p[ix+1][iy+1] +    2*p[ix+1][iy+2] -   .5*p[ix+1][iy+3];
//             var a03 = -.5*p[ix+1][iy+0] +  1.5*p[ix+1][iy+1] -  1.5*p[ix+1][iy+2] +   .5*p[ix+1][iy+3];
//             var a10 = -.5*p[ix+0][iy+1] +   .5*p[ix+2][iy+1];
//             var a11 = .25*p[ix+0][iy+0] -  .25*p[ix+0][iy+2] -  .25*p[ix+2][iy+0] +  .25*p[ix+2][iy+2];
//             var a12 = -.5*p[ix+0][iy+0] + 1.25*p[ix+0][iy+1] -      p[ix+0][iy+2] +  .25*p[ix+0][iy+3] +   .5*p[ix+2][iy+0] - 1.25*p[ix+2][iy+1] +      p[ix+2][iy+2] -  .25*p[ix+2][iy+3];
//             var a13 = .25*p[ix+0][iy+0] -  .75*p[ix+0][iy+1] +  .75*p[ix+0][iy+2] -  .25*p[ix+0][iy+3] -  .25*p[ix+2][iy+0] +  .75*p[ix+2][iy+1] -  .75*p[ix+2][iy+2] +  .25*p[ix+2][iy+3];
//             var a20 =     p[ix+0][iy+1] -  2.5*p[ix+1][iy+1] +    2*p[ix+2][iy+1] -   .5*p[ix+3][iy+1];                                                                              
//             var a21 = -.5*p[ix+0][iy+0] +   .5*p[ix+0][iy+2] + 1.25*p[ix+1][iy+0] - 1.25*p[ix+1][iy+2] -      p[ix+2][iy+0] +      p[ix+2][iy+2] +  .25*p[ix+3][iy+0] -  .25*p[ix+3][iy+2];
//             var a22 =     p[ix+0][iy+0] -  2.5*p[ix+0][iy+1] +    2*p[ix+0][iy+2] -   .5*p[ix+0][iy+3] -  2.5*p[ix+1][iy+0] + 6.25*p[ix+1][iy+1] -    5*p[ix+1][iy+2] + 1.25*p[ix+1][iy+3] +   2*p[ix+2][iy+0] -    5*p[ix+2][iy+1] +    4*p[ix+2][iy+2] -     p[ix+2][iy+3] -  .5*p[ix+3][iy+0] + 1.25*p[ix+3][iy+1] -     p[ix+3][iy+2] + .25*p[ix+3][iy+3];
//             var a23 = -.5*p[ix+0][iy+0] +  1.5*p[ix+0][iy+1] -  1.5*p[ix+0][iy+2] +   .5*p[ix+0][iy+3] + 1.25*p[ix+1][iy+0] - 3.75*p[ix+1][iy+1] + 3.75*p[ix+1][iy+2] - 1.25*p[ix+1][iy+3] -     p[ix+2][iy+0] +    3*p[ix+2][iy+1] -    3*p[ix+2][iy+2] +     p[ix+2][iy+3] + .25*p[ix+3][iy+0] -  .75*p[ix+3][iy+1] + .75*p[ix+3][iy+2] - .25*p[ix+3][iy+3];
//             var a30 = -.5*p[ix+0][iy+1] +  1.5*p[ix+1][iy+1] -  1.5*p[ix+2][iy+1] +   .5*p[ix+3][iy+1];                                                                                                                                                                                                                                                     
//             var a31 = .25*p[ix+0][iy+0] -  .25*p[ix+0][iy+2] -  .75*p[ix+1][iy+0] +  .75*p[ix+1][iy+2] +  .75*p[ix+2][iy+0] -  .75*p[ix+2][iy+2] -  .25*p[ix+3][iy+0] +  .25*p[ix+3][iy+2];                                                                                                                                                                
//             var a32 = -.5*p[ix+0][iy+0] + 1.25*p[ix+0][iy+1] -      p[ix+0][iy+2] +  .25*p[ix+0][iy+3] +  1.5*p[ix+1][iy+0] - 3.75*p[ix+1][iy+1] +    3*p[ix+1][iy+2] -  .75*p[ix+1][iy+3] - 1.5*p[ix+2][iy+0] + 3.75*p[ix+2][iy+1] -    3*p[ix+2][iy+2] + .75*p[ix+2][iy+3] +  .5*p[ix+3][iy+0] - 1.25*p[ix+3][iy+1] +     p[ix+3][iy+2] - .25*p[ix+3][iy+3];
//             var a33 = .25*p[ix+0][iy+0] -  .75*p[ix+0][iy+1] +  .75*p[ix+0][iy+2] -  .25*p[ix+0][iy+3] -  .75*p[ix+1][iy+0] + 2.25*p[ix+1][iy+1] - 2.25*p[ix+1][iy+2] +  .75*p[ix+1][iy+3] + .75*p[ix+2][iy+0] - 2.25*p[ix+2][iy+1] + 2.25*p[ix+2][iy+2] - .75*p[ix+2][iy+3] - .25*p[ix+3][iy+0] +  .75*p[ix+3][iy+1] - .75*p[ix+3][iy+2] + .25*p[ix+3][iy+3];
  
//             for (var ox = ix * sx; ox < (ix + 1) * sx; ox++) { // output_x
//                 ox = Math.round(ox);
                
//                 var x = (ox - ix*sx)/sx;
//                 var x2 = x * x;
//                 var x3 = x2 * x;
            
//                 for (var oy = iy*sy; oy < (iy+1)*sy; oy++) { // output_y
//                     oy = Math.round(oy);

//                     var y = (oy - iy*sy)/sy;
//                     var y2 = y * y;
//                     var y3 = y2 * y;
    
//                     var v = (a00 + a01 * y + a02 * y2 + a03 * y3) +
//                             (a10 + a11 * y + a12 * y2 + a13 * y3) * x +
//                             (a20 + a21 * y + a22 * y2 + a23 * y3) * x2 +
//                             (a30 + a31 * y + a32 * y2 + a33 * y3) * x3;
                    
//                     output[ox][oy] += v;     
//                 }
//             }  
//         }  
//     }
// }

// function createMap(seed) {
//     initializeMap(MAP_W, MAP_H, 0); // this creates a 500 x 500 2D-array of 0s 
//     buildMap(seed);
//     return map;
// }

// data = createMap(3)
// fs.writeFileSync('./board3.txt', JSON.stringify(map));