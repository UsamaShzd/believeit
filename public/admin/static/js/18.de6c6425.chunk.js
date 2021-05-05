(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{382:function(e,a,t){"use strict";var r=t(0),n=t.n(r),l=t(361);a.a=function(e){return n.a.createElement("div",{className:"header bg-gradient-info pb-8 pt-5 pt-md-8"},n.a.createElement(l.a,{fluid:!0},e.children))}},383:function(e,a,t){"use strict";var r=t(75),n=t(0),l=t.n(n),c=t(357),s=t(388),i=t(360),u=t(74);a.a=function(e){var a=e.name,t=e.label,n=Object(r.a)(e,["name","label"]),o=Object(u.c)(),d=o.values,m=o.errors,b=o.touched,p=o.setFieldValue,f=d[a],v=b[a]&&m[a],y=" form-control form-control-alternative text-black";return v&&(y+=" border border-danger"),l.a.createElement(c.a,null,t&&l.a.createElement(s.a,{className:"form-control-label"},t),l.a.createElement(i.a,Object.assign({},n,{className:y,autoComplete:"off",value:f,onChange:function(e){p(a,e.target.value)}})),v&&l.a.createElement("div",{className:"alert alert-danger"},v))}},487:function(e,a,t){"use strict";t.r(a);var r=t(34),n=t.n(r),l=t(64),c=t(63),s=t(0),i=t.n(s),u=t(187),o=t(361),d=t(364),m=t(386),b=t(365),p=t(382),f=t(74),v=t(77),y=t(383),E=(t(72),t(471)),g=function(e){var a=e.error,t=e.label,r=(e.value,"my-select");return a&&(r+=" my-input-error"),i.a.createElement("div",{className:"form-group"},t&&i.a.createElement("label",null,t),i.a.createElement(E.a,Object.assign({},e,{className:r})),a&&i.a.createElement("p",{className:"my-input-error-text",style:{color:"red"}},a))},h=t(10),w=t(49),x=t(38),N="/pre_defined_milestones/";a.default=function(e){var a=e.match,t=e.history,r=a.params,E=r.identifier,k=r.preDefinedGoal,j=Object(s.useState)({title:"",preDefinedGoal:k,frequency:1,repeatingDays:[]}),D=Object(c.a)(j,2),O=D[0],q=D[1];Object(s.useEffect)(function(){"add"!==E&&E!==O._id&&S()},[E]);var S=function(){var e=Object(l.a)(n.a.mark(function e(){var a;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.a.get({url:N+E});case 3:a=e.sent,q(a.data),e.next=15;break;case 7:e.prev=7,e.t0=e.catch(0),e.t1=e.t0.response.status,e.next=404===e.t1?12:14;break;case 12:return Object(w.a)("Pre Defined Milestone not found!"),e.abrupt("break",15);case 14:Object(w.a)("Something went wrong!");case 15:case"end":return e.stop()}},e,null,[[0,7]])}));return function(){return e.apply(this,arguments)}}(),F=function(){var e=Object(l.a)(n.a.mark(function e(a,r){var l,c,s,i;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(l=r.setSubmitting,c=r.setErrors,e.prev=1,"add"!==E){e.next=10;break}return e.next=5,x.a.post({url:N,body:a});case 5:s=e.sent,q(s.data),t.replace(h.b+"/pre_defined_milestones/"+s.data.preDefinedGoal+"/"+s.data._id),e.next=14;break;case 10:return e.next=12,x.a.put({url:N+E,body:a});case 12:i=e.sent,q(i.data);case 14:e.next=26;break;case 16:e.prev=16,e.t0=e.catch(1),e.t1=e.t0.response.status,e.next=400===e.t1?21:404===e.t1?23:25;break;case 21:return c(e.t0.response.data.error),e.abrupt("break",26);case 23:return Object(w.a)("This category is deleted"),e.abrupt("break",26);case 25:Object(w.a)("Something went wrong!");case 26:return e.prev=26,l(!1),e.finish(26);case 29:case"end":return e.stop()}},e,null,[[1,16,26,29]])}));return function(a,t){return e.apply(this,arguments)}}();return i.a.createElement(i.a.Fragment,null,i.a.createElement(p.a,null),i.a.createElement(o.a,{className:"mt--7"},i.a.createElement(d.a,{className:"shadow"},i.a.createElement(m.a,null,i.a.createElement("div",{className:"clearfix"},i.a.createElement("h2",{className:"mb-0 float-left"},"add"===E?"Add Pre Defined Milestone":O.title))),i.a.createElement(b.a,{className:"bg-secondary"},function(){var e=[{value:"monday",label:"Monday"},{value:"tuesday",label:"Tuesday"},{value:"wednesday",label:"Wednesday"},{value:"thursday",label:"Thursday"},{value:"friday",label:"Friday"},{value:"saturday",label:"Saturday"},{value:"sunday",label:"Sunday"}];return i.a.createElement(f.b,{initialValues:O,validationSchema:v.d().shape({title:v.e().trim().min(3).max(100).required(),preDefinedGoal:v.e().trim().min(24).max(24).required(),frequency:v.c().min(1).required(),repeatingDays:v.a().of(v.e().required()).required()}),enableReinitialize:!0,onSubmit:F},function(a){var t=a.isSubmitting,r=a.submitForm,n=a.setFieldValue,l=a.values,c=a.touched,s=a.errors,o=e.filter(function(e){return l.repeatingDays.includes(e.value)});return i.a.createElement(f.a,null,i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-12"},i.a.createElement(y.a,{name:"title",placeholder:"Title",label:"Title"})),i.a.createElement("div",{className:"col-md-6"},i.a.createElement(y.a,{name:"frequency",placeholder:"Frequency",label:"Frequency",type:"number",min:1})),i.a.createElement("div",{className:"col-md-6"},i.a.createElement(g,{label:"Repeating Days",isMulti:!0,options:e,value:o,onChange:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];null===e&&(e=[]),console.log("change",e),n("repeatingDays",e.map(function(e){return e.value}))},error:c.repeatingDays&&s.repeatingDays})),i.a.createElement("div",{className:"col-12 text-center"},i.a.createElement(u.a,{color:"primary",disabled:t,type:"submit",onClick:r},"Save"))))})}()))))}}}]);
//# sourceMappingURL=18.de6c6425.chunk.js.map