(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ddf37"],{8427:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-2 col-form-label"},[e._v("Herd")]),a("div",{staticClass:"col-sm-10 input-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.value.herdName,expression:"value.herdName"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.value.herdName},on:{input:function(t){t.target.composing||e.$set(e.value,"herdName",t.target.value)}}}),a("div",{staticClass:"input-group-append"},[a("button",{staticClass:"btn input-group-text",on:{click:e.removeHerd}},[a("span",{staticClass:"oi oi-trash"})]),a("button",{staticClass:"btn input-group-text",on:{click:e.changeColor}},[a("span",{staticClass:"oi oi-pencil"})])])])]),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-2 col-form-label"},[e._v("Cows")]),a("div",{staticClass:"col-sm-10"},[a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.value.herdSize,expression:"value.herdSize",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number"},domProps:{value:e.value.herdSize},on:{input:function(t){t.target.composing||e.$set(e.value,"herdSize",e._n(t.target.value))},blur:function(t){e.$forceUpdate()}}})])]),a("div",{staticClass:"form-group"},[a("div",{staticClass:"row"},[a("a",{staticClass:"btn btn-primary mx-3 dropdown-toggle",attrs:{"data-toggle":"collapse","data-target":"#calvingPatterns"}},[e._v("Calving Patterns")]),a("a",{staticClass:"nav-link",on:{click:e.addPattern}},[e._v("Add")])]),a("div",{staticClass:"collapse mt-3",attrs:{id:"calvingPatterns"}},[e._l(e.value.calvingPatterns,function(t,n){return a("Calving-Pattern",{key:n,attrs:{item:t},on:{remove:function(t){e.remove(n)}}})}),a("hr")],2)]),a("hr")])},s=[],r={name:"Herd",components:{CalvingPattern:function(){return a.e("chunk-2d21b314").then(a.bind(null,"bf71"))}},props:{value:Object},methods:{getNewColor:function(){for(var e="0123456789ABCDEF",t="#",a=0;a<6;a++)t+=e[Math.floor(16*Math.random())];return t+"70"},changeColor:function(){this.value.color=this.getNewColor()},removeHerd:function(){this.$emit("removeHerd")},remove:function(e){console.log("removing: "+e),this.value.calvingPatterns.splice(e,1)},addPattern:function(){this.value.calvingPatterns.push({patternName:"Pattern"+this.value.calvingPatterns.length,dateFrom:new Date("2/3/20"),dateTo:new Date("3/2/20"),staleAvg:22,peakAvg:30,freshAvg:20,weeksToPeak:6,weeksOfPeak:20,weeksTillStale:20,fertilityRate:100,herdRatio:100,weeksDry:8,halfPercentDryWeek:3,useHalfPercent:!1})}}},o=r,l=a("2877"),i=Object(l["a"])(o,n,s,!1,null,"26d2d3d4",null);t["default"]=i.exports}}]);
//# sourceMappingURL=chunk-2d0ddf37.5eb2d388.js.map