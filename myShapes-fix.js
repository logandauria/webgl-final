class Cube extends cgIShape {
    constructor(a) {
        super(), this.makeCube(a);
    }
    makeCube(a) {
        a < 1 && (a = 1);
        var d = -0.5,
            s = -0.5,
            t = 1 / a,
            i = 0;
        for (i = 0; i < a; i++) {
            var h,
                r = i * t;
            for (h = 0; h < a; h++) {
                var n = h * t;
                this.addTriangle(d + n, s + r, 0.5, d + n + t, s + r, 0.5, d + n + t, s + r + t, 0.5),
                    this.addNormal(0, 0, 1, 0, 0, 1, 0, 0, 1),
                    this.adduv(n, r, n + t, r, n + t, r + t),
                    this.addTriangle(d + n + t, s + r + t, 0.5, d + n, s + r + t, 0.5, d + n, s + r, 0.5),
                    this.addNormal(0, 0, 1, 0, 0, 1, 0, 0, 1),
                    this.adduv(n + t, r + t, n, r + t, n, r),
                    this.addTriangle(d + n, s + r, -0.5, d + n + t, s + r + t, -0.5, d + n + t, s + r, -0.5),
                    this.addNormal(0, 0, -1, 0, 0, -1, 0, 0, -1),
                    this.adduv(n, r, n + t, r + t, n + t, r),
                    this.addTriangle(d + n, s + r, -0.5, d + n, s + r + t, -0.5, d + n + t, s + r + t, -0.5),
                    this.addNormal(0, 0, -1, 0, 0, -1, 0, 0, -1),
                    this.adduv(n, r, n, r + t, n + t, r + t),
                    this.addTriangle(-0.5, s + r, d + n, -0.5, s + r, d + n + t, -0.5, s + r + t, d + n + t),
                    this.addNormal(-1, 0, 0, -1, 0, 0, -1, 0, 0),
                    this.adduv(n, r, n + t, r, n + t, r + t),
                    this.addTriangle(-0.5, s + r + t, d + n + t, -0.5, s + r + t, d + n, -0.5, s + r, d + n),
                    this.addNormal(-1, 0, 0, -1, 0, 0, -1, 0, 0),
                    this.adduv(n + t, r + t, n, r + t, n, r),
                    this.addTriangle(0.5, s + r, d + n + t, 0.5, s + r, d + n, 0.5, s + r + t, d + n),
                    this.addNormal(1, 0, 0, 1, 0, 0, 1, 0, 0),
                    this.adduv(n + t, r, n, r, n, r + t),
                    this.addTriangle(0.5, s + r + t, d + n, 0.5, s + r + t, d + n + t, 0.5, s + r, d + n + t),
                    this.addNormal(1, 0, 0, 1, 0, 0, 1, 0, 0),
                    this.adduv(n, r + t, n + t, r + t, n + t, r),
                    this.addTriangle(d + n, 0.5, s + r + t, d + n + t, 0.5, s + r + t, d + n, 0.5, s + r),
                    this.addNormal(0, 1, 0, 0, 1, 0, 0, 1, 0),
                    this.adduv(n, r + t, n + t, r + t, n, r),
                    this.addTriangle(d + n, 0.5, s + r, d + n + t, 0.5, s + r + t, d + n + t, 0.5, s + r),
                    this.addNormal(0, 1, 0, 0, 1, 0, 0, 1, 0),
                    this.adduv(n, r, n + t, r + t, n + t, r),
                    this.addTriangle(d + n, -0.5, s + r, d + n + t, -0.5, s + r + t, d + n, -0.5, s + r + t),
                    this.addNormal(0, -1, 0, 0, -1, 0, 0, -1, 0),
                    this.adduv(n, r, n + t, r + t, n, r + t),
                    this.addTriangle(d + n, -0.5, s + r, d + n + t, -0.5, s + r, d + n + t, -0.5, s + r + t),
                    this.addNormal(0, -1, 0, 0, -1, 0, 0, -1, 0),
                    this.adduv(n, r, n + t, r, n + t, r + t);
            }
        }
    }
}
class Cylinder extends cgIShape {
    constructor(a, d) {
        super(), this.makeCylinder(a, d);
    }
    makeCylinder(a, d) {
        var s = -0.5;
        a < 3 && (a = 3), d < 1 && (d = 1);
        var t = 360 / a,
            i = 1 / d;
        let h,
            r,
            n,
            e,
            o,
            l,
            M = 1 / a,
            c = 1 / d;
        var u,
            m,
            v = 0;
        let g, N, T, C;
        for (u = 0; u < a; u++)
            (h = (g = 0.5 * Math.cos(radians(v))) + 0.5),
                (r = (N = 0.5 * Math.sin(radians(v))) + 0.5),
                (n = (T = 0.5 * Math.cos(radians(v + t))) + 0.5),
                (e = (C = 0.5 * Math.sin(radians(v + t))) + 0.5),
                this.addTriangle(0, s, 0, g, s, N, T, s, C),
                this.addNormal(0, -1, 0, 0, -1, 0, 0, -1, 0),
                this.adduv(h, 1 - r, 0.5, 0.5, n, 1 - e),
                this.addTriangle(0, 0.5, 0, T, 0.5, C, g, 0.5, N),
                this.addNormal(0, 1, 0, 0, 1, 0, 0, 1, 0),
                this.adduv(n, 1 - e, 0.5, 0.5, h, 1 - r),
                (v += t);
        for (l = 1, u = 0; u < d; u++) {
            var f = u * i;
            for (v = 0, o = 1, m = 0; m < a; m++)
                (g = 0.5 * Math.cos(radians(v))),
                    (N = 0.5 * Math.sin(radians(v))),
                    (T = 0.5 * Math.cos(radians(v + t))),
                    (C = 0.5 * Math.sin(radians(v + t))),
                    this.addTriangle(T, s + f, C, g, s + f, N, T, s + f + i, C),
                    this.addNormal(g, 0, N, T, 0, C, T, 0, C),
                    this.adduv(o, 1 - l, o - M, 1 - l, o - M, 1 - (l - c)),
                    this.addTriangle(T, s + f + i, C, g, s + f, N, g, s + f + i, N),
                    this.addNormal(g, 0, N, T, 0, C, g, 0, N),
                    this.adduv(o, 1 - l, o - M, 1 - (l - c), o, 1 - (l - c)),
                    (v += t),
                    (o -= M);
            l -= c;
        }
    }
}
class Cone extends cgIShape {
    constructor(a, d) {
        super(), this.makeCone(a, d);
    }
    makeCone(a, d) {
        let s = -0.5;
        a < 3 && (a = 3), d < 1 && (d = 1);
        let t = 360 / a,
            i = 1 / d;
        var h,
            r,
            n,
            e,
            o,
            l,
            M,
            c,
            u,
            m,
            v,
            g,
            N,
            T,
            C,
            f = 0;
        let p,
            k,
            S = 1 / a,
            x = 1 / d,
            I = 0.5 / d;
        for (p = 0, r = 0; r < a; r++)
            (n = I * Math.cos(radians(f))),
                (o = I * Math.sin(radians(f))),
                (M = 0),
                (c = 0.5),
                (u = 0),
                (m = e = I * Math.cos(radians(f + t))),
                (v = 0.5 - i),
                (g = l = I * Math.sin(radians(f + t))),
                (N = n),
                (T = 0.5 - i),
                (C = o),
                this.addTriangle(M, c, u, m, v, g, N, T, C),
                this.addConeNormal(M, c, u, m, v, g, N, T, C),
                this.adduv(0, 0, p + S, x, p, x),
                (n = 0.5 * Math.cos(radians(f))),
                (o = 0.5 * Math.sin(radians(f))),
                (M = 0),
                (c = s),
                (u = 0),
                (m = e = 0.5 * Math.cos(radians(f + t))),
                (v = s),
                (g = l = 0.5 * Math.sin(radians(f + t))),
                (N = n),
                (T = s),
                (C = o),
                this.addTriangle(M, c, u, m, v, g, N, T, C),
                this.addConeNormal(0, -1, 0, 0, -1, 0, 0, -1, 0),
                this.adduv(0.5, 0.5, e + 0.5, 1 - (l + 0.5), n + 0.5, 1 - (o + 0.5)),
                (f += t),
                (p += S);
        for (k = 1, h = 0; h < d; h++) {
            let d = h * i,
                n = h,
                e = 0;
            for (p = 0, r = 0; r < a; r++) {
                Math.cos(radians(e)), Math.sin(radians(e)), Math.cos(radians(e + t)), Math.sin(radians(e + t));
                let a = 0.5 * (1 - n * i),
                    h = a * Math.cos(radians(e)),
                    r = a * Math.sin(radians(e)),
                    o = a * Math.cos(radians(e + t)),
                    l = a * Math.sin(radians(e + t)),
                    f = 0.5 * (1 - (n + 1) * i),
                    I = f * Math.cos(radians(e)),
                    b = f * Math.sin(radians(e)),
                    q = f * Math.cos(radians(e + t)),
                    y = f * Math.sin(radians(e + t));
                (a = f),
                    (M = o),
                    (c = s + d),
                    (u = l),
                    (m = I),
                    (v = s + d + i),
                    (g = b),
                    (N = h),
                    (T = s + d),
                    (C = r),
                    this.addTriangle(M, c, u, m, v, g, N, T, C),
                    this.addConeNormal(M, c, u, m, v, g, N, T, C),
                    this.adduv(p + S, 1 - k, p, 1 - (k - x), p, 1 - k),
                    (M = o),
                    (c = s + d),
                    (u = l),
                    (m = q),
                    (v = s + d + i),
                    (g = y),
                    (N = I),
                    (T = s + d + i),
                    (C = b),
                    this.addTriangle(M, c, u, m, v, g, N, T, C),
                    this.addConeNormal(M, c, u, m, v, g, N, T, C),
                    this.adduv(p + S, 1 - k, p + S, 1 - (k - x), p, 1 - (k - x)),
                    (e += t),
                    (p += S);
            }
            k -= x;
        }
    }
    addConeNormal(a, d, s, t, i, h, r, n, e) {
        let o = 2 * a,
            l = 0.5,
            M = 2 * s,
            c = Math.sqrt(o * o + l * l + M * M);
        (o /= c), (l /= c), (M /= c);
        let u = 2 * t,
            m = 0.5,
            v = 2 * h,
            g = Math.sqrt(u * u + m * m + v * v);
        (u /= g), (m /= g), (v /= g);
        let N = 2 * r,
            T = 0.5,
            C = 2 * e,
            f = Math.sqrt(N * N + T * T + C * C);
        (N /= f), (T /= f), (C /= f), this.addNormal(o, l, M, u, m, v, N, T, C);
    }
}
class Sphere extends cgIShape {
    constructor(a, d) {
        super(), this.makeSphere(a, d);
    }
    makeSphere(a, d) {
        let s, t, i, h, r, n, e, o, l, M, c, u, m, v, g;
        a < 3 && (a = 3), d < 3 && (d = 3);
        let N = 6.28 / a,
            T = 3.14 / d,
            C = 1 / a,
            f = 1 / d,
            p = T,
            k = 0,
            S = 0,
            x = 1,
            I = 0,
            b = 0,
            q = Math.sin(T),
            y = Math.cos(T),
            j = 0.5,
            w = 0.5 * y;
        var z, A;
        for (I = 1, A = 0; A < a; A++) {
            b = 0;
            let a = Math.sin(k),
                d = Math.cos(k),
                T = Math.sin(k + N);
            (s = 0),
                (t = 0.5),
                (i = 0),
                (M = 0),
                (c = 0),
                (n = Math.cos(k + N) * q * 0.5),
                (r = w),
                (h = T * q * 0.5),
                (u = I - C),
                (m = b + f),
                (l = d * q * 0.5),
                (o = w),
                (e = a * q * 0.5),
                (v = I),
                (g = b + f),
                this.addTriangle(s, t, i, e, o, l, h, r, n),
                this.addNormal(s, t, i, e, o, l, h, r, n),
                this.adduv(M, c, v, g, u, m),
                (k += N),
                (I -= C);
        }
        for (b = f, z = 1; z < d; z++) {
            for (S = Math.sin(p), x = Math.cos(p), q = Math.sin(p + T), j = 0.5 * x, w = 0.5 * (y = Math.cos(p + T)), k = 0, I = 1, A = 0; A <= a; A++) {
                let a = Math.sin(k),
                    d = Math.cos(k),
                    T = Math.sin(k + N),
                    p = Math.cos(k + N);
                (i = d * S * 0.5),
                    (t = j),
                    (s = a * S * 0.5),
                    (M = I),
                    (c = b),
                    (n = p * S * 0.5),
                    (r = j),
                    (h = T * S * 0.5),
                    (u = I - C),
                    (m = b),
                    (l = d * q * 0.5),
                    (o = w),
                    (e = a * q * 0.5),
                    (v = I),
                    (g = b + f),
                    this.addTriangle(e, o, l, h, r, n, s, t, i),
                    this.addNormal(e, o, l, h, r, n, s, t, i),
                    this.adduv(1 - v, 1 - g, 1 - u, 1 - m, 1 - M, 1 - c),
                    (i = p * S * 0.5),
                    (t = j),
                    (s = T * S * 0.5),
                    (M = I - C),
                    (c = b),
                    (n = p * q * 0.5),
                    (r = w),
                    (h = T * q * 0.5),
                    (u = I - C),
                    (m = b + f),
                    (l = d * q * 0.5),
                    (o = w),
                    (e = a * q * 0.5),
                    (v = I),
                    (g = b + f),
                    this.addTriangle(s, t, i, e, o, l, h, r, n),
                    this.addNormal(s, t, i, e, o, l, h, r, n),
                    this.adduv(1 - M, 1 - c, 1 - v, 1 - g, 1 - u, 1 - m),
                    (k += N),
                    (I -= C);
            }
            (p += T), (b += f);
        }
        for (I = 1, b = 1, k = 0, S = Math.sin(p), q = 0, y = -1, j = 0.5 * (x = Math.cos(p)), w = -0.5, A = 0; A < a; A++) {
            let a = Math.sin(k),
                d = Math.cos(k),
                T = Math.sin(k + N);
            (i = d * S * 0.5),
                (t = w),
                (s = a * S * 0.5),
                (M = I),
                (c = b),
                (n = Math.cos(k + N) * S * 0.5),
                (r = w),
                (h = T * S * 0.5),
                (u = I - C),
                (m = b),
                (l = 0),
                (o = -0.5),
                (e = 0),
                (v = 1),
                (g = 1),
                this.addTriangle(s, t, i, e, o, l, h, r, n),
                this.addNormal(s, t, i, e, o, l, h, r, n),
                this.adduv(M, c, v, g, u, m),
                (k += N),
                (I -= C);
        }
    }
}
