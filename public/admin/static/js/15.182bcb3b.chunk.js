(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{377:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(356);t.a=function(e){return r.a.createElement("div",{className:"header bg-gradient-info pb-8 pt-5 pt-md-8"},r.a.createElement(c.a,{fluid:!0},e.children))}},378:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(183),l=a.n(c);t.a=function(e){var t=e.color,a=void 0===t?"#00acf0":t;return r.a.createElement(l.a,{color:a})}},463:function(e,t,a){"use strict";a.r(t);var n=a(34),r=a.n(n),c=a(63),l=a(62),s=a(0),u=a.n(s),o=a(356),i=a(359),m=a(381),f=a(360),d=a(377),b=a(378),E=a(48),p=a(380),v=a(362),h=a(38),w=a(10);p.DataTable=a(382);t.default=function(e){var t=Object(s.useState)([]),a=Object(l.a)(t,2),n=a[0],p=a[1],g=Object(s.useState)(!0),N=Object(l.a)(g,2),y=N[0],_=N[1];Object(s.useEffect)(function(){j()},[]);var j=function(){var e=Object(c.a)(r.a.mark(function e(){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,_(!0),e.next=4,h.a.get({url:"/qoute_categories/"});case 4:t=e.sent,p(t.data),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),Object(E.a)("Something went wrong!");case 11:return e.prev=11,_(!1),e.finish(11);case 14:case"end":return e.stop()}},e,null,[[0,8,11,14]])}));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(c.a)(r.a.mark(function e(t){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(window.confirm('Are you sure you want to delete "'.concat(t.name,'"?'))){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,e.next=6,h.a.delete({url:"/qoute_categories/"+t._id});case 6:a=n.filter(function(e){return e._id!==t._id}),p(a),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),Object(E.a)("Failed to delete Qoute Category");case 13:case"end":return e.stop()}},e,null,[[3,10]])}));return function(t){return e.apply(this,arguments)}}();return u.a.createElement(u.a.Fragment,null,u.a.createElement(d.a,null),u.a.createElement(o.a,{className:"mt--7",fluid:!0},u.a.createElement(i.a,{className:"shadow"},u.a.createElement(m.a,null,u.a.createElement("div",{className:"clearfix"},u.a.createElement("h2",{className:"mb-0 float-left"},"Qoute Categories"),u.a.createElement(v.a,{to:w.b+"/qoute_categories/add",className:"btn btn-success btn-sm float-right",color:"success",size:"sm"},u.a.createElement("i",{className:"fa fa-pencil-alt"})," Add"))),u.a.createElement(f.a,{className:"bg-secondary"},y?u.a.createElement("div",{className:"d-flex justify-content-center my-5"},u.a.createElement(b.a,null)):u.a.createElement("div",{style:{position:"relative",overflowX:"scroll"}},u.a.createElement("table",{className:"table",id:"qoute_categories_table"},u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"Name"),u.a.createElement("th",null,"Free"),u.a.createElement("th",null,"actions"))),u.a.createElement("tbody",null,n.map(function(e,t){return u.a.createElement("tr",{key:e._id},u.a.createElement("td",null,e.name),u.a.createElement("td",null,e.isFree?"Yes":"No"),u.a.createElement("td",null,u.a.createElement(v.a,{className:"btn btn-primary btn-sm",to:w.b+"/qoute_categories/"+e._id},u.a.createElement("i",{className:"fa fa-pencil-alt"})),u.a.createElement("button",{className:"btn btn-danger btn-sm",onClick:function(){return k(e)}},u.a.createElement("i",{className:"fa fa-trash-alt"}))))}))))))))}}}]);
//# sourceMappingURL=15.182bcb3b.chunk.js.map