class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bodySize = 3;
        this.fill = 255;

    }

    draw() {
        fill(this.fill);
        noStroke();
        ellipse(this.x, this.y, this.bodySize);
    }

}