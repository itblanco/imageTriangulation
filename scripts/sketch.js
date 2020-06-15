let img;
let points = [];
let triangles = [];
let canvas;

function preload() {
    img = loadImage("https://66.media.tumblr.com/9647939a7cddbb900bfcb3c9dab2c7e4/tumblr_n2ybla7HrA1sta9ylo1_1280.jpg");    
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    //pixelDensity(1);  
    for(i = 0; i < 3; i++) {
        points.push([random(width), random(height)]);
    }
    triangles = Delaunay.triangulate(points);
    
}

function draw() {
    background(0);
    image(img, 0, 0);
    noStroke();
    if(points.length > 3) {
        drawTriangles();
    }

}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    if(mouseX < img.width && mouseY < img.height) {
        points.push([mouseX, mouseY]);    
        triangles = Delaunay.triangulate(points);
    }
}

function drawTriangles() {
    for(i = 0; i < triangles.length; i+= 3) {
        let centerX = (points[triangles[i + 0]][0] + points[triangles[i + 1]][0] + points[triangles[i + 2]][0]) / 3;
        let centerY = (points[triangles[i + 0]][1] + points[triangles[i + 1]][1] + points[triangles[i + 2]][1]) / 3;

        let tCol = img.get(centerX, centerY);
        fill(tCol);
        beginShape();
        vertex(points[triangles[i + 0]][0], points[triangles[i + 0]][1]);
        vertex(points[triangles[i + 1]][0], points[triangles[i + 1]][1]);
        vertex(points[triangles[i + 2]][0], points[triangles[i + 2]][1]);
        endShape(CLOSE);
    }
}