//* Adapted from https://github.com/processing/p5.js/blob/main/src/math/noise.js
const start_ts = Date.now();

const PERLIN_YWRAPB = 4,
    PERLIN_YWRAP = 1 << PERLIN_YWRAPB,
    PERLIN_ZWRAPB = 8,
    PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB,
    PERLIN_SIZE = 4095;

let perlin_octaves = 3, // default to pretty smooth
    perlin_amp_falloff = 0.9; // 90% reduction/octave

const scaled_cosine = i => 0.5 * (1.0 - Math.cos(i * Math.PI));

let perlin; // will be initialized lazily by noise() or noiseSeed()

function noise(x, y = 0, z = 0) {
    if (perlin == null) {
        perlin = new Array(PERLIN_SIZE + 1);
        for (let i = 0; i < PERLIN_SIZE + 1; i++) {
            perlin[i] = Math.random();
        }
    }

    if (x < 0) {
        x = -x;
    }
    if (y < 0) {
        y = -y;
    }
    if (z < 0) {
        z = -z;
    }

    let xi = Math.floor(x),
        yi = Math.floor(y),
        zi = Math.floor(z);
    let xf = x - xi;
    let yf = y - yi;
    let zf = z - zi;
    let rxf, ryf;

    let r = 0;
    let ampl = 0.4;

    let n1, n2, n3;

    for (let o = 0; o < perlin_octaves; o++) {
        let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

        rxf = scaled_cosine(xf);
        ryf = scaled_cosine(yf);

        n1 = perlin[ of & PERLIN_SIZE];
        n1 += rxf * (perlin[( of +1) & PERLIN_SIZE] - n1);
        n2 = perlin[( of +PERLIN_YWRAP) & PERLIN_SIZE];
        n2 += rxf * (perlin[( of +PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
        n1 += ryf * (n2 - n1);

        of += PERLIN_ZWRAP;
        n2 = perlin[ of & PERLIN_SIZE];
        n2 += rxf * (perlin[( of +1) & PERLIN_SIZE] - n2);
        n3 = perlin[( of +PERLIN_YWRAP) & PERLIN_SIZE];
        n3 += rxf * (perlin[( of +PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
        n2 += ryf * (n3 - n2);

        n1 += scaled_cosine(zf) * (n2 - n1);

        r += n1 * ampl;
        ampl *= perlin_amp_falloff;
        xi <<= 1;
        xf *= 2;
        yi <<= 1;
        yf *= 2;
        zi <<= 1;
        zf *= 2;

        if (xf >= 1.0) {
            xi++;
            xf--;
        }
        if (yf >= 1.0) {
            yi++;
            yf--;
        }
        if (zf >= 1.0) {
            zi++;
            zf--;
        }
    }
    return r;
};
let xoff = 10,
    yoff = 0;

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

const generate = () => {
    const genMovement = () => {
        let movementData = {
            x: [],
            y: []
        }
        for (let i = 0; i < 100; i++) {
            movementData.x.push(Math.floor(noise(xoff) * 1000));
            movementData.y.push(Math.floor(noise(yoff) * 1000));
            xoff += .021;
            yoff += .013;
        }
        return movementData;
    }

    let use = genMovement(),
        t = Date.now() - start_ts + getRandomInt(500, 1250);

    let c = '';

    for (let i = 0; i < use.x.length; i++) {
        t += getRandomInt(12, 31);
        c = c + i + ',' + 1 + ',' + t + ',' + use.x[i] + ',' + use.y[i];
        c += ';';
    };
    return c;
}