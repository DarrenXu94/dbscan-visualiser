const size = 500;
let points = []

function rnd_snd() {
    return (Math.random() * 2 - 1) + (Math.random() * 2 - 1) + (Math.random() * 2 - 1);
}

function rnd(mean, stdev) {
    return Math.round(rnd_snd() * stdev + mean);
}

generatePoints = function () {
    var num_clusters = 3;
    var max_x_stdev = 10;
    var max_y_stdev = 15;
    var cluster_size = 30;

    var raw_point_data = [];
    var cluster_centers = [];
    for (var i = 0; i < num_clusters; i++) {
        cluster_centers.push({ x: Math.random() * (size - 30), y: Math.random() * (size - 30) });
    }

    cluster_centers.forEach(function (d) {
        for (var i = 0; i < cluster_size; i++) {
            raw_point_data.push({ x: rnd(d.x, max_x_stdev), y: rnd(d.y, max_y_stdev) });
        }
    });

    return raw_point_data.map(el => new Particle(el.x, el.y));
}

setup = function () {
    createCanvas(size, size);
    points = shuffle(generatePoints());
}

draw = function () {
    background(15);
    drawPoints();

}

drawPoints = function () {
    points.forEach(p => {
        p.draw();
    })
}

reset = function () {
    points = shuffle(generatePoints());

}

function perc2color(perc) {
    var r, g, b = 0;
    if (perc < 50) {
        r = 255;
        g = Math.round(5.1 * perc);
    }
    else {
        g = 255;
        r = Math.round(510 - 5.10 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
}

runDBScan = function () {
    console.log("INFO: Running db scan")
    var dbscanner = jDBSCAN().eps(30).minPts(1).distance('EUCLIDEAN').data(points);
    const groups = dbscanner()
    const colors = (new Set(groups)).size
    console.log("Info: Number of clusters", colors)
    groups.forEach((val, idx) => {
        points[idx].fill = perc2color(val / colors * 100);
    })

}
