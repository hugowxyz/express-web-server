(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},37:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),r=n(13),c=n.n(r),u=n(14),l=n(3),i=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return console.log(),o.a.createElement("li",null,e.content," ",o.a.createElement("button",{onClick:n},a))},m=function(t){var e=t.message;return null===e?null:o.a.createElement("div",{className:"error"},e)},f=n(2),s=n.n(f),p="https://polar-inlet-88272.herokuapp.com/api/notes",d=function(){return s.a.get(p).then((function(t){return t.data}))},h=function(t){return s.a.post(p,t).then((function(t){return t.data}))},g=function(t,e){return s.a.put("".concat(p,"/").concat(t),e).then((function(t){return t.data}))},b=function(){var t=Object(a.useState)([]),e=Object(l.a)(t,2),n=e[0],r=e[1],c=Object(a.useState)(""),f=Object(l.a)(c,2),s=f[0],p=f[1],b=Object(a.useState)("error"),v=Object(l.a)(b,2),E=v[0],O=v[1];Object(a.useEffect)((function(){console.log("effect"),d().then((function(t){console.log("promise fulfilled"),r(t)}))}),[]);return o.a.createElement("div",null,o.a.createElement(m,{message:E}),o.a.createElement("h1",null," Notes "),o.a.createElement("ul",null,n.map((function(t,e){return o.a.createElement(i,{key:e,note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),a=Object(u.a)({},e,{important:!e.important});g(t,a).then((function(e){r(n.map((function(n){return n.id!==t?n:e})))})).catch((function(a){alert("the note ".concat(e.content," was already deleted from the server")),r(n.filter((function(e){return e.id!==t}))),O("".concat(e.content," already deleted")),setTimeout((function(){O(null)}),5e3)}))}(t.id)}})}))),o.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:s,data:(new Date).toISOString(),important:Math.random()>.5,id:n.length+1};h(e).then((function(t){r(n.concat(t)),p("")}))}},o.a.createElement("input",{value:s,onChange:function(t){console.log(t.target.value),p(t.target.value)}}),o.a.createElement("button",{type:"submit"},"save")))};n(37);c.a.render(o.a.createElement(b,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.5dcc0ad8.chunk.js.map