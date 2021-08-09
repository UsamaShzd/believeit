(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{10:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r});var a="https://believeit-dev.herokuapp.com/api",r="/admin"},16:function(e,t,n){"use strict";t.a={store:function(e,t){"object"===typeof t&&(t=JSON.stringify(t)),localStorage.setItem(e,t)},get:function(e){var t=localStorage.getItem(e);if(!t)return"";try{t=JSON.parse(t)}catch(n){t=t}return t},remove:function(e){localStorage.removeItem(e)}}},205:function(e,t,n){e.exports=n(357)},240:function(e,t,n){},241:function(e,t,n){},242:function(e,t,n){},357:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(28),i=n.n(o),s=n(380),c=n(379),l=n(378),m=n(377),u=n(46),d=n(30),p=n(16),f=n(38),b=n(31),g=n(108),h=n(22),v=p.a.get("adminUser")||null,E={token:p.a.get("adminAuthToken")||"",user:v},y=Object(g.b)({name:"auth",initialState:E,reducers:{setUser:function(e,t){e.user=t.payload},setToken:function(e,t){e.token=t.payload},resetAuth:function(e){E}}}),O=y.actions,j=O.setUser,k=O.setToken,N=(O.resetAuth,y.reducer),x=Object(h.c)({auth:N}),w=Object(g.a)({reducer:x}),C=(n(239),n(240),n(241),n(242),n(76)),P=n(10),z=Object(b.b)(function(e){return{token:e.auth.token,user:e.auth.user}})(function(e){var t=e.component,n=e.user,a=e.token,o=Object(C.a)(e,["component","user","token"]);return r.a.createElement(l.a,Object.assign({},o,{render:function(e){return a&&null!==n?r.a.createElement(t,e):r.a.createElement(m.a,{to:{pathname:P.b+"/signin",state:{from:e.location}}})}}))}),_=n(8),S=n(9),A=n(12),U=n(6),T=n(11),q=n(188),L=n(362),I=n(363),F=n(364),H=n(365),B=n(366),D=n(180),J=n(70),G=n.n(J),R=n(358),W=n(359),M=n(360),Q=n(184),V=n(361),Y=n(75),K=function(e){var t=e.name,n=e.icon,a=Object(C.a)(e,["name","icon"]),o=Object(Y.c)(),i=o.values,s=o.errors,c=o.touched,l=o.setFieldValue,m=c[t]&&s[t],u=i[t];return r.a.createElement(R.a,null,r.a.createElement(W.a,{className:m?"input-group-alternative border border-danger":"input-group-alternative"},r.a.createElement(M.a,{addonType:"prepend"},r.a.createElement(Q.a,{className:m?"text-danger":""},r.a.createElement("i",{className:n}))),r.a.createElement(V.a,Object.assign({},a,{value:u,onChange:function(e){l(t,e.target.value)}}))),m&&r.a.createElement("div",{className:"alert alert-danger"},m))},X=n(78),Z=n(34),$=n.n(Z),ee=n(65),te=n(50),ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=(e.body,e.onSuccess,e.onError),n=e.onEnd;return function(){var e=Object(ee.a)($.a.mark(function e(a,r){return $.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:try{r(),f.a.setCommonHeaders("x-auth-token",""),p.a.remove("adminUser"),p.a.remove("adminAuthToken"),window.location.href=P.b}catch(a){console.log("Error => ",a),t?t(a):Object(te.a)(a)}finally{n&&n()}case 1:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}()};var ae=function(e){function t(){var e,n;Object(_.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(A.a)(this,(e=Object(U.a)(t)).call.apply(e,[this].concat(o)))).state={loading:!1},n.loginHandler=function(e,t){var a=t.setSubmitting;n.props.signinUser({body:e,onSuccess:function(e){n.props.history.replace("/users")},onEnd:function(){return a(!1)}})},n.showForm=function(){return r.a.createElement(Y.b,{initialValues:{email:"",password:""},validationSchema:X.d().shape({email:X.e().email().min(1).required(),password:X.e().min(1).required()}),onSubmit:n.loginHandler},function(e){var t=e.isSubmitting,n=e.submitForm;return r.a.createElement("form",null,r.a.createElement(K,{icon:"ni ni-email-83",placeholder:"Email",name:"email",type:"text",autoFocus:!0}),r.a.createElement(K,{name:"password",icon:"ni ni-lock-circle-open",placeholder:"Password",type:"password"}),r.a.createElement("div",{className:"d-flex justify-content-center mt-4"},r.a.createElement(q.a,{color:"primary",disabled:t,type:"submit",onClick:n},"Sign in")))})},n.showLoader=function(){return r.a.createElement("div",{className:"d-flex justify-content-center my-5"},r.a.createElement(D.HashLoader,{width:25,height:25,color:"#5e72e4"}))},n}return Object(T.a)(t,e),Object(S.a)(t,[{key:"componentDidMount",value:function(){document.body.classList.add("bg-default")}},{key:"componentWillUnmount",value:function(){document.body.classList.remove("bg-default")}},{key:"render",value:function(){var e=this.state.loading;return r.a.createElement("div",{className:"main-content"},r.a.createElement("div",{className:"header bg-gradient-info py-7 py-lg-8"},r.a.createElement("div",{className:"separator separator-bottom separator-skew zindex-100"},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"none",version:"1.1",viewBox:"0 0 2560 100",x:"0",y:"0"},r.a.createElement("polygon",{className:"fill-default",points:"2560 0 2560 100 0 100"})))),r.a.createElement(L.a,{className:"mt--8 pb-5"},r.a.createElement(I.a,{className:"justify-content-center"},r.a.createElement(F.a,{lg:"5",md:"7"},r.a.createElement(H.a,{className:"bg-secondary shadow border-0"},r.a.createElement(B.a,{className:"px-lg-5 py-lg-5"},r.a.createElement("div",{className:"d-flex justify-content-center mb-4"},r.a.createElement("img",{src:G.a,style:{height:100},alt:"Logo"})),e?this.showLoader():this.showForm()))))))}}]),t}(r.a.Component),re=Object(b.b)(function(e){return{}},function(e){return{signinUser:function(t){return e(function(e){var t=e.body,n=void 0===t?{}:t,a=e.onSuccess,r=e.onError,o=e.onEnd;return function(){var e=Object(ee.a)($.a.mark(function e(t,i){var s,c,l,m;return $.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.post({url:"/auth/signin",body:n});case 3:if(s=e.sent,c=s.data,l=c.user,m=c.token,"ADMIN"===l.role){e.next=7;break}return e.abrupt("return",Object(te.a)("You are restricted in this area"));case 7:f.a.setCommonHeaders("x-auth-token",m),t(k(m)),t(j(l)),p.a.store("adminAuthToken",m),p.a.store("adminUser",l),a&&a(s),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),r?r(e.t0):Object(te.a)(e.t0);case 18:return e.prev=18,o&&o(),e.finish(18);case 21:case"end":return e.stop()}},e,null,[[0,15,18,21]])}));return function(t,n){return e.apply(this,arguments)}}()}(t))}}})(ae),oe=n(368),ie=n(367),se=n(369),ce=n(381),le=n(370),me=n(371),ue=n(372),de=n(373),pe=function(e){function t(){return Object(_.a)(this,t),Object(A.a)(this,Object(U.a)(t).apply(this,arguments))}return Object(T.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){var e=this,t=this.props.user,n=t.name,a=t.image;return r.a.createElement(ie.a,{className:"navbar-top navbar-dark",expand:"md",id:"navbar-main"},r.a.createElement(L.a,{fluid:!0},r.a.createElement(oe.a,{className:"h4 mb-0 text-white text-uppercase d-none d-lg-inline-block",to:"/"},this.props.brandText),r.a.createElement(se.a,{className:"align-items-center d-none d-md-flex",navbar:!0},r.a.createElement(ce.a,{nav:!0},r.a.createElement(le.a,{className:"pr-0",nav:!0},r.a.createElement(me.a,{className:"align-items-center"},r.a.createElement("span",{className:"avatar avatar-sm rounded-circle"},r.a.createElement("img",{alt:"...",src:a&&a.thumbnailUrl})),r.a.createElement(me.a,{className:"ml-2 d-none d-lg-block"},r.a.createElement("span",{className:"mb-0 text-sm font-weight-bold"},n)))),r.a.createElement(ue.a,{className:"dropdown-menu-arrow",right:!0},r.a.createElement(de.a,{divider:!0}),r.a.createElement(de.a,{href:"#pablo",onClick:function(t){e.props.signoutUser()}},r.a.createElement("i",{className:"ni ni-user-run"}),r.a.createElement("span",null,"Logout")))))))}}]),t}(r.a.Component),fe=Object(b.b)(function(e){return{user:e.auth.user}},function(e){return{signoutUser:function(){return e(ne())}}})(pe),be=n(374),ge=n(375),he=n(376),ve=function(e){function t(){var e,n;Object(_.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(A.a)(this,(e=Object(U.a)(t)).call.apply(e,[this].concat(o)))).state={collapseOpen:!1,navItems:[{icon:"ni ni-single-02 text-danger",name:"Goal Categories",link:"/goal_categories"},{icon:"ni ni-single-02 text-danger",name:"Pre Defined Goals",link:"/pre_defined_goals"},{icon:"ni ni-single-02 text-danger",name:"Quote Categories",link:"/qoute_categories"},{icon:"ni ni-single-02 text-danger",name:"Famous Quotations",link:"/qoutations"},{icon:"ni ni-single-02 text-danger",name:"Affirmation Categories",link:"/affirmation_categories"},{icon:"ni ni-single-02 text-danger",name:"Affirmations",link:"/affirmations"},{icon:"ni ni-single-02 text-danger",name:"Ethnicities",link:"/ethnicities"},{icon:"ni ni-single-02 text-danger",name:"Posts",link:"/posts"},{icon:"ni ni-single-02 text-danger",name:"Prayers",link:"/prayers"}]},n.activeRoute=function(e){return n.props.location.pathname.indexOf(P.b+e)>-1?"active":""},n.toggleCollapse=function(){n.setState({collapseOpen:!n.state.collapseOpen})},n.closeCollapse=function(){n.setState({collapseOpen:!1})},n.createNavItem=function(){return n.state.navItems.map(function(e,t){if("heading"===e.type)return r.a.createElement("h4",{className:"ml-4",key:e.heading},e.heading);var a=n.activeRoute(e.link);return r.a.createElement(be.a,{key:t},r.a.createElement(oe.a,{to:P.b+e.link,className:"nav-link "+a},r.a.createElement("i",{className:e.icon}),e.name))})},n}return Object(T.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){var e=this,t=this.props.logo,a=this.props.user;return r.a.createElement(ie.a,{className:"navbar-vertical fixed-left navbar-light bg-white",expand:"md",id:"sidenav-main"},r.a.createElement(L.a,{fluid:!0},r.a.createElement("button",{className:"navbar-toggler",type:"button",onClick:this.toggleCollapse},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement(ge.a,{className:"pt-0"},r.a.createElement("img",{className:"navbar-brand-img",src:n(70)})),r.a.createElement(se.a,{className:"align-items-center d-md-none"},r.a.createElement(ce.a,{nav:!0},r.a.createElement(le.a,{nav:!0},r.a.createElement(me.a,{className:"align-items-center"},r.a.createElement("span",{className:"avatar avatar-sm rounded-circle"},r.a.createElement("img",{alt:"...",src:a.image&&a.image.thumbnailUrl})))),r.a.createElement(ue.a,{className:"dropdown-menu-arrow",right:!0},r.a.createElement(de.a,{href:"#",onClick:function(t){t.preventDefault(),e.props.signoutUser()}},r.a.createElement("i",{className:"ni ni-user-run"}),r.a.createElement("span",null,"Logout"))))),r.a.createElement(he.a,{navbar:!0,isOpen:this.state.collapseOpen},r.a.createElement("div",{className:"navbar-collapse-header d-md-none"},r.a.createElement(I.a,null,t?r.a.createElement(F.a,{className:"collapse-brand",xs:"6"},t.innerLink?r.a.createElement(oe.a,{to:t.innerLink},r.a.createElement("img",{src:n(70)})):r.a.createElement("a",{href:t.outterLink},r.a.createElement("img",{src:n(70)}))):null,r.a.createElement(F.a,{className:"collapse-close",xs:"6"},r.a.createElement("button",{className:"navbar-toggler",type:"button",onClick:this.toggleCollapse},r.a.createElement("span",null),r.a.createElement("span",null))))),r.a.createElement(se.a,{navbar:!0},this.createNavItem()))))}}]),t}(r.a.Component),Ee=Object(b.b)(function(e){return{user:e.auth.user}},function(e){return{signoutUser:function(){return e(ne())}}})(ve),ye=(Object(a.lazy)(function(){return n.e(29).then(n.bind(null,478))}),Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(25)]).then(n.bind(null,479))})),Oe=Object(a.lazy)(function(){return Promise.all([n.e(6),n.e(22)]).then(n.bind(null,495))}),je=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(27)]).then(n.bind(null,480))}),ke=Object(a.lazy)(function(){return n.e(12).then(n.bind(null,481))}),Ne=Object(a.lazy)(function(){return Promise.all([n.e(1),n.e(8)]).then(n.bind(null,482))}),xe=Object(a.lazy)(function(){return Promise.all([n.e(2),n.e(21)]).then(n.bind(null,485))}),we=Object(a.lazy)(function(){return Promise.all([n.e(1),n.e(9)]).then(n.bind(null,493))}),Ce=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(28)]).then(n.bind(null,486))}),Pe=Object(a.lazy)(function(){return n.e(14).then(n.bind(null,496))}),ze=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(18)]).then(n.bind(null,487))}),_e=Object(a.lazy)(function(){return n.e(13).then(n.bind(null,497))}),Se=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(23)]).then(n.bind(null,488))}),Ae=Object(a.lazy)(function(){return n.e(10).then(n.bind(null,498))}),Ue=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(16)]).then(n.bind(null,489))}),Te=Object(a.lazy)(function(){return n.e(11).then(n.bind(null,499))}),qe=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(24)]).then(n.bind(null,490))}),Le=Object(a.lazy)(function(){return n.e(15).then(n.bind(null,500))}),Ie=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(30),n.e(26)]).then(n.bind(null,491))}),Fe=Object(a.lazy)(function(){return Promise.all([n.e(7),n.e(19)]).then(n.bind(null,494))}),He=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(17)]).then(n.bind(null,492))}),Be=[{path:"/goal_categories/:identifier",component:Oe},{path:"/goal_categories",component:ye},{path:"/pre_defined_goals/add",component:ke},{path:"/pre_defined_goals/:identifier",component:Ne},{path:"/pre_defined_goals",component:je},{path:"/pre_defined_milestones/:preDefinedGoal/:identifier",component:xe},{path:"/pre_defined_sub_milestones/:identifier",component:we},{path:"/qoute_categories/:identifier",component:Pe},{path:"/qoute_categories",component:Ce},{path:"/qoutations/:identifier",component:_e},{path:"/qoutations",component:ze},{path:"/affirmation_categories/:identifier",component:Ae},{path:"/affirmation_categories",component:Se},{path:"/affirmations/:identifier",component:Te},{path:"/affirmations",component:Ue},{path:"/ethnicities/:identifier",component:Le},{path:"/ethnicities",component:qe},{path:"/posts/:identifier",component:Fe},{path:"/posts",component:Ie},{path:"/prayers/:identifier",component:Object(a.lazy)(function(){return Promise.all([n.e(2),n.e(20)]).then(n.bind(null,501))})},{path:"/prayers",component:He}],De=function(e){function t(){return Object(_.a)(this,t),Object(A.a)(this,Object(U.a)(t).apply(this,arguments))}return Object(T.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(Ee,Object.assign({},this.props,{logo:{innerLink:"/admin/index",imgSrc:"",imgAlt:"..."}})),r.a.createElement("div",{className:"main-content",ref:"mainContent"},r.a.createElement(fe,Object.assign({},this.props,{brandText:"Believe It"})),r.a.createElement(a.Suspense,{fallback:r.a.createElement("div",null,"loading...")},r.a.createElement(c.a,null,Be.map(function(e){var t=e.path,n=e.component;e.exact;return r.a.createElement(l.a,{path:P.b+t,key:t,exact:!0,component:n})}))),r.a.createElement(L.a,{fluid:!0},r.a.createElement("footer",{className:"footer"}))))}}]),t}(r.a.Component),Je=Object(u.a)(),Ge=function(e){return Object(a.useEffect)(function(){var e=p.a.get("adminAuthToken");f.a.setCommonHeaders("x-auth-token",e)},[]),r.a.createElement(b.a,{store:w},r.a.createElement(d.ToastContainer,{hideProgressBar:!0,closeButton:!1}),r.a.createElement(s.a,{history:Je,basename:P.b},r.a.createElement(c.a,null,r.a.createElement(l.a,{path:"".concat(P.b,"/signin"),exact:!0,component:function(e){return r.a.createElement(re,e)}}),r.a.createElement(z,{path:"".concat(P.b),component:De}),r.a.createElement(m.a,{to:"".concat(P.b,"/users")}))))};i.a.render(r.a.createElement(Ge,null),document.getElementById("root"))},38:function(e,t,n){"use strict";var a=n(72),r=n(63),o=n.n(r),i=n(10);t.a={get:function(e){var t=e.url,n=void 0===t?"":t,r=e.headers,s=void 0===r?{}:r,c=e.queryParams,l=void 0===c?{}:c,m=e.otherConfigs,u=void 0===m?{}:m;return o.a.get(i.a+n,Object(a.a)({headers:s,params:l},u))},post:function(e){var t=e.url,n=void 0===t?"":t,r=e.body,s=void 0===r?{}:r,c=e.headers,l=void 0===c?{}:c,m=e.queryParams,u=void 0===m?{}:m,d=e.otherConfigs,p=void 0===d?{}:d;return o.a.post(i.a+n,s,Object(a.a)({headers:l,params:u},p))},put:function(e){var t=e.url,n=void 0===t?"":t,r=e.body,s=void 0===r?{}:r,c=e.headers,l=void 0===c?{}:c,m=e.queryParams,u=void 0===m?{}:m,d=e.otherConfigs,p=void 0===d?{}:d;return o.a.put(i.a+n,s,Object(a.a)({headers:l,params:u},p))},delete:function(e){var t=e.url,n=void 0===t?"":t,r=e.headers,s=void 0===r?{}:r,c=e.queryParams,l=void 0===c?{}:c,m=e.otherConfigs,u=void 0===m?{}:m;return o.a.delete(i.a+n,Object(a.a)({headers:s,params:l},u))},setCommonHeaders:function(e,t){o.a.defaults.headers.common[e]=t}}},40:function(e,t,n){"use strict";var a=n(0),r=n.n(a);t.a=function(e){var t=e.title,n=e.image,a=e.time,o=e.message,i=e.closeToast;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"toast-header"},n&&r.a.createElement("img",{src:n,className:"rounded mr-2",alt:"image"}),t&&r.a.createElement("strong",{className:"mr-auto"},t),a&&r.a.createElement("small",null,a),r.a.createElement("button",{type:"button",className:"ml-2 mb-1 close","data-dismiss":"toast","aria-label":"Close",onClick:i},r.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),r.a.createElement("div",{className:"toast-body"},o))}},50:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var a=n(0),r=n.n(a),o=n(30),i=n(40),s=n(16),c=n(10),l=function(e){var t=e.response&&e.response.status>=400&&e.response.status<=500;if("string"===typeof e)return o.toast.error(r.a.createElement(i.a,{title:"Error",message:e}));t?400===e.response.status?o.toast.error(r.a.createElement(i.a,{title:"Error",message:e.response.data.message})):401===e.response.status?(o.toast.warn(r.a.createElement(i.a,{title:"Warning",message:e.response.data.message})),s.a.remove("xAuthToken"),s.a.remove("user"),window.location.href=c.b+"/signin"):403===e.response.status?(o.toast.warn(r.a.createElement(i.a,{title:"Warning",message:e.response.data.message})),s.a.remove("xAuthToken"),s.a.remove("user"),window.location.href=c.b+"/signin"):500===e.response.status?o.toast.error(r.a.createElement(i.a,{title:"Error",message:e.response.data.message})):o.toast.error(r.a.createElement(i.a,{title:"Error",message:"Something went wrong."})):o.toast.error(r.a.createElement(i.a,{title:"Error",message:"An unexpected error occurrred."}))}},70:function(e,t,n){e.exports=n.p+"static/media/logo.270a97f7.png"}},[[205,4,5]]]);
//# sourceMappingURL=main.41029eed.chunk.js.map