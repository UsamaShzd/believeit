(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{383:function(e,a,t){"use strict";var n=t(0),r=t.n(n),c=t(362);a.a=function(e){return r.a.createElement("div",{className:"header bg-gradient-info pb-8 pt-5 pt-md-8"},r.a.createElement(c.a,{fluid:!0},e.children))}},385:function(e,a,t){"use strict";var n=t(0),r=t.n(n),c=t(189),l=t.n(c);a.a=function(e){var a=e.color,t=void 0===a?"#00acf0":a;return r.a.createElement(l.a,{color:t})}},391:function(e,a,t){},492:function(e,a,t){"use strict";t.r(a);var n=t(34),r=t.n(n),c=t(65),l=t(64),s=t(0),i=t.n(s),u=t(362),o=t(365),m=t(387),f=t(366),p=t(383),d=t(385),b=t(50),E=t(388),v=(t(391),t(368)),h=t(38),y=t(10);E.DataTable=t(389);a.default=function(e){var a=Object(s.useState)(!0),t=Object(l.a)(a,2),n=t[0],w=t[1],g=Object(s.useState)([]),N=Object(l.a)(g,2),j=N[0],x=N[1];Object(s.useEffect)(function(){k()},[]);var k=function(){var e=Object(c.a)(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,w(!0),e.next=4,h.a.get({url:"/prayers/"});case 4:a=e.sent,x(a.data),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),Object(b.a)("Something went wrong!");case 11:return e.prev=11,w(!1),E("#prayers_table").DataTable({language:{paginate:{next:'<span class="pagination-fa"><i class="fa fa-chevron-right" ></i></span>',previous:'<span class="pagination-fa"><i class="fa fa-chevron-left" ></i></span>'}}}),e.finish(11);case 15:case"end":return e.stop()}},e,null,[[0,8,11,15]])}));return function(){return e.apply(this,arguments)}}(),O=function(){var e=Object(c.a)(r.a.mark(function e(a){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(window.confirm('Are you sure you want to delete "'.concat(a.name,'"?'))){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,e.next=6,h.a.delete({url:"/prayers/"+a._id});case 6:t=j.filter(function(e){return e._id!==a._id}),x(t),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),Object(b.a)("Failed to delete Prayer");case 13:case"end":return e.stop()}},e,null,[[3,10]])}));return function(a){return e.apply(this,arguments)}}();return i.a.createElement(i.a.Fragment,null,i.a.createElement(p.a,null),i.a.createElement(u.a,{className:"mt--7",fluid:!0},i.a.createElement(o.a,{className:"shadow"},i.a.createElement(m.a,null,i.a.createElement("div",{className:"clearfix"},i.a.createElement("h2",{className:"mb-0 float-left"},"Prayers"),i.a.createElement(v.a,{to:y.b+"/prayers/add",className:"btn btn-success btn-sm float-right",color:"success",size:"sm"},i.a.createElement("i",{className:"fa fa-pencil-alt"})," Add"))),i.a.createElement(f.a,{className:"bg-secondary"},n?i.a.createElement("div",{className:"d-flex justify-content-center my-5"},i.a.createElement(d.a,null)):i.a.createElement("div",{style:{position:"relative",overflowX:"scroll"}},i.a.createElement("table",{className:"table",id:"prayers_table"},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",null,"Name"),i.a.createElement("th",null,"Prayer"),i.a.createElement("th",null,"actions"))),i.a.createElement("tbody",null,j.map(function(e,a){return i.a.createElement("tr",{key:e._id},i.a.createElement("td",null,e.name),i.a.createElement("td",null,e.prayer),i.a.createElement("td",null,i.a.createElement(v.a,{className:"btn btn-primary btn-sm",to:y.b+"/prayers/"+e._id},i.a.createElement("i",{className:"fa fa-pencil-alt"})),i.a.createElement("button",{className:"btn btn-danger btn-sm",onClick:function(){return O(e)}},i.a.createElement("i",{className:"fa fa-trash-alt"}))))}))))))))}}}]);
//# sourceMappingURL=17.11adb683.chunk.js.map