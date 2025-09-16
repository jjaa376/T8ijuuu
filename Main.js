(function() {
    const l = document.createElement("link").relList;
    if (l && l.supports && l.supports("modulepreload")) return;
    for (const c of document.querySelectorAll('link[rel="modulepreload"]')) u(c);
    new MutationObserver(c => {
        for (const f of c)
            if (f.type === "childList")
                for (const d of f.addedNodes) d.tagName === "LINK" && d.rel === "modulepreload" && u(d)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function s(c) {
        const f = {};
        return c.integrity && (f.integrity = c.integrity), c.referrerPolicy && (f.referrerPolicy = c.referrerPolicy), c.crossOrigin === "use-credentials" ? f.credentials = "include" : c.crossOrigin === "anonymous" ? f.credentials = "omit" : f.credentials = "same-origin", f
    }

    function u(c) {
        if (c.ep) return;
        c.ep = !0;
        const f = s(c);
        fetch(c.href, f)
    }
})();
const vr = [];
let ph = !0;
const yh = console.error;

function vd(r) {
    vr.length > 5 || !ph || vr.push(r)
}

function vh(r) {
    vr.push({
        type: "runtime",
        args: r
    })
}

function bh(r) {
    r.preventDefault()
}

function x2(r) {
    try {
        const l = r.find(s => s instanceof Error);
        if (l && l.stack) vd({
            type: "console.error",
            args: l
        });
        else if (r.length > 0) {
            const s = r.map(c => typeof c == "object" ? JSON.stringify(c) : String(c)).join(" "),
                u = new Error(s);
            vd({
                type: "console.error",
                args: u
            })
        }
    } catch (l) {
        console.warn(l)
    }
}
window.addEventListener("error", vh);
window.addEventListener("unhandledrejection", bh);
console.error = function(...l) {
    x2(l), yh.apply(this, l)
};

function w2() {
    return window.removeEventListener("error", vh), window.removeEventListener("unhandledrejection", bh), console.error = yh, ph = !1, vr
}
const C2 = 1e3,
    bd = Symbol("postMessageResponseTimeout");
let fr = 0;
const Xo = "*";
class Cr {
    client;
    baseTimeout;
    waitRes = new Map;
    removeListeners = new Set;
    clear;
    constructor(l, s) {
        this.client = l, this.baseTimeout = s?.timeout || C2;
        const u = this.emitResponse.bind(this);
        this.clear = () => {
            window.removeEventListener("message", u)
        }, window.addEventListener("message", u)
    }
    destroy() {
        this.clear(), this.removeListeners.forEach(l => l())
    }
    isTimeout(l) {
        return l === bd
    }
    post(l, s, u) {
        fr++;
        const {
            timeout: c,
            origin: f = Xo
        } = u || {};
        return this.client.postMessage({
            data: s,
            id: fr,
            type: l
        }, f), new Promise(d => {
            this.waitRes.set(fr, p => {
                d(p)
            }), setTimeout(() => {
                this.waitRes.delete(fr), d(bd)
            }, c || this.baseTimeout)
        })
    }
    on(l, s, u) {
        const {
            once: c,
            origin: f = Xo
        } = u || {}, d = async m => {
            const {
                id: g,
                type: v,
                data: b
            } = m.data;
            let S;
            v === l && (S = await s(b), console.log(l, c, S, b), (g && f === m.origin || f === Xo) && m.source?.postMessage({
                fromType: l,
                id: g,
                data: S
            }, m.origin), c && p())
        };
        window.addEventListener("message", d);
        const p = () => {
            window.removeEventListener("message", d), this.removeListeners.delete(p)
        };
        return this.removeListeners.add(p), p
    }
    emitResponse(l) {
        const s = l.data,
            {
                id: u,
                data: c
            } = s,
            f = this.waitRes.get(u);
        f && f(c)
    }
}

function E2(r) {
    if (Object.prototype.hasOwnProperty.call(r, "__esModule")) return r;
    var l = r.default;
    if (typeof l == "function") {
        var s = function u() {
            var c = !1;
            try {
                c = this instanceof u
            } catch {}
            return c ? Reflect.construct(l, arguments, this.constructor) : l.apply(this, arguments)
        };
        s.prototype = l.prototype
    } else s = {};
    return Object.defineProperty(s, "__esModule", {
        value: !0
    }), Object.keys(r).forEach(function(u) {
        var c = Object.getOwnPropertyDescriptor(r, u);
        Object.defineProperty(s, u, c.get ? c : {
            enumerable: !0,
            get: function() {
                return r[u]
            }
        })
    }), s
}
var Di = {},
    Ko = {},
    Zo = {},
    $o = {},
    Sd;

function _2() {
    if (Sd) return $o;
    Sd = 1;
    const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    return $o.encode = function(l) {
        if (0 <= l && l < r.length) return r[l];
        throw new TypeError("Must be between 0 and 63: " + l)
    }, $o
}
var xd;

function Sh() {
    if (xd) return Zo;
    xd = 1;
    const r = _2(),
        l = 5,
        s = 1 << l,
        u = s - 1,
        c = s;

    function f(d) {
        return d < 0 ? (-d << 1) + 1 : (d << 1) + 0
    }
    return Zo.encode = function(p) {
        let m = "",
            g, v = f(p);
        do g = v & u, v >>>= l, v > 0 && (g |= c), m += r.encode(g); while (v > 0);
        return m
    }, Zo
}
var qt = {};
const M2 = {},
    O2 = Object.freeze(Object.defineProperty({
        __proto__: null,
        default: M2
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    R2 = E2(O2);
var Jo, wd;

function q2() {
    return wd || (wd = 1, Jo = typeof URL == "function" ? URL : R2.URL), Jo
}
var Cd;

function Er() {
    if (Cd) return qt;
    Cd = 1;
    const r = q2();

    function l(Y, K, P) {
        if (K in Y) return Y[K];
        if (arguments.length === 3) return P;
        throw new Error('"' + K + '" is a required argument.')
    }
    qt.getArg = l;
    const s = (function() {
        return !("__proto__" in Object.create(null))
    })();

    function u(Y) {
        return Y
    }

    function c(Y) {
        return d(Y) ? "$" + Y : Y
    }
    qt.toSetString = s ? u : c;

    function f(Y) {
        return d(Y) ? Y.slice(1) : Y
    }
    qt.fromSetString = s ? u : f;

    function d(Y) {
        if (!Y) return !1;
        const K = Y.length;
        if (K < 9 || Y.charCodeAt(K - 1) !== 95 || Y.charCodeAt(K - 2) !== 95 || Y.charCodeAt(K - 3) !== 111 || Y.charCodeAt(K - 4) !== 116 || Y.charCodeAt(K - 5) !== 111 || Y.charCodeAt(K - 6) !== 114 || Y.charCodeAt(K - 7) !== 112 || Y.charCodeAt(K - 8) !== 95 || Y.charCodeAt(K - 9) !== 95) return !1;
        for (let P = K - 10; P >= 0; P--)
            if (Y.charCodeAt(P) !== 36) return !1;
        return !0
    }

    function p(Y, K) {
        return Y === K ? 0 : Y === null ? 1 : K === null ? -1 : Y > K ? 1 : -1
    }

    function m(Y, K) {
        let P = Y.generatedLine - K.generatedLine;
        return P !== 0 || (P = Y.generatedColumn - K.generatedColumn, P !== 0) || (P = p(Y.source, K.source), P !== 0) || (P = Y.originalLine - K.originalLine, P !== 0) || (P = Y.originalColumn - K.originalColumn, P !== 0) ? P : p(Y.name, K.name)
    }
    qt.compareByGeneratedPositionsInflated = m;

    function g(Y) {
        return JSON.parse(Y.replace(/^\)]}'[^\n]*\n/, ""))
    }
    qt.parseSourceMapInput = g;
    const v = "http:",
        b = `${v}//host`;

    function S(Y) {
        return K => {
            const P = L(K),
                ie = T(K),
                ge = new r(K, ie);
            Y(ge);
            const pe = ge.toString();
            return P === "absolute" ? pe : P === "scheme-relative" ? pe.slice(v.length) : P === "path-absolute" ? pe.slice(b.length) : D(ie, pe)
        }
    }

    function x(Y, K) {
        return new r(Y, K).toString()
    }

    function C(Y, K) {
        let P = 0;
        do {
            const ie = Y + P++;
            if (K.indexOf(ie) === -1) return ie
        } while (!0)
    }

    function T(Y) {
        const K = Y.split("..").length - 1,
            P = C("p", Y);
        let ie = `${b}/`;
        for (let ge = 0; ge < K; ge++) ie += `${P}/`;
        return ie
    }
    const M = /^[A-Za-z0-9\+\-\.]+:/;

    function L(Y) {
        return Y[0] === "/" ? Y[1] === "/" ? "scheme-relative" : "path-absolute" : M.test(Y) ? "absolute" : "path-relative"
    }

    function D(Y, K) {
        typeof Y == "string" && (Y = new r(Y)), typeof K == "string" && (K = new r(K));
        const P = K.pathname.split("/"),
            ie = Y.pathname.split("/");
        for (ie.length > 0 && !ie[ie.length - 1] && ie.pop(); P.length > 0 && ie.length > 0 && P[0] === ie[0];) P.shift(), ie.shift();
        return ie.map(() => "..").concat(P).join("/") + K.search + K.hash
    }
    const V = S(Y => {
            Y.pathname = Y.pathname.replace(/\/?$/, "/")
        }),
        W = S(Y => {
            Y.href = new r(".", Y.toString()).toString()
        }),
        Q = S(Y => {});
    qt.normalize = Q;

    function oe(Y, K) {
        const P = L(K),
            ie = L(Y);
        if (Y = V(Y), P === "absolute") return x(K, void 0);
        if (ie === "absolute") return x(K, Y);
        if (P === "scheme-relative") return Q(K);
        if (ie === "scheme-relative") return x(K, x(Y, b)).slice(v.length);
        if (P === "path-absolute") return Q(K);
        if (ie === "path-absolute") return x(K, x(Y, b)).slice(b.length);
        const ge = T(K + Y),
            pe = x(K, x(Y, ge));
        return D(ge, pe)
    }
    qt.join = oe;

    function me(Y, K) {
        const P = $(Y, K);
        return typeof P == "string" ? P : Q(K)
    }
    qt.relative = me;

    function $(Y, K) {
        if (L(Y) !== L(K)) return null;
        const ie = T(Y + K),
            ge = new r(Y, ie),
            pe = new r(K, ie);
        try {
            new r("", pe.toString())
        } catch {
            return null
        }
        return pe.protocol !== ge.protocol || pe.user !== ge.user || pe.password !== ge.password || pe.hostname !== ge.hostname || pe.port !== ge.port ? null : D(ge, pe)
    }

    function ve(Y, K, P) {
        Y && L(K) === "path-absolute" && (K = K.replace(/^\//, ""));
        let ie = Q(K || "");
        return Y && (ie = oe(Y, ie)), P && (ie = oe(W(P), ie)), ie
    }
    return qt.computeSourceURL = ve, qt
}
var Fo = {},
    Ed;

function xh() {
    if (Ed) return Fo;
    Ed = 1;
    class r {
        constructor() {
            this._array = [], this._set = new Map
        }
        static fromArray(s, u) {
            const c = new r;
            for (let f = 0, d = s.length; f < d; f++) c.add(s[f], u);
            return c
        }
        size() {
            return this._set.size
        }
        add(s, u) {
            const c = this.has(s),
                f = this._array.length;
            (!c || u) && this._array.push(s), c || this._set.set(s, f)
        }
        has(s) {
            return this._set.has(s)
        }
        indexOf(s) {
            const u = this._set.get(s);
            if (u >= 0) return u;
            throw new Error('"' + s + '" is not in the set.')
        }
        at(s) {
            if (s >= 0 && s < this._array.length) return this._array[s];
            throw new Error("No element indexed by " + s)
        }
        toArray() {
            return this._array.slice()
        }
    }
    return Fo.ArraySet = r, Fo
}
var Po = {},
    _d;

function A2() {
    if (_d) return Po;
    _d = 1;
    const r = Er();

    function l(u, c) {
        const f = u.generatedLine,
            d = c.generatedLine,
            p = u.generatedColumn,
            m = c.generatedColumn;
        return d > f || d == f && m >= p || r.compareByGeneratedPositionsInflated(u, c) <= 0
    }
    class s {
        constructor() {
            this._array = [], this._sorted = !0, this._last = {
                generatedLine: -1,
                generatedColumn: 0
            }
        }
        unsortedForEach(c, f) {
            this._array.forEach(c, f)
        }
        add(c) {
            l(this._last, c) ? (this._last = c, this._array.push(c)) : (this._sorted = !1, this._array.push(c))
        }
        toArray() {
            return this._sorted || (this._array.sort(r.compareByGeneratedPositionsInflated), this._sorted = !0), this._array
        }
    }
    return Po.MappingList = s, Po
}
var Md;

function wh() {
    if (Md) return Ko;
    Md = 1;
    const r = Sh(),
        l = Er(),
        s = xh().ArraySet,
        u = A2().MappingList;
    class c {
        constructor(d) {
            d || (d = {}), this._file = l.getArg(d, "file", null), this._sourceRoot = l.getArg(d, "sourceRoot", null), this._skipValidation = l.getArg(d, "skipValidation", !1), this._sources = new s, this._names = new s, this._mappings = new u, this._sourcesContents = null
        }
        static fromSourceMap(d) {
            const p = d.sourceRoot,
                m = new c({
                    file: d.file,
                    sourceRoot: p
                });
            return d.eachMapping(function(g) {
                const v = {
                    generated: {
                        line: g.generatedLine,
                        column: g.generatedColumn
                    }
                };
                g.source != null && (v.source = g.source, p != null && (v.source = l.relative(p, v.source)), v.original = {
                    line: g.originalLine,
                    column: g.originalColumn
                }, g.name != null && (v.name = g.name)), m.addMapping(v)
            }), d.sources.forEach(function(g) {
                let v = g;
                p != null && (v = l.relative(p, g)), m._sources.has(v) || m._sources.add(v);
                const b = d.sourceContentFor(g);
                b != null && m.setSourceContent(g, b)
            }), m
        }
        addMapping(d) {
            const p = l.getArg(d, "generated"),
                m = l.getArg(d, "original", null);
            let g = l.getArg(d, "source", null),
                v = l.getArg(d, "name", null);
            this._skipValidation || this._validateMapping(p, m, g, v), g != null && (g = String(g), this._sources.has(g) || this._sources.add(g)), v != null && (v = String(v), this._names.has(v) || this._names.add(v)), this._mappings.add({
                generatedLine: p.line,
                generatedColumn: p.column,
                originalLine: m && m.line,
                originalColumn: m && m.column,
                source: g,
                name: v
            })
        }
        setSourceContent(d, p) {
            let m = d;
            this._sourceRoot != null && (m = l.relative(this._sourceRoot, m)), p != null ? (this._sourcesContents || (this._sourcesContents = Object.create(null)), this._sourcesContents[l.toSetString(m)] = p) : this._sourcesContents && (delete this._sourcesContents[l.toSetString(m)], Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null))
        }
        applySourceMap(d, p, m) {
            let g = p;
            if (p == null) {
                if (d.file == null) throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);
                g = d.file
            }
            const v = this._sourceRoot;
            v != null && (g = l.relative(v, g));
            const b = this._mappings.toArray().length > 0 ? new s : this._sources,
                S = new s;
            this._mappings.unsortedForEach(function(x) {
                if (x.source === g && x.originalLine != null) {
                    const M = d.originalPositionFor({
                        line: x.originalLine,
                        column: x.originalColumn
                    });
                    M.source != null && (x.source = M.source, m != null && (x.source = l.join(m, x.source)), v != null && (x.source = l.relative(v, x.source)), x.originalLine = M.line, x.originalColumn = M.column, M.name != null && (x.name = M.name))
                }
                const C = x.source;
                C != null && !b.has(C) && b.add(C);
                const T = x.name;
                T != null && !S.has(T) && S.add(T)
            }, this), this._sources = b, this._names = S, d.sources.forEach(function(x) {
                const C = d.sourceContentFor(x);
                C != null && (m != null && (x = l.join(m, x)), v != null && (x = l.relative(v, x)), this.setSourceContent(x, C))
            }, this)
        }
        _validateMapping(d, p, m, g) {
            if (p && typeof p.line != "number" && typeof p.column != "number") throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
            if (!(d && "line" in d && "column" in d && d.line > 0 && d.column >= 0 && !p && !m && !g)) {
                if (!(d && "line" in d && "column" in d && p && "line" in p && "column" in p && d.line > 0 && d.column >= 0 && p.line > 0 && p.column >= 0 && m)) throw new Error("Invalid mapping: " + JSON.stringify({
                    generated: d,
                    source: m,
                    original: p,
                    name: g
                }))
            }
        }
        _serializeMappings() {
            let d = 0,
                p = 1,
                m = 0,
                g = 0,
                v = 0,
                b = 0,
                S = "",
                x, C, T, M;
            const L = this._mappings.toArray();
            for (let D = 0, V = L.length; D < V; D++) {
                if (C = L[D], x = "", C.generatedLine !== p)
                    for (d = 0; C.generatedLine !== p;) x += ";", p++;
                else if (D > 0) {
                    if (!l.compareByGeneratedPositionsInflated(C, L[D - 1])) continue;
                    x += ","
                }
                x += r.encode(C.generatedColumn - d), d = C.generatedColumn, C.source != null && (M = this._sources.indexOf(C.source), x += r.encode(M - b), b = M, x += r.encode(C.originalLine - 1 - g), g = C.originalLine - 1, x += r.encode(C.originalColumn - m), m = C.originalColumn, C.name != null && (T = this._names.indexOf(C.name), x += r.encode(T - v), v = T)), S += x
            }
            return S
        }
        _generateSourcesContent(d, p) {
            return d.map(function(m) {
                if (!this._sourcesContents) return null;
                p != null && (m = l.relative(p, m));
                const g = l.toSetString(m);
                return Object.prototype.hasOwnProperty.call(this._sourcesContents, g) ? this._sourcesContents[g] : null
            }, this)
        }
        toJSON() {
            const d = {
                version: this._version,
                sources: this._sources.toArray(),
                names: this._names.toArray(),
                mappings: this._serializeMappings()
            };
            return this._file != null && (d.file = this._file), this._sourceRoot != null && (d.sourceRoot = this._sourceRoot), this._sourcesContents && (d.sourcesContent = this._generateSourcesContent(d.sources, d.sourceRoot)), d
        }
        toString() {
            return JSON.stringify(this.toJSON())
        }
    }
    return c.prototype._version = 3, Ko.SourceMapGenerator = c, Ko
}
var ji = {},
    Wo = {},
    Od;

function T2() {
    return Od || (Od = 1, (function(r) {
        r.GREATEST_LOWER_BOUND = 1, r.LEAST_UPPER_BOUND = 2;

        function l(s, u, c, f, d, p) {
            const m = Math.floor((u - s) / 2) + s,
                g = d(c, f[m], !0);
            return g === 0 ? m : g > 0 ? u - m > 1 ? l(m, u, c, f, d, p) : p === r.LEAST_UPPER_BOUND ? u < f.length ? u : -1 : m : m - s > 1 ? l(s, m, c, f, d, p) : p == r.LEAST_UPPER_BOUND ? m : s < 0 ? -1 : s
        }
        r.search = function(u, c, f, d) {
            if (c.length === 0) return -1;
            let p = l(-1, c.length, u, c, f, d || r.GREATEST_LOWER_BOUND);
            if (p < 0) return -1;
            for (; p - 1 >= 0 && f(c[p], c[p - 1], !0) === 0;) --p;
            return p
        }
    })(Wo)), Wo
}
var dr = {
        exports: {}
    },
    Rd;

function Ch() {
    if (Rd) return dr.exports;
    Rd = 1;
    let r = null;
    return dr.exports = function() {
        if (typeof r == "string") return fetch(r).then(s => s.arrayBuffer());
        if (r instanceof ArrayBuffer) return Promise.resolve(r);
        throw new Error("You must provide the string URL or ArrayBuffer contents of lib/mappings.wasm by calling SourceMapConsumer.initialize({ 'lib/mappings.wasm': ... }) before using SourceMapConsumer")
    }, dr.exports.initialize = l => {
        r = l
    }, dr.exports
}
var Io, qd;

function N2() {
    if (qd) return Io;
    qd = 1;
    const r = Ch();

    function l() {
        this.generatedLine = 0, this.generatedColumn = 0, this.lastGeneratedColumn = null, this.source = null, this.originalLine = null, this.originalColumn = null, this.name = null
    }
    let s = null;
    return Io = function() {
        if (s) return s;
        const c = [];
        return s = r().then(f => WebAssembly.instantiate(f, {
            env: {
                mapping_callback(d, p, m, g, v, b, S, x, C, T) {
                    const M = new l;
                    M.generatedLine = d + 1, M.generatedColumn = p, m && (M.lastGeneratedColumn = g - 1), v && (M.source = b, M.originalLine = S + 1, M.originalColumn = x, C && (M.name = T)), c[c.length - 1](M)
                },
                start_all_generated_locations_for() {
                    console.time("all_generated_locations_for")
                },
                end_all_generated_locations_for() {
                    console.timeEnd("all_generated_locations_for")
                },
                start_compute_column_spans() {
                    console.time("compute_column_spans")
                },
                end_compute_column_spans() {
                    console.timeEnd("compute_column_spans")
                },
                start_generated_location_for() {
                    console.time("generated_location_for")
                },
                end_generated_location_for() {
                    console.timeEnd("generated_location_for")
                },
                start_original_location_for() {
                    console.time("original_location_for")
                },
                end_original_location_for() {
                    console.timeEnd("original_location_for")
                },
                start_parse_mappings() {
                    console.time("parse_mappings")
                },
                end_parse_mappings() {
                    console.timeEnd("parse_mappings")
                },
                start_sort_by_generated_location() {
                    console.time("sort_by_generated_location")
                },
                end_sort_by_generated_location() {
                    console.timeEnd("sort_by_generated_location")
                },
                start_sort_by_original_location() {
                    console.time("sort_by_original_location")
                },
                end_sort_by_original_location() {
                    console.timeEnd("sort_by_original_location")
                }
            }
        })).then(f => ({
            exports: f.instance.exports,
            withMappingCallback: (d, p) => {
                c.push(d);
                try {
                    p()
                } finally {
                    c.pop()
                }
            }
        })).then(null, f => {
            throw s = null, f
        }), s
    }, Io
}
var Ad;

function z2() {
    if (Ad) return ji;
    Ad = 1;
    const r = Er(),
        l = T2(),
        s = xh().ArraySet;
    Sh();
    const u = Ch(),
        c = N2(),
        f = Symbol("smcInternal");
    class d {
        constructor(S, x) {
            return S == f ? Promise.resolve(this) : g(S, x)
        }
        static initialize(S) {
            u.initialize(S["lib/mappings.wasm"])
        }
        static fromSourceMap(S, x) {
            return v(S, x)
        }
        static async with(S, x, C) {
            const T = await new d(S, x);
            try {
                return await C(T)
            } finally {
                T.destroy()
            }
        }
        eachMapping(S, x, C) {
            throw new Error("Subclasses must implement eachMapping")
        }
        allGeneratedPositionsFor(S) {
            throw new Error("Subclasses must implement allGeneratedPositionsFor")
        }
        destroy() {
            throw new Error("Subclasses must implement destroy")
        }
    }
    d.prototype._version = 3, d.GENERATED_ORDER = 1, d.ORIGINAL_ORDER = 2, d.GREATEST_LOWER_BOUND = 1, d.LEAST_UPPER_BOUND = 2, ji.SourceMapConsumer = d;
    class p extends d {
        constructor(S, x) {
            return super(f).then(C => {
                let T = S;
                typeof S == "string" && (T = r.parseSourceMapInput(S));
                const M = r.getArg(T, "version"),
                    L = r.getArg(T, "sources").map(String),
                    D = r.getArg(T, "names", []),
                    V = r.getArg(T, "sourceRoot", null),
                    W = r.getArg(T, "sourcesContent", null),
                    Q = r.getArg(T, "mappings"),
                    oe = r.getArg(T, "file", null),
                    me = r.getArg(T, "x_google_ignoreList", null);
                if (M != C._version) throw new Error("Unsupported version: " + M);
                return C._sourceLookupCache = new Map, C._names = s.fromArray(D.map(String), !0), C._sources = s.fromArray(L, !0), C._absoluteSources = s.fromArray(C._sources.toArray().map(function($) {
                    return r.computeSourceURL(V, $, x)
                }), !0), C.sourceRoot = V, C.sourcesContent = W, C._mappings = Q, C._sourceMapURL = x, C.file = oe, C.x_google_ignoreList = me, C._computedColumnSpans = !1, C._mappingsPtr = 0, C._wasm = null, c().then($ => (C._wasm = $, C))
            })
        }
        _findSourceIndex(S) {
            const x = this._sourceLookupCache.get(S);
            if (typeof x == "number") return x;
            const C = r.computeSourceURL(null, S, this._sourceMapURL);
            if (this._absoluteSources.has(C)) {
                const M = this._absoluteSources.indexOf(C);
                return this._sourceLookupCache.set(S, M), M
            }
            const T = r.computeSourceURL(this.sourceRoot, S, this._sourceMapURL);
            if (this._absoluteSources.has(T)) {
                const M = this._absoluteSources.indexOf(T);
                return this._sourceLookupCache.set(S, M), M
            }
            return -1
        }
        static fromSourceMap(S, x) {
            return new p(S.toString())
        }
        get sources() {
            return this._absoluteSources.toArray()
        }
        _getMappingsPtr() {
            return this._mappingsPtr === 0 && this._parseMappings(), this._mappingsPtr
        }
        _parseMappings() {
            const S = this._mappings,
                x = S.length,
                C = this._wasm.exports.allocate_mappings(x) >>> 0,
                T = new Uint8Array(this._wasm.exports.memory.buffer, C, x);
            for (let L = 0; L < x; L++) T[L] = S.charCodeAt(L);
            const M = this._wasm.exports.parse_mappings(C);
            if (!M) {
                const L = this._wasm.exports.get_last_error();
                let D = `Error parsing mappings (code ${L}): `;
                switch (L) {
                    case 1:
                        D += "the mappings contained a negative line, column, source index, or name index";
                        break;
                    case 2:
                        D += "the mappings contained a number larger than 2**32";
                        break;
                    case 3:
                        D += "reached EOF while in the middle of parsing a VLQ";
                        break;
                    case 4:
                        D += "invalid base 64 character while parsing a VLQ";
                        break;
                    default:
                        D += "unknown error code";
                        break
                }
                throw new Error(D)
            }
            this._mappingsPtr = M
        }
        eachMapping(S, x, C) {
            const T = x || null,
                M = C || d.GENERATED_ORDER;
            this._wasm.withMappingCallback(L => {
                L.source !== null && (L.source = this._absoluteSources.at(L.source), L.name !== null && (L.name = this._names.at(L.name))), this._computedColumnSpans && L.lastGeneratedColumn === null && (L.lastGeneratedColumn = 1 / 0), S.call(T, L)
            }, () => {
                switch (M) {
                    case d.GENERATED_ORDER:
                        this._wasm.exports.by_generated_location(this._getMappingsPtr());
                        break;
                    case d.ORIGINAL_ORDER:
                        this._wasm.exports.by_original_location(this._getMappingsPtr());
                        break;
                    default:
                        throw new Error("Unknown order of iteration.")
                }
            })
        }
        allGeneratedPositionsFor(S) {
            let x = r.getArg(S, "source");
            const C = r.getArg(S, "line"),
                T = S.column || 0;
            if (x = this._findSourceIndex(x), x < 0) return [];
            if (C < 1) throw new Error("Line numbers must be >= 1");
            if (T < 0) throw new Error("Column numbers must be >= 0");
            const M = [];
            return this._wasm.withMappingCallback(L => {
                let D = L.lastGeneratedColumn;
                this._computedColumnSpans && D === null && (D = 1 / 0), M.push({
                    line: L.generatedLine,
                    column: L.generatedColumn,
                    lastColumn: D
                })
            }, () => {
                this._wasm.exports.all_generated_locations_for(this._getMappingsPtr(), x, C - 1, "column" in S, T)
            }), M
        }
        destroy() {
            this._mappingsPtr !== 0 && (this._wasm.exports.free_mappings(this._mappingsPtr), this._mappingsPtr = 0)
        }
        computeColumnSpans() {
            this._computedColumnSpans || (this._wasm.exports.compute_column_spans(this._getMappingsPtr()), this._computedColumnSpans = !0)
        }
        originalPositionFor(S) {
            const x = {
                generatedLine: r.getArg(S, "line"),
                generatedColumn: r.getArg(S, "column")
            };
            if (x.generatedLine < 1) throw new Error("Line numbers must be >= 1");
            if (x.generatedColumn < 0) throw new Error("Column numbers must be >= 0");
            let C = r.getArg(S, "bias", d.GREATEST_LOWER_BOUND);
            C == null && (C = d.GREATEST_LOWER_BOUND);
            let T;
            if (this._wasm.withMappingCallback(M => T = M, () => {
                    this._wasm.exports.original_location_for(this._getMappingsPtr(), x.generatedLine - 1, x.generatedColumn, C)
                }), T && T.generatedLine === x.generatedLine) {
                let M = r.getArg(T, "source", null);
                M !== null && (M = this._absoluteSources.at(M));
                let L = r.getArg(T, "name", null);
                return L !== null && (L = this._names.at(L)), {
                    source: M,
                    line: r.getArg(T, "originalLine", null),
                    column: r.getArg(T, "originalColumn", null),
                    name: L
                }
            }
            return {
                source: null,
                line: null,
                column: null,
                name: null
            }
        }
        hasContentsOfAllSources() {
            return this.sourcesContent ? this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(S) {
                return S == null
            }) : !1
        }
        sourceContentFor(S, x) {
            if (!this.sourcesContent) return null;
            const C = this._findSourceIndex(S);
            if (C >= 0) return this.sourcesContent[C];
            if (x) return null;
            throw new Error('"' + S + '" is not in the SourceMap.')
        }
        generatedPositionFor(S) {
            let x = r.getArg(S, "source");
            if (x = this._findSourceIndex(x), x < 0) return {
                line: null,
                column: null,
                lastColumn: null
            };
            const C = {
                source: x,
                originalLine: r.getArg(S, "line"),
                originalColumn: r.getArg(S, "column")
            };
            if (C.originalLine < 1) throw new Error("Line numbers must be >= 1");
            if (C.originalColumn < 0) throw new Error("Column numbers must be >= 0");
            let T = r.getArg(S, "bias", d.GREATEST_LOWER_BOUND);
            T == null && (T = d.GREATEST_LOWER_BOUND);
            let M;
            if (this._wasm.withMappingCallback(L => M = L, () => {
                    this._wasm.exports.generated_location_for(this._getMappingsPtr(), C.source, C.originalLine - 1, C.originalColumn, T)
                }), M && M.source === C.source) {
                let L = M.lastGeneratedColumn;
                return this._computedColumnSpans && L === null && (L = 1 / 0), {
                    line: r.getArg(M, "generatedLine", null),
                    column: r.getArg(M, "generatedColumn", null),
                    lastColumn: L
                }
            }
            return {
                line: null,
                column: null,
                lastColumn: null
            }
        }
    }
    p.prototype.consumer = d, ji.BasicSourceMapConsumer = p;
    class m extends d {
        constructor(S, x) {
            return super(f).then(C => {
                let T = S;
                typeof S == "string" && (T = r.parseSourceMapInput(S));
                const M = r.getArg(T, "version"),
                    L = r.getArg(T, "sections");
                if (M != C._version) throw new Error("Unsupported version: " + M);
                let D = {
                    line: -1,
                    column: 0
                };
                return Promise.all(L.map(V => {
                    if (V.url) throw new Error("Support for url field in sections not implemented.");
                    const W = r.getArg(V, "offset"),
                        Q = r.getArg(W, "line"),
                        oe = r.getArg(W, "column");
                    if (Q < D.line || Q === D.line && oe < D.column) throw new Error("Section offsets must be ordered and non-overlapping.");
                    return D = W, new d(r.getArg(V, "map"), x).then($ => ({
                        generatedOffset: {
                            generatedLine: Q + 1,
                            generatedColumn: oe + 1
                        },
                        consumer: $
                    }))
                })).then(V => (C._sections = V, C))
            })
        }
        get sources() {
            const S = [];
            for (let x = 0; x < this._sections.length; x++)
                for (let C = 0; C < this._sections[x].consumer.sources.length; C++) S.push(this._sections[x].consumer.sources[C]);
            return S
        }
        originalPositionFor(S) {
            const x = {
                    generatedLine: r.getArg(S, "line"),
                    generatedColumn: r.getArg(S, "column")
                },
                C = l.search(x, this._sections, function(M, L) {
                    const D = M.generatedLine - L.generatedOffset.generatedLine;
                    return D || M.generatedColumn - (L.generatedOffset.generatedColumn - 1)
                }),
                T = this._sections[C];
            return T ? T.consumer.originalPositionFor({
                line: x.generatedLine - (T.generatedOffset.generatedLine - 1),
                column: x.generatedColumn - (T.generatedOffset.generatedLine === x.generatedLine ? T.generatedOffset.generatedColumn - 1 : 0),
                bias: S.bias
            }) : {
                source: null,
                line: null,
                column: null,
                name: null
            }
        }
        hasContentsOfAllSources() {
            return this._sections.every(function(S) {
                return S.consumer.hasContentsOfAllSources()
            })
        }
        sourceContentFor(S, x) {
            for (let C = 0; C < this._sections.length; C++) {
                const M = this._sections[C].consumer.sourceContentFor(S, !0);
                if (M) return M
            }
            if (x) return null;
            throw new Error('"' + S + '" is not in the SourceMap.')
        }
        _findSectionIndex(S) {
            for (let x = 0; x < this._sections.length; x++) {
                const {
                    consumer: C
                } = this._sections[x];
                if (C._findSourceIndex(S) !== -1) return x
            }
            return -1
        }
        generatedPositionFor(S) {
            const x = this._findSectionIndex(r.getArg(S, "source")),
                C = x >= 0 ? this._sections[x] : null,
                T = x >= 0 && x + 1 < this._sections.length ? this._sections[x + 1] : null,
                M = C && C.consumer.generatedPositionFor(S);
            if (M && M.line !== null) {
                const L = C.generatedOffset.generatedLine - 1,
                    D = C.generatedOffset.generatedColumn - 1;
                return M.line === 1 && (M.column += D, typeof M.lastColumn == "number" && (M.lastColumn += D)), M.lastColumn === 1 / 0 && T && M.line === T.generatedOffset.generatedLine && (M.lastColumn = T.generatedOffset.generatedColumn - 2), M.line += L, M
            }
            return {
                line: null,
                column: null,
                lastColumn: null
            }
        }
        allGeneratedPositionsFor(S) {
            const x = this._findSectionIndex(r.getArg(S, "source")),
                C = x >= 0 ? this._sections[x] : null,
                T = x >= 0 && x + 1 < this._sections.length ? this._sections[x + 1] : null;
            return C ? C.consumer.allGeneratedPositionsFor(S).map(M => {
                const L = C.generatedOffset.generatedLine - 1,
                    D = C.generatedOffset.generatedColumn - 1;
                return M.line === 1 && (M.column += D, typeof M.lastColumn == "number" && (M.lastColumn += D)), M.lastColumn === 1 / 0 && T && M.line === T.generatedOffset.generatedLine && (M.lastColumn = T.generatedOffset.generatedColumn - 2), M.line += L, M
            }) : []
        }
        eachMapping(S, x, C) {
            this._sections.forEach((T, M) => {
                const L = M + 1 < this._sections.length ? this._sections[M + 1] : null,
                    {
                        generatedOffset: D
                    } = T,
                    V = D.generatedLine - 1,
                    W = D.generatedColumn - 1;
                T.consumer.eachMapping(function(Q) {
                    Q.generatedLine === 1 && (Q.generatedColumn += W, typeof Q.lastGeneratedColumn == "number" && (Q.lastGeneratedColumn += W)), Q.lastGeneratedColumn === 1 / 0 && L && Q.generatedLine === L.generatedOffset.generatedLine && (Q.lastGeneratedColumn = L.generatedOffset.generatedColumn - 2), Q.generatedLine += V, S.call(this, Q)
                }, x, C)
            })
        }
        computeColumnSpans() {
            for (let S = 0; S < this._sections.length; S++) this._sections[S].consumer.computeColumnSpans()
        }
        destroy() {
            for (let S = 0; S < this._sections.length; S++) this._sections[S].consumer.destroy()
        }
    }
    ji.IndexedSourceMapConsumer = m;

    function g(b, S) {
        let x = b;
        typeof b == "string" && (x = r.parseSourceMapInput(b));
        const C = x.sections != null ? new m(x, S) : new p(x, S);
        return Promise.resolve(C)
    }

    function v(b, S) {
        return p.fromSourceMap(b, S)
    }
    return ji
}
var eu = {},
    Td;

function L2() {
    if (Td) return eu;
    Td = 1;
    const r = wh().SourceMapGenerator,
        l = Er(),
        s = /(\r?\n)/,
        u = 10,
        c = "$$$isSourceNode$$$";
    class f {
        constructor(p, m, g, v, b) {
            this.children = [], this.sourceContents = {}, this.line = p ?? null, this.column = m ?? null, this.source = g ?? null, this.name = b ?? null, this[c] = !0, v != null && this.add(v)
        }
        static fromStringWithSourceMap(p, m, g) {
            const v = new f,
                b = p.split(s);
            let S = 0;
            const x = function() {
                const V = Q(),
                    W = Q() || "";
                return V + W;

                function Q() {
                    return S < b.length ? b[S++] : void 0
                }
            };
            let C = 1,
                T = 0,
                M = null,
                L;
            return m.eachMapping(function(V) {
                if (M !== null)
                    if (C < V.generatedLine) D(M, x()), C++, T = 0;
                    else {
                        L = b[S] || "";
                        const W = L.substr(0, V.generatedColumn - T);
                        b[S] = L.substr(V.generatedColumn - T), T = V.generatedColumn, D(M, W), M = V;
                        return
                    } for (; C < V.generatedLine;) v.add(x()), C++;
                T < V.generatedColumn && (L = b[S] || "", v.add(L.substr(0, V.generatedColumn)), b[S] = L.substr(V.generatedColumn), T = V.generatedColumn), M = V
            }, this), S < b.length && (M && D(M, x()), v.add(b.splice(S).join(""))), m.sources.forEach(function(V) {
                const W = m.sourceContentFor(V);
                W != null && (g != null && (V = l.join(g, V)), v.setSourceContent(V, W))
            }), v;

            function D(V, W) {
                if (V === null || V.source === void 0) v.add(W);
                else {
                    const Q = g ? l.join(g, V.source) : V.source;
                    v.add(new f(V.originalLine, V.originalColumn, Q, W, V.name))
                }
            }
        }
        add(p) {
            if (Array.isArray(p)) p.forEach(function(m) {
                this.add(m)
            }, this);
            else if (p[c] || typeof p == "string") p && this.children.push(p);
            else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + p);
            return this
        }
        prepend(p) {
            if (Array.isArray(p))
                for (let m = p.length - 1; m >= 0; m--) this.prepend(p[m]);
            else if (p[c] || typeof p == "string") this.children.unshift(p);
            else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + p);
            return this
        }
        walk(p) {
            let m;
            for (let g = 0, v = this.children.length; g < v; g++) m = this.children[g], m[c] ? m.walk(p) : m !== "" && p(m, {
                source: this.source,
                line: this.line,
                column: this.column,
                name: this.name
            })
        }
        join(p) {
            let m, g;
            const v = this.children.length;
            if (v > 0) {
                for (m = [], g = 0; g < v - 1; g++) m.push(this.children[g]), m.push(p);
                m.push(this.children[g]), this.children = m
            }
            return this
        }
        replaceRight(p, m) {
            const g = this.children[this.children.length - 1];
            return g[c] ? g.replaceRight(p, m) : typeof g == "string" ? this.children[this.children.length - 1] = g.replace(p, m) : this.children.push("".replace(p, m)), this
        }
        setSourceContent(p, m) {
            this.sourceContents[l.toSetString(p)] = m
        }
        walkSourceContents(p) {
            for (let g = 0, v = this.children.length; g < v; g++) this.children[g][c] && this.children[g].walkSourceContents(p);
            const m = Object.keys(this.sourceContents);
            for (let g = 0, v = m.length; g < v; g++) p(l.fromSetString(m[g]), this.sourceContents[m[g]])
        }
        toString() {
            let p = "";
            return this.walk(function(m) {
                p += m
            }), p
        }
        toStringWithSourceMap(p) {
            const m = {
                    code: "",
                    line: 1,
                    column: 0
                },
                g = new r(p);
            let v = !1,
                b = null,
                S = null,
                x = null,
                C = null;
            return this.walk(function(T, M) {
                m.code += T, M.source !== null && M.line !== null && M.column !== null ? ((b !== M.source || S !== M.line || x !== M.column || C !== M.name) && g.addMapping({
                    source: M.source,
                    original: {
                        line: M.line,
                        column: M.column
                    },
                    generated: {
                        line: m.line,
                        column: m.column
                    },
                    name: M.name
                }), b = M.source, S = M.line, x = M.column, C = M.name, v = !0) : v && (g.addMapping({
                    generated: {
                        line: m.line,
                        column: m.column
                    }
                }), b = null, v = !1);
                for (let L = 0, D = T.length; L < D; L++) T.charCodeAt(L) === u ? (m.line++, m.column = 0, L + 1 === D ? (b = null, v = !1) : v && g.addMapping({
                    source: M.source,
                    original: {
                        line: M.line,
                        column: M.column
                    },
                    generated: {
                        line: m.line,
                        column: m.column
                    },
                    name: M.name
                })) : m.column++
            }), this.walkSourceContents(function(T, M) {
                g.setSourceContent(T, M)
            }), {
                code: m.code,
                map: g
            }
        }
    }
    return eu.SourceNode = f, eu
}
var Nd;

function D2() {
    return Nd || (Nd = 1, Di.SourceMapGenerator = wh().SourceMapGenerator, Di.SourceMapConsumer = z2().SourceMapConsumer, Di.SourceNode = L2().SourceNode), Di
}
var du = D2();
let tu = !1;
const jn = new Map,
    j2 = 300 * 1e3,
    U2 = 1e3;
setInterval(() => {
    const r = Date.now();
    for (const [l, s] of jn.entries()) r - s.timestamp > j2 && jn.delete(l)
}, 6e4);
async function B2() {
    if (!tu) try {
        await du.SourceMapConsumer.initialize({
            "lib/mappings.wasm": "https://unpkg.com/source-map@0.7.6/lib/mappings.wasm"
        }), tu = !0
    } catch (r) {
        console.warn("Failed to initialize SourceMapConsumer:", r);
        try {
            await du.SourceMapConsumer.initialize({}), tu = !0
        } catch (l) {
            throw console.error("SourceMapConsumer initialization failed completely:", l), l
        }
    }
}

function H2(r) {
    if (!r || !r.stack) return `no-stack-${r?.message||"unknown"}`;
    const u = r.stack.split(`
`).slice(0, 3).map(c => c.replace(/\?t=\d+/g, "").replace(/\?v=[\w\d]+/g, "").replace(/\d{13,}/g, "TIMESTAMP"));
    return `${r.name||"Error"}-${r.message}-${u.join("|")}`
}
const G2 = "preview-inject/";
async function hr(r, l = 5) {
    if (!r || !r.stack) return {
        errorMessage: r?.message || "",
        mappedStack: r?.stack || "",
        sourceContext: []
    };
    const s = H2(r);
    if (jn.has(s)) {
        const v = jn.get(s);
        return console.log("Using cached error mapping for:", s), v
    }
    if (jn.size >= U2) return null;
    await B2();
    const u = r.stack.split(`
`),
        c = [],
        f = [],
        d = new Map,
        p = new Map;
    let m = 0;
    for (const v of u) {
        const b = v.match(/at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)|at\s+(.+?):(\d+):(\d+)/);
        if (!b) {
            c.push(v);
            continue
        }
        let S, x, C, T;
        b[1] ? (S = b[1], x = b[2], C = parseInt(b[3]), T = parseInt(b[4])) : (S = "<anonymous>", x = b[5], C = parseInt(b[6]), T = parseInt(b[7]));
        try {
            const M = `${x}.map`;
            let L = d.get(M);
            if (!L) {
                const V = await V2(M);
                L = await new du.SourceMapConsumer(V), d.set(M, L)
            }
            const D = L.originalPositionFor({
                line: C,
                column: T
            });
            if (D.source) {
                if (D.source.includes(G2)) continue;
                const V = D.source.split("/").filter(oe => oe !== "..").join("/"),
                    Q = `    at ${D.name||S} (${V}:${D.line}:${D.column})`;
                if (c.push(Q), D.line && D.column && m < l) {
                    m++;
                    try {
                        const oe = await k2(L, D.source, p);
                        if (oe) {
                            const me = Y2(oe, D.line, 10);
                            f.push({
                                file: V,
                                line: D.line,
                                column: D.column,
                                context: me
                            })
                        }
                    } catch (oe) {
                        console.warn("Failed to extract source context:", oe)
                    }
                }
            } else c.push(v)
        } catch (M) {
            console.warn("Failed to map stack line:", v, M), c.push(v)
        }
    }
    for (const v of d.values()) v.destroy();
    const g = {
        errorMessage: r?.message || "",
        mappedStack: c.join(`
`),
        sourceContext: f
    };
    return g.timestamp = Date.now(), jn.set(s, g), g
}
async function k2(r, l, s) {
    if (s.has(l)) return s.get(l) || null;
    const u = r.sourceContentFor(l);
    return u ? (s.set(l, u), u) : null
}

function Y2(r, l, s = 10) {
    const u = r.split(`
`),
        c = Math.max(0, l - s - 1),
        f = Math.min(u.length - 1, l + s - 1),
        d = [];
    for (let p = c; p <= f; p++) {
        const m = p + 1,
            b = `${m===l?">>>":"   "} ${m.toString().padStart(4," ")} | ${u[p]||""}`;
        d.push(b)
    }
    return d.join(`
`)
}
async function V2(r) {
    try {
        const l = await fetch(r);
        if (!l.ok) throw new Error(`Failed to load source map: ${l.status}`);
        return await l.json()
    } catch (l) {
        const s = l instanceof Error ? l.message : String(l);
        throw new Error(`Error loading source map from ${r}: ${s}`)
    }
}
class Q2 {
    client;
    originalConsoleError;
    constructor() {
        const l = w2();
        l.length > 0 && l.forEach(s => {
            s.type === "console.error" ? this.handleConsoleError(s.args) : s.type === "runtime" && this.handleError(s.args)
        }), this.client = new Cr(window.parent), this.originalConsoleError = console.error, this.initErrorHandlers()
    }
    initErrorHandlers() {
        window.addEventListener("error", this.handleError.bind(this)), window.addEventListener("unhandledrejection", this.handlePromiseRejection.bind(this)), this.interceptConsoleError()
    }
    async handleError(l) {
        const s = l.target;
        if (!(s && s instanceof HTMLElement && s.tagName && ["IMG", "SCRIPT", "LINK", "VIDEO", "AUDIO", "SOURCE", "IFRAME"].includes(s.tagName)) && l.error && l.error.stack) try {
            const u = await hr(l.error);
            this.sendError(u)
        } catch (u) {
            console.warn("Failed to map error stack:", u)
        }
    }
    async handlePromiseRejection(l) {
        const s = l.reason instanceof Error ? l.reason : new Error(String(l.reason));
        if (s.stack) try {
            const u = await hr(s);
            this.sendError(u)
        } catch (u) {
            console.warn("Failed to map promise rejection stack:", u)
        }
    }
    interceptConsoleError() {
        console.error = (...l) => {
            this.originalConsoleError.apply(console, l);
            const s = l.find(u => u instanceof Error);
            if (s && s.stack) this.handleConsoleError(s);
            else if (l.length > 0) {
                const u = l.map(f => typeof f == "object" ? JSON.stringify(f) : String(f)).join(" "),
                    c = new Error(u);
                this.handleConsoleError(c)
            }
        }
    }
    async handleConsoleError(l) {
        try {
            const s = await hr(l);
            this.sendError(s)
        } catch (s) {
            console.warn("Failed to map console error stack:", s)
        }
    }
    reportError(l) {
        this.handleReactError(l)
    }
    async handleReactError(l) {
        try {
            const s = await hr(l);
            this.sendError(s)
        } catch (s) {
            console.warn("Failed to map React error stack:", s)
        }
    }
    async sendError(l) {
        if (!l) {
            console.warn("error is too many");
            return
        }
        if (l.sourceContext.length !== 0) try {
            await this.client.post("runtime-error", l)
        } catch (s) {
            console.warn("Failed to send error to parent:", s)
        }
    }
    destroy() {
        console.error = this.originalConsoleError, this.client.destroy()
    }
}

function X2() {
    const r = new Q2;
    return window.runtimeErrorCollector = r, r
}
class K2 {
    _client;
    constructor() {
        this._client = new Cr(window.parent), this._domContentLoadedListener()
    }
    _domContentLoadedListener() {
        const l = () => {
            console.log("DOMContentLoaded"), this._client.post("DOMContentLoaded"), document.removeEventListener("DOMContentLoaded", l)
        };
        document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", l) : (console.log("DOMContentLoaded"), this._client.post("DOMContentLoaded"))
    }
}

function Z2() {
    return new K2
}
const yu = r => {
        const l = "/preview/fc144141-d8bd-45f6-be19-3cc37ba5d7d9/2477318";
        return r.startsWith(l) ? r.replaceAll(l, "") || "/" : r || "/"
    },
    $2 = "modulepreload",
    J2 = function(r) {
        return "/preview/fc144141-d8bd-45f6-be19-3cc37ba5d7d9/2477318/" + r
    },
    zd = {},
    Eh = function(l, s, u) {
        let c = Promise.resolve();
        if (s && s.length > 0) {
            let g = function(v) {
                return Promise.all(v.map(b => Promise.resolve(b).then(S => ({
                    status: "fulfilled",
                    value: S
                }), S => ({
                    status: "rejected",
                    reason: S
                }))))
            };
            var d = g;
            document.getElementsByTagName("link");
            const p = document.querySelector("meta[property=csp-nonce]"),
                m = p?.nonce || p?.getAttribute("nonce");
            c = g(s.map(v => {
                if (v = J2(v), v in zd) return;
                zd[v] = !0;
                const b = v.endsWith(".css"),
                    S = b ? '[rel="stylesheet"]' : "";
                if (document.querySelector(`link[href="${v}"]${S}`)) return;
                const x = document.createElement("link");
                if (x.rel = b ? "stylesheet" : $2, b || (x.as = "script"), x.crossOrigin = "", x.href = v, m && x.setAttribute("nonce", m), document.head.appendChild(x), b) return new Promise((C, T) => {
                    x.addEventListener("load", C), x.addEventListener("error", () => T(new Error(`Unable to preload CSS for ${v}`)))
                })
            }))
        }

        function f(p) {
            const m = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (m.payload = p, window.dispatchEvent(m), !m.defaultPrevented) throw p
        }
        return c.then(p => {
            for (const m of p || []) m.status === "rejected" && f(m.reason);
            return l().catch(f)
        })
    };
async function F2() {
    const l = await await Eh(() => Promise.resolve().then(() => Gv), []).then(s => s.navigatePromise).catch(s => (console.error(s), Promise.resolve(() => {})));
    window.REACT_APP_ROUTER = {
        push: (s, u) => {
            l(s, u)
        },
        replace: (s, u, c) => {
            l(s, {
                replace: !0,
                ...c
            })
        },
        forward: () => {
            l(1)
        },
        back: () => {
            l(-1)
        },
        refresh: () => {
            l(0)
        },
        prefetch: (s, u) => {
            l(s, u)
        }
    }
}
const _h = new Promise(r => {
        F2().then(() => {
            r(window.REACT_APP_ROUTER)
        })
    }),
    vu = () => window.REACT_APP_ROUTER,
    Mh = new Cr(window.parent),
    hu = async (r, l) => {
        await Mh.post("routeWillChange", {
            next: yu(r)
        }, l)
    };

function P2(r) {
    const l = document.querySelector(r);
    l && l.scrollIntoView({
        behavior: "smooth"
    })
}

function W2() {
    const r = window.open;
    return window.open = function(l, s, u) {
        return l && typeof l == "string" && l.startsWith("#") ? (P2(l), null) : (r(l, "_blank", u), null)
    }, () => {
        window.open = r
    }
}

function I2() {
    const r = async l => {
        const u = l.target.closest("a");
        if (!u || u.tagName !== "A") return;
        const c = u.getAttribute("href");
        if (c && !["#", "javascript:void(0)", ""].includes(c) && !c.startsWith("#")) {
            if (l.preventDefault(), c.startsWith("/")) {
                const f = vu();
                await hu(c, {
                    timeout: 500
                });
                const d = yu(c);
                f.push(d);
                return
            }
            window.open(u.href, "_blank")
        }
    };
    return window.addEventListener("click", r, !0), () => {
        window.removeEventListener("click", r, !0)
    }
}
const Ld = r => r.startsWith("http://") || r.startsWith("https://");

function ep() {
    const r = () => {
        const l = vu(),
            s = l.push;
        l.push = async function(c, f, d) {
            return Ld(c) ? (window.open(c, "_blank"), Promise.resolve(!1)) : (await hu(c, {
                timeout: 500
            }), s.call(this, c, f, d))
        };
        const u = l.replace;
        l.replace = async function(c, f, d) {
            return Ld(c) ? (window.open(c, "_blank"), Promise.resolve(!1)) : (await hu(c, {
                timeout: 500
            }), u.call(this, c, f, d))
        }
    };
    return window.addEventListener("load", r), () => {
        window.removeEventListener("load", r)
    }
}
async function tp() {
    await _h;
    const r = W2(),
        l = I2(),
        s = ep();
    return () => {
        Mh.destroy(), r(), l(), s()
    }
}
async function ap() {
    const r = await Eh(() => Promise.resolve().then(() => Bv), void 0).then(c => c.default).catch(c => []);
    let l = [],
        s = 0;

    function u(c, f) {
        const {
            path: d = "",
            children: p,
            index: m
        } = c;
        s++;
        const g = m === !0 || d === "",
            v = d && d[0] === "/",
            b = d.slice(-1) === "/" ? d.slice(0, -1) : d,
            S = g ? f.path : `${f.path}/${b}`,
            x = v && !g ? d : S,
            C = {
                id: s,
                parentId: f.id,
                path: x
            };
        /\*/.test(C.path) || l.push(C), p && p.forEach(T => u(T, C))
    }
    return r.forEach(c => u(c, {
        id: 0,
        path: ""
    })), l
}
async function np() {
    const r = new Cr(window.parent),
        l = await ap();
    window.REACT_APP_ROUTES = l, r.post("routes", {
        routes: l
    }), r.on("getRouteInfo", async m => l), await _h, r.on("routeAction", async m => {
        const g = vu(),
            {
                action: v,
                route: b
            } = m;
        switch (v) {
            case "goForward":
                g.forward();
                break;
            case "goBack":
                g.back();
                break;
            case "refresh":
                g.refresh();
                break;
            case "goTo":
                b && g.push(b);
                break;
            default:
                console.warn("Unknown action:", v)
        }
    });

    function s() {
        const m = window.history.state?.index ?? 0,
            g = window.history.length > m + 1,
            v = m > 0,
            b = window.location.pathname;
        r.post("updateNavigationState", {
            canGoForward: g,
            canGoBack: v,
            currentRoute: yu(b)
        })
    }

    function u() {
        const m = new MutationObserver(v => {
                v.forEach(b => {
                    (b.type === "childList" || b.type === "characterData") && r.post("titleChanged", {
                        title: document.title
                    })
                })
            }),
            g = document.querySelector("title");
        return r.post("titleChanged", {
            title: document.title
        }), g && m.observe(g, {
            childList: !0,
            characterData: !0,
            subtree: !0
        }), m
    }
    let c = u();

    function f() {
        c.disconnect(), setTimeout(() => {
            c = u()
        }, 100)
    }
    const d = window.history.pushState,
        p = window.history.replaceState;
    return window.history.pushState = function(m, g, v) {
        d.apply(this, arguments), s(), f()
    }, window.history.replaceState = function(m, g, v) {
        p.apply(this, arguments), s(), f()
    }, {
        destroy: () => {
            r.destroy(), c.disconnect()
        }
    }
}
const ip = !0;
console.log("Is preview build:", ip);
async function lp() {
    X2(), tp(), Z2(), np()
}
lp();
var au = {
        exports: {}
    },
    Ui = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dd;

function rp() {
    if (Dd) return Ui;
    Dd = 1;
    var r = Symbol.for("react.transitional.element"),
        l = Symbol.for("react.fragment");

    function s(u, c, f) {
        var d = null;
        if (f !== void 0 && (d = "" + f), c.key !== void 0 && (d = "" + c.key), "key" in c) {
            f = {};
            for (var p in c) p !== "key" && (f[p] = c[p])
        } else f = c;
        return c = f.ref, {
            $$typeof: r,
            type: u,
            key: d,
            ref: c !== void 0 ? c : null,
            props: f
        }
    }
    return Ui.Fragment = l, Ui.jsx = s, Ui.jsxs = s, Ui
}
var jd;

function sp() {
    return jd || (jd = 1, au.exports = rp()), au.exports
}
var E = sp(),
    nu = {
        exports: {}
    },
    ue = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ud;

function op() {
    if (Ud) return ue;
    Ud = 1;
    var r = Symbol.for("react.transitional.element"),
        l = Symbol.for("react.portal"),
        s = Symbol.for("react.fragment"),
        u = Symbol.for("react.strict_mode"),
        c = Symbol.for("react.profiler"),
        f = Symbol.for("react.consumer"),
        d = Symbol.for("react.context"),
        p = Symbol.for("react.forward_ref"),
        m = Symbol.for("react.suspense"),
        g = Symbol.for("react.memo"),
        v = Symbol.for("react.lazy"),
        b = Symbol.iterator;

    function S(_) {
        return _ === null || typeof _ != "object" ? null : (_ = b && _[b] || _["@@iterator"], typeof _ == "function" ? _ : null)
    }
    var x = {
            isMounted: function() {
                return !1
            },
            enqueueForceUpdate: function() {},
            enqueueReplaceState: function() {},
            enqueueSetState: function() {}
        },
        C = Object.assign,
        T = {};

    function M(_, H, J) {
        this.props = _, this.context = H, this.refs = T, this.updater = J || x
    }
    M.prototype.isReactComponent = {}, M.prototype.setState = function(_, H) {
        if (typeof _ != "object" && typeof _ != "function" && _ != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, _, H, "setState")
    }, M.prototype.forceUpdate = function(_) {
        this.updater.enqueueForceUpdate(this, _, "forceUpdate")
    };

    function L() {}
    L.prototype = M.prototype;

    function D(_, H, J) {
        this.props = _, this.context = H, this.refs = T, this.updater = J || x
    }
    var V = D.prototype = new L;
    V.constructor = D, C(V, M.prototype), V.isPureReactComponent = !0;
    var W = Array.isArray,
        Q = {
            H: null,
            A: null,
            T: null,
            S: null,
            V: null
        },
        oe = Object.prototype.hasOwnProperty;

    function me(_, H, J, Z, te, Se) {
        return J = Se.ref, {
            $$typeof: r,
            type: _,
            key: H,
            ref: J !== void 0 ? J : null,
            props: Se
        }
    }

    function $(_, H) {
        return me(_.type, H, void 0, void 0, void 0, _.props)
    }

    function ve(_) {
        return typeof _ == "object" && _ !== null && _.$$typeof === r
    }

    function Y(_) {
        var H = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + _.replace(/[=:]/g, function(J) {
            return H[J]
        })
    }
    var K = /\/+/g;

    function P(_, H) {
        return typeof _ == "object" && _ !== null && _.key != null ? Y("" + _.key) : H.toString(36)
    }

    function ie() {}

    function ge(_) {
        switch (_.status) {
            case "fulfilled":
                return _.value;
            case "rejected":
                throw _.reason;
            default:
                switch (typeof _.status == "string" ? _.then(ie, ie) : (_.status = "pending", _.then(function(H) {
                        _.status === "pending" && (_.status = "fulfilled", _.value = H)
                    }, function(H) {
                        _.status === "pending" && (_.status = "rejected", _.reason = H)
                    })), _.status) {
                    case "fulfilled":
                        return _.value;
                    case "rejected":
                        throw _.reason
                }
        }
        throw _
    }

    function pe(_, H, J, Z, te) {
        var Se = typeof _;
        (Se === "undefined" || Se === "boolean") && (_ = null);
        var se = !1;
        if (_ === null) se = !0;
        else switch (Se) {
            case "bigint":
            case "string":
            case "number":
                se = !0;
                break;
            case "object":
                switch (_.$$typeof) {
                    case r:
                    case l:
                        se = !0;
                        break;
                    case v:
                        return se = _._init, pe(se(_._payload), H, J, Z, te)
                }
        }
        if (se) return te = te(_), se = Z === "" ? "." + P(_, 0) : Z, W(te) ? (J = "", se != null && (J = se.replace(K, "$&/") + "/"), pe(te, H, J, "", function(na) {
            return na
        })) : te != null && (ve(te) && (te = $(te, J + (te.key == null || _ && _.key === te.key ? "" : ("" + te.key).replace(K, "$&/") + "/") + se)), H.push(te)), 1;
        se = 0;
        var st = Z === "" ? "." : Z + ":";
        if (W(_))
            for (var Ae = 0; Ae < _.length; Ae++) Z = _[Ae], Se = st + P(Z, Ae), se += pe(Z, H, J, Se, te);
        else if (Ae = S(_), typeof Ae == "function")
            for (_ = Ae.call(_), Ae = 0; !(Z = _.next()).done;) Z = Z.value, Se = st + P(Z, Ae++), se += pe(Z, H, J, Se, te);
        else if (Se === "object") {
            if (typeof _.then == "function") return pe(ge(_), H, J, Z, te);
            throw H = String(_), Error("Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead.")
        }
        return se
    }

    function j(_, H, J) {
        if (_ == null) return _;
        var Z = [],
            te = 0;
        return pe(_, Z, "", "", function(Se) {
            return H.call(J, Se, te++)
        }), Z
    }

    function X(_) {
        if (_._status === -1) {
            var H = _._result;
            H = H(), H.then(function(J) {
                (_._status === 0 || _._status === -1) && (_._status = 1, _._result = J)
            }, function(J) {
                (_._status === 0 || _._status === -1) && (_._status = 2, _._result = J)
            }), _._status === -1 && (_._status = 0, _._result = H)
        }
        if (_._status === 1) return _._result.default;
        throw _._result
    }
    var ee = typeof reportError == "function" ? reportError : function(_) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
            var H = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message: typeof _ == "object" && _ !== null && typeof _.message == "string" ? String(_.message) : String(_),
                error: _
            });
            if (!window.dispatchEvent(H)) return
        } else if (typeof process == "object" && typeof process.emit == "function") {
            process.emit("uncaughtException", _);
            return
        }
        console.error(_)
    };

    function be() {}
    return ue.Children = {
        map: j,
        forEach: function(_, H, J) {
            j(_, function() {
                H.apply(this, arguments)
            }, J)
        },
        count: function(_) {
            var H = 0;
            return j(_, function() {
                H++
            }), H
        },
        toArray: function(_) {
            return j(_, function(H) {
                return H
            }) || []
        },
        only: function(_) {
            if (!ve(_)) throw Error("React.Children.only expected to receive a single React element child.");
            return _
        }
    }, ue.Component = M, ue.Fragment = s, ue.Profiler = c, ue.PureComponent = D, ue.StrictMode = u, ue.Suspense = m, ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Q, ue.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function(_) {
            return Q.H.useMemoCache(_)
        }
    }, ue.cache = function(_) {
        return function() {
            return _.apply(null, arguments)
        }
    }, ue.cloneElement = function(_, H, J) {
        if (_ == null) throw Error("The argument must be a React element, but you passed " + _ + ".");
        var Z = C({}, _.props),
            te = _.key,
            Se = void 0;
        if (H != null)
            for (se in H.ref !== void 0 && (Se = void 0), H.key !== void 0 && (te = "" + H.key), H) !oe.call(H, se) || se === "key" || se === "__self" || se === "__source" || se === "ref" && H.ref === void 0 || (Z[se] = H[se]);
        var se = arguments.length - 2;
        if (se === 1) Z.children = J;
        else if (1 < se) {
            for (var st = Array(se), Ae = 0; Ae < se; Ae++) st[Ae] = arguments[Ae + 2];
            Z.children = st
        }
        return me(_.type, te, void 0, void 0, Se, Z)
    }, ue.createContext = function(_) {
        return _ = {
            $$typeof: d,
            _currentValue: _,
            _currentValue2: _,
            _threadCount: 0,
            Provider: null,
            Consumer: null
        }, _.Provider = _, _.Consumer = {
            $$typeof: f,
            _context: _
        }, _
    }, ue.createElement = function(_, H, J) {
        var Z, te = {},
            Se = null;
        if (H != null)
            for (Z in H.key !== void 0 && (Se = "" + H.key), H) oe.call(H, Z) && Z !== "key" && Z !== "__self" && Z !== "__source" && (te[Z] = H[Z]);
        var se = arguments.length - 2;
        if (se === 1) te.children = J;
        else if (1 < se) {
            for (var st = Array(se), Ae = 0; Ae < se; Ae++) st[Ae] = arguments[Ae + 2];
            te.children = st
        }
        if (_ && _.defaultProps)
            for (Z in se = _.defaultProps, se) te[Z] === void 0 && (te[Z] = se[Z]);
        return me(_, Se, void 0, void 0, null, te)
    }, ue.createRef = function() {
        return {
            current: null
        }
    }, ue.forwardRef = function(_) {
        return {
            $$typeof: p,
            render: _
        }
    }, ue.isValidElement = ve, ue.lazy = function(_) {
        return {
            $$typeof: v,
            _payload: {
                _status: -1,
                _result: _
            },
            _init: X
        }
    }, ue.memo = function(_, H) {
        return {
            $$typeof: g,
            type: _,
            compare: H === void 0 ? null : H
        }
    }, ue.startTransition = function(_) {
        var H = Q.T,
            J = {};
        Q.T = J;
        try {
            var Z = _(),
                te = Q.S;
            te !== null && te(J, Z), typeof Z == "object" && Z !== null && typeof Z.then == "function" && Z.then(be, ee)
        } catch (Se) {
            ee(Se)
        } finally {
            Q.T = H
        }
    }, ue.unstable_useCacheRefresh = function() {
        return Q.H.useCacheRefresh()
    }, ue.use = function(_) {
        return Q.H.use(_)
    }, ue.useActionState = function(_, H, J) {
        return Q.H.useActionState(_, H, J)
    }, ue.useCallback = function(_, H) {
        return Q.H.useCallback(_, H)
    }, ue.useContext = function(_) {
        return Q.H.useContext(_)
    }, ue.useDebugValue = function() {}, ue.useDeferredValue = function(_, H) {
        return Q.H.useDeferredValue(_, H)
    }, ue.useEffect = function(_, H, J) {
        var Z = Q.H;
        if (typeof J == "function") throw Error("useEffect CRUD overload is not enabled in this build of React.");
        return Z.useEffect(_, H)
    }, ue.useId = function() {
        return Q.H.useId()
    }, ue.useImperativeHandle = function(_, H, J) {
        return Q.H.useImperativeHandle(_, H, J)
    }, ue.useInsertionEffect = function(_, H) {
        return Q.H.useInsertionEffect(_, H)
    }, ue.useLayoutEffect = function(_, H) {
        return Q.H.useLayoutEffect(_, H)
    }, ue.useMemo = function(_, H) {
        return Q.H.useMemo(_, H)
    }, ue.useOptimistic = function(_, H) {
        return Q.H.useOptimistic(_, H)
    }, ue.useReducer = function(_, H, J) {
        return Q.H.useReducer(_, H, J)
    }, ue.useRef = function(_) {
        return Q.H.useRef(_)
    }, ue.useState = function(_) {
        return Q.H.useState(_)
    }, ue.useSyncExternalStore = function(_, H, J) {
        return Q.H.useSyncExternalStore(_, H, J)
    }, ue.useTransition = function() {
        return Q.H.useTransition()
    }, ue.version = "19.1.1", ue
}
var Bd;

function bu() {
    return Bd || (Bd = 1, nu.exports = op()), nu.exports
}
var G = bu();
const re = r => typeof r == "string",
    Bi = () => {
        let r, l;
        const s = new Promise((u, c) => {
            r = u, l = c
        });
        return s.resolve = r, s.reject = l, s
    },
    Hd = r => r == null ? "" : "" + r,
    up = (r, l, s) => {
        r.forEach(u => {
            l[u] && (s[u] = l[u])
        })
    },
    cp = /###/g,
    Gd = r => r && r.indexOf("###") > -1 ? r.replace(cp, ".") : r,
    kd = r => !r || re(r),
    Yi = (r, l, s) => {
        const u = re(l) ? l.split(".") : l;
        let c = 0;
        for (; c < u.length - 1;) {
            if (kd(r)) return {};
            const f = Gd(u[c]);
            !r[f] && s && (r[f] = new s), Object.prototype.hasOwnProperty.call(r, f) ? r = r[f] : r = {}, ++c
        }
        return kd(r) ? {} : {
            obj: r,
            k: Gd(u[c])
        }
    },
    Yd = (r, l, s) => {
        const {
            obj: u,
            k: c
        } = Yi(r, l, Object);
        if (u !== void 0 || l.length === 1) {
            u[c] = s;
            return
        }
        let f = l[l.length - 1],
            d = l.slice(0, l.length - 1),
            p = Yi(r, d, Object);
        for (; p.obj === void 0 && d.length;) f = `${d[d.length-1]}.${f}`, d = d.slice(0, d.length - 1), p = Yi(r, d, Object), p?.obj && typeof p.obj[`${p.k}.${f}`] < "u" && (p.obj = void 0);
        p.obj[`${p.k}.${f}`] = s
    },
    fp = (r, l, s, u) => {
        const {
            obj: c,
            k: f
        } = Yi(r, l, Object);
        c[f] = c[f] || [], c[f].push(s)
    },
    br = (r, l) => {
        const {
            obj: s,
            k: u
        } = Yi(r, l);
        if (s && Object.prototype.hasOwnProperty.call(s, u)) return s[u]
    },
    dp = (r, l, s) => {
        const u = br(r, s);
        return u !== void 0 ? u : br(l, s)
    },
    Oh = (r, l, s) => {
        for (const u in l) u !== "__proto__" && u !== "constructor" && (u in r ? re(r[u]) || r[u] instanceof String || re(l[u]) || l[u] instanceof String ? s && (r[u] = l[u]) : Oh(r[u], l[u], s) : r[u] = l[u]);
        return r
    },
    zn = r => r.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var hp = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
};
const gp = r => re(r) ? r.replace(/[&<>"'\/]/g, l => hp[l]) : r;
class mp {
    constructor(l) {
        this.capacity = l, this.regExpMap = new Map, this.regExpQueue = []
    }
    getRegExp(l) {
        const s = this.regExpMap.get(l);
        if (s !== void 0) return s;
        const u = new RegExp(l);
        return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()), this.regExpMap.set(l, u), this.regExpQueue.push(l), u
    }
}
const pp = [" ", ",", "?", "!", ";"],
    yp = new mp(20),
    vp = (r, l, s) => {
        l = l || "", s = s || "";
        const u = pp.filter(d => l.indexOf(d) < 0 && s.indexOf(d) < 0);
        if (u.length === 0) return !0;
        const c = yp.getRegExp(`(${u.map(d=>d==="?"?"\\?":d).join("|")})`);
        let f = !c.test(r);
        if (!f) {
            const d = r.indexOf(s);
            d > 0 && !c.test(r.substring(0, d)) && (f = !0)
        }
        return f
    },
    gu = (r, l, s = ".") => {
        if (!r) return;
        if (r[l]) return Object.prototype.hasOwnProperty.call(r, l) ? r[l] : void 0;
        const u = l.split(s);
        let c = r;
        for (let f = 0; f < u.length;) {
            if (!c || typeof c != "object") return;
            let d, p = "";
            for (let m = f; m < u.length; ++m)
                if (m !== f && (p += s), p += u[m], d = c[p], d !== void 0) {
                    if (["string", "number", "boolean"].indexOf(typeof d) > -1 && m < u.length - 1) continue;
                    f += m - f + 1;
                    break
                } c = d
        }
        return c
    },
    Vi = r => r?.replace("_", "-"),
    bp = {
        type: "logger",
        log(r) {
            this.output("log", r)
        },
        warn(r) {
            this.output("warn", r)
        },
        error(r) {
            this.output("error", r)
        },
        output(r, l) {
            console?.[r]?.apply?.(console, l)
        }
    };
class Sr {
    constructor(l, s = {}) {
        this.init(l, s)
    }
    init(l, s = {}) {
        this.prefix = s.prefix || "i18next:", this.logger = l || bp, this.options = s, this.debug = s.debug
    }
    log(...l) {
        return this.forward(l, "log", "", !0)
    }
    warn(...l) {
        return this.forward(l, "warn", "", !0)
    }
    error(...l) {
        return this.forward(l, "error", "")
    }
    deprecate(...l) {
        return this.forward(l, "warn", "WARNING DEPRECATED: ", !0)
    }
    forward(l, s, u, c) {
        return c && !this.debug ? null : (re(l[0]) && (l[0] = `${u}${this.prefix} ${l[0]}`), this.logger[s](l))
    }
    create(l) {
        return new Sr(this.logger, {
            prefix: `${this.prefix}:${l}:`,
            ...this.options
        })
    }
    clone(l) {
        return l = l || this.options, l.prefix = l.prefix || this.prefix, new Sr(this.logger, l)
    }
}
var jt = new Sr;
class _r {
    constructor() {
        this.observers = {}
    }
    on(l, s) {
        return l.split(" ").forEach(u => {
            this.observers[u] || (this.observers[u] = new Map);
            const c = this.observers[u].get(s) || 0;
            this.observers[u].set(s, c + 1)
        }), this
    }
    off(l, s) {
        if (this.observers[l]) {
            if (!s) {
                delete this.observers[l];
                return
            }
            this.observers[l].delete(s)
        }
    }
    emit(l, ...s) {
        this.observers[l] && Array.from(this.observers[l].entries()).forEach(([c, f]) => {
            for (let d = 0; d < f; d++) c(...s)
        }), this.observers["*"] && Array.from(this.observers["*"].entries()).forEach(([c, f]) => {
            for (let d = 0; d < f; d++) c.apply(c, [l, ...s])
        })
    }
}
class Vd extends _r {
    constructor(l, s = {
        ns: ["translation"],
        defaultNS: "translation"
    }) {
        super(), this.data = l || {}, this.options = s, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0)
    }
    addNamespaces(l) {
        this.options.ns.indexOf(l) < 0 && this.options.ns.push(l)
    }
    removeNamespaces(l) {
        const s = this.options.ns.indexOf(l);
        s > -1 && this.options.ns.splice(s, 1)
    }
    getResource(l, s, u, c = {}) {
        const f = c.keySeparator !== void 0 ? c.keySeparator : this.options.keySeparator,
            d = c.ignoreJSONStructure !== void 0 ? c.ignoreJSONStructure : this.options.ignoreJSONStructure;
        let p;
        l.indexOf(".") > -1 ? p = l.split(".") : (p = [l, s], u && (Array.isArray(u) ? p.push(...u) : re(u) && f ? p.push(...u.split(f)) : p.push(u)));
        const m = br(this.data, p);
        return !m && !s && !u && l.indexOf(".") > -1 && (l = p[0], s = p[1], u = p.slice(2).join(".")), m || !d || !re(u) ? m : gu(this.data?.[l]?.[s], u, f)
    }
    addResource(l, s, u, c, f = {
        silent: !1
    }) {
        const d = f.keySeparator !== void 0 ? f.keySeparator : this.options.keySeparator;
        let p = [l, s];
        u && (p = p.concat(d ? u.split(d) : u)), l.indexOf(".") > -1 && (p = l.split("."), c = s, s = p[1]), this.addNamespaces(s), Yd(this.data, p, c), f.silent || this.emit("added", l, s, u, c)
    }
    addResources(l, s, u, c = {
        silent: !1
    }) {
        for (const f in u)(re(u[f]) || Array.isArray(u[f])) && this.addResource(l, s, f, u[f], {
            silent: !0
        });
        c.silent || this.emit("added", l, s, u)
    }
    addResourceBundle(l, s, u, c, f, d = {
        silent: !1,
        skipCopy: !1
    }) {
        let p = [l, s];
        l.indexOf(".") > -1 && (p = l.split("."), c = u, u = s, s = p[1]), this.addNamespaces(s);
        let m = br(this.data, p) || {};
        d.skipCopy || (u = JSON.parse(JSON.stringify(u))), c ? Oh(m, u, f) : m = {
            ...m,
            ...u
        }, Yd(this.data, p, m), d.silent || this.emit("added", l, s, u)
    }
    removeResourceBundle(l, s) {
        this.hasResourceBundle(l, s) && delete this.data[l][s], this.removeNamespaces(s), this.emit("removed", l, s)
    }
    hasResourceBundle(l, s) {
        return this.getResource(l, s) !== void 0
    }
    getResourceBundle(l, s) {
        return s || (s = this.options.defaultNS), this.getResource(l, s)
    }
    getDataByLanguage(l) {
        return this.data[l]
    }
    hasLanguageSomeTranslations(l) {
        const s = this.getDataByLanguage(l);
        return !!(s && Object.keys(s) || []).find(c => s[c] && Object.keys(s[c]).length > 0)
    }
    toJSON() {
        return this.data
    }
}
var Rh = {
    processors: {},
    addPostProcessor(r) {
        this.processors[r.name] = r
    },
    handle(r, l, s, u, c) {
        return r.forEach(f => {
            l = this.processors[f]?.process(l, s, u, c) ?? l
        }), l
    }
};
const qh = Symbol("i18next/PATH_KEY");

function Sp() {
    const r = [],
        l = Object.create(null);
    let s;
    return l.get = (u, c) => (s?.revoke?.(), c === qh ? r : (r.push(c), s = Proxy.revocable(u, l), s.proxy)), Proxy.revocable(Object.create(null), l).proxy
}

function mu(r, l) {
    const {
        [qh]: s
    } = r(Sp());
    return s.join(l?.keySeparator ?? ".")
}
const Qd = {},
    Xd = r => !re(r) && typeof r != "boolean" && typeof r != "number";
class xr extends _r {
    constructor(l, s = {}) {
        super(), up(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], l, this), this.options = s, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = jt.create("translator")
    }
    changeLanguage(l) {
        l && (this.language = l)
    }
    exists(l, s = {
        interpolation: {}
    }) {
        const u = {
            ...s
        };
        return l == null ? !1 : this.resolve(l, u)?.res !== void 0
    }
    extractFromKey(l, s) {
        let u = s.nsSeparator !== void 0 ? s.nsSeparator : this.options.nsSeparator;
        u === void 0 && (u = ":");
        const c = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator;
        let f = s.ns || this.options.defaultNS || [];
        const d = u && l.indexOf(u) > -1,
            p = !this.options.userDefinedKeySeparator && !s.keySeparator && !this.options.userDefinedNsSeparator && !s.nsSeparator && !vp(l, u, c);
        if (d && !p) {
            const m = l.match(this.interpolator.nestingRegexp);
            if (m && m.length > 0) return {
                key: l,
                namespaces: re(f) ? [f] : f
            };
            const g = l.split(u);
            (u !== c || u === c && this.options.ns.indexOf(g[0]) > -1) && (f = g.shift()), l = g.join(c)
        }
        return {
            key: l,
            namespaces: re(f) ? [f] : f
        }
    }
    translate(l, s, u) {
        let c = typeof s == "object" ? {
            ...s
        } : s;
        if (typeof c != "object" && this.options.overloadTranslationOptionHandler && (c = this.options.overloadTranslationOptionHandler(arguments)), typeof c == "object" && (c = {
                ...c
            }), c || (c = {}), l == null) return "";
        typeof l == "function" && (l = mu(l, {
            ...this.options,
            ...c
        })), Array.isArray(l) || (l = [String(l)]);
        const f = c.returnDetails !== void 0 ? c.returnDetails : this.options.returnDetails,
            d = c.keySeparator !== void 0 ? c.keySeparator : this.options.keySeparator,
            {
                key: p,
                namespaces: m
            } = this.extractFromKey(l[l.length - 1], c),
            g = m[m.length - 1];
        let v = c.nsSeparator !== void 0 ? c.nsSeparator : this.options.nsSeparator;
        v === void 0 && (v = ":");
        const b = c.lng || this.language,
            S = c.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
        if (b?.toLowerCase() === "cimode") return S ? f ? {
            res: `${g}${v}${p}`,
            usedKey: p,
            exactUsedKey: p,
            usedLng: b,
            usedNS: g,
            usedParams: this.getUsedParamsDetails(c)
        } : `${g}${v}${p}` : f ? {
            res: p,
            usedKey: p,
            exactUsedKey: p,
            usedLng: b,
            usedNS: g,
            usedParams: this.getUsedParamsDetails(c)
        } : p;
        const x = this.resolve(l, c);
        let C = x?.res;
        const T = x?.usedKey || p,
            M = x?.exactUsedKey || p,
            L = ["[object Number]", "[object Function]", "[object RegExp]"],
            D = c.joinArrays !== void 0 ? c.joinArrays : this.options.joinArrays,
            V = !this.i18nFormat || this.i18nFormat.handleAsObject,
            W = c.count !== void 0 && !re(c.count),
            Q = xr.hasDefaultValue(c),
            oe = W ? this.pluralResolver.getSuffix(b, c.count, c) : "",
            me = c.ordinal && W ? this.pluralResolver.getSuffix(b, c.count, {
                ordinal: !1
            }) : "",
            $ = W && !c.ordinal && c.count === 0,
            ve = $ && c[`defaultValue${this.options.pluralSeparator}zero`] || c[`defaultValue${oe}`] || c[`defaultValue${me}`] || c.defaultValue;
        let Y = C;
        V && !C && Q && (Y = ve);
        const K = Xd(Y),
            P = Object.prototype.toString.apply(Y);
        if (V && Y && K && L.indexOf(P) < 0 && !(re(D) && Array.isArray(Y))) {
            if (!c.returnObjects && !this.options.returnObjects) {
                this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
                const ie = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(T, Y, {
                    ...c,
                    ns: m
                }) : `key '${p} (${this.language})' returned an object instead of string.`;
                return f ? (x.res = ie, x.usedParams = this.getUsedParamsDetails(c), x) : ie
            }
            if (d) {
                const ie = Array.isArray(Y),
                    ge = ie ? [] : {},
                    pe = ie ? M : T;
                for (const j in Y)
                    if (Object.prototype.hasOwnProperty.call(Y, j)) {
                        const X = `${pe}${d}${j}`;
                        Q && !C ? ge[j] = this.translate(X, {
                            ...c,
                            defaultValue: Xd(ve) ? ve[j] : void 0,
                            joinArrays: !1,
                            ns: m
                        }) : ge[j] = this.translate(X, {
                            ...c,
                            joinArrays: !1,
                            ns: m
                        }), ge[j] === X && (ge[j] = Y[j])
                    } C = ge
            }
        } else if (V && re(D) && Array.isArray(C)) C = C.join(D), C && (C = this.extendTranslation(C, l, c, u));
        else {
            let ie = !1,
                ge = !1;
            !this.isValidLookup(C) && Q && (ie = !0, C = ve), this.isValidLookup(C) || (ge = !0, C = p);
            const j = (c.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && ge ? void 0 : C,
                X = Q && ve !== C && this.options.updateMissing;
            if (ge || ie || X) {
                if (this.logger.log(X ? "updateKey" : "missingKey", b, g, p, X ? ve : C), d) {
                    const H = this.resolve(p, {
                        ...c,
                        keySeparator: !1
                    });
                    H && H.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")
                }
                let ee = [];
                const be = this.languageUtils.getFallbackCodes(this.options.fallbackLng, c.lng || this.language);
                if (this.options.saveMissingTo === "fallback" && be && be[0])
                    for (let H = 0; H < be.length; H++) ee.push(be[H]);
                else this.options.saveMissingTo === "all" ? ee = this.languageUtils.toResolveHierarchy(c.lng || this.language) : ee.push(c.lng || this.language);
                const _ = (H, J, Z) => {
                    const te = Q && Z !== C ? Z : j;
                    this.options.missingKeyHandler ? this.options.missingKeyHandler(H, g, J, te, X, c) : this.backendConnector?.saveMissing && this.backendConnector.saveMissing(H, g, J, te, X, c), this.emit("missingKey", H, g, J, C)
                };
                this.options.saveMissing && (this.options.saveMissingPlurals && W ? ee.forEach(H => {
                    const J = this.pluralResolver.getSuffixes(H, c);
                    $ && c[`defaultValue${this.options.pluralSeparator}zero`] && J.indexOf(`${this.options.pluralSeparator}zero`) < 0 && J.push(`${this.options.pluralSeparator}zero`), J.forEach(Z => {
                        _([H], p + Z, c[`defaultValue${Z}`] || ve)
                    })
                }) : _(ee, p, ve))
            }
            C = this.extendTranslation(C, l, c, x, u), ge && C === p && this.options.appendNamespaceToMissingKey && (C = `${g}${v}${p}`), (ge || ie) && this.options.parseMissingKeyHandler && (C = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${g}${v}${p}` : p, ie ? C : void 0, c))
        }
        return f ? (x.res = C, x.usedParams = this.getUsedParamsDetails(c), x) : C
    }
    extendTranslation(l, s, u, c, f) {
        if (this.i18nFormat?.parse) l = this.i18nFormat.parse(l, {
            ...this.options.interpolation.defaultVariables,
            ...u
        }, u.lng || this.language || c.usedLng, c.usedNS, c.usedKey, {
            resolved: c
        });
        else if (!u.skipInterpolation) {
            u.interpolation && this.interpolator.init({
                ...u,
                interpolation: {
                    ...this.options.interpolation,
                    ...u.interpolation
                }
            });
            const m = re(l) && (u?.interpolation?.skipOnVariables !== void 0 ? u.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
            let g;
            if (m) {
                const b = l.match(this.interpolator.nestingRegexp);
                g = b && b.length
            }
            let v = u.replace && !re(u.replace) ? u.replace : u;
            if (this.options.interpolation.defaultVariables && (v = {
                    ...this.options.interpolation.defaultVariables,
                    ...v
                }), l = this.interpolator.interpolate(l, v, u.lng || this.language || c.usedLng, u), m) {
                const b = l.match(this.interpolator.nestingRegexp),
                    S = b && b.length;
                g < S && (u.nest = !1)
            }!u.lng && c && c.res && (u.lng = this.language || c.usedLng), u.nest !== !1 && (l = this.interpolator.nest(l, (...b) => f?.[0] === b[0] && !u.context ? (this.logger.warn(`It seems you are nesting recursively key: ${b[0]} in key: ${s[0]}`), null) : this.translate(...b, s), u)), u.interpolation && this.interpolator.reset()
        }
        const d = u.postProcess || this.options.postProcess,
            p = re(d) ? [d] : d;
        return l != null && p?.length && u.applyPostProcessor !== !1 && (l = Rh.handle(p, l, s, this.options && this.options.postProcessPassResolved ? {
            i18nResolved: {
                ...c,
                usedParams: this.getUsedParamsDetails(u)
            },
            ...u
        } : u, this)), l
    }
    resolve(l, s = {}) {
        let u, c, f, d, p;
        return re(l) && (l = [l]), l.forEach(m => {
            if (this.isValidLookup(u)) return;
            const g = this.extractFromKey(m, s),
                v = g.key;
            c = v;
            let b = g.namespaces;
            this.options.fallbackNS && (b = b.concat(this.options.fallbackNS));
            const S = s.count !== void 0 && !re(s.count),
                x = S && !s.ordinal && s.count === 0,
                C = s.context !== void 0 && (re(s.context) || typeof s.context == "number") && s.context !== "",
                T = s.lngs ? s.lngs : this.languageUtils.toResolveHierarchy(s.lng || this.language, s.fallbackLng);
            b.forEach(M => {
                this.isValidLookup(u) || (p = M, !Qd[`${T[0]}-${M}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(p) && (Qd[`${T[0]}-${M}`] = !0, this.logger.warn(`key "${c}" for languages "${T.join(", ")}" won't get resolved as namespace "${p}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), T.forEach(L => {
                    if (this.isValidLookup(u)) return;
                    d = L;
                    const D = [v];
                    if (this.i18nFormat?.addLookupKeys) this.i18nFormat.addLookupKeys(D, v, L, M, s);
                    else {
                        let W;
                        S && (W = this.pluralResolver.getSuffix(L, s.count, s));
                        const Q = `${this.options.pluralSeparator}zero`,
                            oe = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                        if (S && (s.ordinal && W.indexOf(oe) === 0 && D.push(v + W.replace(oe, this.options.pluralSeparator)), D.push(v + W), x && D.push(v + Q)), C) {
                            const me = `${v}${this.options.contextSeparator||"_"}${s.context}`;
                            D.push(me), S && (s.ordinal && W.indexOf(oe) === 0 && D.push(me + W.replace(oe, this.options.pluralSeparator)), D.push(me + W), x && D.push(me + Q))
                        }
                    }
                    let V;
                    for (; V = D.pop();) this.isValidLookup(u) || (f = V, u = this.getResource(L, M, V, s))
                }))
            })
        }), {
            res: u,
            usedKey: c,
            exactUsedKey: f,
            usedLng: d,
            usedNS: p
        }
    }
    isValidLookup(l) {
        return l !== void 0 && !(!this.options.returnNull && l === null) && !(!this.options.returnEmptyString && l === "")
    }
    getResource(l, s, u, c = {}) {
        return this.i18nFormat?.getResource ? this.i18nFormat.getResource(l, s, u, c) : this.resourceStore.getResource(l, s, u, c)
    }
    getUsedParamsDetails(l = {}) {
        const s = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"],
            u = l.replace && !re(l.replace);
        let c = u ? l.replace : l;
        if (u && typeof l.count < "u" && (c.count = l.count), this.options.interpolation.defaultVariables && (c = {
                ...this.options.interpolation.defaultVariables,
                ...c
            }), !u) {
            c = {
                ...c
            };
            for (const f of s) delete c[f]
        }
        return c
    }
    static hasDefaultValue(l) {
        const s = "defaultValue";
        for (const u in l)
            if (Object.prototype.hasOwnProperty.call(l, u) && s === u.substring(0, s.length) && l[u] !== void 0) return !0;
        return !1
    }
}
class Kd {
    constructor(l) {
        this.options = l, this.supportedLngs = this.options.supportedLngs || !1, this.logger = jt.create("languageUtils")
    }
    getScriptPartFromCode(l) {
        if (l = Vi(l), !l || l.indexOf("-") < 0) return null;
        const s = l.split("-");
        return s.length === 2 || (s.pop(), s[s.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(s.join("-"))
    }
    getLanguagePartFromCode(l) {
        if (l = Vi(l), !l || l.indexOf("-") < 0) return l;
        const s = l.split("-");
        return this.formatLanguageCode(s[0])
    }
    formatLanguageCode(l) {
        if (re(l) && l.indexOf("-") > -1) {
            let s;
            try {
                s = Intl.getCanonicalLocales(l)[0]
            } catch {}
            return s && this.options.lowerCaseLng && (s = s.toLowerCase()), s || (this.options.lowerCaseLng ? l.toLowerCase() : l)
        }
        return this.options.cleanCode || this.options.lowerCaseLng ? l.toLowerCase() : l
    }
    isSupportedCode(l) {
        return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (l = this.getLanguagePartFromCode(l)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(l) > -1
    }
    getBestMatchFromCodes(l) {
        if (!l) return null;
        let s;
        return l.forEach(u => {
            if (s) return;
            const c = this.formatLanguageCode(u);
            (!this.options.supportedLngs || this.isSupportedCode(c)) && (s = c)
        }), !s && this.options.supportedLngs && l.forEach(u => {
            if (s) return;
            const c = this.getScriptPartFromCode(u);
            if (this.isSupportedCode(c)) return s = c;
            const f = this.getLanguagePartFromCode(u);
            if (this.isSupportedCode(f)) return s = f;
            s = this.options.supportedLngs.find(d => {
                if (d === f) return d;
                if (!(d.indexOf("-") < 0 && f.indexOf("-") < 0) && (d.indexOf("-") > 0 && f.indexOf("-") < 0 && d.substring(0, d.indexOf("-")) === f || d.indexOf(f) === 0 && f.length > 1)) return d
            })
        }), s || (s = this.getFallbackCodes(this.options.fallbackLng)[0]), s
    }
    getFallbackCodes(l, s) {
        if (!l) return [];
        if (typeof l == "function" && (l = l(s)), re(l) && (l = [l]), Array.isArray(l)) return l;
        if (!s) return l.default || [];
        let u = l[s];
        return u || (u = l[this.getScriptPartFromCode(s)]), u || (u = l[this.formatLanguageCode(s)]), u || (u = l[this.getLanguagePartFromCode(s)]), u || (u = l.default), u || []
    }
    toResolveHierarchy(l, s) {
        const u = this.getFallbackCodes((s === !1 ? [] : s) || this.options.fallbackLng || [], l),
            c = [],
            f = d => {
                d && (this.isSupportedCode(d) ? c.push(d) : this.logger.warn(`rejecting language code not found in supportedLngs: ${d}`))
            };
        return re(l) && (l.indexOf("-") > -1 || l.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && f(this.formatLanguageCode(l)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && f(this.getScriptPartFromCode(l)), this.options.load !== "currentOnly" && f(this.getLanguagePartFromCode(l))) : re(l) && f(this.formatLanguageCode(l)), u.forEach(d => {
            c.indexOf(d) < 0 && f(this.formatLanguageCode(d))
        }), c
    }
}
const Zd = {
        zero: 0,
        one: 1,
        two: 2,
        few: 3,
        many: 4,
        other: 5
    },
    $d = {
        select: r => r === 1 ? "one" : "other",
        resolvedOptions: () => ({
            pluralCategories: ["one", "other"]
        })
    };
class xp {
    constructor(l, s = {}) {
        this.languageUtils = l, this.options = s, this.logger = jt.create("pluralResolver"), this.pluralRulesCache = {}
    }
    addRule(l, s) {
        this.rules[l] = s
    }
    clearCache() {
        this.pluralRulesCache = {}
    }
    getRule(l, s = {}) {
        const u = Vi(l === "dev" ? "en" : l),
            c = s.ordinal ? "ordinal" : "cardinal",
            f = JSON.stringify({
                cleanedCode: u,
                type: c
            });
        if (f in this.pluralRulesCache) return this.pluralRulesCache[f];
        let d;
        try {
            d = new Intl.PluralRules(u, {
                type: c
            })
        } catch {
            if (!Intl) return this.logger.error("No Intl support, please use an Intl polyfill!"), $d;
            if (!l.match(/-|_/)) return $d;
            const m = this.languageUtils.getLanguagePartFromCode(l);
            d = this.getRule(m, s)
        }
        return this.pluralRulesCache[f] = d, d
    }
    needsPlural(l, s = {}) {
        let u = this.getRule(l, s);
        return u || (u = this.getRule("dev", s)), u?.resolvedOptions().pluralCategories.length > 1
    }
    getPluralFormsOfKey(l, s, u = {}) {
        return this.getSuffixes(l, u).map(c => `${s}${c}`)
    }
    getSuffixes(l, s = {}) {
        let u = this.getRule(l, s);
        return u || (u = this.getRule("dev", s)), u ? u.resolvedOptions().pluralCategories.sort((c, f) => Zd[c] - Zd[f]).map(c => `${this.options.prepend}${s.ordinal?`ordinal${this.options.prepend}`:""}${c}`) : []
    }
    getSuffix(l, s, u = {}) {
        const c = this.getRule(l, u);
        return c ? `${this.options.prepend}${u.ordinal?`ordinal${this.options.prepend}`:""}${c.select(s)}` : (this.logger.warn(`no plural rule found for: ${l}`), this.getSuffix("dev", s, u))
    }
}
const Jd = (r, l, s, u = ".", c = !0) => {
        let f = dp(r, l, s);
        return !f && c && re(s) && (f = gu(r, s, u), f === void 0 && (f = gu(l, s, u))), f
    },
    iu = r => r.replace(/\$/g, "$$$$");
class wp {
    constructor(l = {}) {
        this.logger = jt.create("interpolator"), this.options = l, this.format = l?.interpolation?.format || (s => s), this.init(l)
    }
    init(l = {}) {
        l.interpolation || (l.interpolation = {
            escapeValue: !0
        });
        const {
            escape: s,
            escapeValue: u,
            useRawValueToEscape: c,
            prefix: f,
            prefixEscaped: d,
            suffix: p,
            suffixEscaped: m,
            formatSeparator: g,
            unescapeSuffix: v,
            unescapePrefix: b,
            nestingPrefix: S,
            nestingPrefixEscaped: x,
            nestingSuffix: C,
            nestingSuffixEscaped: T,
            nestingOptionsSeparator: M,
            maxReplaces: L,
            alwaysFormat: D
        } = l.interpolation;
        this.escape = s !== void 0 ? s : gp, this.escapeValue = u !== void 0 ? u : !0, this.useRawValueToEscape = c !== void 0 ? c : !1, this.prefix = f ? zn(f) : d || "{{", this.suffix = p ? zn(p) : m || "}}", this.formatSeparator = g || ",", this.unescapePrefix = v ? "" : b || "-", this.unescapeSuffix = this.unescapePrefix ? "" : v || "", this.nestingPrefix = S ? zn(S) : x || zn("$t("), this.nestingSuffix = C ? zn(C) : T || zn(")"), this.nestingOptionsSeparator = M || ",", this.maxReplaces = L || 1e3, this.alwaysFormat = D !== void 0 ? D : !1, this.resetRegExp()
    }
    reset() {
        this.options && this.init(this.options)
    }
    resetRegExp() {
        const l = (s, u) => s?.source === u ? (s.lastIndex = 0, s) : new RegExp(u, "g");
        this.regexp = l(this.regexp, `${this.prefix}(.+?)${this.suffix}`), this.regexpUnescape = l(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`), this.nestingRegexp = l(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)
    }
    interpolate(l, s, u, c) {
        let f, d, p;
        const m = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {},
            g = x => {
                if (x.indexOf(this.formatSeparator) < 0) {
                    const L = Jd(s, m, x, this.options.keySeparator, this.options.ignoreJSONStructure);
                    return this.alwaysFormat ? this.format(L, void 0, u, {
                        ...c,
                        ...s,
                        interpolationkey: x
                    }) : L
                }
                const C = x.split(this.formatSeparator),
                    T = C.shift().trim(),
                    M = C.join(this.formatSeparator).trim();
                return this.format(Jd(s, m, T, this.options.keySeparator, this.options.ignoreJSONStructure), M, u, {
                    ...c,
                    ...s,
                    interpolationkey: T
                })
            };
        this.resetRegExp();
        const v = c?.missingInterpolationHandler || this.options.missingInterpolationHandler,
            b = c?.interpolation?.skipOnVariables !== void 0 ? c.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
        return [{
            regex: this.regexpUnescape,
            safeValue: x => iu(x)
        }, {
            regex: this.regexp,
            safeValue: x => this.escapeValue ? iu(this.escape(x)) : iu(x)
        }].forEach(x => {
            for (p = 0; f = x.regex.exec(l);) {
                const C = f[1].trim();
                if (d = g(C), d === void 0)
                    if (typeof v == "function") {
                        const M = v(l, f, c);
                        d = re(M) ? M : ""
                    } else if (c && Object.prototype.hasOwnProperty.call(c, C)) d = "";
                else if (b) {
                    d = f[0];
                    continue
                } else this.logger.warn(`missed to pass in variable ${C} for interpolating ${l}`), d = "";
                else !re(d) && !this.useRawValueToEscape && (d = Hd(d));
                const T = x.safeValue(d);
                if (l = l.replace(f[0], T), b ? (x.regex.lastIndex += d.length, x.regex.lastIndex -= f[0].length) : x.regex.lastIndex = 0, p++, p >= this.maxReplaces) break
            }
        }), l
    }
    nest(l, s, u = {}) {
        let c, f, d;
        const p = (m, g) => {
            const v = this.nestingOptionsSeparator;
            if (m.indexOf(v) < 0) return m;
            const b = m.split(new RegExp(`${v}[ ]*{`));
            let S = `{${b[1]}`;
            m = b[0], S = this.interpolate(S, d);
            const x = S.match(/'/g),
                C = S.match(/"/g);
            ((x?.length ?? 0) % 2 === 0 && !C || C.length % 2 !== 0) && (S = S.replace(/'/g, '"'));
            try {
                d = JSON.parse(S), g && (d = {
                    ...g,
                    ...d
                })
            } catch (T) {
                return this.logger.warn(`failed parsing options string in nesting for key ${m}`, T), `${m}${v}${S}`
            }
            return d.defaultValue && d.defaultValue.indexOf(this.prefix) > -1 && delete d.defaultValue, m
        };
        for (; c = this.nestingRegexp.exec(l);) {
            let m = [];
            d = {
                ...u
            }, d = d.replace && !re(d.replace) ? d.replace : d, d.applyPostProcessor = !1, delete d.defaultValue;
            const g = /{.*}/.test(c[1]) ? c[1].lastIndexOf("}") + 1 : c[1].indexOf(this.formatSeparator);
            if (g !== -1 && (m = c[1].slice(g).split(this.formatSeparator).map(v => v.trim()).filter(Boolean), c[1] = c[1].slice(0, g)), f = s(p.call(this, c[1].trim(), d), d), f && c[0] === l && !re(f)) return f;
            re(f) || (f = Hd(f)), f || (this.logger.warn(`missed to resolve ${c[1]} for nesting ${l}`), f = ""), m.length && (f = m.reduce((v, b) => this.format(v, b, u.lng, {
                ...u,
                interpolationkey: c[1].trim()
            }), f.trim())), l = l.replace(c[0], f), this.regexp.lastIndex = 0
        }
        return l
    }
}
const Cp = r => {
        let l = r.toLowerCase().trim();
        const s = {};
        if (r.indexOf("(") > -1) {
            const u = r.split("(");
            l = u[0].toLowerCase().trim();
            const c = u[1].substring(0, u[1].length - 1);
            l === "currency" && c.indexOf(":") < 0 ? s.currency || (s.currency = c.trim()) : l === "relativetime" && c.indexOf(":") < 0 ? s.range || (s.range = c.trim()) : c.split(";").forEach(d => {
                if (d) {
                    const [p, ...m] = d.split(":"), g = m.join(":").trim().replace(/^'+|'+$/g, ""), v = p.trim();
                    s[v] || (s[v] = g), g === "false" && (s[v] = !1), g === "true" && (s[v] = !0), isNaN(g) || (s[v] = parseInt(g, 10))
                }
            })
        }
        return {
            formatName: l,
            formatOptions: s
        }
    },
    Fd = r => {
        const l = {};
        return (s, u, c) => {
            let f = c;
            c && c.interpolationkey && c.formatParams && c.formatParams[c.interpolationkey] && c[c.interpolationkey] && (f = {
                ...f,
                [c.interpolationkey]: void 0
            });
            const d = u + JSON.stringify(f);
            let p = l[d];
            return p || (p = r(Vi(u), c), l[d] = p), p(s)
        }
    },
    Ep = r => (l, s, u) => r(Vi(s), u)(l);
class _p {
    constructor(l = {}) {
        this.logger = jt.create("formatter"), this.options = l, this.init(l)
    }
    init(l, s = {
        interpolation: {}
    }) {
        this.formatSeparator = s.interpolation.formatSeparator || ",";
        const u = s.cacheInBuiltFormats ? Fd : Ep;
        this.formats = {
            number: u((c, f) => {
                const d = new Intl.NumberFormat(c, {
                    ...f
                });
                return p => d.format(p)
            }),
            currency: u((c, f) => {
                const d = new Intl.NumberFormat(c, {
                    ...f,
                    style: "currency"
                });
                return p => d.format(p)
            }),
            datetime: u((c, f) => {
                const d = new Intl.DateTimeFormat(c, {
                    ...f
                });
                return p => d.format(p)
            }),
            relativetime: u((c, f) => {
                const d = new Intl.RelativeTimeFormat(c, {
                    ...f
                });
                return p => d.format(p, f.range || "day")
            }),
            list: u((c, f) => {
                const d = new Intl.ListFormat(c, {
                    ...f
                });
                return p => d.format(p)
            })
        }
    }
    add(l, s) {
        this.formats[l.toLowerCase().trim()] = s
    }
    addCached(l, s) {
        this.formats[l.toLowerCase().trim()] = Fd(s)
    }
    format(l, s, u, c = {}) {
        const f = s.split(this.formatSeparator);
        if (f.length > 1 && f[0].indexOf("(") > 1 && f[0].indexOf(")") < 0 && f.find(p => p.indexOf(")") > -1)) {
            const p = f.findIndex(m => m.indexOf(")") > -1);
            f[0] = [f[0], ...f.splice(1, p)].join(this.formatSeparator)
        }
        return f.reduce((p, m) => {
            const {
                formatName: g,
                formatOptions: v
            } = Cp(m);
            if (this.formats[g]) {
                let b = p;
                try {
                    const S = c?.formatParams?.[c.interpolationkey] || {},
                        x = S.locale || S.lng || c.locale || c.lng || u;
                    b = this.formats[g](p, x, {
                        ...v,
                        ...c,
                        ...S
                    })
                } catch (S) {
                    this.logger.warn(S)
                }
                return b
            } else this.logger.warn(`there was no format function for ${g}`);
            return p
        }, l)
    }
}
const Mp = (r, l) => {
    r.pending[l] !== void 0 && (delete r.pending[l], r.pendingCount--)
};
class Op extends _r {
    constructor(l, s, u, c = {}) {
        super(), this.backend = l, this.store = s, this.services = u, this.languageUtils = u.languageUtils, this.options = c, this.logger = jt.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = c.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = c.maxRetries >= 0 ? c.maxRetries : 5, this.retryTimeout = c.retryTimeout >= 1 ? c.retryTimeout : 350, this.state = {}, this.queue = [], this.backend?.init?.(u, c.backend, c)
    }
    queueLoad(l, s, u, c) {
        const f = {},
            d = {},
            p = {},
            m = {};
        return l.forEach(g => {
            let v = !0;
            s.forEach(b => {
                const S = `${g}|${b}`;
                !u.reload && this.store.hasResourceBundle(g, b) ? this.state[S] = 2 : this.state[S] < 0 || (this.state[S] === 1 ? d[S] === void 0 && (d[S] = !0) : (this.state[S] = 1, v = !1, d[S] === void 0 && (d[S] = !0), f[S] === void 0 && (f[S] = !0), m[b] === void 0 && (m[b] = !0)))
            }), v || (p[g] = !0)
        }), (Object.keys(f).length || Object.keys(d).length) && this.queue.push({
            pending: d,
            pendingCount: Object.keys(d).length,
            loaded: {},
            errors: [],
            callback: c
        }), {
            toLoad: Object.keys(f),
            pending: Object.keys(d),
            toLoadLanguages: Object.keys(p),
            toLoadNamespaces: Object.keys(m)
        }
    }
    loaded(l, s, u) {
        const c = l.split("|"),
            f = c[0],
            d = c[1];
        s && this.emit("failedLoading", f, d, s), !s && u && this.store.addResourceBundle(f, d, u, void 0, void 0, {
            skipCopy: !0
        }), this.state[l] = s ? -1 : 2, s && u && (this.state[l] = 0);
        const p = {};
        this.queue.forEach(m => {
            fp(m.loaded, [f], d), Mp(m, l), s && m.errors.push(s), m.pendingCount === 0 && !m.done && (Object.keys(m.loaded).forEach(g => {
                p[g] || (p[g] = {});
                const v = m.loaded[g];
                v.length && v.forEach(b => {
                    p[g][b] === void 0 && (p[g][b] = !0)
                })
            }), m.done = !0, m.errors.length ? m.callback(m.errors) : m.callback())
        }), this.emit("loaded", p), this.queue = this.queue.filter(m => !m.done)
    }
    read(l, s, u, c = 0, f = this.retryTimeout, d) {
        if (!l.length) return d(null, {});
        if (this.readingCalls >= this.maxParallelReads) {
            this.waitingReads.push({
                lng: l,
                ns: s,
                fcName: u,
                tried: c,
                wait: f,
                callback: d
            });
            return
        }
        this.readingCalls++;
        const p = (g, v) => {
                if (this.readingCalls--, this.waitingReads.length > 0) {
                    const b = this.waitingReads.shift();
                    this.read(b.lng, b.ns, b.fcName, b.tried, b.wait, b.callback)
                }
                if (g && v && c < this.maxRetries) {
                    setTimeout(() => {
                        this.read.call(this, l, s, u, c + 1, f * 2, d)
                    }, f);
                    return
                }
                d(g, v)
            },
            m = this.backend[u].bind(this.backend);
        if (m.length === 2) {
            try {
                const g = m(l, s);
                g && typeof g.then == "function" ? g.then(v => p(null, v)).catch(p) : p(null, g)
            } catch (g) {
                p(g)
            }
            return
        }
        return m(l, s, p)
    }
    prepareLoading(l, s, u = {}, c) {
        if (!this.backend) return this.logger.warn("No backend was added via i18next.use. Will not load resources."), c && c();
        re(l) && (l = this.languageUtils.toResolveHierarchy(l)), re(s) && (s = [s]);
        const f = this.queueLoad(l, s, u, c);
        if (!f.toLoad.length) return f.pending.length || c(), null;
        f.toLoad.forEach(d => {
            this.loadOne(d)
        })
    }
    load(l, s, u) {
        this.prepareLoading(l, s, {}, u)
    }
    reload(l, s, u) {
        this.prepareLoading(l, s, {
            reload: !0
        }, u)
    }
    loadOne(l, s = "") {
        const u = l.split("|"),
            c = u[0],
            f = u[1];
        this.read(c, f, "read", void 0, void 0, (d, p) => {
            d && this.logger.warn(`${s}loading namespace ${f} for language ${c} failed`, d), !d && p && this.logger.log(`${s}loaded namespace ${f} for language ${c}`, p), this.loaded(l, d, p)
        })
    }
    saveMissing(l, s, u, c, f, d = {}, p = () => {}) {
        if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(s)) {
            this.logger.warn(`did not save key "${u}" as the namespace "${s}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
            return
        }
        if (!(u == null || u === "")) {
            if (this.backend?.create) {
                const m = {
                        ...d,
                        isUpdate: f
                    },
                    g = this.backend.create.bind(this.backend);
                if (g.length < 6) try {
                    let v;
                    g.length === 5 ? v = g(l, s, u, c, m) : v = g(l, s, u, c), v && typeof v.then == "function" ? v.then(b => p(null, b)).catch(p) : p(null, v)
                } catch (v) {
                    p(v)
                } else g(l, s, u, c, p, m)
            }!l || !l[0] || this.store.addResource(l[0], s, u, c)
        }
    }
}
const Pd = () => ({
        debug: !1,
        initAsync: !0,
        ns: ["translation"],
        defaultNS: ["translation"],
        fallbackLng: ["dev"],
        fallbackNS: !1,
        supportedLngs: !1,
        nonExplicitSupportedLngs: !1,
        load: "all",
        preload: !1,
        simplifyPluralSuffix: !0,
        keySeparator: ".",
        nsSeparator: ":",
        pluralSeparator: "_",
        contextSeparator: "_",
        partialBundledLanguages: !1,
        saveMissing: !1,
        updateMissing: !1,
        saveMissingTo: "fallback",
        saveMissingPlurals: !0,
        missingKeyHandler: !1,
        missingInterpolationHandler: !1,
        postProcess: !1,
        postProcessPassResolved: !1,
        returnNull: !1,
        returnEmptyString: !0,
        returnObjects: !1,
        joinArrays: !1,
        returnedObjectHandler: !1,
        parseMissingKeyHandler: !1,
        appendNamespaceToMissingKey: !1,
        appendNamespaceToCIMode: !1,
        overloadTranslationOptionHandler: r => {
            let l = {};
            if (typeof r[1] == "object" && (l = r[1]), re(r[1]) && (l.defaultValue = r[1]), re(r[2]) && (l.tDescription = r[2]), typeof r[2] == "object" || typeof r[3] == "object") {
                const s = r[3] || r[2];
                Object.keys(s).forEach(u => {
                    l[u] = s[u]
                })
            }
            return l
        },
        interpolation: {
            escapeValue: !0,
            format: r => r,
            prefix: "{{",
            suffix: "}}",
            formatSeparator: ",",
            unescapePrefix: "-",
            nestingPrefix: "$t(",
            nestingSuffix: ")",
            nestingOptionsSeparator: ",",
            maxReplaces: 1e3,
            skipOnVariables: !0
        },
        cacheInBuiltFormats: !0
    }),
    Wd = r => (re(r.ns) && (r.ns = [r.ns]), re(r.fallbackLng) && (r.fallbackLng = [r.fallbackLng]), re(r.fallbackNS) && (r.fallbackNS = [r.fallbackNS]), r.supportedLngs?.indexOf?.("cimode") < 0 && (r.supportedLngs = r.supportedLngs.concat(["cimode"])), typeof r.initImmediate == "boolean" && (r.initAsync = r.initImmediate), r),
    gr = () => {},
    Rp = r => {
        Object.getOwnPropertyNames(Object.getPrototypeOf(r)).forEach(s => {
            typeof r[s] == "function" && (r[s] = r[s].bind(r))
        })
    };
class Qi extends _r {
    constructor(l = {}, s) {
        if (super(), this.options = Wd(l), this.services = {}, this.logger = jt, this.modules = {
                external: []
            }, Rp(this), s && !this.isInitialized && !l.isClone) {
            if (!this.options.initAsync) return this.init(l, s), this;
            setTimeout(() => {
                this.init(l, s)
            }, 0)
        }
    }
    init(l = {}, s) {
        this.isInitializing = !0, typeof l == "function" && (s = l, l = {}), l.defaultNS == null && l.ns && (re(l.ns) ? l.defaultNS = l.ns : l.ns.indexOf("translation") < 0 && (l.defaultNS = l.ns[0]));
        const u = Pd();
        this.options = {
            ...u,
            ...this.options,
            ...Wd(l)
        }, this.options.interpolation = {
            ...u.interpolation,
            ...this.options.interpolation
        }, l.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = l.keySeparator), l.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = l.nsSeparator);
        const c = g => g ? typeof g == "function" ? new g : g : null;
        if (!this.options.isClone) {
            this.modules.logger ? jt.init(c(this.modules.logger), this.options) : jt.init(null, this.options);
            let g;
            this.modules.formatter ? g = this.modules.formatter : g = _p;
            const v = new Kd(this.options);
            this.store = new Vd(this.options.resources, this.options);
            const b = this.services;
            b.logger = jt, b.resourceStore = this.store, b.languageUtils = v, b.pluralResolver = new xp(v, {
                prepend: this.options.pluralSeparator,
                simplifyPluralSuffix: this.options.simplifyPluralSuffix
            }), this.options.interpolation.format && this.options.interpolation.format !== u.interpolation.format && this.logger.deprecate("init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting"), g && (!this.options.interpolation.format || this.options.interpolation.format === u.interpolation.format) && (b.formatter = c(g), b.formatter.init && b.formatter.init(b, this.options), this.options.interpolation.format = b.formatter.format.bind(b.formatter)), b.interpolator = new wp(this.options), b.utils = {
                hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
            }, b.backendConnector = new Op(c(this.modules.backend), b.resourceStore, b, this.options), b.backendConnector.on("*", (x, ...C) => {
                this.emit(x, ...C)
            }), this.modules.languageDetector && (b.languageDetector = c(this.modules.languageDetector), b.languageDetector.init && b.languageDetector.init(b, this.options.detection, this.options)), this.modules.i18nFormat && (b.i18nFormat = c(this.modules.i18nFormat), b.i18nFormat.init && b.i18nFormat.init(this)), this.translator = new xr(this.services, this.options), this.translator.on("*", (x, ...C) => {
                this.emit(x, ...C)
            }), this.modules.external.forEach(x => {
                x.init && x.init(this)
            })
        }
        if (this.format = this.options.interpolation.format, s || (s = gr), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
            const g = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
            g.length > 0 && g[0] !== "dev" && (this.options.lng = g[0])
        }!this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach(g => {
            this[g] = (...v) => this.store[g](...v)
        }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach(g => {
            this[g] = (...v) => (this.store[g](...v), this)
        });
        const p = Bi(),
            m = () => {
                const g = (v, b) => {
                    this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), p.resolve(b), s(v, b)
                };
                if (this.languages && !this.isInitialized) return g(null, this.t.bind(this));
                this.changeLanguage(this.options.lng, g)
            };
        return this.options.resources || !this.options.initAsync ? m() : setTimeout(m, 0), p
    }
    loadResources(l, s = gr) {
        let u = s;
        const c = re(l) ? l : this.language;
        if (typeof l == "function" && (u = l), !this.options.resources || this.options.partialBundledLanguages) {
            if (c?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return u();
            const f = [],
                d = p => {
                    if (!p || p === "cimode") return;
                    this.services.languageUtils.toResolveHierarchy(p).forEach(g => {
                        g !== "cimode" && f.indexOf(g) < 0 && f.push(g)
                    })
                };
            c ? d(c) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(m => d(m)), this.options.preload?.forEach?.(p => d(p)), this.services.backendConnector.load(f, this.options.ns, p => {
                !p && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), u(p)
            })
        } else u(null)
    }
    reloadResources(l, s, u) {
        const c = Bi();
        return typeof l == "function" && (u = l, l = void 0), typeof s == "function" && (u = s, s = void 0), l || (l = this.languages), s || (s = this.options.ns), u || (u = gr), this.services.backendConnector.reload(l, s, f => {
            c.resolve(), u(f)
        }), c
    }
    use(l) {
        if (!l) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
        if (!l.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
        return l.type === "backend" && (this.modules.backend = l), (l.type === "logger" || l.log && l.warn && l.error) && (this.modules.logger = l), l.type === "languageDetector" && (this.modules.languageDetector = l), l.type === "i18nFormat" && (this.modules.i18nFormat = l), l.type === "postProcessor" && Rh.addPostProcessor(l), l.type === "formatter" && (this.modules.formatter = l), l.type === "3rdParty" && this.modules.external.push(l), this
    }
    setResolvedLanguage(l) {
        if (!(!l || !this.languages) && !(["cimode", "dev"].indexOf(l) > -1)) {
            for (let s = 0; s < this.languages.length; s++) {
                const u = this.languages[s];
                if (!(["cimode", "dev"].indexOf(u) > -1) && this.store.hasLanguageSomeTranslations(u)) {
                    this.resolvedLanguage = u;
                    break
                }
            }!this.resolvedLanguage && this.languages.indexOf(l) < 0 && this.store.hasLanguageSomeTranslations(l) && (this.resolvedLanguage = l, this.languages.unshift(l))
        }
    }
    changeLanguage(l, s) {
        this.isLanguageChangingTo = l;
        const u = Bi();
        this.emit("languageChanging", l);
        const c = p => {
                this.language = p, this.languages = this.services.languageUtils.toResolveHierarchy(p), this.resolvedLanguage = void 0, this.setResolvedLanguage(p)
            },
            f = (p, m) => {
                m ? this.isLanguageChangingTo === l && (c(m), this.translator.changeLanguage(m), this.isLanguageChangingTo = void 0, this.emit("languageChanged", m), this.logger.log("languageChanged", m)) : this.isLanguageChangingTo = void 0, u.resolve((...g) => this.t(...g)), s && s(p, (...g) => this.t(...g))
            },
            d = p => {
                !l && !p && this.services.languageDetector && (p = []);
                const m = re(p) ? p : p && p[0],
                    g = this.store.hasLanguageSomeTranslations(m) ? m : this.services.languageUtils.getBestMatchFromCodes(re(p) ? [p] : p);
                g && (this.language || c(g), this.translator.language || this.translator.changeLanguage(g), this.services.languageDetector?.cacheUserLanguage?.(g)), this.loadResources(g, v => {
                    f(v, g)
                })
            };
        return !l && this.services.languageDetector && !this.services.languageDetector.async ? d(this.services.languageDetector.detect()) : !l && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(d) : this.services.languageDetector.detect(d) : d(l), u
    }
    getFixedT(l, s, u) {
        const c = (f, d, ...p) => {
            let m;
            typeof d != "object" ? m = this.options.overloadTranslationOptionHandler([f, d].concat(p)) : m = {
                ...d
            }, m.lng = m.lng || c.lng, m.lngs = m.lngs || c.lngs, m.ns = m.ns || c.ns, m.keyPrefix !== "" && (m.keyPrefix = m.keyPrefix || u || c.keyPrefix);
            const g = this.options.keySeparator || ".";
            let v;
            return m.keyPrefix && Array.isArray(f) ? v = f.map(b => (typeof b == "function" && (b = mu(b, {
                ...this.options,
                ...d
            })), `${m.keyPrefix}${g}${b}`)) : (typeof f == "function" && (f = mu(f, {
                ...this.options,
                ...d
            })), v = m.keyPrefix ? `${m.keyPrefix}${g}${f}` : f), this.t(v, m)
        };
        return re(l) ? c.lng = l : c.lngs = l, c.ns = s, c.keyPrefix = u, c
    }
    t(...l) {
        return this.translator?.translate(...l)
    }
    exists(...l) {
        return this.translator?.exists(...l)
    }
    setDefaultNamespace(l) {
        this.options.defaultNS = l
    }
    hasLoadedNamespace(l, s = {}) {
        if (!this.isInitialized) return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
        if (!this.languages || !this.languages.length) return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
        const u = s.lng || this.resolvedLanguage || this.languages[0],
            c = this.options ? this.options.fallbackLng : !1,
            f = this.languages[this.languages.length - 1];
        if (u.toLowerCase() === "cimode") return !0;
        const d = (p, m) => {
            const g = this.services.backendConnector.state[`${p}|${m}`];
            return g === -1 || g === 0 || g === 2
        };
        if (s.precheck) {
            const p = s.precheck(this, d);
            if (p !== void 0) return p
        }
        return !!(this.hasResourceBundle(u, l) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || d(u, l) && (!c || d(f, l)))
    }
    loadNamespaces(l, s) {
        const u = Bi();
        return this.options.ns ? (re(l) && (l = [l]), l.forEach(c => {
            this.options.ns.indexOf(c) < 0 && this.options.ns.push(c)
        }), this.loadResources(c => {
            u.resolve(), s && s(c)
        }), u) : (s && s(), Promise.resolve())
    }
    loadLanguages(l, s) {
        const u = Bi();
        re(l) && (l = [l]);
        const c = this.options.preload || [],
            f = l.filter(d => c.indexOf(d) < 0 && this.services.languageUtils.isSupportedCode(d));
        return f.length ? (this.options.preload = c.concat(f), this.loadResources(d => {
            u.resolve(), s && s(d)
        }), u) : (s && s(), Promise.resolve())
    }
    dir(l) {
        if (l || (l = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language)), !l) return "rtl";
        try {
            const c = new Intl.Locale(l);
            if (c && c.getTextInfo) {
                const f = c.getTextInfo();
                if (f && f.direction) return f.direction
            }
        } catch {}
        const s = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"],
            u = this.services?.languageUtils || new Kd(Pd());
        return l.toLowerCase().indexOf("-latn") > 1 ? "ltr" : s.indexOf(u.getLanguagePartFromCode(l)) > -1 || l.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr"
    }
    static createInstance(l = {}, s) {
        return new Qi(l, s)
    }
    cloneInstance(l = {}, s = gr) {
        const u = l.forkResourceStore;
        u && delete l.forkResourceStore;
        const c = {
                ...this.options,
                ...l,
                isClone: !0
            },
            f = new Qi(c);
        if ((l.debug !== void 0 || l.prefix !== void 0) && (f.logger = f.logger.clone(l)), ["store", "services", "language"].forEach(p => {
                f[p] = this[p]
            }), f.services = {
                ...this.services
            }, f.services.utils = {
                hasLoadedNamespace: f.hasLoadedNamespace.bind(f)
            }, u) {
            const p = Object.keys(this.store.data).reduce((m, g) => (m[g] = {
                ...this.store.data[g]
            }, m[g] = Object.keys(m[g]).reduce((v, b) => (v[b] = {
                ...m[g][b]
            }, v), m[g]), m), {});
            f.store = new Vd(p, c), f.services.resourceStore = f.store
        }
        return f.translator = new xr(f.services, c), f.translator.on("*", (p, ...m) => {
            f.emit(p, ...m)
        }), f.init(c, s), f.translator.options = c, f.translator.backendConnector.services.utils = {
            hasLoadedNamespace: f.hasLoadedNamespace.bind(f)
        }, f
    }
    toJSON() {
        return {
            options: this.options,
            store: this.store,
            language: this.language,
            languages: this.languages,
            resolvedLanguage: this.resolvedLanguage
        }
    }
}
const et = Qi.createInstance();
et.createInstance = Qi.createInstance;
et.createInstance;
et.dir;
et.init;
et.loadResources;
et.reloadResources;
et.use;
et.changeLanguage;
et.getFixedT;
et.t;
et.exists;
et.setDefaultNamespace;
et.hasLoadedNamespace;
et.loadNamespaces;
et.loadLanguages;
const qp = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,
    Ap = {
        "&amp;": "&",
        "&#38;": "&",
        "&lt;": "<",
        "&#60;": "<",
        "&gt;": ">",
        "&#62;": ">",
        "&apos;": "'",
        "&#39;": "'",
        "&quot;": '"',
        "&#34;": '"',
        "&nbsp;": " ",
        "&#160;": " ",
        "&copy;": "©",
        "&#169;": "©",
        "&reg;": "®",
        "&#174;": "®",
        "&hellip;": "…",
        "&#8230;": "…",
        "&#x2F;": "/",
        "&#47;": "/"
    },
    Tp = r => Ap[r],
    Np = r => r.replace(qp, Tp);
let Id = {
    bindI18n: "languageChanged",
    bindI18nStore: "",
    transEmptyNodeValue: "",
    transSupportBasicHtmlNodes: !0,
    transWrapTextNodes: "",
    transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
    useSuspense: !0,
    unescape: Np
};
const zp = (r = {}) => {
        Id = {
            ...Id,
            ...r
        }
    },
    Lp = {
        type: "3rdParty",
        init(r) {
            zp(r.options.react)
        }
    },
    {
        slice: Dp,
        forEach: jp
    } = [];

function Up(r) {
    return jp.call(Dp.call(arguments, 1), l => {
        if (l)
            for (const s in l) r[s] === void 0 && (r[s] = l[s])
    }), r
}

function Bp(r) {
    return typeof r != "string" ? !1 : [/<\s*script.*?>/i, /<\s*\/\s*script\s*>/i, /<\s*img.*?on\w+\s*=/i, /<\s*\w+\s*on\w+\s*=.*?>/i, /javascript\s*:/i, /vbscript\s*:/i, /expression\s*\(/i, /eval\s*\(/i, /alert\s*\(/i, /document\.cookie/i, /document\.write\s*\(/i, /window\.location/i, /innerHTML/i].some(s => s.test(r))
}
const eh = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,
    Hp = function(r, l) {
        const u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
                path: "/"
            },
            c = encodeURIComponent(l);
        let f = `${r}=${c}`;
        if (u.maxAge > 0) {
            const d = u.maxAge - 0;
            if (Number.isNaN(d)) throw new Error("maxAge should be a Number");
            f += `; Max-Age=${Math.floor(d)}`
        }
        if (u.domain) {
            if (!eh.test(u.domain)) throw new TypeError("option domain is invalid");
            f += `; Domain=${u.domain}`
        }
        if (u.path) {
            if (!eh.test(u.path)) throw new TypeError("option path is invalid");
            f += `; Path=${u.path}`
        }
        if (u.expires) {
            if (typeof u.expires.toUTCString != "function") throw new TypeError("option expires is invalid");
            f += `; Expires=${u.expires.toUTCString()}`
        }
        if (u.httpOnly && (f += "; HttpOnly"), u.secure && (f += "; Secure"), u.sameSite) switch (typeof u.sameSite == "string" ? u.sameSite.toLowerCase() : u.sameSite) {
            case !0:
                f += "; SameSite=Strict";
                break;
            case "lax":
                f += "; SameSite=Lax";
                break;
            case "strict":
                f += "; SameSite=Strict";
                break;
            case "none":
                f += "; SameSite=None";
                break;
            default:
                throw new TypeError("option sameSite is invalid")
        }
        return u.partitioned && (f += "; Partitioned"), f
    },
    th = {
        create(r, l, s, u) {
            let c = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
                path: "/",
                sameSite: "strict"
            };
            s && (c.expires = new Date, c.expires.setTime(c.expires.getTime() + s * 60 * 1e3)), u && (c.domain = u), document.cookie = Hp(r, l, c)
        },
        read(r) {
            const l = `${r}=`,
                s = document.cookie.split(";");
            for (let u = 0; u < s.length; u++) {
                let c = s[u];
                for (; c.charAt(0) === " ";) c = c.substring(1, c.length);
                if (c.indexOf(l) === 0) return c.substring(l.length, c.length)
            }
            return null
        },
        remove(r, l) {
            this.create(r, "", -1, l)
        }
    };
var Gp = {
        name: "cookie",
        lookup(r) {
            let {
                lookupCookie: l
            } = r;
            if (l && typeof document < "u") return th.read(l) || void 0
        },
        cacheUserLanguage(r, l) {
            let {
                lookupCookie: s,
                cookieMinutes: u,
                cookieDomain: c,
                cookieOptions: f
            } = l;
            s && typeof document < "u" && th.create(s, r, u, c, f)
        }
    },
    kp = {
        name: "querystring",
        lookup(r) {
            let {
                lookupQuerystring: l
            } = r, s;
            if (typeof window < "u") {
                let {
                    search: u
                } = window.location;
                !window.location.search && window.location.hash?.indexOf("?") > -1 && (u = window.location.hash.substring(window.location.hash.indexOf("?")));
                const f = u.substring(1).split("&");
                for (let d = 0; d < f.length; d++) {
                    const p = f[d].indexOf("=");
                    p > 0 && f[d].substring(0, p) === l && (s = f[d].substring(p + 1))
                }
            }
            return s
        }
    },
    Yp = {
        name: "hash",
        lookup(r) {
            let {
                lookupHash: l,
                lookupFromHashIndex: s
            } = r, u;
            if (typeof window < "u") {
                const {
                    hash: c
                } = window.location;
                if (c && c.length > 2) {
                    const f = c.substring(1);
                    if (l) {
                        const d = f.split("&");
                        for (let p = 0; p < d.length; p++) {
                            const m = d[p].indexOf("=");
                            m > 0 && d[p].substring(0, m) === l && (u = d[p].substring(m + 1))
                        }
                    }
                    if (u) return u;
                    if (!u && s > -1) {
                        const d = c.match(/\/([a-zA-Z-]*)/g);
                        return Array.isArray(d) ? d[typeof s == "number" ? s : 0]?.replace("/", "") : void 0
                    }
                }
            }
            return u
        }
    };
let Ln = null;
const ah = () => {
    if (Ln !== null) return Ln;
    try {
        if (Ln = typeof window < "u" && window.localStorage !== null, !Ln) return !1;
        const r = "i18next.translate.boo";
        window.localStorage.setItem(r, "foo"), window.localStorage.removeItem(r)
    } catch {
        Ln = !1
    }
    return Ln
};
var Vp = {
    name: "localStorage",
    lookup(r) {
        let {
            lookupLocalStorage: l
        } = r;
        if (l && ah()) return window.localStorage.getItem(l) || void 0
    },
    cacheUserLanguage(r, l) {
        let {
            lookupLocalStorage: s
        } = l;
        s && ah() && window.localStorage.setItem(s, r)
    }
};
let Dn = null;
const nh = () => {
    if (Dn !== null) return Dn;
    try {
        if (Dn = typeof window < "u" && window.sessionStorage !== null, !Dn) return !1;
        const r = "i18next.translate.boo";
        window.sessionStorage.setItem(r, "foo"), window.sessionStorage.removeItem(r)
    } catch {
        Dn = !1
    }
    return Dn
};
var Qp = {
        name: "sessionStorage",
        lookup(r) {
            let {
                lookupSessionStorage: l
            } = r;
            if (l && nh()) return window.sessionStorage.getItem(l) || void 0
        },
        cacheUserLanguage(r, l) {
            let {
                lookupSessionStorage: s
            } = l;
            s && nh() && window.sessionStorage.setItem(s, r)
        }
    },
    Xp = {
        name: "navigator",
        lookup(r) {
            const l = [];
            if (typeof navigator < "u") {
                const {
                    languages: s,
                    userLanguage: u,
                    language: c
                } = navigator;
                if (s)
                    for (let f = 0; f < s.length; f++) l.push(s[f]);
                u && l.push(u), c && l.push(c)
            }
            return l.length > 0 ? l : void 0
        }
    },
    Kp = {
        name: "htmlTag",
        lookup(r) {
            let {
                htmlTag: l
            } = r, s;
            const u = l || (typeof document < "u" ? document.documentElement : null);
            return u && typeof u.getAttribute == "function" && (s = u.getAttribute("lang")), s
        }
    },
    Zp = {
        name: "path",
        lookup(r) {
            let {
                lookupFromPathIndex: l
            } = r;
            if (typeof window > "u") return;
            const s = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
            return Array.isArray(s) ? s[typeof l == "number" ? l : 0]?.replace("/", "") : void 0
        }
    },
    $p = {
        name: "subdomain",
        lookup(r) {
            let {
                lookupFromSubdomainIndex: l
            } = r;
            const s = typeof l == "number" ? l + 1 : 1,
                u = typeof window < "u" && window.location?.hostname?.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);
            if (u) return u[s]
        }
    };
let Ah = !1;
try {
    document.cookie, Ah = !0
} catch {}
const Th = ["querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag"];
Ah || Th.splice(1, 1);
const Jp = () => ({
    order: Th,
    lookupQuerystring: "lng",
    lookupCookie: "i18next",
    lookupLocalStorage: "i18nextLng",
    lookupSessionStorage: "i18nextLng",
    caches: ["localStorage"],
    excludeCacheFor: ["cimode"],
    convertDetectedLanguage: r => r
});
class Nh {
    constructor(l) {
        let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        this.type = "languageDetector", this.detectors = {}, this.init(l, s)
    }
    init() {
        let l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
                languageUtils: {}
            },
            s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        this.services = l, this.options = Up(s, this.options || {}, Jp()), typeof this.options.convertDetectedLanguage == "string" && this.options.convertDetectedLanguage.indexOf("15897") > -1 && (this.options.convertDetectedLanguage = c => c.replace("-", "_")), this.options.lookupFromUrlIndex && (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex), this.i18nOptions = u, this.addDetector(Gp), this.addDetector(kp), this.addDetector(Vp), this.addDetector(Qp), this.addDetector(Xp), this.addDetector(Kp), this.addDetector(Zp), this.addDetector($p), this.addDetector(Yp)
    }
    addDetector(l) {
        return this.detectors[l.name] = l, this
    }
    detect() {
        let l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.options.order,
            s = [];
        return l.forEach(u => {
            if (this.detectors[u]) {
                let c = this.detectors[u].lookup(this.options);
                c && typeof c == "string" && (c = [c]), c && (s = s.concat(c))
            }
        }), s = s.filter(u => u != null && !Bp(u)).map(u => this.options.convertDetectedLanguage(u)), this.services && this.services.languageUtils && this.services.languageUtils.getBestMatchFromCodes ? s : s.length > 0 ? s[0] : null
    }
    cacheUserLanguage(l) {
        let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.options.caches;
        s && (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(l) > -1 || s.forEach(u => {
            this.detectors[u] && this.detectors[u].cacheUserLanguage(l, this.options)
        }))
    }
}
Nh.type = "languageDetector";
const ih = Object.assign({}),
    ki = {};
Object.keys(ih).forEach(r => {
    const l = r.match(/\.\/([^/]+)\/([^/]+)\.ts$/);
    if (l) {
        const [, s] = l, u = ih[r];
        ki[s] || (ki[s] = {
            translation: {}
        }), u.default && (ki[s].translation = {
            ...ki[s].translation,
            ...u.default
        })
    }
});
et.use(Nh).use(Lp).init({
    lng: "en",
    fallbackLng: "en",
    debug: !1,
    resources: ki,
    interpolation: {
        escapeValue: !1
    }
});
var lu = {
        exports: {}
    },
    Hi = {},
    ru = {
        exports: {}
    },
    su = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lh;

function Fp() {
    return lh || (lh = 1, (function(r) {
        function l(j, X) {
            var ee = j.length;
            j.push(X);
            e: for (; 0 < ee;) {
                var be = ee - 1 >>> 1,
                    _ = j[be];
                if (0 < c(_, X)) j[be] = X, j[ee] = _, ee = be;
                else break e
            }
        }

        function s(j) {
            return j.length === 0 ? null : j[0]
        }

        function u(j) {
            if (j.length === 0) return null;
            var X = j[0],
                ee = j.pop();
            if (ee !== X) {
                j[0] = ee;
                e: for (var be = 0, _ = j.length, H = _ >>> 1; be < H;) {
                    var J = 2 * (be + 1) - 1,
                        Z = j[J],
                        te = J + 1,
                        Se = j[te];
                    if (0 > c(Z, ee)) te < _ && 0 > c(Se, Z) ? (j[be] = Se, j[te] = ee, be = te) : (j[be] = Z, j[J] = ee, be = J);
                    else if (te < _ && 0 > c(Se, ee)) j[be] = Se, j[te] = ee, be = te;
                    else break e
                }
            }
            return X
        }

        function c(j, X) {
            var ee = j.sortIndex - X.sortIndex;
            return ee !== 0 ? ee : j.id - X.id
        }
        if (r.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
            var f = performance;
            r.unstable_now = function() {
                return f.now()
            }
        } else {
            var d = Date,
                p = d.now();
            r.unstable_now = function() {
                return d.now() - p
            }
        }
        var m = [],
            g = [],
            v = 1,
            b = null,
            S = 3,
            x = !1,
            C = !1,
            T = !1,
            M = !1,
            L = typeof setTimeout == "function" ? setTimeout : null,
            D = typeof clearTimeout == "function" ? clearTimeout : null,
            V = typeof setImmediate < "u" ? setImmediate : null;

        function W(j) {
            for (var X = s(g); X !== null;) {
                if (X.callback === null) u(g);
                else if (X.startTime <= j) u(g), X.sortIndex = X.expirationTime, l(m, X);
                else break;
                X = s(g)
            }
        }

        function Q(j) {
            if (T = !1, W(j), !C)
                if (s(m) !== null) C = !0, oe || (oe = !0, P());
                else {
                    var X = s(g);
                    X !== null && pe(Q, X.startTime - j)
                }
        }
        var oe = !1,
            me = -1,
            $ = 5,
            ve = -1;

        function Y() {
            return M ? !0 : !(r.unstable_now() - ve < $)
        }

        function K() {
            if (M = !1, oe) {
                var j = r.unstable_now();
                ve = j;
                var X = !0;
                try {
                    e: {
                        C = !1,
                        T && (T = !1, D(me), me = -1),
                        x = !0;
                        var ee = S;
                        try {
                            t: {
                                for (W(j), b = s(m); b !== null && !(b.expirationTime > j && Y());) {
                                    var be = b.callback;
                                    if (typeof be == "function") {
                                        b.callback = null, S = b.priorityLevel;
                                        var _ = be(b.expirationTime <= j);
                                        if (j = r.unstable_now(), typeof _ == "function") {
                                            b.callback = _, W(j), X = !0;
                                            break t
                                        }
                                        b === s(m) && u(m), W(j)
                                    } else u(m);
                                    b = s(m)
                                }
                                if (b !== null) X = !0;
                                else {
                                    var H = s(g);
                                    H !== null && pe(Q, H.startTime - j), X = !1
                                }
                            }
                            break e
                        }
                        finally {
                            b = null, S = ee, x = !1
                        }
                        X = void 0
                    }
                }
                finally {
                    X ? P() : oe = !1
                }
            }
        }
        var P;
        if (typeof V == "function") P = function() {
            V(K)
        };
        else if (typeof MessageChannel < "u") {
            var ie = new MessageChannel,
                ge = ie.port2;
            ie.port1.onmessage = K, P = function() {
                ge.postMessage(null)
            }
        } else P = function() {
            L(K, 0)
        };

        function pe(j, X) {
            me = L(function() {
                j(r.unstable_now())
            }, X)
        }
        r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(j) {
            j.callback = null
        }, r.unstable_forceFrameRate = function(j) {
            0 > j || 125 < j ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : $ = 0 < j ? Math.floor(1e3 / j) : 5
        }, r.unstable_getCurrentPriorityLevel = function() {
            return S
        }, r.unstable_next = function(j) {
            switch (S) {
                case 1:
                case 2:
                case 3:
                    var X = 3;
                    break;
                default:
                    X = S
            }
            var ee = S;
            S = X;
            try {
                return j()
            } finally {
                S = ee
            }
        }, r.unstable_requestPaint = function() {
            M = !0
        }, r.unstable_runWithPriority = function(j, X) {
            switch (j) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    j = 3
            }
            var ee = S;
            S = j;
            try {
                return X()
            } finally {
                S = ee
            }
        }, r.unstable_scheduleCallback = function(j, X, ee) {
            var be = r.unstable_now();
            switch (typeof ee == "object" && ee !== null ? (ee = ee.delay, ee = typeof ee == "number" && 0 < ee ? be + ee : be) : ee = be, j) {
                case 1:
                    var _ = -1;
                    break;
                case 2:
                    _ = 250;
                    break;
                case 5:
                    _ = 1073741823;
                    break;
                case 4:
                    _ = 1e4;
                    break;
                default:
                    _ = 5e3
            }
            return _ = ee + _, j = {
                id: v++,
                callback: X,
                priorityLevel: j,
                startTime: ee,
                expirationTime: _,
                sortIndex: -1
            }, ee > be ? (j.sortIndex = ee, l(g, j), s(m) === null && j === s(g) && (T ? (D(me), me = -1) : T = !0, pe(Q, ee - be))) : (j.sortIndex = _, l(m, j), C || x || (C = !0, oe || (oe = !0, P()))), j
        }, r.unstable_shouldYield = Y, r.unstable_wrapCallback = function(j) {
            var X = S;
            return function() {
                var ee = S;
                S = X;
                try {
                    return j.apply(this, arguments)
                } finally {
                    S = ee
                }
            }
        }
    })(su)), su
}
var rh;

function Pp() {
    return rh || (rh = 1, ru.exports = Fp()), ru.exports
}
var ou = {
        exports: {}
    },
    Ie = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sh;

function Wp() {
    if (sh) return Ie;
    sh = 1;
    var r = bu();

    function l(m) {
        var g = "https://react.dev/errors/" + m;
        if (1 < arguments.length) {
            g += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var v = 2; v < arguments.length; v++) g += "&args[]=" + encodeURIComponent(arguments[v])
        }
        return "Minified React error #" + m + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }

    function s() {}
    var u = {
            d: {
                f: s,
                r: function() {
                    throw Error(l(522))
                },
                D: s,
                C: s,
                L: s,
                m: s,
                X: s,
                S: s,
                M: s
            },
            p: 0,
            findDOMNode: null
        },
        c = Symbol.for("react.portal");

    function f(m, g, v) {
        var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
            $$typeof: c,
            key: b == null ? null : "" + b,
            children: m,
            containerInfo: g,
            implementation: v
        }
    }
    var d = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

    function p(m, g) {
        if (m === "font") return "";
        if (typeof g == "string") return g === "use-credentials" ? g : ""
    }
    return Ie.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, Ie.createPortal = function(m, g) {
        var v = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11) throw Error(l(299));
        return f(m, g, null, v)
    }, Ie.flushSync = function(m) {
        var g = d.T,
            v = u.p;
        try {
            if (d.T = null, u.p = 2, m) return m()
        } finally {
            d.T = g, u.p = v, u.d.f()
        }
    }, Ie.preconnect = function(m, g) {
        typeof m == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, u.d.C(m, g))
    }, Ie.prefetchDNS = function(m) {
        typeof m == "string" && u.d.D(m)
    }, Ie.preinit = function(m, g) {
        if (typeof m == "string" && g && typeof g.as == "string") {
            var v = g.as,
                b = p(v, g.crossOrigin),
                S = typeof g.integrity == "string" ? g.integrity : void 0,
                x = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
            v === "style" ? u.d.S(m, typeof g.precedence == "string" ? g.precedence : void 0, {
                crossOrigin: b,
                integrity: S,
                fetchPriority: x
            }) : v === "script" && u.d.X(m, {
                crossOrigin: b,
                integrity: S,
                fetchPriority: x,
                nonce: typeof g.nonce == "string" ? g.nonce : void 0
            })
        }
    }, Ie.preinitModule = function(m, g) {
        if (typeof m == "string")
            if (typeof g == "object" && g !== null) {
                if (g.as == null || g.as === "script") {
                    var v = p(g.as, g.crossOrigin);
                    u.d.M(m, {
                        crossOrigin: v,
                        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
                        nonce: typeof g.nonce == "string" ? g.nonce : void 0
                    })
                }
            } else g == null && u.d.M(m)
    }, Ie.preload = function(m, g) {
        if (typeof m == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
            var v = g.as,
                b = p(v, g.crossOrigin);
            u.d.L(m, v, {
                crossOrigin: b,
                integrity: typeof g.integrity == "string" ? g.integrity : void 0,
                nonce: typeof g.nonce == "string" ? g.nonce : void 0,
                type: typeof g.type == "string" ? g.type : void 0,
                fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
                referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
                imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
                imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
                media: typeof g.media == "string" ? g.media : void 0
            })
        }
    }, Ie.preloadModule = function(m, g) {
        if (typeof m == "string")
            if (g) {
                var v = p(g.as, g.crossOrigin);
                u.d.m(m, {
                    as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
                    crossOrigin: v,
                    integrity: typeof g.integrity == "string" ? g.integrity : void 0
                })
            } else u.d.m(m)
    }, Ie.requestFormReset = function(m) {
        u.d.r(m)
    }, Ie.unstable_batchedUpdates = function(m, g) {
        return m(g)
    }, Ie.useFormState = function(m, g, v) {
        return d.H.useFormState(m, g, v)
    }, Ie.useFormStatus = function() {
        return d.H.useHostTransitionStatus()
    }, Ie.version = "19.1.1", Ie
}
var oh;

function Ip() {
    if (oh) return ou.exports;
    oh = 1;

    function r() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)
        } catch (l) {
            console.error(l)
        }
    }
    return r(), ou.exports = Wp(), ou.exports
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uh;

function ey() {
    if (uh) return Hi;
    uh = 1;
    var r = Pp(),
        l = bu(),
        s = Ip();

    function u(e) {
        var t = "https://react.dev/errors/" + e;
        if (1 < arguments.length) {
            t += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var a = 2; a < arguments.length; a++) t += "&args[]=" + encodeURIComponent(arguments[a])
        }
        return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }

    function c(e) {
        return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
    }

    function f(e) {
        var t = e,
            a = e;
        if (e.alternate)
            for (; t.return;) t = t.return;
        else {
            e = t;
            do t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return; while (e)
        }
        return t.tag === 3 ? a : null
    }

    function d(e) {
        if (e.tag === 13) {
            var t = e.memoizedState;
            if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
        }
        return null
    }

    function p(e) {
        if (f(e) !== e) throw Error(u(188))
    }

    function m(e) {
        var t = e.alternate;
        if (!t) {
            if (t = f(e), t === null) throw Error(u(188));
            return t !== e ? null : e
        }
        for (var a = e, n = t;;) {
            var i = a.return;
            if (i === null) break;
            var o = i.alternate;
            if (o === null) {
                if (n = i.return, n !== null) {
                    a = n;
                    continue
                }
                break
            }
            if (i.child === o.child) {
                for (o = i.child; o;) {
                    if (o === a) return p(i), e;
                    if (o === n) return p(i), t;
                    o = o.sibling
                }
                throw Error(u(188))
            }
            if (a.return !== n.return) a = i, n = o;
            else {
                for (var h = !1, y = i.child; y;) {
                    if (y === a) {
                        h = !0, a = i, n = o;
                        break
                    }
                    if (y === n) {
                        h = !0, n = i, a = o;
                        break
                    }
                    y = y.sibling
                }
                if (!h) {
                    for (y = o.child; y;) {
                        if (y === a) {
                            h = !0, a = o, n = i;
                            break
                        }
                        if (y === n) {
                            h = !0, n = o, a = i;
                            break
                        }
                        y = y.sibling
                    }
                    if (!h) throw Error(u(189))
                }
            }
            if (a.alternate !== n) throw Error(u(190))
        }
        if (a.tag !== 3) throw Error(u(188));
        return a.stateNode.current === a ? e : t
    }

    function g(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6) return e;
        for (e = e.child; e !== null;) {
            if (t = g(e), t !== null) return t;
            e = e.sibling
        }
        return null
    }
    var v = Object.assign,
        b = Symbol.for("react.element"),
        S = Symbol.for("react.transitional.element"),
        x = Symbol.for("react.portal"),
        C = Symbol.for("react.fragment"),
        T = Symbol.for("react.strict_mode"),
        M = Symbol.for("react.profiler"),
        L = Symbol.for("react.provider"),
        D = Symbol.for("react.consumer"),
        V = Symbol.for("react.context"),
        W = Symbol.for("react.forward_ref"),
        Q = Symbol.for("react.suspense"),
        oe = Symbol.for("react.suspense_list"),
        me = Symbol.for("react.memo"),
        $ = Symbol.for("react.lazy"),
        ve = Symbol.for("react.activity"),
        Y = Symbol.for("react.memo_cache_sentinel"),
        K = Symbol.iterator;

    function P(e) {
        return e === null || typeof e != "object" ? null : (e = K && e[K] || e["@@iterator"], typeof e == "function" ? e : null)
    }
    var ie = Symbol.for("react.client.reference");

    function ge(e) {
        if (e == null) return null;
        if (typeof e == "function") return e.$$typeof === ie ? null : e.displayName || e.name || null;
        if (typeof e == "string") return e;
        switch (e) {
            case C:
                return "Fragment";
            case M:
                return "Profiler";
            case T:
                return "StrictMode";
            case Q:
                return "Suspense";
            case oe:
                return "SuspenseList";
            case ve:
                return "Activity"
        }
        if (typeof e == "object") switch (e.$$typeof) {
            case x:
                return "Portal";
            case V:
                return (e.displayName || "Context") + ".Provider";
            case D:
                return (e._context.displayName || "Context") + ".Consumer";
            case W:
                var t = e.render;
                return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
            case me:
                return t = e.displayName || null, t !== null ? t : ge(e.type) || "Memo";
            case $:
                t = e._payload, e = e._init;
                try {
                    return ge(e(t))
                } catch {}
        }
        return null
    }
    var pe = Array.isArray,
        j = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
        X = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
        ee = {
            pending: !1,
            data: null,
            method: null,
            action: null
        },
        be = [],
        _ = -1;

    function H(e) {
        return {
            current: e
        }
    }

    function J(e) {
        0 > _ || (e.current = be[_], be[_] = null, _--)
    }

    function Z(e, t) {
        _++, be[_] = e.current, e.current = t
    }
    var te = H(null),
        Se = H(null),
        se = H(null),
        st = H(null);

    function Ae(e, t) {
        switch (Z(se, t), Z(Se, e), Z(te, null), t.nodeType) {
            case 9:
            case 11:
                e = (e = t.documentElement) && (e = e.namespaceURI) ? K0(e) : 0;
                break;
            default:
                if (e = t.tagName, t = t.namespaceURI) t = K0(t), e = Z0(t, e);
                else switch (e) {
                    case "svg":
                        e = 1;
                        break;
                    case "math":
                        e = 2;
                        break;
                    default:
                        e = 0
                }
        }
        J(te), Z(te, e)
    }

    function na() {
        J(te), J(Se), J(se)
    }

    function qr(e) {
        e.memoizedState !== null && Z(st, e);
        var t = te.current,
            a = Z0(t, e.type);
        t !== a && (Z(Se, e), Z(te, a))
    }

    function Fi(e) {
        Se.current === e && (J(te), J(Se)), st.current === e && (J(st), Ai._currentValue = ee)
    }
    var Ar = Object.prototype.hasOwnProperty,
        Tr = r.unstable_scheduleCallback,
        Nr = r.unstable_cancelCallback,
        Ih = r.unstable_shouldYield,
        eg = r.unstable_requestPaint,
        At = r.unstable_now,
        tg = r.unstable_getCurrentPriorityLevel,
        _u = r.unstable_ImmediatePriority,
        Mu = r.unstable_UserBlockingPriority,
        Pi = r.unstable_NormalPriority,
        ag = r.unstable_LowPriority,
        Ou = r.unstable_IdlePriority,
        ng = r.log,
        ig = r.unstable_setDisableYieldValue,
        Bn = null,
        ot = null;

    function ia(e) {
        if (typeof ng == "function" && ig(e), ot && typeof ot.setStrictMode == "function") try {
            ot.setStrictMode(Bn, e)
        } catch {}
    }
    var ut = Math.clz32 ? Math.clz32 : sg,
        lg = Math.log,
        rg = Math.LN2;

    function sg(e) {
        return e >>>= 0, e === 0 ? 32 : 31 - (lg(e) / rg | 0) | 0
    }
    var Wi = 256,
        Ii = 4194304;

    function qa(e) {
        var t = e & 42;
        if (t !== 0) return t;
        switch (e & -e) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 4:
                return 4;
            case 8:
                return 8;
            case 16:
                return 16;
            case 32:
                return 32;
            case 64:
                return 64;
            case 128:
                return 128;
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
                return e & 4194048;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
                return e & 62914560;
            case 67108864:
                return 67108864;
            case 134217728:
                return 134217728;
            case 268435456:
                return 268435456;
            case 536870912:
                return 536870912;
            case 1073741824:
                return 0;
            default:
                return e
        }
    }

    function el(e, t, a) {
        var n = e.pendingLanes;
        if (n === 0) return 0;
        var i = 0,
            o = e.suspendedLanes,
            h = e.pingedLanes;
        e = e.warmLanes;
        var y = n & 134217727;
        return y !== 0 ? (n = y & ~o, n !== 0 ? i = qa(n) : (h &= y, h !== 0 ? i = qa(h) : a || (a = y & ~e, a !== 0 && (i = qa(a))))) : (y = n & ~o, y !== 0 ? i = qa(y) : h !== 0 ? i = qa(h) : a || (a = n & ~e, a !== 0 && (i = qa(a)))), i === 0 ? 0 : t !== 0 && t !== i && (t & o) === 0 && (o = i & -i, a = t & -t, o >= a || o === 32 && (a & 4194048) !== 0) ? t : i
    }

    function Hn(e, t) {
        return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0
    }

    function og(e, t) {
        switch (e) {
            case 1:
            case 2:
            case 4:
            case 8:
            case 64:
                return t + 250;
            case 16:
            case 32:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
                return t + 5e3;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
                return -1;
            case 67108864:
            case 134217728:
            case 268435456:
            case 536870912:
            case 1073741824:
                return -1;
            default:
                return -1
        }
    }

    function Ru() {
        var e = Wi;
        return Wi <<= 1, (Wi & 4194048) === 0 && (Wi = 256), e
    }

    function qu() {
        var e = Ii;
        return Ii <<= 1, (Ii & 62914560) === 0 && (Ii = 4194304), e
    }

    function zr(e) {
        for (var t = [], a = 0; 31 > a; a++) t.push(e);
        return t
    }

    function Gn(e, t) {
        e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0)
    }

    function ug(e, t, a, n, i, o) {
        var h = e.pendingLanes;
        e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
        var y = e.entanglements,
            w = e.expirationTimes,
            A = e.hiddenUpdates;
        for (a = h & ~a; 0 < a;) {
            var U = 31 - ut(a),
                k = 1 << U;
            y[U] = 0, w[U] = -1;
            var N = A[U];
            if (N !== null)
                for (A[U] = null, U = 0; U < N.length; U++) {
                    var z = N[U];
                    z !== null && (z.lane &= -536870913)
                }
            a &= ~k
        }
        n !== 0 && Au(e, n, 0), o !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= o & ~(h & ~t))
    }

    function Au(e, t, a) {
        e.pendingLanes |= t, e.suspendedLanes &= ~t;
        var n = 31 - ut(t);
        e.entangledLanes |= t, e.entanglements[n] = e.entanglements[n] | 1073741824 | a & 4194090
    }

    function Tu(e, t) {
        var a = e.entangledLanes |= t;
        for (e = e.entanglements; a;) {
            var n = 31 - ut(a),
                i = 1 << n;
            i & t | e[n] & t && (e[n] |= t), a &= ~i
        }
    }

    function Lr(e) {
        switch (e) {
            case 2:
                e = 1;
                break;
            case 8:
                e = 4;
                break;
            case 32:
                e = 16;
                break;
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
                e = 128;
                break;
            case 268435456:
                e = 134217728;
                break;
            default:
                e = 0
        }
        return e
    }

    function Dr(e) {
        return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2
    }

    function Nu() {
        var e = X.p;
        return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : dd(e.type))
    }

    function cg(e, t) {
        var a = X.p;
        try {
            return X.p = e, t()
        } finally {
            X.p = a
        }
    }
    var la = Math.random().toString(36).slice(2),
        Pe = "__reactFiber$" + la,
        at = "__reactProps$" + la,
        Za = "__reactContainer$" + la,
        jr = "__reactEvents$" + la,
        fg = "__reactListeners$" + la,
        dg = "__reactHandles$" + la,
        zu = "__reactResources$" + la,
        kn = "__reactMarker$" + la;

    function Ur(e) {
        delete e[Pe], delete e[at], delete e[jr], delete e[fg], delete e[dg]
    }

    function $a(e) {
        var t = e[Pe];
        if (t) return t;
        for (var a = e.parentNode; a;) {
            if (t = a[Za] || a[Pe]) {
                if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
                    for (e = P0(e); e !== null;) {
                        if (a = e[Pe]) return a;
                        e = P0(e)
                    }
                return t
            }
            e = a, a = e.parentNode
        }
        return null
    }

    function Ja(e) {
        if (e = e[Pe] || e[Za]) {
            var t = e.tag;
            if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3) return e
        }
        return null
    }

    function Yn(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
        throw Error(u(33))
    }

    function Fa(e) {
        var t = e[zu];
        return t || (t = e[zu] = {
            hoistableStyles: new Map,
            hoistableScripts: new Map
        }), t
    }

    function Qe(e) {
        e[kn] = !0
    }
    var Lu = new Set,
        Du = {};

    function Aa(e, t) {
        Pa(e, t), Pa(e + "Capture", t)
    }

    function Pa(e, t) {
        for (Du[e] = t, e = 0; e < t.length; e++) Lu.add(t[e])
    }
    var hg = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),
        ju = {},
        Uu = {};

    function gg(e) {
        return Ar.call(Uu, e) ? !0 : Ar.call(ju, e) ? !1 : hg.test(e) ? Uu[e] = !0 : (ju[e] = !0, !1)
    }

    function tl(e, t, a) {
        if (gg(t))
            if (a === null) e.removeAttribute(t);
            else {
                switch (typeof a) {
                    case "undefined":
                    case "function":
                    case "symbol":
                        e.removeAttribute(t);
                        return;
                    case "boolean":
                        var n = t.toLowerCase().slice(0, 5);
                        if (n !== "data-" && n !== "aria-") {
                            e.removeAttribute(t);
                            return
                        }
                }
                e.setAttribute(t, "" + a)
            }
    }

    function al(e, t, a) {
        if (a === null) e.removeAttribute(t);
        else {
            switch (typeof a) {
                case "undefined":
                case "function":
                case "symbol":
                case "boolean":
                    e.removeAttribute(t);
                    return
            }
            e.setAttribute(t, "" + a)
        }
    }

    function Gt(e, t, a, n) {
        if (n === null) e.removeAttribute(a);
        else {
            switch (typeof n) {
                case "undefined":
                case "function":
                case "symbol":
                case "boolean":
                    e.removeAttribute(a);
                    return
            }
            e.setAttributeNS(t, a, "" + n)
        }
    }
    var Br, Bu;

    function Wa(e) {
        if (Br === void 0) try {
            throw Error()
        } catch (a) {
            var t = a.stack.trim().match(/\n( *(at )?)/);
            Br = t && t[1] || "", Bu = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : ""
        }
        return `
` + Br + e + Bu
    }
    var Hr = !1;

    function Gr(e, t) {
        if (!e || Hr) return "";
        Hr = !0;
        var a = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
            var n = {
                DetermineComponentFrameRoot: function() {
                    try {
                        if (t) {
                            var k = function() {
                                throw Error()
                            };
                            if (Object.defineProperty(k.prototype, "props", {
                                    set: function() {
                                        throw Error()
                                    }
                                }), typeof Reflect == "object" && Reflect.construct) {
                                try {
                                    Reflect.construct(k, [])
                                } catch (z) {
                                    var N = z
                                }
                                Reflect.construct(e, [], k)
                            } else {
                                try {
                                    k.call()
                                } catch (z) {
                                    N = z
                                }
                                e.call(k.prototype)
                            }
                        } else {
                            try {
                                throw Error()
                            } catch (z) {
                                N = z
                            }(k = e()) && typeof k.catch == "function" && k.catch(function() {})
                        }
                    } catch (z) {
                        if (z && N && typeof z.stack == "string") return [z.stack, N.stack]
                    }
                    return [null, null]
                }
            };
            n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
            var i = Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot, "name");
            i && i.configurable && Object.defineProperty(n.DetermineComponentFrameRoot, "name", {
                value: "DetermineComponentFrameRoot"
            });
            var o = n.DetermineComponentFrameRoot(),
                h = o[0],
                y = o[1];
            if (h && y) {
                var w = h.split(`
`),
                    A = y.split(`
`);
                for (i = n = 0; n < w.length && !w[n].includes("DetermineComponentFrameRoot");) n++;
                for (; i < A.length && !A[i].includes("DetermineComponentFrameRoot");) i++;
                if (n === w.length || i === A.length)
                    for (n = w.length - 1, i = A.length - 1; 1 <= n && 0 <= i && w[n] !== A[i];) i--;
                for (; 1 <= n && 0 <= i; n--, i--)
                    if (w[n] !== A[i]) {
                        if (n !== 1 || i !== 1)
                            do
                                if (n--, i--, 0 > i || w[n] !== A[i]) {
                                    var U = `
` + w[n].replace(" at new ", " at ");
                                    return e.displayName && U.includes("<anonymous>") && (U = U.replace("<anonymous>", e.displayName)), U
                                } while (1 <= n && 0 <= i);
                        break
                    }
            }
        } finally {
            Hr = !1, Error.prepareStackTrace = a
        }
        return (a = e ? e.displayName || e.name : "") ? Wa(a) : ""
    }

    function mg(e) {
        switch (e.tag) {
            case 26:
            case 27:
            case 5:
                return Wa(e.type);
            case 16:
                return Wa("Lazy");
            case 13:
                return Wa("Suspense");
            case 19:
                return Wa("SuspenseList");
            case 0:
            case 15:
                return Gr(e.type, !1);
            case 11:
                return Gr(e.type.render, !1);
            case 1:
                return Gr(e.type, !0);
            case 31:
                return Wa("Activity");
            default:
                return ""
        }
    }

    function Hu(e) {
        try {
            var t = "";
            do t += mg(e), e = e.return; while (e);
            return t
        } catch (a) {
            return `
Error generating stack: ` + a.message + `
` + a.stack
        }
    }

    function yt(e) {
        switch (typeof e) {
            case "bigint":
            case "boolean":
            case "number":
            case "string":
            case "undefined":
                return e;
            case "object":
                return e;
            default:
                return ""
        }
    }

    function Gu(e) {
        var t = e.type;
        return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
    }

    function pg(e) {
        var t = Gu(e) ? "checked" : "value",
            a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
            n = "" + e[t];
        if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
            var i = a.get,
                o = a.set;
            return Object.defineProperty(e, t, {
                configurable: !0,
                get: function() {
                    return i.call(this)
                },
                set: function(h) {
                    n = "" + h, o.call(this, h)
                }
            }), Object.defineProperty(e, t, {
                enumerable: a.enumerable
            }), {
                getValue: function() {
                    return n
                },
                setValue: function(h) {
                    n = "" + h
                },
                stopTracking: function() {
                    e._valueTracker = null, delete e[t]
                }
            }
        }
    }

    function nl(e) {
        e._valueTracker || (e._valueTracker = pg(e))
    }

    function ku(e) {
        if (!e) return !1;
        var t = e._valueTracker;
        if (!t) return !0;
        var a = t.getValue(),
            n = "";
        return e && (n = Gu(e) ? e.checked ? "true" : "false" : e.value), e = n, e !== a ? (t.setValue(e), !0) : !1
    }

    function il(e) {
        if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
        try {
            return e.activeElement || e.body
        } catch {
            return e.body
        }
    }
    var yg = /[\n"\\]/g;

    function vt(e) {
        return e.replace(yg, function(t) {
            return "\\" + t.charCodeAt(0).toString(16) + " "
        })
    }

    function kr(e, t, a, n, i, o, h, y) {
        e.name = "", h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.type = h : e.removeAttribute("type"), t != null ? h === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + yt(t)) : e.value !== "" + yt(t) && (e.value = "" + yt(t)) : h !== "submit" && h !== "reset" || e.removeAttribute("value"), t != null ? Yr(e, h, yt(t)) : a != null ? Yr(e, h, yt(a)) : n != null && e.removeAttribute("value"), i == null && o != null && (e.defaultChecked = !!o), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? e.name = "" + yt(y) : e.removeAttribute("name")
    }

    function Yu(e, t, a, n, i, o, h, y) {
        if (o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.type = o), t != null || a != null) {
            if (!(o !== "submit" && o !== "reset" || t != null)) return;
            a = a != null ? "" + yt(a) : "", t = t != null ? "" + yt(t) : a, y || t === e.value || (e.value = t), e.defaultValue = t
        }
        n = n ?? i, n = typeof n != "function" && typeof n != "symbol" && !!n, e.checked = y ? e.checked : !!n, e.defaultChecked = !!n, h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.name = h)
    }

    function Yr(e, t, a) {
        t === "number" && il(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a)
    }

    function Ia(e, t, a, n) {
        if (e = e.options, t) {
            t = {};
            for (var i = 0; i < a.length; i++) t["$" + a[i]] = !0;
            for (a = 0; a < e.length; a++) i = t.hasOwnProperty("$" + e[a].value), e[a].selected !== i && (e[a].selected = i), i && n && (e[a].defaultSelected = !0)
        } else {
            for (a = "" + yt(a), t = null, i = 0; i < e.length; i++) {
                if (e[i].value === a) {
                    e[i].selected = !0, n && (e[i].defaultSelected = !0);
                    return
                }
                t !== null || e[i].disabled || (t = e[i])
            }
            t !== null && (t.selected = !0)
        }
    }

    function Vu(e, t, a) {
        if (t != null && (t = "" + yt(t), t !== e.value && (e.value = t), a == null)) {
            e.defaultValue !== t && (e.defaultValue = t);
            return
        }
        e.defaultValue = a != null ? "" + yt(a) : ""
    }

    function Qu(e, t, a, n) {
        if (t == null) {
            if (n != null) {
                if (a != null) throw Error(u(92));
                if (pe(n)) {
                    if (1 < n.length) throw Error(u(93));
                    n = n[0]
                }
                a = n
            }
            a == null && (a = ""), t = a
        }
        a = yt(t), e.defaultValue = a, n = e.textContent, n === a && n !== "" && n !== null && (e.value = n)
    }

    function en(e, t) {
        if (t) {
            var a = e.firstChild;
            if (a && a === e.lastChild && a.nodeType === 3) {
                a.nodeValue = t;
                return
            }
        }
        e.textContent = t
    }
    var vg = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));

    function Xu(e, t, a) {
        var n = t.indexOf("--") === 0;
        a == null || typeof a == "boolean" || a === "" ? n ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : n ? e.setProperty(t, a) : typeof a != "number" || a === 0 || vg.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px"
    }

    function Ku(e, t, a) {
        if (t != null && typeof t != "object") throw Error(u(62));
        if (e = e.style, a != null) {
            for (var n in a) !a.hasOwnProperty(n) || t != null && t.hasOwnProperty(n) || (n.indexOf("--") === 0 ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "");
            for (var i in t) n = t[i], t.hasOwnProperty(i) && a[i] !== n && Xu(e, i, n)
        } else
            for (var o in t) t.hasOwnProperty(o) && Xu(e, o, t[o])
    }

    function Vr(e) {
        if (e.indexOf("-") === -1) return !1;
        switch (e) {
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
                return !1;
            default:
                return !0
        }
    }
    var bg = new Map([
            ["acceptCharset", "accept-charset"],
            ["htmlFor", "for"],
            ["httpEquiv", "http-equiv"],
            ["crossOrigin", "crossorigin"],
            ["accentHeight", "accent-height"],
            ["alignmentBaseline", "alignment-baseline"],
            ["arabicForm", "arabic-form"],
            ["baselineShift", "baseline-shift"],
            ["capHeight", "cap-height"],
            ["clipPath", "clip-path"],
            ["clipRule", "clip-rule"],
            ["colorInterpolation", "color-interpolation"],
            ["colorInterpolationFilters", "color-interpolation-filters"],
            ["colorProfile", "color-profile"],
            ["colorRendering", "color-rendering"],
            ["dominantBaseline", "dominant-baseline"],
            ["enableBackground", "enable-background"],
            ["fillOpacity", "fill-opacity"],
            ["fillRule", "fill-rule"],
            ["floodColor", "flood-color"],
            ["floodOpacity", "flood-opacity"],
            ["fontFamily", "font-family"],
            ["fontSize", "font-size"],
            ["fontSizeAdjust", "font-size-adjust"],
            ["fontStretch", "font-stretch"],
            ["fontStyle", "font-style"],
            ["fontVariant", "font-variant"],
            ["fontWeight", "font-weight"],
            ["glyphName", "glyph-name"],
            ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
            ["glyphOrientationVertical", "glyph-orientation-vertical"],
            ["horizAdvX", "horiz-adv-x"],
            ["horizOriginX", "horiz-origin-x"],
            ["imageRendering", "image-rendering"],
            ["letterSpacing", "letter-spacing"],
            ["lightingColor", "lighting-color"],
            ["markerEnd", "marker-end"],
            ["markerMid", "marker-mid"],
            ["markerStart", "marker-start"],
            ["overlinePosition", "overline-position"],
            ["overlineThickness", "overline-thickness"],
            ["paintOrder", "paint-order"],
            ["panose-1", "panose-1"],
            ["pointerEvents", "pointer-events"],
            ["renderingIntent", "rendering-intent"],
            ["shapeRendering", "shape-rendering"],
            ["stopColor", "stop-color"],
            ["stopOpacity", "stop-opacity"],
            ["strikethroughPosition", "strikethrough-position"],
            ["strikethroughThickness", "strikethrough-thickness"],
            ["strokeDasharray", "stroke-dasharray"],
            ["strokeDashoffset", "stroke-dashoffset"],
            ["strokeLinecap", "stroke-linecap"],
            ["strokeLinejoin", "stroke-linejoin"],
            ["strokeMiterlimit", "stroke-miterlimit"],
            ["strokeOpacity", "stroke-opacity"],
            ["strokeWidth", "stroke-width"],
            ["textAnchor", "text-anchor"],
            ["textDecoration", "text-decoration"],
            ["textRendering", "text-rendering"],
            ["transformOrigin", "transform-origin"],
            ["underlinePosition", "underline-position"],
            ["underlineThickness", "underline-thickness"],
            ["unicodeBidi", "unicode-bidi"],
            ["unicodeRange", "unicode-range"],
            ["unitsPerEm", "units-per-em"],
            ["vAlphabetic", "v-alphabetic"],
            ["vHanging", "v-hanging"],
            ["vIdeographic", "v-ideographic"],
            ["vMathematical", "v-mathematical"],
            ["vectorEffect", "vector-effect"],
            ["vertAdvY", "vert-adv-y"],
            ["vertOriginX", "vert-origin-x"],
            ["vertOriginY", "vert-origin-y"],
            ["wordSpacing", "word-spacing"],
            ["writingMode", "writing-mode"],
            ["xmlnsXlink", "xmlns:xlink"],
            ["xHeight", "x-height"]
        ]),
        Sg = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;

    function ll(e) {
        return Sg.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e
    }
    var Qr = null;

    function Xr(e) {
        return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
    }
    var tn = null,
        an = null;

    function Zu(e) {
        var t = Ja(e);
        if (t && (e = t.stateNode)) {
            var a = e[at] || null;
            e: switch (e = t.stateNode, t.type) {
                case "input":
                    if (kr(e, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name), t = a.name, a.type === "radio" && t != null) {
                        for (a = e; a.parentNode;) a = a.parentNode;
                        for (a = a.querySelectorAll('input[name="' + vt("" + t) + '"][type="radio"]'), t = 0; t < a.length; t++) {
                            var n = a[t];
                            if (n !== e && n.form === e.form) {
                                var i = n[at] || null;
                                if (!i) throw Error(u(90));
                                kr(n, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name)
                            }
                        }
                        for (t = 0; t < a.length; t++) n = a[t], n.form === e.form && ku(n)
                    }
                    break e;
                case "textarea":
                    Vu(e, a.value, a.defaultValue);
                    break e;
                case "select":
                    t = a.value, t != null && Ia(e, !!a.multiple, t, !1)
            }
        }
    }
    var Kr = !1;

    function $u(e, t, a) {
        if (Kr) return e(t, a);
        Kr = !0;
        try {
            var n = e(t);
            return n
        } finally {
            if (Kr = !1, (tn !== null || an !== null) && (Ql(), tn && (t = tn, e = an, an = tn = null, Zu(t), e)))
                for (t = 0; t < e.length; t++) Zu(e[t])
        }
    }

    function Vn(e, t) {
        var a = e.stateNode;
        if (a === null) return null;
        var n = a[at] || null;
        if (n === null) return null;
        a = n[t];
        e: switch (t) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
                (n = !n.disabled) || (e = e.type, n = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !n;
                break e;
            default:
                e = !1
        }
        if (e) return null;
        if (a && typeof a != "function") throw Error(u(231, t, typeof a));
        return a
    }
    var kt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
        Zr = !1;
    if (kt) try {
        var Qn = {};
        Object.defineProperty(Qn, "passive", {
            get: function() {
                Zr = !0
            }
        }), window.addEventListener("test", Qn, Qn), window.removeEventListener("test", Qn, Qn)
    } catch {
        Zr = !1
    }
    var ra = null,
        $r = null,
        rl = null;

    function Ju() {
        if (rl) return rl;
        var e, t = $r,
            a = t.length,
            n, i = "value" in ra ? ra.value : ra.textContent,
            o = i.length;
        for (e = 0; e < a && t[e] === i[e]; e++);
        var h = a - e;
        for (n = 1; n <= h && t[a - n] === i[o - n]; n++);
        return rl = i.slice(e, 1 < n ? 1 - n : void 0)
    }

    function sl(e) {
        var t = e.keyCode;
        return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
    }

    function ol() {
        return !0
    }

    function Fu() {
        return !1
    }

    function nt(e) {
        function t(a, n, i, o, h) {
            this._reactName = a, this._targetInst = i, this.type = n, this.nativeEvent = o, this.target = h, this.currentTarget = null;
            for (var y in e) e.hasOwnProperty(y) && (a = e[y], this[y] = a ? a(o) : o[y]);
            return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? ol : Fu, this.isPropagationStopped = Fu, this
        }
        return v(t.prototype, {
            preventDefault: function() {
                this.defaultPrevented = !0;
                var a = this.nativeEvent;
                a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = ol)
            },
            stopPropagation: function() {
                var a = this.nativeEvent;
                a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = ol)
            },
            persist: function() {},
            isPersistent: ol
        }), t
    }
    var Ta = {
            eventPhase: 0,
            bubbles: 0,
            cancelable: 0,
            timeStamp: function(e) {
                return e.timeStamp || Date.now()
            },
            defaultPrevented: 0,
            isTrusted: 0
        },
        ul = nt(Ta),
        Xn = v({}, Ta, {
            view: 0,
            detail: 0
        }),
        xg = nt(Xn),
        Jr, Fr, Kn, cl = v({}, Xn, {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            getModifierState: Wr,
            button: 0,
            buttons: 0,
            relatedTarget: function(e) {
                return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
            },
            movementX: function(e) {
                return "movementX" in e ? e.movementX : (e !== Kn && (Kn && e.type === "mousemove" ? (Jr = e.screenX - Kn.screenX, Fr = e.screenY - Kn.screenY) : Fr = Jr = 0, Kn = e), Jr)
            },
            movementY: function(e) {
                return "movementY" in e ? e.movementY : Fr
            }
        }),
        Pu = nt(cl),
        wg = v({}, cl, {
            dataTransfer: 0
        }),
        Cg = nt(wg),
        Eg = v({}, Xn, {
            relatedTarget: 0
        }),
        Pr = nt(Eg),
        _g = v({}, Ta, {
            animationName: 0,
            elapsedTime: 0,
            pseudoElement: 0
        }),
        Mg = nt(_g),
        Og = v({}, Ta, {
            clipboardData: function(e) {
                return "clipboardData" in e ? e.clipboardData : window.clipboardData
            }
        }),
        Rg = nt(Og),
        qg = v({}, Ta, {
            data: 0
        }),
        Wu = nt(qg),
        Ag = {
            Esc: "Escape",
            Spacebar: " ",
            Left: "ArrowLeft",
            Up: "ArrowUp",
            Right: "ArrowRight",
            Down: "ArrowDown",
            Del: "Delete",
            Win: "OS",
            Menu: "ContextMenu",
            Apps: "ContextMenu",
            Scroll: "ScrollLock",
            MozPrintableKey: "Unidentified"
        },
        Tg = {
            8: "Backspace",
            9: "Tab",
            12: "Clear",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Escape",
            32: " ",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            45: "Insert",
            46: "Delete",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "NumLock",
            145: "ScrollLock",
            224: "Meta"
        },
        Ng = {
            Alt: "altKey",
            Control: "ctrlKey",
            Meta: "metaKey",
            Shift: "shiftKey"
        };

    function zg(e) {
        var t = this.nativeEvent;
        return t.getModifierState ? t.getModifierState(e) : (e = Ng[e]) ? !!t[e] : !1
    }

    function Wr() {
        return zg
    }
    var Lg = v({}, Xn, {
            key: function(e) {
                if (e.key) {
                    var t = Ag[e.key] || e.key;
                    if (t !== "Unidentified") return t
                }
                return e.type === "keypress" ? (e = sl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Tg[e.keyCode] || "Unidentified" : ""
            },
            code: 0,
            location: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            repeat: 0,
            locale: 0,
            getModifierState: Wr,
            charCode: function(e) {
                return e.type === "keypress" ? sl(e) : 0
            },
            keyCode: function(e) {
                return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
            },
            which: function(e) {
                return e.type === "keypress" ? sl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
            }
        }),
        Dg = nt(Lg),
        jg = v({}, cl, {
            pointerId: 0,
            width: 0,
            height: 0,
            pressure: 0,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            twist: 0,
            pointerType: 0,
            isPrimary: 0
        }),
        Iu = nt(jg),
        Ug = v({}, Xn, {
            touches: 0,
            targetTouches: 0,
            changedTouches: 0,
            altKey: 0,
            metaKey: 0,
            ctrlKey: 0,
            shiftKey: 0,
            getModifierState: Wr
        }),
        Bg = nt(Ug),
        Hg = v({}, Ta, {
            propertyName: 0,
            elapsedTime: 0,
            pseudoElement: 0
        }),
        Gg = nt(Hg),
        kg = v({}, cl, {
            deltaX: function(e) {
                return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
            },
            deltaY: function(e) {
                return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
            },
            deltaZ: 0,
            deltaMode: 0
        }),
        Yg = nt(kg),
        Vg = v({}, Ta, {
            newState: 0,
            oldState: 0
        }),
        Qg = nt(Vg),
        Xg = [9, 13, 27, 32],
        Ir = kt && "CompositionEvent" in window,
        Zn = null;
    kt && "documentMode" in document && (Zn = document.documentMode);
    var Kg = kt && "TextEvent" in window && !Zn,
        ec = kt && (!Ir || Zn && 8 < Zn && 11 >= Zn),
        tc = " ",
        ac = !1;

    function nc(e, t) {
        switch (e) {
            case "keyup":
                return Xg.indexOf(t.keyCode) !== -1;
            case "keydown":
                return t.keyCode !== 229;
            case "keypress":
            case "mousedown":
            case "focusout":
                return !0;
            default:
                return !1
        }
    }

    function ic(e) {
        return e = e.detail, typeof e == "object" && "data" in e ? e.data : null
    }
    var nn = !1;

    function Zg(e, t) {
        switch (e) {
            case "compositionend":
                return ic(t);
            case "keypress":
                return t.which !== 32 ? null : (ac = !0, tc);
            case "textInput":
                return e = t.data, e === tc && ac ? null : e;
            default:
                return null
        }
    }

    function $g(e, t) {
        if (nn) return e === "compositionend" || !Ir && nc(e, t) ? (e = Ju(), rl = $r = ra = null, nn = !1, e) : null;
        switch (e) {
            case "paste":
                return null;
            case "keypress":
                if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                    if (t.char && 1 < t.char.length) return t.char;
                    if (t.which) return String.fromCharCode(t.which)
                }
                return null;
            case "compositionend":
                return ec && t.locale !== "ko" ? null : t.data;
            default:
                return null
        }
    }
    var Jg = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0
    };

    function lc(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t === "input" ? !!Jg[e.type] : t === "textarea"
    }

    function rc(e, t, a, n) {
        tn ? an ? an.push(n) : an = [n] : tn = n, t = Fl(t, "onChange"), 0 < t.length && (a = new ul("onChange", "change", null, a, n), e.push({
            event: a,
            listeners: t
        }))
    }
    var $n = null,
        Jn = null;

    function Fg(e) {
        k0(e, 0)
    }

    function fl(e) {
        var t = Yn(e);
        if (ku(t)) return e
    }

    function sc(e, t) {
        if (e === "change") return t
    }
    var oc = !1;
    if (kt) {
        var es;
        if (kt) {
            var ts = "oninput" in document;
            if (!ts) {
                var uc = document.createElement("div");
                uc.setAttribute("oninput", "return;"), ts = typeof uc.oninput == "function"
            }
            es = ts
        } else es = !1;
        oc = es && (!document.documentMode || 9 < document.documentMode)
    }

    function cc() {
        $n && ($n.detachEvent("onpropertychange", fc), Jn = $n = null)
    }

    function fc(e) {
        if (e.propertyName === "value" && fl(Jn)) {
            var t = [];
            rc(t, Jn, e, Xr(e)), $u(Fg, t)
        }
    }

    function Pg(e, t, a) {
        e === "focusin" ? (cc(), $n = t, Jn = a, $n.attachEvent("onpropertychange", fc)) : e === "focusout" && cc()
    }

    function Wg(e) {
        if (e === "selectionchange" || e === "keyup" || e === "keydown") return fl(Jn)
    }

    function Ig(e, t) {
        if (e === "click") return fl(t)
    }

    function em(e, t) {
        if (e === "input" || e === "change") return fl(t)
    }

    function tm(e, t) {
        return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
    }
    var ct = typeof Object.is == "function" ? Object.is : tm;

    function Fn(e, t) {
        if (ct(e, t)) return !0;
        if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
        var a = Object.keys(e),
            n = Object.keys(t);
        if (a.length !== n.length) return !1;
        for (n = 0; n < a.length; n++) {
            var i = a[n];
            if (!Ar.call(t, i) || !ct(e[i], t[i])) return !1
        }
        return !0
    }

    function dc(e) {
        for (; e && e.firstChild;) e = e.firstChild;
        return e
    }

    function hc(e, t) {
        var a = dc(e);
        e = 0;
        for (var n; a;) {
            if (a.nodeType === 3) {
                if (n = e + a.textContent.length, e <= t && n >= t) return {
                    node: a,
                    offset: t - e
                };
                e = n
            }
            e: {
                for (; a;) {
                    if (a.nextSibling) {
                        a = a.nextSibling;
                        break e
                    }
                    a = a.parentNode
                }
                a = void 0
            }
            a = dc(a)
        }
    }

    function gc(e, t) {
        return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? gc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
    }

    function mc(e) {
        e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
        for (var t = il(e.document); t instanceof e.HTMLIFrameElement;) {
            try {
                var a = typeof t.contentWindow.location.href == "string"
            } catch {
                a = !1
            }
            if (a) e = t.contentWindow;
            else break;
            t = il(e.document)
        }
        return t
    }

    function as(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
    }
    var am = kt && "documentMode" in document && 11 >= document.documentMode,
        ln = null,
        ns = null,
        Pn = null,
        is = !1;

    function pc(e, t, a) {
        var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
        is || ln == null || ln !== il(n) || (n = ln, "selectionStart" in n && as(n) ? n = {
            start: n.selectionStart,
            end: n.selectionEnd
        } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset
        }), Pn && Fn(Pn, n) || (Pn = n, n = Fl(ns, "onSelect"), 0 < n.length && (t = new ul("onSelect", "select", null, t, a), e.push({
            event: t,
            listeners: n
        }), t.target = ln)))
    }

    function Na(e, t) {
        var a = {};
        return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a
    }
    var rn = {
            animationend: Na("Animation", "AnimationEnd"),
            animationiteration: Na("Animation", "AnimationIteration"),
            animationstart: Na("Animation", "AnimationStart"),
            transitionrun: Na("Transition", "TransitionRun"),
            transitionstart: Na("Transition", "TransitionStart"),
            transitioncancel: Na("Transition", "TransitionCancel"),
            transitionend: Na("Transition", "TransitionEnd")
        },
        ls = {},
        yc = {};
    kt && (yc = document.createElement("div").style, "AnimationEvent" in window || (delete rn.animationend.animation, delete rn.animationiteration.animation, delete rn.animationstart.animation), "TransitionEvent" in window || delete rn.transitionend.transition);

    function za(e) {
        if (ls[e]) return ls[e];
        if (!rn[e]) return e;
        var t = rn[e],
            a;
        for (a in t)
            if (t.hasOwnProperty(a) && a in yc) return ls[e] = t[a];
        return e
    }
    var vc = za("animationend"),
        bc = za("animationiteration"),
        Sc = za("animationstart"),
        nm = za("transitionrun"),
        im = za("transitionstart"),
        lm = za("transitioncancel"),
        xc = za("transitionend"),
        wc = new Map,
        rs = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    rs.push("scrollEnd");

    function Mt(e, t) {
        wc.set(e, t), Aa(t, [e])
    }
    var Cc = new WeakMap;

    function bt(e, t) {
        if (typeof e == "object" && e !== null) {
            var a = Cc.get(e);
            return a !== void 0 ? a : (t = {
                value: e,
                source: t,
                stack: Hu(t)
            }, Cc.set(e, t), t)
        }
        return {
            value: e,
            source: t,
            stack: Hu(t)
        }
    }
    var St = [],
        sn = 0,
        ss = 0;

    function dl() {
        for (var e = sn, t = ss = sn = 0; t < e;) {
            var a = St[t];
            St[t++] = null;
            var n = St[t];
            St[t++] = null;
            var i = St[t];
            St[t++] = null;
            var o = St[t];
            if (St[t++] = null, n !== null && i !== null) {
                var h = n.pending;
                h === null ? i.next = i : (i.next = h.next, h.next = i), n.pending = i
            }
            o !== 0 && Ec(a, i, o)
        }
    }

    function hl(e, t, a, n) {
        St[sn++] = e, St[sn++] = t, St[sn++] = a, St[sn++] = n, ss |= n, e.lanes |= n, e = e.alternate, e !== null && (e.lanes |= n)
    }

    function os(e, t, a, n) {
        return hl(e, t, a, n), gl(e)
    }

    function on(e, t) {
        return hl(e, null, null, t), gl(e)
    }

    function Ec(e, t, a) {
        e.lanes |= a;
        var n = e.alternate;
        n !== null && (n.lanes |= a);
        for (var i = !1, o = e.return; o !== null;) o.childLanes |= a, n = o.alternate, n !== null && (n.childLanes |= a), o.tag === 22 && (e = o.stateNode, e === null || e._visibility & 1 || (i = !0)), e = o, o = o.return;
        return e.tag === 3 ? (o = e.stateNode, i && t !== null && (i = 31 - ut(a), e = o.hiddenUpdates, n = e[i], n === null ? e[i] = [t] : n.push(t), t.lane = a | 536870912), o) : null
    }

    function gl(e) {
        if (50 < wi) throw wi = 0, mo = null, Error(u(185));
        for (var t = e.return; t !== null;) e = t, t = e.return;
        return e.tag === 3 ? e.stateNode : null
    }
    var un = {};

    function rm(e, t, a, n) {
        this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
    }

    function ft(e, t, a, n) {
        return new rm(e, t, a, n)
    }

    function us(e) {
        return e = e.prototype, !(!e || !e.isReactComponent)
    }

    function Yt(e, t) {
        var a = e.alternate;
        return a === null ? (a = ft(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a
    }

    function _c(e, t) {
        e.flags &= 65011714;
        var a = e.alternate;
        return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        }), e
    }

    function ml(e, t, a, n, i, o) {
        var h = 0;
        if (n = e, typeof e == "function") us(e) && (h = 1);
        else if (typeof e == "string") h = o2(e, a, te.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
        else e: switch (e) {
            case ve:
                return e = ft(31, a, t, i), e.elementType = ve, e.lanes = o, e;
            case C:
                return La(a.children, i, o, t);
            case T:
                h = 8, i |= 24;
                break;
            case M:
                return e = ft(12, a, t, i | 2), e.elementType = M, e.lanes = o, e;
            case Q:
                return e = ft(13, a, t, i), e.elementType = Q, e.lanes = o, e;
            case oe:
                return e = ft(19, a, t, i), e.elementType = oe, e.lanes = o, e;
            default:
                if (typeof e == "object" && e !== null) switch (e.$$typeof) {
                    case L:
                    case V:
                        h = 10;
                        break e;
                    case D:
                        h = 9;
                        break e;
                    case W:
                        h = 11;
                        break e;
                    case me:
                        h = 14;
                        break e;
                    case $:
                        h = 16, n = null;
                        break e
                }
                h = 29, a = Error(u(130, e === null ? "null" : typeof e, "")), n = null
        }
        return t = ft(h, a, t, i), t.elementType = e, t.type = n, t.lanes = o, t
    }

    function La(e, t, a, n) {
        return e = ft(7, e, n, t), e.lanes = a, e
    }

    function cs(e, t, a) {
        return e = ft(6, e, null, t), e.lanes = a, e
    }

    function fs(e, t, a) {
        return t = ft(4, e.children !== null ? e.children : [], e.key, t), t.lanes = a, t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        }, t
    }
    var cn = [],
        fn = 0,
        pl = null,
        yl = 0,
        xt = [],
        wt = 0,
        Da = null,
        Vt = 1,
        Qt = "";

    function ja(e, t) {
        cn[fn++] = yl, cn[fn++] = pl, pl = e, yl = t
    }

    function Mc(e, t, a) {
        xt[wt++] = Vt, xt[wt++] = Qt, xt[wt++] = Da, Da = e;
        var n = Vt;
        e = Qt;
        var i = 32 - ut(n) - 1;
        n &= ~(1 << i), a += 1;
        var o = 32 - ut(t) + i;
        if (30 < o) {
            var h = i - i % 5;
            o = (n & (1 << h) - 1).toString(32), n >>= h, i -= h, Vt = 1 << 32 - ut(t) + i | a << i | n, Qt = o + e
        } else Vt = 1 << o | a << i | n, Qt = e
    }

    function ds(e) {
        e.return !== null && (ja(e, 1), Mc(e, 1, 0))
    }

    function hs(e) {
        for (; e === pl;) pl = cn[--fn], cn[fn] = null, yl = cn[--fn], cn[fn] = null;
        for (; e === Da;) Da = xt[--wt], xt[wt] = null, Qt = xt[--wt], xt[wt] = null, Vt = xt[--wt], xt[wt] = null
    }
    var tt = null,
        Le = null,
        we = !1,
        Ua = null,
        Tt = !1,
        gs = Error(u(519));

    function Ba(e) {
        var t = Error(u(418, ""));
        throw ei(bt(t, e)), gs
    }

    function Oc(e) {
        var t = e.stateNode,
            a = e.type,
            n = e.memoizedProps;
        switch (t[Pe] = e, t[at] = n, a) {
            case "dialog":
                he("cancel", t), he("close", t);
                break;
            case "iframe":
            case "object":
            case "embed":
                he("load", t);
                break;
            case "video":
            case "audio":
                for (a = 0; a < Ei.length; a++) he(Ei[a], t);
                break;
            case "source":
                he("error", t);
                break;
            case "img":
            case "image":
            case "link":
                he("error", t), he("load", t);
                break;
            case "details":
                he("toggle", t);
                break;
            case "input":
                he("invalid", t), Yu(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0), nl(t);
                break;
            case "select":
                he("invalid", t);
                break;
            case "textarea":
                he("invalid", t), Qu(t, n.value, n.defaultValue, n.children), nl(t)
        }
        a = n.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || n.suppressHydrationWarning === !0 || X0(t.textContent, a) ? (n.popover != null && (he("beforetoggle", t), he("toggle", t)), n.onScroll != null && he("scroll", t), n.onScrollEnd != null && he("scrollend", t), n.onClick != null && (t.onclick = Pl), t = !0) : t = !1, t || Ba(e)
    }

    function Rc(e) {
        for (tt = e.return; tt;) switch (tt.tag) {
            case 5:
            case 13:
                Tt = !1;
                return;
            case 27:
            case 3:
                Tt = !0;
                return;
            default:
                tt = tt.return
        }
    }

    function Wn(e) {
        if (e !== tt) return !1;
        if (!we) return Rc(e), we = !0, !1;
        var t = e.tag,
            a;
        if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || To(e.type, e.memoizedProps)), a = !a), a && Le && Ba(e), Rc(e), t === 13) {
            if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
            e: {
                for (e = e.nextSibling, t = 0; e;) {
                    if (e.nodeType === 8)
                        if (a = e.data, a === "/$") {
                            if (t === 0) {
                                Le = Rt(e.nextSibling);
                                break e
                            }
                            t--
                        } else a !== "$" && a !== "$!" && a !== "$?" || t++;
                    e = e.nextSibling
                }
                Le = null
            }
        } else t === 27 ? (t = Le, wa(e.type) ? (e = Do, Do = null, Le = e) : Le = t) : Le = tt ? Rt(e.stateNode.nextSibling) : null;
        return !0
    }

    function In() {
        Le = tt = null, we = !1
    }

    function qc() {
        var e = Ua;
        return e !== null && (rt === null ? rt = e : rt.push.apply(rt, e), Ua = null), e
    }

    function ei(e) {
        Ua === null ? Ua = [e] : Ua.push(e)
    }
    var ms = H(null),
        Ha = null,
        Xt = null;

    function sa(e, t, a) {
        Z(ms, t._currentValue), t._currentValue = a
    }

    function Kt(e) {
        e._currentValue = ms.current, J(ms)
    }

    function ps(e, t, a) {
        for (; e !== null;) {
            var n = e.alternate;
            if ((e.childLanes & t) !== t ? (e.childLanes |= t, n !== null && (n.childLanes |= t)) : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t), e === a) break;
            e = e.return
        }
    }

    function ys(e, t, a, n) {
        var i = e.child;
        for (i !== null && (i.return = e); i !== null;) {
            var o = i.dependencies;
            if (o !== null) {
                var h = i.child;
                o = o.firstContext;
                e: for (; o !== null;) {
                    var y = o;
                    o = i;
                    for (var w = 0; w < t.length; w++)
                        if (y.context === t[w]) {
                            o.lanes |= a, y = o.alternate, y !== null && (y.lanes |= a), ps(o.return, a, e), n || (h = null);
                            break e
                        } o = y.next
                }
            } else if (i.tag === 18) {
                if (h = i.return, h === null) throw Error(u(341));
                h.lanes |= a, o = h.alternate, o !== null && (o.lanes |= a), ps(h, a, e), h = null
            } else h = i.child;
            if (h !== null) h.return = i;
            else
                for (h = i; h !== null;) {
                    if (h === e) {
                        h = null;
                        break
                    }
                    if (i = h.sibling, i !== null) {
                        i.return = h.return, h = i;
                        break
                    }
                    h = h.return
                }
            i = h
        }
    }

    function ti(e, t, a, n) {
        e = null;
        for (var i = t, o = !1; i !== null;) {
            if (!o) {
                if ((i.flags & 524288) !== 0) o = !0;
                else if ((i.flags & 262144) !== 0) break
            }
            if (i.tag === 10) {
                var h = i.alternate;
                if (h === null) throw Error(u(387));
                if (h = h.memoizedProps, h !== null) {
                    var y = i.type;
                    ct(i.pendingProps.value, h.value) || (e !== null ? e.push(y) : e = [y])
                }
            } else if (i === st.current) {
                if (h = i.alternate, h === null) throw Error(u(387));
                h.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e !== null ? e.push(Ai) : e = [Ai])
            }
            i = i.return
        }
        e !== null && ys(t, e, a, n), t.flags |= 262144
    }

    function vl(e) {
        for (e = e.firstContext; e !== null;) {
            if (!ct(e.context._currentValue, e.memoizedValue)) return !0;
            e = e.next
        }
        return !1
    }

    function Ga(e) {
        Ha = e, Xt = null, e = e.dependencies, e !== null && (e.firstContext = null)
    }

    function We(e) {
        return Ac(Ha, e)
    }

    function bl(e, t) {
        return Ha === null && Ga(e), Ac(e, t)
    }

    function Ac(e, t) {
        var a = t._currentValue;
        if (t = {
                context: t,
                memoizedValue: a,
                next: null
            }, Xt === null) {
            if (e === null) throw Error(u(308));
            Xt = t, e.dependencies = {
                lanes: 0,
                firstContext: t
            }, e.flags |= 524288
        } else Xt = Xt.next = t;
        return a
    }
    var sm = typeof AbortController < "u" ? AbortController : function() {
            var e = [],
                t = this.signal = {
                    aborted: !1,
                    addEventListener: function(a, n) {
                        e.push(n)
                    }
                };
            this.abort = function() {
                t.aborted = !0, e.forEach(function(a) {
                    return a()
                })
            }
        },
        om = r.unstable_scheduleCallback,
        um = r.unstable_NormalPriority,
        ke = {
            $$typeof: V,
            Consumer: null,
            Provider: null,
            _currentValue: null,
            _currentValue2: null,
            _threadCount: 0
        };

    function vs() {
        return {
            controller: new sm,
            data: new Map,
            refCount: 0
        }
    }

    function ai(e) {
        e.refCount--, e.refCount === 0 && om(um, function() {
            e.controller.abort()
        })
    }
    var ni = null,
        bs = 0,
        dn = 0,
        hn = null;

    function cm(e, t) {
        if (ni === null) {
            var a = ni = [];
            bs = 0, dn = wo(), hn = {
                status: "pending",
                value: void 0,
                then: function(n) {
                    a.push(n)
                }
            }
        }
        return bs++, t.then(Tc, Tc), t
    }

    function Tc() {
        if (--bs === 0 && ni !== null) {
            hn !== null && (hn.status = "fulfilled");
            var e = ni;
            ni = null, dn = 0, hn = null;
            for (var t = 0; t < e.length; t++)(0, e[t])()
        }
    }

    function fm(e, t) {
        var a = [],
            n = {
                status: "pending",
                value: null,
                reason: null,
                then: function(i) {
                    a.push(i)
                }
            };
        return e.then(function() {
            n.status = "fulfilled", n.value = t;
            for (var i = 0; i < a.length; i++)(0, a[i])(t)
        }, function(i) {
            for (n.status = "rejected", n.reason = i, i = 0; i < a.length; i++)(0, a[i])(void 0)
        }), n
    }
    var Nc = j.S;
    j.S = function(e, t) {
        typeof t == "object" && t !== null && typeof t.then == "function" && cm(e, t), Nc !== null && Nc(e, t)
    };
    var ka = H(null);

    function Ss() {
        var e = ka.current;
        return e !== null ? e : qe.pooledCache
    }

    function Sl(e, t) {
        t === null ? Z(ka, ka.current) : Z(ka, t.pool)
    }

    function zc() {
        var e = Ss();
        return e === null ? null : {
            parent: ke._currentValue,
            pool: e
        }
    }
    var ii = Error(u(460)),
        Lc = Error(u(474)),
        xl = Error(u(542)),
        xs = {
            then: function() {}
        };

    function Dc(e) {
        return e = e.status, e === "fulfilled" || e === "rejected"
    }

    function wl() {}

    function jc(e, t, a) {
        switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(wl, wl), t = a), t.status) {
            case "fulfilled":
                return t.value;
            case "rejected":
                throw e = t.reason, Bc(e), e;
            default:
                if (typeof t.status == "string") t.then(wl, wl);
                else {
                    if (e = qe, e !== null && 100 < e.shellSuspendCounter) throw Error(u(482));
                    e = t, e.status = "pending", e.then(function(n) {
                        if (t.status === "pending") {
                            var i = t;
                            i.status = "fulfilled", i.value = n
                        }
                    }, function(n) {
                        if (t.status === "pending") {
                            var i = t;
                            i.status = "rejected", i.reason = n
                        }
                    })
                }
                switch (t.status) {
                    case "fulfilled":
                        return t.value;
                    case "rejected":
                        throw e = t.reason, Bc(e), e
                }
                throw li = t, ii
        }
    }
    var li = null;

    function Uc() {
        if (li === null) throw Error(u(459));
        var e = li;
        return li = null, e
    }

    function Bc(e) {
        if (e === ii || e === xl) throw Error(u(483))
    }
    var oa = !1;

    function ws(e) {
        e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: {
                pending: null,
                lanes: 0,
                hiddenCallbacks: null
            },
            callbacks: null
        }
    }

    function Cs(e, t) {
        e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            callbacks: null
        })
    }

    function ua(e) {
        return {
            lane: e,
            tag: 0,
            payload: null,
            callback: null,
            next: null
        }
    }

    function ca(e, t, a) {
        var n = e.updateQueue;
        if (n === null) return null;
        if (n = n.shared, (Ce & 2) !== 0) {
            var i = n.pending;
            return i === null ? t.next = t : (t.next = i.next, i.next = t), n.pending = t, t = gl(e), Ec(e, null, a), t
        }
        return hl(e, n, t, a), gl(e)
    }

    function ri(e, t, a) {
        if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
            var n = t.lanes;
            n &= e.pendingLanes, a |= n, t.lanes = a, Tu(e, a)
        }
    }

    function Es(e, t) {
        var a = e.updateQueue,
            n = e.alternate;
        if (n !== null && (n = n.updateQueue, a === n)) {
            var i = null,
                o = null;
            if (a = a.firstBaseUpdate, a !== null) {
                do {
                    var h = {
                        lane: a.lane,
                        tag: a.tag,
                        payload: a.payload,
                        callback: null,
                        next: null
                    };
                    o === null ? i = o = h : o = o.next = h, a = a.next
                } while (a !== null);
                o === null ? i = o = t : o = o.next = t
            } else i = o = t;
            a = {
                baseState: n.baseState,
                firstBaseUpdate: i,
                lastBaseUpdate: o,
                shared: n.shared,
                callbacks: n.callbacks
            }, e.updateQueue = a;
            return
        }
        e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t
    }
    var _s = !1;

    function si() {
        if (_s) {
            var e = hn;
            if (e !== null) throw e
        }
    }

    function oi(e, t, a, n) {
        _s = !1;
        var i = e.updateQueue;
        oa = !1;
        var o = i.firstBaseUpdate,
            h = i.lastBaseUpdate,
            y = i.shared.pending;
        if (y !== null) {
            i.shared.pending = null;
            var w = y,
                A = w.next;
            w.next = null, h === null ? o = A : h.next = A, h = w;
            var U = e.alternate;
            U !== null && (U = U.updateQueue, y = U.lastBaseUpdate, y !== h && (y === null ? U.firstBaseUpdate = A : y.next = A, U.lastBaseUpdate = w))
        }
        if (o !== null) {
            var k = i.baseState;
            h = 0, U = A = w = null, y = o;
            do {
                var N = y.lane & -536870913,
                    z = N !== y.lane;
                if (z ? (ye & N) === N : (n & N) === N) {
                    N !== 0 && N === dn && (_s = !0), U !== null && (U = U.next = {
                        lane: 0,
                        tag: y.tag,
                        payload: y.payload,
                        callback: null,
                        next: null
                    });
                    e: {
                        var le = e,
                            ae = y;N = t;
                        var Oe = a;
                        switch (ae.tag) {
                            case 1:
                                if (le = ae.payload, typeof le == "function") {
                                    k = le.call(Oe, k, N);
                                    break e
                                }
                                k = le;
                                break e;
                            case 3:
                                le.flags = le.flags & -65537 | 128;
                            case 0:
                                if (le = ae.payload, N = typeof le == "function" ? le.call(Oe, k, N) : le, N == null) break e;
                                k = v({}, k, N);
                                break e;
                            case 2:
                                oa = !0
                        }
                    }
                    N = y.callback, N !== null && (e.flags |= 64, z && (e.flags |= 8192), z = i.callbacks, z === null ? i.callbacks = [N] : z.push(N))
                } else z = {
                    lane: N,
                    tag: y.tag,
                    payload: y.payload,
                    callback: y.callback,
                    next: null
                }, U === null ? (A = U = z, w = k) : U = U.next = z, h |= N;
                if (y = y.next, y === null) {
                    if (y = i.shared.pending, y === null) break;
                    z = y, y = z.next, z.next = null, i.lastBaseUpdate = z, i.shared.pending = null
                }
            } while (!0);
            U === null && (w = k), i.baseState = w, i.firstBaseUpdate = A, i.lastBaseUpdate = U, o === null && (i.shared.lanes = 0), va |= h, e.lanes = h, e.memoizedState = k
        }
    }

    function Hc(e, t) {
        if (typeof e != "function") throw Error(u(191, e));
        e.call(t)
    }

    function Gc(e, t) {
        var a = e.callbacks;
        if (a !== null)
            for (e.callbacks = null, e = 0; e < a.length; e++) Hc(a[e], t)
    }
    var gn = H(null),
        Cl = H(0);

    function kc(e, t) {
        e = It, Z(Cl, e), Z(gn, t), It = e | t.baseLanes
    }

    function Ms() {
        Z(Cl, It), Z(gn, gn.current)
    }

    function Os() {
        It = Cl.current, J(gn), J(Cl)
    }
    var fa = 0,
        ce = null,
        _e = null,
        He = null,
        El = !1,
        mn = !1,
        Ya = !1,
        _l = 0,
        ui = 0,
        pn = null,
        dm = 0;

    function Ue() {
        throw Error(u(321))
    }

    function Rs(e, t) {
        if (t === null) return !1;
        for (var a = 0; a < t.length && a < e.length; a++)
            if (!ct(e[a], t[a])) return !1;
        return !0
    }

    function qs(e, t, a, n, i, o) {
        return fa = o, ce = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, j.H = e === null || e.memoizedState === null ? _f : Mf, Ya = !1, o = a(n, i), Ya = !1, mn && (o = Vc(t, a, n, i)), Yc(e), o
    }

    function Yc(e) {
        j.H = Tl;
        var t = _e !== null && _e.next !== null;
        if (fa = 0, He = _e = ce = null, El = !1, ui = 0, pn = null, t) throw Error(u(300));
        e === null || Xe || (e = e.dependencies, e !== null && vl(e) && (Xe = !0))
    }

    function Vc(e, t, a, n) {
        ce = e;
        var i = 0;
        do {
            if (mn && (pn = null), ui = 0, mn = !1, 25 <= i) throw Error(u(301));
            if (i += 1, He = _e = null, e.updateQueue != null) {
                var o = e.updateQueue;
                o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0)
            }
            j.H = bm, o = t(a, n)
        } while (mn);
        return o
    }

    function hm() {
        var e = j.H,
            t = e.useState()[0];
        return t = typeof t.then == "function" ? ci(t) : t, e = e.useState()[0], (_e !== null ? _e.memoizedState : null) !== e && (ce.flags |= 1024), t
    }

    function As() {
        var e = _l !== 0;
        return _l = 0, e
    }

    function Ts(e, t, a) {
        t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a
    }

    function Ns(e) {
        if (El) {
            for (e = e.memoizedState; e !== null;) {
                var t = e.queue;
                t !== null && (t.pending = null), e = e.next
            }
            El = !1
        }
        fa = 0, He = _e = ce = null, mn = !1, ui = _l = 0, pn = null
    }

    function it() {
        var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null
        };
        return He === null ? ce.memoizedState = He = e : He = He.next = e, He
    }

    function Ge() {
        if (_e === null) {
            var e = ce.alternate;
            e = e !== null ? e.memoizedState : null
        } else e = _e.next;
        var t = He === null ? ce.memoizedState : He.next;
        if (t !== null) He = t, _e = e;
        else {
            if (e === null) throw ce.alternate === null ? Error(u(467)) : Error(u(310));
            _e = e, e = {
                memoizedState: _e.memoizedState,
                baseState: _e.baseState,
                baseQueue: _e.baseQueue,
                queue: _e.queue,
                next: null
            }, He === null ? ce.memoizedState = He = e : He = He.next = e
        }
        return He
    }

    function zs() {
        return {
            lastEffect: null,
            events: null,
            stores: null,
            memoCache: null
        }
    }

    function ci(e) {
        var t = ui;
        return ui += 1, pn === null && (pn = []), e = jc(pn, e, t), t = ce, (He === null ? t.memoizedState : He.next) === null && (t = t.alternate, j.H = t === null || t.memoizedState === null ? _f : Mf), e
    }

    function Ml(e) {
        if (e !== null && typeof e == "object") {
            if (typeof e.then == "function") return ci(e);
            if (e.$$typeof === V) return We(e)
        }
        throw Error(u(438, String(e)))
    }

    function Ls(e) {
        var t = null,
            a = ce.updateQueue;
        if (a !== null && (t = a.memoCache), t == null) {
            var n = ce.alternate;
            n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (t = {
                data: n.data.map(function(i) {
                    return i.slice()
                }),
                index: 0
            })))
        }
        if (t == null && (t = {
                data: [],
                index: 0
            }), a === null && (a = zs(), ce.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
            for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = Y;
        return t.index++, a
    }

    function Zt(e, t) {
        return typeof t == "function" ? t(e) : t
    }

    function Ol(e) {
        var t = Ge();
        return Ds(t, _e, e)
    }

    function Ds(e, t, a) {
        var n = e.queue;
        if (n === null) throw Error(u(311));
        n.lastRenderedReducer = a;
        var i = e.baseQueue,
            o = n.pending;
        if (o !== null) {
            if (i !== null) {
                var h = i.next;
                i.next = o.next, o.next = h
            }
            t.baseQueue = i = o, n.pending = null
        }
        if (o = e.baseState, i === null) e.memoizedState = o;
        else {
            t = i.next;
            var y = h = null,
                w = null,
                A = t,
                U = !1;
            do {
                var k = A.lane & -536870913;
                if (k !== A.lane ? (ye & k) === k : (fa & k) === k) {
                    var N = A.revertLane;
                    if (N === 0) w !== null && (w = w.next = {
                        lane: 0,
                        revertLane: 0,
                        action: A.action,
                        hasEagerState: A.hasEagerState,
                        eagerState: A.eagerState,
                        next: null
                    }), k === dn && (U = !0);
                    else if ((fa & N) === N) {
                        A = A.next, N === dn && (U = !0);
                        continue
                    } else k = {
                        lane: 0,
                        revertLane: A.revertLane,
                        action: A.action,
                        hasEagerState: A.hasEagerState,
                        eagerState: A.eagerState,
                        next: null
                    }, w === null ? (y = w = k, h = o) : w = w.next = k, ce.lanes |= N, va |= N;
                    k = A.action, Ya && a(o, k), o = A.hasEagerState ? A.eagerState : a(o, k)
                } else N = {
                    lane: k,
                    revertLane: A.revertLane,
                    action: A.action,
                    hasEagerState: A.hasEagerState,
                    eagerState: A.eagerState,
                    next: null
                }, w === null ? (y = w = N, h = o) : w = w.next = N, ce.lanes |= k, va |= k;
                A = A.next
            } while (A !== null && A !== t);
            if (w === null ? h = o : w.next = y, !ct(o, e.memoizedState) && (Xe = !0, U && (a = hn, a !== null))) throw a;
            e.memoizedState = o, e.baseState = h, e.baseQueue = w, n.lastRenderedState = o
        }
        return i === null && (n.lanes = 0), [e.memoizedState, n.dispatch]
    }

    function js(e) {
        var t = Ge(),
            a = t.queue;
        if (a === null) throw Error(u(311));
        a.lastRenderedReducer = e;
        var n = a.dispatch,
            i = a.pending,
            o = t.memoizedState;
        if (i !== null) {
            a.pending = null;
            var h = i = i.next;
            do o = e(o, h.action), h = h.next; while (h !== i);
            ct(o, t.memoizedState) || (Xe = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), a.lastRenderedState = o
        }
        return [o, n]
    }

    function Qc(e, t, a) {
        var n = ce,
            i = Ge(),
            o = we;
        if (o) {
            if (a === void 0) throw Error(u(407));
            a = a()
        } else a = t();
        var h = !ct((_e || i).memoizedState, a);
        h && (i.memoizedState = a, Xe = !0), i = i.queue;
        var y = Zc.bind(null, n, i, e);
        if (fi(2048, 8, y, [e]), i.getSnapshot !== t || h || He !== null && He.memoizedState.tag & 1) {
            if (n.flags |= 2048, yn(9, Rl(), Kc.bind(null, n, i, a, t), null), qe === null) throw Error(u(349));
            o || (fa & 124) !== 0 || Xc(n, t, a)
        }
        return a
    }

    function Xc(e, t, a) {
        e.flags |= 16384, e = {
            getSnapshot: t,
            value: a
        }, t = ce.updateQueue, t === null ? (t = zs(), ce.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e))
    }

    function Kc(e, t, a, n) {
        t.value = a, t.getSnapshot = n, $c(t) && Jc(e)
    }

    function Zc(e, t, a) {
        return a(function() {
            $c(t) && Jc(e)
        })
    }

    function $c(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
            var a = t();
            return !ct(e, a)
        } catch {
            return !0
        }
    }

    function Jc(e) {
        var t = on(e, 2);
        t !== null && pt(t, e, 2)
    }

    function Us(e) {
        var t = it();
        if (typeof e == "function") {
            var a = e;
            if (e = a(), Ya) {
                ia(!0);
                try {
                    a()
                } finally {
                    ia(!1)
                }
            }
        }
        return t.memoizedState = t.baseState = e, t.queue = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Zt,
            lastRenderedState: e
        }, t
    }

    function Fc(e, t, a, n) {
        return e.baseState = a, Ds(e, _e, typeof n == "function" ? n : Zt)
    }

    function gm(e, t, a, n, i) {
        if (Al(e)) throw Error(u(485));
        if (e = t.action, e !== null) {
            var o = {
                payload: i,
                action: e,
                next: null,
                isTransition: !0,
                status: "pending",
                value: null,
                reason: null,
                listeners: [],
                then: function(h) {
                    o.listeners.push(h)
                }
            };
            j.T !== null ? a(!0) : o.isTransition = !1, n(o), a = t.pending, a === null ? (o.next = t.pending = o, Pc(t, o)) : (o.next = a.next, t.pending = a.next = o)
        }
    }

    function Pc(e, t) {
        var a = t.action,
            n = t.payload,
            i = e.state;
        if (t.isTransition) {
            var o = j.T,
                h = {};
            j.T = h;
            try {
                var y = a(i, n),
                    w = j.S;
                w !== null && w(h, y), Wc(e, t, y)
            } catch (A) {
                Bs(e, t, A)
            } finally {
                j.T = o
            }
        } else try {
            o = a(i, n), Wc(e, t, o)
        } catch (A) {
            Bs(e, t, A)
        }
    }

    function Wc(e, t, a) {
        a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(function(n) {
            Ic(e, t, n)
        }, function(n) {
            return Bs(e, t, n)
        }) : Ic(e, t, a)
    }

    function Ic(e, t, a) {
        t.status = "fulfilled", t.value = a, ef(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Pc(e, a)))
    }

    function Bs(e, t, a) {
        var n = e.pending;
        if (e.pending = null, n !== null) {
            n = n.next;
            do t.status = "rejected", t.reason = a, ef(t), t = t.next; while (t !== n)
        }
        e.action = null
    }

    function ef(e) {
        e = e.listeners;
        for (var t = 0; t < e.length; t++)(0, e[t])()
    }

    function tf(e, t) {
        return t
    }

    function af(e, t) {
        if (we) {
            var a = qe.formState;
            if (a !== null) {
                e: {
                    var n = ce;
                    if (we) {
                        if (Le) {
                            t: {
                                for (var i = Le, o = Tt; i.nodeType !== 8;) {
                                    if (!o) {
                                        i = null;
                                        break t
                                    }
                                    if (i = Rt(i.nextSibling), i === null) {
                                        i = null;
                                        break t
                                    }
                                }
                                o = i.data,
                                i = o === "F!" || o === "F" ? i : null
                            }
                            if (i) {
                                Le = Rt(i.nextSibling), n = i.data === "F!";
                                break e
                            }
                        }
                        Ba(n)
                    }
                    n = !1
                }
                n && (t = a[0])
            }
        }
        return a = it(), a.memoizedState = a.baseState = t, n = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: tf,
            lastRenderedState: t
        }, a.queue = n, a = wf.bind(null, ce, n), n.dispatch = a, n = Us(!1), o = Vs.bind(null, ce, !1, n.queue), n = it(), i = {
            state: t,
            dispatch: null,
            action: e,
            pending: null
        }, n.queue = i, a = gm.bind(null, ce, i, o, a), i.dispatch = a, n.memoizedState = e, [t, a, !1]
    }

    function nf(e) {
        var t = Ge();
        return lf(t, _e, e)
    }

    function lf(e, t, a) {
        if (t = Ds(e, t, tf)[0], e = Ol(Zt)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
            var n = ci(t)
        } catch (h) {
            throw h === ii ? xl : h
        } else n = t;
        t = Ge();
        var i = t.queue,
            o = i.dispatch;
        return a !== t.memoizedState && (ce.flags |= 2048, yn(9, Rl(), mm.bind(null, i, a), null)), [n, o, e]
    }

    function mm(e, t) {
        e.action = t
    }

    function rf(e) {
        var t = Ge(),
            a = _e;
        if (a !== null) return lf(t, a, e);
        Ge(), t = t.memoizedState, a = Ge();
        var n = a.queue.dispatch;
        return a.memoizedState = e, [t, n, !1]
    }

    function yn(e, t, a, n) {
        return e = {
            tag: e,
            create: a,
            deps: n,
            inst: t,
            next: null
        }, t = ce.updateQueue, t === null && (t = zs(), ce.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (n = a.next, a.next = e, e.next = n, t.lastEffect = e), e
    }

    function Rl() {
        return {
            destroy: void 0,
            resource: void 0
        }
    }

    function sf() {
        return Ge().memoizedState
    }

    function ql(e, t, a, n) {
        var i = it();
        n = n === void 0 ? null : n, ce.flags |= e, i.memoizedState = yn(1 | t, Rl(), a, n)
    }

    function fi(e, t, a, n) {
        var i = Ge();
        n = n === void 0 ? null : n;
        var o = i.memoizedState.inst;
        _e !== null && n !== null && Rs(n, _e.memoizedState.deps) ? i.memoizedState = yn(t, o, a, n) : (ce.flags |= e, i.memoizedState = yn(1 | t, o, a, n))
    }

    function of(e, t) {
        ql(8390656, 8, e, t)
    }

    function uf(e, t) {
        fi(2048, 8, e, t)
    }

    function cf(e, t) {
        return fi(4, 2, e, t)
    }

    function ff(e, t) {
        return fi(4, 4, e, t)
    }

    function df(e, t) {
        if (typeof t == "function") {
            e = e();
            var a = t(e);
            return function() {
                typeof a == "function" ? a() : t(null)
            }
        }
        if (t != null) return e = e(), t.current = e,
            function() {
                t.current = null
            }
    }

    function hf(e, t, a) {
        a = a != null ? a.concat([e]) : null, fi(4, 4, df.bind(null, t, e), a)
    }

    function Hs() {}

    function gf(e, t) {
        var a = Ge();
        t = t === void 0 ? null : t;
        var n = a.memoizedState;
        return t !== null && Rs(t, n[1]) ? n[0] : (a.memoizedState = [e, t], e)
    }

    function mf(e, t) {
        var a = Ge();
        t = t === void 0 ? null : t;
        var n = a.memoizedState;
        if (t !== null && Rs(t, n[1])) return n[0];
        if (n = e(), Ya) {
            ia(!0);
            try {
                e()
            } finally {
                ia(!1)
            }
        }
        return a.memoizedState = [n, t], n
    }

    function Gs(e, t, a) {
        return a === void 0 || (fa & 1073741824) !== 0 ? e.memoizedState = t : (e.memoizedState = a, e = v0(), ce.lanes |= e, va |= e, a)
    }

    function pf(e, t, a, n) {
        return ct(a, t) ? a : gn.current !== null ? (e = Gs(e, a, n), ct(e, t) || (Xe = !0), e) : (fa & 42) === 0 ? (Xe = !0, e.memoizedState = a) : (e = v0(), ce.lanes |= e, va |= e, t)
    }

    function yf(e, t, a, n, i) {
        var o = X.p;
        X.p = o !== 0 && 8 > o ? o : 8;
        var h = j.T,
            y = {};
        j.T = y, Vs(e, !1, t, a);
        try {
            var w = i(),
                A = j.S;
            if (A !== null && A(y, w), w !== null && typeof w == "object" && typeof w.then == "function") {
                var U = fm(w, n);
                di(e, t, U, mt(e))
            } else di(e, t, n, mt(e))
        } catch (k) {
            di(e, t, {
                then: function() {},
                status: "rejected",
                reason: k
            }, mt())
        } finally {
            X.p = o, j.T = h
        }
    }

    function pm() {}

    function ks(e, t, a, n) {
        if (e.tag !== 5) throw Error(u(476));
        var i = vf(e).queue;
        yf(e, i, t, ee, a === null ? pm : function() {
            return bf(e), a(n)
        })
    }

    function vf(e) {
        var t = e.memoizedState;
        if (t !== null) return t;
        t = {
            memoizedState: ee,
            baseState: ee,
            baseQueue: null,
            queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: Zt,
                lastRenderedState: ee
            },
            next: null
        };
        var a = {};
        return t.next = {
            memoizedState: a,
            baseState: a,
            baseQueue: null,
            queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: Zt,
                lastRenderedState: a
            },
            next: null
        }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t
    }

    function bf(e) {
        var t = vf(e).next.queue;
        di(e, t, {}, mt())
    }

    function Ys() {
        return We(Ai)
    }

    function Sf() {
        return Ge().memoizedState
    }

    function xf() {
        return Ge().memoizedState
    }

    function ym(e) {
        for (var t = e.return; t !== null;) {
            switch (t.tag) {
                case 24:
                case 3:
                    var a = mt();
                    e = ua(a);
                    var n = ca(t, e, a);
                    n !== null && (pt(n, t, a), ri(n, t, a)), t = {
                        cache: vs()
                    }, e.payload = t;
                    return
            }
            t = t.return
        }
    }

    function vm(e, t, a) {
        var n = mt();
        a = {
            lane: n,
            revertLane: 0,
            action: a,
            hasEagerState: !1,
            eagerState: null,
            next: null
        }, Al(e) ? Cf(t, a) : (a = os(e, t, a, n), a !== null && (pt(a, e, n), Ef(a, t, n)))
    }

    function wf(e, t, a) {
        var n = mt();
        di(e, t, a, n)
    }

    function di(e, t, a, n) {
        var i = {
            lane: n,
            revertLane: 0,
            action: a,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
        if (Al(e)) Cf(t, i);
        else {
            var o = e.alternate;
            if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
                var h = t.lastRenderedState,
                    y = o(h, a);
                if (i.hasEagerState = !0, i.eagerState = y, ct(y, h)) return hl(e, t, i, 0), qe === null && dl(), !1
            } catch {} finally {}
            if (a = os(e, t, i, n), a !== null) return pt(a, e, n), Ef(a, t, n), !0
        }
        return !1
    }

    function Vs(e, t, a, n) {
        if (n = {
                lane: 2,
                revertLane: wo(),
                action: n,
                hasEagerState: !1,
                eagerState: null,
                next: null
            }, Al(e)) {
            if (t) throw Error(u(479))
        } else t = os(e, a, n, 2), t !== null && pt(t, e, 2)
    }

    function Al(e) {
        var t = e.alternate;
        return e === ce || t !== null && t === ce
    }

    function Cf(e, t) {
        mn = El = !0;
        var a = e.pending;
        a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t
    }

    function Ef(e, t, a) {
        if ((a & 4194048) !== 0) {
            var n = t.lanes;
            n &= e.pendingLanes, a |= n, t.lanes = a, Tu(e, a)
        }
    }
    var Tl = {
            readContext: We,
            use: Ml,
            useCallback: Ue,
            useContext: Ue,
            useEffect: Ue,
            useImperativeHandle: Ue,
            useLayoutEffect: Ue,
            useInsertionEffect: Ue,
            useMemo: Ue,
            useReducer: Ue,
            useRef: Ue,
            useState: Ue,
            useDebugValue: Ue,
            useDeferredValue: Ue,
            useTransition: Ue,
            useSyncExternalStore: Ue,
            useId: Ue,
            useHostTransitionStatus: Ue,
            useFormState: Ue,
            useActionState: Ue,
            useOptimistic: Ue,
            useMemoCache: Ue,
            useCacheRefresh: Ue
        },
        _f = {
            readContext: We,
            use: Ml,
            useCallback: function(e, t) {
                return it().memoizedState = [e, t === void 0 ? null : t], e
            },
            useContext: We,
            useEffect: of,
            useImperativeHandle: function(e, t, a) {
                a = a != null ? a.concat([e]) : null, ql(4194308, 4, df.bind(null, t, e), a)
            },
            useLayoutEffect: function(e, t) {
                return ql(4194308, 4, e, t)
            },
            useInsertionEffect: function(e, t) {
                ql(4, 2, e, t)
            },
            useMemo: function(e, t) {
                var a = it();
                t = t === void 0 ? null : t;
                var n = e();
                if (Ya) {
                    ia(!0);
                    try {
                        e()
                    } finally {
                        ia(!1)
                    }
                }
                return a.memoizedState = [n, t], n
            },
            useReducer: function(e, t, a) {
                var n = it();
                if (a !== void 0) {
                    var i = a(t);
                    if (Ya) {
                        ia(!0);
                        try {
                            a(t)
                        } finally {
                            ia(!1)
                        }
                    }
                } else i = t;
                return n.memoizedState = n.baseState = i, e = {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: i
                }, n.queue = e, e = e.dispatch = vm.bind(null, ce, e), [n.memoizedState, e]
            },
            useRef: function(e) {
                var t = it();
                return e = {
                    current: e
                }, t.memoizedState = e
            },
            useState: function(e) {
                e = Us(e);
                var t = e.queue,
                    a = wf.bind(null, ce, t);
                return t.dispatch = a, [e.memoizedState, a]
            },
            useDebugValue: Hs,
            useDeferredValue: function(e, t) {
                var a = it();
                return Gs(a, e, t)
            },
            useTransition: function() {
                var e = Us(!1);
                return e = yf.bind(null, ce, e.queue, !0, !1), it().memoizedState = e, [!1, e]
            },
            useSyncExternalStore: function(e, t, a) {
                var n = ce,
                    i = it();
                if (we) {
                    if (a === void 0) throw Error(u(407));
                    a = a()
                } else {
                    if (a = t(), qe === null) throw Error(u(349));
                    (ye & 124) !== 0 || Xc(n, t, a)
                }
                i.memoizedState = a;
                var o = {
                    value: a,
                    getSnapshot: t
                };
                return i.queue = o, of(Zc.bind(null, n, o, e), [e]), n.flags |= 2048, yn(9, Rl(), Kc.bind(null, n, o, a, t), null), a
            },
            useId: function() {
                var e = it(),
                    t = qe.identifierPrefix;
                if (we) {
                    var a = Qt,
                        n = Vt;
                    a = (n & ~(1 << 32 - ut(n) - 1)).toString(32) + a, t = "«" + t + "R" + a, a = _l++, 0 < a && (t += "H" + a.toString(32)), t += "»"
                } else a = dm++, t = "«" + t + "r" + a.toString(32) + "»";
                return e.memoizedState = t
            },
            useHostTransitionStatus: Ys,
            useFormState: af,
            useActionState: af,
            useOptimistic: function(e) {
                var t = it();
                t.memoizedState = t.baseState = e;
                var a = {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: null,
                    lastRenderedState: null
                };
                return t.queue = a, t = Vs.bind(null, ce, !0, a), a.dispatch = t, [e, t]
            },
            useMemoCache: Ls,
            useCacheRefresh: function() {
                return it().memoizedState = ym.bind(null, ce)
            }
        },
        Mf = {
            readContext: We,
            use: Ml,
            useCallback: gf,
            useContext: We,
            useEffect: uf,
            useImperativeHandle: hf,
            useInsertionEffect: cf,
            useLayoutEffect: ff,
            useMemo: mf,
            useReducer: Ol,
            useRef: sf,
            useState: function() {
                return Ol(Zt)
            },
            useDebugValue: Hs,
            useDeferredValue: function(e, t) {
                var a = Ge();
                return pf(a, _e.memoizedState, e, t)
            },
            useTransition: function() {
                var e = Ol(Zt)[0],
                    t = Ge().memoizedState;
                return [typeof e == "boolean" ? e : ci(e), t]
            },
            useSyncExternalStore: Qc,
            useId: Sf,
            useHostTransitionStatus: Ys,
            useFormState: nf,
            useActionState: nf,
            useOptimistic: function(e, t) {
                var a = Ge();
                return Fc(a, _e, e, t)
            },
            useMemoCache: Ls,
            useCacheRefresh: xf
        },
        bm = {
            readContext: We,
            use: Ml,
            useCallback: gf,
            useContext: We,
            useEffect: uf,
            useImperativeHandle: hf,
            useInsertionEffect: cf,
            useLayoutEffect: ff,
            useMemo: mf,
            useReducer: js,
            useRef: sf,
            useState: function() {
                return js(Zt)
            },
            useDebugValue: Hs,
            useDeferredValue: function(e, t) {
                var a = Ge();
                return _e === null ? Gs(a, e, t) : pf(a, _e.memoizedState, e, t)
            },
            useTransition: function() {
                var e = js(Zt)[0],
                    t = Ge().memoizedState;
                return [typeof e == "boolean" ? e : ci(e), t]
            },
            useSyncExternalStore: Qc,
            useId: Sf,
            useHostTransitionStatus: Ys,
            useFormState: rf,
            useActionState: rf,
            useOptimistic: function(e, t) {
                var a = Ge();
                return _e !== null ? Fc(a, _e, e, t) : (a.baseState = e, [e, a.queue.dispatch])
            },
            useMemoCache: Ls,
            useCacheRefresh: xf
        },
        vn = null,
        hi = 0;

    function Nl(e) {
        var t = hi;
        return hi += 1, vn === null && (vn = []), jc(vn, e, t)
    }

    function gi(e, t) {
        t = t.props.ref, e.ref = t !== void 0 ? t : null
    }

    function zl(e, t) {
        throw t.$$typeof === b ? Error(u(525)) : (e = Object.prototype.toString.call(t), Error(u(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)))
    }

    function Of(e) {
        var t = e._init;
        return t(e._payload)
    }

    function Rf(e) {
        function t(R, O) {
            if (e) {
                var q = R.deletions;
                q === null ? (R.deletions = [O], R.flags |= 16) : q.push(O)
            }
        }

        function a(R, O) {
            if (!e) return null;
            for (; O !== null;) t(R, O), O = O.sibling;
            return null
        }

        function n(R) {
            for (var O = new Map; R !== null;) R.key !== null ? O.set(R.key, R) : O.set(R.index, R), R = R.sibling;
            return O
        }

        function i(R, O) {
            return R = Yt(R, O), R.index = 0, R.sibling = null, R
        }

        function o(R, O, q) {
            return R.index = q, e ? (q = R.alternate, q !== null ? (q = q.index, q < O ? (R.flags |= 67108866, O) : q) : (R.flags |= 67108866, O)) : (R.flags |= 1048576, O)
        }

        function h(R) {
            return e && R.alternate === null && (R.flags |= 67108866), R
        }

        function y(R, O, q, B) {
            return O === null || O.tag !== 6 ? (O = cs(q, R.mode, B), O.return = R, O) : (O = i(O, q), O.return = R, O)
        }

        function w(R, O, q, B) {
            var F = q.type;
            return F === C ? U(R, O, q.props.children, B, q.key) : O !== null && (O.elementType === F || typeof F == "object" && F !== null && F.$$typeof === $ && Of(F) === O.type) ? (O = i(O, q.props), gi(O, q), O.return = R, O) : (O = ml(q.type, q.key, q.props, null, R.mode, B), gi(O, q), O.return = R, O)
        }

        function A(R, O, q, B) {
            return O === null || O.tag !== 4 || O.stateNode.containerInfo !== q.containerInfo || O.stateNode.implementation !== q.implementation ? (O = fs(q, R.mode, B), O.return = R, O) : (O = i(O, q.children || []), O.return = R, O)
        }

        function U(R, O, q, B, F) {
            return O === null || O.tag !== 7 ? (O = La(q, R.mode, B, F), O.return = R, O) : (O = i(O, q), O.return = R, O)
        }

        function k(R, O, q) {
            if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint") return O = cs("" + O, R.mode, q), O.return = R, O;
            if (typeof O == "object" && O !== null) {
                switch (O.$$typeof) {
                    case S:
                        return q = ml(O.type, O.key, O.props, null, R.mode, q), gi(q, O), q.return = R, q;
                    case x:
                        return O = fs(O, R.mode, q), O.return = R, O;
                    case $:
                        var B = O._init;
                        return O = B(O._payload), k(R, O, q)
                }
                if (pe(O) || P(O)) return O = La(O, R.mode, q, null), O.return = R, O;
                if (typeof O.then == "function") return k(R, Nl(O), q);
                if (O.$$typeof === V) return k(R, bl(R, O), q);
                zl(R, O)
            }
            return null
        }

        function N(R, O, q, B) {
            var F = O !== null ? O.key : null;
            if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint") return F !== null ? null : y(R, O, "" + q, B);
            if (typeof q == "object" && q !== null) {
                switch (q.$$typeof) {
                    case S:
                        return q.key === F ? w(R, O, q, B) : null;
                    case x:
                        return q.key === F ? A(R, O, q, B) : null;
                    case $:
                        return F = q._init, q = F(q._payload), N(R, O, q, B)
                }
                if (pe(q) || P(q)) return F !== null ? null : U(R, O, q, B, null);
                if (typeof q.then == "function") return N(R, O, Nl(q), B);
                if (q.$$typeof === V) return N(R, O, bl(R, q), B);
                zl(R, q)
            }
            return null
        }

        function z(R, O, q, B, F) {
            if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint") return R = R.get(q) || null, y(O, R, "" + B, F);
            if (typeof B == "object" && B !== null) {
                switch (B.$$typeof) {
                    case S:
                        return R = R.get(B.key === null ? q : B.key) || null, w(O, R, B, F);
                    case x:
                        return R = R.get(B.key === null ? q : B.key) || null, A(O, R, B, F);
                    case $:
                        var fe = B._init;
                        return B = fe(B._payload), z(R, O, q, B, F)
                }
                if (pe(B) || P(B)) return R = R.get(q) || null, U(O, R, B, F, null);
                if (typeof B.then == "function") return z(R, O, q, Nl(B), F);
                if (B.$$typeof === V) return z(R, O, q, bl(O, B), F);
                zl(O, B)
            }
            return null
        }

        function le(R, O, q, B) {
            for (var F = null, fe = null, I = O, ne = O = 0, Ze = null; I !== null && ne < q.length; ne++) {
                I.index > ne ? (Ze = I, I = null) : Ze = I.sibling;
                var xe = N(R, I, q[ne], B);
                if (xe === null) {
                    I === null && (I = Ze);
                    break
                }
                e && I && xe.alternate === null && t(R, I), O = o(xe, O, ne), fe === null ? F = xe : fe.sibling = xe, fe = xe, I = Ze
            }
            if (ne === q.length) return a(R, I), we && ja(R, ne), F;
            if (I === null) {
                for (; ne < q.length; ne++) I = k(R, q[ne], B), I !== null && (O = o(I, O, ne), fe === null ? F = I : fe.sibling = I, fe = I);
                return we && ja(R, ne), F
            }
            for (I = n(I); ne < q.length; ne++) Ze = z(I, R, ne, q[ne], B), Ze !== null && (e && Ze.alternate !== null && I.delete(Ze.key === null ? ne : Ze.key), O = o(Ze, O, ne), fe === null ? F = Ze : fe.sibling = Ze, fe = Ze);
            return e && I.forEach(function(Oa) {
                return t(R, Oa)
            }), we && ja(R, ne), F
        }

        function ae(R, O, q, B) {
            if (q == null) throw Error(u(151));
            for (var F = null, fe = null, I = O, ne = O = 0, Ze = null, xe = q.next(); I !== null && !xe.done; ne++, xe = q.next()) {
                I.index > ne ? (Ze = I, I = null) : Ze = I.sibling;
                var Oa = N(R, I, xe.value, B);
                if (Oa === null) {
                    I === null && (I = Ze);
                    break
                }
                e && I && Oa.alternate === null && t(R, I), O = o(Oa, O, ne), fe === null ? F = Oa : fe.sibling = Oa, fe = Oa, I = Ze
            }
            if (xe.done) return a(R, I), we && ja(R, ne), F;
            if (I === null) {
                for (; !xe.done; ne++, xe = q.next()) xe = k(R, xe.value, B), xe !== null && (O = o(xe, O, ne), fe === null ? F = xe : fe.sibling = xe, fe = xe);
                return we && ja(R, ne), F
            }
            for (I = n(I); !xe.done; ne++, xe = q.next()) xe = z(I, R, ne, xe.value, B), xe !== null && (e && xe.alternate !== null && I.delete(xe.key === null ? ne : xe.key), O = o(xe, O, ne), fe === null ? F = xe : fe.sibling = xe, fe = xe);
            return e && I.forEach(function(S2) {
                return t(R, S2)
            }), we && ja(R, ne), F
        }

        function Oe(R, O, q, B) {
            if (typeof q == "object" && q !== null && q.type === C && q.key === null && (q = q.props.children), typeof q == "object" && q !== null) {
                switch (q.$$typeof) {
                    case S:
                        e: {
                            for (var F = q.key; O !== null;) {
                                if (O.key === F) {
                                    if (F = q.type, F === C) {
                                        if (O.tag === 7) {
                                            a(R, O.sibling), B = i(O, q.props.children), B.return = R, R = B;
                                            break e
                                        }
                                    } else if (O.elementType === F || typeof F == "object" && F !== null && F.$$typeof === $ && Of(F) === O.type) {
                                        a(R, O.sibling), B = i(O, q.props), gi(B, q), B.return = R, R = B;
                                        break e
                                    }
                                    a(R, O);
                                    break
                                } else t(R, O);
                                O = O.sibling
                            }
                            q.type === C ? (B = La(q.props.children, R.mode, B, q.key), B.return = R, R = B) : (B = ml(q.type, q.key, q.props, null, R.mode, B), gi(B, q), B.return = R, R = B)
                        }
                        return h(R);
                    case x:
                        e: {
                            for (F = q.key; O !== null;) {
                                if (O.key === F)
                                    if (O.tag === 4 && O.stateNode.containerInfo === q.containerInfo && O.stateNode.implementation === q.implementation) {
                                        a(R, O.sibling), B = i(O, q.children || []), B.return = R, R = B;
                                        break e
                                    } else {
                                        a(R, O);
                                        break
                                    }
                                else t(R, O);
                                O = O.sibling
                            }
                            B = fs(q, R.mode, B),
                            B.return = R,
                            R = B
                        }
                        return h(R);
                    case $:
                        return F = q._init, q = F(q._payload), Oe(R, O, q, B)
                }
                if (pe(q)) return le(R, O, q, B);
                if (P(q)) {
                    if (F = P(q), typeof F != "function") throw Error(u(150));
                    return q = F.call(q), ae(R, O, q, B)
                }
                if (typeof q.then == "function") return Oe(R, O, Nl(q), B);
                if (q.$$typeof === V) return Oe(R, O, bl(R, q), B);
                zl(R, q)
            }
            return typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint" ? (q = "" + q, O !== null && O.tag === 6 ? (a(R, O.sibling), B = i(O, q), B.return = R, R = B) : (a(R, O), B = cs(q, R.mode, B), B.return = R, R = B), h(R)) : a(R, O)
        }
        return function(R, O, q, B) {
            try {
                hi = 0;
                var F = Oe(R, O, q, B);
                return vn = null, F
            } catch (I) {
                if (I === ii || I === xl) throw I;
                var fe = ft(29, I, null, R.mode);
                return fe.lanes = B, fe.return = R, fe
            } finally {}
        }
    }
    var bn = Rf(!0),
        qf = Rf(!1),
        Ct = H(null),
        Nt = null;

    function da(e) {
        var t = e.alternate;
        Z(Ye, Ye.current & 1), Z(Ct, e), Nt === null && (t === null || gn.current !== null || t.memoizedState !== null) && (Nt = e)
    }

    function Af(e) {
        if (e.tag === 22) {
            if (Z(Ye, Ye.current), Z(Ct, e), Nt === null) {
                var t = e.alternate;
                t !== null && t.memoizedState !== null && (Nt = e)
            }
        } else ha()
    }

    function ha() {
        Z(Ye, Ye.current), Z(Ct, Ct.current)
    }

    function $t(e) {
        J(Ct), Nt === e && (Nt = null), J(Ye)
    }
    var Ye = H(0);

    function Ll(e) {
        for (var t = e; t !== null;) {
            if (t.tag === 13) {
                var a = t.memoizedState;
                if (a !== null && (a = a.dehydrated, a === null || a.data === "$?" || Lo(a))) return t
            } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
                if ((t.flags & 128) !== 0) return t
            } else if (t.child !== null) {
                t.child.return = t, t = t.child;
                continue
            }
            if (t === e) break;
            for (; t.sibling === null;) {
                if (t.return === null || t.return === e) return null;
                t = t.return
            }
            t.sibling.return = t.return, t = t.sibling
        }
        return null
    }

    function Qs(e, t, a, n) {
        t = e.memoizedState, a = a(n, t), a = a == null ? t : v({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a)
    }
    var Xs = {
        enqueueSetState: function(e, t, a) {
            e = e._reactInternals;
            var n = mt(),
                i = ua(n);
            i.payload = t, a != null && (i.callback = a), t = ca(e, i, n), t !== null && (pt(t, e, n), ri(t, e, n))
        },
        enqueueReplaceState: function(e, t, a) {
            e = e._reactInternals;
            var n = mt(),
                i = ua(n);
            i.tag = 1, i.payload = t, a != null && (i.callback = a), t = ca(e, i, n), t !== null && (pt(t, e, n), ri(t, e, n))
        },
        enqueueForceUpdate: function(e, t) {
            e = e._reactInternals;
            var a = mt(),
                n = ua(a);
            n.tag = 2, t != null && (n.callback = t), t = ca(e, n, a), t !== null && (pt(t, e, a), ri(t, e, a))
        }
    };

    function Tf(e, t, a, n, i, o, h) {
        return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(n, o, h) : t.prototype && t.prototype.isPureReactComponent ? !Fn(a, n) || !Fn(i, o) : !0
    }

    function Nf(e, t, a, n) {
        e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, n), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, n), t.state !== e && Xs.enqueueReplaceState(t, t.state, null)
    }

    function Va(e, t) {
        var a = t;
        if ("ref" in t) {
            a = {};
            for (var n in t) n !== "ref" && (a[n] = t[n])
        }
        if (e = e.defaultProps) {
            a === t && (a = v({}, a));
            for (var i in e) a[i] === void 0 && (a[i] = e[i])
        }
        return a
    }
    var Dl = typeof reportError == "function" ? reportError : function(e) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
            var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
                error: e
            });
            if (!window.dispatchEvent(t)) return
        } else if (typeof process == "object" && typeof process.emit == "function") {
            process.emit("uncaughtException", e);
            return
        }
        console.error(e)
    };

    function zf(e) {
        Dl(e)
    }

    function Lf(e) {
        console.error(e)
    }

    function Df(e) {
        Dl(e)
    }

    function jl(e, t) {
        try {
            var a = e.onUncaughtError;
            a(t.value, {
                componentStack: t.stack
            })
        } catch (n) {
            setTimeout(function() {
                throw n
            })
        }
    }

    function jf(e, t, a) {
        try {
            var n = e.onCaughtError;
            n(a.value, {
                componentStack: a.stack,
                errorBoundary: t.tag === 1 ? t.stateNode : null
            })
        } catch (i) {
            setTimeout(function() {
                throw i
            })
        }
    }

    function Ks(e, t, a) {
        return a = ua(a), a.tag = 3, a.payload = {
            element: null
        }, a.callback = function() {
            jl(e, t)
        }, a
    }

    function Uf(e) {
        return e = ua(e), e.tag = 3, e
    }

    function Bf(e, t, a, n) {
        var i = a.type.getDerivedStateFromError;
        if (typeof i == "function") {
            var o = n.value;
            e.payload = function() {
                return i(o)
            }, e.callback = function() {
                jf(t, a, n)
            }
        }
        var h = a.stateNode;
        h !== null && typeof h.componentDidCatch == "function" && (e.callback = function() {
            jf(t, a, n), typeof i != "function" && (ba === null ? ba = new Set([this]) : ba.add(this));
            var y = n.stack;
            this.componentDidCatch(n.value, {
                componentStack: y !== null ? y : ""
            })
        })
    }

    function Sm(e, t, a, n, i) {
        if (a.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
            if (t = a.alternate, t !== null && ti(t, a, i, !0), a = Ct.current, a !== null) {
                switch (a.tag) {
                    case 13:
                        return Nt === null ? yo() : a.alternate === null && De === 0 && (De = 3), a.flags &= -257, a.flags |= 65536, a.lanes = i, n === xs ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = new Set([n]) : t.add(n), bo(e, n, i)), !1;
                    case 22:
                        return a.flags |= 65536, n === xs ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
                            transitions: null,
                            markerInstances: null,
                            retryQueue: new Set([n])
                        }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = new Set([n]) : a.add(n)), bo(e, n, i)), !1
                }
                throw Error(u(435, a.tag))
            }
            return bo(e, n, i), yo(), !1
        }
        if (we) return t = Ct.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = i, n !== gs && (e = Error(u(422), {
            cause: n
        }), ei(bt(e, a)))) : (n !== gs && (t = Error(u(423), {
            cause: n
        }), ei(bt(t, a))), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, n = bt(n, a), i = Ks(e.stateNode, n, i), Es(e, i), De !== 4 && (De = 2)), !1;
        var o = Error(u(520), {
            cause: n
        });
        if (o = bt(o, a), xi === null ? xi = [o] : xi.push(o), De !== 4 && (De = 2), t === null) return !0;
        n = bt(n, a), a = t;
        do {
            switch (a.tag) {
                case 3:
                    return a.flags |= 65536, e = i & -i, a.lanes |= e, e = Ks(a.stateNode, n, e), Es(a, e), !1;
                case 1:
                    if (t = a.type, o = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (ba === null || !ba.has(o)))) return a.flags |= 65536, i &= -i, a.lanes |= i, i = Uf(i), Bf(i, e, a, n), Es(a, i), !1
            }
            a = a.return
        } while (a !== null);
        return !1
    }
    var Hf = Error(u(461)),
        Xe = !1;

    function $e(e, t, a, n) {
        t.child = e === null ? qf(t, null, a, n) : bn(t, e.child, a, n)
    }

    function Gf(e, t, a, n, i) {
        a = a.render;
        var o = t.ref;
        if ("ref" in n) {
            var h = {};
            for (var y in n) y !== "ref" && (h[y] = n[y])
        } else h = n;
        return Ga(t), n = qs(e, t, a, h, o, i), y = As(), e !== null && !Xe ? (Ts(e, t, i), Jt(e, t, i)) : (we && y && ds(t), t.flags |= 1, $e(e, t, n, i), t.child)
    }

    function kf(e, t, a, n, i) {
        if (e === null) {
            var o = a.type;
            return typeof o == "function" && !us(o) && o.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = o, Yf(e, t, o, n, i)) : (e = ml(a.type, null, n, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e)
        }
        if (o = e.child, !eo(e, i)) {
            var h = o.memoizedProps;
            if (a = a.compare, a = a !== null ? a : Fn, a(h, n) && e.ref === t.ref) return Jt(e, t, i)
        }
        return t.flags |= 1, e = Yt(o, n), e.ref = t.ref, e.return = t, t.child = e
    }

    function Yf(e, t, a, n, i) {
        if (e !== null) {
            var o = e.memoizedProps;
            if (Fn(o, n) && e.ref === t.ref)
                if (Xe = !1, t.pendingProps = n = o, eo(e, i))(e.flags & 131072) !== 0 && (Xe = !0);
                else return t.lanes = e.lanes, Jt(e, t, i)
        }
        return Zs(e, t, a, n, i)
    }

    function Vf(e, t, a) {
        var n = t.pendingProps,
            i = n.children,
            o = e !== null ? e.memoizedState : null;
        if (n.mode === "hidden") {
            if ((t.flags & 128) !== 0) {
                if (n = o !== null ? o.baseLanes | a : a, e !== null) {
                    for (i = t.child = e.child, o = 0; i !== null;) o = o | i.lanes | i.childLanes, i = i.sibling;
                    t.childLanes = o & ~n
                } else t.childLanes = 0, t.child = null;
                return Qf(e, t, n, a)
            }
            if ((a & 536870912) !== 0) t.memoizedState = {
                baseLanes: 0,
                cachePool: null
            }, e !== null && Sl(t, o !== null ? o.cachePool : null), o !== null ? kc(t, o) : Ms(), Af(t);
            else return t.lanes = t.childLanes = 536870912, Qf(e, t, o !== null ? o.baseLanes | a : a, a)
        } else o !== null ? (Sl(t, o.cachePool), kc(t, o), ha(), t.memoizedState = null) : (e !== null && Sl(t, null), Ms(), ha());
        return $e(e, t, i, a), t.child
    }

    function Qf(e, t, a, n) {
        var i = Ss();
        return i = i === null ? null : {
            parent: ke._currentValue,
            pool: i
        }, t.memoizedState = {
            baseLanes: a,
            cachePool: i
        }, e !== null && Sl(t, null), Ms(), Af(t), e !== null && ti(e, t, n, !0), null
    }

    function Ul(e, t) {
        var a = t.ref;
        if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
        else {
            if (typeof a != "function" && typeof a != "object") throw Error(u(284));
            (e === null || e.ref !== a) && (t.flags |= 4194816)
        }
    }

    function Zs(e, t, a, n, i) {
        return Ga(t), a = qs(e, t, a, n, void 0, i), n = As(), e !== null && !Xe ? (Ts(e, t, i), Jt(e, t, i)) : (we && n && ds(t), t.flags |= 1, $e(e, t, a, i), t.child)
    }

    function Xf(e, t, a, n, i, o) {
        return Ga(t), t.updateQueue = null, a = Vc(t, n, a, i), Yc(e), n = As(), e !== null && !Xe ? (Ts(e, t, o), Jt(e, t, o)) : (we && n && ds(t), t.flags |= 1, $e(e, t, a, o), t.child)
    }

    function Kf(e, t, a, n, i) {
        if (Ga(t), t.stateNode === null) {
            var o = un,
                h = a.contextType;
            typeof h == "object" && h !== null && (o = We(h)), o = new a(n, o), t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, o.updater = Xs, t.stateNode = o, o._reactInternals = t, o = t.stateNode, o.props = n, o.state = t.memoizedState, o.refs = {}, ws(t), h = a.contextType, o.context = typeof h == "object" && h !== null ? We(h) : un, o.state = t.memoizedState, h = a.getDerivedStateFromProps, typeof h == "function" && (Qs(t, a, h, n), o.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (h = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), h !== o.state && Xs.enqueueReplaceState(o, o.state, null), oi(t, n, o, i), si(), o.state = t.memoizedState), typeof o.componentDidMount == "function" && (t.flags |= 4194308), n = !0
        } else if (e === null) {
            o = t.stateNode;
            var y = t.memoizedProps,
                w = Va(a, y);
            o.props = w;
            var A = o.context,
                U = a.contextType;
            h = un, typeof U == "object" && U !== null && (h = We(U));
            var k = a.getDerivedStateFromProps;
            U = typeof k == "function" || typeof o.getSnapshotBeforeUpdate == "function", y = t.pendingProps !== y, U || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (y || A !== h) && Nf(t, o, n, h), oa = !1;
            var N = t.memoizedState;
            o.state = N, oi(t, n, o, i), si(), A = t.memoizedState, y || N !== A || oa ? (typeof k == "function" && (Qs(t, a, k, n), A = t.memoizedState), (w = oa || Tf(t, a, w, n, N, A, h)) ? (U || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = n, t.memoizedState = A), o.props = n, o.state = A, o.context = h, n = w) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), n = !1)
        } else {
            o = t.stateNode, Cs(e, t), h = t.memoizedProps, U = Va(a, h), o.props = U, k = t.pendingProps, N = o.context, A = a.contextType, w = un, typeof A == "object" && A !== null && (w = We(A)), y = a.getDerivedStateFromProps, (A = typeof y == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (h !== k || N !== w) && Nf(t, o, n, w), oa = !1, N = t.memoizedState, o.state = N, oi(t, n, o, i), si();
            var z = t.memoizedState;
            h !== k || N !== z || oa || e !== null && e.dependencies !== null && vl(e.dependencies) ? (typeof y == "function" && (Qs(t, a, y, n), z = t.memoizedState), (U = oa || Tf(t, a, U, n, N, z, w) || e !== null && e.dependencies !== null && vl(e.dependencies)) ? (A || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(n, z, w), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(n, z, w)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || h === e.memoizedProps && N === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && N === e.memoizedState || (t.flags |= 1024), t.memoizedProps = n, t.memoizedState = z), o.props = n, o.state = z, o.context = w, n = U) : (typeof o.componentDidUpdate != "function" || h === e.memoizedProps && N === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && N === e.memoizedState || (t.flags |= 1024), n = !1)
        }
        return o = n, Ul(e, t), n = (t.flags & 128) !== 0, o || n ? (o = t.stateNode, a = n && typeof a.getDerivedStateFromError != "function" ? null : o.render(), t.flags |= 1, e !== null && n ? (t.child = bn(t, e.child, null, i), t.child = bn(t, null, a, i)) : $e(e, t, a, i), t.memoizedState = o.state, e = t.child) : e = Jt(e, t, i), e
    }

    function Zf(e, t, a, n) {
        return In(), t.flags |= 256, $e(e, t, a, n), t.child
    }
    var $s = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0,
        hydrationErrors: null
    };

    function Js(e) {
        return {
            baseLanes: e,
            cachePool: zc()
        }
    }

    function Fs(e, t, a) {
        return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Et), e
    }

    function $f(e, t, a) {
        var n = t.pendingProps,
            i = !1,
            o = (t.flags & 128) !== 0,
            h;
        if ((h = o) || (h = e !== null && e.memoizedState === null ? !1 : (Ye.current & 2) !== 0), h && (i = !0, t.flags &= -129), h = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
            if (we) {
                if (i ? da(t) : ha(), we) {
                    var y = Le,
                        w;
                    if (w = y) {
                        e: {
                            for (w = y, y = Tt; w.nodeType !== 8;) {
                                if (!y) {
                                    y = null;
                                    break e
                                }
                                if (w = Rt(w.nextSibling), w === null) {
                                    y = null;
                                    break e
                                }
                            }
                            y = w
                        }
                        y !== null ? (t.memoizedState = {
                            dehydrated: y,
                            treeContext: Da !== null ? {
                                id: Vt,
                                overflow: Qt
                            } : null,
                            retryLane: 536870912,
                            hydrationErrors: null
                        }, w = ft(18, null, null, 0), w.stateNode = y, w.return = t, t.child = w, tt = t, Le = null, w = !0) : w = !1
                    }
                    w || Ba(t)
                }
                if (y = t.memoizedState, y !== null && (y = y.dehydrated, y !== null)) return Lo(y) ? t.lanes = 32 : t.lanes = 536870912, null;
                $t(t)
            }
            return y = n.children, n = n.fallback, i ? (ha(), i = t.mode, y = Bl({
                mode: "hidden",
                children: y
            }, i), n = La(n, i, a, null), y.return = t, n.return = t, y.sibling = n, t.child = y, i = t.child, i.memoizedState = Js(a), i.childLanes = Fs(e, h, a), t.memoizedState = $s, n) : (da(t), Ps(t, y))
        }
        if (w = e.memoizedState, w !== null && (y = w.dehydrated, y !== null)) {
            if (o) t.flags & 256 ? (da(t), t.flags &= -257, t = Ws(e, t, a)) : t.memoizedState !== null ? (ha(), t.child = e.child, t.flags |= 128, t = null) : (ha(), i = n.fallback, y = t.mode, n = Bl({
                mode: "visible",
                children: n.children
            }, y), i = La(i, y, a, null), i.flags |= 2, n.return = t, i.return = t, n.sibling = i, t.child = n, bn(t, e.child, null, a), n = t.child, n.memoizedState = Js(a), n.childLanes = Fs(e, h, a), t.memoizedState = $s, t = i);
            else if (da(t), Lo(y)) {
                if (h = y.nextSibling && y.nextSibling.dataset, h) var A = h.dgst;
                h = A, n = Error(u(419)), n.stack = "", n.digest = h, ei({
                    value: n,
                    source: null,
                    stack: null
                }), t = Ws(e, t, a)
            } else if (Xe || ti(e, t, a, !1), h = (a & e.childLanes) !== 0, Xe || h) {
                if (h = qe, h !== null && (n = a & -a, n = (n & 42) !== 0 ? 1 : Lr(n), n = (n & (h.suspendedLanes | a)) !== 0 ? 0 : n, n !== 0 && n !== w.retryLane)) throw w.retryLane = n, on(e, n), pt(h, e, n), Hf;
                y.data === "$?" || yo(), t = Ws(e, t, a)
            } else y.data === "$?" ? (t.flags |= 192, t.child = e.child, t = null) : (e = w.treeContext, Le = Rt(y.nextSibling), tt = t, we = !0, Ua = null, Tt = !1, e !== null && (xt[wt++] = Vt, xt[wt++] = Qt, xt[wt++] = Da, Vt = e.id, Qt = e.overflow, Da = t), t = Ps(t, n.children), t.flags |= 4096);
            return t
        }
        return i ? (ha(), i = n.fallback, y = t.mode, w = e.child, A = w.sibling, n = Yt(w, {
            mode: "hidden",
            children: n.children
        }), n.subtreeFlags = w.subtreeFlags & 65011712, A !== null ? i = Yt(A, i) : (i = La(i, y, a, null), i.flags |= 2), i.return = t, n.return = t, n.sibling = i, t.child = n, n = i, i = t.child, y = e.child.memoizedState, y === null ? y = Js(a) : (w = y.cachePool, w !== null ? (A = ke._currentValue, w = w.parent !== A ? {
            parent: A,
            pool: A
        } : w) : w = zc(), y = {
            baseLanes: y.baseLanes | a,
            cachePool: w
        }), i.memoizedState = y, i.childLanes = Fs(e, h, a), t.memoizedState = $s, n) : (da(t), a = e.child, e = a.sibling, a = Yt(a, {
            mode: "visible",
            children: n.children
        }), a.return = t, a.sibling = null, e !== null && (h = t.deletions, h === null ? (t.deletions = [e], t.flags |= 16) : h.push(e)), t.child = a, t.memoizedState = null, a)
    }

    function Ps(e, t) {
        return t = Bl({
            mode: "visible",
            children: t
        }, e.mode), t.return = e, e.child = t
    }

    function Bl(e, t) {
        return e = ft(22, e, null, t), e.lanes = 0, e.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null
        }, e
    }

    function Ws(e, t, a) {
        return bn(t, e.child, null, a), e = Ps(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e
    }

    function Jf(e, t, a) {
        e.lanes |= t;
        var n = e.alternate;
        n !== null && (n.lanes |= t), ps(e.return, t, a)
    }

    function Is(e, t, a, n, i) {
        var o = e.memoizedState;
        o === null ? e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: n,
            tail: a,
            tailMode: i
        } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = n, o.tail = a, o.tailMode = i)
    }

    function Ff(e, t, a) {
        var n = t.pendingProps,
            i = n.revealOrder,
            o = n.tail;
        if ($e(e, t, n.children, a), n = Ye.current, (n & 2) !== 0) n = n & 1 | 2, t.flags |= 128;
        else {
            if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null;) {
                if (e.tag === 13) e.memoizedState !== null && Jf(e, a, t);
                else if (e.tag === 19) Jf(e, a, t);
                else if (e.child !== null) {
                    e.child.return = e, e = e.child;
                    continue
                }
                if (e === t) break e;
                for (; e.sibling === null;) {
                    if (e.return === null || e.return === t) break e;
                    e = e.return
                }
                e.sibling.return = e.return, e = e.sibling
            }
            n &= 1
        }
        switch (Z(Ye, n), i) {
            case "forwards":
                for (a = t.child, i = null; a !== null;) e = a.alternate, e !== null && Ll(e) === null && (i = a), a = a.sibling;
                a = i, a === null ? (i = t.child, t.child = null) : (i = a.sibling, a.sibling = null), Is(t, !1, i, a, o);
                break;
            case "backwards":
                for (a = null, i = t.child, t.child = null; i !== null;) {
                    if (e = i.alternate, e !== null && Ll(e) === null) {
                        t.child = i;
                        break
                    }
                    e = i.sibling, i.sibling = a, a = i, i = e
                }
                Is(t, !0, a, null, o);
                break;
            case "together":
                Is(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null
        }
        return t.child
    }

    function Jt(e, t, a) {
        if (e !== null && (t.dependencies = e.dependencies), va |= t.lanes, (a & t.childLanes) === 0)
            if (e !== null) {
                if (ti(e, t, a, !1), (a & t.childLanes) === 0) return null
            } else return null;
        if (e !== null && t.child !== e.child) throw Error(u(153));
        if (t.child !== null) {
            for (e = t.child, a = Yt(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null;) e = e.sibling, a = a.sibling = Yt(e, e.pendingProps), a.return = t;
            a.sibling = null
        }
        return t.child
    }

    function eo(e, t) {
        return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && vl(e)))
    }

    function xm(e, t, a) {
        switch (t.tag) {
            case 3:
                Ae(t, t.stateNode.containerInfo), sa(t, ke, e.memoizedState.cache), In();
                break;
            case 27:
            case 5:
                qr(t);
                break;
            case 4:
                Ae(t, t.stateNode.containerInfo);
                break;
            case 10:
                sa(t, t.type, t.memoizedProps.value);
                break;
            case 13:
                var n = t.memoizedState;
                if (n !== null) return n.dehydrated !== null ? (da(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? $f(e, t, a) : (da(t), e = Jt(e, t, a), e !== null ? e.sibling : null);
                da(t);
                break;
            case 19:
                var i = (e.flags & 128) !== 0;
                if (n = (a & t.childLanes) !== 0, n || (ti(e, t, a, !1), n = (a & t.childLanes) !== 0), i) {
                    if (n) return Ff(e, t, a);
                    t.flags |= 128
                }
                if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Z(Ye, Ye.current), n) break;
                return null;
            case 22:
            case 23:
                return t.lanes = 0, Vf(e, t, a);
            case 24:
                sa(t, ke, e.memoizedState.cache)
        }
        return Jt(e, t, a)
    }

    function Pf(e, t, a) {
        if (e !== null)
            if (e.memoizedProps !== t.pendingProps) Xe = !0;
            else {
                if (!eo(e, a) && (t.flags & 128) === 0) return Xe = !1, xm(e, t, a);
                Xe = (e.flags & 131072) !== 0
            }
        else Xe = !1, we && (t.flags & 1048576) !== 0 && Mc(t, yl, t.index);
        switch (t.lanes = 0, t.tag) {
            case 16:
                e: {
                    e = t.pendingProps;
                    var n = t.elementType,
                        i = n._init;
                    if (n = i(n._payload), t.type = n, typeof n == "function") us(n) ? (e = Va(n, e), t.tag = 1, t = Kf(null, t, n, e, a)) : (t.tag = 0, t = Zs(null, t, n, e, a));
                    else {
                        if (n != null) {
                            if (i = n.$$typeof, i === W) {
                                t.tag = 11, t = Gf(null, t, n, e, a);
                                break e
                            } else if (i === me) {
                                t.tag = 14, t = kf(null, t, n, e, a);
                                break e
                            }
                        }
                        throw t = ge(n) || n, Error(u(306, t, ""))
                    }
                }
                return t;
            case 0:
                return Zs(e, t, t.type, t.pendingProps, a);
            case 1:
                return n = t.type, i = Va(n, t.pendingProps), Kf(e, t, n, i, a);
            case 3:
                e: {
                    if (Ae(t, t.stateNode.containerInfo), e === null) throw Error(u(387));n = t.pendingProps;
                    var o = t.memoizedState;i = o.element,
                    Cs(e, t),
                    oi(t, n, null, a);
                    var h = t.memoizedState;
                    if (n = h.cache, sa(t, ke, n), n !== o.cache && ys(t, [ke], a, !0), si(), n = h.element, o.isDehydrated)
                        if (o = {
                                element: n,
                                isDehydrated: !1,
                                cache: h.cache
                            }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
                            t = Zf(e, t, n, a);
                            break e
                        } else if (n !== i) {
                        i = bt(Error(u(424)), t), ei(i), t = Zf(e, t, n, a);
                        break e
                    } else {
                        switch (e = t.stateNode.containerInfo, e.nodeType) {
                            case 9:
                                e = e.body;
                                break;
                            default:
                                e = e.nodeName === "HTML" ? e.ownerDocument.body : e
                        }
                        for (Le = Rt(e.firstChild), tt = t, we = !0, Ua = null, Tt = !0, a = qf(t, null, n, a), t.child = a; a;) a.flags = a.flags & -3 | 4096, a = a.sibling
                    } else {
                        if (In(), n === i) {
                            t = Jt(e, t, a);
                            break e
                        }
                        $e(e, t, n, a)
                    }
                    t = t.child
                }
                return t;
            case 26:
                return Ul(e, t), e === null ? (a = td(t.type, null, t.pendingProps, null)) ? t.memoizedState = a : we || (a = t.type, e = t.pendingProps, n = Wl(se.current).createElement(a), n[Pe] = t, n[at] = e, Fe(n, a, e), Qe(n), t.stateNode = n) : t.memoizedState = td(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
            case 27:
                return qr(t), e === null && we && (n = t.stateNode = W0(t.type, t.pendingProps, se.current), tt = t, Tt = !0, i = Le, wa(t.type) ? (Do = i, Le = Rt(n.firstChild)) : Le = i), $e(e, t, t.pendingProps.children, a), Ul(e, t), e === null && (t.flags |= 4194304), t.child;
            case 5:
                return e === null && we && ((i = n = Le) && (n = Jm(n, t.type, t.pendingProps, Tt), n !== null ? (t.stateNode = n, tt = t, Le = Rt(n.firstChild), Tt = !1, i = !0) : i = !1), i || Ba(t)), qr(t), i = t.type, o = t.pendingProps, h = e !== null ? e.memoizedProps : null, n = o.children, To(i, o) ? n = null : h !== null && To(i, h) && (t.flags |= 32), t.memoizedState !== null && (i = qs(e, t, hm, null, null, a), Ai._currentValue = i), Ul(e, t), $e(e, t, n, a), t.child;
            case 6:
                return e === null && we && ((e = a = Le) && (a = Fm(a, t.pendingProps, Tt), a !== null ? (t.stateNode = a, tt = t, Le = null, e = !0) : e = !1), e || Ba(t)), null;
            case 13:
                return $f(e, t, a);
            case 4:
                return Ae(t, t.stateNode.containerInfo), n = t.pendingProps, e === null ? t.child = bn(t, null, n, a) : $e(e, t, n, a), t.child;
            case 11:
                return Gf(e, t, t.type, t.pendingProps, a);
            case 7:
                return $e(e, t, t.pendingProps, a), t.child;
            case 8:
                return $e(e, t, t.pendingProps.children, a), t.child;
            case 12:
                return $e(e, t, t.pendingProps.children, a), t.child;
            case 10:
                return n = t.pendingProps, sa(t, t.type, n.value), $e(e, t, n.children, a), t.child;
            case 9:
                return i = t.type._context, n = t.pendingProps.children, Ga(t), i = We(i), n = n(i), t.flags |= 1, $e(e, t, n, a), t.child;
            case 14:
                return kf(e, t, t.type, t.pendingProps, a);
            case 15:
                return Yf(e, t, t.type, t.pendingProps, a);
            case 19:
                return Ff(e, t, a);
            case 31:
                return n = t.pendingProps, a = t.mode, n = {
                    mode: n.mode,
                    children: n.children
                }, e === null ? (a = Bl(n, a), a.ref = t.ref, t.child = a, a.return = t, t = a) : (a = Yt(e.child, n), a.ref = t.ref, t.child = a, a.return = t, t = a), t;
            case 22:
                return Vf(e, t, a);
            case 24:
                return Ga(t), n = We(ke), e === null ? (i = Ss(), i === null && (i = qe, o = vs(), i.pooledCache = o, o.refCount++, o !== null && (i.pooledCacheLanes |= a), i = o), t.memoizedState = {
                    parent: n,
                    cache: i
                }, ws(t), sa(t, ke, i)) : ((e.lanes & a) !== 0 && (Cs(e, t), oi(t, null, null, a), si()), i = e.memoizedState, o = t.memoizedState, i.parent !== n ? (i = {
                    parent: n,
                    cache: n
                }, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), sa(t, ke, n)) : (n = o.cache, sa(t, ke, n), n !== i.cache && ys(t, [ke], a, !0))), $e(e, t, t.pendingProps.children, a), t.child;
            case 29:
                throw t.pendingProps
        }
        throw Error(u(156, t.tag))
    }

    function Ft(e) {
        e.flags |= 4
    }

    function Wf(e, t) {
        if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;
        else if (e.flags |= 16777216, !rd(t)) {
            if (t = Ct.current, t !== null && ((ye & 4194048) === ye ? Nt !== null : (ye & 62914560) !== ye && (ye & 536870912) === 0 || t !== Nt)) throw li = xs, Lc;
            e.flags |= 8192
        }
    }

    function Hl(e, t) {
        t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? qu() : 536870912, e.lanes |= t, Cn |= t)
    }

    function mi(e, t) {
        if (!we) switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var a = null; t !== null;) t.alternate !== null && (a = t), t = t.sibling;
                a === null ? e.tail = null : a.sibling = null;
                break;
            case "collapsed":
                a = e.tail;
                for (var n = null; a !== null;) a.alternate !== null && (n = a), a = a.sibling;
                n === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : n.sibling = null
        }
    }

    function Ne(e) {
        var t = e.alternate !== null && e.alternate.child === e.child,
            a = 0,
            n = 0;
        if (t)
            for (var i = e.child; i !== null;) a |= i.lanes | i.childLanes, n |= i.subtreeFlags & 65011712, n |= i.flags & 65011712, i.return = e, i = i.sibling;
        else
            for (i = e.child; i !== null;) a |= i.lanes | i.childLanes, n |= i.subtreeFlags, n |= i.flags, i.return = e, i = i.sibling;
        return e.subtreeFlags |= n, e.childLanes = a, t
    }

    function wm(e, t, a) {
        var n = t.pendingProps;
        switch (hs(t), t.tag) {
            case 31:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
                return Ne(t), null;
            case 1:
                return Ne(t), null;
            case 3:
                return a = t.stateNode, n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Kt(ke), na(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Wn(t) ? Ft(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, qc())), Ne(t), null;
            case 26:
                return a = t.memoizedState, e === null ? (Ft(t), a !== null ? (Ne(t), Wf(t, a)) : (Ne(t), t.flags &= -16777217)) : a ? a !== e.memoizedState ? (Ft(t), Ne(t), Wf(t, a)) : (Ne(t), t.flags &= -16777217) : (e.memoizedProps !== n && Ft(t), Ne(t), t.flags &= -16777217), null;
            case 27:
                Fi(t), a = se.current;
                var i = t.type;
                if (e !== null && t.stateNode != null) e.memoizedProps !== n && Ft(t);
                else {
                    if (!n) {
                        if (t.stateNode === null) throw Error(u(166));
                        return Ne(t), null
                    }
                    e = te.current, Wn(t) ? Oc(t) : (e = W0(i, n, a), t.stateNode = e, Ft(t))
                }
                return Ne(t), null;
            case 5:
                if (Fi(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== n && Ft(t);
                else {
                    if (!n) {
                        if (t.stateNode === null) throw Error(u(166));
                        return Ne(t), null
                    }
                    if (e = te.current, Wn(t)) Oc(t);
                    else {
                        switch (i = Wl(se.current), e) {
                            case 1:
                                e = i.createElementNS("http://www.w3.org/2000/svg", a);
                                break;
                            case 2:
                                e = i.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                                break;
                            default:
                                switch (a) {
                                    case "svg":
                                        e = i.createElementNS("http://www.w3.org/2000/svg", a);
                                        break;
                                    case "math":
                                        e = i.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                                        break;
                                    case "script":
                                        e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild);
                                        break;
                                    case "select":
                                        e = typeof n.is == "string" ? i.createElement("select", {
                                            is: n.is
                                        }) : i.createElement("select"), n.multiple ? e.multiple = !0 : n.size && (e.size = n.size);
                                        break;
                                    default:
                                        e = typeof n.is == "string" ? i.createElement(a, {
                                            is: n.is
                                        }) : i.createElement(a)
                                }
                        }
                        e[Pe] = t, e[at] = n;
                        e: for (i = t.child; i !== null;) {
                            if (i.tag === 5 || i.tag === 6) e.appendChild(i.stateNode);
                            else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                                i.child.return = i, i = i.child;
                                continue
                            }
                            if (i === t) break e;
                            for (; i.sibling === null;) {
                                if (i.return === null || i.return === t) break e;
                                i = i.return
                            }
                            i.sibling.return = i.return, i = i.sibling
                        }
                        t.stateNode = e;
                        e: switch (Fe(e, a, n), a) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                e = !!n.autoFocus;
                                break e;
                            case "img":
                                e = !0;
                                break e;
                            default:
                                e = !1
                        }
                        e && Ft(t)
                    }
                }
                return Ne(t), t.flags &= -16777217, null;
            case 6:
                if (e && t.stateNode != null) e.memoizedProps !== n && Ft(t);
                else {
                    if (typeof n != "string" && t.stateNode === null) throw Error(u(166));
                    if (e = se.current, Wn(t)) {
                        if (e = t.stateNode, a = t.memoizedProps, n = null, i = tt, i !== null) switch (i.tag) {
                            case 27:
                            case 5:
                                n = i.memoizedProps
                        }
                        e[Pe] = t, e = !!(e.nodeValue === a || n !== null && n.suppressHydrationWarning === !0 || X0(e.nodeValue, a)), e || Ba(t)
                    } else e = Wl(e).createTextNode(n), e[Pe] = t, t.stateNode = e
                }
                return Ne(t), null;
            case 13:
                if (n = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                    if (i = Wn(t), n !== null && n.dehydrated !== null) {
                        if (e === null) {
                            if (!i) throw Error(u(318));
                            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(u(317));
                            i[Pe] = t
                        } else In(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
                        Ne(t), i = !1
                    } else i = qc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
                    if (!i) return t.flags & 256 ? ($t(t), t) : ($t(t), null)
                }
                if ($t(t), (t.flags & 128) !== 0) return t.lanes = a, t;
                if (a = n !== null, e = e !== null && e.memoizedState !== null, a) {
                    n = t.child, i = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (i = n.alternate.memoizedState.cachePool.pool);
                    var o = null;
                    n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048)
                }
                return a !== e && a && (t.child.flags |= 8192), Hl(t, t.updateQueue), Ne(t), null;
            case 4:
                return na(), e === null && Mo(t.stateNode.containerInfo), Ne(t), null;
            case 10:
                return Kt(t.type), Ne(t), null;
            case 19:
                if (J(Ye), i = t.memoizedState, i === null) return Ne(t), null;
                if (n = (t.flags & 128) !== 0, o = i.rendering, o === null)
                    if (n) mi(i, !1);
                    else {
                        if (De !== 0 || e !== null && (e.flags & 128) !== 0)
                            for (e = t.child; e !== null;) {
                                if (o = Ll(e), o !== null) {
                                    for (t.flags |= 128, mi(i, !1), e = o.updateQueue, t.updateQueue = e, Hl(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null;) _c(a, e), a = a.sibling;
                                    return Z(Ye, Ye.current & 1 | 2), t.child
                                }
                                e = e.sibling
                            }
                        i.tail !== null && At() > Yl && (t.flags |= 128, n = !0, mi(i, !1), t.lanes = 4194304)
                    }
                else {
                    if (!n)
                        if (e = Ll(o), e !== null) {
                            if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, Hl(t, e), mi(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !we) return Ne(t), null
                        } else 2 * At() - i.renderingStartTime > Yl && a !== 536870912 && (t.flags |= 128, n = !0, mi(i, !1), t.lanes = 4194304);
                    i.isBackwards ? (o.sibling = t.child, t.child = o) : (e = i.last, e !== null ? e.sibling = o : t.child = o, i.last = o)
                }
                return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = At(), t.sibling = null, e = Ye.current, Z(Ye, n ? e & 1 | 2 : e & 1), t) : (Ne(t), null);
            case 22:
            case 23:
                return $t(t), Os(), n = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== n && (t.flags |= 8192) : n && (t.flags |= 8192), n ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Ne(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ne(t), a = t.updateQueue, a !== null && Hl(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), n = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), n !== a && (t.flags |= 2048), e !== null && J(ka), null;
            case 24:
                return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Kt(ke), Ne(t), null;
            case 25:
                return null;
            case 30:
                return null
        }
        throw Error(u(156, t.tag))
    }

    function Cm(e, t) {
        switch (hs(t), t.tag) {
            case 1:
                return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
            case 3:
                return Kt(ke), na(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
            case 26:
            case 27:
            case 5:
                return Fi(t), null;
            case 13:
                if ($t(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
                    if (t.alternate === null) throw Error(u(340));
                    In()
                }
                return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
            case 19:
                return J(Ye), null;
            case 4:
                return na(), null;
            case 10:
                return Kt(t.type), null;
            case 22:
            case 23:
                return $t(t), Os(), e !== null && J(ka), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
            case 24:
                return Kt(ke), null;
            case 25:
                return null;
            default:
                return null
        }
    }

    function If(e, t) {
        switch (hs(t), t.tag) {
            case 3:
                Kt(ke), na();
                break;
            case 26:
            case 27:
            case 5:
                Fi(t);
                break;
            case 4:
                na();
                break;
            case 13:
                $t(t);
                break;
            case 19:
                J(Ye);
                break;
            case 10:
                Kt(t.type);
                break;
            case 22:
            case 23:
                $t(t), Os(), e !== null && J(ka);
                break;
            case 24:
                Kt(ke)
        }
    }

    function pi(e, t) {
        try {
            var a = t.updateQueue,
                n = a !== null ? a.lastEffect : null;
            if (n !== null) {
                var i = n.next;
                a = i;
                do {
                    if ((a.tag & e) === e) {
                        n = void 0;
                        var o = a.create,
                            h = a.inst;
                        n = o(), h.destroy = n
                    }
                    a = a.next
                } while (a !== i)
            }
        } catch (y) {
            Re(t, t.return, y)
        }
    }

    function ga(e, t, a) {
        try {
            var n = t.updateQueue,
                i = n !== null ? n.lastEffect : null;
            if (i !== null) {
                var o = i.next;
                n = o;
                do {
                    if ((n.tag & e) === e) {
                        var h = n.inst,
                            y = h.destroy;
                        if (y !== void 0) {
                            h.destroy = void 0, i = t;
                            var w = a,
                                A = y;
                            try {
                                A()
                            } catch (U) {
                                Re(i, w, U)
                            }
                        }
                    }
                    n = n.next
                } while (n !== o)
            }
        } catch (U) {
            Re(t, t.return, U)
        }
    }

    function e0(e) {
        var t = e.updateQueue;
        if (t !== null) {
            var a = e.stateNode;
            try {
                Gc(t, a)
            } catch (n) {
                Re(e, e.return, n)
            }
        }
    }

    function t0(e, t, a) {
        a.props = Va(e.type, e.memoizedProps), a.state = e.memoizedState;
        try {
            a.componentWillUnmount()
        } catch (n) {
            Re(e, t, n)
        }
    }

    function yi(e, t) {
        try {
            var a = e.ref;
            if (a !== null) {
                switch (e.tag) {
                    case 26:
                    case 27:
                    case 5:
                        var n = e.stateNode;
                        break;
                    case 30:
                        n = e.stateNode;
                        break;
                    default:
                        n = e.stateNode
                }
                typeof a == "function" ? e.refCleanup = a(n) : a.current = n
            }
        } catch (i) {
            Re(e, t, i)
        }
    }

    function zt(e, t) {
        var a = e.ref,
            n = e.refCleanup;
        if (a !== null)
            if (typeof n == "function") try {
                n()
            } catch (i) {
                Re(e, t, i)
            } finally {
                e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null)
            } else if (typeof a == "function") try {
                a(null)
            } catch (i) {
                Re(e, t, i)
            } else a.current = null
    }

    function a0(e) {
        var t = e.type,
            a = e.memoizedProps,
            n = e.stateNode;
        try {
            e: switch (t) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                    a.autoFocus && n.focus();
                    break e;
                case "img":
                    a.src ? n.src = a.src : a.srcSet && (n.srcset = a.srcSet)
            }
        }
        catch (i) {
            Re(e, e.return, i)
        }
    }

    function to(e, t, a) {
        try {
            var n = e.stateNode;
            Qm(n, e.type, a, t), n[at] = t
        } catch (i) {
            Re(e, e.return, i)
        }
    }

    function n0(e) {
        return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && wa(e.type) || e.tag === 4
    }

    function ao(e) {
        e: for (;;) {
            for (; e.sibling === null;) {
                if (e.return === null || n0(e.return)) return null;
                e = e.return
            }
            for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
                if (e.tag === 27 && wa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
                e.child.return = e, e = e.child
            }
            if (!(e.flags & 2)) return e.stateNode
        }
    }

    function no(e, t, a) {
        var n = e.tag;
        if (n === 5 || n === 6) e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = Pl));
        else if (n !== 4 && (n === 27 && wa(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
            for (no(e, t, a), e = e.sibling; e !== null;) no(e, t, a), e = e.sibling
    }

    function Gl(e, t, a) {
        var n = e.tag;
        if (n === 5 || n === 6) e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
        else if (n !== 4 && (n === 27 && wa(e.type) && (a = e.stateNode), e = e.child, e !== null))
            for (Gl(e, t, a), e = e.sibling; e !== null;) Gl(e, t, a), e = e.sibling
    }

    function i0(e) {
        var t = e.stateNode,
            a = e.memoizedProps;
        try {
            for (var n = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
            Fe(t, n, a), t[Pe] = e, t[at] = a
        } catch (o) {
            Re(e, e.return, o)
        }
    }
    var Pt = !1,
        Be = !1,
        io = !1,
        l0 = typeof WeakSet == "function" ? WeakSet : Set,
        Ke = null;

    function Em(e, t) {
        if (e = e.containerInfo, qo = ir, e = mc(e), as(e)) {
            if ("selectionStart" in e) var a = {
                start: e.selectionStart,
                end: e.selectionEnd
            };
            else e: {
                a = (a = e.ownerDocument) && a.defaultView || window;
                var n = a.getSelection && a.getSelection();
                if (n && n.rangeCount !== 0) {
                    a = n.anchorNode;
                    var i = n.anchorOffset,
                        o = n.focusNode;
                    n = n.focusOffset;
                    try {
                        a.nodeType, o.nodeType
                    } catch {
                        a = null;
                        break e
                    }
                    var h = 0,
                        y = -1,
                        w = -1,
                        A = 0,
                        U = 0,
                        k = e,
                        N = null;
                    t: for (;;) {
                        for (var z; k !== a || i !== 0 && k.nodeType !== 3 || (y = h + i), k !== o || n !== 0 && k.nodeType !== 3 || (w = h + n), k.nodeType === 3 && (h += k.nodeValue.length), (z = k.firstChild) !== null;) N = k, k = z;
                        for (;;) {
                            if (k === e) break t;
                            if (N === a && ++A === i && (y = h), N === o && ++U === n && (w = h), (z = k.nextSibling) !== null) break;
                            k = N, N = k.parentNode
                        }
                        k = z
                    }
                    a = y === -1 || w === -1 ? null : {
                        start: y,
                        end: w
                    }
                } else a = null
            }
            a = a || {
                start: 0,
                end: 0
            }
        } else a = null;
        for (Ao = {
                focusedElem: e,
                selectionRange: a
            }, ir = !1, Ke = t; Ke !== null;)
            if (t = Ke, e = t.child, (t.subtreeFlags & 1024) !== 0 && e !== null) e.return = t, Ke = e;
            else
                for (; Ke !== null;) {
                    switch (t = Ke, o = t.alternate, e = t.flags, t.tag) {
                        case 0:
                            break;
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if ((e & 1024) !== 0 && o !== null) {
                                e = void 0, a = t, i = o.memoizedProps, o = o.memoizedState, n = a.stateNode;
                                try {
                                    var le = Va(a.type, i, a.elementType === a.type);
                                    e = n.getSnapshotBeforeUpdate(le, o), n.__reactInternalSnapshotBeforeUpdate = e
                                } catch (ae) {
                                    Re(a, a.return, ae)
                                }
                            }
                            break;
                        case 3:
                            if ((e & 1024) !== 0) {
                                if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9) zo(e);
                                else if (a === 1) switch (e.nodeName) {
                                    case "HEAD":
                                    case "HTML":
                                    case "BODY":
                                        zo(e);
                                        break;
                                    default:
                                        e.textContent = ""
                                }
                            }
                            break;
                        case 5:
                        case 26:
                        case 27:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            if ((e & 1024) !== 0) throw Error(u(163))
                    }
                    if (e = t.sibling, e !== null) {
                        e.return = t.return, Ke = e;
                        break
                    }
                    Ke = t.return
                }
    }

    function r0(e, t, a) {
        var n = a.flags;
        switch (a.tag) {
            case 0:
            case 11:
            case 15:
                ma(e, a), n & 4 && pi(5, a);
                break;
            case 1:
                if (ma(e, a), n & 4)
                    if (e = a.stateNode, t === null) try {
                        e.componentDidMount()
                    } catch (h) {
                        Re(a, a.return, h)
                    } else {
                        var i = Va(a.type, t.memoizedProps);
                        t = t.memoizedState;
                        try {
                            e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate)
                        } catch (h) {
                            Re(a, a.return, h)
                        }
                    }
                n & 64 && e0(a), n & 512 && yi(a, a.return);
                break;
            case 3:
                if (ma(e, a), n & 64 && (e = a.updateQueue, e !== null)) {
                    if (t = null, a.child !== null) switch (a.child.tag) {
                        case 27:
                        case 5:
                            t = a.child.stateNode;
                            break;
                        case 1:
                            t = a.child.stateNode
                    }
                    try {
                        Gc(e, t)
                    } catch (h) {
                        Re(a, a.return, h)
                    }
                }
                break;
            case 27:
                t === null && n & 4 && i0(a);
            case 26:
            case 5:
                ma(e, a), t === null && n & 4 && a0(a), n & 512 && yi(a, a.return);
                break;
            case 12:
                ma(e, a);
                break;
            case 13:
                ma(e, a), n & 4 && u0(e, a), n & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = zm.bind(null, a), Pm(e, a))));
                break;
            case 22:
                if (n = a.memoizedState !== null || Pt, !n) {
                    t = t !== null && t.memoizedState !== null || Be, i = Pt;
                    var o = Be;
                    Pt = n, (Be = t) && !o ? pa(e, a, (a.subtreeFlags & 8772) !== 0) : ma(e, a), Pt = i, Be = o
                }
                break;
            case 30:
                break;
            default:
                ma(e, a)
        }
    }

    function s0(e) {
        var t = e.alternate;
        t !== null && (e.alternate = null, s0(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ur(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
    }
    var Te = null,
        lt = !1;

    function Wt(e, t, a) {
        for (a = a.child; a !== null;) o0(e, t, a), a = a.sibling
    }

    function o0(e, t, a) {
        if (ot && typeof ot.onCommitFiberUnmount == "function") try {
            ot.onCommitFiberUnmount(Bn, a)
        } catch {}
        switch (a.tag) {
            case 26:
                Be || zt(a, t), Wt(e, t, a), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
                break;
            case 27:
                Be || zt(a, t);
                var n = Te,
                    i = lt;
                wa(a.type) && (Te = a.stateNode, lt = !1), Wt(e, t, a), Mi(a.stateNode), Te = n, lt = i;
                break;
            case 5:
                Be || zt(a, t);
            case 6:
                if (n = Te, i = lt, Te = null, Wt(e, t, a), Te = n, lt = i, Te !== null)
                    if (lt) try {
                        (Te.nodeType === 9 ? Te.body : Te.nodeName === "HTML" ? Te.ownerDocument.body : Te).removeChild(a.stateNode)
                    } catch (o) {
                        Re(a, t, o)
                    } else try {
                        Te.removeChild(a.stateNode)
                    } catch (o) {
                        Re(a, t, o)
                    }
                break;
            case 18:
                Te !== null && (lt ? (e = Te, F0(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, a.stateNode), Li(e)) : F0(Te, a.stateNode));
                break;
            case 4:
                n = Te, i = lt, Te = a.stateNode.containerInfo, lt = !0, Wt(e, t, a), Te = n, lt = i;
                break;
            case 0:
            case 11:
            case 14:
            case 15:
                Be || ga(2, a, t), Be || ga(4, a, t), Wt(e, t, a);
                break;
            case 1:
                Be || (zt(a, t), n = a.stateNode, typeof n.componentWillUnmount == "function" && t0(a, t, n)), Wt(e, t, a);
                break;
            case 21:
                Wt(e, t, a);
                break;
            case 22:
                Be = (n = Be) || a.memoizedState !== null, Wt(e, t, a), Be = n;
                break;
            default:
                Wt(e, t, a)
        }
    }

    function u0(e, t) {
        if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
            Li(e)
        } catch (a) {
            Re(t, t.return, a)
        }
    }

    function _m(e) {
        switch (e.tag) {
            case 13:
            case 19:
                var t = e.stateNode;
                return t === null && (t = e.stateNode = new l0), t;
            case 22:
                return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new l0), t;
            default:
                throw Error(u(435, e.tag))
        }
    }

    function lo(e, t) {
        var a = _m(e);
        t.forEach(function(n) {
            var i = Lm.bind(null, e, n);
            a.has(n) || (a.add(n), n.then(i, i))
        })
    }

    function dt(e, t) {
        var a = t.deletions;
        if (a !== null)
            for (var n = 0; n < a.length; n++) {
                var i = a[n],
                    o = e,
                    h = t,
                    y = h;
                e: for (; y !== null;) {
                    switch (y.tag) {
                        case 27:
                            if (wa(y.type)) {
                                Te = y.stateNode, lt = !1;
                                break e
                            }
                            break;
                        case 5:
                            Te = y.stateNode, lt = !1;
                            break e;
                        case 3:
                        case 4:
                            Te = y.stateNode.containerInfo, lt = !0;
                            break e
                    }
                    y = y.return
                }
                if (Te === null) throw Error(u(160));
                o0(o, h, i), Te = null, lt = !1, o = i.alternate, o !== null && (o.return = null), i.return = null
            }
        if (t.subtreeFlags & 13878)
            for (t = t.child; t !== null;) c0(t, e), t = t.sibling
    }
    var Ot = null;

    function c0(e, t) {
        var a = e.alternate,
            n = e.flags;
        switch (e.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
                dt(t, e), ht(e), n & 4 && (ga(3, e, e.return), pi(3, e), ga(5, e, e.return));
                break;
            case 1:
                dt(t, e), ht(e), n & 512 && (Be || a === null || zt(a, a.return)), n & 64 && Pt && (e = e.updateQueue, e !== null && (n = e.callbacks, n !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? n : a.concat(n))));
                break;
            case 26:
                var i = Ot;
                if (dt(t, e), ht(e), n & 512 && (Be || a === null || zt(a, a.return)), n & 4) {
                    var o = a !== null ? a.memoizedState : null;
                    if (n = e.memoizedState, a === null)
                        if (n === null)
                            if (e.stateNode === null) {
                                e: {
                                    n = e.type,
                                    a = e.memoizedProps,
                                    i = i.ownerDocument || i;t: switch (n) {
                                        case "title":
                                            o = i.getElementsByTagName("title")[0], (!o || o[kn] || o[Pe] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = i.createElement(n), i.head.insertBefore(o, i.querySelector("head > title"))), Fe(o, n, a), o[Pe] = e, Qe(o), n = o;
                                            break e;
                                        case "link":
                                            var h = id("link", "href", i).get(n + (a.href || ""));
                                            if (h) {
                                                for (var y = 0; y < h.length; y++)
                                                    if (o = h[y], o.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && o.getAttribute("rel") === (a.rel == null ? null : a.rel) && o.getAttribute("title") === (a.title == null ? null : a.title) && o.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                                                        h.splice(y, 1);
                                                        break t
                                                    }
                                            }
                                            o = i.createElement(n), Fe(o, n, a), i.head.appendChild(o);
                                            break;
                                        case "meta":
                                            if (h = id("meta", "content", i).get(n + (a.content || ""))) {
                                                for (y = 0; y < h.length; y++)
                                                    if (o = h[y], o.getAttribute("content") === (a.content == null ? null : "" + a.content) && o.getAttribute("name") === (a.name == null ? null : a.name) && o.getAttribute("property") === (a.property == null ? null : a.property) && o.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && o.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                                                        h.splice(y, 1);
                                                        break t
                                                    }
                                            }
                                            o = i.createElement(n), Fe(o, n, a), i.head.appendChild(o);
                                            break;
                                        default:
                                            throw Error(u(468, n))
                                    }
                                    o[Pe] = e,
                                    Qe(o),
                                    n = o
                                }
                                e.stateNode = n
                            }
                    else ld(i, e.type, e.stateNode);
                    else e.stateNode = nd(i, n, e.memoizedProps);
                    else o !== n ? (o === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : o.count--, n === null ? ld(i, e.type, e.stateNode) : nd(i, n, e.memoizedProps)) : n === null && e.stateNode !== null && to(e, e.memoizedProps, a.memoizedProps)
                }
                break;
            case 27:
                dt(t, e), ht(e), n & 512 && (Be || a === null || zt(a, a.return)), a !== null && n & 4 && to(e, e.memoizedProps, a.memoizedProps);
                break;
            case 5:
                if (dt(t, e), ht(e), n & 512 && (Be || a === null || zt(a, a.return)), e.flags & 32) {
                    i = e.stateNode;
                    try {
                        en(i, "")
                    } catch (z) {
                        Re(e, e.return, z)
                    }
                }
                n & 4 && e.stateNode != null && (i = e.memoizedProps, to(e, i, a !== null ? a.memoizedProps : i)), n & 1024 && (io = !0);
                break;
            case 6:
                if (dt(t, e), ht(e), n & 4) {
                    if (e.stateNode === null) throw Error(u(162));
                    n = e.memoizedProps, a = e.stateNode;
                    try {
                        a.nodeValue = n
                    } catch (z) {
                        Re(e, e.return, z)
                    }
                }
                break;
            case 3:
                if (tr = null, i = Ot, Ot = Il(t.containerInfo), dt(t, e), Ot = i, ht(e), n & 4 && a !== null && a.memoizedState.isDehydrated) try {
                    Li(t.containerInfo)
                } catch (z) {
                    Re(e, e.return, z)
                }
                io && (io = !1, f0(e));
                break;
            case 4:
                n = Ot, Ot = Il(e.stateNode.containerInfo), dt(t, e), ht(e), Ot = n;
                break;
            case 12:
                dt(t, e), ht(e);
                break;
            case 13:
                dt(t, e), ht(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (fo = At()), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, lo(e, n)));
                break;
            case 22:
                i = e.memoizedState !== null;
                var w = a !== null && a.memoizedState !== null,
                    A = Pt,
                    U = Be;
                if (Pt = A || i, Be = U || w, dt(t, e), Be = U, Pt = A, ht(e), n & 8192) e: for (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (a === null || w || Pt || Be || Qa(e)), a = null, t = e;;) {
                    if (t.tag === 5 || t.tag === 26) {
                        if (a === null) {
                            w = a = t;
                            try {
                                if (o = w.stateNode, i) h = o.style, typeof h.setProperty == "function" ? h.setProperty("display", "none", "important") : h.display = "none";
                                else {
                                    y = w.stateNode;
                                    var k = w.memoizedProps.style,
                                        N = k != null && k.hasOwnProperty("display") ? k.display : null;
                                    y.style.display = N == null || typeof N == "boolean" ? "" : ("" + N).trim()
                                }
                            } catch (z) {
                                Re(w, w.return, z)
                            }
                        }
                    } else if (t.tag === 6) {
                        if (a === null) {
                            w = t;
                            try {
                                w.stateNode.nodeValue = i ? "" : w.memoizedProps
                            } catch (z) {
                                Re(w, w.return, z)
                            }
                        }
                    } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                        t.child.return = t, t = t.child;
                        continue
                    }
                    if (t === e) break e;
                    for (; t.sibling === null;) {
                        if (t.return === null || t.return === e) break e;
                        a === t && (a = null), t = t.return
                    }
                    a === t && (a = null), t.sibling.return = t.return, t = t.sibling
                }
                n & 4 && (n = e.updateQueue, n !== null && (a = n.retryQueue, a !== null && (n.retryQueue = null, lo(e, a))));
                break;
            case 19:
                dt(t, e), ht(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, lo(e, n)));
                break;
            case 30:
                break;
            case 21:
                break;
            default:
                dt(t, e), ht(e)
        }
    }

    function ht(e) {
        var t = e.flags;
        if (t & 2) {
            try {
                for (var a, n = e.return; n !== null;) {
                    if (n0(n)) {
                        a = n;
                        break
                    }
                    n = n.return
                }
                if (a == null) throw Error(u(160));
                switch (a.tag) {
                    case 27:
                        var i = a.stateNode,
                            o = ao(e);
                        Gl(e, o, i);
                        break;
                    case 5:
                        var h = a.stateNode;
                        a.flags & 32 && (en(h, ""), a.flags &= -33);
                        var y = ao(e);
                        Gl(e, y, h);
                        break;
                    case 3:
                    case 4:
                        var w = a.stateNode.containerInfo,
                            A = ao(e);
                        no(e, A, w);
                        break;
                    default:
                        throw Error(u(161))
                }
            } catch (U) {
                Re(e, e.return, U)
            }
            e.flags &= -3
        }
        t & 4096 && (e.flags &= -4097)
    }

    function f0(e) {
        if (e.subtreeFlags & 1024)
            for (e = e.child; e !== null;) {
                var t = e;
                f0(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling
            }
    }

    function ma(e, t) {
        if (t.subtreeFlags & 8772)
            for (t = t.child; t !== null;) r0(e, t.alternate, t), t = t.sibling
    }

    function Qa(e) {
        for (e = e.child; e !== null;) {
            var t = e;
            switch (t.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                    ga(4, t, t.return), Qa(t);
                    break;
                case 1:
                    zt(t, t.return);
                    var a = t.stateNode;
                    typeof a.componentWillUnmount == "function" && t0(t, t.return, a), Qa(t);
                    break;
                case 27:
                    Mi(t.stateNode);
                case 26:
                case 5:
                    zt(t, t.return), Qa(t);
                    break;
                case 22:
                    t.memoizedState === null && Qa(t);
                    break;
                case 30:
                    Qa(t);
                    break;
                default:
                    Qa(t)
            }
            e = e.sibling
        }
    }

    function pa(e, t, a) {
        for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null;) {
            var n = t.alternate,
                i = e,
                o = t,
                h = o.flags;
            switch (o.tag) {
                case 0:
                case 11:
                case 15:
                    pa(i, o, a), pi(4, o);
                    break;
                case 1:
                    if (pa(i, o, a), n = o, i = n.stateNode, typeof i.componentDidMount == "function") try {
                        i.componentDidMount()
                    } catch (A) {
                        Re(n, n.return, A)
                    }
                    if (n = o, i = n.updateQueue, i !== null) {
                        var y = n.stateNode;
                        try {
                            var w = i.shared.hiddenCallbacks;
                            if (w !== null)
                                for (i.shared.hiddenCallbacks = null, i = 0; i < w.length; i++) Hc(w[i], y)
                        } catch (A) {
                            Re(n, n.return, A)
                        }
                    }
                    a && h & 64 && e0(o), yi(o, o.return);
                    break;
                case 27:
                    i0(o);
                case 26:
                case 5:
                    pa(i, o, a), a && n === null && h & 4 && a0(o), yi(o, o.return);
                    break;
                case 12:
                    pa(i, o, a);
                    break;
                case 13:
                    pa(i, o, a), a && h & 4 && u0(i, o);
                    break;
                case 22:
                    o.memoizedState === null && pa(i, o, a), yi(o, o.return);
                    break;
                case 30:
                    break;
                default:
                    pa(i, o, a)
            }
            t = t.sibling
        }
    }

    function ro(e, t) {
        var a = null;
        e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && ai(a))
    }

    function so(e, t) {
        e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ai(e))
    }

    function Lt(e, t, a, n) {
        if (t.subtreeFlags & 10256)
            for (t = t.child; t !== null;) d0(e, t, a, n), t = t.sibling
    }

    function d0(e, t, a, n) {
        var i = t.flags;
        switch (t.tag) {
            case 0:
            case 11:
            case 15:
                Lt(e, t, a, n), i & 2048 && pi(9, t);
                break;
            case 1:
                Lt(e, t, a, n);
                break;
            case 3:
                Lt(e, t, a, n), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ai(e)));
                break;
            case 12:
                if (i & 2048) {
                    Lt(e, t, a, n), e = t.stateNode;
                    try {
                        var o = t.memoizedProps,
                            h = o.id,
                            y = o.onPostCommit;
                        typeof y == "function" && y(h, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0)
                    } catch (w) {
                        Re(t, t.return, w)
                    }
                } else Lt(e, t, a, n);
                break;
            case 13:
                Lt(e, t, a, n);
                break;
            case 23:
                break;
            case 22:
                o = t.stateNode, h = t.alternate, t.memoizedState !== null ? o._visibility & 2 ? Lt(e, t, a, n) : vi(e, t) : o._visibility & 2 ? Lt(e, t, a, n) : (o._visibility |= 2, Sn(e, t, a, n, (t.subtreeFlags & 10256) !== 0)), i & 2048 && ro(h, t);
                break;
            case 24:
                Lt(e, t, a, n), i & 2048 && so(t.alternate, t);
                break;
            default:
                Lt(e, t, a, n)
        }
    }

    function Sn(e, t, a, n, i) {
        for (i = i && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null;) {
            var o = e,
                h = t,
                y = a,
                w = n,
                A = h.flags;
            switch (h.tag) {
                case 0:
                case 11:
                case 15:
                    Sn(o, h, y, w, i), pi(8, h);
                    break;
                case 23:
                    break;
                case 22:
                    var U = h.stateNode;
                    h.memoizedState !== null ? U._visibility & 2 ? Sn(o, h, y, w, i) : vi(o, h) : (U._visibility |= 2, Sn(o, h, y, w, i)), i && A & 2048 && ro(h.alternate, h);
                    break;
                case 24:
                    Sn(o, h, y, w, i), i && A & 2048 && so(h.alternate, h);
                    break;
                default:
                    Sn(o, h, y, w, i)
            }
            t = t.sibling
        }
    }

    function vi(e, t) {
        if (t.subtreeFlags & 10256)
            for (t = t.child; t !== null;) {
                var a = e,
                    n = t,
                    i = n.flags;
                switch (n.tag) {
                    case 22:
                        vi(a, n), i & 2048 && ro(n.alternate, n);
                        break;
                    case 24:
                        vi(a, n), i & 2048 && so(n.alternate, n);
                        break;
                    default:
                        vi(a, n)
                }
                t = t.sibling
            }
    }
    var bi = 8192;

    function xn(e) {
        if (e.subtreeFlags & bi)
            for (e = e.child; e !== null;) h0(e), e = e.sibling
    }

    function h0(e) {
        switch (e.tag) {
            case 26:
                xn(e), e.flags & bi && e.memoizedState !== null && c2(Ot, e.memoizedState, e.memoizedProps);
                break;
            case 5:
                xn(e);
                break;
            case 3:
            case 4:
                var t = Ot;
                Ot = Il(e.stateNode.containerInfo), xn(e), Ot = t;
                break;
            case 22:
                e.memoizedState === null && (t = e.alternate, t !== null && t.memoizedState !== null ? (t = bi, bi = 16777216, xn(e), bi = t) : xn(e));
                break;
            default:
                xn(e)
        }
    }

    function g0(e) {
        var t = e.alternate;
        if (t !== null && (e = t.child, e !== null)) {
            t.child = null;
            do t = e.sibling, e.sibling = null, e = t; while (e !== null)
        }
    }

    function Si(e) {
        var t = e.deletions;
        if ((e.flags & 16) !== 0) {
            if (t !== null)
                for (var a = 0; a < t.length; a++) {
                    var n = t[a];
                    Ke = n, p0(n, e)
                }
            g0(e)
        }
        if (e.subtreeFlags & 10256)
            for (e = e.child; e !== null;) m0(e), e = e.sibling
    }

    function m0(e) {
        switch (e.tag) {
            case 0:
            case 11:
            case 15:
                Si(e), e.flags & 2048 && ga(9, e, e.return);
                break;
            case 3:
                Si(e);
                break;
            case 12:
                Si(e);
                break;
            case 22:
                var t = e.stateNode;
                e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, kl(e)) : Si(e);
                break;
            default:
                Si(e)
        }
    }

    function kl(e) {
        var t = e.deletions;
        if ((e.flags & 16) !== 0) {
            if (t !== null)
                for (var a = 0; a < t.length; a++) {
                    var n = t[a];
                    Ke = n, p0(n, e)
                }
            g0(e)
        }
        for (e = e.child; e !== null;) {
            switch (t = e, t.tag) {
                case 0:
                case 11:
                case 15:
                    ga(8, t, t.return), kl(t);
                    break;
                case 22:
                    a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, kl(t));
                    break;
                default:
                    kl(t)
            }
            e = e.sibling
        }
    }

    function p0(e, t) {
        for (; Ke !== null;) {
            var a = Ke;
            switch (a.tag) {
                case 0:
                case 11:
                case 15:
                    ga(8, a, t);
                    break;
                case 23:
                case 22:
                    if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
                        var n = a.memoizedState.cachePool.pool;
                        n != null && n.refCount++
                    }
                    break;
                case 24:
                    ai(a.memoizedState.cache)
            }
            if (n = a.child, n !== null) n.return = a, Ke = n;
            else e: for (a = e; Ke !== null;) {
                n = Ke;
                var i = n.sibling,
                    o = n.return;
                if (s0(n), n === a) {
                    Ke = null;
                    break e
                }
                if (i !== null) {
                    i.return = o, Ke = i;
                    break e
                }
                Ke = o
            }
        }
    }
    var Mm = {
            getCacheForType: function(e) {
                var t = We(ke),
                    a = t.data.get(e);
                return a === void 0 && (a = e(), t.data.set(e, a)), a
            }
        },
        Om = typeof WeakMap == "function" ? WeakMap : Map,
        Ce = 0,
        qe = null,
        de = null,
        ye = 0,
        Ee = 0,
        gt = null,
        ya = !1,
        wn = !1,
        oo = !1,
        It = 0,
        De = 0,
        va = 0,
        Xa = 0,
        uo = 0,
        Et = 0,
        Cn = 0,
        xi = null,
        rt = null,
        co = !1,
        fo = 0,
        Yl = 1 / 0,
        Vl = null,
        ba = null,
        Je = 0,
        Sa = null,
        En = null,
        _n = 0,
        ho = 0,
        go = null,
        y0 = null,
        wi = 0,
        mo = null;

    function mt() {
        if ((Ce & 2) !== 0 && ye !== 0) return ye & -ye;
        if (j.T !== null) {
            var e = dn;
            return e !== 0 ? e : wo()
        }
        return Nu()
    }

    function v0() {
        Et === 0 && (Et = (ye & 536870912) === 0 || we ? Ru() : 536870912);
        var e = Ct.current;
        return e !== null && (e.flags |= 32), Et
    }

    function pt(e, t, a) {
        (e === qe && (Ee === 2 || Ee === 9) || e.cancelPendingCommit !== null) && (Mn(e, 0), xa(e, ye, Et, !1)), Gn(e, a), ((Ce & 2) === 0 || e !== qe) && (e === qe && ((Ce & 2) === 0 && (Xa |= a), De === 4 && xa(e, ye, Et, !1)), Dt(e))
    }

    function b0(e, t, a) {
        if ((Ce & 6) !== 0) throw Error(u(327));
        var n = !a && (t & 124) === 0 && (t & e.expiredLanes) === 0 || Hn(e, t),
            i = n ? Am(e, t) : vo(e, t, !0),
            o = n;
        do {
            if (i === 0) {
                wn && !n && xa(e, t, 0, !1);
                break
            } else {
                if (a = e.current.alternate, o && !Rm(a)) {
                    i = vo(e, t, !1), o = !1;
                    continue
                }
                if (i === 2) {
                    if (o = t, e.errorRecoveryDisabledLanes & o) var h = 0;
                    else h = e.pendingLanes & -536870913, h = h !== 0 ? h : h & 536870912 ? 536870912 : 0;
                    if (h !== 0) {
                        t = h;
                        e: {
                            var y = e;i = xi;
                            var w = y.current.memoizedState.isDehydrated;
                            if (w && (Mn(y, h).flags |= 256), h = vo(y, h, !1), h !== 2) {
                                if (oo && !w) {
                                    y.errorRecoveryDisabledLanes |= o, Xa |= o, i = 4;
                                    break e
                                }
                                o = rt, rt = i, o !== null && (rt === null ? rt = o : rt.push.apply(rt, o))
                            }
                            i = h
                        }
                        if (o = !1, i !== 2) continue
                    }
                }
                if (i === 1) {
                    Mn(e, 0), xa(e, t, 0, !0);
                    break
                }
                e: {
                    switch (n = e, o = i, o) {
                        case 0:
                        case 1:
                            throw Error(u(345));
                        case 4:
                            if ((t & 4194048) !== t) break;
                        case 6:
                            xa(n, t, Et, !ya);
                            break e;
                        case 2:
                            rt = null;
                            break;
                        case 3:
                        case 5:
                            break;
                        default:
                            throw Error(u(329))
                    }
                    if ((t & 62914560) === t && (i = fo + 300 - At(), 10 < i)) {
                        if (xa(n, t, Et, !ya), el(n, 0, !0) !== 0) break e;
                        n.timeoutHandle = $0(S0.bind(null, n, a, rt, Vl, co, t, Et, Xa, Cn, ya, o, 2, -0, 0), i);
                        break e
                    }
                    S0(n, a, rt, Vl, co, t, Et, Xa, Cn, ya, o, 0, -0, 0)
                }
            }
            break
        } while (!0);
        Dt(e)
    }

    function S0(e, t, a, n, i, o, h, y, w, A, U, k, N, z) {
        if (e.timeoutHandle = -1, k = t.subtreeFlags, (k & 8192 || (k & 16785408) === 16785408) && (qi = {
                stylesheets: null,
                count: 0,
                unsuspend: u2
            }, h0(t), k = f2(), k !== null)) {
            e.cancelPendingCommit = k(O0.bind(null, e, t, o, a, n, i, h, y, w, U, 1, N, z)), xa(e, o, h, !A);
            return
        }
        O0(e, t, o, a, n, i, h, y, w)
    }

    function Rm(e) {
        for (var t = e;;) {
            var a = t.tag;
            if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
                for (var n = 0; n < a.length; n++) {
                    var i = a[n],
                        o = i.getSnapshot;
                    i = i.value;
                    try {
                        if (!ct(o(), i)) return !1
                    } catch {
                        return !1
                    }
                }
            if (a = t.child, t.subtreeFlags & 16384 && a !== null) a.return = t, t = a;
            else {
                if (t === e) break;
                for (; t.sibling === null;) {
                    if (t.return === null || t.return === e) return !0;
                    t = t.return
                }
                t.sibling.return = t.return, t = t.sibling
            }
        }
        return !0
    }

    function xa(e, t, a, n) {
        t &= ~uo, t &= ~Xa, e.suspendedLanes |= t, e.pingedLanes &= ~t, n && (e.warmLanes |= t), n = e.expirationTimes;
        for (var i = t; 0 < i;) {
            var o = 31 - ut(i),
                h = 1 << o;
            n[o] = -1, i &= ~h
        }
        a !== 0 && Au(e, a, t)
    }

    function Ql() {
        return (Ce & 6) === 0 ? (Ci(0), !1) : !0
    }

    function po() {
        if (de !== null) {
            if (Ee === 0) var e = de.return;
            else e = de, Xt = Ha = null, Ns(e), vn = null, hi = 0, e = de;
            for (; e !== null;) If(e.alternate, e), e = e.return;
            de = null
        }
    }

    function Mn(e, t) {
        var a = e.timeoutHandle;
        a !== -1 && (e.timeoutHandle = -1, Km(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), po(), qe = e, de = a = Yt(e.current, null), ye = t, Ee = 0, gt = null, ya = !1, wn = Hn(e, t), oo = !1, Cn = Et = uo = Xa = va = De = 0, rt = xi = null, co = !1, (t & 8) !== 0 && (t |= t & 32);
        var n = e.entangledLanes;
        if (n !== 0)
            for (e = e.entanglements, n &= t; 0 < n;) {
                var i = 31 - ut(n),
                    o = 1 << i;
                t |= e[i], n &= ~o
            }
        return It = t, dl(), a
    }

    function x0(e, t) {
        ce = null, j.H = Tl, t === ii || t === xl ? (t = Uc(), Ee = 3) : t === Lc ? (t = Uc(), Ee = 4) : Ee = t === Hf ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, gt = t, de === null && (De = 1, jl(e, bt(t, e.current)))
    }

    function w0() {
        var e = j.H;
        return j.H = Tl, e === null ? Tl : e
    }

    function C0() {
        var e = j.A;
        return j.A = Mm, e
    }

    function yo() {
        De = 4, ya || (ye & 4194048) !== ye && Ct.current !== null || (wn = !0), (va & 134217727) === 0 && (Xa & 134217727) === 0 || qe === null || xa(qe, ye, Et, !1)
    }

    function vo(e, t, a) {
        var n = Ce;
        Ce |= 2;
        var i = w0(),
            o = C0();
        (qe !== e || ye !== t) && (Vl = null, Mn(e, t)), t = !1;
        var h = De;
        e: do try {
                if (Ee !== 0 && de !== null) {
                    var y = de,
                        w = gt;
                    switch (Ee) {
                        case 8:
                            po(), h = 6;
                            break e;
                        case 3:
                        case 2:
                        case 9:
                        case 6:
                            Ct.current === null && (t = !0);
                            var A = Ee;
                            if (Ee = 0, gt = null, On(e, y, w, A), a && wn) {
                                h = 0;
                                break e
                            }
                            break;
                        default:
                            A = Ee, Ee = 0, gt = null, On(e, y, w, A)
                    }
                }
                qm(), h = De;
                break
            } catch (U) {
                x0(e, U)
            }
            while (!0);
            return t && e.shellSuspendCounter++, Xt = Ha = null, Ce = n, j.H = i, j.A = o, de === null && (qe = null, ye = 0, dl()), h
    }

    function qm() {
        for (; de !== null;) E0(de)
    }

    function Am(e, t) {
        var a = Ce;
        Ce |= 2;
        var n = w0(),
            i = C0();
        qe !== e || ye !== t ? (Vl = null, Yl = At() + 500, Mn(e, t)) : wn = Hn(e, t);
        e: do try {
                if (Ee !== 0 && de !== null) {
                    t = de;
                    var o = gt;
                    t: switch (Ee) {
                        case 1:
                            Ee = 0, gt = null, On(e, t, o, 1);
                            break;
                        case 2:
                        case 9:
                            if (Dc(o)) {
                                Ee = 0, gt = null, _0(t);
                                break
                            }
                            t = function() {
                                Ee !== 2 && Ee !== 9 || qe !== e || (Ee = 7), Dt(e)
                            }, o.then(t, t);
                            break e;
                        case 3:
                            Ee = 7;
                            break e;
                        case 4:
                            Ee = 5;
                            break e;
                        case 7:
                            Dc(o) ? (Ee = 0, gt = null, _0(t)) : (Ee = 0, gt = null, On(e, t, o, 7));
                            break;
                        case 5:
                            var h = null;
                            switch (de.tag) {
                                case 26:
                                    h = de.memoizedState;
                                case 5:
                                case 27:
                                    var y = de;
                                    if (!h || rd(h)) {
                                        Ee = 0, gt = null;
                                        var w = y.sibling;
                                        if (w !== null) de = w;
                                        else {
                                            var A = y.return;
                                            A !== null ? (de = A, Xl(A)) : de = null
                                        }
                                        break t
                                    }
                            }
                            Ee = 0, gt = null, On(e, t, o, 5);
                            break;
                        case 6:
                            Ee = 0, gt = null, On(e, t, o, 6);
                            break;
                        case 8:
                            po(), De = 6;
                            break e;
                        default:
                            throw Error(u(462))
                    }
                }
                Tm();
                break
            } catch (U) {
                x0(e, U)
            }
            while (!0);
            return Xt = Ha = null, j.H = n, j.A = i, Ce = a, de !== null ? 0 : (qe = null, ye = 0, dl(), De)
    }

    function Tm() {
        for (; de !== null && !Ih();) E0(de)
    }

    function E0(e) {
        var t = Pf(e.alternate, e, It);
        e.memoizedProps = e.pendingProps, t === null ? Xl(e) : de = t
    }

    function _0(e) {
        var t = e,
            a = t.alternate;
        switch (t.tag) {
            case 15:
            case 0:
                t = Xf(a, t, t.pendingProps, t.type, void 0, ye);
                break;
            case 11:
                t = Xf(a, t, t.pendingProps, t.type.render, t.ref, ye);
                break;
            case 5:
                Ns(t);
            default:
                If(a, t), t = de = _c(t, It), t = Pf(a, t, It)
        }
        e.memoizedProps = e.pendingProps, t === null ? Xl(e) : de = t
    }

    function On(e, t, a, n) {
        Xt = Ha = null, Ns(t), vn = null, hi = 0;
        var i = t.return;
        try {
            if (Sm(e, i, t, a, ye)) {
                De = 1, jl(e, bt(a, e.current)), de = null;
                return
            }
        } catch (o) {
            if (i !== null) throw de = i, o;
            De = 1, jl(e, bt(a, e.current)), de = null;
            return
        }
        t.flags & 32768 ? (we || n === 1 ? e = !0 : wn || (ye & 536870912) !== 0 ? e = !1 : (ya = e = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = Ct.current, n !== null && n.tag === 13 && (n.flags |= 16384))), M0(t, e)) : Xl(t)
    }

    function Xl(e) {
        var t = e;
        do {
            if ((t.flags & 32768) !== 0) {
                M0(t, ya);
                return
            }
            e = t.return;
            var a = wm(t.alternate, t, It);
            if (a !== null) {
                de = a;
                return
            }
            if (t = t.sibling, t !== null) {
                de = t;
                return
            }
            de = t = e
        } while (t !== null);
        De === 0 && (De = 5)
    }

    function M0(e, t) {
        do {
            var a = Cm(e.alternate, e);
            if (a !== null) {
                a.flags &= 32767, de = a;
                return
            }
            if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
                de = e;
                return
            }
            de = e = a
        } while (e !== null);
        De = 6, de = null
    }

    function O0(e, t, a, n, i, o, h, y, w) {
        e.cancelPendingCommit = null;
        do Kl(); while (Je !== 0);
        if ((Ce & 6) !== 0) throw Error(u(327));
        if (t !== null) {
            if (t === e.current) throw Error(u(177));
            if (o = t.lanes | t.childLanes, o |= ss, ug(e, a, o, h, y, w), e === qe && (de = qe = null, ye = 0), En = t, Sa = e, _n = a, ho = o, go = i, y0 = n, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Dm(Pi, function() {
                    return N0(), null
                })) : (e.callbackNode = null, e.callbackPriority = 0), n = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || n) {
                n = j.T, j.T = null, i = X.p, X.p = 2, h = Ce, Ce |= 4;
                try {
                    Em(e, t, a)
                } finally {
                    Ce = h, X.p = i, j.T = n
                }
            }
            Je = 1, R0(), q0(), A0()
        }
    }

    function R0() {
        if (Je === 1) {
            Je = 0;
            var e = Sa,
                t = En,
                a = (t.flags & 13878) !== 0;
            if ((t.subtreeFlags & 13878) !== 0 || a) {
                a = j.T, j.T = null;
                var n = X.p;
                X.p = 2;
                var i = Ce;
                Ce |= 4;
                try {
                    c0(t, e);
                    var o = Ao,
                        h = mc(e.containerInfo),
                        y = o.focusedElem,
                        w = o.selectionRange;
                    if (h !== y && y && y.ownerDocument && gc(y.ownerDocument.documentElement, y)) {
                        if (w !== null && as(y)) {
                            var A = w.start,
                                U = w.end;
                            if (U === void 0 && (U = A), "selectionStart" in y) y.selectionStart = A, y.selectionEnd = Math.min(U, y.value.length);
                            else {
                                var k = y.ownerDocument || document,
                                    N = k && k.defaultView || window;
                                if (N.getSelection) {
                                    var z = N.getSelection(),
                                        le = y.textContent.length,
                                        ae = Math.min(w.start, le),
                                        Oe = w.end === void 0 ? ae : Math.min(w.end, le);
                                    !z.extend && ae > Oe && (h = Oe, Oe = ae, ae = h);
                                    var R = hc(y, ae),
                                        O = hc(y, Oe);
                                    if (R && O && (z.rangeCount !== 1 || z.anchorNode !== R.node || z.anchorOffset !== R.offset || z.focusNode !== O.node || z.focusOffset !== O.offset)) {
                                        var q = k.createRange();
                                        q.setStart(R.node, R.offset), z.removeAllRanges(), ae > Oe ? (z.addRange(q), z.extend(O.node, O.offset)) : (q.setEnd(O.node, O.offset), z.addRange(q))
                                    }
                                }
                            }
                        }
                        for (k = [], z = y; z = z.parentNode;) z.nodeType === 1 && k.push({
                            element: z,
                            left: z.scrollLeft,
                            top: z.scrollTop
                        });
                        for (typeof y.focus == "function" && y.focus(), y = 0; y < k.length; y++) {
                            var B = k[y];
                            B.element.scrollLeft = B.left, B.element.scrollTop = B.top
                        }
                    }
                    ir = !!qo, Ao = qo = null
                } finally {
                    Ce = i, X.p = n, j.T = a
                }
            }
            e.current = t, Je = 2
        }
    }

    function q0() {
        if (Je === 2) {
            Je = 0;
            var e = Sa,
                t = En,
                a = (t.flags & 8772) !== 0;
            if ((t.subtreeFlags & 8772) !== 0 || a) {
                a = j.T, j.T = null;
                var n = X.p;
                X.p = 2;
                var i = Ce;
                Ce |= 4;
                try {
                    r0(e, t.alternate, t)
                } finally {
                    Ce = i, X.p = n, j.T = a
                }
            }
            Je = 3
        }
    }

    function A0() {
        if (Je === 4 || Je === 3) {
            Je = 0, eg();
            var e = Sa,
                t = En,
                a = _n,
                n = y0;
            (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Je = 5 : (Je = 0, En = Sa = null, T0(e, e.pendingLanes));
            var i = e.pendingLanes;
            if (i === 0 && (ba = null), Dr(a), t = t.stateNode, ot && typeof ot.onCommitFiberRoot == "function") try {
                ot.onCommitFiberRoot(Bn, t, void 0, (t.current.flags & 128) === 128)
            } catch {}
            if (n !== null) {
                t = j.T, i = X.p, X.p = 2, j.T = null;
                try {
                    for (var o = e.onRecoverableError, h = 0; h < n.length; h++) {
                        var y = n[h];
                        o(y.value, {
                            componentStack: y.stack
                        })
                    }
                } finally {
                    j.T = t, X.p = i
                }
            }(_n & 3) !== 0 && Kl(), Dt(e), i = e.pendingLanes, (a & 4194090) !== 0 && (i & 42) !== 0 ? e === mo ? wi++ : (wi = 0, mo = e) : wi = 0, Ci(0)
        }
    }

    function T0(e, t) {
        (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ai(t)))
    }

    function Kl(e) {
        return R0(), q0(), A0(), N0()
    }

    function N0() {
        if (Je !== 5) return !1;
        var e = Sa,
            t = ho;
        ho = 0;
        var a = Dr(_n),
            n = j.T,
            i = X.p;
        try {
            X.p = 32 > a ? 32 : a, j.T = null, a = go, go = null;
            var o = Sa,
                h = _n;
            if (Je = 0, En = Sa = null, _n = 0, (Ce & 6) !== 0) throw Error(u(331));
            var y = Ce;
            if (Ce |= 4, m0(o.current), d0(o, o.current, h, a), Ce = y, Ci(0, !1), ot && typeof ot.onPostCommitFiberRoot == "function") try {
                ot.onPostCommitFiberRoot(Bn, o)
            } catch {}
            return !0
        } finally {
            X.p = i, j.T = n, T0(e, t)
        }
    }

    function z0(e, t, a) {
        t = bt(a, t), t = Ks(e.stateNode, t, 2), e = ca(e, t, 2), e !== null && (Gn(e, 2), Dt(e))
    }

    function Re(e, t, a) {
        if (e.tag === 3) z0(e, e, a);
        else
            for (; t !== null;) {
                if (t.tag === 3) {
                    z0(t, e, a);
                    break
                } else if (t.tag === 1) {
                    var n = t.stateNode;
                    if (typeof t.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (ba === null || !ba.has(n))) {
                        e = bt(a, e), a = Uf(2), n = ca(t, a, 2), n !== null && (Bf(a, n, t, e), Gn(n, 2), Dt(n));
                        break
                    }
                }
                t = t.return
            }
    }

    function bo(e, t, a) {
        var n = e.pingCache;
        if (n === null) {
            n = e.pingCache = new Om;
            var i = new Set;
            n.set(t, i)
        } else i = n.get(t), i === void 0 && (i = new Set, n.set(t, i));
        i.has(a) || (oo = !0, i.add(a), e = Nm.bind(null, e, t, a), t.then(e, e))
    }

    function Nm(e, t, a) {
        var n = e.pingCache;
        n !== null && n.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, qe === e && (ye & a) === a && (De === 4 || De === 3 && (ye & 62914560) === ye && 300 > At() - fo ? (Ce & 2) === 0 && Mn(e, 0) : uo |= a, Cn === ye && (Cn = 0)), Dt(e)
    }

    function L0(e, t) {
        t === 0 && (t = qu()), e = on(e, t), e !== null && (Gn(e, t), Dt(e))
    }

    function zm(e) {
        var t = e.memoizedState,
            a = 0;
        t !== null && (a = t.retryLane), L0(e, a)
    }

    function Lm(e, t) {
        var a = 0;
        switch (e.tag) {
            case 13:
                var n = e.stateNode,
                    i = e.memoizedState;
                i !== null && (a = i.retryLane);
                break;
            case 19:
                n = e.stateNode;
                break;
            case 22:
                n = e.stateNode._retryCache;
                break;
            default:
                throw Error(u(314))
        }
        n !== null && n.delete(t), L0(e, a)
    }

    function Dm(e, t) {
        return Tr(e, t)
    }
    var Zl = null,
        Rn = null,
        So = !1,
        $l = !1,
        xo = !1,
        Ka = 0;

    function Dt(e) {
        e !== Rn && e.next === null && (Rn === null ? Zl = Rn = e : Rn = Rn.next = e), $l = !0, So || (So = !0, Um())
    }

    function Ci(e, t) {
        if (!xo && $l) {
            xo = !0;
            do
                for (var a = !1, n = Zl; n !== null;) {
                    if (e !== 0) {
                        var i = n.pendingLanes;
                        if (i === 0) var o = 0;
                        else {
                            var h = n.suspendedLanes,
                                y = n.pingedLanes;
                            o = (1 << 31 - ut(42 | e) + 1) - 1, o &= i & ~(h & ~y), o = o & 201326741 ? o & 201326741 | 1 : o ? o | 2 : 0
                        }
                        o !== 0 && (a = !0, B0(n, o))
                    } else o = ye, o = el(n, n === qe ? o : 0, n.cancelPendingCommit !== null || n.timeoutHandle !== -1), (o & 3) === 0 || Hn(n, o) || (a = !0, B0(n, o));
                    n = n.next
                }
            while (a);
            xo = !1
        }
    }

    function jm() {
        D0()
    }

    function D0() {
        $l = So = !1;
        var e = 0;
        Ka !== 0 && (Xm() && (e = Ka), Ka = 0);
        for (var t = At(), a = null, n = Zl; n !== null;) {
            var i = n.next,
                o = j0(n, t);
            o === 0 ? (n.next = null, a === null ? Zl = i : a.next = i, i === null && (Rn = a)) : (a = n, (e !== 0 || (o & 3) !== 0) && ($l = !0)), n = i
        }
        Ci(e)
    }

    function j0(e, t) {
        for (var a = e.suspendedLanes, n = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes & -62914561; 0 < o;) {
            var h = 31 - ut(o),
                y = 1 << h,
                w = i[h];
            w === -1 ? ((y & a) === 0 || (y & n) !== 0) && (i[h] = og(y, t)) : w <= t && (e.expiredLanes |= y), o &= ~y
        }
        if (t = qe, a = ye, a = el(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n = e.callbackNode, a === 0 || e === t && (Ee === 2 || Ee === 9) || e.cancelPendingCommit !== null) return n !== null && n !== null && Nr(n), e.callbackNode = null, e.callbackPriority = 0;
        if ((a & 3) === 0 || Hn(e, a)) {
            if (t = a & -a, t === e.callbackPriority) return t;
            switch (n !== null && Nr(n), Dr(a)) {
                case 2:
                case 8:
                    a = Mu;
                    break;
                case 32:
                    a = Pi;
                    break;
                case 268435456:
                    a = Ou;
                    break;
                default:
                    a = Pi
            }
            return n = U0.bind(null, e), a = Tr(a, n), e.callbackPriority = t, e.callbackNode = a, t
        }
        return n !== null && n !== null && Nr(n), e.callbackPriority = 2, e.callbackNode = null, 2
    }

    function U0(e, t) {
        if (Je !== 0 && Je !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
        var a = e.callbackNode;
        if (Kl() && e.callbackNode !== a) return null;
        var n = ye;
        return n = el(e, e === qe ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n === 0 ? null : (b0(e, n, t), j0(e, At()), e.callbackNode != null && e.callbackNode === a ? U0.bind(null, e) : null)
    }

    function B0(e, t) {
        if (Kl()) return null;
        b0(e, t, !0)
    }

    function Um() {
        Zm(function() {
            (Ce & 6) !== 0 ? Tr(_u, jm) : D0()
        })
    }

    function wo() {
        return Ka === 0 && (Ka = Ru()), Ka
    }

    function H0(e) {
        return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ll("" + e)
    }

    function G0(e, t) {
        var a = t.ownerDocument.createElement("input");
        return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e
    }

    function Bm(e, t, a, n, i) {
        if (t === "submit" && a && a.stateNode === i) {
            var o = H0((i[at] || null).action),
                h = n.submitter;
            h && (t = (t = h[at] || null) ? H0(t.formAction) : h.getAttribute("formAction"), t !== null && (o = t, h = null));
            var y = new ul("action", "action", null, n, i);
            e.push({
                event: y,
                listeners: [{
                    instance: null,
                    listener: function() {
                        if (n.defaultPrevented) {
                            if (Ka !== 0) {
                                var w = h ? G0(i, h) : new FormData(i);
                                ks(a, {
                                    pending: !0,
                                    data: w,
                                    method: i.method,
                                    action: o
                                }, null, w)
                            }
                        } else typeof o == "function" && (y.preventDefault(), w = h ? G0(i, h) : new FormData(i), ks(a, {
                            pending: !0,
                            data: w,
                            method: i.method,
                            action: o
                        }, o, w))
                    },
                    currentTarget: i
                }]
            })
        }
    }
    for (var Co = 0; Co < rs.length; Co++) {
        var Eo = rs[Co],
            Hm = Eo.toLowerCase(),
            Gm = Eo[0].toUpperCase() + Eo.slice(1);
        Mt(Hm, "on" + Gm)
    }
    Mt(vc, "onAnimationEnd"), Mt(bc, "onAnimationIteration"), Mt(Sc, "onAnimationStart"), Mt("dblclick", "onDoubleClick"), Mt("focusin", "onFocus"), Mt("focusout", "onBlur"), Mt(nm, "onTransitionRun"), Mt(im, "onTransitionStart"), Mt(lm, "onTransitionCancel"), Mt(xc, "onTransitionEnd"), Pa("onMouseEnter", ["mouseout", "mouseover"]), Pa("onMouseLeave", ["mouseout", "mouseover"]), Pa("onPointerEnter", ["pointerout", "pointerover"]), Pa("onPointerLeave", ["pointerout", "pointerover"]), Aa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Aa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Aa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Aa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Aa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Aa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Ei = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
        km = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ei));

    function k0(e, t) {
        t = (t & 4) !== 0;
        for (var a = 0; a < e.length; a++) {
            var n = e[a],
                i = n.event;
            n = n.listeners;
            e: {
                var o = void 0;
                if (t)
                    for (var h = n.length - 1; 0 <= h; h--) {
                        var y = n[h],
                            w = y.instance,
                            A = y.currentTarget;
                        if (y = y.listener, w !== o && i.isPropagationStopped()) break e;
                        o = y, i.currentTarget = A;
                        try {
                            o(i)
                        } catch (U) {
                            Dl(U)
                        }
                        i.currentTarget = null, o = w
                    } else
                        for (h = 0; h < n.length; h++) {
                            if (y = n[h], w = y.instance, A = y.currentTarget, y = y.listener, w !== o && i.isPropagationStopped()) break e;
                            o = y, i.currentTarget = A;
                            try {
                                o(i)
                            } catch (U) {
                                Dl(U)
                            }
                            i.currentTarget = null, o = w
                        }
            }
        }
    }

    function he(e, t) {
        var a = t[jr];
        a === void 0 && (a = t[jr] = new Set);
        var n = e + "__bubble";
        a.has(n) || (Y0(t, e, 2, !1), a.add(n))
    }

    function _o(e, t, a) {
        var n = 0;
        t && (n |= 4), Y0(a, e, n, t)
    }
    var Jl = "_reactListening" + Math.random().toString(36).slice(2);

    function Mo(e) {
        if (!e[Jl]) {
            e[Jl] = !0, Lu.forEach(function(a) {
                a !== "selectionchange" && (km.has(a) || _o(a, !1, e), _o(a, !0, e))
            });
            var t = e.nodeType === 9 ? e : e.ownerDocument;
            t === null || t[Jl] || (t[Jl] = !0, _o("selectionchange", !1, t))
        }
    }

    function Y0(e, t, a, n) {
        switch (dd(t)) {
            case 2:
                var i = g2;
                break;
            case 8:
                i = m2;
                break;
            default:
                i = Go
        }
        a = i.bind(null, t, a, e), i = void 0, !Zr || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), n ? i !== void 0 ? e.addEventListener(t, a, {
            capture: !0,
            passive: i
        }) : e.addEventListener(t, a, !0) : i !== void 0 ? e.addEventListener(t, a, {
            passive: i
        }) : e.addEventListener(t, a, !1)
    }

    function Oo(e, t, a, n, i) {
        var o = n;
        if ((t & 1) === 0 && (t & 2) === 0 && n !== null) e: for (;;) {
            if (n === null) return;
            var h = n.tag;
            if (h === 3 || h === 4) {
                var y = n.stateNode.containerInfo;
                if (y === i) break;
                if (h === 4)
                    for (h = n.return; h !== null;) {
                        var w = h.tag;
                        if ((w === 3 || w === 4) && h.stateNode.containerInfo === i) return;
                        h = h.return
                    }
                for (; y !== null;) {
                    if (h = $a(y), h === null) return;
                    if (w = h.tag, w === 5 || w === 6 || w === 26 || w === 27) {
                        n = o = h;
                        continue e
                    }
                    y = y.parentNode
                }
            }
            n = n.return
        }
        $u(function() {
            var A = o,
                U = Xr(a),
                k = [];
            e: {
                var N = wc.get(e);
                if (N !== void 0) {
                    var z = ul,
                        le = e;
                    switch (e) {
                        case "keypress":
                            if (sl(a) === 0) break e;
                        case "keydown":
                        case "keyup":
                            z = Dg;
                            break;
                        case "focusin":
                            le = "focus", z = Pr;
                            break;
                        case "focusout":
                            le = "blur", z = Pr;
                            break;
                        case "beforeblur":
                        case "afterblur":
                            z = Pr;
                            break;
                        case "click":
                            if (a.button === 2) break e;
                        case "auxclick":
                        case "dblclick":
                        case "mousedown":
                        case "mousemove":
                        case "mouseup":
                        case "mouseout":
                        case "mouseover":
                        case "contextmenu":
                            z = Pu;
                            break;
                        case "drag":
                        case "dragend":
                        case "dragenter":
                        case "dragexit":
                        case "dragleave":
                        case "dragover":
                        case "dragstart":
                        case "drop":
                            z = Cg;
                            break;
                        case "touchcancel":
                        case "touchend":
                        case "touchmove":
                        case "touchstart":
                            z = Bg;
                            break;
                        case vc:
                        case bc:
                        case Sc:
                            z = Mg;
                            break;
                        case xc:
                            z = Gg;
                            break;
                        case "scroll":
                        case "scrollend":
                            z = xg;
                            break;
                        case "wheel":
                            z = Yg;
                            break;
                        case "copy":
                        case "cut":
                        case "paste":
                            z = Rg;
                            break;
                        case "gotpointercapture":
                        case "lostpointercapture":
                        case "pointercancel":
                        case "pointerdown":
                        case "pointermove":
                        case "pointerout":
                        case "pointerover":
                        case "pointerup":
                            z = Iu;
                            break;
                        case "toggle":
                        case "beforetoggle":
                            z = Qg
                    }
                    var ae = (t & 4) !== 0,
                        Oe = !ae && (e === "scroll" || e === "scrollend"),
                        R = ae ? N !== null ? N + "Capture" : null : N;
                    ae = [];
                    for (var O = A, q; O !== null;) {
                        var B = O;
                        if (q = B.stateNode, B = B.tag, B !== 5 && B !== 26 && B !== 27 || q === null || R === null || (B = Vn(O, R), B != null && ae.push(_i(O, B, q))), Oe) break;
                        O = O.return
                    }
                    0 < ae.length && (N = new z(N, le, null, a, U), k.push({
                        event: N,
                        listeners: ae
                    }))
                }
            }
            if ((t & 7) === 0) {
                e: {
                    if (N = e === "mouseover" || e === "pointerover", z = e === "mouseout" || e === "pointerout", N && a !== Qr && (le = a.relatedTarget || a.fromElement) && ($a(le) || le[Za])) break e;
                    if ((z || N) && (N = U.window === U ? U : (N = U.ownerDocument) ? N.defaultView || N.parentWindow : window, z ? (le = a.relatedTarget || a.toElement, z = A, le = le ? $a(le) : null, le !== null && (Oe = f(le), ae = le.tag, le !== Oe || ae !== 5 && ae !== 27 && ae !== 6) && (le = null)) : (z = null, le = A), z !== le)) {
                        if (ae = Pu, B = "onMouseLeave", R = "onMouseEnter", O = "mouse", (e === "pointerout" || e === "pointerover") && (ae = Iu, B = "onPointerLeave", R = "onPointerEnter", O = "pointer"), Oe = z == null ? N : Yn(z), q = le == null ? N : Yn(le), N = new ae(B, O + "leave", z, a, U), N.target = Oe, N.relatedTarget = q, B = null, $a(U) === A && (ae = new ae(R, O + "enter", le, a, U), ae.target = q, ae.relatedTarget = Oe, B = ae), Oe = B, z && le) t: {
                            for (ae = z, R = le, O = 0, q = ae; q; q = qn(q)) O++;
                            for (q = 0, B = R; B; B = qn(B)) q++;
                            for (; 0 < O - q;) ae = qn(ae),
                            O--;
                            for (; 0 < q - O;) R = qn(R),
                            q--;
                            for (; O--;) {
                                if (ae === R || R !== null && ae === R.alternate) break t;
                                ae = qn(ae), R = qn(R)
                            }
                            ae = null
                        }
                        else ae = null;
                        z !== null && V0(k, N, z, ae, !1), le !== null && Oe !== null && V0(k, Oe, le, ae, !0)
                    }
                }
                e: {
                    if (N = A ? Yn(A) : window, z = N.nodeName && N.nodeName.toLowerCase(), z === "select" || z === "input" && N.type === "file") var F = sc;
                    else if (lc(N))
                        if (oc) F = em;
                        else {
                            F = Wg;
                            var fe = Pg
                        }
                    else z = N.nodeName,
                    !z || z.toLowerCase() !== "input" || N.type !== "checkbox" && N.type !== "radio" ? A && Vr(A.elementType) && (F = sc) : F = Ig;
                    if (F && (F = F(e, A))) {
                        rc(k, F, a, U);
                        break e
                    }
                    fe && fe(e, N, A),
                    e === "focusout" && A && N.type === "number" && A.memoizedProps.value != null && Yr(N, "number", N.value)
                }
                switch (fe = A ? Yn(A) : window, e) {
                    case "focusin":
                        (lc(fe) || fe.contentEditable === "true") && (ln = fe, ns = A, Pn = null);
                        break;
                    case "focusout":
                        Pn = ns = ln = null;
                        break;
                    case "mousedown":
                        is = !0;
                        break;
                    case "contextmenu":
                    case "mouseup":
                    case "dragend":
                        is = !1, pc(k, a, U);
                        break;
                    case "selectionchange":
                        if (am) break;
                    case "keydown":
                    case "keyup":
                        pc(k, a, U)
                }
                var I;
                if (Ir) e: {
                    switch (e) {
                        case "compositionstart":
                            var ne = "onCompositionStart";
                            break e;
                        case "compositionend":
                            ne = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            ne = "onCompositionUpdate";
                            break e
                    }
                    ne = void 0
                }
                else nn ? nc(e, a) && (ne = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (ne = "onCompositionStart");ne && (ec && a.locale !== "ko" && (nn || ne !== "onCompositionStart" ? ne === "onCompositionEnd" && nn && (I = Ju()) : (ra = U, $r = "value" in ra ? ra.value : ra.textContent, nn = !0)), fe = Fl(A, ne), 0 < fe.length && (ne = new Wu(ne, e, null, a, U), k.push({
                    event: ne,
                    listeners: fe
                }), I ? ne.data = I : (I = ic(a), I !== null && (ne.data = I)))),
                (I = Kg ? Zg(e, a) : $g(e, a)) && (ne = Fl(A, "onBeforeInput"), 0 < ne.length && (fe = new Wu("onBeforeInput", "beforeinput", null, a, U), k.push({
                    event: fe,
                    listeners: ne
                }), fe.data = I)),
                Bm(k, e, A, a, U)
            }
            k0(k, t)
        })
    }

    function _i(e, t, a) {
        return {
            instance: e,
            listener: t,
            currentTarget: a
        }
    }

    function Fl(e, t) {
        for (var a = t + "Capture", n = []; e !== null;) {
            var i = e,
                o = i.stateNode;
            if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || o === null || (i = Vn(e, a), i != null && n.unshift(_i(e, i, o)), i = Vn(e, t), i != null && n.push(_i(e, i, o))), e.tag === 3) return n;
            e = e.return
        }
        return []
    }

    function qn(e) {
        if (e === null) return null;
        do e = e.return; while (e && e.tag !== 5 && e.tag !== 27);
        return e || null
    }

    function V0(e, t, a, n, i) {
        for (var o = t._reactName, h = []; a !== null && a !== n;) {
            var y = a,
                w = y.alternate,
                A = y.stateNode;
            if (y = y.tag, w !== null && w === n) break;
            y !== 5 && y !== 26 && y !== 27 || A === null || (w = A, i ? (A = Vn(a, o), A != null && h.unshift(_i(a, A, w))) : i || (A = Vn(a, o), A != null && h.push(_i(a, A, w)))), a = a.return
        }
        h.length !== 0 && e.push({
            event: t,
            listeners: h
        })
    }
    var Ym = /\r\n?/g,
        Vm = /\u0000|\uFFFD/g;

    function Q0(e) {
        return (typeof e == "string" ? e : "" + e).replace(Ym, `
`).replace(Vm, "")
    }

    function X0(e, t) {
        return t = Q0(t), Q0(e) === t
    }

    function Pl() {}

    function Me(e, t, a, n, i, o) {
        switch (a) {
            case "children":
                typeof n == "string" ? t === "body" || t === "textarea" && n === "" || en(e, n) : (typeof n == "number" || typeof n == "bigint") && t !== "body" && en(e, "" + n);
                break;
            case "className":
                al(e, "class", n);
                break;
            case "tabIndex":
                al(e, "tabindex", n);
                break;
            case "dir":
            case "role":
            case "viewBox":
            case "width":
            case "height":
                al(e, a, n);
                break;
            case "style":
                Ku(e, n, o);
                break;
            case "data":
                if (t !== "object") {
                    al(e, "data", n);
                    break
                }
            case "src":
            case "href":
                if (n === "" && (t !== "a" || a !== "href")) {
                    e.removeAttribute(a);
                    break
                }
                if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") {
                    e.removeAttribute(a);
                    break
                }
                n = ll("" + n), e.setAttribute(a, n);
                break;
            case "action":
            case "formAction":
                if (typeof n == "function") {
                    e.setAttribute(a, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
                    break
                } else typeof o == "function" && (a === "formAction" ? (t !== "input" && Me(e, t, "name", i.name, i, null), Me(e, t, "formEncType", i.formEncType, i, null), Me(e, t, "formMethod", i.formMethod, i, null), Me(e, t, "formTarget", i.formTarget, i, null)) : (Me(e, t, "encType", i.encType, i, null), Me(e, t, "method", i.method, i, null), Me(e, t, "target", i.target, i, null)));
                if (n == null || typeof n == "symbol" || typeof n == "boolean") {
                    e.removeAttribute(a);
                    break
                }
                n = ll("" + n), e.setAttribute(a, n);
                break;
            case "onClick":
                n != null && (e.onclick = Pl);
                break;
            case "onScroll":
                n != null && he("scroll", e);
                break;
            case "onScrollEnd":
                n != null && he("scrollend", e);
                break;
            case "dangerouslySetInnerHTML":
                if (n != null) {
                    if (typeof n != "object" || !("__html" in n)) throw Error(u(61));
                    if (a = n.__html, a != null) {
                        if (i.children != null) throw Error(u(60));
                        e.innerHTML = a
                    }
                }
                break;
            case "multiple":
                e.multiple = n && typeof n != "function" && typeof n != "symbol";
                break;
            case "muted":
                e.muted = n && typeof n != "function" && typeof n != "symbol";
                break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
            case "defaultValue":
            case "defaultChecked":
            case "innerHTML":
            case "ref":
                break;
            case "autoFocus":
                break;
            case "xlinkHref":
                if (n == null || typeof n == "function" || typeof n == "boolean" || typeof n == "symbol") {
                    e.removeAttribute("xlink:href");
                    break
                }
                a = ll("" + n), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
                break;
            case "contentEditable":
            case "spellCheck":
            case "draggable":
            case "value":
            case "autoReverse":
            case "externalResourcesRequired":
            case "focusable":
            case "preserveAlpha":
                n != null && typeof n != "function" && typeof n != "symbol" ? e.setAttribute(a, "" + n) : e.removeAttribute(a);
                break;
            case "inert":
            case "allowFullScreen":
            case "async":
            case "autoPlay":
            case "controls":
            case "default":
            case "defer":
            case "disabled":
            case "disablePictureInPicture":
            case "disableRemotePlayback":
            case "formNoValidate":
            case "hidden":
            case "loop":
            case "noModule":
            case "noValidate":
            case "open":
            case "playsInline":
            case "readOnly":
            case "required":
            case "reversed":
            case "scoped":
            case "seamless":
            case "itemScope":
                n && typeof n != "function" && typeof n != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
                break;
            case "capture":
            case "download":
                n === !0 ? e.setAttribute(a, "") : n !== !1 && n != null && typeof n != "function" && typeof n != "symbol" ? e.setAttribute(a, n) : e.removeAttribute(a);
                break;
            case "cols":
            case "rows":
            case "size":
            case "span":
                n != null && typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n ? e.setAttribute(a, n) : e.removeAttribute(a);
                break;
            case "rowSpan":
            case "start":
                n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n) ? e.removeAttribute(a) : e.setAttribute(a, n);
                break;
            case "popover":
                he("beforetoggle", e), he("toggle", e), tl(e, "popover", n);
                break;
            case "xlinkActuate":
                Gt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", n);
                break;
            case "xlinkArcrole":
                Gt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", n);
                break;
            case "xlinkRole":
                Gt(e, "http://www.w3.org/1999/xlink", "xlink:role", n);
                break;
            case "xlinkShow":
                Gt(e, "http://www.w3.org/1999/xlink", "xlink:show", n);
                break;
            case "xlinkTitle":
                Gt(e, "http://www.w3.org/1999/xlink", "xlink:title", n);
                break;
            case "xlinkType":
                Gt(e, "http://www.w3.org/1999/xlink", "xlink:type", n);
                break;
            case "xmlBase":
                Gt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", n);
                break;
            case "xmlLang":
                Gt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", n);
                break;
            case "xmlSpace":
                Gt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", n);
                break;
            case "is":
                tl(e, "is", n);
                break;
            case "innerText":
            case "textContent":
                break;
            default:
                (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = bg.get(a) || a, tl(e, a, n))
        }
    }

    function Ro(e, t, a, n, i, o) {
        switch (a) {
            case "style":
                Ku(e, n, o);
                break;
            case "dangerouslySetInnerHTML":
                if (n != null) {
                    if (typeof n != "object" || !("__html" in n)) throw Error(u(61));
                    if (a = n.__html, a != null) {
                        if (i.children != null) throw Error(u(60));
                        e.innerHTML = a
                    }
                }
                break;
            case "children":
                typeof n == "string" ? en(e, n) : (typeof n == "number" || typeof n == "bigint") && en(e, "" + n);
                break;
            case "onScroll":
                n != null && he("scroll", e);
                break;
            case "onScrollEnd":
                n != null && he("scrollend", e);
                break;
            case "onClick":
                n != null && (e.onclick = Pl);
                break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
            case "innerHTML":
            case "ref":
                break;
            case "innerText":
            case "textContent":
                break;
            default:
                if (!Du.hasOwnProperty(a)) e: {
                    if (a[0] === "o" && a[1] === "n" && (i = a.endsWith("Capture"), t = a.slice(2, i ? a.length - 7 : void 0), o = e[at] || null, o = o != null ? o[a] : null, typeof o == "function" && e.removeEventListener(t, o, i), typeof n == "function")) {
                        typeof o != "function" && o !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, n, i);
                        break e
                    }
                    a in e ? e[a] = n : n === !0 ? e.setAttribute(a, "") : tl(e, a, n)
                }
        }
    }

    function Fe(e, t, a) {
        switch (t) {
            case "div":
            case "span":
            case "svg":
            case "path":
            case "a":
            case "g":
            case "p":
            case "li":
                break;
            case "img":
                he("error", e), he("load", e);
                var n = !1,
                    i = !1,
                    o;
                for (o in a)
                    if (a.hasOwnProperty(o)) {
                        var h = a[o];
                        if (h != null) switch (o) {
                            case "src":
                                n = !0;
                                break;
                            case "srcSet":
                                i = !0;
                                break;
                            case "children":
                            case "dangerouslySetInnerHTML":
                                throw Error(u(137, t));
                            default:
                                Me(e, t, o, h, a, null)
                        }
                    } i && Me(e, t, "srcSet", a.srcSet, a, null), n && Me(e, t, "src", a.src, a, null);
                return;
            case "input":
                he("invalid", e);
                var y = o = h = i = null,
                    w = null,
                    A = null;
                for (n in a)
                    if (a.hasOwnProperty(n)) {
                        var U = a[n];
                        if (U != null) switch (n) {
                            case "name":
                                i = U;
                                break;
                            case "type":
                                h = U;
                                break;
                            case "checked":
                                w = U;
                                break;
                            case "defaultChecked":
                                A = U;
                                break;
                            case "value":
                                o = U;
                                break;
                            case "defaultValue":
                                y = U;
                                break;
                            case "children":
                            case "dangerouslySetInnerHTML":
                                if (U != null) throw Error(u(137, t));
                                break;
                            default:
                                Me(e, t, n, U, a, null)
                        }
                    } Yu(e, o, y, w, A, h, i, !1), nl(e);
                return;
            case "select":
                he("invalid", e), n = h = o = null;
                for (i in a)
                    if (a.hasOwnProperty(i) && (y = a[i], y != null)) switch (i) {
                        case "value":
                            o = y;
                            break;
                        case "defaultValue":
                            h = y;
                            break;
                        case "multiple":
                            n = y;
                        default:
                            Me(e, t, i, y, a, null)
                    }
                t = o, a = h, e.multiple = !!n, t != null ? Ia(e, !!n, t, !1) : a != null && Ia(e, !!n, a, !0);
                return;
            case "textarea":
                he("invalid", e), o = i = n = null;
                for (h in a)
                    if (a.hasOwnProperty(h) && (y = a[h], y != null)) switch (h) {
                        case "value":
                            n = y;
                            break;
                        case "defaultValue":
                            i = y;
                            break;
                        case "children":
                            o = y;
                            break;
                        case "dangerouslySetInnerHTML":
                            if (y != null) throw Error(u(91));
                            break;
                        default:
                            Me(e, t, h, y, a, null)
                    }
                Qu(e, n, i, o), nl(e);
                return;
            case "option":
                for (w in a)
                    if (a.hasOwnProperty(w) && (n = a[w], n != null)) switch (w) {
                        case "selected":
                            e.selected = n && typeof n != "function" && typeof n != "symbol";
                            break;
                        default:
                            Me(e, t, w, n, a, null)
                    }
                return;
            case "dialog":
                he("beforetoggle", e), he("toggle", e), he("cancel", e), he("close", e);
                break;
            case "iframe":
            case "object":
                he("load", e);
                break;
            case "video":
            case "audio":
                for (n = 0; n < Ei.length; n++) he(Ei[n], e);
                break;
            case "image":
                he("error", e), he("load", e);
                break;
            case "details":
                he("toggle", e);
                break;
            case "embed":
            case "source":
            case "link":
                he("error", e), he("load", e);
            case "area":
            case "base":
            case "br":
            case "col":
            case "hr":
            case "keygen":
            case "meta":
            case "param":
            case "track":
            case "wbr":
            case "menuitem":
                for (A in a)
                    if (a.hasOwnProperty(A) && (n = a[A], n != null)) switch (A) {
                        case "children":
                        case "dangerouslySetInnerHTML":
                            throw Error(u(137, t));
                        default:
                            Me(e, t, A, n, a, null)
                    }
                return;
            default:
                if (Vr(t)) {
                    for (U in a) a.hasOwnProperty(U) && (n = a[U], n !== void 0 && Ro(e, t, U, n, a, void 0));
                    return
                }
        }
        for (y in a) a.hasOwnProperty(y) && (n = a[y], n != null && Me(e, t, y, n, a, null))
    }

    function Qm(e, t, a, n) {
        switch (t) {
            case "div":
            case "span":
            case "svg":
            case "path":
            case "a":
            case "g":
            case "p":
            case "li":
                break;
            case "input":
                var i = null,
                    o = null,
                    h = null,
                    y = null,
                    w = null,
                    A = null,
                    U = null;
                for (z in a) {
                    var k = a[z];
                    if (a.hasOwnProperty(z) && k != null) switch (z) {
                        case "checked":
                            break;
                        case "value":
                            break;
                        case "defaultValue":
                            w = k;
                        default:
                            n.hasOwnProperty(z) || Me(e, t, z, null, n, k)
                    }
                }
                for (var N in n) {
                    var z = n[N];
                    if (k = a[N], n.hasOwnProperty(N) && (z != null || k != null)) switch (N) {
                        case "type":
                            o = z;
                            break;
                        case "name":
                            i = z;
                            break;
                        case "checked":
                            A = z;
                            break;
                        case "defaultChecked":
                            U = z;
                            break;
                        case "value":
                            h = z;
                            break;
                        case "defaultValue":
                            y = z;
                            break;
                        case "children":
                        case "dangerouslySetInnerHTML":
                            if (z != null) throw Error(u(137, t));
                            break;
                        default:
                            z !== k && Me(e, t, N, z, n, k)
                    }
                }
                kr(e, h, y, w, A, U, o, i);
                return;
            case "select":
                z = h = y = N = null;
                for (o in a)
                    if (w = a[o], a.hasOwnProperty(o) && w != null) switch (o) {
                        case "value":
                            break;
                        case "multiple":
                            z = w;
                        default:
                            n.hasOwnProperty(o) || Me(e, t, o, null, n, w)
                    }
                for (i in n)
                    if (o = n[i], w = a[i], n.hasOwnProperty(i) && (o != null || w != null)) switch (i) {
                        case "value":
                            N = o;
                            break;
                        case "defaultValue":
                            y = o;
                            break;
                        case "multiple":
                            h = o;
                        default:
                            o !== w && Me(e, t, i, o, n, w)
                    }
                t = y, a = h, n = z, N != null ? Ia(e, !!a, N, !1) : !!n != !!a && (t != null ? Ia(e, !!a, t, !0) : Ia(e, !!a, a ? [] : "", !1));
                return;
            case "textarea":
                z = N = null;
                for (y in a)
                    if (i = a[y], a.hasOwnProperty(y) && i != null && !n.hasOwnProperty(y)) switch (y) {
                        case "value":
                            break;
                        case "children":
                            break;
                        default:
                            Me(e, t, y, null, n, i)
                    }
                for (h in n)
                    if (i = n[h], o = a[h], n.hasOwnProperty(h) && (i != null || o != null)) switch (h) {
                        case "value":
                            N = i;
                            break;
                        case "defaultValue":
                            z = i;
                            break;
                        case "children":
                            break;
                        case "dangerouslySetInnerHTML":
                            if (i != null) throw Error(u(91));
                            break;
                        default:
                            i !== o && Me(e, t, h, i, n, o)
                    }
                Vu(e, N, z);
                return;
            case "option":
                for (var le in a)
                    if (N = a[le], a.hasOwnProperty(le) && N != null && !n.hasOwnProperty(le)) switch (le) {
                        case "selected":
                            e.selected = !1;
                            break;
                        default:
                            Me(e, t, le, null, n, N)
                    }
                for (w in n)
                    if (N = n[w], z = a[w], n.hasOwnProperty(w) && N !== z && (N != null || z != null)) switch (w) {
                        case "selected":
                            e.selected = N && typeof N != "function" && typeof N != "symbol";
                            break;
                        default:
                            Me(e, t, w, N, n, z)
                    }
                return;
            case "img":
            case "link":
            case "area":
            case "base":
            case "br":
            case "col":
            case "embed":
            case "hr":
            case "keygen":
            case "meta":
            case "param":
            case "source":
            case "track":
            case "wbr":
            case "menuitem":
                for (var ae in a) N = a[ae], a.hasOwnProperty(ae) && N != null && !n.hasOwnProperty(ae) && Me(e, t, ae, null, n, N);
                for (A in n)
                    if (N = n[A], z = a[A], n.hasOwnProperty(A) && N !== z && (N != null || z != null)) switch (A) {
                        case "children":
                        case "dangerouslySetInnerHTML":
                            if (N != null) throw Error(u(137, t));
                            break;
                        default:
                            Me(e, t, A, N, n, z)
                    }
                return;
            default:
                if (Vr(t)) {
                    for (var Oe in a) N = a[Oe], a.hasOwnProperty(Oe) && N !== void 0 && !n.hasOwnProperty(Oe) && Ro(e, t, Oe, void 0, n, N);
                    for (U in n) N = n[U], z = a[U], !n.hasOwnProperty(U) || N === z || N === void 0 && z === void 0 || Ro(e, t, U, N, n, z);
                    return
                }
        }
        for (var R in a) N = a[R], a.hasOwnProperty(R) && N != null && !n.hasOwnProperty(R) && Me(e, t, R, null, n, N);
        for (k in n) N = n[k], z = a[k], !n.hasOwnProperty(k) || N === z || N == null && z == null || Me(e, t, k, N, n, z)
    }
    var qo = null,
        Ao = null;

    function Wl(e) {
        return e.nodeType === 9 ? e : e.ownerDocument
    }

    function K0(e) {
        switch (e) {
            case "http://www.w3.org/2000/svg":
                return 1;
            case "http://www.w3.org/1998/Math/MathML":
                return 2;
            default:
                return 0
        }
    }

    function Z0(e, t) {
        if (e === 0) switch (t) {
            case "svg":
                return 1;
            case "math":
                return 2;
            default:
                return 0
        }
        return e === 1 && t === "foreignObject" ? 0 : e
    }

    function To(e, t) {
        return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
    }
    var No = null;

    function Xm() {
        var e = window.event;
        return e && e.type === "popstate" ? e === No ? !1 : (No = e, !0) : (No = null, !1)
    }
    var $0 = typeof setTimeout == "function" ? setTimeout : void 0,
        Km = typeof clearTimeout == "function" ? clearTimeout : void 0,
        J0 = typeof Promise == "function" ? Promise : void 0,
        Zm = typeof queueMicrotask == "function" ? queueMicrotask : typeof J0 < "u" ? function(e) {
            return J0.resolve(null).then(e).catch($m)
        } : $0;

    function $m(e) {
        setTimeout(function() {
            throw e
        })
    }

    function wa(e) {
        return e === "head"
    }

    function F0(e, t) {
        var a = t,
            n = 0,
            i = 0;
        do {
            var o = a.nextSibling;
            if (e.removeChild(a), o && o.nodeType === 8)
                if (a = o.data, a === "/$") {
                    if (0 < n && 8 > n) {
                        a = n;
                        var h = e.ownerDocument;
                        if (a & 1 && Mi(h.documentElement), a & 2 && Mi(h.body), a & 4)
                            for (a = h.head, Mi(a), h = a.firstChild; h;) {
                                var y = h.nextSibling,
                                    w = h.nodeName;
                                h[kn] || w === "SCRIPT" || w === "STYLE" || w === "LINK" && h.rel.toLowerCase() === "stylesheet" || a.removeChild(h), h = y
                            }
                    }
                    if (i === 0) {
                        e.removeChild(o), Li(t);
                        return
                    }
                    i--
                } else a === "$" || a === "$?" || a === "$!" ? i++ : n = a.charCodeAt(0) - 48;
            else n = 0;
            a = o
        } while (a);
        Li(t)
    }

    function zo(e) {
        var t = e.firstChild;
        for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
            var a = t;
            switch (t = t.nextSibling, a.nodeName) {
                case "HTML":
                case "HEAD":
                case "BODY":
                    zo(a), Ur(a);
                    continue;
                case "SCRIPT":
                case "STYLE":
                    continue;
                case "LINK":
                    if (a.rel.toLowerCase() === "stylesheet") continue
            }
            e.removeChild(a)
        }
    }

    function Jm(e, t, a, n) {
        for (; e.nodeType === 1;) {
            var i = a;
            if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
                if (!n && (e.nodeName !== "INPUT" || e.type !== "hidden")) break
            } else if (n) {
                if (!e[kn]) switch (t) {
                    case "meta":
                        if (!e.hasAttribute("itemprop")) break;
                        return e;
                    case "link":
                        if (o = e.getAttribute("rel"), o === "stylesheet" && e.hasAttribute("data-precedence")) break;
                        if (o !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
                        return e;
                    case "style":
                        if (e.hasAttribute("data-precedence")) break;
                        return e;
                    case "script":
                        if (o = e.getAttribute("src"), (o !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && o && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
                        return e;
                    default:
                        return e
                }
            } else if (t === "input" && e.type === "hidden") {
                var o = i.name == null ? null : "" + i.name;
                if (i.type === "hidden" && e.getAttribute("name") === o) return e
            } else return e;
            if (e = Rt(e.nextSibling), e === null) break
        }
        return null
    }

    function Fm(e, t, a) {
        if (t === "") return null;
        for (; e.nodeType !== 3;)
            if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Rt(e.nextSibling), e === null)) return null;
        return e
    }

    function Lo(e) {
        return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState === "complete"
    }

    function Pm(e, t) {
        var a = e.ownerDocument;
        if (e.data !== "$?" || a.readyState === "complete") t();
        else {
            var n = function() {
                t(), a.removeEventListener("DOMContentLoaded", n)
            };
            a.addEventListener("DOMContentLoaded", n), e._reactRetry = n
        }
    }

    function Rt(e) {
        for (; e != null; e = e.nextSibling) {
            var t = e.nodeType;
            if (t === 1 || t === 3) break;
            if (t === 8) {
                if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F") break;
                if (t === "/$") return null
            }
        }
        return e
    }
    var Do = null;

    function P0(e) {
        e = e.previousSibling;
        for (var t = 0; e;) {
            if (e.nodeType === 8) {
                var a = e.data;
                if (a === "$" || a === "$!" || a === "$?") {
                    if (t === 0) return e;
                    t--
                } else a === "/$" && t++
            }
            e = e.previousSibling
        }
        return null
    }

    function W0(e, t, a) {
        switch (t = Wl(a), e) {
            case "html":
                if (e = t.documentElement, !e) throw Error(u(452));
                return e;
            case "head":
                if (e = t.head, !e) throw Error(u(453));
                return e;
            case "body":
                if (e = t.body, !e) throw Error(u(454));
                return e;
            default:
                throw Error(u(451))
        }
    }

    function Mi(e) {
        for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
        Ur(e)
    }
    var _t = new Map,
        I0 = new Set;

    function Il(e) {
        return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument
    }
    var ea = X.d;
    X.d = {
        f: Wm,
        r: Im,
        D: e2,
        C: t2,
        L: a2,
        m: n2,
        X: l2,
        S: i2,
        M: r2
    };

    function Wm() {
        var e = ea.f(),
            t = Ql();
        return e || t
    }

    function Im(e) {
        var t = Ja(e);
        t !== null && t.tag === 5 && t.type === "form" ? bf(t) : ea.r(e)
    }
    var An = typeof document > "u" ? null : document;

    function ed(e, t, a) {
        var n = An;
        if (n && typeof t == "string" && t) {
            var i = vt(t);
            i = 'link[rel="' + e + '"][href="' + i + '"]', typeof a == "string" && (i += '[crossorigin="' + a + '"]'), I0.has(i) || (I0.add(i), e = {
                rel: e,
                crossOrigin: a,
                href: t
            }, n.querySelector(i) === null && (t = n.createElement("link"), Fe(t, "link", e), Qe(t), n.head.appendChild(t)))
        }
    }

    function e2(e) {
        ea.D(e), ed("dns-prefetch", e, null)
    }

    function t2(e, t) {
        ea.C(e, t), ed("preconnect", e, t)
    }

    function a2(e, t, a) {
        ea.L(e, t, a);
        var n = An;
        if (n && e && t) {
            var i = 'link[rel="preload"][as="' + vt(t) + '"]';
            t === "image" && a && a.imageSrcSet ? (i += '[imagesrcset="' + vt(a.imageSrcSet) + '"]', typeof a.imageSizes == "string" && (i += '[imagesizes="' + vt(a.imageSizes) + '"]')) : i += '[href="' + vt(e) + '"]';
            var o = i;
            switch (t) {
                case "style":
                    o = Tn(e);
                    break;
                case "script":
                    o = Nn(e)
            }
            _t.has(o) || (e = v({
                rel: "preload",
                href: t === "image" && a && a.imageSrcSet ? void 0 : e,
                as: t
            }, a), _t.set(o, e), n.querySelector(i) !== null || t === "style" && n.querySelector(Oi(o)) || t === "script" && n.querySelector(Ri(o)) || (t = n.createElement("link"), Fe(t, "link", e), Qe(t), n.head.appendChild(t)))
        }
    }

    function n2(e, t) {
        ea.m(e, t);
        var a = An;
        if (a && e) {
            var n = t && typeof t.as == "string" ? t.as : "script",
                i = 'link[rel="modulepreload"][as="' + vt(n) + '"][href="' + vt(e) + '"]',
                o = i;
            switch (n) {
                case "audioworklet":
                case "paintworklet":
                case "serviceworker":
                case "sharedworker":
                case "worker":
                case "script":
                    o = Nn(e)
            }
            if (!_t.has(o) && (e = v({
                    rel: "modulepreload",
                    href: e
                }, t), _t.set(o, e), a.querySelector(i) === null)) {
                switch (n) {
                    case "audioworklet":
                    case "paintworklet":
                    case "serviceworker":
                    case "sharedworker":
                    case "worker":
                    case "script":
                        if (a.querySelector(Ri(o))) return
                }
                n = a.createElement("link"), Fe(n, "link", e), Qe(n), a.head.appendChild(n)
            }
        }
    }

    function i2(e, t, a) {
        ea.S(e, t, a);
        var n = An;
        if (n && e) {
            var i = Fa(n).hoistableStyles,
                o = Tn(e);
            t = t || "default";
            var h = i.get(o);
            if (!h) {
                var y = {
                    loading: 0,
                    preload: null
                };
                if (h = n.querySelector(Oi(o))) y.loading = 5;
                else {
                    e = v({
                        rel: "stylesheet",
                        href: e,
                        "data-precedence": t
                    }, a), (a = _t.get(o)) && jo(e, a);
                    var w = h = n.createElement("link");
                    Qe(w), Fe(w, "link", e), w._p = new Promise(function(A, U) {
                        w.onload = A, w.onerror = U
                    }), w.addEventListener("load", function() {
                        y.loading |= 1
                    }), w.addEventListener("error", function() {
                        y.loading |= 2
                    }), y.loading |= 4, er(h, t, n)
                }
                h = {
                    type: "stylesheet",
                    instance: h,
                    count: 1,
                    state: y
                }, i.set(o, h)
            }
        }
    }

    function l2(e, t) {
        ea.X(e, t);
        var a = An;
        if (a && e) {
            var n = Fa(a).hoistableScripts,
                i = Nn(e),
                o = n.get(i);
            o || (o = a.querySelector(Ri(i)), o || (e = v({
                src: e,
                async: !0
            }, t), (t = _t.get(i)) && Uo(e, t), o = a.createElement("script"), Qe(o), Fe(o, "link", e), a.head.appendChild(o)), o = {
                type: "script",
                instance: o,
                count: 1,
                state: null
            }, n.set(i, o))
        }
    }

    function r2(e, t) {
        ea.M(e, t);
        var a = An;
        if (a && e) {
            var n = Fa(a).hoistableScripts,
                i = Nn(e),
                o = n.get(i);
            o || (o = a.querySelector(Ri(i)), o || (e = v({
                src: e,
                async: !0,
                type: "module"
            }, t), (t = _t.get(i)) && Uo(e, t), o = a.createElement("script"), Qe(o), Fe(o, "link", e), a.head.appendChild(o)), o = {
                type: "script",
                instance: o,
                count: 1,
                state: null
            }, n.set(i, o))
        }
    }

    function td(e, t, a, n) {
        var i = (i = se.current) ? Il(i) : null;
        if (!i) throw Error(u(446));
        switch (e) {
            case "meta":
            case "title":
                return null;
            case "style":
                return typeof a.precedence == "string" && typeof a.href == "string" ? (t = Tn(a.href), a = Fa(i).hoistableStyles, n = a.get(t), n || (n = {
                    type: "style",
                    instance: null,
                    count: 0,
                    state: null
                }, a.set(t, n)), n) : {
                    type: "void",
                    instance: null,
                    count: 0,
                    state: null
                };
            case "link":
                if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
                    e = Tn(a.href);
                    var o = Fa(i).hoistableStyles,
                        h = o.get(e);
                    if (h || (i = i.ownerDocument || i, h = {
                            type: "stylesheet",
                            instance: null,
                            count: 0,
                            state: {
                                loading: 0,
                                preload: null
                            }
                        }, o.set(e, h), (o = i.querySelector(Oi(e))) && !o._p && (h.instance = o, h.state.loading = 5), _t.has(e) || (a = {
                            rel: "preload",
                            as: "style",
                            href: a.href,
                            crossOrigin: a.crossOrigin,
                            integrity: a.integrity,
                            media: a.media,
                            hrefLang: a.hrefLang,
                            referrerPolicy: a.referrerPolicy
                        }, _t.set(e, a), o || s2(i, e, a, h.state))), t && n === null) throw Error(u(528, ""));
                    return h
                }
                if (t && n !== null) throw Error(u(529, ""));
                return null;
            case "script":
                return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Nn(a), a = Fa(i).hoistableScripts, n = a.get(t), n || (n = {
                    type: "script",
                    instance: null,
                    count: 0,
                    state: null
                }, a.set(t, n)), n) : {
                    type: "void",
                    instance: null,
                    count: 0,
                    state: null
                };
            default:
                throw Error(u(444, e))
        }
    }

    function Tn(e) {
        return 'href="' + vt(e) + '"'
    }

    function Oi(e) {
        return 'link[rel="stylesheet"][' + e + "]"
    }

    function ad(e) {
        return v({}, e, {
            "data-precedence": e.precedence,
            precedence: null
        })
    }

    function s2(e, t, a, n) {
        e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? n.loading = 1 : (t = e.createElement("link"), n.preload = t, t.addEventListener("load", function() {
            return n.loading |= 1
        }), t.addEventListener("error", function() {
            return n.loading |= 2
        }), Fe(t, "link", a), Qe(t), e.head.appendChild(t))
    }

    function Nn(e) {
        return '[src="' + vt(e) + '"]'
    }

    function Ri(e) {
        return "script[async]" + e
    }

    function nd(e, t, a) {
        if (t.count++, t.instance === null) switch (t.type) {
            case "style":
                var n = e.querySelector('style[data-href~="' + vt(a.href) + '"]');
                if (n) return t.instance = n, Qe(n), n;
                var i = v({}, a, {
                    "data-href": a.href,
                    "data-precedence": a.precedence,
                    href: null,
                    precedence: null
                });
                return n = (e.ownerDocument || e).createElement("style"), Qe(n), Fe(n, "style", i), er(n, a.precedence, e), t.instance = n;
            case "stylesheet":
                i = Tn(a.href);
                var o = e.querySelector(Oi(i));
                if (o) return t.state.loading |= 4, t.instance = o, Qe(o), o;
                n = ad(a), (i = _t.get(i)) && jo(n, i), o = (e.ownerDocument || e).createElement("link"), Qe(o);
                var h = o;
                return h._p = new Promise(function(y, w) {
                    h.onload = y, h.onerror = w
                }), Fe(o, "link", n), t.state.loading |= 4, er(o, a.precedence, e), t.instance = o;
            case "script":
                return o = Nn(a.src), (i = e.querySelector(Ri(o))) ? (t.instance = i, Qe(i), i) : (n = a, (i = _t.get(o)) && (n = v({}, a), Uo(n, i)), e = e.ownerDocument || e, i = e.createElement("script"), Qe(i), Fe(i, "link", n), e.head.appendChild(i), t.instance = i);
            case "void":
                return null;
            default:
                throw Error(u(443, t.type))
        } else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (n = t.instance, t.state.loading |= 4, er(n, a.precedence, e));
        return t.instance
    }

    function er(e, t, a) {
        for (var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), i = n.length ? n[n.length - 1] : null, o = i, h = 0; h < n.length; h++) {
            var y = n[h];
            if (y.dataset.precedence === t) o = y;
            else if (o !== i) break
        }
        o ? o.parentNode.insertBefore(e, o.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild))
    }

    function jo(e, t) {
        e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title)
    }

    function Uo(e, t) {
        e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity)
    }
    var tr = null;

    function id(e, t, a) {
        if (tr === null) {
            var n = new Map,
                i = tr = new Map;
            i.set(a, n)
        } else i = tr, n = i.get(a), n || (n = new Map, i.set(a, n));
        if (n.has(e)) return n;
        for (n.set(e, null), a = a.getElementsByTagName(e), i = 0; i < a.length; i++) {
            var o = a[i];
            if (!(o[kn] || o[Pe] || e === "link" && o.getAttribute("rel") === "stylesheet") && o.namespaceURI !== "http://www.w3.org/2000/svg") {
                var h = o.getAttribute(t) || "";
                h = e + h;
                var y = n.get(h);
                y ? y.push(o) : n.set(h, [o])
            }
        }
        return n
    }

    function ld(e, t, a) {
        e = e.ownerDocument || e, e.head.insertBefore(a, t === "title" ? e.querySelector("head > title") : null)
    }

    function o2(e, t, a) {
        if (a === 1 || t.itemProp != null) return !1;
        switch (e) {
            case "meta":
            case "title":
                return !0;
            case "style":
                if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
                return !0;
            case "link":
                if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
                switch (t.rel) {
                    case "stylesheet":
                        return e = t.disabled, typeof t.precedence == "string" && e == null;
                    default:
                        return !0
                }
            case "script":
                if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0
        }
        return !1
    }

    function rd(e) {
        return !(e.type === "stylesheet" && (e.state.loading & 3) === 0)
    }
    var qi = null;

    function u2() {}

    function c2(e, t, a) {
        if (qi === null) throw Error(u(475));
        var n = qi;
        if (t.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (t.state.loading & 4) === 0) {
            if (t.instance === null) {
                var i = Tn(a.href),
                    o = e.querySelector(Oi(i));
                if (o) {
                    e = o._p, e !== null && typeof e == "object" && typeof e.then == "function" && (n.count++, n = ar.bind(n), e.then(n, n)), t.state.loading |= 4, t.instance = o, Qe(o);
                    return
                }
                o = e.ownerDocument || e, a = ad(a), (i = _t.get(i)) && jo(a, i), o = o.createElement("link"), Qe(o);
                var h = o;
                h._p = new Promise(function(y, w) {
                    h.onload = y, h.onerror = w
                }), Fe(o, "link", a), t.instance = o
            }
            n.stylesheets === null && (n.stylesheets = new Map), n.stylesheets.set(t, e), (e = t.state.preload) && (t.state.loading & 3) === 0 && (n.count++, t = ar.bind(n), e.addEventListener("load", t), e.addEventListener("error", t))
        }
    }

    function f2() {
        if (qi === null) throw Error(u(475));
        var e = qi;
        return e.stylesheets && e.count === 0 && Bo(e, e.stylesheets), 0 < e.count ? function(t) {
            var a = setTimeout(function() {
                if (e.stylesheets && Bo(e, e.stylesheets), e.unsuspend) {
                    var n = e.unsuspend;
                    e.unsuspend = null, n()
                }
            }, 6e4);
            return e.unsuspend = t,
                function() {
                    e.unsuspend = null, clearTimeout(a)
                }
        } : null
    }

    function ar() {
        if (this.count--, this.count === 0) {
            if (this.stylesheets) Bo(this, this.stylesheets);
            else if (this.unsuspend) {
                var e = this.unsuspend;
                this.unsuspend = null, e()
            }
        }
    }
    var nr = null;

    function Bo(e, t) {
        e.stylesheets = null, e.unsuspend !== null && (e.count++, nr = new Map, t.forEach(d2, e), nr = null, ar.call(e))
    }

    function d2(e, t) {
        if (!(t.state.loading & 4)) {
            var a = nr.get(e);
            if (a) var n = a.get(null);
            else {
                a = new Map, nr.set(e, a);
                for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), o = 0; o < i.length; o++) {
                    var h = i[o];
                    (h.nodeName === "LINK" || h.getAttribute("media") !== "not all") && (a.set(h.dataset.precedence, h), n = h)
                }
                n && a.set(null, n)
            }
            i = t.instance, h = i.getAttribute("data-precedence"), o = a.get(h) || n, o === n && a.set(null, i), a.set(h, i), this.count++, n = ar.bind(this), i.addEventListener("load", n), i.addEventListener("error", n), o ? o.parentNode.insertBefore(i, o.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4
        }
    }
    var Ai = {
        $$typeof: V,
        Provider: null,
        Consumer: null,
        _currentValue: ee,
        _currentValue2: ee,
        _threadCount: 0
    };

    function h2(e, t, a, n, i, o, h, y) {
        this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = zr(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = zr(0), this.hiddenUpdates = zr(null), this.identifierPrefix = n, this.onUncaughtError = i, this.onCaughtError = o, this.onRecoverableError = h, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = y, this.incompleteTransitions = new Map
    }

    function sd(e, t, a, n, i, o, h, y, w, A, U, k) {
        return e = new h2(e, t, a, h, y, w, A, k), t = 1, o === !0 && (t |= 24), o = ft(3, null, null, t), e.current = o, o.stateNode = e, t = vs(), t.refCount++, e.pooledCache = t, t.refCount++, o.memoizedState = {
            element: n,
            isDehydrated: a,
            cache: t
        }, ws(o), e
    }

    function od(e) {
        return e ? (e = un, e) : un
    }

    function ud(e, t, a, n, i, o) {
        i = od(i), n.context === null ? n.context = i : n.pendingContext = i, n = ua(t), n.payload = {
            element: a
        }, o = o === void 0 ? null : o, o !== null && (n.callback = o), a = ca(e, n, t), a !== null && (pt(a, e, t), ri(a, e, t))
    }

    function cd(e, t) {
        if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
            var a = e.retryLane;
            e.retryLane = a !== 0 && a < t ? a : t
        }
    }

    function Ho(e, t) {
        cd(e, t), (e = e.alternate) && cd(e, t)
    }

    function fd(e) {
        if (e.tag === 13) {
            var t = on(e, 67108864);
            t !== null && pt(t, e, 67108864), Ho(e, 67108864)
        }
    }
    var ir = !0;

    function g2(e, t, a, n) {
        var i = j.T;
        j.T = null;
        var o = X.p;
        try {
            X.p = 2, Go(e, t, a, n)
        } finally {
            X.p = o, j.T = i
        }
    }

    function m2(e, t, a, n) {
        var i = j.T;
        j.T = null;
        var o = X.p;
        try {
            X.p = 8, Go(e, t, a, n)
        } finally {
            X.p = o, j.T = i
        }
    }

    function Go(e, t, a, n) {
        if (ir) {
            var i = ko(n);
            if (i === null) Oo(e, t, n, lr, a), hd(e, n);
            else if (y2(i, e, t, a, n)) n.stopPropagation();
            else if (hd(e, n), t & 4 && -1 < p2.indexOf(e)) {
                for (; i !== null;) {
                    var o = Ja(i);
                    if (o !== null) switch (o.tag) {
                        case 3:
                            if (o = o.stateNode, o.current.memoizedState.isDehydrated) {
                                var h = qa(o.pendingLanes);
                                if (h !== 0) {
                                    var y = o;
                                    for (y.pendingLanes |= 2, y.entangledLanes |= 2; h;) {
                                        var w = 1 << 31 - ut(h);
                                        y.entanglements[1] |= w, h &= ~w
                                    }
                                    Dt(o), (Ce & 6) === 0 && (Yl = At() + 500, Ci(0))
                                }
                            }
                            break;
                        case 13:
                            y = on(o, 2), y !== null && pt(y, o, 2), Ql(), Ho(o, 2)
                    }
                    if (o = ko(n), o === null && Oo(e, t, n, lr, a), o === i) break;
                    i = o
                }
                i !== null && n.stopPropagation()
            } else Oo(e, t, n, null, a)
        }
    }

    function ko(e) {
        return e = Xr(e), Yo(e)
    }
    var lr = null;

    function Yo(e) {
        if (lr = null, e = $a(e), e !== null) {
            var t = f(e);
            if (t === null) e = null;
            else {
                var a = t.tag;
                if (a === 13) {
                    if (e = d(t), e !== null) return e;
                    e = null
                } else if (a === 3) {
                    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
                    e = null
                } else t !== e && (e = null)
            }
        }
        return lr = e, null
    }

    function dd(e) {
        switch (e) {
            case "beforetoggle":
            case "cancel":
            case "click":
            case "close":
            case "contextmenu":
            case "copy":
            case "cut":
            case "auxclick":
            case "dblclick":
            case "dragend":
            case "dragstart":
            case "drop":
            case "focusin":
            case "focusout":
            case "input":
            case "invalid":
            case "keydown":
            case "keypress":
            case "keyup":
            case "mousedown":
            case "mouseup":
            case "paste":
            case "pause":
            case "play":
            case "pointercancel":
            case "pointerdown":
            case "pointerup":
            case "ratechange":
            case "reset":
            case "resize":
            case "seeked":
            case "submit":
            case "toggle":
            case "touchcancel":
            case "touchend":
            case "touchstart":
            case "volumechange":
            case "change":
            case "selectionchange":
            case "textInput":
            case "compositionstart":
            case "compositionend":
            case "compositionupdate":
            case "beforeblur":
            case "afterblur":
            case "beforeinput":
            case "blur":
            case "fullscreenchange":
            case "focus":
            case "hashchange":
            case "popstate":
            case "select":
            case "selectstart":
                return 2;
            case "drag":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "mousemove":
            case "mouseout":
            case "mouseover":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "scroll":
            case "touchmove":
            case "wheel":
            case "mouseenter":
            case "mouseleave":
            case "pointerenter":
            case "pointerleave":
                return 8;
            case "message":
                switch (tg()) {
                    case _u:
                        return 2;
                    case Mu:
                        return 8;
                    case Pi:
                    case ag:
                        return 32;
                    case Ou:
                        return 268435456;
                    default:
                        return 32
                }
            default:
                return 32
        }
    }
    var Vo = !1,
        Ca = null,
        Ea = null,
        _a = null,
        Ti = new Map,
        Ni = new Map,
        Ma = [],
        p2 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");

    function hd(e, t) {
        switch (e) {
            case "focusin":
            case "focusout":
                Ca = null;
                break;
            case "dragenter":
            case "dragleave":
                Ea = null;
                break;
            case "mouseover":
            case "mouseout":
                _a = null;
                break;
            case "pointerover":
            case "pointerout":
                Ti.delete(t.pointerId);
                break;
            case "gotpointercapture":
            case "lostpointercapture":
                Ni.delete(t.pointerId)
        }
    }

    function zi(e, t, a, n, i, o) {
        return e === null || e.nativeEvent !== o ? (e = {
            blockedOn: t,
            domEventName: a,
            eventSystemFlags: n,
            nativeEvent: o,
            targetContainers: [i]
        }, t !== null && (t = Ja(t), t !== null && fd(t)), e) : (e.eventSystemFlags |= n, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e)
    }

    function y2(e, t, a, n, i) {
        switch (t) {
            case "focusin":
                return Ca = zi(Ca, e, t, a, n, i), !0;
            case "dragenter":
                return Ea = zi(Ea, e, t, a, n, i), !0;
            case "mouseover":
                return _a = zi(_a, e, t, a, n, i), !0;
            case "pointerover":
                var o = i.pointerId;
                return Ti.set(o, zi(Ti.get(o) || null, e, t, a, n, i)), !0;
            case "gotpointercapture":
                return o = i.pointerId, Ni.set(o, zi(Ni.get(o) || null, e, t, a, n, i)), !0
        }
        return !1
    }

    function gd(e) {
        var t = $a(e.target);
        if (t !== null) {
            var a = f(t);
            if (a !== null) {
                if (t = a.tag, t === 13) {
                    if (t = d(a), t !== null) {
                        e.blockedOn = t, cg(e.priority, function() {
                            if (a.tag === 13) {
                                var n = mt();
                                n = Lr(n);
                                var i = on(a, n);
                                i !== null && pt(i, a, n), Ho(a, n)
                            }
                        });
                        return
                    }
                } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
                    e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
                    return
                }
            }
        }
        e.blockedOn = null
    }

    function rr(e) {
        if (e.blockedOn !== null) return !1;
        for (var t = e.targetContainers; 0 < t.length;) {
            var a = ko(e.nativeEvent);
            if (a === null) {
                a = e.nativeEvent;
                var n = new a.constructor(a.type, a);
                Qr = n, a.target.dispatchEvent(n), Qr = null
            } else return t = Ja(a), t !== null && fd(t), e.blockedOn = a, !1;
            t.shift()
        }
        return !0
    }

    function md(e, t, a) {
        rr(e) && a.delete(t)
    }

    function v2() {
        Vo = !1, Ca !== null && rr(Ca) && (Ca = null), Ea !== null && rr(Ea) && (Ea = null), _a !== null && rr(_a) && (_a = null), Ti.forEach(md), Ni.forEach(md)
    }

    function sr(e, t) {
        e.blockedOn === t && (e.blockedOn = null, Vo || (Vo = !0, r.unstable_scheduleCallback(r.unstable_NormalPriority, v2)))
    }
    var or = null;

    function pd(e) {
        or !== e && (or = e, r.unstable_scheduleCallback(r.unstable_NormalPriority, function() {
            or === e && (or = null);
            for (var t = 0; t < e.length; t += 3) {
                var a = e[t],
                    n = e[t + 1],
                    i = e[t + 2];
                if (typeof n != "function") {
                    if (Yo(n || a) === null) continue;
                    break
                }
                var o = Ja(a);
                o !== null && (e.splice(t, 3), t -= 3, ks(o, {
                    pending: !0,
                    data: i,
                    method: a.method,
                    action: n
                }, n, i))
            }
        }))
    }

    function Li(e) {
        function t(w) {
            return sr(w, e)
        }
        Ca !== null && sr(Ca, e), Ea !== null && sr(Ea, e), _a !== null && sr(_a, e), Ti.forEach(t), Ni.forEach(t);
        for (var a = 0; a < Ma.length; a++) {
            var n = Ma[a];
            n.blockedOn === e && (n.blockedOn = null)
        }
        for (; 0 < Ma.length && (a = Ma[0], a.blockedOn === null);) gd(a), a.blockedOn === null && Ma.shift();
        if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
            for (n = 0; n < a.length; n += 3) {
                var i = a[n],
                    o = a[n + 1],
                    h = i[at] || null;
                if (typeof o == "function") h || pd(a);
                else if (h) {
                    var y = null;
                    if (o && o.hasAttribute("formAction")) {
                        if (i = o, h = o[at] || null) y = h.formAction;
                        else if (Yo(i) !== null) continue
                    } else y = h.action;
                    typeof y == "function" ? a[n + 1] = y : (a.splice(n, 3), n -= 3), pd(a)
                }
            }
    }

    function Qo(e) {
        this._internalRoot = e
    }
    ur.prototype.render = Qo.prototype.render = function(e) {
        var t = this._internalRoot;
        if (t === null) throw Error(u(409));
        var a = t.current,
            n = mt();
        ud(a, n, e, t, null, null)
    }, ur.prototype.unmount = Qo.prototype.unmount = function() {
        var e = this._internalRoot;
        if (e !== null) {
            this._internalRoot = null;
            var t = e.containerInfo;
            ud(e.current, 2, null, e, null, null), Ql(), t[Za] = null
        }
    };

    function ur(e) {
        this._internalRoot = e
    }
    ur.prototype.unstable_scheduleHydration = function(e) {
        if (e) {
            var t = Nu();
            e = {
                blockedOn: null,
                target: e,
                priority: t
            };
            for (var a = 0; a < Ma.length && t !== 0 && t < Ma[a].priority; a++);
            Ma.splice(a, 0, e), a === 0 && gd(e)
        }
    };
    var yd = l.version;
    if (yd !== "19.1.1") throw Error(u(527, yd, "19.1.1"));
    X.findDOMNode = function(e) {
        var t = e._reactInternals;
        if (t === void 0) throw typeof e.render == "function" ? Error(u(188)) : (e = Object.keys(e).join(","), Error(u(268, e)));
        return e = m(t), e = e !== null ? g(e) : null, e = e === null ? null : e.stateNode, e
    };
    var b2 = {
        bundleType: 0,
        version: "19.1.1",
        rendererPackageName: "react-dom",
        currentDispatcherRef: j,
        reconcilerVersion: "19.1.1"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
        var cr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!cr.isDisabled && cr.supportsFiber) try {
            Bn = cr.inject(b2), ot = cr
        } catch {}
    }
    return Hi.createRoot = function(e, t) {
        if (!c(e)) throw Error(u(299));
        var a = !1,
            n = "",
            i = zf,
            o = Lf,
            h = Df,
            y = null;
        return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (o = t.onCaughtError), t.onRecoverableError !== void 0 && (h = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (y = t.unstable_transitionCallbacks)), t = sd(e, 1, !1, null, null, a, n, i, o, h, y, null), e[Za] = t.current, Mo(e), new Qo(t)
    }, Hi.hydrateRoot = function(e, t, a) {
        if (!c(e)) throw Error(u(299));
        var n = !1,
            i = "",
            o = zf,
            h = Lf,
            y = Df,
            w = null,
            A = null;
        return a != null && (a.unstable_strictMode === !0 && (n = !0), a.identifierPrefix !== void 0 && (i = a.identifierPrefix), a.onUncaughtError !== void 0 && (o = a.onUncaughtError), a.onCaughtError !== void 0 && (h = a.onCaughtError), a.onRecoverableError !== void 0 && (y = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (w = a.unstable_transitionCallbacks), a.formState !== void 0 && (A = a.formState)), t = sd(e, 1, !0, t, a ?? null, n, i, o, h, y, w, A), t.context = od(null), a = t.current, n = mt(), n = Lr(n), i = ua(n), i.callback = null, ca(a, i, n), a = n, t.current.lanes = a, Gn(t, a), Dt(t), e[Za] = t.current, Mo(e), new ur(t)
    }, Hi.version = "19.1.1", Hi
}
var ch;

function ty() {
    if (ch) return lu.exports;
    ch = 1;

    function r() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)
        } catch (l) {
            console.error(l)
        }
    }
    return r(), lu.exports = ey(), lu.exports
}
var ay = ty();
/**
 * react-router v7.9.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var fh = "popstate";

function ny(r = {}) {
    function l(u, c) {
        let {
            pathname: f,
            search: d,
            hash: p
        } = u.location;
        return pu("", {
            pathname: f,
            search: d,
            hash: p
        }, c.state && c.state.usr || null, c.state && c.state.key || "default")
    }

    function s(u, c) {
        return typeof c == "string" ? c : Xi(c)
    }
    return ly(l, s, null, r)
}

function Ve(r, l) {
    if (r === !1 || r === null || typeof r > "u") throw new Error(l)
}

function Ut(r, l) {
    if (!r) {
        typeof console < "u" && console.warn(l);
        try {
            throw new Error(l)
        } catch {}
    }
}

function iy() {
    return Math.random().toString(36).substring(2, 10)
}

function dh(r, l) {
    return {
        usr: r.state,
        key: r.key,
        idx: l
    }
}

function pu(r, l, s = null, u) {
    return {
        pathname: typeof r == "string" ? r : r.pathname,
        search: "",
        hash: "",
        ...typeof l == "string" ? Ki(l) : l,
        state: s,
        key: l && l.key || u || iy()
    }
}

function Xi({
    pathname: r = "/",
    search: l = "",
    hash: s = ""
}) {
    return l && l !== "?" && (r += l.charAt(0) === "?" ? l : "?" + l), s && s !== "#" && (r += s.charAt(0) === "#" ? s : "#" + s), r
}

function Ki(r) {
    let l = {};
    if (r) {
        let s = r.indexOf("#");
        s >= 0 && (l.hash = r.substring(s), r = r.substring(0, s));
        let u = r.indexOf("?");
        u >= 0 && (l.search = r.substring(u), r = r.substring(0, u)), r && (l.pathname = r)
    }
    return l
}

function ly(r, l, s, u = {}) {
    let {
        window: c = document.defaultView,
        v5Compat: f = !1
    } = u, d = c.history, p = "POP", m = null, g = v();
    g == null && (g = 0, d.replaceState({
        ...d.state,
        idx: g
    }, ""));

    function v() {
        return (d.state || {
            idx: null
        }).idx
    }

    function b() {
        p = "POP";
        let M = v(),
            L = M == null ? null : M - g;
        g = M, m && m({
            action: p,
            location: T.location,
            delta: L
        })
    }

    function S(M, L) {
        p = "PUSH";
        let D = pu(T.location, M, L);
        g = v() + 1;
        let V = dh(D, g),
            W = T.createHref(D);
        try {
            d.pushState(V, "", W)
        } catch (Q) {
            if (Q instanceof DOMException && Q.name === "DataCloneError") throw Q;
            c.location.assign(W)
        }
        f && m && m({
            action: p,
            location: T.location,
            delta: 1
        })
    }

    function x(M, L) {
        p = "REPLACE";
        let D = pu(T.location, M, L);
        g = v();
        let V = dh(D, g),
            W = T.createHref(D);
        d.replaceState(V, "", W), f && m && m({
            action: p,
            location: T.location,
            delta: 0
        })
    }

    function C(M) {
        return ry(M)
    }
    let T = {
        get action() {
            return p
        },
        get location() {
            return r(c, d)
        },
        listen(M) {
            if (m) throw new Error("A history only accepts one active listener");
            return c.addEventListener(fh, b), m = M, () => {
                c.removeEventListener(fh, b), m = null
            }
        },
        createHref(M) {
            return l(c, M)
        },
        createURL: C,
        encodeLocation(M) {
            let L = C(M);
            return {
                pathname: L.pathname,
                search: L.search,
                hash: L.hash
            }
        },
        push: S,
        replace: x,
        go(M) {
            return d.go(M)
        }
    };
    return T
}

function ry(r, l = !1) {
    let s = "http://localhost";
    typeof window < "u" && (s = window.location.origin !== "null" ? window.location.origin : window.location.href), Ve(s, "No window.location.(origin|href) available to create URL");
    let u = typeof r == "string" ? r : Xi(r);
    return u = u.replace(/ $/, "%20"), !l && u.startsWith("//") && (u = s + u), new URL(u, s)
}

function zh(r, l, s = "/") {
    return sy(r, l, s, !1)
}

function sy(r, l, s, u) {
    let c = typeof l == "string" ? Ki(l) : l,
        f = aa(c.pathname || "/", s);
    if (f == null) return null;
    let d = Lh(r);
    oy(d);
    let p = null;
    for (let m = 0; p == null && m < d.length; ++m) {
        let g = by(f);
        p = yy(d[m], g, u)
    }
    return p
}

function Lh(r, l = [], s = [], u = "", c = !1) {
    let f = (d, p, m = c, g) => {
        let v = {
            relativePath: g === void 0 ? d.path || "" : g,
            caseSensitive: d.caseSensitive === !0,
            childrenIndex: p,
            route: d
        };
        if (v.relativePath.startsWith("/")) {
            if (!v.relativePath.startsWith(u) && m) return;
            Ve(v.relativePath.startsWith(u), `Absolute route path "${v.relativePath}" nested under path "${u}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`), v.relativePath = v.relativePath.slice(u.length)
        }
        let b = ta([u, v.relativePath]),
            S = s.concat(v);
        d.children && d.children.length > 0 && (Ve(d.index !== !0, `Index routes must not have child routes. Please remove all child routes from route path "${b}".`), Lh(d.children, l, S, b, m)), !(d.path == null && !d.index) && l.push({
            path: b,
            score: my(b, d.index),
            routesMeta: S
        })
    };
    return r.forEach((d, p) => {
        if (d.path === "" || !d.path?.includes("?")) f(d, p);
        else
            for (let m of Dh(d.path)) f(d, p, !0, m)
    }), l
}

function Dh(r) {
    let l = r.split("/");
    if (l.length === 0) return [];
    let [s, ...u] = l, c = s.endsWith("?"), f = s.replace(/\?$/, "");
    if (u.length === 0) return c ? [f, ""] : [f];
    let d = Dh(u.join("/")),
        p = [];
    return p.push(...d.map(m => m === "" ? f : [f, m].join("/"))), c && p.push(...d), p.map(m => r.startsWith("/") && m === "" ? "/" : m)
}

function oy(r) {
    r.sort((l, s) => l.score !== s.score ? s.score - l.score : py(l.routesMeta.map(u => u.childrenIndex), s.routesMeta.map(u => u.childrenIndex)))
}
var uy = /^:[\w-]+$/,
    cy = 3,
    fy = 2,
    dy = 1,
    hy = 10,
    gy = -2,
    hh = r => r === "*";

function my(r, l) {
    let s = r.split("/"),
        u = s.length;
    return s.some(hh) && (u += gy), l && (u += fy), s.filter(c => !hh(c)).reduce((c, f) => c + (uy.test(f) ? cy : f === "" ? dy : hy), u)
}

function py(r, l) {
    return r.length === l.length && r.slice(0, -1).every((u, c) => u === l[c]) ? r[r.length - 1] - l[l.length - 1] : 0
}

function yy(r, l, s = !1) {
    let {
        routesMeta: u
    } = r, c = {}, f = "/", d = [];
    for (let p = 0; p < u.length; ++p) {
        let m = u[p],
            g = p === u.length - 1,
            v = f === "/" ? l : l.slice(f.length) || "/",
            b = wr({
                path: m.relativePath,
                caseSensitive: m.caseSensitive,
                end: g
            }, v),
            S = m.route;
        if (!b && g && s && !u[u.length - 1].route.index && (b = wr({
                path: m.relativePath,
                caseSensitive: m.caseSensitive,
                end: !1
            }, v)), !b) return null;
        Object.assign(c, b.params), d.push({
            params: c,
            pathname: ta([f, b.pathname]),
            pathnameBase: Cy(ta([f, b.pathnameBase])),
            route: S
        }), b.pathnameBase !== "/" && (f = ta([f, b.pathnameBase]))
    }
    return d
}

function wr(r, l) {
    typeof r == "string" && (r = {
        path: r,
        caseSensitive: !1,
        end: !0
    });
    let [s, u] = vy(r.path, r.caseSensitive, r.end), c = l.match(s);
    if (!c) return null;
    let f = c[0],
        d = f.replace(/(.)\/+$/, "$1"),
        p = c.slice(1);
    return {
        params: u.reduce((g, {
            paramName: v,
            isOptional: b
        }, S) => {
            if (v === "*") {
                let C = p[S] || "";
                d = f.slice(0, f.length - C.length).replace(/(.)\/+$/, "$1")
            }
            const x = p[S];
            return b && !x ? g[v] = void 0 : g[v] = (x || "").replace(/%2F/g, "/"), g
        }, {}),
        pathname: f,
        pathnameBase: d,
        pattern: r
    }
}

function vy(r, l = !1, s = !0) {
    Ut(r === "*" || !r.endsWith("*") || r.endsWith("/*"), `Route path "${r}" will be treated as if it were "${r.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${r.replace(/\*$/,"/*")}".`);
    let u = [],
        c = "^" + r.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (d, p, m) => (u.push({
            paramName: p,
            isOptional: m != null
        }), m ? "/?([^\\/]+)?" : "/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
    return r.endsWith("*") ? (u.push({
        paramName: "*"
    }), c += r === "*" || r === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : s ? c += "\\/*$" : r !== "" && r !== "/" && (c += "(?:(?=\\/|$))"), [new RegExp(c, l ? void 0 : "i"), u]
}

function by(r) {
    try {
        return r.split("/").map(l => decodeURIComponent(l).replace(/\//g, "%2F")).join("/")
    } catch (l) {
        return Ut(!1, `The URL path "${r}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${l}).`), r
    }
}

function aa(r, l) {
    if (l === "/") return r;
    if (!r.toLowerCase().startsWith(l.toLowerCase())) return null;
    let s = l.endsWith("/") ? l.length - 1 : l.length,
        u = r.charAt(s);
    return u && u !== "/" ? null : r.slice(s) || "/"
}

function Sy(r, l = "/") {
    let {
        pathname: s,
        search: u = "",
        hash: c = ""
    } = typeof r == "string" ? Ki(r) : r;
    return {
        pathname: s ? s.startsWith("/") ? s : xy(s, l) : l,
        search: Ey(u),
        hash: _y(c)
    }
}

function xy(r, l) {
    let s = l.replace(/\/+$/, "").split("/");
    return r.split("/").forEach(c => {
        c === ".." ? s.length > 1 && s.pop() : c !== "." && s.push(c)
    }), s.length > 1 ? s.join("/") : "/"
}

function uu(r, l, s, u) {
    return `Cannot include a '${r}' character in a manually specified \`to.${l}\` field [${JSON.stringify(u)}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}

function wy(r) {
    return r.filter((l, s) => s === 0 || l.route.path && l.route.path.length > 0)
}

function jh(r) {
    let l = wy(r);
    return l.map((s, u) => u === l.length - 1 ? s.pathname : s.pathnameBase)
}

function Uh(r, l, s, u = !1) {
    let c;
    typeof r == "string" ? c = Ki(r) : (c = {
        ...r
    }, Ve(!c.pathname || !c.pathname.includes("?"), uu("?", "pathname", "search", c)), Ve(!c.pathname || !c.pathname.includes("#"), uu("#", "pathname", "hash", c)), Ve(!c.search || !c.search.includes("#"), uu("#", "search", "hash", c)));
    let f = r === "" || c.pathname === "",
        d = f ? "/" : c.pathname,
        p;
    if (d == null) p = s;
    else {
        let b = l.length - 1;
        if (!u && d.startsWith("..")) {
            let S = d.split("/");
            for (; S[0] === "..";) S.shift(), b -= 1;
            c.pathname = S.join("/")
        }
        p = b >= 0 ? l[b] : "/"
    }
    let m = Sy(c, p),
        g = d && d !== "/" && d.endsWith("/"),
        v = (f || d === ".") && s.endsWith("/");
    return !m.pathname.endsWith("/") && (g || v) && (m.pathname += "/"), m
}
var ta = r => r.join("/").replace(/\/\/+/g, "/"),
    Cy = r => r.replace(/\/+$/, "").replace(/^\/*/, "/"),
    Ey = r => !r || r === "?" ? "" : r.startsWith("?") ? r : "?" + r,
    _y = r => !r || r === "#" ? "" : r.startsWith("#") ? r : "#" + r;

function My(r) {
    return r != null && typeof r.status == "number" && typeof r.statusText == "string" && typeof r.internal == "boolean" && "data" in r
}
var Bh = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Bh);
var Oy = ["GET", ...Bh];
new Set(Oy);
var Un = G.createContext(null);
Un.displayName = "DataRouter";
var Mr = G.createContext(null);
Mr.displayName = "DataRouterState";
G.createContext(!1);
var Hh = G.createContext({
    isTransitioning: !1
});
Hh.displayName = "ViewTransition";
var Ry = G.createContext(new Map);
Ry.displayName = "Fetchers";
var qy = G.createContext(null);
qy.displayName = "Await";
var Bt = G.createContext(null);
Bt.displayName = "Navigation";
var Or = G.createContext(null);
Or.displayName = "Location";
var Ht = G.createContext({
    outlet: null,
    matches: [],
    isDataRoute: !1
});
Ht.displayName = "Route";
var Su = G.createContext(null);
Su.displayName = "RouteError";

function Ay(r, {
    relative: l
} = {}) {
    Ve(Zi(), "useHref() may be used only in the context of a <Router> component.");
    let {
        basename: s,
        navigator: u
    } = G.useContext(Bt), {
        hash: c,
        pathname: f,
        search: d
    } = Ji(r, {
        relative: l
    }), p = f;
    return s !== "/" && (p = f === "/" ? s : ta([s, f])), u.createHref({
        pathname: p,
        search: d,
        hash: c
    })
}

function Zi() {
    return G.useContext(Or) != null
}

function Ra() {
    return Ve(Zi(), "useLocation() may be used only in the context of a <Router> component."), G.useContext(Or).location
}
var Gh = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";

function kh(r) {
    G.useContext(Bt).static || G.useLayoutEffect(r)
}

function $i() {
    let {
        isDataRoute: r
    } = G.useContext(Ht);
    return r ? Qy() : Ty()
}

function Ty() {
    Ve(Zi(), "useNavigate() may be used only in the context of a <Router> component.");
    let r = G.useContext(Un),
        {
            basename: l,
            navigator: s
        } = G.useContext(Bt),
        {
            matches: u
        } = G.useContext(Ht),
        {
            pathname: c
        } = Ra(),
        f = JSON.stringify(jh(u)),
        d = G.useRef(!1);
    return kh(() => {
        d.current = !0
    }), G.useCallback((m, g = {}) => {
        if (Ut(d.current, Gh), !d.current) return;
        if (typeof m == "number") {
            s.go(m);
            return
        }
        let v = Uh(m, JSON.parse(f), c, g.relative === "path");
        r == null && l !== "/" && (v.pathname = v.pathname === "/" ? l : ta([l, v.pathname])), (g.replace ? s.replace : s.push)(v, g.state, g)
    }, [l, s, f, c, r])
}
G.createContext(null);

function Ny() {
    let {
        matches: r
    } = G.useContext(Ht), l = r[r.length - 1];
    return l ? l.params : {}
}

function Ji(r, {
    relative: l
} = {}) {
    let {
        matches: s
    } = G.useContext(Ht), {
        pathname: u
    } = Ra(), c = JSON.stringify(jh(s));
    return G.useMemo(() => Uh(r, JSON.parse(c), u, l === "path"), [r, c, u, l])
}

function zy(r, l) {
    return Yh(r)
}

function Yh(r, l, s, u, c) {
    Ve(Zi(), "useRoutes() may be used only in the context of a <Router> component.");
    let {
        navigator: f
    } = G.useContext(Bt), {
        matches: d
    } = G.useContext(Ht), p = d[d.length - 1], m = p ? p.params : {}, g = p ? p.pathname : "/", v = p ? p.pathnameBase : "/", b = p && p.route;
    {
        let D = b && b.path || "";
        Vh(g, !b || D.endsWith("*") || D.endsWith("*?"), `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${D}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${D}"> to <Route path="${D==="/"?"*":`${D}/*`}">.`)
    }
    let S = Ra(),
        x;
    x = S;
    let C = x.pathname || "/",
        T = C;
    if (v !== "/") {
        let D = v.replace(/^\//, "").split("/");
        T = "/" + C.replace(/^\//, "").split("/").slice(D.length).join("/")
    }
    let M = zh(r, {
        pathname: T
    });
    return Ut(b || M != null, `No routes matched location "${x.pathname}${x.search}${x.hash}" `), Ut(M == null || M[M.length - 1].route.element !== void 0 || M[M.length - 1].route.Component !== void 0 || M[M.length - 1].route.lazy !== void 0, `Matched leaf route at location "${x.pathname}${x.search}${x.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`), By(M && M.map(D => Object.assign({}, D, {
        params: Object.assign({}, m, D.params),
        pathname: ta([v, f.encodeLocation ? f.encodeLocation(D.pathname).pathname : D.pathname]),
        pathnameBase: D.pathnameBase === "/" ? v : ta([v, f.encodeLocation ? f.encodeLocation(D.pathnameBase).pathname : D.pathnameBase])
    })), d, s, u, c)
}

function Ly() {
    let r = Vy(),
        l = My(r) ? `${r.status} ${r.statusText}` : r instanceof Error ? r.message : JSON.stringify(r),
        s = r instanceof Error ? r.stack : null,
        u = "rgba(200,200,200, 0.5)",
        c = {
            padding: "0.5rem",
            backgroundColor: u
        },
        f = {
            padding: "2px 4px",
            backgroundColor: u
        },
        d = null;
    return console.error("Error handled by React Router default ErrorBoundary:", r), d = G.createElement(G.Fragment, null, G.createElement("p", null, "💿 Hey developer 👋"), G.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", G.createElement("code", {
        style: f
    }, "ErrorBoundary"), " or", " ", G.createElement("code", {
        style: f
    }, "errorElement"), " prop on your route.")), G.createElement(G.Fragment, null, G.createElement("h2", null, "Unexpected Application Error!"), G.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, l), s ? G.createElement("pre", {
        style: c
    }, s) : null, d)
}
var Dy = G.createElement(Ly, null),
    jy = class extends G.Component {
        constructor(r) {
            super(r), this.state = {
                location: r.location,
                revalidation: r.revalidation,
                error: r.error
            }
        }
        static getDerivedStateFromError(r) {
            return {
                error: r
            }
        }
        static getDerivedStateFromProps(r, l) {
            return l.location !== r.location || l.revalidation !== "idle" && r.revalidation === "idle" ? {
                error: r.error,
                location: r.location,
                revalidation: r.revalidation
            } : {
                error: r.error !== void 0 ? r.error : l.error,
                location: l.location,
                revalidation: r.revalidation || l.revalidation
            }
        }
        componentDidCatch(r, l) {
            this.props.unstable_onError ? this.props.unstable_onError(r, l) : console.error("React Router caught the following error during render", r)
        }
        render() {
            return this.state.error !== void 0 ? G.createElement(Ht.Provider, {
                value: this.props.routeContext
            }, G.createElement(Su.Provider, {
                value: this.state.error,
                children: this.props.component
            })) : this.props.children
        }
    };

function Uy({
    routeContext: r,
    match: l,
    children: s
}) {
    let u = G.useContext(Un);
    return u && u.static && u.staticContext && (l.route.errorElement || l.route.ErrorBoundary) && (u.staticContext._deepestRenderedBoundaryId = l.route.id), G.createElement(Ht.Provider, {
        value: r
    }, s)
}

function By(r, l = [], s = null, u = null, c = null) {
    if (r == null) {
        if (!s) return null;
        if (s.errors) r = s.matches;
        else if (l.length === 0 && !s.initialized && s.matches.length > 0) r = s.matches;
        else return null
    }
    let f = r,
        d = s?.errors;
    if (d != null) {
        let g = f.findIndex(v => v.route.id && d?.[v.route.id] !== void 0);
        Ve(g >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(",")}`), f = f.slice(0, Math.min(f.length, g + 1))
    }
    let p = !1,
        m = -1;
    if (s)
        for (let g = 0; g < f.length; g++) {
            let v = f[g];
            if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (m = g), v.route.id) {
                let {
                    loaderData: b,
                    errors: S
                } = s, x = v.route.loader && !b.hasOwnProperty(v.route.id) && (!S || S[v.route.id] === void 0);
                if (v.route.lazy || x) {
                    p = !0, m >= 0 ? f = f.slice(0, m + 1) : f = [f[0]];
                    break
                }
            }
        }
    return f.reduceRight((g, v, b) => {
        let S, x = !1,
            C = null,
            T = null;
        s && (S = d && v.route.id ? d[v.route.id] : void 0, C = v.route.errorElement || Dy, p && (m < 0 && b === 0 ? (Vh("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), x = !0, T = null) : m === b && (x = !0, T = v.route.hydrateFallbackElement || null)));
        let M = l.concat(f.slice(0, b + 1)),
            L = () => {
                let D;
                return S ? D = C : x ? D = T : v.route.Component ? D = G.createElement(v.route.Component, null) : v.route.element ? D = v.route.element : D = g, G.createElement(Uy, {
                    match: v,
                    routeContext: {
                        outlet: g,
                        matches: M,
                        isDataRoute: s != null
                    },
                    children: D
                })
            };
        return s && (v.route.ErrorBoundary || v.route.errorElement || b === 0) ? G.createElement(jy, {
            location: s.location,
            revalidation: s.revalidation,
            component: C,
            error: S,
            children: L(),
            routeContext: {
                outlet: null,
                matches: M,
                isDataRoute: !0
            },
            unstable_onError: u
        }) : L()
    }, null)
}

function xu(r) {
    return `${r} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}

function Hy(r) {
    let l = G.useContext(Un);
    return Ve(l, xu(r)), l
}

function Gy(r) {
    let l = G.useContext(Mr);
    return Ve(l, xu(r)), l
}

function ky(r) {
    let l = G.useContext(Ht);
    return Ve(l, xu(r)), l
}

function wu(r) {
    let l = ky(r),
        s = l.matches[l.matches.length - 1];
    return Ve(s.route.id, `${r} can only be used on routes that contain a unique "id"`), s.route.id
}

function Yy() {
    return wu("useRouteId")
}

function Vy() {
    let r = G.useContext(Su),
        l = Gy("useRouteError"),
        s = wu("useRouteError");
    return r !== void 0 ? r : l.errors?.[s]
}

function Qy() {
    let {
        router: r
    } = Hy("useNavigate"), l = wu("useNavigate"), s = G.useRef(!1);
    return kh(() => {
        s.current = !0
    }), G.useCallback(async (c, f = {}) => {
        Ut(s.current, Gh), s.current && (typeof c == "number" ? r.navigate(c) : await r.navigate(c, {
            fromRouteId: l,
            ...f
        }))
    }, [r, l])
}
var gh = {};

function Vh(r, l, s) {
    !l && !gh[r] && (gh[r] = !0, Ut(!1, s))
}
G.memo(Xy);

function Xy({
    routes: r,
    future: l,
    state: s,
    unstable_onError: u
}) {
    return Yh(r, void 0, s, u, l)
}

function Ky({
    basename: r = "/",
    children: l = null,
    location: s,
    navigationType: u = "POP",
    navigator: c,
    static: f = !1
}) {
    Ve(!Zi(), "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
    let d = r.replace(/^\/*/, "/"),
        p = G.useMemo(() => ({
            basename: d,
            navigator: c,
            static: f,
            future: {}
        }), [d, c, f]);
    typeof s == "string" && (s = Ki(s));
    let {
        pathname: m = "/",
        search: g = "",
        hash: v = "",
        state: b = null,
        key: S = "default"
    } = s, x = G.useMemo(() => {
        let C = aa(m, d);
        return C == null ? null : {
            location: {
                pathname: C,
                search: g,
                hash: v,
                state: b,
                key: S
            },
            navigationType: u
        }
    }, [d, m, g, v, b, S, u]);
    return Ut(x != null, `<Router basename="${d}"> is not able to match the URL "${m}${g}${v}" because it does not start with the basename, so the <Router> won't render anything.`), x == null ? null : G.createElement(Bt.Provider, {
        value: p
    }, G.createElement(Or.Provider, {
        children: l,
        value: x
    }))
}
var pr = "get",
    yr = "application/x-www-form-urlencoded";

function Rr(r) {
    return r != null && typeof r.tagName == "string"
}

function Zy(r) {
    return Rr(r) && r.tagName.toLowerCase() === "button"
}

function $y(r) {
    return Rr(r) && r.tagName.toLowerCase() === "form"
}

function Jy(r) {
    return Rr(r) && r.tagName.toLowerCase() === "input"
}

function Fy(r) {
    return !!(r.metaKey || r.altKey || r.ctrlKey || r.shiftKey)
}

function Py(r, l) {
    return r.button === 0 && (!l || l === "_self") && !Fy(r)
}
var mr = null;

function Wy() {
    if (mr === null) try {
        new FormData(document.createElement("form"), 0), mr = !1
    } catch {
        mr = !0
    }
    return mr
}
var Iy = new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);

function cu(r) {
    return r != null && !Iy.has(r) ? (Ut(!1, `"${r}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${yr}"`), null) : r
}

function ev(r, l) {
    let s, u, c, f, d;
    if ($y(r)) {
        let p = r.getAttribute("action");
        u = p ? aa(p, l) : null, s = r.getAttribute("method") || pr, c = cu(r.getAttribute("enctype")) || yr, f = new FormData(r)
    } else if (Zy(r) || Jy(r) && (r.type === "submit" || r.type === "image")) {
        let p = r.form;
        if (p == null) throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
        let m = r.getAttribute("formaction") || p.getAttribute("action");
        if (u = m ? aa(m, l) : null, s = r.getAttribute("formmethod") || p.getAttribute("method") || pr, c = cu(r.getAttribute("formenctype")) || cu(p.getAttribute("enctype")) || yr, f = new FormData(p, r), !Wy()) {
            let {
                name: g,
                type: v,
                value: b
            } = r;
            if (v === "image") {
                let S = g ? `${g}.` : "";
                f.append(`${S}x`, "0"), f.append(`${S}y`, "0")
            } else g && f.append(g, b)
        }
    } else {
        if (Rr(r)) throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
        s = pr, u = null, c = yr, d = r
    }
    return f && c === "text/plain" && (d = f, f = void 0), {
        action: u,
        method: s.toLowerCase(),
        encType: c,
        formData: f,
        body: d
    }
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");

function Cu(r, l) {
    if (r === !1 || r === null || typeof r > "u") throw new Error(l)
}

function tv(r, l, s) {
    let u = typeof r == "string" ? new URL(r, typeof window > "u" ? "server://singlefetch/" : window.location.origin) : r;
    return u.pathname === "/" ? u.pathname = `_root.${s}` : l && aa(u.pathname, l) === "/" ? u.pathname = `${l.replace(/\/$/,"")}/_root.${s}` : u.pathname = `${u.pathname.replace(/\/$/,"")}.${s}`, u
}
async function av(r, l) {
    if (r.id in l) return l[r.id];
    try {
        let s = await import(r.module);
        return l[r.id] = s, s
    } catch (s) {
        return console.error(`Error loading route module \`${r.module}\`, reloading page...`), console.error(s), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {})
    }
}

function nv(r) {
    return r == null ? !1 : r.href == null ? r.rel === "preload" && typeof r.imageSrcSet == "string" && typeof r.imageSizes == "string" : typeof r.rel == "string" && typeof r.href == "string"
}
async function iv(r, l, s) {
    let u = await Promise.all(r.map(async c => {
        let f = l.routes[c.route.id];
        if (f) {
            let d = await av(f, s);
            return d.links ? d.links() : []
        }
        return []
    }));
    return ov(u.flat(1).filter(nv).filter(c => c.rel === "stylesheet" || c.rel === "preload").map(c => c.rel === "stylesheet" ? {
        ...c,
        rel: "prefetch",
        as: "style"
    } : {
        ...c,
        rel: "prefetch"
    }))
}

function mh(r, l, s, u, c, f) {
    let d = (m, g) => s[g] ? m.route.id !== s[g].route.id : !0,
        p = (m, g) => s[g].pathname !== m.pathname || s[g].route.path?.endsWith("*") && s[g].params["*"] !== m.params["*"];
    return f === "assets" ? l.filter((m, g) => d(m, g) || p(m, g)) : f === "data" ? l.filter((m, g) => {
        let v = u.routes[m.route.id];
        if (!v || !v.hasLoader) return !1;
        if (d(m, g) || p(m, g)) return !0;
        if (m.route.shouldRevalidate) {
            let b = m.route.shouldRevalidate({
                currentUrl: new URL(c.pathname + c.search + c.hash, window.origin),
                currentParams: s[0]?.params || {},
                nextUrl: new URL(r, window.origin),
                nextParams: m.params,
                defaultShouldRevalidate: !0
            });
            if (typeof b == "boolean") return b
        }
        return !0
    }) : []
}

function lv(r, l, {
    includeHydrateFallback: s
} = {}) {
    return rv(r.map(u => {
        let c = l.routes[u.route.id];
        if (!c) return [];
        let f = [c.module];
        return c.clientActionModule && (f = f.concat(c.clientActionModule)), c.clientLoaderModule && (f = f.concat(c.clientLoaderModule)), s && c.hydrateFallbackModule && (f = f.concat(c.hydrateFallbackModule)), c.imports && (f = f.concat(c.imports)), f
    }).flat(1))
}

function rv(r) {
    return [...new Set(r)]
}

function sv(r) {
    let l = {},
        s = Object.keys(r).sort();
    for (let u of s) l[u] = r[u];
    return l
}

function ov(r, l) {
    let s = new Set;
    return new Set(l), r.reduce((u, c) => {
        let f = JSON.stringify(sv(c));
        return s.has(f) || (s.add(f), u.push({
            key: f,
            link: c
        })), u
    }, [])
}

function Qh() {
    let r = G.useContext(Un);
    return Cu(r, "You must render this element inside a <DataRouterContext.Provider> element"), r
}

function uv() {
    let r = G.useContext(Mr);
    return Cu(r, "You must render this element inside a <DataRouterStateContext.Provider> element"), r
}
var Eu = G.createContext(void 0);
Eu.displayName = "FrameworkContext";

function Xh() {
    let r = G.useContext(Eu);
    return Cu(r, "You must render this element inside a <HydratedRouter> element"), r
}

function cv(r, l) {
    let s = G.useContext(Eu),
        [u, c] = G.useState(!1),
        [f, d] = G.useState(!1),
        {
            onFocus: p,
            onBlur: m,
            onMouseEnter: g,
            onMouseLeave: v,
            onTouchStart: b
        } = l,
        S = G.useRef(null);
    G.useEffect(() => {
        if (r === "render" && d(!0), r === "viewport") {
            let T = L => {
                    L.forEach(D => {
                        d(D.isIntersecting)
                    })
                },
                M = new IntersectionObserver(T, {
                    threshold: .5
                });
            return S.current && M.observe(S.current), () => {
                M.disconnect()
            }
        }
    }, [r]), G.useEffect(() => {
        if (u) {
            let T = setTimeout(() => {
                d(!0)
            }, 100);
            return () => {
                clearTimeout(T)
            }
        }
    }, [u]);
    let x = () => {
            c(!0)
        },
        C = () => {
            c(!1), d(!1)
        };
    return s ? r !== "intent" ? [f, S, {}] : [f, S, {
        onFocus: Gi(p, x),
        onBlur: Gi(m, C),
        onMouseEnter: Gi(g, x),
        onMouseLeave: Gi(v, C),
        onTouchStart: Gi(b, x)
    }] : [!1, S, {}]
}

function Gi(r, l) {
    return s => {
        r && r(s), s.defaultPrevented || l(s)
    }
}

function fv({
    page: r,
    ...l
}) {
    let {
        router: s
    } = Qh(), u = G.useMemo(() => zh(s.routes, r, s.basename), [s.routes, r, s.basename]);
    return u ? G.createElement(hv, {
        page: r,
        matches: u,
        ...l
    }) : null
}

function dv(r) {
    let {
        manifest: l,
        routeModules: s
    } = Xh(), [u, c] = G.useState([]);
    return G.useEffect(() => {
        let f = !1;
        return iv(r, l, s).then(d => {
            f || c(d)
        }), () => {
            f = !0
        }
    }, [r, l, s]), u
}

function hv({
    page: r,
    matches: l,
    ...s
}) {
    let u = Ra(),
        {
            manifest: c,
            routeModules: f
        } = Xh(),
        {
            basename: d
        } = Qh(),
        {
            loaderData: p,
            matches: m
        } = uv(),
        g = G.useMemo(() => mh(r, l, m, c, u, "data"), [r, l, m, c, u]),
        v = G.useMemo(() => mh(r, l, m, c, u, "assets"), [r, l, m, c, u]),
        b = G.useMemo(() => {
            if (r === u.pathname + u.search + u.hash) return [];
            let C = new Set,
                T = !1;
            if (l.forEach(L => {
                    let D = c.routes[L.route.id];
                    !D || !D.hasLoader || (!g.some(V => V.route.id === L.route.id) && L.route.id in p && f[L.route.id]?.shouldRevalidate || D.hasClientLoader ? T = !0 : C.add(L.route.id))
                }), C.size === 0) return [];
            let M = tv(r, d, "data");
            return T && C.size > 0 && M.searchParams.set("_routes", l.filter(L => C.has(L.route.id)).map(L => L.route.id).join(",")), [M.pathname + M.search]
        }, [d, p, u, c, g, l, r, f]),
        S = G.useMemo(() => lv(v, c), [v, c]),
        x = dv(v);
    return G.createElement(G.Fragment, null, b.map(C => G.createElement("link", {
        key: C,
        rel: "prefetch",
        as: "fetch",
        href: C,
        ...s
    })), S.map(C => G.createElement("link", {
        key: C,
        rel: "modulepreload",
        href: C,
        ...s
    })), x.map(({
        key: C,
        link: T
    }) => G.createElement("link", {
        key: C,
        nonce: s.nonce,
        ...T
    })))
}

function gv(...r) {
    return l => {
        r.forEach(s => {
            typeof s == "function" ? s(l) : s != null && (s.current = l)
        })
    }
}
var Kh = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
    Kh && (window.__reactRouterVersion = "7.9.1")
} catch {}

function mv({
    basename: r,
    children: l,
    window: s
}) {
    let u = G.useRef();
    u.current == null && (u.current = ny({
        window: s,
        v5Compat: !0
    }));
    let c = u.current,
        [f, d] = G.useState({
            action: c.action,
            location: c.location
        }),
        p = G.useCallback(m => {
            G.startTransition(() => d(m))
        }, [d]);
    return G.useLayoutEffect(() => c.listen(p), [c, p]), G.createElement(Ky, {
        basename: r,
        children: l,
        location: f.location,
        navigationType: f.action,
        navigator: c
    })
}
var Zh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    $h = G.forwardRef(function({
        onClick: l,
        discover: s = "render",
        prefetch: u = "none",
        relative: c,
        reloadDocument: f,
        replace: d,
        state: p,
        target: m,
        to: g,
        preventScrollReset: v,
        viewTransition: b,
        ...S
    }, x) {
        let {
            basename: C
        } = G.useContext(Bt), T = typeof g == "string" && Zh.test(g), M, L = !1;
        if (typeof g == "string" && T && (M = g, Kh)) try {
            let ve = new URL(window.location.href),
                Y = g.startsWith("//") ? new URL(ve.protocol + g) : new URL(g),
                K = aa(Y.pathname, C);
            Y.origin === ve.origin && K != null ? g = K + Y.search + Y.hash : L = !0
        } catch {
            Ut(!1, `<Link to="${g}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)
        }
        let D = Ay(g, {
                relative: c
            }),
            [V, W, Q] = cv(u, S),
            oe = bv(g, {
                replace: d,
                state: p,
                target: m,
                preventScrollReset: v,
                relative: c,
                viewTransition: b
            });

        function me(ve) {
            l && l(ve), ve.defaultPrevented || oe(ve)
        }
        let $ = G.createElement("a", {
            ...S,
            ...Q,
            href: M || D,
            onClick: L || f ? l : me,
            ref: gv(x, W),
            target: m,
            "data-discover": !T && s === "render" ? "true" : void 0
        });
        return V && !T ? G.createElement(G.Fragment, null, $, G.createElement(fv, {
            page: D
        })) : $
    });
$h.displayName = "Link";
var pv = G.forwardRef(function({
    "aria-current": l = "page",
    caseSensitive: s = !1,
    className: u = "",
    end: c = !1,
    style: f,
    to: d,
    viewTransition: p,
    children: m,
    ...g
}, v) {
    let b = Ji(d, {
            relative: g.relative
        }),
        S = Ra(),
        x = G.useContext(Mr),
        {
            navigator: C,
            basename: T
        } = G.useContext(Bt),
        M = x != null && Ev(b) && p === !0,
        L = C.encodeLocation ? C.encodeLocation(b).pathname : b.pathname,
        D = S.pathname,
        V = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
    s || (D = D.toLowerCase(), V = V ? V.toLowerCase() : null, L = L.toLowerCase()), V && T && (V = aa(V, T) || V);
    const W = L !== "/" && L.endsWith("/") ? L.length - 1 : L.length;
    let Q = D === L || !c && D.startsWith(L) && D.charAt(W) === "/",
        oe = V != null && (V === L || !c && V.startsWith(L) && V.charAt(L.length) === "/"),
        me = {
            isActive: Q,
            isPending: oe,
            isTransitioning: M
        },
        $ = Q ? l : void 0,
        ve;
    typeof u == "function" ? ve = u(me) : ve = [u, Q ? "active" : null, oe ? "pending" : null, M ? "transitioning" : null].filter(Boolean).join(" ");
    let Y = typeof f == "function" ? f(me) : f;
    return G.createElement($h, {
        ...g,
        "aria-current": $,
        className: ve,
        ref: v,
        style: Y,
        to: d,
        viewTransition: p
    }, typeof m == "function" ? m(me) : m)
});
pv.displayName = "NavLink";
var yv = G.forwardRef(({
    discover: r = "render",
    fetcherKey: l,
    navigate: s,
    reloadDocument: u,
    replace: c,
    state: f,
    method: d = pr,
    action: p,
    onSubmit: m,
    relative: g,
    preventScrollReset: v,
    viewTransition: b,
    ...S
}, x) => {
    let C = wv(),
        T = Cv(p, {
            relative: g
        }),
        M = d.toLowerCase() === "get" ? "get" : "post",
        L = typeof p == "string" && Zh.test(p),
        D = V => {
            if (m && m(V), V.defaultPrevented) return;
            V.preventDefault();
            let W = V.nativeEvent.submitter,
                Q = W?.getAttribute("formmethod") || d;
            C(W || V.currentTarget, {
                fetcherKey: l,
                method: Q,
                navigate: s,
                replace: c,
                state: f,
                relative: g,
                preventScrollReset: v,
                viewTransition: b
            })
        };
    return G.createElement("form", {
        ref: x,
        method: M,
        action: T,
        onSubmit: u ? m : D,
        ...S,
        "data-discover": !L && r === "render" ? "true" : void 0
    })
});
yv.displayName = "Form";

function vv(r) {
    return `${r} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}

function Jh(r) {
    let l = G.useContext(Un);
    return Ve(l, vv(r)), l
}

function bv(r, {
    target: l,
    replace: s,
    state: u,
    preventScrollReset: c,
    relative: f,
    viewTransition: d
} = {}) {
    let p = $i(),
        m = Ra(),
        g = Ji(r, {
            relative: f
        });
    return G.useCallback(v => {
        if (Py(v, l)) {
            v.preventDefault();
            let b = s !== void 0 ? s : Xi(m) === Xi(g);
            p(r, {
                replace: b,
                state: u,
                preventScrollReset: c,
                relative: f,
                viewTransition: d
            })
        }
    }, [m, p, g, s, u, l, r, c, f, d])
}
var Sv = 0,
    xv = () => `__${String(++Sv)}__`;

function wv() {
    let {
        router: r
    } = Jh("useSubmit"), {
        basename: l
    } = G.useContext(Bt), s = Yy();
    return G.useCallback(async (u, c = {}) => {
        let {
            action: f,
            method: d,
            encType: p,
            formData: m,
            body: g
        } = ev(u, l);
        if (c.navigate === !1) {
            let v = c.fetcherKey || xv();
            await r.fetch(v, s, c.action || f, {
                preventScrollReset: c.preventScrollReset,
                formData: m,
                body: g,
                formMethod: c.method || d,
                formEncType: c.encType || p,
                flushSync: c.flushSync
            })
        } else await r.navigate(c.action || f, {
            preventScrollReset: c.preventScrollReset,
            formData: m,
            body: g,
            formMethod: c.method || d,
            formEncType: c.encType || p,
            replace: c.replace,
            state: c.state,
            fromRouteId: s,
            flushSync: c.flushSync,
            viewTransition: c.viewTransition
        })
    }, [r, l, s])
}

function Cv(r, {
    relative: l
} = {}) {
    let {
        basename: s
    } = G.useContext(Bt), u = G.useContext(Ht);
    Ve(u, "useFormAction must be used inside a RouteContext");
    let [c] = u.matches.slice(-1), f = {
        ...Ji(r || ".", {
            relative: l
        })
    }, d = Ra();
    if (r == null) {
        f.search = d.search;
        let p = new URLSearchParams(f.search),
            m = p.getAll("index");
        if (m.some(v => v === "")) {
            p.delete("index"), m.filter(b => b).forEach(b => p.append("index", b));
            let v = p.toString();
            f.search = v ? `?${v}` : ""
        }
    }
    return (!r || r === ".") && c.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), s !== "/" && (f.pathname = f.pathname === "/" ? s : ta([s, f.pathname])), Xi(f)
}

function Ev(r, {
    relative: l
} = {}) {
    let s = G.useContext(Hh);
    Ve(s != null, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
    let {
        basename: u
    } = Jh("useViewTransitionState"), c = Ji(r, {
        relative: l
    });
    if (!s.isTransitioning) return !1;
    let f = aa(s.currentLocation.pathname, u) || s.currentLocation.pathname,
        d = aa(s.nextLocation.pathname, u) || s.nextLocation.pathname;
    return wr(c.pathname, d) != null || wr(c.pathname, f) != null
}

function _v() {
    return E.jsxs("div", {
        className: "flex flex-col items-center justify-center h-screen text-center px-4",
        children: [E.jsx("h1", {
            className: "text-5xl md:text-5xl font-semibold text-gray-100",
            children: "404"
        }), E.jsx("h1", {
            className: "text-2xl md:text-3xl font-semibold mt-6",
            children: "This page has not been generated"
        }), E.jsx("p", {
            className: "mt-4 text-xl md:text-2xl text-gray-500",
            children: "Tell me what you would like on this page"
        })]
    })
}
const fu = [{
    id: 1,
    image: "https://readdy.ai/api/search-image?query=Epic%20gaming%20smartphone%20displaying%20multiple%20popular%20mobile%20games%20with%20neon%20holographic%20effects%2C%20futuristic%20gaming%20setup%20with%20RGB%20lighting%2C%20professional%20esports%20atmosphere%2C%20cyberpunk%20aesthetic%20with%20glowing%20blue%20and%20purple%20colors%2C%20high-tech%20gaming%20environment&width=1200&height=300&seq=banner1&orientation=landscape",
    title: "গেমিং টপআপ রেভোলিউশন",
    subtitle: "দ্রুততম ও নিরাপদ ডিজিটাল গেমিং সার্ভিস"
}, {
    id: 2,
    image: "https://readdy.ai/api/search-image?query=Floating%20diamond%20crystals%20and%20golden%20coins%20around%20gaming%20devices%2C%20magical%20gaming%20atmosphere%20with%20sparkle%20effects%2C%20premium%20luxury%20gaming%20aesthetic%2C%20dark%20background%20with%20vibrant%20neon%20accents%2C%20high-quality%20digital%20art%20with%20mystical%20energy&width=1200&height=300&seq=banner2&orientation=landscape",
    title: "প্রিমিয়াম ডায়মন্ড স্টোর",
    subtitle: "তাৎক্ষণিক ডেলিভারি ও সেরা রেট গ্যারান্টি"
}, {
    id: 3,
    image: "https://readdy.ai/api/search-image?query=Championship%20gaming%20tournament%20setup%20with%20golden%20trophy%20and%20gaming%20peripherals%2C%20competitive%20esports%20arena%20atmosphere%2C%20dramatic%20lighting%20with%20spotlight%20effects%2C%20professional%20gaming%20environment%20with%20victory%20celebration%20theme&width=1200&height=300&seq=banner3&orientation=landscape",
    title: "মেগা গেমিং অফার",
    subtitle: "প্রিমিয়াম প্যাকেজে ৩০% পর্যন্ত বোনাস"
}];

function Mv() {
    const [r, l] = G.useState(0);
    return G.useEffect(() => {
        const s = setInterval(() => {
            l(u => (u + 1) % fu.length)
        }, 6e3);
        return () => clearInterval(s)
    }, []), E.jsxs("div", {
        className: "relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden",
        children: [fu.map((s, u) => E.jsx("div", {
            className: `absolute inset-0 transition-all duration-1000 transform ${u===r?"opacity-100 scale-100":"opacity-0 scale-105"}`,
            children: E.jsxs("div", {
                className: "w-full h-full bg-cover bg-center relative",
                style: {
                    backgroundImage: `url(${s.image})`
                },
                children: [E.jsx("div", {
                    className: "absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"
                }), E.jsx("div", {
                    className: "absolute inset-0 flex items-center justify-center text-center text-white px-4",
                    children: E.jsxs("div", {
                        className: "max-w-4xl",
                        children: [E.jsx("h1", {
                            className: "text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-pulse",
                            children: s.title
                        }), E.jsx("p", {
                            className: "text-sm sm:text-base md:text-lg opacity-90 font-medium",
                            children: s.subtitle
                        }), E.jsx("div", {
                            className: "mt-2 sm:mt-4 flex justify-center",
                            children: E.jsx("div", {
                                className: "w-12 sm:w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            })
                        })]
                    })
                })]
            })
        }, s.id)), E.jsx("div", {
            className: "absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2",
            children: fu.map((s, u) => E.jsx("button", {
                onClick: () => l(u),
                className: `relative transition-all duration-300 ${u===r?"w-5 sm:w-6 h-2 bg-white rounded-full":"w-2 h-2 bg-white/50 rounded-full hover:bg-white/75"}`,
                children: u === r && E.jsx("div", {
                    className: "absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"
                })
            }, u))
        }), E.jsxs("div", {
            className: "absolute inset-0 pointer-events-none",
            children: [E.jsx("div", {
                className: "absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-75"
            }), E.jsx("div", {
                className: "absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse"
            }), E.jsx("div", {
                className: "absolute bottom-1/3 left-1/3 w-1 h-1 bg-pink-400 rounded-full animate-bounce"
            })]
        })]
    })
}

function Ov({
    game: r,
    onClick: l
}) {
    return E.jsxs("div", {
        onClick: l,
        className: "group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 overflow-hidden border border-gray-700/50 hover:border-blue-500/50 aspect-square",
        "data-product-shop": !0,
        children: [E.jsx("div", {
            className: "absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg sm:rounded-xl"
        }), E.jsxs("div", {
            className: "relative h-2/3 overflow-hidden rounded-t-lg sm:rounded-t-xl",
            children: [E.jsx("img", {
                src: r.image,
                alt: r.name,
                className: "w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            }), E.jsx("div", {
                className: "absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            })]
        }), E.jsxs("div", {
            className: "relative p-1.5 sm:p-2 md:p-3 h-1/3 flex flex-col justify-center",
            children: [E.jsx("h3", {
                className: "font-bold text-white text-center text-xs sm:text-sm mb-1 group-hover:text-blue-300 transition-colors duration-300 line-clamp-1",
                children: r.name
            }), E.jsx("div", {
                className: "flex items-center justify-center",
                children: E.jsxs("span", {
                    className: "inline-flex items-center px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 truncate max-w-full",
                    children: [E.jsx("i", {
                        className: "ri-fire-fill text-orange-400 mr-0.5 sm:mr-1 w-2 sm:w-3 h-2 sm:h-3 flex items-center justify-center flex-shrink-0"
                    }), E.jsx("span", {
                        className: "truncate text-xs",
                        children: r.popularity
                    })]
                })
            }), E.jsx("div", {
                className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
            })]
        }), E.jsx("div", {
            className: "absolute top-1 sm:top-2 right-1 sm:right-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-500 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"
        })]
    })
}

function je({
    title: r,
    games: l,
    onGameClick: s
}) {
    return E.jsxs("div", {
        className: "mb-8 sm:mb-12 px-2 sm:px-4",
        children: [E.jsxs("div", {
            className: "text-center mb-6 sm:mb-8",
            children: [E.jsx("h2", {
                className: "text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2",
                children: r
            }), E.jsx("div", {
                className: "w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            })]
        }), E.jsx("div", {
            className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4 lg:gap-5",
            children: l.map(u => E.jsx(Ov, {
                game: u,
                onClick: () => s(u.id)
            }, u.id))
        })]
    })
}
const ze = [{
    id: "free-fire",
    name: "Free Fire",
    image: "https://readdy.ai/api/search-image?query=Free%20Fire%20battle%20royale%20game%20logo%20with%20fire%20effects%2C%20orange%20and%20red%20flames%2C%20survival%20shooter%20theme%2C%20mobile%20gaming%20aesthetic%2C%20professional%20game%20icon%20design%20with%20glowing%20effects&width=300&height=300&seq=ff1&orientation=squarish",
    popularity: "500M+ প্লেয়ার",
    category: "battle-royale"
}, {
    id: "pubg-mobile",
    name: "PUBG Mobile",
    image: "https://readdy.ai/api/search-image?query=PUBG%20Mobile%20battle%20royale%20game%20logo%20with%20military%20helmet%20and%20weapons%2C%20tactical%20shooter%20theme%2C%20blue%20and%20orange%20colors%2C%20professional%20esports%20design%2C%20realistic%20military%20aesthetic&width=300&height=300&seq=pubg1&orientation=squarish",
    popularity: "1B+ প্লেয়ার",
    category: "battle-royale"
}, {
    id: "cod-mobile",
    name: "Call of Duty Mobile",
    image: "https://readdy.ai/api/search-image?query=Call%20of%20Duty%20Mobile%20game%20logo%20with%20skull%20emblem%20and%20military%20weapons%2C%20dark%20tactical%20theme%2C%20black%20and%20gold%20colors%2C%20professional%20FPS%20shooter%20design&width=300&height=300&seq=cod1&orientation=squarish",
    popularity: "650M+ প্লেয়ার",
    category: "battle-royale"
}, {
    id: "apex-legends",
    name: "Apex Legends Mobile",
    image: "https://readdy.ai/api/search-image?query=Apex%20Legends%20Mobile%20futuristic%20battle%20royale%20logo%20with%20robotic%20elements%2C%20orange%20and%20black%20sci-fi%20design%2C%20hero%20shooter%20aesthetic%2C%20professional%20gaming%20icon&width=300&height=300&seq=apex1&orientation=squarish",
    popularity: "200M+ প্লেয়ার",
    category: "battle-royale"
}, {
    id: "fortnite",
    name: "Fortnite",
    image: "https://readdy.ai/api/search-image?query=Fortnite%20battle%20royale%20game%20logo%20with%20colorful%20cartoon%20style%2C%20purple%20and%20blue%20gradient%2C%20building%20mechanics%20theme%2C%20vibrant%20gaming%20aesthetic&width=300&height=300&seq=fort1&orientation=squarish",
    popularity: "400M+ প্লেয়ার",
    category: "battle-royale"
}, {
    id: "rules-of-survival",
    name: "Rules of Survival",
    image: "https://readdy.ai/api/search-image?query=Rules%20of%20Survival%20battle%20royale%20game%20logo%20with%20survival%20theme%2C%20green%20military%20colors%2C%20tactical%20shooter%20design%2C%20professional%20mobile%20gaming%20icon&width=300&height=300&seq=ros1&orientation=squarish",
    popularity: "300M+ প্লেয়ার",
    category: "battle-royale"
}, {
    id: "garena-undawn",
    name: "Garena Undawn",
    image: "https://readdy.ai/api/search-image?query=Garena%20Undawn%20survival%20battle%20royale%20game%20logo%20with%20post-apocalyptic%20theme%2C%20zombie%20survival%20elements%2C%20dark%20orange%20and%20black%20colors%2C%20mobile%20gaming%20aesthetic&width=300&height=300&seq=und1&orientation=squarish",
    popularity: "80M+ প্লেয়ার",
    category: "battle-royale"
}, {
    id: "mobile-legends",
    name: "Mobile Legends",
    image: "https://readdy.ai/api/search-image?query=Mobile%20Legends%20MOBA%20game%20logo%20with%20fantasy%20heroes%20and%20magical%20sword%2C%20blue%20and%20gold%20royal%20colors%2C%20epic%20fantasy%20theme%2C%20professional%20esports%20design&width=300&height=300&seq=ml1&orientation=squarish",
    popularity: "1B+ প্লেয়ার",
    category: "moba"
}, {
    id: "arena-of-valor",
    name: "Arena of Valor",
    image: "https://readdy.ai/api/search-image?query=Arena%20of%20Valor%20MOBA%20game%20logo%20with%20heroic%20warriors%20and%20arena%20theme%2C%20red%20and%20gold%20colors%2C%20competitive%20gaming%20aesthetic%2C%20professional%20esports%20icon&width=300&height=300&seq=aov1&orientation=squarish",
    popularity: "200M+ প্লেয়ার",
    category: "moba"
}, {
    id: "wild-rift",
    name: "League of Legends Wild Rift",
    image: "https://readdy.ai/api/search-image?query=League%20of%20Legends%20Wild%20Rift%20MOBA%20logo%20with%20mystical%20champions%20and%20rift%20energy%2C%20blue%20and%20gold%20magical%20colors%2C%20fantasy%20esports%20theme&width=300&height=300&seq=wr1&orientation=squarish",
    popularity: "150M+ প্লেয়ার",
    category: "moba"
}, {
    id: "dota-underlords",
    name: "Dota Underlords",
    image: "https://readdy.ai/api/search-image?query=Dota%20Underlords%20auto-chess%20strategy%20game%20logo%20with%20chess%20pieces%20and%20magical%20elements%2C%20dark%20red%20and%20gold%20colors%2C%20strategic%20gaming%20theme&width=300&height=300&seq=du1&orientation=squarish",
    popularity: "50M+ প্লেয়ার",
    category: "moba"
}, {
    id: "heroes-evolved",
    name: "Heroes Evolved",
    image: "https://readdy.ai/api/search-image?query=Heroes%20Evolved%20MOBA%20game%20logo%20with%20fantasy%20warriors%20and%20evolution%20theme%2C%20purple%20and%20silver%20colors%2C%20competitive%20esports%20aesthetic&width=300&height=300&seq=he1&orientation=squarish",
    popularity: "60M+ প্লেয়ার",
    category: "moba"
}, {
    id: "vainglory",
    name: "Vainglory",
    image: "https://readdy.ai/api/search-image?query=Vainglory%20MOBA%20game%20logo%20with%20heroic%20champions%20and%20glory%20theme%2C%20blue%20and%20white%20colors%2C%20competitive%20gaming%20design&width=300&height=300&seq=vg1&orientation=squarish",
    popularity: "40M+ প্লেয়ার",
    category: "moba"
}, {
    id: "valorant",
    name: "Valorant Mobile",
    image: "https://readdy.ai/api/search-image?query=Valorant%20Mobile%20tactical%20FPS%20game%20logo%20with%20futuristic%20agents%20and%20weapons%2C%20red%20and%20white%20colors%2C%20competitive%20shooter%20aesthetic%2C%20professional%20esports%20design&width=300&height=300&seq=val1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "fps"
}, {
    id: "critical-ops",
    name: "Critical Ops",
    image: "https://readdy.ai/api/search-image?query=Critical%20Ops%20tactical%20FPS%20shooter%20game%20logo%20with%20military%20operations%20theme%2C%20black%20and%20orange%20colors%2C%20counter-strike%20style%20design%2C%20professional%20gaming%20icon&width=300&height=300&seq=cops1&orientation=squarish",
    popularity: "80M+ প্লেয়ার",
    category: "fps"
}, {
    id: "crossfire",
    name: "CrossFire Mobile",
    image: "https://readdy.ai/api/search-image?query=CrossFire%20Mobile%20FPS%20shooter%20game%20logo%20with%20crossed%20rifles%20and%20fire%20effects%2C%20red%20and%20black%20military%20colors%2C%20tactical%20shooter%20theme&width=300&height=300&seq=cf1&orientation=squarish",
    popularity: "120M+ প্লেয়ার",
    category: "fps"
}, {
    id: "shadowgun-legends",
    name: "Shadowgun Legends",
    image: "https://readdy.ai/api/search-image?query=Shadowgun%20Legends%20sci-fi%20FPS%20game%20logo%20with%20futuristic%20weapons%20and%20space%20theme%2C%20blue%20and%20silver%20colors%2C%20cyberpunk%20shooter%20aesthetic&width=300&height=300&seq=sgl1&orientation=squarish",
    popularity: "70M+ প্লেয়ার",
    category: "fps"
}, {
    id: "modern-combat",
    name: "Modern Combat 5",
    image: "https://readdy.ai/api/search-image?query=Modern%20Combat%205%20military%20FPS%20game%20logo%20with%20modern%20warfare%20theme%2C%20black%20and%20gold%20colors%2C%20tactical%20shooter%20design&width=300&height=300&seq=mc5_1&orientation=squarish",
    popularity: "90M+ প্লেয়ার",
    category: "fps"
}, {
    id: "bullet-force",
    name: "Bullet Force",
    image: "https://readdy.ai/api/search-image?query=Bullet%20Force%20FPS%20shooter%20game%20logo%20with%20military%20bullets%20and%20force%20theme%2C%20green%20and%20black%20colors%2C%20tactical%20warfare%20aesthetic&width=300&height=300&seq=bf1&orientation=squarish",
    popularity: "50M+ প্লেয়ার",
    category: "fps"
}, {
    id: "genshin-impact",
    name: "Genshin Impact",
    image: "https://readdy.ai/api/search-image?query=Genshin%20Impact%20anime%20RPG%20game%20logo%20with%20magical%20elements%20and%20fantasy%20characters%2C%20blue%20and%20white%20mystical%20colors%2C%20adventure%20RPG%20aesthetic&width=300&height=300&seq=gi1&orientation=squarish",
    popularity: "200M+ প্লেয়ার",
    category: "rpg"
}, {
    id: "honkai-impact",
    name: "Honkai Impact 3rd",
    image: "https://readdy.ai/api/search-image?query=Honkai%20Impact%203rd%20sci-fi%20RPG%20game%20logo%20with%20futuristic%20warriors%20and%20energy%20effects%2C%20purple%20and%20pink%20neon%20colors%2C%20anime%20action%20RPG%20theme&width=300&height=300&seq=hi1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "rpg"
}, {
    id: "ragnarok-m",
    name: "Ragnarok M",
    image: "https://readdy.ai/api/search-image?query=Ragnarok%20M%20eternal%20love%20MMORPG%20game%20logo%20with%20medieval%20fantasy%20theme%2C%20colorful%20anime%20style%2C%20adventure%20RPG%20aesthetic%20with%20magical%20elements&width=300&height=300&seq=rom1&orientation=squarish",
    popularity: "50M+ প্লেয়ার",
    category: "rpg"
}, {
    id: "black-desert",
    name: "Black Desert Mobile",
    image: "https://readdy.ai/api/search-image?query=Black%20Desert%20Mobile%20MMORPG%20game%20logo%20with%20dark%20fantasy%20theme%20and%20desert%20warrior%2C%20black%20and%20gold%20colors%2C%20epic%20adventure%20RPG%20aesthetic&width=300&height=300&seq=bdm1&orientation=squarish",
    popularity: "80M+ প্লেয়ার",
    category: "rpg"
}, {
    id: "lineage-2",
    name: "Lineage 2 Revolution",
    image: "https://readdy.ai/api/search-image?query=Lineage%202%20Revolution%20MMORPG%20game%20logo%20with%20medieval%20knights%20and%20revolution%20theme%2C%20red%20and%20silver%20colors%2C%20fantasy%20RPG%20design&width=300&height=300&seq=l2r1&orientation=squarish",
    popularity: "60M+ প্লেয়ার",
    category: "rpg"
}, {
    id: "final-fantasy",
    name: "Final Fantasy XIV",
    image: "https://readdy.ai/api/search-image?query=Final%20Fantasy%20XIV%20MMORPG%20game%20logo%20with%20fantasy%20crystals%20and%20magical%20theme%2C%20blue%20and%20gold%20colors%2C%20epic%20RPG%20adventure%20aesthetic&width=300&height=300&seq=ff14_1&orientation=squarish",
    popularity: "40M+ প্লেয়ার",
    category: "rpg"
}, {
    id: "clash-of-clans",
    name: "Clash of Clans",
    image: "https://readdy.ai/api/search-image?query=Clash%20of%20Clans%20strategy%20game%20logo%20with%20medieval%20castle%20and%20warriors%2C%20colorful%20cartoon%20style%2C%20base%20building%20theme%2C%20vibrant%20gaming%20aesthetic&width=300&height=300&seq=coc1&orientation=squarish",
    popularity: "500M+ প্লেয়ার",
    category: "strategy"
}, {
    id: "clash-royale",
    name: "Clash Royale",
    image: "https://readdy.ai/api/search-image?query=Clash%20Royale%20tower%20defense%20strategy%20game%20logo%20with%20royal%20crown%20and%20arena%20theme%2C%20blue%20and%20gold%20colors%2C%20competitive%20card%20game%20aesthetic&width=300&height=300&seq=cr1&orientation=squarish",
    popularity: "300M+ প্লেয়ার",
    category: "strategy"
}, {
    id: "rise-of-kingdoms",
    name: "Rise of Kingdoms",
    image: "https://readdy.ai/api/search-image?query=Rise%20of%20Kingdoms%20civilization%20strategy%20game%20logo%20with%20ancient%20kingdoms%20and%20empire%20building%2C%20gold%20and%20red%20royal%20colors%2C%20historical%20strategy%20theme&width=300&height=300&seq=rok1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "strategy"
}, {
    id: "age-of-empires",
    name: "Age of Empires Mobile",
    image: "https://readdy.ai/api/search-image?query=Age%20of%20Empires%20Mobile%20strategy%20game%20logo%20with%20historical%20civilizations%20and%20empire%20building%2C%20bronze%20and%20gold%20colors%2C%20real-time%20strategy%20theme&width=300&height=300&seq=aoe1&orientation=squarish",
    popularity: "80M+ প্লেয়ার",
    category: "strategy"
}, {
    id: "lords-mobile",
    name: "Lords Mobile",
    image: "https://readdy.ai/api/search-image?query=Lords%20Mobile%20strategy%20game%20logo%20with%20medieval%20lords%20and%20castle%20warfare%2C%20purple%20and%20gold%20colors%2C%20kingdom%20building%20aesthetic&width=300&height=300&seq=lm1&orientation=squarish",
    popularity: "200M+ প্লেয়ার",
    category: "strategy"
}, {
    id: "civilization",
    name: "Civilization VI",
    image: "https://readdy.ai/api/search-image?query=Civilization%20VI%20turn-based%20strategy%20game%20logo%20with%20world%20civilizations%20and%20empire%20theme%2C%20blue%20and%20gold%20colors%2C%20historical%20strategy%20design&width=300&height=300&seq=civ6_1&orientation=squarish",
    popularity: "50M+ প্লেয়ার",
    category: "strategy"
}, {
    id: "minecraft",
    name: "Minecraft",
    image: "https://readdy.ai/api/search-image?query=Minecraft%20sandbox%20creative%20game%20logo%20with%20pixelated%20blocks%20and%20building%20theme%2C%20green%20and%20brown%20earth%20colors%2C%20creative%20construction%20aesthetic&width=300&height=300&seq=mc1&orientation=squarish",
    popularity: "300M+ প্লেয়ার",
    category: "creative"
}, {
    id: "roblox",
    name: "Roblox",
    image: "https://readdy.ai/api/search-image?query=Roblox%20creative%20platform%20game%20logo%20with%20building%20blocks%20and%20user-generated%20content%2C%20red%20and%20white%20colors%2C%20social%20gaming%20aesthetic&width=300&height=300&seq=rb1&orientation=squarish",
    popularity: "250M+ প্লেয়ার",
    category: "creative"
}, {
    id: "terraria",
    name: "Terraria",
    image: "https://readdy.ai/api/search-image?query=Terraria%202D%20sandbox%20adventure%20game%20logo%20with%20pixelated%20world%20and%20exploration%20theme%2C%20colorful%20pixel%20art%20style%2C%20creative%20adventure%20aesthetic&width=300&height=300&seq=ter1&orientation=squarish",
    popularity: "50M+ প্লেয়ার",
    category: "creative"
}, {
    id: "block-craft",
    name: "Block Craft 3D",
    image: "https://readdy.ai/api/search-image?query=Block%20Craft%203D%20building%20game%20logo%20with%20colorful%20blocks%20and%20construction%20theme%2C%20bright%20rainbow%20colors%2C%20creative%20sandbox%20aesthetic&width=300&height=300&seq=bc3d1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "creative"
}, {
    id: "planet-craft",
    name: "Planet Craft",
    image: "https://readdy.ai/api/search-image?query=Planet%20Craft%20space%20building%20game%20logo%20with%20planets%20and%20cosmic%20construction%2C%20blue%20and%20purple%20space%20colors%2C%20creative%20exploration%20theme&width=300&height=300&seq=pc1&orientation=squarish",
    popularity: "80M+ প্লেয়ার",
    category: "creative"
}, {
    id: "craftsman",
    name: "Craftsman Building Craft",
    image: "https://readdy.ai/api/search-image?query=Craftsman%20Building%20Craft%20construction%20game%20logo%20with%20tools%20and%20building%20materials%2C%20brown%20and%20orange%20craft%20colors%2C%20creative%20building%20aesthetic&width=300&height=300&seq=cbc1&orientation=squarish",
    popularity: "70M+ প্লেয়ার",
    category: "creative"
}, {
    id: "asphalt-9",
    name: "Asphalt 9",
    image: "https://readdy.ai/api/search-image?query=Asphalt%209%20racing%20game%20logo%20with%20supercar%20and%20speed%20effects%2C%20blue%20and%20silver%20metallic%20colors%2C%20high-speed%20racing%20aesthetic%2C%20professional%20gaming%20icon&width=300&height=300&seq=a9_1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "racing"
}, {
    id: "real-racing",
    name: "Real Racing 3",
    image: "https://readdy.ai/api/search-image?query=Real%20Racing%203%20realistic%20racing%20game%20logo%20with%20Formula%201%20car%20and%20racing%20track%2C%20red%20and%20black%20colors%2C%20professional%20motorsport%20theme&width=300&height=300&seq=rr3_1&orientation=squarish",
    popularity: "80M+ প্লেয়ার",
    category: "racing"
}, {
    id: "csr-racing",
    name: "CSR Racing 2",
    image: "https://readdy.ai/api/search-image?query=CSR%20Racing%202%20drag%20racing%20game%20logo%20with%20luxury%20sports%20car%20and%20speed%20effects%2C%20gold%20and%20black%20premium%20colors%2C%20street%20racing%20aesthetic&width=300&height=300&seq=csr2_1&orientation=squarish",
    popularity: "60M+ প্লেয়ার",
    category: "racing"
}, {
    id: "need-for-speed",
    name: "Need for Speed",
    image: "https://readdy.ai/api/search-image?query=Need%20for%20Speed%20racing%20game%20logo%20with%20police%20chase%20and%20street%20racing%20theme%2C%20orange%20and%20black%20colors%2C%20high-speed%20pursuit%20aesthetic&width=300&height=300&seq=nfs1&orientation=squarish",
    popularity: "150M+ প্লেয়ার",
    category: "racing"
}, {
    id: "car-x-drift",
    name: "CarX Drift Racing",
    image: "https://readdy.ai/api/search-image?query=CarX%20Drift%20Racing%20game%20logo%20with%20drifting%20car%20and%20smoke%20effects%2C%20red%20and%20white%20colors%2C%20drift%20racing%20aesthetic&width=300&height=300&seq=cxdr1&orientation=squarish",
    popularity: "90M+ প্লেয়ার",
    category: "racing"
}, {
    id: "beach-buggy",
    name: "Beach Buggy Racing",
    image: "https://readdy.ai/api/search-image?query=Beach%20Buggy%20Racing%20kart%20racing%20game%20logo%20with%20beach%20buggy%20and%20tropical%20theme%2C%20yellow%20and%20blue%20colors%2C%20fun%20kart%20racing%20aesthetic&width=300&height=300&seq=bbr1&orientation=squarish",
    popularity: "70M+ প্লেয়ার",
    category: "racing"
}, {
    id: "fifa-mobile",
    name: "FIFA Mobile",
    image: "https://readdy.ai/api/search-image?query=FIFA%20Mobile%20football%20soccer%20game%20logo%20with%20football%20ball%20and%20stadium%2C%20green%20and%20white%20colors%2C%20professional%20sports%20gaming%20aesthetic&width=300&height=300&seq=fifa1&orientation=squarish",
    popularity: "150M+ প্লেয়ার",
    category: "sports"
}, {
    id: "nba-2k",
    name: "NBA 2K Mobile",
    image: "https://readdy.ai/api/search-image?query=NBA%202K%20Mobile%20basketball%20game%20logo%20with%20basketball%20and%20court%20theme%2C%20orange%20and%20black%20colors%2C%20professional%20basketball%20sports%20aesthetic&width=300&height=300&seq=nba2k1&orientation=squarish",
    popularity: "50M+ প্লেয়ার",
    category: "sports"
}, {
    id: "dream-league",
    name: "Dream League Soccer",
    image: "https://readdy.ai/api/search-image?query=Dream%20League%20Soccer%20mobile%20football%20game%20logo%20with%20soccer%20ball%20and%20trophy%2C%20blue%20and%20white%20colors%2C%20football%20manager%20gaming%20theme&width=300&height=300&seq=dls1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "sports"
}, {
    id: "pes-mobile",
    name: "PES Mobile",
    image: "https://readdy.ai/api/search-image?query=PES%20Mobile%20football%20game%20logo%20with%20soccer%20ball%20and%20pro%20evolution%20theme%2C%20red%20and%20white%20colors%2C%20professional%20football%20gaming%20aesthetic&width=300&height=300&seq=pes1&orientation=squarish",
    popularity: "200M+ প্লেয়ার",
    category: "sports"
}, {
    id: "madden-mobile",
    name: "Madden NFL Mobile",
    image: "https://readdy.ai/api/search-image?query=Madden%20NFL%20Mobile%20american%20football%20game%20logo%20with%20football%20and%20helmet%2C%20blue%20and%20silver%20colors%2C%20NFL%20sports%20gaming%20theme&width=300&height=300&seq=mnfl1&orientation=squarish",
    popularity: "80M+ প্লেয়ার",
    category: "sports"
}, {
    id: "golf-clash",
    name: "Golf Clash",
    image: "https://readdy.ai/api/search-image?query=Golf%20Clash%20golf%20game%20logo%20with%20golf%20club%20and%20ball%2C%20green%20and%20gold%20colors%2C%20professional%20golf%20sports%20aesthetic&width=300&height=300&seq=gc1&orientation=squarish",
    popularity: "60M+ প্লেয়ার",
    category: "sports"
}, {
    id: "candy-crush",
    name: "Candy Crush Saga",
    image: "https://readdy.ai/api/search-image?query=Candy%20Crush%20Saga%20puzzle%20game%20logo%20with%20colorful%20candies%20and%20sweet%20treats%2C%20bright%20rainbow%20colors%2C%20casual%20puzzle%20gaming%20aesthetic&width=300&height=300&seq=ccs1&orientation=squarish",
    popularity: "300M+ প্লেয়ার",
    category: "casual"
}, {
    id: "pokemon-go",
    name: "Pokemon GO",
    image: "https://readdy.ai/api/search-image?query=Pokemon%20GO%20augmented%20reality%20game%20logo%20with%20Pokeball%20and%20cute%20Pokemon%20characters%2C%20red%20and%20white%20colors%2C%20AR%20gaming%20aesthetic&width=300&height=300&seq=pogo1&orientation=squarish",
    popularity: "200M+ প্লেয়ার",
    category: "casual"
}, {
    id: "among-us",
    name: "Among Us",
    image: "https://readdy.ai/api/search-image?query=Among%20Us%20social%20deduction%20game%20logo%20with%20colorful%20crewmate%20characters%2C%20red%20and%20blue%20colors%2C%20multiplayer%20party%20gaming%20aesthetic&width=300&height=300&seq=au1&orientation=squarish",
    popularity: "500M+ প্লেয়ার",
    category: "casual"
}, {
    id: "subway-surfers",
    name: "Subway Surfers",
    image: "https://readdy.ai/api/search-image?query=Subway%20Surfers%20endless%20runner%20game%20logo%20with%20graffiti%20art%20and%20subway%20theme%2C%20colorful%20urban%20style%2C%20casual%20runner%20gaming%20aesthetic&width=300&height=300&seq=ss1&orientation=squarish",
    popularity: "4B+ ডাউনলোড",
    category: "casual"
}, {
    id: "temple-run",
    name: "Temple Run 2",
    image: "https://readdy.ai/api/search-image?query=Temple%20Run%202%20endless%20runner%20game%20logo%20with%20ancient%20temple%20and%20adventure%20theme%2C%20brown%20and%20gold%20colors%2C%20casual%20adventure%20gaming%20aesthetic&width=300&height=300&seq=tr2_1&orientation=squarish",
    popularity: "1B+ ডাউনলোড",
    category: "casual"
}, {
    id: "angry-birds",
    name: "Angry Birds 2",
    image: "https://readdy.ai/api/search-image?query=Angry%20Birds%202%20physics%20puzzle%20game%20logo%20with%20colorful%20angry%20birds%20and%20slingshot%2C%20red%20and%20yellow%20colors%2C%20casual%20puzzle%20gaming%20aesthetic&width=300&height=300&seq=ab2_1&orientation=squarish",
    popularity: "500M+ প্লেয়ার",
    category: "casual"
}, {
    id: "shadow-fight",
    name: "Shadow Fight 3",
    image: "https://readdy.ai/api/search-image?query=Shadow%20Fight%203%20martial%20arts%20fighting%20game%20logo%20with%20ninja%20warrior%20and%20sword%20combat%2C%20dark%20purple%20and%20gold%20colors%2C%20action%20fighting%20theme&width=300&height=300&seq=sf3_1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "action"
}, {
    id: "mortal-kombat",
    name: "Mortal Kombat Mobile",
    image: "https://readdy.ai/api/search-image?query=Mortal%20Kombat%20Mobile%20fighting%20game%20logo%20with%20dragon%20emblem%20and%20martial%20arts%20theme%2C%20red%20and%20black%20colors%2C%20brutal%20fighting%20aesthetic&width=300&height=300&seq=mk1&orientation=squarish",
    popularity: "80M+ প্লেয়ার",
    category: "action"
}, {
    id: "tekken",
    name: "Tekken Mobile",
    image: "https://readdy.ai/api/search-image?query=Tekken%20Mobile%203D%20fighting%20game%20logo%20with%20martial%20arts%20fighters%20and%20tournament%20theme%2C%20blue%20and%20silver%20colors%2C%20professional%20fighting%20game%20aesthetic&width=300&height=300&seq=tkn1&orientation=squarish",
    popularity: "60M+ প্লেয়ার",
    category: "action"
}, {
    id: "injustice",
    name: "Injustice 2",
    image: "https://readdy.ai/api/search-image?query=Injustice%202%20superhero%20fighting%20game%20logo%20with%20DC%20heroes%20and%20villains%2C%20dark%20blue%20and%20red%20colors%2C%20comic%20book%20fighting%20aesthetic&width=300&height=300&seq=inj2_1&orientation=squarish",
    popularity: "70M+ প্লেয়ার",
    category: "action"
}, {
    id: "street-fighter",
    name: "Street Fighter Duel",
    image: "https://readdy.ai/api/search-image?query=Street%20Fighter%20Duel%20fighting%20game%20logo%20with%20martial%20arts%20fighters%20and%20street%20combat%2C%20orange%20and%20blue%20colors%2C%20classic%20fighting%20game%20aesthetic&width=300&height=300&seq=sfd1&orientation=squarish",
    popularity: "50M+ প্লেয়ার",
    category: "action"
}, {
    id: "dead-trigger",
    name: "Dead Trigger 2",
    image: "https://readdy.ai/api/search-image?query=Dead%20Trigger%202%20zombie%20action%20game%20logo%20with%20zombie%20apocalypse%20and%20survival%20theme%2C%20dark%20red%20and%20black%20colors%2C%20horror%20action%20aesthetic&width=300&height=300&seq=dt2_1&orientation=squarish",
    popularity: "90M+ প্লেয়ার",
    category: "action"
}, {
    id: "hearthstone",
    name: "Hearthstone",
    image: "https://readdy.ai/api/search-image?query=Hearthstone%20digital%20card%20game%20logo%20with%20magical%20cards%20and%20hearth%20theme%2C%20blue%20and%20gold%20colors%2C%20fantasy%20card%20gaming%20aesthetic&width=300&height=300&seq=hs1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "card"
}, {
    id: "legends-of-runeterra",
    name: "Legends of Runeterra",
    image: "https://readdy.ai/api/search-image?query=Legends%20of%20Runeterra%20card%20game%20logo%20with%20magical%20runes%20and%20fantasy%20legends%2C%20purple%20and%20gold%20colors%2C%20strategic%20card%20gaming%20theme&width=300&height=300&seq=lor1&orientation=squarish",
    popularity: "40M+ প্লেয়ার",
    category: "card"
}, {
    id: "gwent",
    name: "Gwent",
    image: "https://readdy.ai/api/search-image?query=Gwent%20witcher%20card%20game%20logo%20with%20medieval%20cards%20and%20witcher%20theme%2C%20dark%20green%20and%20gold%20colors%2C%20fantasy%20card%20gaming%20aesthetic&width=300&height=300&seq=gwent1&orientation=squarish",
    popularity: "20M+ প্লেয়ার",
    category: "card"
}, {
    id: "magic-arena",
    name: "Magic: The Gathering Arena",
    image: "https://readdy.ai/api/search-image?query=Magic%20The%20Gathering%20Arena%20card%20game%20logo%20with%20magical%20spells%20and%20planeswalker%20theme%2C%20multicolor%20mana%20colors%2C%20fantasy%20trading%20card%20aesthetic&width=300&height=300&seq=mtga1&orientation=squarish",
    popularity: "30M+ প্লেয়ার",
    category: "card"
}, {
    id: "yu-gi-oh",
    name: "Yu-Gi-Oh! Duel Links",
    image: "https://readdy.ai/api/search-image?query=Yu-Gi-Oh%20Duel%20Links%20card%20game%20logo%20with%20duel%20monsters%20and%20anime%20theme%2C%20blue%20and%20gold%20colors%2C%20anime%20card%20gaming%20aesthetic&width=300&height=300&seq=ygo1&orientation=squarish",
    popularity: "80M+ প্লেয়ার",
    category: "card"
}, {
    id: "pokemon-tcg",
    name: "Pokemon Trading Card Game",
    image: "https://readdy.ai/api/search-image?query=Pokemon%20Trading%20Card%20Game%20logo%20with%20Pokemon%20cards%20and%20Pokeball%20theme%2C%20red%20and%20blue%20colors%2C%20collectible%20card%20gaming%20aesthetic&width=300&height=300&seq=ptcg1&orientation=squarish",
    popularity: "60M+ প্লেয়ার",
    category: "card"
}, {
    id: "monument-valley",
    name: "Monument Valley",
    image: "https://readdy.ai/api/search-image?query=Monument%20Valley%20puzzle%20game%20logo%20with%20geometric%20architecture%20and%20optical%20illusions%2C%20pastel%20colors%2C%20minimalist%20puzzle%20aesthetic&width=300&height=300&seq=mv1&orientation=squarish",
    popularity: "50M+ প্লেয়ার",
    category: "puzzle"
}, {
    id: "tetris",
    name: "Tetris",
    image: "https://readdy.ai/api/search-image?query=Tetris%20classic%20puzzle%20game%20logo%20with%20falling%20blocks%20and%20geometric%20shapes%2C%20colorful%20block%20colors%2C%20retro%20puzzle%20gaming%20aesthetic&width=300&height=300&seq=tet1&orientation=squarish",
    popularity: "200M+ প্লেয়ার",
    category: "puzzle"
}, {
    id: "brain-out",
    name: "Brain Out",
    image: "https://readdy.ai/api/search-image?query=Brain%20Out%20brain%20teaser%20puzzle%20game%20logo%20with%20thinking%20brain%20and%20question%20marks%2C%20yellow%20and%20blue%20colors%2C%20creative%20puzzle%20aesthetic&width=300&height=300&seq=bo1&orientation=squarish",
    popularity: "300M+ প্লেয়ার",
    category: "puzzle"
}, {
    id: "homescapes",
    name: "Homescapes",
    image: "https://readdy.ai/api/search-image?query=Homescapes%20match-3%20puzzle%20game%20logo%20with%20home%20decoration%20and%20butler%20character%2C%20warm%20home%20colors%2C%20cozy%20puzzle%20gaming%20aesthetic&width=300&height=300&seq=hsc1&orientation=squarish",
    popularity: "200M+ প্লেয়ার",
    category: "puzzle"
}, {
    id: "gardenscapes",
    name: "Gardenscapes",
    image: "https://readdy.ai/api/search-image?query=Gardenscapes%20match-3%20puzzle%20game%20logo%20with%20garden%20decoration%20and%20gardening%20theme%2C%20green%20and%20flower%20colors%2C%20garden%20puzzle%20aesthetic&width=300&height=300&seq=gsc1&orientation=squarish",
    popularity: "180M+ প্লেয়ার",
    category: "puzzle"
}, {
    id: "cut-the-rope",
    name: "Cut the Rope",
    image: "https://readdy.ai/api/search-image?query=Cut%20the%20Rope%20physics%20puzzle%20game%20logo%20with%20cute%20Om%20Nom%20character%20and%20candy%20rope%2C%20green%20and%20orange%20colors%2C%20physics%20puzzle%20aesthetic&width=300&height=300&seq=ctr1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "puzzle"
}, {
    id: "sims-mobile",
    name: "The Sims Mobile",
    image: "https://readdy.ai/api/search-image?query=The%20Sims%20Mobile%20life%20simulation%20game%20logo%20with%20Sim%20characters%20and%20house%20building%2C%20green%20and%20blue%20colors%2C%20life%20simulation%20aesthetic&width=300&height=300&seq=tsm1&orientation=squarish",
    popularity: "150M+ প্লেয়ার",
    category: "simulation"
}, {
    id: "farming-simulator",
    name: "Farming Simulator 20",
    image: "https://readdy.ai/api/search-image?query=Farming%20Simulator%2020%20agricultural%20game%20logo%20with%20farm%20tractor%20and%20crops%2C%20green%20and%20yellow%20farm%20colors%2C%20farming%20simulation%20aesthetic&width=300&height=300&seq=fs20_1&orientation=squarish",
    popularity: "30M+ প্লেয়ার",
    category: "simulation"
}, {
    id: "cities-skylines",
    name: "Cities: Skylines",
    image: "https://readdy.ai/api/search-image?query=Cities%20Skylines%20city%20building%20game%20logo%20with%20urban%20skyline%20and%20construction%2C%20blue%20and%20gray%20city%20colors%2C%20city%20simulation%20aesthetic&width=300&height=300&seq=cs1&orientation=squarish",
    popularity: "20M+ প্লেয়ার",
    category: "simulation"
}, {
    id: "euro-truck",
    name: "Euro Truck Simulator",
    image: "https://readdy.ai/api/search-image?query=Euro%20Truck%20Simulator%20driving%20game%20logo%20with%20European%20truck%20and%20highway%2C%20blue%20and%20white%20colors%2C%20truck%20simulation%20aesthetic&width=300&height=300&seq=ets1&orientation=squarish",
    popularity: "25M+ প্লেয়ার",
    category: "simulation"
}, {
    id: "hay-day",
    name: "Hay Day",
    image: "https://readdy.ai/api/search-image?query=Hay%20Day%20farm%20simulation%20game%20logo%20with%20farm%20animals%20and%20crops%2C%20green%20and%20yellow%20farm%20colors%2C%20cute%20farming%20aesthetic&width=300&height=300&seq=hd1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "simulation"
}, {
    id: "township",
    name: "Township",
    image: "https://readdy.ai/api/search-image?query=Township%20city%20farm%20simulation%20game%20logo%20with%20town%20buildings%20and%20farming%2C%20colorful%20town%20colors%2C%20community%20simulation%20aesthetic&width=300&height=300&seq=tw1&orientation=squarish",
    popularity: "200M+ প্লেয়ার",
    category: "simulation"
}, {
    id: "tomb-raider",
    name: "Tomb Raider Reloaded",
    image: "https://readdy.ai/api/search-image?query=Tomb%20Raider%20Reloaded%20adventure%20game%20logo%20with%20Lara%20Croft%20and%20ancient%20tomb%20theme%2C%20brown%20and%20gold%20archaeological%20colors%2C%20adventure%20exploration%20aesthetic&width=300&height=300&seq=trr1&orientation=squarish",
    popularity: "40M+ প্লেয়ার",
    category: "adventure"
}, {
    id: "gris",
    name: "Gris",
    image: "https://readdy.ai/api/search-image?query=Gris%20artistic%20adventure%20game%20logo%20with%20watercolor%20art%20and%20emotional%20journey%20theme%2C%20pastel%20artistic%20colors%2C%20indie%20adventure%20aesthetic&width=300&height=300&seq=gris1&orientation=squarish",
    popularity: "10M+ প্লেয়ার",
    category: "adventure"
}, {
    id: "life-is-strange",
    name: "Life is Strange",
    image: "https://readdy.ai/api/search-image?query=Life%20is%20Strange%20narrative%20adventure%20game%20logo%20with%20teenage%20drama%20and%20time%20travel%20theme%2C%20blue%20and%20orange%20colors%2C%20story-driven%20aesthetic&width=300&height=300&seq=lis1&orientation=squarish",
    popularity: "15M+ প্লেয়ার",
    category: "adventure"
}, {
    id: "oxenfree",
    name: "Oxenfree",
    image: "https://readdy.ai/api/search-image?query=Oxenfree%20supernatural%20adventure%20game%20logo%20with%20radio%20waves%20and%20mystery%20theme%2C%20purple%20and%20yellow%20colors%2C%20supernatural%20adventure%20aesthetic&width=300&height=300&seq=ox1&orientation=squarish",
    popularity: "8M+ প্লেয়ার",
    category: "adventure"
}, {
    id: "alto-odyssey",
    name: "Alto's Odyssey",
    image: "https://readdy.ai/api/search-image?query=Alto%20Odyssey%20endless%20adventure%20game%20logo%20with%20desert%20sandboarding%20and%20zen%20theme%2C%20warm%20desert%20colors%2C%20minimalist%20adventure%20aesthetic&width=300&height=300&seq=ao1&orientation=squarish",
    popularity: "50M+ প্লেয়ার",
    category: "adventure"
}, {
    id: "ori-blind-forest",
    name: "Ori and the Blind Forest",
    image: "https://readdy.ai/api/search-image?query=Ori%20and%20the%20Blind%20Forest%20platformer%20adventure%20game%20logo%20with%20forest%20spirit%20and%20magical%20forest%20theme%2C%20blue%20and%20green%20mystical%20colors%2C%20beautiful%20adventure%20aesthetic&width=300&height=300&seq=ori1&orientation=squarish",
    popularity: "12M+ প্লেয়ার",
    category: "adventure"
}, {
    id: "dead-by-daylight",
    name: "Dead by Daylight Mobile",
    image: "https://readdy.ai/api/search-image?query=Dead%20by%20Daylight%20Mobile%20horror%20game%20logo%20with%20killer%20and%20survivors%20theme%2C%20dark%20red%20and%20black%20horror%20colors%2C%20asymmetric%20horror%20aesthetic&width=300&height=300&seq=dbd1&orientation=squarish",
    popularity: "50M+ প্লেয়ার",
    category: "horror"
}, {
    id: "fnaf",
    name: "Five Nights at Freddy's",
    image: "https://readdy.ai/api/search-image?query=Five%20Nights%20at%20Freddys%20horror%20game%20logo%20with%20animatronic%20bear%20and%20dark%20pizzeria%20theme%2C%20dark%20brown%20and%20red%20horror%20colors%2C%20jump%20scare%20aesthetic&width=300&height=300&seq=fnaf1&orientation=squarish",
    popularity: "30M+ প্লেয়ার",
    category: "horror"
}, {
    id: "outlast",
    name: "Outlast Trinity",
    image: "https://readdy.ai/api/search-image?query=Outlast%20Trinity%20horror%20game%20logo%20with%20asylum%20horror%20and%20night%20vision%20theme%2C%20green%20and%20black%20horror%20colors%2C%20psychological%20horror%20aesthetic&width=300&height=300&seq=out1&orientation=squarish",
    popularity: "20M+ প্লেয়ার",
    category: "horror"
}, {
    id: "resident-evil",
    name: "Resident Evil",
    image: "https://readdy.ai/api/search-image?query=Resident%20Evil%20horror%20game%20logo%20with%20zombie%20apocalypse%20and%20survival%20horror%20theme%2C%20dark%20red%20and%20black%20colors%2C%20survival%20horror%20aesthetic&width=300&height=300&seq=re1&orientation=squarish",
    popularity: "40M+ প্লেয়ার",
    category: "horror"
}, {
    id: "silent-hill",
    name: "Silent Hill",
    image: "https://readdy.ai/api/search-image?query=Silent%20Hill%20psychological%20horror%20game%20logo%20with%20fog%20and%20dark%20town%20theme%2C%20gray%20and%20dark%20horror%20colors%2C%20psychological%20horror%20aesthetic&width=300&height=300&seq=sh1&orientation=squarish",
    popularity: "25M+ প্লেয়ার",
    category: "horror"
}, {
    id: "granny",
    name: "Granny",
    image: "https://readdy.ai/api/search-image?query=Granny%20horror%20escape%20game%20logo%20with%20creepy%20house%20and%20old%20woman%20theme%2C%20dark%20green%20and%20brown%20horror%20colors%2C%20escape%20horror%20aesthetic&width=300&height=300&seq=grn1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "horror"
}, {
    id: "super-mario",
    name: "Super Mario Run",
    image: "https://readdy.ai/api/search-image?query=Super%20Mario%20Run%20platform%20game%20logo%20with%20Mario%20character%20and%20mushroom%20kingdom%20theme%2C%20red%20and%20blue%20Mario%20colors%2C%20classic%20platformer%20aesthetic&width=300&height=300&seq=smr1&orientation=squarish",
    popularity: "300M+ প্লেয়ার",
    category: "platform"
}, {
    id: "sonic-dash",
    name: "Sonic Dash",
    image: "https://readdy.ai/api/search-image?query=Sonic%20Dash%20platform%20runner%20game%20logo%20with%20Sonic%20hedgehog%20and%20speed%20rings%20theme%2C%20blue%20and%20gold%20colors%2C%20fast%20platformer%20aesthetic&width=300&height=300&seq=sd1&orientation=squarish",
    popularity: "200M+ প্লেয়ার",
    category: "platform"
}, {
    id: "rayman",
    name: "Rayman Legends",
    image: "https://readdy.ai/api/search-image?query=Rayman%20Legends%20platform%20game%20logo%20with%20Rayman%20character%20and%20magical%20world%20theme%2C%20colorful%20cartoon%20colors%2C%20whimsical%20platformer%20aesthetic&width=300&height=300&seq=rl1&orientation=squarish",
    popularity: "80M+ প্লেয়ার",
    category: "platform"
}, {
    id: "celeste",
    name: "Celeste",
    image: "https://readdy.ai/api/search-image?query=Celeste%20mountain%20climbing%20platform%20game%20logo%20with%20pixel%20art%20mountain%20and%20climbing%20theme%2C%20pink%20and%20blue%20colors%2C%20indie%20platformer%20aesthetic&width=300&height=300&seq=cel1&orientation=squarish",
    popularity: "15M+ প্লেয়ার",
    category: "platform"
}, {
    id: "hollow-knight",
    name: "Hollow Knight",
    image: "https://readdy.ai/api/search-image?query=Hollow%20Knight%20metroidvania%20game%20logo%20with%20dark%20knight%20and%20underground%20kingdom%20theme%2C%20black%20and%20white%20gothic%20colors%2C%20dark%20platformer%20aesthetic&width=300&height=300&seq=hk1&orientation=squarish",
    popularity: "20M+ প্লেয়ার",
    category: "platform"
}, {
    id: "shovel-knight",
    name: "Shovel Knight",
    image: "https://readdy.ai/api/search-image?query=Shovel%20Knight%20retro%20platform%20game%20logo%20with%20armored%20knight%20and%20shovel%20weapon%20theme%2C%20blue%20and%20gold%20colors%2C%20retro%20platformer%20aesthetic&width=300&height=300&seq=sk1&orientation=squarish",
    popularity: "10M+ প্লেয়ার",
    category: "platform"
}, {
    id: "guitar-hero",
    name: "Guitar Hero Live",
    image: "https://readdy.ai/api/search-image?query=Guitar%20Hero%20Live%20music%20rhythm%20game%20logo%20with%20electric%20guitar%20and%20rock%20concert%20theme%2C%20black%20and%20orange%20colors%2C%20music%20gaming%20aesthetic&width=300&height=300&seq=ghl1&orientation=squarish",
    popularity: "50M+ প্লেয়ার",
    category: "music"
}, {
    id: "beat-saber",
    name: "Beat Saber",
    image: "https://readdy.ai/api/search-image?query=Beat%20Saber%20VR%20rhythm%20game%20logo%20with%20light%20sabers%20and%20neon%20cubes%20theme%2C%20neon%20colors%2C%20futuristic%20music%20aesthetic&width=300&height=300&seq=bs1&orientation=squarish",
    popularity: "30M+ প্লেয়ার",
    category: "music"
}, {
    id: "piano-tiles",
    name: "Piano Tiles 2",
    image: "https://readdy.ai/api/search-image?query=Piano%20Tiles%202%20music%20rhythm%20game%20logo%20with%20piano%20keys%20and%20musical%20notes%20theme%2C%20black%20and%20white%20piano%20colors%2C%20musical%20gaming%20aesthetic&width=300&height=300&seq=pt2_1&orientation=squarish",
    popularity: "500M+ প্লেয়ার",
    category: "music"
}, {
    id: "just-dance",
    name: "Just Dance Now",
    image: "https://readdy.ai/api/search-image?query=Just%20Dance%20Now%20dancing%20game%20logo%20with%20dancing%20silhouettes%20and%20party%20theme%2C%20colorful%20party%20colors%2C%20dance%20gaming%20aesthetic&width=300&height=300&seq=jdn1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "music"
}, {
    id: "rock-band",
    name: "Rock Band",
    image: "https://readdy.ai/api/search-image?query=Rock%20Band%20music%20game%20logo%20with%20band%20instruments%20and%20rock%20concert%20theme%2C%20red%20and%20black%20rock%20colors%2C%20band%20gaming%20aesthetic&width=300&height=300&seq=rb_1&orientation=squarish",
    popularity: "40M+ প্লেয়ার",
    category: "music"
}, {
    id: "geometry-dash",
    name: "Geometry Dash",
    image: "https://readdy.ai/api/search-image?query=Geometry%20Dash%20rhythm%20platform%20game%20logo%20with%20geometric%20shapes%20and%20electronic%20music%20theme%2C%20neon%20geometric%20colors%2C%20rhythm%20platformer%20aesthetic&width=300&height=300&seq=gd1&orientation=squarish",
    popularity: "150M+ প্লেয়ার",
    category: "music"
}, {
    id: "duolingo",
    name: "Duolingo",
    image: "https://readdy.ai/api/search-image?query=Duolingo%20language%20learning%20game%20logo%20with%20green%20owl%20mascot%20and%20education%20theme%2C%20green%20and%20white%20colors%2C%20educational%20gaming%20aesthetic&width=300&height=300&seq=duo1&orientation=squarish",
    popularity: "500M+ ব্যবহারকারী",
    category: "educational"
}, {
    id: "khan-academy",
    name: "Khan Academy Kids",
    image: "https://readdy.ai/api/search-image?query=Khan%20Academy%20Kids%20educational%20game%20logo%20with%20learning%20mascot%20and%20school%20theme%2C%20blue%20and%20green%20educational%20colors%2C%20child%20learning%20aesthetic&width=300&height=300&seq=kak1&orientation=squarish",
    popularity: "50M+ ব্যবহারকারী",
    category: "educational"
}, {
    id: "photomath",
    name: "Photomath",
    image: "https://readdy.ai/api/search-image?query=Photomath%20math%20solver%20app%20logo%20with%20mathematical%20equations%20and%20camera%20theme%2C%20blue%20and%20white%20colors%2C%20math%20education%20aesthetic&width=300&height=300&seq=pm1&orientation=squarish",
    popularity: "100M+ ব্যবহারকারী",
    category: "educational"
}, {
    id: "brainly",
    name: "Brainly",
    image: "https://readdy.ai/api/search-image?query=Brainly%20homework%20help%20app%20logo%20with%20brain%20and%20question%20marks%20theme%2C%20orange%20and%20blue%20colors%2C%20student%20learning%20aesthetic&width=300&height=300&seq=br1&orientation=squarish",
    popularity: "200M+ ব্যবহারকারী",
    category: "educational"
}, {
    id: "quiz-up",
    name: "QuizUp",
    image: "https://readdy.ai/api/search-image?query=QuizUp%20trivia%20quiz%20game%20logo%20with%20question%20marks%20and%20knowledge%20theme%2C%20purple%20and%20yellow%20colors%2C%20quiz%20gaming%20aesthetic&width=300&height=300&seq=qu1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "educational"
}, {
    id: "peak",
    name: "Peak Brain Training",
    image: "https://readdy.ai/api/search-image?query=Peak%20Brain%20Training%20game%20logo%20with%20brain%20and%20neural%20networks%20theme%2C%20blue%20and%20pink%20colors%2C%20cognitive%20training%20aesthetic&width=300&height=300&seq=peak1&orientation=squarish",
    popularity: "80M+ ব্যবহারকারী",
    category: "educational"
}, {
    id: "brawl-stars",
    name: "Brawl Stars",
    image: "https://readdy.ai/api/search-image?query=Brawl%20Stars%20multiplayer%20fighting%20game%20logo%20with%20cartoon%20brawlers%20and%20arena%20theme%2C%20colorful%20cartoon%20colors%2C%20competitive%20brawler%20aesthetic&width=300&height=300&seq=brs1&orientation=squarish",
    popularity: "300M+ প্লেয়ার",
    category: "fighting"
}, {
    id: "dragon-ball",
    name: "Dragon Ball Legends",
    image: "https://readdy.ai/api/search-image?query=Dragon%20Ball%20Legends%20fighting%20game%20logo%20with%20Goku%20and%20energy%20attacks%20theme%2C%20orange%20and%20blue%20anime%20colors%2C%20anime%20fighting%20aesthetic&width=300&height=300&seq=dbl1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "fighting"
}, {
    id: "king-of-fighters",
    name: "King of Fighters",
    image: "https://readdy.ai/api/search-image?query=King%20of%20Fighters%20classic%20fighting%20game%20logo%20with%20martial%20arts%20tournament%20theme%2C%20red%20and%20gold%20colors%2C%20classic%20fighting%20aesthetic&width=300&height=300&seq=kof1&orientation=squarish",
    popularity: "60M+ প্লেয়ার",
    category: "fighting"
}, {
    id: "guilty-gear",
    name: "Guilty Gear",
    image: "https://readdy.ai/api/search-image?query=Guilty%20Gear%20rock%20fighting%20game%20logo%20with%20heavy%20metal%20and%20gear%20theme%2C%20black%20and%20red%20rock%20colors%2C%20metal%20fighting%20aesthetic&width=300&height=300&seq=gg1&orientation=squarish",
    popularity: "30M+ প্লেয়ার",
    category: "fighting"
}, {
    id: "blazblue",
    name: "BlazBlue",
    image: "https://readdy.ai/api/search-image?query=BlazBlue%20anime%20fighting%20game%20logo%20with%20blue%20flames%20and%20sword%20combat%20theme%2C%20blue%20and%20silver%20colors%2C%20anime%20fighting%20aesthetic&width=300&height=300&seq=bb1&orientation=squarish",
    popularity: "25M+ প্লেয়ার",
    category: "fighting"
}, {
    id: "soul-calibur",
    name: "Soul Calibur",
    image: "https://readdy.ai/api/search-image?query=Soul%20Calibur%20weapon%20fighting%20game%20logo%20with%20legendary%20swords%20and%20soul%20theme%2C%20blue%20and%20gold%20colors%2C%20weapon%20fighting%20aesthetic&width=300&header=300&seq=sc1&orientation=squarish",
    popularity: "40M+ প্লেয়ার",
    category: "fighting"
}, {
    id: "chess-com",
    name: "Chess.com",
    image: "https://readdy.ai/api/search-image?query=Chess.com%20online%20chess%20game%20logo%20with%20chess%20pieces%20and%20board%20theme%2C%20black%20and%20white%20chess%20colors%2C%20classic%20strategy%20aesthetic&width=300&height=300&seq=chc1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "board"
}, {
    id: "monopoly",
    name: "Monopoly",
    image: "https://readdy.ai/api/search-image?query=Monopoly%20board%20game%20logo%20with%20top%20hat%20and%20property%20theme%2C%20green%20and%20red%20money%20colors%2C%20classic%20board%20game%20aesthetic&width=300&height=300&seq=mon1&orientation=squarish",
    popularity: "150M+ প্লেয়ার",
    category: "board"
}, {
    id: "scrabble",
    name: "Scrabble GO",
    image: "https://readdy.ai/api/search-image?query=Scrabble%20GO%20word%20game%20logo%20with%20letter%20tiles%20and%20crossword%20theme%2C%20brown%20and%20cream%20colors%2C%20word%20puzzle%20aesthetic&width=300&height=300&seq=scr1&orientation=squarish",
    popularity: "80M+ প্লেয়ার",
    category: "board"
}, {
    id: "uno",
    name: "UNO!",
    image: "https://readdy.ai/api/search-image?query=UNO%20card%20game%20logo%20with%20colorful%20cards%20and%20number%20theme%2C%20red%20yellow%20blue%20green%20colors%2C%20family%20card%20game%20aesthetic&width=300&height=300&seq=uno1&orientation=squarish",
    popularity: "200M+ প্লেয়ার",
    category: "board"
}, {
    id: "catan",
    name: "Catan Universe",
    image: "https://readdy.ai/api/search-image?query=Catan%20Universe%20strategy%20board%20game%20logo%20with%20island%20settlement%20and%20resource%20theme%2C%20brown%20and%20green%20colors%2C%20settlement%20strategy%20aesthetic&width=300&height=300&seq=cat1&orientation=squarish",
    popularity: "30M+ প্লেয়ার",
    category: "board"
}, {
    id: "risk",
    name: "RISK Global Domination",
    image: "https://readdy.ai/api/search-image?query=RISK%20Global%20Domination%20strategy%20game%20logo%20with%20world%20map%20and%20army%20theme%2C%20red%20and%20blue%20military%20colors%2C%20world%20conquest%20aesthetic&width=300&height=300&seq=risk1&orientation=squarish",
    popularity: "50M+ প্লেয়ার",
    category: "board"
}, {
    id: "cooking-fever",
    name: "Cooking Fever",
    image: "https://readdy.ai/api/search-image?query=Cooking%20Fever%20restaurant%20cooking%20game%20logo%20with%20chef%20hat%20and%20kitchen%20theme%2C%20warm%20cooking%20colors%2C%20culinary%20gaming%20aesthetic&width=300&height=300&seq=cf_1&orientation=squarish",
    popularity: "500M+ প্লেয়ার",
    category: "cooking"
}, {
    id: "cooking-madness",
    name: "Cooking Madness",
    image: "https://readdy.ai/api/search-image?query=Cooking%20Madness%20fast%20cooking%20game%20logo%20with%20crazy%20chef%20and%20kitchen%20chaos%20theme%2C%20bright%20cooking%20colors%2C%20fast-paced%20culinary%20aesthetic&width=300&height=300&seq=cm1&orientation=squarish",
    popularity: "200M+ প্লেয়ার",
    category: "cooking"
}, {
    id: "cook-diary",
    name: "Cook Diary",
    image: "https://readdy.ai/api/search-image?query=Cook%20Diary%20cooking%20adventure%20game%20logo%20with%20recipe%20book%20and%20cooking%20journey%20theme%2C%20warm%20diary%20colors%2C%20cooking%20story%20aesthetic&width=300&height=300&seq=cd1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "cooking"
}, {
    id: "good-pizza",
    name: "Good Pizza Great Pizza",
    image: "https://readdy.ai/api/search-image?query=Good%20Pizza%20Great%20Pizza%20cooking%20game%20logo%20with%20pizza%20slice%20and%20pizzeria%20theme%2C%20red%20and%20green%20Italian%20colors%2C%20pizza%20cooking%20aesthetic&width=300&height=300&seq=gpgp1&orientation=squarish",
    popularity: "80M+ প্লেয়ার",
    category: "cooking"
}, {
    id: "overcooked",
    name: "Overcooked!",
    image: "https://readdy.ai/api/search-image?query=Overcooked%20chaotic%20cooking%20game%20logo%20with%20kitchen%20chaos%20and%20teamwork%20theme%2C%20bright%20cartoon%20colors%2C%20cooperative%20cooking%20aesthetic&width=300&height=300&seq=oc1&orientation=squarish",
    popularity: "60M+ প্লেয়ার",
    category: "cooking"
}, {
    id: "diner-dash",
    name: "Diner Dash",
    image: "https://readdy.ai/api/search-image?query=Diner%20Dash%20restaurant%20management%20game%20logo%20with%20waitress%20and%20diner%20theme%2C%20retro%20diner%20colors%2C%20restaurant%20service%20aesthetic&width=300&height=300&seq=dd1&orientation=squarish",
    popularity: "150M+ প্লেয়ার",
    category: "cooking"
}, {
    id: "pac-man",
    name: "PAC-MAN",
    image: "https://readdy.ai/api/search-image?query=PAC-MAN%20classic%20arcade%20game%20logo%20with%20yellow%20pac-man%20character%20and%20maze%20theme%2C%20yellow%20and%20blue%20retro%20colors%2C%20classic%20arcade%20aesthetic&width=300&height=300&seq=pac1&orientation=squarish",
    popularity: "300M+ প্লেয়ার",
    category: "arcade"
}, {
    id: "space-invaders",
    name: "Space Invaders",
    image: "https://readdy.ai/api/search-image?query=Space%20Invaders%20classic%20arcade%20game%20logo%20with%20alien%20invaders%20and%20space%20theme%2C%20green%20and%20black%20retro%20colors%2C%20retro%20space%20aesthetic&width=300&height=300&seq=si1&orientation=squarish",
    popularity: "200M+ প্লেয়ার",
    category: "arcade"
}, {
    id: "galaga",
    name: "Galaga",
    image: "https://readdy.ai/api/search-image?query=Galaga%20classic%20arcade%20shooter%20logo%20with%20spaceship%20and%20galaxy%20theme%2C%20blue%20and%20white%20space%20colors%2C%20retro%20shooter%20aesthetic&width=300&height=300&seq=gal1&orientation=squarish",
    popularity: "150M+ প্লেয়ার",
    category: "arcade"
}, {
    id: "frogger",
    name: "Frogger",
    image: "https://readdy.ai/api/search-image?query=Frogger%20classic%20arcade%20game%20logo%20with%20frog%20character%20and%20road%20crossing%20theme%2C%20green%20and%20brown%20colors%2C%20retro%20crossing%20aesthetic&width=300&height=300&seq=frog1&orientation=squarish",
    popularity: "100M+ প্লেয়ার",
    category: "arcade"
}, {
    id: "centipede",
    name: "Centipede",
    image: "https://readdy.ai/api/search-image?query=Centipede%20classic%20arcade%20shooter%20logo%20with%20insect%20centipede%20and%20garden%20theme%2C%20green%20and%20yellow%20colors%2C%20retro%20bug%20shooter%20aesthetic&width=300&height=300&seq=cent1&orientation=squarish",
    popularity: "80M+ প্লেয়ার",
    category: "arcade"
}, {
    id: "asteroids",
    name: "Asteroids",
    image: "https://readdy.ai/api/search-image?query=Asteroids%20classic%20arcade%20game%20logo%20with%20spaceship%20and%20asteroid%20field%20theme%2C%20white%20and%20black%20space%20colors%2C%20retro%20space%20aesthetic&width=300&height=300&seq=ast1&orientation=squarish",
    popularity: "120M+ প্লেয়ার",
    category: "arcade"
}];

function Rv() {
    const r = $i(),
        l = $ => {
            r(`/topup/${$}`)
        },
        s = ze.filter($ => $.category === "battle-royale"),
        u = ze.filter($ => $.category === "moba"),
        c = ze.filter($ => $.category === "fps"),
        f = ze.filter($ => $.category === "rpg"),
        d = ze.filter($ => $.category === "strategy"),
        p = ze.filter($ => $.category === "creative"),
        m = ze.filter($ => $.category === "racing"),
        g = ze.filter($ => $.category === "sports"),
        v = ze.filter($ => $.category === "casual"),
        b = ze.filter($ => $.category === "action"),
        S = ze.filter($ => $.category === "card"),
        x = ze.filter($ => $.category === "puzzle"),
        C = ze.filter($ => $.category === "simulation"),
        T = ze.filter($ => $.category === "adventure"),
        M = ze.filter($ => $.category === "horror"),
        L = ze.filter($ => $.category === "platform"),
        D = ze.filter($ => $.category === "music"),
        V = ze.filter($ => $.category === "educational"),
        W = ze.filter($ => $.category === "fighting"),
        Q = ze.filter($ => $.category === "board"),
        oe = ze.filter($ => $.category === "cooking"),
        me = ze.filter($ => $.category === "arcade");
    return E.jsxs("div", {
        className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
        children: [E.jsx(Mv, {}), E.jsxs("div", {
            className: "max-w-7xl mx-auto py-6 sm:py-8 md:py-12",
            children: [E.jsx(je, {
                title: "⚔️ ব্যাটল রয়েল গেমস",
                games: s,
                onGameClick: l
            }), E.jsx(je, {
                title: "🏆 MOBA গেমস",
                games: u,
                onGameClick: l
            }), E.jsx(je, {
                title: "🔫 FPS শুটার গেমস",
                games: c,
                onGameClick: l
            }), E.jsx(je, {
                title: "🎭 RPG গেমস",
                games: f,
                onGameClick: l
            }), E.jsx(je, {
                title: "🏰 স্ট্র্যাটেজি গেমস",
                games: d,
                onGameClick: l
            }), E.jsx(je, {
                title: "🎨 ক্রিয়েটিভ গেমস",
                games: p,
                onGameClick: l
            }), E.jsx(je, {
                title: "🏎️ রেসিং গেমস",
                games: m,
                onGameClick: l
            }), E.jsx(je, {
                title: "⚽ স্পোর্টস গেমস",
                games: g,
                onGameClick: l
            }), E.jsx(je, {
                title: "🎯 ক্যাজুয়াল গেমস",
                games: v,
                onGameClick: l
            }), E.jsx(je, {
                title: "💥 অ্যাকশন গেমস",
                games: b,
                onGameClick: l
            }), E.jsx(je, {
                title: "🃏 কার্ড গেমস",
                games: S,
                onGameClick: l
            }), E.jsx(je, {
                title: "🧩 পাজল গেমস",
                games: x,
                onGameClick: l
            }), E.jsx(je, {
                title: "🏗️ সিমুলেশন গেমস",
                games: C,
                onGameClick: l
            }), E.jsx(je, {
                title: "🗺️ অ্যাডভেঞ্চার গেমস",
                games: T,
                onGameClick: l
            }), E.jsx(je, {
                title: "👻 হরর গেমস",
                games: M,
                onGameClick: l
            }), E.jsx(je, {
                title: "🎮 প্রল্যাটফর্ম গেমস",
                games: L,
                onGameClick: l
            }), E.jsx(je, {
                title: "🎵 মিউজিক গেমস",
                games: D,
                onGameClick: l
            }), E.jsx(je, {
                title: "📚 শিক্ষামূলক গেমস",
                games: V,
                onGameClick: l
            }), E.jsx(je, {
                title: "🥊 ফাইটিং গেমস",
                games: W,
                onGameClick: l
            }), E.jsx(je, {
                title: "🎲 বোর্ড গেমস",
                games: Q,
                onGameClick: l
            }), E.jsx(je, {
                title: "👨‍🍳 কুকিং গেমস",
                games: oe,
                onGameClick: l
            }), E.jsx(je, {
                title: "🕹️ আর্কেড গেমস",
                games: me,
                onGameClick: l
            })]
        }), E.jsx("div", {
            className: "bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 p-6 sm:p-8 text-center",
            children: E.jsx("p", {
                className: "text-gray-400 text-sm",
                children: "© ২০২৪ গেমিং টপআপ হাব - সব ধরনের গেমের জন্য এক প্ল্যাটফর্ম"
            })
        })]
    })
}
const qv = [{
    id: "pubg-60",
    gameId: "pubg-mobile",
    diamonds: 60,
    bonus: 0,
    price: 85,
    originalPrice: 95
}, {
    id: "pubg-325",
    gameId: "pubg-mobile",
    diamonds: 325,
    bonus: 25,
    price: 420,
    originalPrice: 450,
    popular: !0
}, {
    id: "pubg-660",
    gameId: "pubg-mobile",
    diamonds: 660,
    bonus: 60,
    price: 850,
    originalPrice: 900
}, {
    id: "pubg-1800",
    gameId: "pubg-mobile",
    diamonds: 1800,
    bonus: 300,
    price: 2300,
    originalPrice: 2500
}, {
    id: "pubg-3850",
    gameId: "pubg-mobile",
    diamonds: 3850,
    bonus: 900,
    price: 4800,
    originalPrice: 5200
}, {
    id: "pubg-8100",
    gameId: "pubg-mobile",
    diamonds: 8100,
    bonus: 2700,
    price: 9500,
    originalPrice: 10500
}, {
    id: "ff-100",
    gameId: "free-fire",
    diamonds: 100,
    bonus: 0,
    price: 70,
    originalPrice: 80
}, {
    id: "ff-210",
    gameId: "free-fire",
    diamonds: 210,
    bonus: 21,
    price: 140,
    originalPrice: 160,
    popular: !0
}, {
    id: "ff-520",
    gameId: "free-fire",
    diamonds: 520,
    bonus: 52,
    price: 350,
    originalPrice: 400
}, {
    id: "ff-1080",
    gameId: "free-fire",
    diamonds: 1080,
    bonus: 108,
    price: 700,
    originalPrice: 800
}, {
    id: "ff-2200",
    gameId: "free-fire",
    diamonds: 2200,
    bonus: 440,
    price: 1400,
    originalPrice: 1600
}, {
    id: "ff-5600",
    gameId: "free-fire",
    diamonds: 5600,
    bonus: 1400,
    price: 3500,
    originalPrice: 4e3
}, {
    id: "ml-86",
    gameId: "mobile-legends",
    diamonds: 86,
    bonus: 0,
    price: 120,
    originalPrice: 130
}, {
    id: "ml-172",
    gameId: "mobile-legends",
    diamonds: 172,
    bonus: 17,
    price: 240,
    originalPrice: 260,
    popular: !0
}, {
    id: "ml-429",
    gameId: "mobile-legends",
    diamonds: 429,
    bonus: 43,
    price: 600,
    originalPrice: 650
}, {
    id: "ml-878",
    gameId: "mobile-legends",
    diamonds: 878,
    bonus: 88,
    price: 1200,
    originalPrice: 1300
}, {
    id: "ml-1830",
    gameId: "mobile-legends",
    diamonds: 1830,
    bonus: 367,
    price: 2400,
    originalPrice: 2600
}, {
    id: "ml-4394",
    gameId: "mobile-legends",
    diamonds: 4394,
    bonus: 1098,
    price: 6e3,
    originalPrice: 6500
}, {
    id: "cod-80",
    gameId: "call-of-duty",
    diamonds: 80,
    bonus: 0,
    price: 100,
    originalPrice: 110
}, {
    id: "cod-400",
    gameId: "call-of-duty",
    diamonds: 400,
    bonus: 40,
    price: 500,
    originalPrice: 550,
    popular: !0
}, {
    id: "cod-800",
    gameId: "call-of-duty",
    diamonds: 800,
    bonus: 80,
    price: 1e3,
    originalPrice: 1100
}, {
    id: "cod-2000",
    gameId: "call-of-duty",
    diamonds: 2e3,
    bonus: 400,
    price: 2500,
    originalPrice: 2750
}, {
    id: "cod-4000",
    gameId: "call-of-duty",
    diamonds: 4e3,
    bonus: 1e3,
    price: 5e3,
    originalPrice: 5500
}, {
    id: "cod-8000",
    gameId: "call-of-duty",
    diamonds: 8e3,
    bonus: 2400,
    price: 1e4,
    originalPrice: 11e3
}, {
    id: "coc-80",
    gameId: "clash-of-clans",
    diamonds: 80,
    bonus: 0,
    price: 90,
    originalPrice: 100
}, {
    id: "coc-500",
    gameId: "clash-of-clans",
    diamonds: 500,
    bonus: 50,
    price: 550,
    originalPrice: 600,
    popular: !0
}, {
    id: "coc-1200",
    gameId: "clash-of-clans",
    diamonds: 1200,
    bonus: 120,
    price: 1300,
    originalPrice: 1400
}, {
    id: "coc-2500",
    gameId: "clash-of-clans",
    diamonds: 2500,
    bonus: 500,
    price: 2700,
    originalPrice: 3e3
}, {
    id: "coc-6500",
    gameId: "clash-of-clans",
    diamonds: 6500,
    bonus: 1625,
    price: 7e3,
    originalPrice: 7800
}, {
    id: "coc-14000",
    gameId: "clash-of-clans",
    diamonds: 14e3,
    bonus: 4200,
    price: 15e3,
    originalPrice: 16500
}, {
    id: "genshin-60",
    gameId: "genshin-impact",
    diamonds: 60,
    bonus: 0,
    price: 80,
    originalPrice: 90
}, {
    id: "genshin-300",
    gameId: "genshin-impact",
    diamonds: 300,
    bonus: 30,
    price: 400,
    originalPrice: 450,
    popular: !0
}, {
    id: "genshin-980",
    gameId: "genshin-impact",
    diamonds: 980,
    bonus: 110,
    price: 1300,
    originalPrice: 1450
}, {
    id: "genshin-1980",
    gameId: "genshin-impact",
    diamonds: 1980,
    bonus: 260,
    price: 2600,
    originalPrice: 2900
}, {
    id: "genshin-3280",
    gameId: "genshin-impact",
    diamonds: 3280,
    bonus: 600,
    price: 4200,
    originalPrice: 4800
}, {
    id: "genshin-6480",
    gameId: "genshin-impact",
    diamonds: 6480,
    bonus: 1600,
    price: 8200,
    originalPrice: 9500
}, {
    id: "valorant-420",
    gameId: "valorant",
    diamonds: 420,
    bonus: 0,
    price: 500,
    originalPrice: 550
}, {
    id: "valorant-900",
    gameId: "valorant",
    diamonds: 900,
    bonus: 90,
    price: 1050,
    originalPrice: 1150,
    popular: !0
}, {
    id: "valorant-1900",
    gameId: "valorant",
    diamonds: 1900,
    bonus: 190,
    price: 2200,
    originalPrice: 2400
}, {
    id: "valorant-3650",
    gameId: "valorant",
    diamonds: 3650,
    bonus: 500,
    price: 4200,
    originalPrice: 4600
}, {
    id: "valorant-5350",
    gameId: "valorant",
    diamonds: 5350,
    bonus: 900,
    price: 6200,
    originalPrice: 6800
}, {
    id: "valorant-11000",
    gameId: "valorant",
    diamonds: 11e3,
    bonus: 2750,
    price: 12500,
    originalPrice: 13500
}, {
    id: "lol-420",
    gameId: "lol-wild-rift",
    diamonds: 420,
    bonus: 0,
    price: 480,
    originalPrice: 520
}, {
    id: "lol-875",
    gameId: "lol-wild-rift",
    diamonds: 875,
    bonus: 87,
    price: 1e3,
    originalPrice: 1100,
    popular: !0
}, {
    id: "lol-1850",
    gameId: "lol-wild-rift",
    diamonds: 1850,
    bonus: 185,
    price: 2100,
    originalPrice: 2300
}, {
    id: "lol-3900",
    gameId: "lol-wild-rift",
    diamonds: 3900,
    bonus: 585,
    price: 4400,
    originalPrice: 4800
}, {
    id: "lol-8150",
    gameId: "lol-wild-rift",
    diamonds: 8150,
    bonus: 1630,
    price: 9200,
    originalPrice: 1e4
}, {
    id: "lol-16500",
    gameId: "lol-wild-rift",
    diamonds: 16500,
    bonus: 4125,
    price: 18500,
    originalPrice: 2e4
}];

function Av({
    game: r
}) {
    return E.jsx("div", {
        className: "bg-white rounded-lg shadow-sm p-6 mb-8",
        children: E.jsxs("div", {
            className: "flex items-center space-x-4",
            children: [E.jsx("div", {
                className: "w-20 h-20 rounded-lg overflow-hidden flex-shrink-0",
                children: E.jsx("img", {
                    src: r.image,
                    alt: r.name,
                    className: "w-full h-full object-cover object-top"
                })
            }), E.jsxs("div", {
                children: [E.jsx("h1", {
                    className: "text-2xl font-bold text-gray-800",
                    children: r.name
                }), E.jsx("p", {
                    className: "text-gray-600",
                    children: r.popularity
                }), r.description && E.jsx("p", {
                    className: "text-sm text-gray-500 mt-1",
                    children: r.description
                })]
            })]
        })
    })
}

function Tv({
    packages: r,
    selectedPackage: l,
    onSelectPackage: s
}) {
    return E.jsxs("div", {
        className: "bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-3 sm:p-6 border border-gray-700/50",
        children: [E.jsxs("h2", {
            className: "text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6 text-center",
            children: [E.jsx("i", {
                className: "ri-vip-diamond-fill text-blue-400 mr-2"
            }), "ডায়মন্ড প্যাকেজ নির্বাচন করুন"]
        }), E.jsx("div", {
            className: "grid grid-cols-3 gap-2 sm:gap-3 md:gap-4",
            children: r.map(u => E.jsxs("div", {
                onClick: () => s(u.id),
                className: `group relative border-2 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex flex-col justify-between ${l===u.id?"border-blue-500 bg-gradient-to-br from-blue-900/30 to-purple-900/30 shadow-blue-500/25 shadow-lg":"border-gray-600 bg-gradient-to-br from-gray-800 to-gray-700 hover:border-blue-400"}`,
                children: [u.popular && E.jsx("div", {
                    className: "absolute -top-1 sm:-top-2 left-1/2 transform -translate-x-1/2 z-10",
                    children: E.jsx("span", {
                        className: "bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap font-bold shadow-lg",
                        children: "🔥 হিট"
                    })
                }), E.jsxs("div", {
                    className: "text-center flex-1 flex flex-col justify-center",
                    children: [E.jsx("div", {
                        className: "flex items-center justify-center mb-1 sm:mb-2",
                        children: E.jsx("div", {
                            className: `p-1 sm:p-2 rounded-full ${l===u.id?"bg-blue-500/20":"bg-gray-700/50"} transition-colors duration-300`,
                            children: E.jsx("i", {
                                className: "ri-vip-diamond-fill text-base sm:text-lg md:text-2xl lg:text-3xl text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                            })
                        })
                    }), E.jsx("div", {
                        className: "text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white mb-1",
                        children: u.diamonds > 999 ? `${(u.diamonds/1e3).toFixed(0)}K` : u.diamonds.toLocaleString()
                    }), u.bonus > 0 && E.jsxs("div", {
                        className: "text-green-400 text-xs font-semibold mb-1 sm:mb-2",
                        children: [E.jsx("i", {
                            className: "ri-gift-fill mr-1"
                        }), "+", u.bonus > 999 ? `${(u.bonus/1e3).toFixed(0)}K` : u.bonus]
                    }), E.jsxs("div", {
                        className: "space-y-0.5",
                        children: [E.jsxs("div", {
                            className: "text-xs sm:text-sm md:text-base lg:text-lg font-bold text-blue-300",
                            children: ["৳", u.price > 999 ? `${(u.price/1e3).toFixed(0)}K` : u.price.toLocaleString()]
                        }), u.originalPrice && E.jsxs("div", {
                            className: "text-xs text-gray-400 line-through",
                            children: ["৳", u.originalPrice > 999 ? `${(u.originalPrice/1e3).toFixed(0)}K` : u.originalPrice.toLocaleString()]
                        })]
                    })]
                }), l === u.id && E.jsx("div", {
                    className: "absolute top-1 sm:top-2 right-1 sm:right-2",
                    children: E.jsx("i", {
                        className: "ri-checkbox-circle-fill text-blue-400 text-sm sm:text-lg"
                    })
                })]
            }, u.id))
        })]
    })
}

function Nv({
    value: r,
    onChange: l,
    gameName: s
}) {
    return E.jsxs("div", {
        className: "bg-white rounded-lg shadow-sm p-6",
        children: [E.jsx("h2", {
            className: "text-xl font-semibold text-gray-800 mb-4",
            children: "ইউজার আইডি"
        }), E.jsxs("div", {
            className: "space-y-4",
            children: [E.jsxs("div", {
                children: [E.jsxs("label", {
                    className: "block text-sm font-medium text-gray-700 mb-2",
                    children: [s, " ইউজার আইডি"]
                }), E.jsx("input", {
                    type: "text",
                    value: r,
                    onChange: u => l(u.target.value),
                    placeholder: "আপনার গেম ইউজার আইডি লিখুন",
                    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                })]
            }), E.jsx("div", {
                className: "bg-yellow-50 border border-yellow-200 rounded-lg p-3",
                children: E.jsxs("div", {
                    className: "flex items-start space-x-2",
                    children: [E.jsx("i", {
                        className: "ri-information-line text-yellow-600 mt-0.5"
                    }), E.jsxs("div", {
                        className: "text-sm text-yellow-800",
                        children: [E.jsx("p", {
                            className: "font-medium mb-1",
                            children: "গুরুত্বপূর্ণ তথ্য:"
                        }), E.jsxs("ul", {
                            className: "text-xs space-y-1",
                            children: [E.jsx("li", {
                                children: "• আপনার সঠিক ইউজার আইডি দিন"
                            }), E.jsx("li", {
                                children: "• ভুল আইডি দিলে ডায়মন্ড পাবেন না"
                            }), E.jsx("li", {
                                children: "• গেমে প্রোফাইল সেটিংস থেকে আইডি দেখুন"
                            })]
                        })]
                    })]
                })
            })]
        })]
    })
}
const zv = [{
    id: "bkash",
    name: "বিকাশ",
    icon: "ri-smartphone-line",
    color: "text-pink-600"
}, {
    id: "nagad",
    name: "নগদ",
    icon: "ri-phone-line",
    color: "text-orange-600"
}, {
    id: "rocket",
    name: "রকেট",
    icon: "ri-rocket-line",
    color: "text-purple-600"
}, {
    id: "card",
    name: "কার্ড",
    icon: "ri-bank-card-line",
    color: "text-blue-600"
}];

function Lv({
    selectedMethod: r,
    onSelectMethod: l
}) {
    return E.jsxs("div", {
        className: "bg-white rounded-lg shadow-sm p-6",
        children: [E.jsx("h2", {
            className: "text-xl font-semibold text-gray-800 mb-4",
            children: "পেমেন্ট মেথড"
        }), E.jsx("div", {
            className: "grid grid-cols-2 md:grid-cols-4 gap-3",
            children: zv.map(s => E.jsx("div", {
                onClick: () => l(s.id),
                className: `border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md text-center ${r===s.id?"border-blue-500 bg-blue-50":"border-gray-200 hover:border-gray-300"}`,
                children: E.jsxs("div", {
                    className: "flex flex-col items-center space-y-2",
                    children: [E.jsx("div", {
                        className: `w-8 h-8 flex items-center justify-center ${s.color}`,
                        children: E.jsx("i", {
                            className: `${s.icon} text-2xl`
                        })
                    }), E.jsx("span", {
                        className: "text-sm font-medium text-gray-800",
                        children: s.name
                    })]
                })
            }, s.id))
        }), E.jsx("div", {
            className: "mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3",
            children: E.jsxs("div", {
                className: "flex items-start space-x-2",
                children: [E.jsx("i", {
                    className: "ri-shield-check-line text-blue-600 mt-0.5"
                }), E.jsxs("div", {
                    className: "text-sm text-blue-800",
                    children: [E.jsx("p", {
                        className: "font-medium mb-1",
                        children: "নিরাপদ পেমেন্ট"
                    }), E.jsx("p", {
                        className: "text-xs",
                        children: "আমাদের সব পেমেন্ট সিস্টেম ১০০% নিরাপদ এবং এনক্রিপ্টেড"
                    })]
                })]
            })
        })]
    })
}

function Dv({
    game: r,
    selectedPackage: l,
    userId: s,
    paymentMethod: u,
    onOrder: c
}) {
    const f = l && s && u;
    return E.jsxs("div", {
        className: "bg-white rounded-lg shadow-sm p-6 sticky top-8",
        children: [E.jsx("h2", {
            className: "text-xl font-semibold text-gray-800 mb-4",
            children: "অর্ডার সামারি"
        }), E.jsxs("div", {
            className: "space-y-4",
            children: [E.jsxs("div", {
                className: "flex items-center space-x-3 pb-3 border-b border-gray-200",
                children: [E.jsx("div", {
                    className: "w-12 h-12 rounded-lg overflow-hidden flex-shrink-0",
                    children: E.jsx("img", {
                        src: r.image,
                        alt: r.name,
                        className: "w-full h-full object-cover object-top"
                    })
                }), E.jsxs("div", {
                    children: [E.jsx("p", {
                        className: "font-medium text-gray-800",
                        children: r.name
                    }), E.jsx("p", {
                        className: "text-sm text-gray-500",
                        children: "গেমিং টপআপ"
                    })]
                })]
            }), l && E.jsxs("div", {
                className: "space-y-2",
                children: [E.jsxs("div", {
                    className: "flex justify-between items-center",
                    children: [E.jsx("span", {
                        className: "text-gray-600",
                        children: "ডায়মন্ড:"
                    }), E.jsx("span", {
                        className: "font-medium",
                        children: l.diamonds
                    })]
                }), l.bonus > 0 && E.jsxs("div", {
                    className: "flex justify-between items-center",
                    children: [E.jsx("span", {
                        className: "text-gray-600",
                        children: "বোনাস:"
                    }), E.jsxs("span", {
                        className: "font-medium text-green-600",
                        children: ["+", l.bonus]
                    })]
                }), E.jsxs("div", {
                    className: "flex justify-between items-center",
                    children: [E.jsx("span", {
                        className: "text-gray-600",
                        children: "মোট ডায়মন্ড:"
                    }), E.jsx("span", {
                        className: "font-semibold text-blue-600",
                        children: l.diamonds + l.bonus
                    })]
                })]
            }), s && E.jsx("div", {
                className: "space-y-2",
                children: E.jsxs("div", {
                    className: "flex justify-between items-center",
                    children: [E.jsx("span", {
                        className: "text-gray-600",
                        children: "ইউজার আইডি:"
                    }), E.jsx("span", {
                        className: "font-medium text-sm",
                        children: s
                    })]
                })
            }), u && E.jsx("div", {
                className: "space-y-2",
                children: E.jsxs("div", {
                    className: "flex justify-between items-center",
                    children: [E.jsx("span", {
                        className: "text-gray-600",
                        children: "পেমেন্ট:"
                    }), E.jsx("span", {
                        className: "font-medium capitalize",
                        children: u
                    })]
                })
            }), l && E.jsx("div", {
                className: "border-t border-gray-200 pt-3",
                children: E.jsxs("div", {
                    className: "flex justify-between items-center",
                    children: [E.jsx("span", {
                        className: "text-lg font-semibold text-gray-800",
                        children: "মোট:"
                    }), E.jsxs("span", {
                        className: "text-xl font-bold text-blue-600",
                        children: ["৳", l.price]
                    })]
                })
            }), E.jsx("button", {
                onClick: c,
                disabled: !f,
                className: `w-full py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ${f?"bg-blue-600 text-white hover:bg-blue-700":"bg-gray-200 text-gray-500 cursor-not-allowed"}`,
                children: "অর্ডার করুন"
            }), !f && E.jsx("p", {
                className: "text-xs text-gray-500 text-center",
                children: "অর্ডার করতে সকল তথ্য পূরণ করুন"
            })]
        })]
    })
}

function jv() {
    const {
        gameId: r
    } = Ny(), l = $i(), [s, u] = G.useState(null), [c, f] = G.useState(""), [d, p] = G.useState(""), m = ze.find(S => S.id === r), g = qv.filter(S => S.gameId === r);
    if (!m) return E.jsx("div", {
        className: "min-h-screen bg-gray-50 flex items-center justify-center",
        children: E.jsxs("div", {
            className: "text-center",
            children: [E.jsx("h1", {
                className: "text-2xl font-bold text-gray-800 mb-4",
                children: "গেম খুঁজে পাওয়া যায়নি"
            }), E.jsx("button", {
                onClick: () => l("/"),
                className: "bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap",
                children: "হোমে ফিরে যান"
            })]
        })
    });
    const v = g.find(S => S.id === s),
        b = () => {
            if (!s || !c || !d) {
                alert("সকল তথ্য পূরণ করুন");
                return
            }
            l("/order-success", {
                state: {
                    game: m.name,
                    package: v,
                    userId: c,
                    paymentMethod: d
                }
            })
        };
    return E.jsx("div", {
        className: "min-h-screen bg-gray-50",
        children: E.jsxs("div", {
            className: "max-w-4xl mx-auto px-4 py-8",
            children: [E.jsxs("button", {
                onClick: () => l("/"),
                className: "flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors",
                children: [E.jsx("i", {
                    className: "ri-arrow-left-line text-xl mr-2"
                }), E.jsx("span", {
                    children: "ফিরে যান"
                })]
            }), E.jsx(Av, {
                game: m
            }), E.jsxs("div", {
                className: "grid lg:grid-cols-3 gap-8",
                children: [E.jsxs("div", {
                    className: "lg:col-span-2 space-y-8",
                    children: [E.jsx(Tv, {
                        packages: g,
                        selectedPackage: s,
                        onSelectPackage: u
                    }), E.jsx(Nv, {
                        value: c,
                        onChange: f,
                        gameName: m.name
                    }), E.jsx(Lv, {
                        selectedMethod: d,
                        onSelectMethod: p
                    })]
                }), E.jsx("div", {
                    className: "lg:col-span-1",
                    children: E.jsx(Dv, {
                        game: m,
                        selectedPackage: v,
                        userId: c,
                        paymentMethod: d,
                        onOrder: b
                    })
                })]
            })]
        })
    })
}

function Uv() {
    const r = Ra(),
        l = $i(),
        s = r.state;
    return G.useEffect(() => {
        s || l("/")
    }, [s, l]), s ? E.jsx("div", {
        className: "min-h-screen bg-gray-50 flex items-center justify-center px-4",
        children: E.jsxs("div", {
            className: "max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center",
            children: [E.jsx("div", {
                className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6",
                children: E.jsx("i", {
                    className: "ri-check-line text-3xl text-green-600"
                })
            }), E.jsx("h1", {
                className: "text-2xl font-bold text-gray-800 mb-2",
                children: "অর্ডার সফল!"
            }), E.jsx("p", {
                className: "text-gray-600 mb-6",
                children: "আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে"
            }), E.jsxs("div", {
                className: "bg-gray-50 rounded-lg p-4 mb-6 text-left",
                children: [E.jsx("h2", {
                    className: "font-semibold text-gray-800 mb-3",
                    children: "অর্ডার বিবরণ:"
                }), E.jsxs("div", {
                    className: "space-y-2 text-sm",
                    children: [E.jsxs("div", {
                        className: "flex justify-between",
                        children: [E.jsx("span", {
                            className: "text-gray-600",
                            children: "গেম:"
                        }), E.jsx("span", {
                            className: "font-medium",
                            children: s.game
                        })]
                    }), E.jsxs("div", {
                        className: "flex justify-between",
                        children: [E.jsx("span", {
                            className: "text-gray-600",
                            children: "ডায়মন্ড:"
                        }), E.jsx("span", {
                            className: "font-medium",
                            children: s.package.diamonds + s.package.bonus
                        })]
                    }), E.jsxs("div", {
                        className: "flex justify-between",
                        children: [E.jsx("span", {
                            className: "text-gray-600",
                            children: "ইউজার আইডি:"
                        }), E.jsx("span", {
                            className: "font-medium",
                            children: s.userId
                        })]
                    }), E.jsxs("div", {
                        className: "flex justify-between",
                        children: [E.jsx("span", {
                            className: "text-gray-600",
                            children: "পেমেন্ট মেথড:"
                        }), E.jsx("span", {
                            className: "font-medium capitalize",
                            children: s.paymentMethod
                        })]
                    }), E.jsxs("div", {
                        className: "flex justify-between border-t pt-2",
                        children: [E.jsx("span", {
                            className: "text-gray-600",
                            children: "মোট:"
                        }), E.jsxs("span", {
                            className: "font-semibold text-blue-600",
                            children: ["৳", s.package.price]
                        })]
                    })]
                })]
            }), E.jsx("div", {
                className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6",
                children: E.jsxs("div", {
                    className: "flex items-start space-x-2",
                    children: [E.jsx("i", {
                        className: "ri-time-line text-blue-600 mt-0.5"
                    }), E.jsxs("div", {
                        className: "text-sm text-blue-800 text-left",
                        children: [E.jsx("p", {
                            className: "font-medium mb-1",
                            children: "ডেলিভারি তথ্য:"
                        }), E.jsx("p", {
                            className: "text-xs",
                            children: "ডায়মন্ড ১-৫ মিনিটের মধ্যে আপনার অ্যাকাউন্টে পৌঁছে যাবে"
                        })]
                    })]
                })
            }), E.jsxs("div", {
                className: "space-y-3",
                children: [E.jsx("button", {
                    onClick: () => l("/"),
                    className: "w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap",
                    children: "হোমে ফিরে যান"
                }), E.jsx("button", {
                    onClick: () => l(`/topup/${s.package.gameId}`),
                    className: "w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors whitespace-nowrap",
                    children: "আরও টপআপ করুন"
                })]
            })]
        })
    }) : null
}
const Fh = [{
        path: "/",
        element: E.jsx(Rv, {})
    }, {
        path: "/topup/:gameId",
        element: E.jsx(jv, {})
    }, {
        path: "/order-success",
        element: E.jsx(Uv, {})
    }, {
        path: "*",
        element: E.jsx(_v, {})
    }],
    Bv = Object.freeze(Object.defineProperty({
        __proto__: null,
        default: Fh
    }, Symbol.toStringTag, {
        value: "Module"
    }));
let Ph;
const Hv = new Promise(r => {
    Ph = r
});

function Wh() {
    const r = zy(Fh);
    if (!window.REACT_APP_NAVIGATE) {
        const l = $i();
        G.useEffect(() => {
            window.REACT_APP_NAVIGATE = l, Ph(window.REACT_APP_NAVIGATE)
        })
    }
    return r
}
const Gv = Object.freeze(Object.defineProperty({
    __proto__: null,
    AppRoutes: Wh,
    navigatePromise: Hv
}, Symbol.toStringTag, {
    value: "Module"
}));

function kv() {
    return E.jsx(mv, {
        basename: "/T8ijuuu",
        children: E.jsx(Wh, {})
    })
}
ay.createRoot(document.getElementById("root")).render(E.jsx(G.StrictMode, {
    children: E.jsx(kv, {})
}));
//# sourceMappingURL=index-2Cfz9U67.js.map
