function l(b, a, c, d) {
    b.s.Gb(b.mb, a, c, d, void 0)
}
function m(b, a, c, d) {
    b.s.ca ? l(b, a, c, d) : b.s.De()._OnMessageFromDOM({
        type: "event",
        component: b.mb,
        handler: a,
        dispatchOpts: d || null,
        data: c,
        responseId: null
    })
}
function n(b, a, c) {
    b.s.C(b.mb, a, c)
}
function u(b, a) {
    for (const [c,d] of a)
        n(b, c, d)
}
function v(b) {
    b.Sb || (b.s.pd(b.Xd),
    b.Sb = !0)
}
window.Ma = class {
    constructor(b, a) {
        this.s = b;
        this.mb = a;
        this.Sb = !1;
        this.Xd = ()=>this.Pa()
    }
    dd() {}
    Pa() {}
}
;
window.lf = class {
    constructor() {
        this.ad = -1
    }
    j() {
        -1 !== this.ad && (self.clearTimeout(this.ad),
        this.ad = -1)
    }
}
;
"use strict";
class aa {
    constructor(b) {
        this.Jc = b;
        this.Mc = !1;
        this.Tc = !0
    }
}
function ba(b, a) {
    const c = a.elementId
      , d = b.lc(c, a)
      , e = new aa(d);
    b.pb.set(c, e);
    d.style.boxSizing = "border-box";
    d.style.display = "none";
    e.Tc = !!a.isVisible;
    d.addEventListener("focus", ()=>{
        w(b, "elem-focused", c)
    }
    );
    d.addEventListener("blur", ()=>{
        w(b, "elem-blurred", c)
    }
    );
    b.Ob && document.body.appendChild(d)
}
function x(b, a, c) {
    n(b, a, d=>{
        const e = z(b, d.elementId);
        return c(e, d)
    }
    )
}
function z(b, a) {
    b = b.pb.get(a);
    if (!b)
        throw Error(`no element with id ${a}`);
    return b.Jc
}
function w(b, a, c) {
    var d;
    d || (d = {});
    d.elementId = c;
    l(b, a, d)
}
window.hd = class extends self.Ma {
    constructor(b, a) {
        super(b, a);
        this.pb = new Map;
        this.Ob = !0;
        u(this, [["create", c=>ba(this, c)], ["destroy", c=>{
            c = c.elementId;
            const d = z(this, c);
            this.kd(d);
            this.Ob && d.parentElement.removeChild(d);
            this.pb.delete(c)
        }
        ], ["set-visible", c=>{
            if (this.Ob) {
                var d = this.pb.get(c.elementId)
                  , e = d.Jc;
                d.Mc ? e.style.display = c.isVisible ? "" : "none" : d.Tc = !!c.isVisible
            }
        }
        ], ["update-position", c=>{
            if (this.Ob) {
                var d = this.pb.get(c.elementId)
                  , e = d.Jc;
                e.style.left = c.left + "px";
                e.style.top = c.top + "px";
                e.style.width = c.width + "px";
                e.style.height = c.height + "px";
                c = c.fontSize;
                null !== c && (e.style.fontSize = c + "em");
                d.Mc || (d.Mc = !0,
                d.Tc && (e.style.display = ""))
            }
        }
        ], ["update-state", c=>{
            z(this, c.elementId);
            this.od()
        }
        ], ["focus", c=>this.Cc(c)], ["set-css-style", c=>{
            const d = z(this, c.elementId)
              , e = c.prop;
            c = c.val;
            e.startsWith("--") ? d.style.setProperty(e, c) : d.style[e] = c
        }
        ], ["set-attribute", c=>{
            z(this, c.elementId).setAttribute(c.name, c.val)
        }
        ], ["remove-attribute", c=>{
            z(this, c.elementId).removeAttribute(c.name)
        }
        ]]);
        x(this, "get-element", c=>c)
    }
    lc() {
        throw Error("required override");
    }
    kd() {}
    od() {
        throw Error("required override");
    }
    Cc(b) {
        var a = z(this, b.elementId);
        b.focus ? a.focus() : a.blur()
    }
}
;
"use strict";
const ca = /(iphone|ipod|ipad|macos|macintosh|mac os x)/i.test(navigator.userAgent)
  , A = /android/i.test(navigator.userAgent)
  , da = /safari/i.test(navigator.userAgent) && !/(chrome|chromium|edg\/|OPR\/|nwjs)/i.test(navigator.userAgent);
let ea = 0;
function C(b) {
    const a = document.createElement("script");
    a.async = !1;
    a.type = "module";
    return b.af ? new Promise(c=>{
        const d = "c3_resolve_" + ea;
        ++ea;
        self[d] = c;
        a.textContent = b.ef + `\n\nself["${d}"]();`;
        document.head.appendChild(a)
    }
    ) : new Promise((c,d)=>{
        a.onload = c;
        a.onerror = d;
        a.src = b;
        document.head.appendChild(a)
    }
    )
}
let fa = !1
  , ha = !1;
function ja() {
    if (!fa) {
        try {
            new Worker("blob://",{
                get type() {
                    ha = !0
                }
            })
        } catch (b) {}
        fa = !0
    }
    return ha
}
let D = new Audio;
const ka = {
    "audio/webm; codecs=opus": !!D.canPlayType("audio/webm; codecs=opus"),
    "audio/ogg; codecs=opus": !!D.canPlayType("audio/ogg; codecs=opus"),
    "audio/webm; codecs=vorbis": !!D.canPlayType("audio/webm; codecs=vorbis"),
    "audio/ogg; codecs=vorbis": !!D.canPlayType("audio/ogg; codecs=vorbis"),
    "audio/mp4": !!D.canPlayType("audio/mp4"),
    "audio/mpeg": !!D.canPlayType("audio/mpeg")
};
D = null;
async function la(b) {
    b = await ma(b);
    return (new TextDecoder("utf-8")).decode(b)
}
function ma(b) {
    return new Promise((a,c)=>{
        const d = new FileReader;
        d.onload = e=>a(e.target.result);
        d.onerror = e=>c(e);
        d.readAsArrayBuffer(b)
    }
    )
}
const F = [];
let G = 0;
window.RealFile = window.File;
const H = []
  , na = new Map
  , oa = new Map;
let ra = 0;
const sa = [];
self.runOnStartup = function(b) {
    if ("function" !== typeof b)
        throw Error("runOnStartup called without a function");
    sa.push(b)
}
;
const ta = new Set(["cordova", "playable-ad", "instant-games"]);
let ua = !1;
window.ia = class b {
    constructor(a) {
        this.ca = a.gf;
        this.xa = null;
        this.ba = "";
        this.bb = a.df;
        this.Db = {};
        this.Va = this.va = null;
        this.Qb = [];
        this.H = this.ya = null;
        this.Qc = !1;
        this.Cd = 0;
        this.sb = null;
        this.ab = -1;
        this.We = ()=>this.Ke();
        this.$a = [];
        this.v = a.Yd;
        this.Ub = "file" === location.protocol.substr(0, 4);
        !this.ca || "undefined" !== typeof OffscreenCanvas && navigator.userActivation && ja() || (this.ca = !1);
        this.ca && da && (this.ca = !1);
        if ("playable-ad" === this.v || "instant-games" === this.v)
            this.ca = !1;
        if ("cordova" === this.v && this.ca)
            if (A) {
                const c = /Chrome\/(\d+)/i.exec(navigator.userAgent);
                c && 90 <= parseInt(c[1], 10) || (this.ca = !1)
            } else
                this.ca = !1;
        this.Wb = this.sa = null;
        "html5" !== this.v || window.isSecureContext || console.warn("[Construct] Warning: the browser indicates this is not a secure context. Some features may be unavailable. Use secure (HTTPS) hosting to ensure all features are available.");
        this.C("runtime", "cordova-fetch-local-file", c=>this.Ge(c));
        this.C("runtime", "create-job-worker", ()=>this.He());
        "cordova" === this.v ? document.addEventListener("deviceready", ()=>this.sd(a)) : this.sd(a)
    }
    j() {
        this.vc();
        this.xa && (this.xa = this.xa.onmessage = null);
        this.va && (this.va.terminate(),
        this.va = null);
        this.Va && (this.Va.j(),
        this.Va = null);
        this.H && (this.H.parentElement.removeChild(this.H),
        this.H = null)
    }
    se() {
        return ca && "cordova" === this.v
    }
    rc() {
        const a = navigator.userAgent;
        return ca && ta.has(this.v) || navigator.standalone || /crios\/|fxios\/|edgios\//i.test(a)
    }
    qe() {
        return A
    }
    ld() {
        return A && ta.has(this.v)
    }
    async sd(a) {
        "macos-wkwebview" === this.v && this.Fc({
            type: "ready"
        });
        if ("playable-ad" === this.v) {
            this.sa = self.c3_base64files;
            this.Wb = {};
            await this.ze();
            for (let d = 0, e = a.eb.length; d < e; ++d) {
                var c = a.eb[d];
                this.Wb.hasOwnProperty(c) ? a.eb[d] = {
                    af: !0,
                    ef: this.Wb[c]
                } : this.sa.hasOwnProperty(c) && (a.eb[d] = URL.createObjectURL(this.sa[c]))
            }
            a.jc = []
        }
        if ("nwjs" === this.v && self.nw && self.nw.App.manifest["c3-steam-mode"]) {
            let d = 0;
            this.pd(()=>{
                d++;
                document.body.style.opacity = 0 === d % 2 ? "1" : "0.999"
            }
            )
        }
        a.cf ? this.ba = a.cf : (c = location.origin,
        this.ba = ("null" === c ? "file:///" : c) + location.pathname,
        c = this.ba.lastIndexOf("/"),
        -1 !== c && (this.ba = this.ba.substr(0, c + 1)));
        a.jf && (this.Db = a.jf);
        c = new MessageChannel;
        this.xa = c.port1;
        this.xa.onmessage = d=>this._OnMessageFromRuntime(d.data);
        window.c3_addPortMessageHandler && window.c3_addPortMessageHandler(d=>this.Je(d));
        this.sb = new self.te(this);
        await va(this.sb);
        "object" === typeof window.StatusBar && window.StatusBar.hide();
        if ("object" === typeof window.AndroidFullScreen)
            try {
                await new Promise((d,e)=>{
                    window.AndroidFullScreen.immersiveMode(d, e)
                }
                )
            } catch (d) {
                console.error("Failed to enter Android immersive mode: ", d)
            }
        this.ca ? await this.Fe(a, c.port2) : await this.Ee(a, c.port2)
    }
    xc(a) {
        a = this.Db.hasOwnProperty(a) ? this.Db[a] : a.endsWith("/workermain.js") && this.Db.hasOwnProperty("workermain.js") ? this.Db["workermain.js"] : "playable-ad" === this.v && this.sa.hasOwnProperty(a) ? this.sa[a] : a;
        a instanceof Blob && (a = URL.createObjectURL(a));
        return a
    }
    async mc(a, c, d) {
        if (a.startsWith("blob:"))
            return new Worker(a,d);
        if ("cordova" === this.v && this.Ub)
            return a = await this.Eb(d.$e ? a : this.bb + a),
            new Worker(URL.createObjectURL(new Blob([a],{
                type: "application/javascript"
            })),d);
        a = new URL(a,c);
        if (location.origin !== a.origin) {
            a = await fetch(a);
            if (!a.ok)
                throw Error("failed to fetch worker script");
            a = await a.blob();
            return new Worker(URL.createObjectURL(a),d)
        }
        return new Worker(a,d)
    }
    pa() {
        return Math.max(window.innerWidth, 1)
    }
    ja() {
        return Math.max(window.innerHeight, 1)
    }
    rd(a) {
        var c = this.ba
          , d = location.href
          , e = this.pa()
          , f = this.ja()
          , g = window.devicePixelRatio
          , h = b.ib()
          , k = a.rf
          , p = window.cr_previewImageBlobs || this.sa
          , q = window.cr_previewProjectFileBlobs
          , t = window.cr_previewProjectFiles
          , y = window.pf || "";
        a = a.Yd;
        var r = (new URLSearchParams(self.location.search)).has("debug")
          , B = this.sb;
        return {
            runtimeBaseUrl: c,
            previewUrl: d,
            windowInnerWidth: e,
            windowInnerHeight: f,
            devicePixelRatio: g,
            isFullscreen: h,
            projectData: k,
            previewImageBlobs: p,
            previewProjectFileBlobs: q,
            previewProjectFileSWUrls: t,
            swClientId: y,
            exportType: a,
            isDebug: r,
            ife: !!self.qf,
            jobScheduler: {
                inputPort: B.Pc,
                outputPort: B.Xc,
                maxNumWorkers: B.Te
            },
            supportedAudioFormats: ka,
             opusWasmScriptUrl: window.cr_opusWasmScriptUrl || this.bb + "opus.wasm.js",
            opusWasmBinaryUrl: window.cr_opusWasmBinaryUrl || this.bb + "opus.wasm.wasm",
            isFileProtocol: this.Ub,
            isiOSCordova: this.se(),
            isiOSWebView: this.rc(),
            isFBInstantAvailable: "undefined" !== typeof self.FBInstant
        }
    }
    async Fe(a, c) {
        const d = this.xc(a.hf);
        "preview" === this.v ? (this.va = new Worker("previewworker.js",{
            type: "module",
            name: "Runtime"
        }),
        await new Promise((h,k)=>{
            const p = q=>{
                this.va.removeEventListener("message", p);
                q.data && "ok" === q.data.type ? h() : k()
            }
            ;
            this.va.addEventListener("message", p);
            this.va.postMessage({
                type: "construct-worker-init",
                "import": (new URL(d,this.ba)).toString()
            })
        }
        )) : this.va = await this.mc(d, this.ba, {
            type: "module",
            name: "Runtime",
            $e: !0
        });
        this.H = document.createElement("canvas");
        this.H.style.display = "none";
        const e = this.H.transferControlToOffscreen();
        document.body.appendChild(this.H);
        window.c3canvas = this.H;
        self.C3_InsertHTMLPlaceholders && self.C3_InsertHTMLPlaceholders();
        let f = a.jc || []
          , g = a.eb;
        f = await Promise.all(f.map(h=>this.Qa(h)));
        g = await Promise.all(g.map(h=>this.Qa(h)));
        if ("cordova" === this.v)
            for (let h = 0, k = a.ic.length; h < k; ++h) {
                const p = a.ic[h]
                  , q = p[0];
                if (q === a.bd || "scriptsInEvents.js" === q || q.endsWith("/scriptsInEvents.js"))
                    p[1] = await this.Qa(q)
            }
        this.va.postMessage(Object.assign(this.rd(a), {
            type: "init-runtime",
            isInWorker: !0,
            messagePort: c,
            canvas: e,
            workerDependencyScripts: f,
            engineScripts: g,
            projectScripts: a.ic,
            mainProjectScript: a.bd,
            projectScriptsStatus: self.C3_ProjectScriptsStatus
        }), [c, e, ...wa(this.sb)]);
        this.Qb = H.map(h=>new h(this));
        this.qd();
        xa(this.ya);
        self.c3_callFunction = (h,k)=>{
            var p = this.ya;
            return p.s.nd(p.mb, "js-invoke-function", {
                name: h,
                params: k
            }, void 0, void 0)
        }
        ;
        "preview" === this.v && (self.goToLastErrorScript = ()=>this.Gb("runtime", "go-to-last-error-script"))
    }
    async Ee(a, c) {
        this.H = document.createElement("canvas");
        this.H.style.display = "none";
        document.body.appendChild(this.H);
        window.c3canvas = this.H;
        self.C3_InsertHTMLPlaceholders && self.C3_InsertHTMLPlaceholders();
        this.Qb = H.map(g=>new g(this));
        this.qd();
        var d = a.eb.map(g=>"string" === typeof g ? (new URL(g,this.ba)).toString() : g);
        Array.isArray(a.jc) && d.unshift(...a.jc);
        d = await Promise.all(d.map(g=>this.Qa(g)));
        await Promise.all(d.map(g=>C(g)));
        d = self.C3_ProjectScriptsStatus;
        const e = a.bd
          , f = a.ic;
        for (let[g,h] of f)
            if (h || (h = g),
            g === e)
                try {
                    h = await this.Qa(h),
                    await C(h),
                    "preview" !== this.v || d[g] || this.ud(g, "main script did not run to completion")
                } catch (k) {
                    this.ud(g, k)
                }
            else if ("scriptsInEvents.js" === g || g.endsWith("/scriptsInEvents.js"))
                h = await this.Qa(h),
                await C(h);
        "preview" === this.v && "object" !== typeof self.kf.mf ? (this.Kb(),
        console.error("[C3 runtime] Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax."),
        alert("Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax.")) : (a = Object.assign(this.rd(a), {
            isInWorker: !1,
            messagePort: c,
            canvas: this.H,
            runOnStartupFunctions: sa
        }),
        xa(this.ya),
        this.td(),
        this.Va = self.C3_CreateRuntime(a),
        await self.C3_InitRuntime(this.Va, a))
    }
    ud(a, c) {
        this.Kb();
        console.error(`[Preview] Failed to load project main script (${a}): `, c);
        alert(`Failed to load project main script (${a}). Check all your JavaScript code has valid syntax. Press F12 and check the console for error details.`)
    }
    td() {
        this.Kb()
    }
    Kb() {
        const a = window.Ye;
        a && (a.parentElement.removeChild(a),
        window.Ye = null)
    }
    async He() {
        const a = await ya(this.sb);
        return {
            outputPort: a,
            transferables: [a]
        }
    }
    De() {
        if (this.ca)
            throw Error("not available in worker mode");
        return this.Va
    }
    Gb(a, c, d, e, f) {
        this.xa.postMessage({
            type: "event",
            component: a,
            handler: c,
            dispatchOpts: e || null,
            data: d,
            responseId: null
        }, f)
    }
    nd(a, c, d, e, f) {
        const g = ra++
          , h = new Promise((k,p)=>{
            oa.set(g, {
                resolve: k,
                reject: p
            })
        }
        );
        this.xa.postMessage({
            type: "event",
            component: a,
            handler: c,
            dispatchOpts: e || null,
            data: d,
            responseId: g
        }, f);
        return h
    }
    _OnMessageFromRuntime(a) {
        const c = a.type;
        if ("event" === c)
            return this.Ie(a);
        if ("result" === c)
            this.Le(a);
        else if ("runtime-ready" === c)
            this.Me();
        else if ("alert-error" === c)
            this.Kb(),
            alert(a.message);
        else if ("creating-runtime" === c)
            this.td();
        else
            throw Error(`unknown message '${c}'`);
    }
    Ie(a) {
        const c = a.component
          , d = a.handler
          , e = a.data
          , f = a.responseId;
        if (a = na.get(c))
            if (a = a.get(d)) {
                var g = null;
                try {
                    g = a(e)
                } catch (h) {
                    console.error(`Exception in '${c}' handler '${d}':`, h);
                    null !== f && this.Jb(f, !1, "" + h);
                    return
                }
                if (null === f)
                    return g;
                g && g.then ? g.then(h=>this.Jb(f, !0, h)).catch(h=>{
                    console.error(`Rejection from '${c}' handler '${d}':`, h);
                    this.Jb(f, !1, "" + h)
                }
                ) : this.Jb(f, !0, g)
            } else
                console.warn(`[DOM] No handler '${d}' for component '${c}'`);
        else
            console.warn(`[DOM] No event handlers for component '${c}'`)
    }
    Jb(a, c, d) {
        let e;
        d && d.transferables && (e = d.transferables);
        this.xa.postMessage({
            type: "result",
            responseId: a,
            isOk: c,
            result: d
        }, e)
    }
    Le(a) {
        const c = a.responseId
          , d = a.isOk;
        a = a.result;
        const e = oa.get(c);
        d ? e.resolve(a) : e.reject(a);
        oa.delete(c)
    }
    C(a, c, d) {
        let e = na.get(a);
        e || (e = new Map,
        na.set(a, e));
        if (e.has(c))
            throw Error(`[DOM] Component '${a}' already has handler '${c}'`);
        e.set(c, d)
    }
    static Ba(a) {
        if (H.includes(a))
            throw Error("DOM handler already added");
        H.push(a)
    }
    qd() {
        for (const a of this.Qb)
            if ("runtime" === a.mb) {
                this.ya = a;
                return
            }
        throw Error("cannot find runtime DOM handler");
    }
    Je(a) {
        this.Gb("debugger", "message", a)
    }
    Me() {
        for (const a of this.Qb)
            a.dd()
    }
    static ib() {
        return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || ua)
    }
    static Lb(a) {
        ua = !!a
    }
    pd(a) {
        this.$a.push(a);
        this.Ec()
    }
    Oe(a) {
        a = this.$a.indexOf(a);
        if (-1 === a)
            throw Error("invalid callback");
        this.$a.splice(a, 1);
        this.$a.length || this.vc()
    }
    Ec() {
        -1 === this.ab && this.$a.length && (this.ab = requestAnimationFrame(this.We))
    }
    vc() {
        -1 !== this.ab && (cancelAnimationFrame(this.ab),
        this.ab = -1)
    }
    Ke() {
        this.ab = -1;
        for (const a of this.$a)
            a();
        this.Ec()
    }
    Ea(a) {
        this.ya.Ea(a)
    }
    Oa(a) {
        this.ya.Oa(a)
    }
    Dc() {
        this.ya.Dc()
    }
    Ib(a) {
        this.ya.Ib(a)
    }
    re() {
        return !!ka["audio/webm; codecs=opus"]
    }
    async Pe(a) {
        a = await this.nd("runtime", "opus-decode", {
            arrayBuffer: a
        }, null, [a]);
        return new Float32Array(a)
    }
    ve(a) {
        this.Qc = !0;
        this.Cd = a
    }
    pe(a) {
        return /^(?:[a-z\-]+:)?\/\//.test(a) || "data:" === a.substr(0, 5) || "blob:" === a.substr(0, 5)
    }
    md(a) {
        return !this.pe(a)
    }
    async Qa(a) {
        return "cordova" === this.v && (a.startsWith("file:") || this.Ub && this.md(a)) ? (a.startsWith(this.ba) && (a = a.substr(this.ba.length)),
        a = await this.Eb(a),
        URL.createObjectURL(new Blob([a],{
            type: "application/javascript"
        }))) : a
    }
    async Ge(a) {
        const c = a.filename;
        switch (a.as) {
        case "text":
            return await this.oe(c);
        case "buffer":
            return await this.Eb(c);
        default:
            throw Error("unsupported type");
        }
    }
    gd(a) {
        const c = window.cordova.file.applicationDirectory + "www/" + a;
        return new Promise((d,e)=>{
            window.resolveLocalFileSystemURL(c, f=>{
                f.file(d, e)
            }
            , e)
        }
        )
    }
    async oe(a) {
        a = await this.gd(a);
        return await la(a)
    }
    wc() {
        if (F.length && !(8 <= G)) {
            G++;
            var a = F.shift();
            this.Ae(a.filename, a.ff, a.Ze)
        }
    }
    Eb(a) {
        return new Promise((c,d)=>{
            F.push({
                filename: a,
                ff: e=>{
                    G--;
                    this.wc();
                    c(e)
                }
                ,
                Ze: e=>{
                    G--;
                    this.wc();
                    d(e)
                }
            });
            this.wc()
        }
        )
    }
    async Ae(a, c, d) {
        try {
            const e = await this.gd(a)
              , f = await ma(e);
            c(f)
        } catch (e) {
            d(e)
        }
    }
    Fc(a) {
        if ("windows-webview2" === this.v)
            window.chrome.webview.postMessage(JSON.stringify(a));
        else if ("macos-wkwebview" === this.v)
            window.webkit.messageHandlers.C3Wrapper.postMessage(JSON.stringify(a));
        else
            throw Error("cannot send wrapper message");
    }
    async ze() {
        const a = [];
        for (const [c,d] of Object.entries(this.sa))
            a.push(this.ye(c, d));
        await Promise.all(a)
    }
    async ye(a, c) {
        if ("object" === typeof c)
            this.sa[a] = new Blob([c.str],{
                type: c.type
            }),
            this.Wb[a] = c.str;
        else {
            let d = await this.Ce(c);
            d || (d = this.Be(c));
            this.sa[a] = d
        }
    }
    async Ce(a) {
        try {
            return await (await fetch(a)).blob()
        } catch (c) {
            return console.warn("Failed to fetch a data: URI. Falling back to a slower workaround. This is probably because the Content Security Policy unnecessarily blocked it. Allow data: URIs in your CSP to avoid this.", c),
            null
        }
    }
    Be(a) {
        a = this.Ne(a);
        return this.xe(a.data, a.bf)
    }
    Ne(a) {
        var c = a.indexOf(",");
        if (0 > c)
            throw new URIError("expected comma in data: uri");
        var d = a.substring(c + 1);
        c = a.substring(5, c).split(";");
        a = c[0] || "";
        const e = c[2];
        d = "base64" === c[1] || "base64" === e ? atob(d) : decodeURIComponent(d);
        return {
            bf: a,
            data: d
        }
    }
    xe(a, c) {
        var d = a.length;
        let e = d >> 2, f = new Uint8Array(d), g = new Uint32Array(f.buffer,0,e), h, k;
        for (k = h = 0; h < e; ++h)
            g[h] = a.charCodeAt(k++) | a.charCodeAt(k++) << 8 | a.charCodeAt(k++) << 16 | a.charCodeAt(k++) << 24;
        for (d &= 3; d--; )
            f[k] = a.charCodeAt(k),
            ++k;
        return new Blob([f],{
            type: c
        })
    }
}
;
"use strict";
const I = self.ia;
function za(b) {
    return b.sourceCapabilities && b.sourceCapabilities.firesTouchEvents || b.originalEvent && b.originalEvent.sourceCapabilities && b.originalEvent.sourceCapabilities.firesTouchEvents
}
const Aa = new Map([["OSLeft", "MetaLeft"], ["OSRight", "MetaRight"]])
  , J = {
    dispatchRuntimeEvent: !0,
    dispatchUserScriptEvent: !0
}
  , Ba = {
    dispatchUserScriptEvent: !0
}
  , Ca = {
    dispatchRuntimeEvent: !0
};
function Da(b) {
    return new Promise((a,c)=>{
        const d = document.createElement("link");
        d.onload = ()=>a(d);
        d.onerror = e=>c(e);
        d.rel = "stylesheet";
        d.href = b;
        document.head.appendChild(d)
    }
    )
}
function Ea(b) {
    return new Promise((a,c)=>{
        const d = new Image;
        d.onload = ()=>a(d);
        d.onerror = e=>c(e);
        d.src = b
    }
    )
}
async function K(b) {
    b = URL.createObjectURL(b);
    try {
        return await Ea(b)
    } finally {
        URL.revokeObjectURL(b)
    }
}
function Fa(b) {
    return new Promise((a,c)=>{
        let d = new FileReader;
        d.onload = e=>a(e.target.result);
        d.onerror = e=>c(e);
        d.readAsText(b)
    }
    )
}
async function Ga(b, a, c) {
    if (!/firefox/i.test(navigator.userAgent))
        return await K(b);
    var d = await Fa(b);
    d = (new DOMParser).parseFromString(d, "image/svg+xml");
    const e = d.documentElement;
    if (e.hasAttribute("width") && e.hasAttribute("height")) {
        const f = e.getAttribute("width")
          , g = e.getAttribute("height");
        if (!f.includes("%") && !g.includes("%"))
            return await K(b)
    }
    e.setAttribute("width", a + "px");
    e.setAttribute("height", c + "px");
    d = (new XMLSerializer).serializeToString(d);
    b = new Blob([d],{
        type: "image/svg+xml"
    });
    return await K(b)
}
function Ha(b) {
    do {
        if (b.parentNode && b.hasAttribute("contenteditable"))
            return !0;
        b = b.parentNode
    } while (b);
    return !1
}
const Ia = new Set(["input", "textarea", "datalist", "select"])
  , Ja = new Set(["canvas", "body", "html"]);
function L(b) {
    b.target.tagName && Ja.has(b.target.tagName.toLowerCase()) && b.preventDefault()
}
function Ka(b) {
    (b.metaKey || b.ctrlKey) && b.preventDefault()
}
self.C3_GetSvgImageSize = async function(b) {
    b = await K(b);
    if (0 < b.width && 0 < b.height)
        return [b.width, b.height];
    b.style.position = "absolute";
    b.style.left = "0px";
    b.style.top = "0px";
    b.style.visibility = "hidden";
    document.body.appendChild(b);
    const a = b.getBoundingClientRect();
    document.body.removeChild(b);
    return [a.width, a.height]
}
;
self.C3_RasterSvgImageBlob = async function(b, a, c, d, e) {
    b = await Ga(b, a, c);
    const f = document.createElement("canvas");
    f.width = d;
    f.height = e;
    f.getContext("2d").drawImage(b, 0, 0, a, c);
    return f
}
;
let La = !1;
document.addEventListener("pause", ()=>La = !0);
document.addEventListener("resume", ()=>La = !1);
function xa(b) {
    b.Bd = !0;
    b.Uc = b.s.pa();
    b.tb = b.s.ja()
}
async function Na(b) {
    await Promise.all(b.webfonts.map(async a=>{
        a = new FontFace(a.name,`url('${a.url}')`);
        document.fonts.add(a);
        await a.load()
    }
    ))
}
async function Oa(b) {
    var a = b.imageBitmapOpts;
    b = await self.C3_RasterSvgImageBlob(b.blob, b.imageWidth, b.imageHeight, b.surfaceWidth, b.surfaceHeight);
    a = a ? await createImageBitmap(b, a) : await createImageBitmap(b);
    return {
        imageBitmap: a,
        transferables: [a]
    }
}
async function Pa(b) {
    return await self.C3_GetSvgImageSize(b.blob)
}
function Qa(b) {
    window.c3_postToMessagePort && (b.from = "runtime",
    window.c3_postToMessagePort(b))
}
function Ra(b) {
    self.setTimeout(()=>{
        b.Ad = !0
    }
    , 1E3);
    "cordova" === b.s.v ? (document.addEventListener("pause", ()=>Sa(b, !0)),
    document.addEventListener("resume", ()=>Sa(b, !1))) : document.addEventListener("visibilitychange", ()=>Sa(b, document.hidden));
    return {
        isSuspended: !(!document.hidden && !La)
    }
}
function Ta(b) {
    b.wd || (b.wd = !0,
    window.addEventListener("deviceorientation", a=>{
        b.Z || l(b, "deviceorientation", {
            absolute: !!a.absolute,
            alpha: a.alpha || 0,
            beta: a.beta || 0,
            gamma: a.gamma || 0,
            timeStamp: a.timeStamp,
            webkitCompassHeading: a.webkitCompassHeading,
            webkitCompassAccuracy: a.webkitCompassAccuracy
        }, J)
    }
    ),
    window.addEventListener("deviceorientationabsolute", a=>{
        b.Z || l(b, "deviceorientationabsolute", {
            absolute: !!a.absolute,
            alpha: a.alpha || 0,
            beta: a.beta || 0,
            gamma: a.gamma || 0,
            timeStamp: a.timeStamp
        }, J)
    }
    ))
}
function Ua(b) {
    b.vd || (b.vd = !0,
    window.addEventListener("devicemotion", a=>{
        if (!b.Z) {
            var c = null
              , d = a.acceleration;
            d && (c = {
                x: d.x || 0,
                y: d.y || 0,
                z: d.z || 0
            });
            d = null;
            var e = a.accelerationIncludingGravity;
            e && (d = {
                x: e.x || 0,
                y: e.y || 0,
                z: e.z || 0
            });
            e = null;
            var f = a.rotationRate;
            f && (e = {
                alpha: f.alpha || 0,
                beta: f.beta || 0,
                gamma: f.gamma || 0
            });
            l(b, "devicemotion", {
                acceleration: c,
                accelerationIncludingGravity: d,
                rotationRate: e,
                interval: a.interval,
                timeStamp: a.timeStamp
            }, J)
        }
    }
    ))
}
async function Va(b) {
    await Da(b.url)
}
function Wa(b, a) {
    b.Dd = a.message;
    -1 === b.Kc && (b.Kc = setTimeout(()=>{
        b.Kc = -1;
        const c = document.getElementById("exportToVideoMessage");
        c && (c.textContent = b.Dd)
    }
    , 250))
}
function M(b) {
    if (!b.Z) {
        var a = I.ib();
        a && "any" !== b.Zc && Xa(b);
        l(b, "fullscreenchange", {
            isFullscreen: a,
            innerWidth: b.pa(),
            innerHeight: b.ja()
        })
    }
}
function Ya(b, a) {
    console.warn("[Construct] Fullscreen request failed: ", a);
    l(b, "fullscreenerror", {
        isFullscreen: I.ib(),
        innerWidth: b.pa(),
        innerHeight: b.ja()
    })
}
function Sa(b, a) {
    a ? b.s.vc() : b.s.Ec();
    l(b, "visibilitychange", {
        hidden: a
    })
}
function Za(b, a, c) {
    "Backspace" === c.key && L(c);
    if (!b.Z) {
        var d = Aa.get(c.code) || c.code;
        m(b, a, {
            code: d,
            key: c.key,
            which: c.which,
            repeat: c.repeat,
            altKey: c.altKey,
            ctrlKey: c.ctrlKey,
            metaKey: c.metaKey,
            shiftKey: c.shiftKey,
            timeStamp: c.timeStamp
        }, J)
    }
}
function $a(b, a, c, d) {
    b.Z || za(c) || m(b, a, {
        button: c.button,
        buttons: c.buttons,
        clientX: c.clientX,
        clientY: c.clientY + b.da,
        pageX: c.pageX,
        pageY: c.pageY + b.da,
        movementX: c.movementX || 0,
        movementY: c.movementY || 0,
        timeStamp: c.timeStamp
    }, d)
}
function ab(b) {
    window !== window.top && window.focus();
    bb(b.target) && document.activeElement && !bb(document.activeElement) && document.activeElement.blur()
}
function N(b, a, c) {
    if (!b.Z) {
        var d = 0;
        "mouse" === c.pointerType && (d = b.xb);
        m(b, a, {
            pointerId: c.pointerId,
            pointerType: c.pointerType,
            button: c.button,
            buttons: c.buttons,
            lastButtons: d,
            clientX: c.clientX,
            clientY: c.clientY + b.da,
            pageX: c.pageX,
            pageY: c.pageY + b.da,
            movementX: c.movementX || 0,
            movementY: c.movementY || 0,
            width: c.width || 0,
            height: c.height || 0,
            pressure: c.pressure || 0,
            tangentialPressure: c.tangentialPressure || 0,
            tiltX: c.tiltX || 0,
            tiltY: c.tiltY || 0,
            twist: c.twist || 0,
            timeStamp: c.timeStamp
        }, J);
        "mouse" === c.pointerType && (d = "mousemove",
        "pointerdown" === a ? d = "mousedown" : "pointerup" === a && (d = "mouseup"),
        $a(b, d, c, Ba),
        b.xb = c.buttons)
    }
}
function cb(b, a, c) {
    if (!b.Z && !za(c)) {
        var d = b.xb;
        "pointerdown" === a && 0 !== d ? a = "pointermove" : "pointerup" === a && 0 !== c.buttons && (a = "pointermove");
        m(b, a, {
            pointerId: 1,
            pointerType: "mouse",
            button: c.button,
            buttons: c.buttons,
            lastButtons: d,
            clientX: c.clientX,
            clientY: c.clientY + b.da,
            pageX: c.pageX,
            pageY: c.pageY + b.da,
            movementX: c.movementX || 0,
            movementY: c.movementY || 0,
            width: 0,
            height: 0,
            pressure: 0,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            twist: 0,
            timeStamp: c.timeStamp
        }, J);
        b.xb = c.buttons;
        $a(b, c.type, c, Ba)
    }
}
function O(b, a, c) {
    if (!b.Z)
        for (let d = 0, e = c.changedTouches.length; d < e; ++d) {
            const f = c.changedTouches[d];
            m(b, a, {
                pointerId: f.identifier,
                pointerType: "touch",
                button: 0,
                buttons: 0,
                lastButtons: 0,
                clientX: f.clientX,
                clientY: f.clientY + b.da,
                pageX: f.pageX,
                pageY: f.pageY + b.da,
                movementX: c.movementX || 0,
                movementY: c.movementY || 0,
                width: 2 * (f.radiusX || f.webkitRadiusX || 0),
                height: 2 * (f.radiusY || f.webkitRadiusY || 0),
                pressure: f.force || f.webkitForce || 0,
                tangentialPressure: 0,
                tiltX: 0,
                tiltY: 0,
                twist: f.rotationAngle || 0,
                timeStamp: c.timeStamp
            }, J)
        }
}
function db(b, a, c) {
    document.body.style.transform = "";
    b.da = 0;
    if (0 < c) {
        var d = document.activeElement;
        d && (d = d.getBoundingClientRect(),
        a = (d.top + d.bottom) / 2 - (a - c) / 2,
        a > c && (a = c),
        0 > a && (a = 0),
        0 < a && (document.body.style.transform = `translateY(${-a}px)`,
        b.da = a))
    }
}
function eb(b, a, c, d) {
    const e = b.pa()
      , f = b.ja();
    b.cb = -1;
    e != a || f != c ? l(b, "window-resize", {
        innerWidth: e,
        innerHeight: f,
        devicePixelRatio: window.devicePixelRatio,
        isFullscreen: I.ib()
    }) : 10 > d && gb(b, e, f, d + 1)
}
function gb(b, a, c, d) {
    -1 !== b.cb && clearTimeout(b.cb);
    b.cb = setTimeout(()=>eb(b, a, c, d), 48)
}
function Xa(b) {
    b = b.Zc;
    if (screen.orientation && screen.orientation.lock)
        screen.orientation.lock(b).catch(a=>console.warn("[Construct] Failed to lock orientation: ", a));
    else
        try {
            let a = !1;
            screen.lockOrientation ? a = screen.lockOrientation(b) : screen.webkitLockOrientation ? a = screen.webkitLockOrientation(b) : screen.mozLockOrientation ? a = screen.mozLockOrientation(b) : screen.msLockOrientation && (a = screen.msLockOrientation(b));
            a || console.warn("[Construct] Failed to lock orientation")
        } catch (a) {
            console.warn("[Construct] Failed to lock orientation: ", a)
        }
}
function bb(b) {
    return !b || b === document || b === window || b === document.body || "canvas" === b.tagName.toLowerCase()
}
I.Ba(class extends self.Ma {
    constructor(b) {
        super(b, "runtime");
        this.Kd = !0;
        this.Bd = !1;
        this.cb = -1;
        this.Zc = "any";
        this.vd = this.wd = !1;
        this.ec = document.createElement("div");
        this.ec.className = "c3-screen-reader-text";
        this.ec.setAttribute("aria-live", "polite");
        document.body.appendChild(this.ec);
        this.Ha = null;
        this.Z = !1;
        this.Dd = "";
        this.Kc = -1;
        this.Ad = !1;
        this.Uc = b.pa();
        this.tb = b.ja();
        this.da = this.Cb = 0;
        b.C("canvas", "update-size", d=>{
            var e = this.s;
            e.Qc || (e = e.H,
            e.style.width = d.styleWidth + "px",
            e.style.height = d.styleHeight + "px",
            e.style.marginLeft = d.marginLeft + "px",
            e.style.marginTop = d.marginTop + "px",
            document.documentElement.style.setProperty("--construct-scale", d.displayScale),
            this.Kd && (e.style.display = "",
            this.Kd = !1))
        }
        );
        b.C("runtime", "invoke-download", d=>{
            const e = d.url;
            d = d.filename;
            const f = document.createElement("a")
              , g = document.body;
            f.textContent = d;
            f.href = e;
            f.download = d;
            g.appendChild(f);
            f.click();
            g.removeChild(f)
        }
        );
        b.C("runtime", "load-webfonts", d=>Na(d));
        b.C("runtime", "raster-svg-image", d=>Oa(d));
        b.C("runtime", "get-svg-image-size", d=>Pa(d));
        b.C("runtime", "set-target-orientation", d=>{
            this.Zc = d.targetOrientation
        }
        );
        b.C("runtime", "register-sw", ()=>{
            window.C3_RegisterSW && window.C3_RegisterSW()
        }
        );
        b.C("runtime", "post-to-debugger", d=>Qa(d));
        b.C("runtime", "go-to-script", d=>Qa(d));
        b.C("runtime", "before-start-ticking", ()=>Ra(this));
        b.C("runtime", "debug-highlight", d=>{
            if (d.show) {
                this.Ha || (this.Ha = document.createElement("div"),
                this.Ha.id = "inspectOutline",
                document.body.appendChild(this.Ha));
                var e = this.Ha;
                e.style.display = "";
                e.style.left = d.left - 1 + "px";
                e.style.top = d.top - 1 + "px";
                e.style.width = d.width + 2 + "px";
                e.style.height = d.height + 2 + "px";
                e.textContent = d.name
            } else
                this.Ha && (this.Ha.style.display = "none")
        }
        );
        b.C("runtime", "enable-device-orientation", ()=>Ta(this));
        b.C("runtime", "enable-device-motion", ()=>Ua(this));
        b.C("runtime", "add-stylesheet", d=>Va(d));
        b.C("runtime", "script-create-worker", d=>{
            const e = d.port2;
            (new Worker(d.url,d.opts)).postMessage({
                type: "construct-worker-init",
                port2: e
            }, [e])
        }
        );
        b.C("runtime", "alert", d=>this.Ac(d));
        b.C("runtime", "screen-reader-text", d=>{
            var e = d.type;
            "create" === e ? (e = document.createElement("p"),
            e.id = "c3-sr-" + d.id,
            e.textContent = d.text,
            this.ec.appendChild(e)) : "update" === e ? (e = document.getElementById("c3-sr-" + d.id)) ? e.textContent = d.text : console.warn(`[Construct] Missing screen reader text with id ${d.id}`) : "release" === e ? (e = document.getElementById("c3-sr-" + d.id)) ? e.remove() : console.warn(`[Construct] Missing screen reader text with id ${d.id}`) : console.warn(`[Construct] Unknown screen reader text update '${e}'`)
        }
        );
        b.C("runtime", "hide-cordova-splash", ()=>{
            navigator.splashscreen && navigator.splashscreen.hide && navigator.splashscreen.hide()
        }
        );
        b.C("runtime", "set-exporting-to-video", d=>{
            this.Z = !0;
            const e = document.createElement("h1");
            e.id = "exportToVideoMessage";
            e.textContent = d.message;
            document.body.prepend(e);
            document.body.classList.add("exportingToVideo");
            this.s.H.style.display = "";
            this.s.ve(d.duration)
        }
        );
        b.C("runtime", "export-to-video-progress", d=>Wa(this, d));
        b.C("runtime", "exported-to-video", d=>{
            window.Xe({
                type: "exported-video",
                blob: d.blob,
                time: d.time
            })
        }
        );
        b.C("runtime", "exported-to-image-sequence", d=>{
            window.Xe({
                type: "exported-image-sequence",
                blobArr: d.blobArr,
                time: d.time,
                gif: d.gif
            })
        }
        );
        const a = new Set(["input", "textarea", "datalist"]);
        window.addEventListener("contextmenu", d=>{
            const e = d.target;
            a.has(e.tagName.toLowerCase()) || Ha(e) || d.preventDefault()
        }
        );
        const c = b.H;
        window.addEventListener("selectstart", L);
        window.addEventListener("gesturehold", L);
        c.addEventListener("selectstart", L);
        c.addEventListener("gesturehold", L);
        window.addEventListener("touchstart", L, {
            passive: !1
        });
        "undefined" !== typeof PointerEvent ? (window.addEventListener("pointerdown", L, {
            passive: !1
        }),
        c.addEventListener("pointerdown", L)) : c.addEventListener("touchstart", L);
        this.xb = 0;
        window.addEventListener("mousedown", d=>{
            1 === d.button && d.preventDefault()
        }
        );
        window.addEventListener("mousewheel", Ka, {
            passive: !1
        });
        window.addEventListener("wheel", Ka, {
            passive: !1
        });
        window.addEventListener("resize", ()=>{
            a: {
                if (!this.Z && this.Bd) {
                    var d = this.pa();
                    var e = this.ja();
                    if (this.s.ld()) {
                        if (this.Ad) {
                            if (this.Uc === d && e < this.tb) {
                                this.Cb = this.tb - e;
                                db(this, this.tb, this.Cb);
                                d = void 0;
                                break a
                            }
                            0 < this.Cb && (this.Cb = 0,
                            db(this, e, this.Cb))
                        }
                        this.Uc = d;
                        this.tb = e
                    }
                    l(this, "window-resize", {
                        innerWidth: d,
                        innerHeight: e,
                        devicePixelRatio: window.devicePixelRatio,
                        isFullscreen: I.ib()
                    });
                    this.s.rc() && (-1 !== this.cb && clearTimeout(this.cb),
                    eb(this, d, e, 0))
                }
                d = void 0
            }
            return d
        }
        );
        window.addEventListener("fullscreenchange", ()=>M(this));
        window.addEventListener("webkitfullscreenchange", ()=>M(this));
        window.addEventListener("mozfullscreenchange", ()=>M(this));
        window.addEventListener("fullscreenerror", d=>Ya(this, d));
        window.addEventListener("webkitfullscreenerror", d=>Ya(this, d));
        window.addEventListener("mozfullscreenerror", d=>Ya(this, d));
        if (b.rc())
            if (window.visualViewport) {
                let d = Infinity;
                window.visualViewport.addEventListener("resize", ()=>{
                    const e = window.visualViewport.height;
                    e > d && (document.scrollingElement.scrollTop = 0);
                    d = e
                }
                )
            } else
                window.addEventListener("focusout", ()=>{
                    {
                        const f = document.activeElement;
                        if (f) {
                            var d = f.tagName.toLowerCase();
                            var e = new Set("email number password search tel text url".split(" "));
                            d = "textarea" === d ? !0 : "input" === d ? e.has(f.type.toLowerCase() || "text") : Ha(f)
                        } else
                            d = !1
                    }
                    d || (document.scrollingElement.scrollTop = 0)
                }
                );
        self.C3WrapperOnMessage = d=>{
            "entered-fullscreen" === d ? (I.Lb(!0),
            M(this)) : "exited-fullscreen" === d ? (I.Lb(!1),
            M(this)) : console.warn("Unknown wrapper message: ", d)
        }
        ;
        this.Wa = new Set;
        this.Yb = new WeakSet;
        this.wa = !1
    }
    dd() {
        window.addEventListener("focus", ()=>{
            l(this, "window-focus", null, Ca)
        }
        );
        window.addEventListener("blur", ()=>{
            try {
                var a = window.parent && window.parent.document.hasFocus()
            } catch (c) {
                a = !1
            }
            l(this, "window-blur", {
                parentHasFocus: a
            }, Ca);
            this.xb = 0
        }
        );
        window.addEventListener("focusin", a=>{
            a = a.target;
            (Ia.has(a.tagName.toLowerCase()) || Ha(a)) && l(this, "keyboard-blur", null, Ca)
        }
        );
        window.addEventListener("keydown", a=>Za(this, "keydown", a));
        window.addEventListener("keyup", a=>Za(this, "keyup", a));
        window.addEventListener("dblclick", a=>$a(this, "dblclick", a, J));
        window.addEventListener("wheel", a=>{
            this.Z || l(this, "wheel", {
                clientX: a.clientX,
                clientY: a.clientY + this.da,
                pageX: a.pageX,
                pageY: a.pageY + this.da,
                deltaX: a.deltaX,
                deltaY: a.deltaY,
                deltaZ: a.deltaZ,
                deltaMode: a.deltaMode,
                timeStamp: a.timeStamp
            }, J)
        }
        );
        "undefined" !== typeof PointerEvent ? (window.addEventListener("pointerdown", a=>{
            ab(a);
            N(this, "pointerdown", a)
        }
        ),
        this.s.ca && "undefined" !== typeof window.onpointerrawupdate && self === self.top ? window.addEventListener("pointerrawupdate", a=>{
            N(this, "pointermove", a)
        }
        ) : window.addEventListener("pointermove", a=>N(this, "pointermove", a)),
        window.addEventListener("pointerup", a=>N(this, "pointerup", a)),
        window.addEventListener("pointercancel", a=>N(this, "pointercancel", a))) : (window.addEventListener("mousedown", a=>{
            ab(a);
            cb(this, "pointerdown", a)
        }
        ),
        window.addEventListener("mousemove", a=>cb(this, "pointermove", a)),
        window.addEventListener("mouseup", a=>cb(this, "pointerup", a)),
        window.addEventListener("touchstart", a=>{
            ab(a);
            O(this, "pointerdown", a)
        }
        ),
        window.addEventListener("touchmove", a=>O(this, "pointermove", a)),
        window.addEventListener("touchend", a=>O(this, "pointerup", a)),
        window.addEventListener("touchcancel", a=>O(this, "pointercancel", a)));
        const b = ()=>this.Dc();
        window.addEventListener("pointerup", b, !0);
        window.addEventListener("touchend", b, !0);
        window.addEventListener("click", b, !0);
        window.addEventListener("keydown", b, !0);
        window.addEventListener("gamepadconnected", b, !0);
        this.s.qe() && !this.s.ld() && navigator.virtualKeyboard && (navigator.virtualKeyboard.overlaysContent = !0,
        navigator.virtualKeyboard.addEventListener("geometrychange", ()=>{
            db(this, this.ja(), navigator.virtualKeyboard.boundingRect.height)
        }
        ))
    }
    pa() {
        return this.s.pa()
    }
    ja() {
        return this.s.ja()
    }
    Dc() {
        var b = [...this.Wa];
        this.Wa.clear();
        if (!this.wa)
            for (const a of b)
                (b = a.play()) && b.catch(()=>{
                    this.Yb.has(a) || this.Wa.add(a)
                }
                )
    }
    Ea(b) {
        if ("function" !== typeof b.play)
            throw Error("missing play function");
        this.Yb.delete(b);
        let a;
        try {
            a = b.play()
        } catch (c) {
            this.Wa.add(b);
            return
        }
        a && a.catch(()=>{
            this.Yb.has(b) || this.Wa.add(b)
        }
        )
    }
    Oa(b) {
        this.Wa.delete(b);
        this.Yb.add(b)
    }
    Ib(b) {
        this.wa = !!b
    }
    Ac(b) {
        alert(b.message)
    }
}
);
"use strict";
async function va(b) {
    if (b.Re)
        throw Error("already initialised");
    b.Re = !0;
    var a = b.za.xc(("playable-ad" === b.za.v ? b.za.bb : "") + "dispatchworker.js");
    b.Ic = await b.za.mc(a, b.lb, {
        name: "DispatchWorker"
    });
    a = new MessageChannel;
    b.Pc = a.port1;
    b.Ic.postMessage({
        type: "_init",
        "in-port": a.port2
    }, [a.port2]);
    b.Xc = await ya(b)
}
function wa(b) {
    return [b.Pc, b.Xc]
}
async function ya(b) {
    const a = b.Ld.length;
    var c = b.za.xc(("playable-ad" === b.za.v ? b.za.bb : "") + "jobworker.js");
    c = await b.za.mc(c, b.lb, {
        name: "JobWorker" + a
    });
    const d = new MessageChannel
      , e = new MessageChannel;
    b.Ic.postMessage({
        type: "_addJobWorker",
        port: d.port1
    }, [d.port1]);
    c.postMessage({
        type: "init",
        number: a,
        "dispatch-port": d.port2,
        "output-port": e.port2
    }, [d.port2, e.port2]);
    b.Ld.push(c);
    return e.port1
}
self.te = class {
    constructor(b) {
        this.za = b;
        this.lb = b.ba;
        this.lb = "preview" === b.v ? this.lb + "workers/" : this.lb + b.bb;
        this.Te = Math.min(navigator.hardwareConcurrency || 2, 16);
        this.Ic = null;
        this.Ld = [];
        this.Xc = this.Pc = null
    }
}
;
"use strict";
window.C3_IsSupported && (window.c3_runtimeInterface = new self.ia({
    gf: !0,
    hf: "workermain.js",
    eb: ["scripts/c3runtime.js"],
    ic: [],
    bd: "",
    df: "scripts/",
    jc: [],
    Yd: "html5"
}));
"use strict";
function hb(b, a, c) {
    ib(b, a, URL.createObjectURL(new Blob([c.html],{
        type: "text/html"
    })));
    b.Tb = !0
}
function ib(b, a, c) {
    a.src && a.src.startsWith("blob:") && b.Tb && URL.revokeObjectURL(a.src);
    a.src = c
}
self.ia.Ba(class extends self.hd {
    constructor(b) {
        super(b, "iframe");
        this.Tb = !1;
        x(this, "navigate-url", (a,c)=>{
            ib(this, a, c.url);
            this.Tb = !1
        }
        );
        x(this, "display-html", (a,c)=>hb(this, a, c))
    }
    lc(b, a) {
        b = document.createElement("iframe");
        b.style.position = "absolute";
        b.style.border = "none";
        var c = navigator.userAgent;
        /iphone|ipad|ipod/i.test(c) && (c = /(iphone\s+os|ipad[^)]*os)\s+([0-9_]+)/i.exec(c),
        c = parseInt(c[c.length - 1]),
        12 >= c || isNaN(c)) && (b.setAttribute("noresize", "noresize"),
        b.setAttribute("scrolling", "no"));
        a.isVisible || (b.style.display = "none");
        a.id && (b.id = a.id);
        a.allow && (b.setAttribute("allow", a.allow),
        a.allow.includes("fullscreen") && b.setAttribute("allowfullscreen", ""));
        a.enableSandbox && b.setAttribute("sandbox", a.sandbox);
        a.url ? b.src = a.url : a.html && hb(this, b, a);
        return b
    }
    od() {}
    kd(b) {
        ib(this, b, "");
        this.Tb = !1
    }
}
);
"use strict";
function jb(b) {
    if (!b.Jd)
        return b.Ia;
    b.Jd = !1;
    window.twttr = function(a, c, d) {
        let e, f = a.getElementsByTagName(c)[0];
        if (!a.getElementById(d))
            return a = a.createElement(c),
            a.id = d,
            a.src = "https://platform.twitter.com/widgets.js",
            f.parentNode.insertBefore(a, f),
            window.twttr || (e = {
                Qe: [],
                ready: function(g) {
                    e.Qe.push(g)
                }
            })
    }(document, "script", "twitter-wjs");
    window.twttr.ready(a=>{
        b.Bb = a;
        b.Gd = !0;
        b.ra();
        b.ra = null
    }
    );
    return b.Ia
}
function kb(b, a, c, d) {
    var e = d.buttonType;
    const f = d.buttonShare
      , g = d.buttonText
      , h = d.buttonVia
      , k = d.buttonHashtags;
    var p = d.buttonCount;
    const q = d.buttonSize
      , t = d.buttonLang;
    a.style.display = d.isVisible ? "" : "none";
    d = "none";
    1 === p ? d = "horizontal" : 2 === p && (d = "vertical");
    p = 0 === q ? "medium" : "large";
    0 === e ? b.Bb.widgets.createFollowButton(f, a, ()=>{
        w(b, "loaded", c)
    }
    , {
        count: d,
        size: p,
        lang: t
    }) : 1 === e ? (e = {
        count: d,
        size: p,
        lang: t,
        text: g
    },
    h && (e.via = h),
    k && (e.hashtags = k),
    b.Bb.widgets.createShareButton(f, a, ()=>{
        w(b, "loaded", c)
    }
    , e)) : 2 === e ? (e = {
        count: d,
        size: p,
        lang: t,
        text: g
    },
    h && (e.via = h),
    k && (e.hashtags = k),
    b.Bb.widgets.createMentionButton(f, a, ()=>{
        w(b, "loaded", c)
    }
    , e)) : 3 === e && (e = {
        count: d,
        size: p,
        lang: t,
        text: g
    },
    h && (e.via = h),
    k && (e.hashtags = k),
    b.Bb.widgets.createHashtagButton(f, a, ()=>{
        w(b, "loaded", c)
    }
    , e))
}
self.ia.Ba(class extends self.hd {
    constructor(b) {
        super(b, "twitter");
        this.ra = this.Bb = null;
        this.Ia = new Promise(a=>this.ra = a);
        this.Jd = !0;
        this.Gd = !1;
        x(this, "reload", (a,c)=>{
            this.Gd && (a.innerHTML = "",
            kb(this, a, c.elementId, c))
        }
        );
        jb(this)
    }
    lc(b, a) {
        const c = document.createElement("div");
        c.style.position = "absolute";
        jb(this).then(()=>kb(this, c, b, a));
        return c
    }
}
);
"use strict";
self.ia.Ba(class extends self.Ma {
    constructor(b) {
        super(b, "mouse");
        u(this, [["cursor", a=>{
            document.documentElement.style.cursor = a
        }
        ], ["request-pointer-lock", ()=>{
            this.s.H.requestPointerLock()
        }
        ], ["release-pointer-lock", ()=>{
            document.exitPointerLock()
        }
        ]]);
        document.addEventListener("pointerlockchange", ()=>{
            l(this, "pointer-lock-change", {
                "has-pointer-lock": !!document.pointerLockElement
            })
        }
        );
        document.addEventListener("pointerlockerror", ()=>{
            l(this, "pointer-lock-error", {
                "has-pointer-lock": !!document.pointerLockElement
            })
        }
        )
    }
}
);
"use strict";
function lb() {}
function mb(b) {
    window.C3_RegisterSW && window.OfflineClientInfo && window.OfflineClientInfo.SetMessageCallback(a=>l(b, "sw-message", a.data))
}
function nb(b) {
    b = b.orientation;
    if (screen.orientation && screen.orientation.lock)
        screen.orientation.lock(b).catch(a=>console.warn("[Construct] Failed to lock orientation: ", a));
    else
        try {
            let a = !1;
            screen.lockOrientation ? a = screen.lockOrientation(b) : screen.webkitLockOrientation ? a = screen.webkitLockOrientation(b) : screen.mozLockOrientation ? a = screen.mozLockOrientation(b) : screen.msLockOrientation && (a = screen.msLockOrientation(b));
            a || console.warn("[Construct] Failed to lock orientation")
        } catch (a) {
            console.warn("[Construct] Failed to lock orientation: ", a)
        }
}
self.ia.Ba(class extends self.Ma {
    constructor(b) {
        super(b, "browser");
        this.v = "";
        u(this, [["get-initial-state", a=>{
            this.v = a.exportType;
            return {
                location: location.toString(),
                isOnline: !!navigator.onLine,
                referrer: document.referrer,
                title: document.title,
                isCookieEnabled: !!navigator.cookieEnabled,
                screenWidth: screen.width,
                screenHeight: screen.height,
                windowOuterWidth: window.outerWidth,
                windowOuterHeight: window.outerHeight,
                isConstructArcade: "undefined" !== typeof window.is_scirra_arcade
            }
        }
        ], ["ready-for-sw-messages", ()=>mb(this)], ["alert", a=>this.Ac(a)], ["close", ()=>{
            navigator.app && navigator.app.exitApp ? navigator.app.exitApp() : navigator.device && navigator.device.exitApp ? navigator.device.exitApp() : window.close()
        }
        ], ["set-focus", a=>this.Cc(a)], ["vibrate", a=>{
            navigator.vibrate && navigator.vibrate(a.pattern)
        }
        ], ["lock-orientation", a=>nb(a)], ["unlock-orientation", ()=>{
            try {
                screen.orientation && screen.orientation.unlock ? screen.orientation.unlock() : screen.unlockOrientation ? screen.unlockOrientation() : screen.webkitUnlockOrientation ? screen.webkitUnlockOrientation() : screen.mozUnlockOrientation ? screen.mozUnlockOrientation() : screen.msUnlockOrientation && screen.msUnlockOrientation()
            } catch (a) {}
        }
        ], ["navigate", a=>{
            var c = a.type;
            if ("back" === c)
                navigator.app && navigator.app.backHistory ? navigator.app.backHistory() : window.history.back();
            else if ("forward" === c)
                window.history.forward();
            else if ("reload" === c)
                location.reload();
            else if ("url" === c) {
                c = a.url;
                const d = a.target;
                a = a.exportType;
                self.cordova && self.cordova.InAppBrowser ? self.cordova.InAppBrowser.open(c, "_system") : "preview" === a || "windows-webview2" === a ? window.open(c, "_blank") : this.nf || (2 === d ? window.top.location = c : 1 === d ? window.parent.location = c : window.location = c)
            } else
                "new-window" === c && (c = a.url,
                a = a.tag,
                self.cordova && self.cordova.InAppBrowser ? self.cordova.InAppBrowser.open(c, "_system") : window.open(c, a))
        }
        ], ["request-fullscreen", a=>{
            if ("windows-webview2" === this.v || "macos-wkwebview" === this.v)
                self.ia.Lb(!0),
                this.s.Fc({
                    type: "set-fullscreen",
                    fullscreen: !0
                });
            else {
                const c = {
                    navigationUI: "auto"
                };
                a = a.navUI;
                1 === a ? c.navigationUI = "hide" : 2 === a && (c.navigationUI = "show");
                a = document.documentElement;
                let d;
                a.requestFullscreen ? d = a.requestFullscreen(c) : a.mozRequestFullScreen ? d = a.mozRequestFullScreen(c) : a.msRequestFullscreen ? d = a.msRequestFullscreen(c) : a.webkitRequestFullScreen && (d = "undefined" !== typeof Element.ALLOW_KEYBOARD_INPUT ? a.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : a.webkitRequestFullScreen());
                d instanceof Promise && d.catch(lb)
            }
        }
        ], ["exit-fullscreen", ()=>{
            if ("windows-webview2" === this.v || "macos-wkwebview" === this.v)
                self.ia.Lb(!1),
                this.s.Fc({
                    type: "set-fullscreen",
                    fullscreen: !1
                });
            else {
                let a;
                document.exitFullscreen ? a = document.exitFullscreen() : document.mozCancelFullScreen ? a = document.mozCancelFullScreen() : document.msExitFullscreen ? a = document.msExitFullscreen() : document.webkitCancelFullScreen && (a = document.webkitCancelFullScreen());
                a instanceof Promise && a.catch(lb)
            }
        }
        ], ["set-hash", a=>{
            location.hash = a.hash
        }
        ], ["set-document-css-style", a=>{
            const c = a.prop
              , d = a.value;
            var e = a.selector;
            a = a["is-all"];
            try {
                if (e)
                    if (a)
                        var f = Array.from(document.querySelectorAll(e));
                    else {
                        var g = document.querySelector(e);
                        f = g ? [g] : []
                    }
                else
                    f = [document.documentElement];
                e = f;
                for (const h of e)
                    c.startsWith("--") ? h.style.setProperty(c, d) : h.style[c] = d
            } catch (h) {
                console.warn("[Browser] Failed to set style: ", h)
            }
        }
        ], ["get-document-css-style", a=>{
            {
                const d = a.prop;
                a = a.selector;
                try {
                    const e = document.querySelector(a);
                    var c = e ? {
                        isOk: !0,
                        result: window.getComputedStyle(e).getPropertyValue(d)
                    } : {
                        isOk: !1
                    }
                } catch (e) {
                    console.warn("[Browser] Failed to get style: ", e),
                    c = {
                        isOk: !1
                    }
                }
            }
            return c
        }
        ]]);
        window.addEventListener("online", ()=>{
            l(this, "online-state", {
                isOnline: !0
            })
        }
        );
        window.addEventListener("offline", ()=>{
            l(this, "online-state", {
                isOnline: !1
            })
        }
        );
        window.addEventListener("hashchange", ()=>{
            l(this, "hashchange", {
                location: location.toString()
            })
        }
        );
        document.addEventListener("backbutton", ()=>{
            l(this, "backbutton")
        }
        )
    }
    Ac(b) {
        alert(b.message)
    }
    Cc(b) {
        b = b.isFocus;
        if ("nwjs" === this.v) {
            const a = "nwjs" === this.v ? nw.Window.get() : null;
            b ? a.focus() : a.blur()
        } else
            b ? window.focus() : window.blur()
    }
}
);
"use strict";
const ob = 180 / Math.PI;
async function pb(b, a) {
    if (a.isiOSCordova || a.isSafari)
        b.ac = !0;
    b.$c = a.timeScaleMode;
    b.Qd = ["equalpower", "HRTF", "soundfield"][a.panningModel];
    b.zd = ["linear", "inverse", "exponential"][a.distanceModel];
    b.Rd = a.refDistance;
    b.Pd = a.maxDistance;
    b.Td = a.rolloffFactor;
    if (b.s.Qc)
        b.ac = !0,
        b.g = new OfflineAudioContext({
            numberOfChannels: 2,
            sampleRate: 48E3,
            length: Math.ceil(48E3 * b.s.Cd)
        });
    else {
        var c = {
            latencyHint: a.latencyHint
        };
        b.Wd || (c.sampleRate = 48E3);
        if ("undefined" !== typeof AudioContext)
            b.g = new AudioContext(c);
        else if ("undefined" !== typeof webkitAudioContext)
            b.g = new webkitAudioContext(c);
        else
            throw Error("Web Audio API not supported");
        qb(b);
        b.g.onstatechange = ()=>{
            "running" !== b.g.state && qb(b);
            l(b, "audiocontext-state", {
                audioContextState: b.g.state
            })
        }
    }
    b.Sa = b.g.createGain();
    b.Sa.connect(b.g.destination);
    c = a.listenerPos;
    b.aa[0] = c[0];
    b.aa[1] = c[1];
    b.aa[2] = c[2];
    b.g.listener.setPosition(c[0], c[1], c[2]);
    b.g.listener.setOrientation(...b.ea);
    self.C3_GetAudioContextCurrentTime = ()=>b.g.currentTime;
    try {
        await Promise.all(a.preloadList.map(d=>P(b, d.originalUrl, d.url, d.type, !1)))
    } catch (d) {
        console.error("[Construct] Preloading sounds failed: ", d)
    }
    return {
        sampleRate: b.g.sampleRate,
        audioContextState: b.g.state,
        outputLatency: b.g.outputLatency || 0
    }
}
async function rb(b, a) {
    var c = a.originalUrl;
    const d = a.url
      , e = a.type
      , f = a.isMusic
      , g = a.tag
      , h = a.isLooping
      , k = a.vol
      , p = a.pos
      , q = a.panning
      , t = a.stereoPan;
    let y = a.off;
    0 < y && !a.trueClock && (b.g.getOutputTimestamp ? (a = b.g.getOutputTimestamp(),
    y = y - a.performanceTime / 1E3 + a.contextTime) : y = y - performance.now() / 1E3 + b.g.currentTime);
    b.Md = g;
    sb(b, g);
    try {
        b.$ = await tb(b, c, d, e, g, f);
        if (q) {
            Q(b.$, !0);
            var r = b.$
              , B = q.innerAngle
              , pa = q.outerAngle
              , qa = q.outerGain;
            if (r.rb) {
                ub(r, q.x, q.y, q.z, q.angle);
                var E = self.fb.we;
                r.ta[0] !== E(B) && (r.ta[0] = E(B),
                r.F.coneInnerAngle = E(B));
                r.ta[1] !== E(pa) && (r.ta[1] = E(pa),
                r.F.coneOuterAngle = E(pa));
                r.ta[2] !== qa && (r.ta[2] = qa,
                r.F.coneOuterGain = qa)
            }
            q.hasOwnProperty("uid") && (b.$.qa = q.uid)
        } else
            "number" === typeof t && 0 !== t ? (R(b.$, !0),
            vb(b.$, t)) : (Q(b.$, !1),
            R(b.$, !1));
        b.$.Play(h, k, p, y)
    } catch (Gb) {
        console.error("[Construct] Audio: error starting playback: ", Gb);
        return
    } finally {
        c = b.zb.get(g);
        if (!c)
            throw Error("expected pending tag");
        c.cd--;
        0 === c.cd && (c.resolve(),
        b.zb.delete(g))
    }
    v(b)
}
async function wb(b, a) {
    var c = a.tag;
    const d = a.vol
      , e = a.duration;
    a = a.stopOnEnd;
    await xb(b, c);
    for (const q of S(b, c)) {
        c = q;
        var f = d
          , g = e
          , h = a;
        if (!c.Ua) {
            var k = c.G.gain;
            k.cancelScheduledValues(0);
            var p = c.u.g.currentTime;
            g = p + g;
            k.setValueAtTime(k.value, p);
            k.linearRampToValueAtTime(f, g);
            c.La = f;
            c.Ta = g;
            c.Vd = h
        }
    }
    T(b)
}
async function yb(b, a) {
    const c = a.tag;
    a = a.rate;
    await xb(b, c);
    for (const d of S(b, c))
        b = d,
        b.na !== a && (b.na = a,
        b.Fa())
}
async function zb(b, a) {
    const c = a.tag;
    a = a.pos;
    await xb(b, c);
    for (const d of S(b, c))
        d.sc(a)
}
async function Ab(b, a) {
    const c = a.originalUrl
      , d = a.url
      , e = a.type;
    a = a.isMusic;
    try {
        await tb(b, c, d, e, "", a)
    } catch (f) {
        console.error("[Construct] Audio: error preloading: ", f)
    }
}
async function Bb(b, a) {
    if (a = await P(b, "", a.url, a.type, a.isMusic, !0))
        a.j(),
        a = b.la.indexOf(a),
        -1 !== a && b.la.splice(a, 1)
}
async function Cb(b, a) {
    var c = a.type
      , d = a.tag
      , e = a.params;
    if ("filter" === c)
        e = new self.de(b,...e);
    else if ("delay" === c)
        e = new self.be(b,...e);
    else if ("convolution" === c) {
        c = null;
        try {
            c = await P(b, a.bufferOriginalUrl, a.bufferUrl, a.bufferType, !1)
        } catch (g) {
            console.log("[Construct] Audio: error loading convolution: ", g);
            return
        }
        c = e = new self.ae(b,c.ka,...e);
        var f = a.bufferType;
        c.xd = a.bufferOriginalUrl;
        c.yd = f
    } else if ("flanger" === c)
        e = new self.ee(b,...e);
    else if ("phaser" === c)
        e = new self.ge(b,...e);
    else if ("gain" === c)
        e = new self.fe(b,...e);
    else if ("stereopan" === c)
        e = new self.ie(b,...e);
    else if ("tremolo" === c)
        e = new self.je(b,...e);
    else if ("ringmod" === c)
        e = new self.he(b,...e);
    else if ("distortion" === c)
        e = new self.ce(b,...e);
    else if ("compressor" === c)
        e = new self.$d(b,...e);
    else if ("analyser" === c)
        e = new self.Zd(b,...e);
    else
        throw Error("invalid effect type");
    a = e;
    d = d.toLowerCase();
    e = b.ma.get(d);
    e || (e = [],
    b.ma.set(d, e));
    a.Id = e.length;
    a.ga = d;
    e.push(a);
    Db(b, d);
    Eb(b)
}
async function Fb(b, a) {
    const c = a.saveLoadMode;
    if (3 !== c) {
        var d = [];
        for (var e of b.J)
            e.Ca() && 1 === c || !e.Ca() && 2 === c ? d.push(e) : e.j();
        b.J = d
    }
    for (const f of b.ma.values())
        for (const g of f)
            g.j();
    b.ma.clear();
    b.fc = a.timeScale;
    b.Lc = a.gameTime;
    d = a.listenerPos;
    b.aa[0] = d[0];
    b.aa[1] = d[1];
    b.aa[2] = d[2];
    b.g.listener.setPosition(d[0], d[1], d[2]);
    d = a.listenerOrientation;
    if (Array.isArray(d)) {
        for (e = 0; 6 > e; ++e)
            b.ea[e] = d[e];
        b.g.listener.setOrientation(...b.ea)
    }
    b.wa = a.isSilent;
    b.s.Ib(b.wa);
    b.Xb = a.masterVolume;
    b.Sa.gain.value = b.Xb;
    d = [];
    for (const f of Object.values(a.effects))
        d.push(Promise.all(f.map(g=>Cb(b, g))));
    await Promise.all(d);
    await Promise.all(a.playing.map(f=>Hb(b, f, c)));
    T(b)
}
async function Ib(b, a) {
    try {
        const c = b.g.suspend(a.time);
        b.Hd ? b.g.resume() : (b.g.startRendering().then(d=>{
            const e = [];
            for (let f = 0, g = d.numberOfChannels; f < g; ++f) {
                const h = d.getChannelData(f);
                e.push(h.buffer)
            }
            b.s.Gb("runtime", "offline-audio-render-completed", {
                duration: d.duration,
                length: d.length,
                numberOfChannels: d.numberOfChannels,
                sampleRate: d.sampleRate,
                channelData: e
            }, null, e)
        }
        ).catch(d=>Jb(d)),
        b.Hd = !0);
        await c
    } catch (c) {
        Jb(c)
    }
}
function qb(b) {
    b.Rb || (b.Oc = !1,
    window.addEventListener("pointerup", b.Aa, !0),
    window.addEventListener("touchend", b.Aa, !0),
    window.addEventListener("click", b.Aa, !0),
    window.addEventListener("keydown", b.Aa, !0),
    b.Rb = !0)
}
async function P(b, a, c, d, e, f) {
    for (var g of b.la)
        if (g.hb() === c)
            return await Kb(g),
            g;
    if (f)
        return null;
    if (e && (b.ac || b.Fd)) {
        f = 0;
        for (let h = 0, k = b.la.length; h < k; ++h)
            g = b.la[h],
            b.la[f] = g,
            g.Ca() ? g.j() : ++f;
        b.la.length = f
    }
    f = "audio/webm; codecs=opus" === d && !b.Wd;
    e && f && (b.Fd = !0);
    c = !e || b.ac || f ? new self.me(b,a,c,d,e,f) : new self.ke(b,a,c,d,e);
    b.la.push(c);
    await Kb(c);
    b.Od.has(a) || (l(b, "buffer-metadata", {
        originalUrl: a,
        duration: c.ha()
    }),
    b.Od.add(a));
    return c
}
function Lb(b, a) {
    return (a = b.ma.get(a.toLowerCase())) ? a[0].N() : b.oa()
}
function Db(b, a) {
    let c = b.oa();
    var d = b.ma.get(a);
    if (d && d.length) {
        c = d[0].N();
        for (let f = 0, g = d.length; f < g; ++f) {
            var e = d[f];
            f + 1 === g ? e.S(b.oa()) : e.S(d[f + 1].N())
        }
    }
    for (const f of S(b, a))
        d = c,
        e = f.fa || f.F || f.G,
        e.disconnect(),
        e.connect(d);
    b.Ja && b.Vc === a && (b.Ja.disconnect(),
    b.Ja.connect(c))
}
function *S(b, a) {
    if (a)
        for (const c of b.J)
            b = c.ga,
            (b.length !== a.length ? 0 : b === a || b.toLowerCase() === a.toLowerCase()) && (yield c);
    else
        b.$ && !b.$.U() && (yield b.$)
}
function Mb(b, a, c) {
    return c ? b.s.Pe(a).then(d=>{
        const e = b.g.createBuffer(1, d.length, 48E3);
        e.getChannelData(0).set(d);
        return e
    }
    ) : new Promise((d,e)=>{
        b.g.decodeAudioData(a, d, e)
    }
    )
}
function Nb(b, a) {
    let c = 0;
    for (let d = 0, e = b.J.length; d < e; ++d) {
        const f = b.J[d];
        b.J[c] = f;
        f.O === a ? f.j() : ++c
    }
    b.J.length = c
}
async function tb(b, a, c, d, e, f) {
    for (const g of b.J)
        if (g.hb() === c && (g.kc() || f))
            return g.ga = e,
            g;
    a = await P(b, a, c, d, f);
    e = "html5" === a.Gc ? new self.le(a.u,a,e) : new self.ne(a.u,a,e);
    b.J.push(e);
    return e
}
function sb(b, a) {
    let c = b.zb.get(a);
    if (!c) {
        let d = null;
        c = {
            cd: 0,
            promise: new Promise(e=>d = e),
            resolve: d
        };
        b.zb.set(a, c)
    }
    c.cd++
}
function xb(b, a) {
    a || (a = b.Md);
    return (b = b.zb.get(a)) ? b.promise : Promise.resolve()
}
function T(b) {
    if (0 < b.Ra.size)
        v(b);
    else
        for (const a of b.J)
            if (!a.I && !a.U()) {
                v(b);
                break
            }
}
function Ob(b, a, c, d) {
    l(b, "trigger", {
        type: a,
        tag: c,
        aiid: d
    })
}
function Eb(b) {
    b.Rc || (b.Rc = !0,
    Promise.resolve().then(()=>Pb(b)))
}
function Pb(b) {
    const a = {};
    for (const [c,d] of b.ma)
        a[c] = d.map(e=>e.gb());
    l(b, "fxstate", {
        fxstate: a
    });
    b.Rc = !1
}
async function Hb(b, a, c) {
    if (3 !== c) {
        var d = a.bufferOriginalUrl
          , e = a.bufferUrl
          , f = a.bufferType
          , g = a.isMusic
          , h = a.tag
          , k = a.isLooping
          , p = a.volume
          , q = a.playbackTime;
        if (!g || 1 !== c)
            if (g || 2 !== c) {
                c = null;
                try {
                    c = await tb(b, d, e, f, h, g)
                } catch (t) {
                    console.error("[Construct] Audio: error loading audio state: ", t);
                    return
                }
                b = c;
                (d = a.pan) ? (Q(b, !0),
                e = b.F,
                f = d.pos,
                b.Ya[0] = f[0],
                b.Ya[1] = f[1],
                b.Ya[2] = f[2],
                f = d.orient,
                b.Xa[0] = f[0],
                b.Xa[1] = f[1],
                b.Xa[2] = f[2],
                e.setPosition(...b.Ya),
                e.setOrientation(...b.Xa),
                b.ta[0] = d.cia,
                b.ta[1] = d.coa,
                b.ta[2] = d.cog,
                e.coneInnerAngle = d.cia,
                e.coneOuterAngle = d.coa,
                e.coneOuterGain = d.cog,
                b.qa = d.uid) : Q(b, !1);
                b = c;
                d = a.stereoPan;
                "number" !== typeof d ? R(b, !1) : (R(b, !0),
                vb(b, d));
                c.Play(k, p, q, 0);
                a.isPlaying || c.jb();
                c.zc(a)
            }
    }
}
function Jb(b) {
    console.error("[Audio] Offline rendering error: ", b)
}
self.fb = class extends self.Ma {
    constructor(b) {
        super(b, "audio");
        this.Sa = this.g = null;
        this.Rb = this.Oc = !1;
        this.Aa = ()=>{
            if (!this.Oc) {
                var a = this.g;
                "suspended" === a.state && a.resume && a.resume();
                var c = a.createBuffer(1, 220, 22050)
                  , d = a.createBufferSource();
                d.buffer = c;
                d.connect(a.destination);
                d.start(0);
                "running" === a.state && this.Rb && (this.Oc = !0,
                window.removeEventListener("pointerup", this.Aa, !0),
                window.removeEventListener("touchend", this.Aa, !0),
                window.removeEventListener("click", this.Aa, !0),
                window.removeEventListener("keydown", this.Aa, !0),
                this.Rb = !1)
            }
        }
        ;
        this.la = [];
        this.J = [];
        this.$ = null;
        this.Md = "";
        this.Od = new Set;
        this.Nd = -1;
        this.zb = new Map;
        this.Xb = 1;
        this.wa = !1;
        this.$c = 0;
        this.fc = 1;
        this.Lc = 0;
        this.Qd = "HRTF";
        this.zd = "inverse";
        this.Rd = 600;
        this.Pd = 1E4;
        this.Td = 1;
        this.aa = [0, 0, 0];
        this.ea = [0, 0, -1, 0, 1, 0];
        this.Fd = this.ac = !1;
        this.Wd = this.s.re();
        this.ma = new Map;
        this.Ra = new Set;
        this.Hd = this.Rc = !1;
        this.Vc = "";
        this.Ja = null;
        self.C3Audio_OnMicrophoneStream = (a,c)=>{
            this.Ja && this.Ja.disconnect();
            this.Vc = c.toLowerCase();
            this.Ja = this.g.createMediaStreamSource(a);
            this.Ja.connect(Lb(this, this.Vc))
        }
        ;
        this.Pb = null;
        self.C3Audio_GetOutputStream = ()=>{
            this.Pb || (this.Pb = this.g.createMediaStreamDestination(),
            this.Sa.connect(this.Pb));
            return this.Pb.stream
        }
        ;
        self.C3Audio_DOMInterface = this;
        u(this, [["create-audio-context", a=>pb(this, a)], ["play", a=>rb(this, a)], ["stop", a=>{
            a = a.tag;
            for (const c of S(this, a))
                c.Da()
        }
        ], ["stop-all", ()=>{
            for (const a of this.J)
                a.Da()
        }
        ], ["set-paused", a=>{
            const c = a.tag;
            a = a.paused;
            for (const d of S(this, c))
                a ? d.jb() : d.Hb();
            T(this)
        }
        ], ["set-volume", a=>{
            const c = a.tag;
            a = a.vol;
            for (const d of S(this, c))
                U(d, a)
        }
        ], ["fade-volume", a=>wb(this, a)], ["set-master-volume", a=>{
            this.Xb = a.vol;
            this.Sa.gain.value = this.Xb
        }
        ], ["set-muted", a=>{
            const c = a.tag;
            a = a.isMuted;
            for (const d of S(this, c))
                Qb(d, a)
        }
        ], ["set-silent", a=>{
            this.wa = a.isSilent;
            this.s.Ib(this.wa);
            for (const c of this.J)
                c.Mb()
        }
        ], ["set-looping", a=>{
            const c = a.tag;
            a = a.isLooping;
            for (const d of S(this, c))
                d.tc(a)
        }
        ], ["set-playback-rate", a=>yb(this, a)], ["set-stereo-pan", a=>{
            const c = a.tag;
            a = a.p;
            for (const d of S(this, c))
                R(d, !0),
                vb(d, a)
        }
        ], ["seek", a=>zb(this, a)], ["preload", a=>Ab(this, a)], ["unload", a=>Bb(this, a)], ["unload-all", ()=>{
            for (const a of this.la)
                a.j();
            this.la.length = 0
        }
        ], ["set-suspended", a=>{
            a = a.isSuspended;
            !a && this.g.resume && this.g.resume();
            for (const c of this.J)
                c.uc(a);
            a && this.g.suspend && this.g.suspend()
        }
        ], ["add-effect", a=>Cb(this, a)], ["set-effect-param", a=>{
            const c = a.index
              , d = a.param
              , e = a.value
              , f = a.ramp
              , g = a.time;
            a = this.ma.get(a.tag);
            !a || 0 > c || c >= a.length || (a[c].Y(d, e, f, g),
            Eb(this))
        }
        ], ["remove-effects", a=>{
            a = a.tag.toLowerCase();
            const c = this.ma.get(a);
            if (c && c.length) {
                for (const d of c)
                    d.j();
                this.ma.delete(a);
                Db(this, a)
            }
        }
        ], ["tick", a=>{
            this.fc = a.timeScale;
            this.Lc = a.gameTime;
            this.Nd = a.tickCount;
            if (0 !== this.$c)
                for (var c of this.J)
                    c.Fa();
            !(c = a.listenerPos) || this.aa[0] === c[0] && this.aa[1] === c[1] && this.aa[2] === c[2] || (this.aa[0] = c[0],
            this.aa[1] = c[1],
            this.aa[2] = c[2],
            this.g.listener.setPosition(c[0], c[1], c[2]));
            if ((c = a.listenerOrientation) && (this.ea[0] !== c[0] || this.ea[1] !== c[1] || this.ea[2] !== c[2] || this.ea[3] !== c[3] || this.ea[4] !== c[4] || this.ea[5] !== c[5])) {
                for (let d = 0; 6 > d; ++d)
                    this.ea[d] = c[d];
                this.g.listener.setOrientation(...this.ea)
            }
            for (const d of a.instPans) {
                a = d.uid;
                for (const e of this.J)
                    e.qa === a && ub(e, d.x, d.y, d.z, d.angle)
            }
        }
        ], ["load-state", a=>Fb(this, a)], ["offline-render-audio", a=>Ib(this, a)], ["offline-render-finish", ()=>{
            this.g.resume()
        }
        ]])
    }
    V() {
        return this.g
    }
    oa() {
        return this.Sa
    }
    Fb() {
        return this.wa
    }
    Ea(b) {
        this.s.Ea(b)
    }
    Oa(b) {
        this.s.Oa(b)
    }
    Pa() {
        for (var b of this.Ra)
            b.Pa();
        b = this.g.currentTime;
        for (var a of this.J)
            a.Pa(b);
        a = this.J.filter(c=>!c.I && !c.U()).map(c=>c.gb());
        l(this, "state", {
            tickCount: this.Nd,
            outputLatency: this.g.outputLatency || 0,
            audioInstances: a,
            analysers: [...this.Ra].map(c=>({
                tag: c.ga,
                index: c.Id,
                peak: c.Za,
                rms: c.Sd,
                binCount: c.l.frequencyBinCount,
                freqBins: c.Ed
            }))
        });
        0 === a.length && 0 === this.Ra.size && this.Sb && (this.s.Oe(this.Xd),
        this.Sb = !1)
    }
    static we(b) {
        return b * ob
    }
    static jd(b) {
        return Math.max(Math.min(Math.pow(10, b / 20), 1), 0)
    }
    static ue(b) {
        return Math.log(Math.max(Math.min(b, 1), 0)) / Math.log(10) * 20
    }
}
;
self.ia.Ba(self.fb);
"use strict";
function Kb(b) {
    b.Ia || (b.Ia = b.yc());
    return b.Ia
}
self.ed = class {
    constructor(b, a, c, d, e) {
        this.u = b;
        this.Ve = a;
        this.Ka = c;
        this.R = d;
        this.Se = e;
        this.Gc = "";
        this.Ia = null
    }
    j() {
        this.Ia = this.u = null
    }
    yc() {}
    V() {
        return this.u.V()
    }
    oc() {
        return this.Ve
    }
    hb() {
        return this.Ka
    }
    nc() {
        return this.R
    }
    Ca() {
        return this.Se
    }
    ha() {}
}
;
"use strict";
self.ke = class extends self.ed {
    constructor(b, a, c, d, e) {
        super(b, a, c, d, e);
        this.Gc = "html5";
        this.M = new Audio;
        this.M.crossOrigin = "anonymous";
        this.M.autoplay = !1;
        this.M.preload = "auto";
        this.ub = this.ra = null;
        this.M.addEventListener("canplaythrough", ()=>!0);
        this.yb = this.V().createGain();
        this.wb = null;
        this.M.addEventListener("canplay", ()=>{
            this.ra && (this.ra(),
            this.ub = this.ra = null);
            !this.wb && this.M && (this.wb = this.V().createMediaElementSource(this.M),
            this.wb.connect(this.yb))
        }
        );
        this.onended = null;
        this.M.addEventListener("ended", ()=>{
            if (this.onended)
                this.onended()
        }
        );
        this.M.addEventListener("error", f=>{
            console.error(`[Construct] Audio '${this.Ka}' error: `, f);
            this.ub && (this.ub(f),
            this.ub = this.ra = null)
        }
        )
    }
    j() {
        Nb(this.u, this);
        this.yb.disconnect();
        this.yb = null;
        this.wb.disconnect();
        this.wb = null;
        this.M && !this.M.paused && this.M.pause();
        this.M = this.onended = null;
        super.j()
    }
    yc() {
        return new Promise((b,a)=>{
            this.ra = b;
            this.ub = a;
            this.M.src = this.Ka
        }
        )
    }
    T() {
        return this.M
    }
    ha() {
        return this.M.duration
    }
}
;
"use strict";
async function Rb(b) {
    if (b.Ga)
        return b.Ga;
    var a = b.u.s;
    if ("cordova" === a.v && a.md(b.Ka) && a.Ub)
        b.Ga = await a.Eb(b.Ka);
    else {
        a = await fetch(b.Ka);
        if (!a.ok)
            throw Error(`error fetching audio data: ${a.status} ${a.statusText}`);
        b.Ga = await a.arrayBuffer()
    }
}
async function Sb(b) {
    if (b.ka)
        return b.ka;
    b.ka = await Mb(b.u, b.Ga, b.Ue);
    b.Ga = null
}
self.me = class extends self.ed {
    constructor(b, a, c, d, e, f) {
        super(b, a, c, d, e);
        this.Gc = "webaudio";
        this.ka = this.Ga = null;
        this.Ue = !!f
    }
    j() {
        Nb(this.u, this);
        this.ka = this.Ga = null;
        super.j()
    }
    async yc() {
        try {
            await Rb(this),
            await Sb(this)
        } catch (b) {
            console.error(`[Construct] Failed to load audio '${this.Ka}': `, b)
        }
    }
    ha() {
        return this.ka ? this.ka.duration : 0
    }
}
;
"use strict";
let Tb = 0;
function Q(b, a) {
    a = !!a;
    b.rb !== a && (b.rb = a,
    b.rb ? (R(b, !1),
    b.F || (b.F = b.V().createPanner(),
    b.F.panningModel = b.u.Qd,
    b.F.distanceModel = b.u.zd,
    b.F.refDistance = b.u.Rd,
    b.F.maxDistance = b.u.Pd,
    b.F.rolloffFactor = b.u.Td),
    b.G.disconnect(),
    b.G.connect(b.F),
    b.F.connect(b.oa())) : (b.F.disconnect(),
    b.G.disconnect(),
    b.G.connect(b.oa())))
}
function R(b, a) {
    a = !!a;
    b.Vb !== a && (b.Vb = a,
    b.Vb ? (Q(b, !1),
    b.fa = b.V().createStereoPanner(),
    b.G.disconnect(),
    b.G.connect(b.fa),
    b.fa.connect(b.oa())) : (b.fa.disconnect(),
    b.fa = null,
    b.G.disconnect(),
    b.G.connect(b.oa())))
}
function vb(b, a) {
    b.Vb && b.Yc !== a && (b.fa.pan.value = a,
    b.Yc = a)
}
function U(b, a) {
    b.La = a;
    b.G.gain.cancelScheduledValues(0);
    b.Ta = -1;
    b.G.gain.value = b.pc()
}
function Qb(b, a) {
    a = !!a;
    b.Ua !== a && (b.Ua = a,
    b.Mb())
}
function ub(b, a, c, d, e) {
    if (b.rb) {
        var f = b.Ya
          , g = b.Xa
          , h = Math.cos(e);
        e = Math.sin(e);
        if (f[0] !== a || f[1] !== c || f[2] !== d)
            f[0] = a,
            f[1] = c,
            f[2] = d,
            b.F.setPosition(...f);
        if (g[0] !== h || g[1] !== e || 0 !== g[2])
            g[0] = h,
            g[1] = e,
            g[2] = 0,
            b.F.setOrientation(...g)
    }
}
function V(b) {
    return b.Sc ? b.u.Lc : performance.now() / 1E3
}
self.fd = class {
    constructor(b, a, c) {
        this.u = b;
        this.O = a;
        this.ga = c;
        this.Nb = Tb++;
        this.G = this.V().createGain();
        this.G.connect(this.oa());
        this.F = null;
        this.rb = !1;
        this.Ya = [0, 0, 0];
        this.Xa = [0, 0, 0];
        this.ta = [0, 0, 0];
        this.fa = null;
        this.Vb = !1;
        this.Yc = 0;
        this.I = !0;
        this.X = this.ua = this.K = !1;
        this.La = 1;
        this.Ua = !1;
        this.na = 1;
        b = this.u.$c;
        this.Sc = 1 === b && !this.Ca() || 2 === b;
        this.Ta = this.qa = -1;
        this.Vd = !1
    }
    j() {
        this.O = this.u = null;
        this.F && (this.F.disconnect(),
        this.F = null);
        this.fa && (this.fa.disconnect(),
        this.fa = null);
        this.G.disconnect();
        this.G = null
    }
    V() {
        return this.u.V()
    }
    oa() {
        return Lb(this.u, this.ga)
    }
    oc() {
        return this.O.oc()
    }
    hb() {
        return this.O.hb()
    }
    nc() {
        return this.O.nc()
    }
    Ca() {
        return this.O.Ca()
    }
    U() {}
    kc() {}
    IsPlaying() {
        return !this.I && !this.K && !this.U()
    }
    Na() {}
    ha() {
        return this.O.ha()
    }
    Play() {}
    Da() {}
    jb() {}
    Hb() {}
    Pa(b) {
        -1 !== this.Ta && b >= this.Ta && (this.Ta = -1,
        this.Vd && this.Da(),
        Ob(this.u, "fade-ended", this.ga, this.Nb))
    }
    pc() {
        const b = this.La;
        return isFinite(b) ? b : 0
    }
    Fb() {
        return this.u.Fb()
    }
    Mb() {}
    tc() {}
    Fa() {}
    sc() {}
    uc() {}
    qc() {}
    gb() {
        var b = this.Nb
          , a = this.ga
          , c = this.ha()
          , d = -1 === this.Ta ? this.La : this.G.gain.value
          , e = this.IsPlaying();
        if (this.F) {
            var f = this.F;
            f = {
                pos: this.Ya,
                orient: this.Xa,
                cia: f.coneInnerAngle,
                coa: f.coneOuterAngle,
                cog: f.coneOuterGain,
                uid: this.qa
            }
        } else
            f = null;
        return {
            aiid: b,
            tag: a,
            duration: c,
            volume: d,
            isPlaying: e,
            playbackTime: this.Na(),
            playbackRate: this.na,
            uid: this.qa,
            bufferOriginalUrl: this.oc(),
            bufferUrl: "",
            bufferType: this.nc(),
            isMusic: this.Ca(),
            isLooping: this.X,
            isMuted: this.Ua,
            resumePosition: this.qc(),
            pan: f,
            stereoPan: this.fa ? this.Yc : null
        }
    }
    zc(b) {
        var a = b.playbackRate;
        this.na !== a && (this.na = a,
        this.Fa());
        Qb(this, b.isMuted)
    }
}
;
"use strict";
self.le = class extends self.fd {
    constructor(b, a, c) {
        super(b, a, c);
        this.O.yb.connect(this.G);
        this.O.onended = ()=>this.Bc()
    }
    j() {
        this.Da();
        this.O.yb.disconnect();
        super.j()
    }
    T() {
        return this.O.T()
    }
    Bc() {
        this.I = !0;
        this.qa = -1;
        Ob(this.u, "ended", this.ga, this.Nb)
    }
    U() {
        return this.T().ended
    }
    kc() {
        return this.I ? !0 : this.U()
    }
    Na() {
        let b = this.T().currentTime;
        this.X || (b = Math.min(b, this.ha()));
        return b
    }
    Play(b, a, c) {
        const d = this.T();
        1 !== d.playbackRate && (d.playbackRate = 1);
        d.loop !== b && (d.loop = b);
        U(this, a);
        d.muted && (d.muted = !1);
        if (d.currentTime !== c)
            try {
                d.currentTime = c
            } catch (e) {
                console.warn(`[Construct] Exception seeking audio '${this.O.hb()}' to position '${c}': `, e)
            }
        this.u.Ea(d);
        this.K = this.I = !1;
        this.X = b;
        this.na = 1
    }
    Da() {
        const b = this.T();
        b.paused || b.pause();
        this.u.Oa(b);
        this.I = !0;
        this.K = !1;
        this.qa = -1
    }
    jb() {
        if (!(this.K || this.I || this.U())) {
            var b = this.T();
            b.paused || b.pause();
            this.u.Oa(b);
            this.K = !0
        }
    }
    Hb() {
        !this.K || this.I || this.U() || (this.u.Ea(this.T()),
        this.K = !1)
    }
    Mb() {
        this.T().muted = this.Ua || this.Fb()
    }
    tc(b) {
        b = !!b;
        this.X !== b && (this.X = b,
        this.T().loop = b)
    }
    Fa() {
        let b = this.na;
        this.Sc && (b *= this.u.fc);
        try {
            this.T().playbackRate = b
        } catch (a) {
            console.warn(`[Construct] Unable to set playback rate '${b}':`, a)
        }
    }
    sc(b) {
        if (!this.I && !this.U())
            try {
                this.T().currentTime = b
            } catch (a) {
                console.warn(`[Construct] Error seeking audio to '${b}': `, a)
            }
    }
    qc() {
        return this.Na()
    }
    uc(b) {
        b ? this.IsPlaying() ? (this.T().pause(),
        this.ua = !0) : this.ua = !1 : this.ua && (this.u.Ea(this.T()),
        this.ua = !1)
    }
}
;
"use strict";
function W(b) {
    b.o && b.o.disconnect();
    b.o = null;
    b.kb = null
}
self.ne = class extends self.fd {
    constructor(b, a, c) {
        super(b, a, c);
        this.o = null;
        this.Zb = d=>this.Bc(d);
        this.Nc = !0;
        this.kb = null;
        this.P = this.$b = this.bc = 0;
        this.Wc = 1
    }
    j() {
        this.Da();
        W(this);
        this.Zb = null;
        super.j()
    }
    Bc(b) {
        this.K || this.ua || b.target !== this.kb || (this.I = this.Nc = !0,
        this.qa = -1,
        W(this),
        Ob(this.u, "ended", this.ga, this.Nb))
    }
    U() {
        return !this.I && this.o && this.o.loop || this.K ? !1 : this.Nc
    }
    kc() {
        return !this.o || this.I ? !0 : this.U()
    }
    Na() {
        let b;
        b = this.K ? this.P : this.$b + (V(this) - this.bc) * this.na;
        this.X || (b = Math.min(b, this.ha()));
        return b
    }
    Play(b, a, c, d) {
        this.Wc = 1;
        U(this, a);
        W(this);
        this.o = this.V().createBufferSource();
        this.o.buffer = this.O.ka;
        this.o.connect(this.G);
        this.kb = this.o;
        this.o.onended = this.Zb;
        this.o.loop = b;
        this.o.start(d, c);
        this.K = this.I = this.Nc = !1;
        this.X = b;
        this.na = 1;
        this.bc = V(this);
        this.$b = c
    }
    Da() {
        if (this.o)
            try {
                this.o.stop(0)
            } catch (b) {}
        this.I = !0;
        this.K = !1;
        this.qa = -1
    }
    jb() {
        this.K || this.I || this.U() || (this.P = this.Na(),
        this.X && (this.P %= this.ha()),
        this.K = !0,
        this.o.stop(0))
    }
    Hb() {
        !this.K || this.I || this.U() || (W(this),
        this.o = this.V().createBufferSource(),
        this.o.buffer = this.O.ka,
        this.o.connect(this.G),
        this.kb = this.o,
        this.o.onended = this.Zb,
        this.o.loop = this.X,
        U(this, this.La),
        this.Fa(),
        this.o.start(0, this.P),
        this.bc = V(this),
        this.$b = this.P,
        this.K = !1)
    }
    pc() {
        return super.pc() * this.Wc
    }
    Mb() {
        this.Wc = this.Ua || this.Fb() ? 0 : 1;
        U(this, this.La)
    }
    tc(b) {
        b = !!b;
        this.X !== b && (this.X = b,
        this.o && (this.o.loop = b))
    }
    Fa() {
        let b = this.na;
        this.Sc && (b *= this.u.fc);
        this.o && (this.o.playbackRate.value = b)
    }
    sc(b) {
        this.I || this.U() || (this.K ? this.P = b : (this.jb(),
        this.P = b,
        this.Hb()))
    }
    qc() {
        return this.P
    }
    uc(b) {
        b ? this.IsPlaying() ? (this.ua = !0,
        this.P = this.Na(),
        this.X && (this.P %= this.ha()),
        this.o.stop(0)) : this.ua = !1 : this.ua && (W(this),
        this.o = this.V().createBufferSource(),
        this.o.buffer = this.O.ka,
        this.o.connect(this.G),
        this.kb = this.o,
        this.o.onended = this.Zb,
        this.o.loop = this.X,
        U(this, this.La),
        this.Fa(),
        this.o.start(0, this.P),
        this.bc = V(this),
        this.$b = this.P,
        this.ua = !1)
    }
    zc(b) {
        super.zc(b);
        this.P = b.resumePosition
    }
}
;
"use strict";
function X(b) {
    return b.g.createGain()
}
function Y(b, a, c, d, e) {
    a.cancelScheduledValues(0);
    if (0 === e)
        a.value = c;
    else
        switch (b = b.g.currentTime,
        e += b,
        d) {
        case 0:
            a.setValueAtTime(c, e);
            break;
        case 1:
            a.setValueAtTime(a.value, b);
            a.linearRampToValueAtTime(c, e);
            break;
        case 2:
            a.setValueAtTime(a.value, b),
            a.exponentialRampToValueAtTime(c, e)
        }
}
class Z {
    constructor(b) {
        this.u = b;
        this.g = b.V();
        this.Id = -1;
        this.R = this.ga = "";
        this.m = null
    }
    j() {
        this.g = null
    }
    N() {}
    S() {}
    gb() {
        return {
            type: this.R,
            tag: this.ga,
            params: this.m
        }
    }
}
self.de = class extends Z {
    constructor(b, a, c, d, e, f, g) {
        super(b);
        this.R = "filter";
        this.m = [a, c, d, e, f, g];
        this.A = X(this);
        this.i = X(this);
        this.i.gain.value = g;
        this.h = X(this);
        this.h.gain.value = 1 - g;
        this.D = this.g.createBiquadFilter();
        this.D.type = a;
        this.D.frequency.value = c;
        this.D.detune.value = d;
        this.D.Q.value = e;
        this.D.gain.vlaue = f;
        this.A.connect(this.D);
        this.A.connect(this.h);
        this.D.connect(this.i)
    }
    j() {
        this.A.disconnect();
        this.D.disconnect();
        this.i.disconnect();
        this.h.disconnect();
        super.j()
    }
    S(b) {
        this.i.disconnect();
        this.i.connect(b);
        this.h.disconnect();
        this.h.connect(b)
    }
    N() {
        return this.A
    }
    Y(b, a, c, d) {
        switch (b) {
        case 0:
            a = Math.max(Math.min(a / 100, 1), 0);
            this.m[5] = a;
            Y(this, this.i.gain, a, c, d);
            Y(this, this.h.gain, 1 - a, c, d);
            break;
        case 1:
            this.m[1] = a;
            Y(this, this.D.frequency, a, c, d);
            break;
        case 2:
            this.m[2] = a;
            Y(this, this.D.detune, a, c, d);
            break;
        case 3:
            this.m[3] = a;
            Y(this, this.D.Q, a, c, d);
            break;
        case 4:
            this.m[4] = a,
            Y(this, this.D.gain, a, c, d)
        }
    }
}
;
self.be = class extends Z {
    constructor(b, a, c, d) {
        super(b);
        this.R = "delay";
        this.m = [a, c, d];
        this.A = X(this);
        this.i = X(this);
        this.i.gain.value = d;
        this.h = X(this);
        this.h.gain.value = 1 - d;
        this.vb = X(this);
        this.W = this.g.createDelay(a);
        this.W.delayTime.value = a;
        this.ob = X(this);
        this.ob.gain.value = c;
        this.A.connect(this.vb);
        this.A.connect(this.h);
        this.vb.connect(this.i);
        this.vb.connect(this.W);
        this.W.connect(this.ob);
        this.ob.connect(this.vb)
    }
    j() {
        this.A.disconnect();
        this.i.disconnect();
        this.h.disconnect();
        this.vb.disconnect();
        this.W.disconnect();
        this.ob.disconnect();
        super.j()
    }
    S(b) {
        this.i.disconnect();
        this.i.connect(b);
        this.h.disconnect();
        this.h.connect(b)
    }
    N() {
        return this.A
    }
    Y(b, a, c, d) {
        const e = self.fb.jd;
        switch (b) {
        case 0:
            a = Math.max(Math.min(a / 100, 1), 0);
            this.m[2] = a;
            Y(this, this.i.gain, a, c, d);
            Y(this, this.h.gain, 1 - a, c, d);
            break;
        case 4:
            this.m[1] = e(a);
            Y(this, this.ob.gain, e(a), c, d);
            break;
        case 5:
            this.m[0] = a,
            Y(this, this.W.delayTime, a, c, d)
        }
    }
}
;
self.ae = class extends Z {
    constructor(b, a, c, d) {
        super(b);
        this.R = "convolution";
        this.m = [c, d];
        this.yd = this.xd = "";
        this.A = X(this);
        this.i = X(this);
        this.i.gain.value = d;
        this.h = X(this);
        this.h.gain.value = 1 - d;
        this.nb = this.g.createConvolver();
        this.nb.normalize = c;
        this.nb.buffer = a;
        this.A.connect(this.nb);
        this.A.connect(this.h);
        this.nb.connect(this.i)
    }
    j() {
        this.A.disconnect();
        this.nb.disconnect();
        this.i.disconnect();
        this.h.disconnect();
        super.j()
    }
    S(b) {
        this.i.disconnect();
        this.i.connect(b);
        this.h.disconnect();
        this.h.connect(b)
    }
    N() {
        return this.A
    }
    Y(b, a, c, d) {
        switch (b) {
        case 0:
            a = Math.max(Math.min(a / 100, 1), 0),
            this.m[1] = a,
            Y(this, this.i.gain, a, c, d),
            Y(this, this.h.gain, 1 - a, c, d)
        }
    }
    gb() {
        const b = super.gb();
        b.bufferOriginalUrl = this.xd;
        b.bufferUrl = "";
        b.bufferType = this.yd;
        return b
    }
}
;
self.ee = class extends Z {
    constructor(b, a, c, d, e, f) {
        super(b);
        this.R = "flanger";
        this.m = [a, c, d, e, f];
        this.A = X(this);
        this.h = X(this);
        this.h.gain.value = 1 - f / 2;
        this.i = X(this);
        this.i.gain.value = f / 2;
        this.qb = X(this);
        this.qb.gain.value = e;
        this.W = this.g.createDelay(a + c);
        this.W.delayTime.value = a;
        this.B = this.g.createOscillator();
        this.B.frequency.value = d;
        this.L = X(this);
        this.L.gain.value = c;
        this.A.connect(this.W);
        this.A.connect(this.h);
        this.W.connect(this.i);
        this.W.connect(this.qb);
        this.qb.connect(this.W);
        this.B.connect(this.L);
        this.L.connect(this.W.delayTime);
        this.B.start(0)
    }
    j() {
        this.B.stop(0);
        this.A.disconnect();
        this.W.disconnect();
        this.B.disconnect();
        this.L.disconnect();
        this.h.disconnect();
        this.i.disconnect();
        this.qb.disconnect();
        super.j()
    }
    S(b) {
        this.i.disconnect();
        this.i.connect(b);
        this.h.disconnect();
        this.h.connect(b)
    }
    N() {
        return this.A
    }
    Y(b, a, c, d) {
        switch (b) {
        case 0:
            a = Math.max(Math.min(a / 100, 1), 0);
            this.m[4] = a;
            Y(this, this.i.gain, a / 2, c, d);
            Y(this, this.h.gain, 1 - a / 2, c, d);
            break;
        case 6:
            this.m[1] = a / 1E3;
            Y(this, this.L.gain, a / 1E3, c, d);
            break;
        case 7:
            this.m[2] = a;
            Y(this, this.B.frequency, a, c, d);
            break;
        case 8:
            this.m[3] = a / 100,
            Y(this, this.qb.gain, a / 100, c, d)
        }
    }
}
;
self.ge = class extends Z {
    constructor(b, a, c, d, e, f, g) {
        super(b);
        this.R = "phaser";
        this.m = [a, c, d, e, f, g];
        this.A = X(this);
        this.h = X(this);
        this.h.gain.value = 1 - g / 2;
        this.i = X(this);
        this.i.gain.value = g / 2;
        this.D = this.g.createBiquadFilter();
        this.D.type = "allpass";
        this.D.frequency.value = a;
        this.D.detune.value = c;
        this.D.Q.value = d;
        this.B = this.g.createOscillator();
        this.B.frequency.value = f;
        this.L = X(this);
        this.L.gain.value = e;
        this.A.connect(this.D);
        this.A.connect(this.h);
        this.D.connect(this.i);
        this.B.connect(this.L);
        this.L.connect(this.D.frequency);
        this.B.start(0)
    }
    j() {
        this.B.stop(0);
        this.A.disconnect();
        this.D.disconnect();
        this.B.disconnect();
        this.L.disconnect();
        this.h.disconnect();
        this.i.disconnect();
        super.j()
    }
    S(b) {
        this.i.disconnect();
        this.i.connect(b);
        this.h.disconnect();
        this.h.connect(b)
    }
    N() {
        return this.A
    }
    Y(b, a, c, d) {
        switch (b) {
        case 0:
            a = Math.max(Math.min(a / 100, 1), 0);
            this.m[5] = a;
            Y(this, this.i.gain, a / 2, c, d);
            Y(this, this.h.gain, 1 - a / 2, c, d);
            break;
        case 1:
            this.m[0] = a;
            Y(this, this.D.frequency, a, c, d);
            break;
        case 2:
            this.m[1] = a;
            Y(this, this.D.detune, a, c, d);
            break;
        case 3:
            this.m[2] = a;
            Y(this, this.D.Q, a, c, d);
            break;
        case 6:
            this.m[3] = a;
            Y(this, this.L.gain, a, c, d);
            break;
        case 7:
            this.m[4] = a,
            Y(this, this.B.frequency, a, c, d)
        }
    }
}
;
self.fe = class extends Z {
    constructor(b, a) {
        super(b);
        this.R = "gain";
        this.m = [a];
        this.l = X(this);
        this.l.gain.value = a
    }
    j() {
        this.l.disconnect();
        super.j()
    }
    S(b) {
        this.l.disconnect();
        this.l.connect(b)
    }
    N() {
        return this.l
    }
    Y(b, a, c, d) {
        const e = self.fb.jd;
        switch (b) {
        case 4:
            this.m[0] = e(a),
            Y(this, this.l.gain, e(a), c, d)
        }
    }
}
;
self.ie = class extends Z {
    constructor(b, a) {
        super(b);
        this.R = "stereopan";
        this.m = [a];
        this.l = this.g.createStereoPanner();
        this.l.pan.value = a
    }
    j() {
        this.l.disconnect();
        super.j()
    }
    S(b) {
        this.l.disconnect();
        this.l.connect(b)
    }
    N() {
        return this.l
    }
    Y(b, a, c, d) {
        a = Math.min(Math.max(a / 100, -1), 1);
        switch (b) {
        case 9:
            this.m[0] = a,
            Y(this, this.l.pan, a, c, d)
        }
    }
}
;
self.je = class extends Z {
    constructor(b, a, c) {
        super(b);
        this.R = "tremolo";
        this.m = [a, c];
        this.l = X(this);
        this.l.gain.value = 1 - c / 2;
        this.B = this.g.createOscillator();
        this.B.frequency.value = a;
        this.L = X(this);
        this.L.gain.value = c / 2;
        this.B.connect(this.L);
        this.L.connect(this.l.gain);
        this.B.start(0)
    }
    j() {
        this.B.stop(0);
        this.B.disconnect();
        this.L.disconnect();
        this.l.disconnect();
        super.j()
    }
    S(b) {
        this.l.disconnect();
        this.l.connect(b)
    }
    N() {
        return this.l
    }
    Y(b, a, c, d) {
        switch (b) {
        case 0:
            a = Math.max(Math.min(a / 100, 1), 0);
            this.m[1] = a;
            Y(this, this.l.gain, 1 - a / 2, c, d);
            Y(this, this.L.gain, a / 2, c, d);
            break;
        case 7:
            this.m[0] = a,
            Y(this, this.B.frequency, a, c, d)
        }
    }
}
;
self.he = class extends Z {
    constructor(b, a, c) {
        super(b);
        this.R = "ringmod";
        this.m = [a, c];
        this.A = X(this);
        this.i = X(this);
        this.i.gain.value = c;
        this.h = X(this);
        this.h.gain.value = 1 - c;
        this.Ab = X(this);
        this.Ab.gain.value = 0;
        this.B = this.g.createOscillator();
        this.B.frequency.value = a;
        this.B.connect(this.Ab.gain);
        this.B.start(0);
        this.A.connect(this.Ab);
        this.A.connect(this.h);
        this.Ab.connect(this.i)
    }
    j() {
        this.B.stop(0);
        this.B.disconnect();
        this.Ab.disconnect();
        this.A.disconnect();
        this.i.disconnect();
        this.h.disconnect();
        super.j()
    }
    S(b) {
        this.i.disconnect();
        this.i.connect(b);
        this.h.disconnect();
        this.h.connect(b)
    }
    N() {
        return this.A
    }
    Y(b, a, c, d) {
        switch (b) {
        case 0:
            a = Math.max(Math.min(a / 100, 1), 0);
            this.m[1] = a;
            Y(this, this.i.gain, a, c, d);
            Y(this, this.h.gain, 1 - a, c, d);
            break;
        case 7:
            this.m[0] = a,
            Y(this, this.B.frequency, a, c, d)
        }
    }
}
;
self.ce = class extends Z {
    constructor(b, a, c, d, e, f) {
        super(b);
        this.R = "distortion";
        this.m = [a, c, d, e, f];
        this.A = X(this);
        this.dc = X(this);
        this.cc = X(this);
        b = d;
        .01 > b && (b = .01);
        this.dc.gain.value = b;
        this.cc.gain.value = Math.pow(1 / b, .6) * e;
        this.i = X(this);
        this.i.gain.value = f;
        this.h = X(this);
        this.h.gain.value = 1 - f;
        this.hc = this.g.createWaveShaper();
        this.Hc = new Float32Array(65536);
        for (e = 0; 32768 > e; ++e)
            f = e / 32768,
            b = 1.05 * c * a - a,
            d = 0 > f ? -f : f,
            d < a ? b = d : (d = 1 - Math.exp(-(1 / b) * (d - a)),
            b = a + b * d),
            f = b * (0 > f ? -1 : 1),
            this.Hc[32768 + e] = f,
            this.Hc[32768 - e - 1] = -f;
        this.hc.curve = this.Hc;
        this.A.connect(this.dc);
        this.A.connect(this.h);
        this.dc.connect(this.hc);
        this.hc.connect(this.cc);
        this.cc.connect(this.i)
    }
    j() {
        this.A.disconnect();
        this.dc.disconnect();
        this.hc.disconnect();
        this.cc.disconnect();
        this.i.disconnect();
        this.h.disconnect();
        super.j()
    }
    S(b) {
        this.i.disconnect();
        this.i.connect(b);
        this.h.disconnect();
        this.h.connect(b)
    }
    N() {
        return this.A
    }
    Y(b, a, c, d) {
        switch (b) {
        case 0:
            a = Math.max(Math.min(a / 100, 1), 0),
            this.m[4] = a,
            Y(this, this.i.gain, a, c, d),
            Y(this, this.h.gain, 1 - a, c, d)
        }
    }
}
;
self.$d = class extends Z {
    constructor(b, a, c, d, e, f) {
        super(b);
        this.R = "compressor";
        this.m = [a, c, d, e, f];
        this.l = this.g.createDynamicsCompressor();
        this.l.threshold.value = a;
        this.l.knee.value = c;
        this.l.ratio.value = d;
        this.l.attack.value = e;
        this.l.release.value = f
    }
    j() {
        this.l.disconnect();
        super.j()
    }
    S(b) {
        this.l.disconnect();
        this.l.connect(b)
    }
    N() {
        return this.l
    }
    Y() {}
}
;
self.Zd = class extends Z {
    constructor(b, a, c) {
        super(b);
        this.R = "analyser";
        this.m = [a, c];
        this.l = this.g.createAnalyser();
        this.l.fftSize = a;
        this.l.smoothingTimeConstant = c;
        this.Ed = new Float32Array(this.l.frequencyBinCount);
        this.Ud = new Uint8Array(a);
        this.Sd = this.Za = 0;
        b = this.u;
        b.Ra.add(this);
        T(b)
    }
    j() {
        this.u.Ra.delete(this);
        this.l.disconnect();
        super.j()
    }
    Pa() {
        this.l.getFloatFrequencyData(this.Ed);
        this.l.getByteTimeDomainData(this.Ud);
        const b = this.l.fftSize;
        let a = this.Za = 0;
        for (var c = 0; c < b; ++c) {
            let d = (this.Ud[c] - 128) / 128;
            0 > d && (d = -d);
            this.Za < d && (this.Za = d);
            a += d * d
        }
        c = self.fb.ue;
        this.Za = c(this.Za);
        this.Sd = c(Math.sqrt(a / b))
    }
    S(b) {
        this.l.disconnect();
        this.l.connect(b)
    }
    N() {
        return this.l
    }
    Y() {}
}
;
"use strict";
async function Ub(b, a) {
    a = a.type;
    let c = !0;
    0 === a ? c = await Vb() : 1 === a && (c = await Wb());
    l(b, "permission-result", {
        type: a,
        result: c
    })
}
async function Vb() {
    if (!self.DeviceOrientationEvent || !self.DeviceOrientationEvent.requestPermission)
        return !0;
    try {
        return "granted" === await self.DeviceOrientationEvent.requestPermission()
    } catch (b) {
        return console.warn("[Touch] Failed to request orientation permission: ", b),
        !1
    }
}
async function Wb() {
    if (!self.DeviceMotionEvent || !self.DeviceMotionEvent.requestPermission)
        return !0;
    try {
        return "granted" === await self.DeviceMotionEvent.requestPermission()
    } catch (b) {
        return console.warn("[Touch] Failed to request motion permission: ", b),
        !1
    }
}
self.ia.Ba(class extends self.Ma {
    constructor(b) {
        super(b, "touch");
        n(this, "request-permission", a=>Ub(this, a))
    }
}
);