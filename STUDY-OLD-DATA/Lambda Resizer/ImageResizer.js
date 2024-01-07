!(function (e, t) {
    "object" == typeof exports && "object" == typeof module
        ? (module.exports = t(require("aws-sdk")))
        : "function" == typeof define && define.amd
        ? define(["aws-sdk"], t)
        : "object" == typeof exports
        ? (exports.index = t(require("aws-sdk")))
        : (e.index = t(e["aws-sdk"]));
})(global, function (e) {
    return (function (e) {
        var t = {};
        function r(n) {
            if (t[n]) return t[n].exports;
            var i = (t[n] = { i: n, l: !1, exports: {} });
            return e[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
        }
        return (
            (r.m = e),
            (r.c = t),
            (r.d = function (e, t, n) {
                r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
            }),
            (r.r = function (e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
            }),
            (r.t = function (e, t) {
                if ((1 & t && (e = r(e)), 8 & t)) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                var n = Object.create(null);
                if ((r.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
                    for (var i in e)
                        r.d(
                            n,
                            i,
                            function (t) {
                                return e[t];
                            }.bind(null, i)
                        );
                return n;
            }),
            (r.n = function (e) {
                var t =
                    e && e.__esModule
                        ? function () {
                              return e.default;
                          }
                        : function () {
                              return e;
                          };
                return r.d(t, "a", t), t;
            }),
            (r.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (r.p = ""),
            r((r.s = 1))
        );
    })([
        function (e, t) {
            const r = (e, t, r, n) => ({ statusCode: r, headers: { "Content-Type": t, "X-Error": n || null, 
             'Access-Control-Allow-Credentials': true,
        	'Access-Control-Allow-Origin': '*'
        }, body: e, isBase64Encoded: !0 });
            t.successResponse = (e, t) => r(e, t, 200);
            const n = Buffer.from([71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 128, 0, 0, 255, 255, 255, 0, 0, 0, 33, 249, 4, 4, 0, 0, 0, 0, 44, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 2, 68, 1, 0, 59]).toString("base64");
            t.errorResponse = (e, t, i) => (console.log(`ERROR ${t} ${e}`, i), r(n, "image/gif", t, e));
        },
        function (e, t, r) {
            e.exports = r(2);
        },
        function (e, t, r) {
            const n = r(3),
                { errorResponse: i } = r(0),
                { original: o, resize: s } = r(4);
            t.handler = (e) =>
                new Promise((t, r) => {
                    const a = process.env.IMAGE_BUCKET;
                    if (!a) return r("Error: Set environment variable IMAGE_BUCKET");
                    const u = e.path,
                        c = decodeURI(n.parse(u).pathname.replace(/^\/+/g, ""));
                    console.log("INFO: key: " + c);
                    const h = e.queryStringParameters || {};
                    if (!h.width && !h.height) return o(a, c).then(t).catch(r);
                    const f = parseInt(h.width),
                        d = parseInt(h.height);
                    return (h.width && isNaN(f)) || (h.height && isNaN(d)) ? r(i("width and height parameters must be integer", 400)) : s(a, c, f, d).then(t).catch(r);
                });
        },
        function (e, t) {
            e.exports = require("url");
        },
        function (e, t, r) {
            const n = r(5),
                { successResponse: i, errorResponse: o } = r(0),
                s = r(7),
                a = r(10),
                u = r(11),
                c = (e, t, r) => n.getFileFromBucket(e, t).catch((e) => r(o(e.code, 404, e)));
            (t.original = (e, t) => new Promise((r, n) => c(e, t, n).then((e) => r(i(e.Body.toString("base64"), "image/jpeg"))))),
                (t.resize = (e, t, r, n) =>
                    new Promise((h, f) =>
                        c(e, t, f).then((c) => {
                            const d = t.split("/").join("."),
                                p = `${u.tmpDir}/resized.${e}.${d}.${r}.${n}`,
                                l = (e, t, r, n) => {
                                    e
                                        ? n(o(null, 500, e))
                                        : (console.log("INFO: Resize operation completed successfully"),
                                          s.identify(p, (e, t) => {
                                              let n;
                                              switch ((console.log("INFO: MIME type of thumbnail is being identified"), t.format)) {
                                                  case "GIF":
                                                      n = "image/gif";
                                                      break;
                                                  case "PNG":
                                                      n = "image/png";
                                                      break;
                                                  default:
                                                      n = "image/jpeg";
                                              }
                                              const o = i(Buffer.from(a.readFileSync(p)).toString("base64"), n);
                                              a.unlink(p, () => console.log("INFO: Resized file cleaned up")), r(o);
                                          }));
                                };
                            n ? s.crop({ width: r, srcData: c.Body, dstPath: p, height: n, quality: 1, gravity: "Center" }, (e, t) => l(e, 0, h, f)) : s.resize({ width: r, srcData: c.Body, dstPath: p }, (e, t) => l(e, 0, h, f));
                        })
                    ));
        },
        function (e, t, r) {
            const n = new (r(6).S3)();
            t.getFileFromBucket = (e, t) => n.getObject({ Bucket: e, Key: t }).promise();
        },
        function (t, r) {
            t.exports = e;
        },
        function (e, t, r) {
            var n = r(8),
                i = r(9).EventEmitter;
            function o(e, t) {
                var r = { encoding: "utf8", timeout: 0, maxBuffer: 512e3, killSignal: "SIGKILL", output: null },
                    o = arguments[arguments.length - 1];
                if (("function" != typeof o && (o = null), "object" == typeof arguments[2]))
                    for (var s = Object.keys(r), a = 0; a < s.length; a++) {
                        var u = s[a];
                        void 0 !== arguments[2][u] && (r[u] = arguments[2][u]);
                    }
                var c = n.spawn(e, t),
                    h = !1,
                    f = !1,
                    d = function (e) {
                        (this.proc = e),
                            (this.stderr = new p()),
                            (e.emitter = new i()),
                            (e.on = e.emitter.on.bind(e.emitter)),
                            (this.out = e.emitter.emit.bind(e.emitter, "data")),
                            (this.err = this.stderr.out.bind(this.stderr)),
                            (this.errCurrent = this.stderr.current.bind(this.stderr));
                    };
                d.prototype.finish = function (e) {
                    this.proc.emitter.emit("end", e, this.errCurrent());
                };
                var p = function (e) {
                    (this.stdout = { contents: "" }), (this.stderr = { contents: "" }), (this.callback = e);
                    var t = function (e) {
                        return function (t) {
                            (e.contents += t), !h && e.contents.length > r.maxBuffer && (c.kill(r.killSignal), (h = !0));
                        };
                    };
                    (this.out = t(this.stdout)), (this.err = t(this.stderr));
                };
                (p.prototype.current = function () {
                    return this.stdout.contents;
                }),
                    (p.prototype.errCurrent = function () {
                        return this.stderr.contents;
                    }),
                    (p.prototype.finish = function (e) {
                        this.callback(e, this.stdout.contents, this.stderr.contents);
                    });
                var l,
                    m = o ? new p(o) : new d(c);
                r.timeout > 0 &&
                    (l = setTimeout(function () {
                        h || (c.kill(r.killSignal), (f = !0), (h = !0), (l = null));
                    }, r.timeout)),
                    c.stdout.setEncoding(r.encoding),
                    c.stderr.setEncoding(r.encoding),
                    c.stdout.addListener("data", function (e) {
                        m.out(e, r.encoding);
                    }),
                    c.stderr.addListener("data", function (e) {
                        m.err(e, r.encoding);
                    });
                var g = process.versions.node.split(".");
                return (
                    c.addListener(0 == g[0] && g[1] < 7 ? "exit" : "close", function (e, t) {
                        if ((l && clearTimeout(l), 0 === e && null === t)) m.finish(null);
                        else {
                            var r = new Error("Command " + (f ? "timed out" : "failed") + ": " + m.errCurrent());
                            (r.timedOut = f), (r.killed = h), (r.code = e), (r.signal = t), m.finish(r);
                        }
                    }),
                    c
                );
            }
            function s(e) {
                return (e = e.split(/ /)), new Date(e[0].replace(/:/g, "-") + " " + e[1] + " +0000");
            }
            function a(e) {
                return e.replace(a.RE, function (e) {
                    return 1 === e.length ? e.toLowerCase() : e.substr(0, e.length - 1).toLowerCase() + e.substr(e.length - 1);
                });
            }
            (t.identify = function (e, r) {
                var n,
                    i = Array.isArray(e),
                    s = i ? [].concat(e) : ["-verbose", e];
                if ("object" == typeof s[s.length - 1]) {
                    if (((n = !0), (e = s[s.length - 1]), (s[s.length - 1] = "-"), !e.data)) throw new Error('first argument is missing the "data" member');
                } else "function" == typeof e && ((s[s.length - 1] = "-"), (r = e));
                var a = o(t.identify.path, s, { timeout: 12e4 }, function (e, t, n) {
                    var o, s;
                    e ||
                        (i
                            ? (o = t)
                            : ((s = (o = (function (e) {
                                  var t,
                                      r,
                                      n,
                                      i,
                                      o = e.split("\n"),
                                      s = {},
                                      a = [s],
                                      u = 0,
                                      c = [n];
                                  for (i in (o.shift(), o))
                                      if ((n = (t = o[i]).search(/\S/)) >= 0) {
                                          for (r = t.split(": "), n > u && c.push(n); n < u && a.length; ) c.pop(), (s = a.pop()), (u = c[c.length - 1]);
                                          r.length < 2 ? (a.push(s), (s = s[t.split(":")[0].trim().toLowerCase()] = {})) : (s[r[0].trim().toLowerCase()] = r[1].trim()), (u = n);
                                      }
                                  return s;
                              })(t)).geometry.split(/x/)),
                              (o.format = o.format.match(/\S*/)[0]),
                              (o.width = parseInt(s[0])),
                              (o.height = parseInt(s[1])),
                              (o.depth = parseInt(o.depth)),
                              void 0 !== o.quality && (o.quality = parseInt(o.quality) / 100))),
                        r(e, o);
                });
                return n && ("string" == typeof e.data ? (a.stdin.setEncoding("binary"), a.stdin.write(e.data, "binary"), a.stdin.end()) : a.stdin.end(e.data)), a;
            }),
                (t.identify.path = "identify"),
                (a.RE = /^[A-Z]+/);
            var u = {
                bitsPerSample: Number,
                compression: Number,
                exifImageLength: Number,
                exifImageWidth: Number,
                exifOffset: Number,
                exposureProgram: Number,
                flash: Number,
                imageLength: Number,
                imageWidth: Number,
                isoSpeedRatings: Number,
                jpegInterchangeFormat: Number,
                jpegInterchangeFormatLength: Number,
                lightSource: Number,
                meteringMode: Number,
                orientation: Number,
                photometricInterpretation: Number,
                planarConfiguration: Number,
                resolutionUnit: Number,
                rowsPerStrip: Number,
                samplesPerPixel: Number,
                sensingMethod: Number,
                stripByteCounts: Number,
                subSecTime: Number,
                subSecTimeDigitized: Number,
                subSecTimeOriginal: Number,
                customRendered: Number,
                exposureMode: Number,
                focalLengthIn35mmFilm: Number,
                gainControl: Number,
                saturation: Number,
                sharpness: Number,
                subjectDistanceRange: Number,
                subSecTime: Number,
                subSecTimeDigitized: Number,
                subSecTimeOriginal: Number,
                whiteBalance: Number,
                sceneCaptureType: Number,
                dateTime: s,
                dateTimeDigitized: s,
                dateTimeOriginal: s,
            };
            (t.readMetadata = function (e, r) {
                return t.identify(["-format", "%[EXIF:*]", e], function (e, t) {
                    var n = {};
                    e ||
                        t.split(/\n/).forEach(function (e) {
                            var t = e.indexOf("=");
                            if (-1 !== t) {
                                var r = e.substr(0, t).replace("/", "-"),
                                    i = e.substr(t + 1).trim(),
                                    o = "default",
                                    s = r.indexOf(":");
                                if (-1 !== s && ((o = r.substr(0, s)), (r = r.substr(s + 1)), "exif" === o)) {
                                    r = a(r);
                                    var c = u[r];
                                    c && (i = c(i));
                                }
                                o in n ? (n[o][r] = i) : (n[o] = { key: i });
                            }
                        }),
                        r(e, n);
                });
            }),
                (t.convert = function (e, r, n) {
                    var i = { encoding: "binary" };
                    return "function" == typeof r ? ((n = r), (r = 0)) : "number" != typeof r && (r = 0), r && (r = parseInt(r)) > 0 && !isNaN(r) && (i.timeout = r), o(t.convert.path, e, i, n);
                }),
                (t.convert.path = "convert");
            var c = function (e, r) {
                var n = t.convert(e.args, e.opt.timeout, r);
                return e.opt.srcPath.match(/-$/) && ("string" == typeof e.opt.srcData ? (n.stdin.setEncoding("binary"), n.stdin.write(e.opt.srcData, "binary"), n.stdin.end()) : n.stdin.end(e.opt.srcData)), n;
            };
            (t.resize = function (e, r) {
                var n = t.resizeArgs(e);
                return c(n, r);
            }),
                (t.crop = function (e, r) {
                    if ("object" != typeof e) throw new TypeError("First argument must be an object");
                    if (!e.srcPath && !e.srcData) throw new TypeError("No srcPath or data defined");
                    if (!e.height && !e.width) throw new TypeError("No width or height defined");
                    if (e.srcPath) var n = e.srcPath;
                    else n = { data: e.srcData };
                    t.identify(n, function (n, i) {
                        if (n) return r && r(n);
                        var o = t.resizeArgs(e),
                            s = !1,
                            a = !1,
                            u = [];
                        o.args.forEach(function (t) {
                            if (
                                (!0 === a && (console.log("arg", t), (a = !1)),
                                s || "-resize" == t || u.push(t),
                                "-resize" == t && (console.log("resize arg"), (s = !0), (a = !0)),
                                "-crop" === t && (console.log("crop arg"), (a = !0)),
                                "-resize" != t && s)
                            ) {
                                var r = i.width / i.height < o.opt.width / o.opt.height ? o.opt.width + "x" : "x" + o.opt.height,
                                    n = e.gravity ? e.gravity : "Center";
                                (u = u.concat(["-resize", r, "-gravity", n, "-crop", o.opt.width + "x" + o.opt.height + "+0+0", "+repage"])), (s = !1);
                            }
                        }),
                            (o.args = u),
                            c(o, r);
                    });
                }),
                (t.resizeArgs = function (e) {
                    var t = {
                        srcPath: null,
                        srcData: null,
                        srcFormat: null,
                        dstPath: null,
                        quality: 0.8,
                        format: "jpg",
                        progressive: !1,
                        colorspace: null,
                        width: 0,
                        height: 0,
                        strip: !0,
                        filter: "Lagrange",
                        sharpening: 0.2,
                        customArgs: [],
                        timeout: 0,
                    };
                    if ("object" != typeof e) throw new Error("first argument must be an object");
                    for (var r in t) r in e && (t[r] = e[r]);
                    if (!t.srcPath && !t.srcData) throw new Error("both srcPath and srcData are empty");
                    if ((t.format || (t.format = "jpg"), t.srcPath || (t.srcPath = t.srcFormat ? t.srcFormat + ":-" : "-"), t.dstPath || (t.dstPath = t.format ? t.format + ":-" : "-"), 0 === t.width && 0 === t.height))
                        throw new Error("both width and height can not be 0 (zero)");
                    var n = [t.srcPath];
                    t.sharpening > 0 && (n = n.concat(["-set", "option:filter:blur", String(1 - t.sharpening)])),
                        t.filter && (n.push("-filter"), n.push(t.filter)),
                        t.strip && n.push("-strip"),
                        (t.width || t.height) && (n.push("-resize"), 0 === t.height ? n.push(String(t.width)) : 0 === t.width ? n.push("x" + String(t.height)) : n.push(String(t.width) + "x" + String(t.height))),
                        (t.format = t.format.toLowerCase());
                    var i = "jpg" === t.format || "jpeg" === t.format;
                    return (
                        i && t.progressive && (n.push("-interlace"), n.push("plane")),
                        i || "png" === t.format ? (n.push("-quality"), n.push(Math.round(100 * t.quality).toString())) : ("miff" !== t.format && "mif" !== t.format) || (n.push("-quality"), n.push(Math.round(9 * t.quality).toString())),
                        t.colorspace && (n.push("-colorspace"), n.push(t.colorspace)),
                        Array.isArray(t.customArgs) && t.customArgs.length && (n = n.concat(t.customArgs)),
                        n.push(t.dstPath),
                        { opt: t, args: n }
                    );
                });
        },
        function (e, t) {
            e.exports = require("child_process");
        },
        function (e, t) {
            e.exports = require("events");
        },
        function (e, t) {
            e.exports = require("fs");
        },
        function (e, t) {
            e.exports = require("os");
        },
    ]);
});
