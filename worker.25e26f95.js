parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"MSyQ":[function(require,module,exports) {
"use strict";function e(e){return"function"==typeof DedicatedWorkerGlobalScope&&e instanceof DedicatedWorkerGlobalScope}Object.defineProperty(exports,"__esModule",{value:!0}),exports.isDedicatedWorkerGlobalScope=e,exports.workerFactory=void 0;const o={};exports.workerFactory=o;
},{}],"wVII":[function(require,module,exports) {
"use strict";var t;function e(t){return"string"==typeof t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.isSchedulingFailure=e,exports.JobSplitting=void 0,exports.JobSplitting=t,function(t){t.NONE="none",t.PREEMPTION="preemption",t.MULTIPLE_MACHINES="multi"}(t||(exports.JobSplitting=t={}));
},{}],"7QYR":[function(require,module,exports) {
"use strict";function r(r){return Math.trunc((r-1)/2)}function t(r){return 2*r+1}function a(r){return 2*r+2}function n(r,t,a){const n=r[t];r[t]=r[a],r[a]=n}function s(r,s,e){let i=e;for(;;){let e=i;const o=t(i);o<r.length&&s(r[o],r[e])<0&&(e=o);const h=a(i);if(h<r.length&&s(r[h],r[e])<0&&(e=h),e===i)break;n(r,i,e),i=e}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;class e{constructor(r,t){this.comparatorFn_=t,this.array_=Array.from(r);for(let a=Math.trunc(this.array_.length/2)-1;a>=0;--a)s(this.array_,this.comparatorFn_,a)}add(t){this.array_.push(t);let a=this.array_.length-1;for(;;){const t=r(a);if(a<=0||this.comparatorFn_(this.array_[t],this.array_[a])<0)break;n(this.array_,t,a),a=t}}extractMin(){if(0===this.array_.length)return;if(1===this.array_.length)return this.array_.pop();const r=this.array_[0];return this.array_[0]=this.array_.pop(),s(this.array_,this.comparatorFn_,0),r}isEmpty(){return 0===this.array_.length}}var i=e;exports.default=i;
},{}],"aHDr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.computeSchedule=n;var e=require("./api-types.js"),t=s(require("./minheap.js"));function s(e){return e&&e.__esModule?e:{default:e}}const i=Object.freeze({deliveryTime:0,splitting:e.JobSplitting.PREEMPTION,dependencies:[],releaseTime:0,preAssignment:-1});function n(e){const t=e=>e>=0&&Number.isInteger(e),s=e=>void 0===e||t(e),n=e.machineSpeeds.length,r=e.jobs.length;if(0===n)return"At least one machine is required to compute a schedule.";if(!(e=>0===e.filter(e=>e<=0||!Number.isInteger(e)).length)(e.machineSpeeds)||e.jobs.filter(e=>!t(e.size)||!((...e)=>0===e.filter(e=>!s(e)).length)(e.deliveryTime,e.releaseTime)||!((e,s)=>void 0===s||t(s)&&s<e)(n,e.preAssignment)||void 0!==e.dependencies&&!((e,s)=>0===s.filter(s=>!(s>=0&&t(s)&&s<e)).length)(r,e.dependencies)).length>0||!s(e.minFragmentSize))return"All job processing times and machine speeds need to be non-negative integers. All job dependency and pre-assignment indices need to be within bounds.";const d=e.jobs.map(e=>Object.assign({},i,e)),c=void 0===e.minFragmentSize?0:e.minFragmentSize;return new a(n,e.machineSpeeds,d,c).schedule}class a{constructor(e,t,s,i){this.numMachines_=e,this.machineSpeeds_=t,this.jobs_=s,this.minFragmentSize_=i,this.gapsLists_=this.machineSpeeds_.map(e=>({head:{startTime:Number.MIN_SAFE_INTEGER,endTime:0},tail:{head:{startTime:0,endTime:Number.MAX_SAFE_INTEGER},tail:null}})),this.schedule=this.computeSchedule()}static nextTimeStamp(e,t,s){let i=s.gapsList.head;if(null!==s.currentFragmentStart)return i.endTime;for(;;){const n=Math.max(t,i.startTime)+e;if(n<=i.endTime)return n;s.previousGapsList=s.gapsList,s.gapsList=s.gapsList.tail,i=s.gapsList.head}}adjustGaps(e,t,s){const i=e.currentFragmentStart,n=e.gapsList.head;s&&(i===n.startTime&&t===n.endTime?e.previousGapsList.tail=e.gapsList.tail:i===n.startTime?n.startTime=t:t===n.endTime?(n.endTime=i,e.previousGapsList=e.gapsList):(e.previousGapsList.tail={head:{startTime:n.startTime,endTime:i},tail:e.gapsList},n.startTime=t)),t===n.endTime?e.gapsList=e.gapsList.tail:s||(e.gapsList={head:{startTime:t,endTime:n.endTime},tail:e.gapsList.tail}),e.currentFragmentStart=null}createJobFragment(e,t,s){if(s){const i=e.currentFragmentStart;if(t-i>0){const n={machine:e.index,start:i,end:t,isWaiting:!1};s.push(n)}}this.adjustGaps(e,t,void 0!==s)}scheduleJob(e,t,s,i,n){const r=s?Math.min(t,this.minFragmentSize_):t;let d=0,c=i,l=t;const m=e.map((e,t)=>{const s=this.gapsLists_[e];return{index:e,availableIdx:t,speed:this.machineSpeeds_[e],currentFragmentStart:null,previousGapsList:s,gapsList:s.tail}});for(;l>0;){let t=Number.MAX_SAFE_INTEGER,s=m[0];e.forEach((e,n)=>{const d=Math.ceil(r/m[n].speed),c=a.nextTimeStamp(d,i,m[n]);c<t&&(t=c,s=m[n])});let h=!1;const p=Math.ceil(c+l/d);if(p<t&&(t=p,h=!0),l-=(t-c)*d,!h)if(null===s.currentFragmentStart){const e=s.gapsList.head;s.currentFragmentStart=Math.max(i,e.startTime),l-=(t-s.currentFragmentStart)*s.speed,d+=s.speed}else this.createJobFragment(s,t,n),d-=s.speed;c=t}return e.forEach((e,t)=>{null!==m[t].currentFragmentStart&&this.createJobFragment(m[t],c,n)}),c}static scheduleDeliveryTime(e,t,s,i){let n=t;if(s>0){const a={machine:e,start:t,end:n+=s,isWaiting:!0};i.push(a)}return n}allMachines(){return{length:this.machineSpeeds_.length,forEach(e){for(let t=0;t<this.length;++t)e(t,t)},map(e){const t=[];t.length=this.length;for(let s=0;s<this.length;++s)t[s]=e(s,s);return t}}}static singleMachine(e){return{length:1,forEach(t){t(e,0)},map:t=>[t(e,0)]}}computeSchedule(){const s=[],i=this.jobs_.map((e,t)=>({idx:t,numDependencies:e.dependencies.length,dependents:[]}));for(let e=0;e<this.jobs_.length;++e){const t=this.jobs_[e],n=i[e];for(const e of t.dependencies)i[e].dependents.push(n);0===t.dependencies.length&&s.push(n)}const n=this.allMachines(),r=this.jobs_.map(e=>[]),d=this.jobs_.map(e=>-1);let c=0;const l=new t.default(s,(e,t)=>e.idx-t.idx);for(;!l.isEmpty();){const t=l.extractMin(),s=this.jobs_[t.idx],i=s.splitting!==e.JobSplitting.NONE,m=s.dependencies.reduce((e,t)=>{const s=d[t];return Math.max(e,s)},s.releaseTime);let h,p=n;if(s.splitting===e.JobSplitting.MULTIPLE_MACHINES)h=s.preAssignment>=0?s.preAssignment:0;else if(s.preAssignment>=0)p=a.singleMachine(s.preAssignment),h=s.preAssignment;else{let e=Number.MAX_SAFE_INTEGER;for(let t=0;t<this.numMachines_;++t){const n=a.singleMachine(t),r=this.scheduleJob(n,s.size,i,m);r<e&&(p=n,h=t,e=r)}}const o=this.scheduleJob(p,s.size,i,m,r[t.idx]);d[t.idx]=a.scheduleDeliveryTime(h,o,s.deliveryTime,r[t.idx]),++c;for(const e of t.dependents)--e.numDependencies,0===e.numDependencies&&l.add(e)}return c!==this.jobs_.length?"Detected a cycle in the dependency graph.":r}}
},{"./api-types.js":"wVII","./minheap.js":"7QYR"}],"JN4w":[function(require,module,exports) {
"use strict";var e=require("./worker-interface.js"),s=require("./scheduling.js");if((0,e.isDedicatedWorkerGlobalScope)(self)){const e=self;function c(c){const o=c.data,r=(0,s.computeSchedule)(...o);e.postMessage(r),e.close()}e.onmessage=c}
},{"./worker-interface.js":"MSyQ","./scheduling.js":"aHDr"}]},{},["JN4w"], null)
//# sourceMappingURL=/project-planning-for-you-track/worker.25e26f95.js.map