(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{377:function(e,a,t){"use strict";var n=t(0),r=t.n(n),c=t(356);a.a=function(e){return r.a.createElement("div",{className:"header bg-gradient-info pb-8 pt-5 pt-md-8"},r.a.createElement(c.a,{fluid:!0},e.children))}},378:function(e,a,t){"use strict";var n=t(0),r=t.n(n),c=t(183),l=t.n(c);a.a=function(e){var a=e.color,t=void 0===a?"#00acf0":a;return r.a.createElement(l.a,{color:t})}},462:function(e,a,t){"use strict";t.r(a);var n=t(34),r=t.n(n),c=t(63),l=t(62),s=t(0),o=t.n(s),i=t(356),u=t(359),m=t(381),d=t(360),f=t(377),b=t(378),E=t(48),p=t(380),g=t(362),v=t(38),h=t(10);p.DataTable=t(382);a.default=function(e){var a=Object(s.useState)([]),t=Object(l.a)(a,2),n=t[0],p=t[1],w=Object(s.useState)(!0),N=Object(l.a)(w,2),y=N[0],_=N[1];Object(s.useEffect)(function(){j()},[]);var j=function(){var e=Object(c.a)(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,_(!0),e.next=4,v.a.get({url:"/goal_categories/"});case 4:a=e.sent,p(a.data),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),Object(E.a)("Something went wrong!");case 11:return e.prev=11,_(!1),e.finish(11);case 14:case"end":return e.stop()}},e,null,[[0,8,11,14]])}));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(c.a)(r.a.mark(function e(a){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(window.confirm('Are you sure you want to delete "'.concat(a.name,'"?'))){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,e.next=6,v.a.delete({url:"/goal_categories/"+a._id});case 6:t=n.filter(function(e){return e._id!==a._id}),p(t),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),Object(E.a)("Failed to delete Goal Category");case 13:case"end":return e.stop()}},e,null,[[3,10]])}));return function(a){return e.apply(this,arguments)}}();return o.a.createElement(o.a.Fragment,null,o.a.createElement(f.a,null),o.a.createElement(i.a,{className:"mt--7",fluid:!0},o.a.createElement(u.a,{className:"shadow"},o.a.createElement(m.a,null,o.a.createElement("div",{className:"clearfix"},o.a.createElement("h2",{className:"mb-0 float-left"},"Goal Categories"),o.a.createElement(g.a,{to:h.b+"/goal_categories/add",className:"btn btn-success btn-sm float-right",color:"success",size:"sm"},o.a.createElement("i",{className:"fa fa-pencil-alt"})," Add"))),o.a.createElement(d.a,{className:"bg-secondary"},y?o.a.createElement("div",{className:"d-flex justify-content-center my-5"},o.a.createElement(b.a,null)):o.a.createElement("div",{style:{position:"relative",overflowX:"scroll"}},o.a.createElement("table",{className:"table",id:"goal_categories_table"},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Name"),o.a.createElement("th",null,"Color"),o.a.createElement("th",null,"actions"))),o.a.createElement("tbody",null,n.map(function(e,a){return o.a.createElement("tr",{key:e._id},o.a.createElement("td",null,e.name),o.a.createElement("td",null,o.a.createElement("div",{className:"badge badge-sm badge-primary text-white",style:{backgroundColor:e.color}},e.color)),o.a.createElement("td",null,o.a.createElement(g.a,{className:"btn btn-primary btn-sm",to:h.b+"/goal_categories/"+e._id},o.a.createElement("i",{className:"fa fa-pencil-alt"})),o.a.createElement("button",{className:"btn btn-danger btn-sm",onClick:function(){return k(e)}},o.a.createElement("i",{className:"fa fa-trash-alt"}))))}))))))))}}}]);
//# sourceMappingURL=14.a63c001d.chunk.js.map