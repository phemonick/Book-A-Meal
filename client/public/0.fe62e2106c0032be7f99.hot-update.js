exports.id=0,exports.modules={608:function(e,t,a){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},o=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),l=a(1),i=c(l),u=c(a(607)),s=a(332),f=(a(100),c(a(334)));function c(e){return e&&e.__esModule?e:{default:e}}var d=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==(void 0===t?"undefined":r(t))&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.onChange=function(t){var a,r,o;console.log(t.target.value),e.setState({data:n({},e.state.data,(a={},r=t.target.name,o=[t.target.value],r in a?Object.defineProperty(a,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):a[r]=o,a))})},e.onSubmit=function(t){t.preventDefault();var a=e.validate(e.state.data);e.setState({errors:a})},e.state={data:{email:"",password:""},loading:!1,errors:{}},e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":r(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),o(t,[{key:"validate",value:function(e){var t={};return u.default.isEmail(e.email)||(t.email="Invalid email"),e.password||(t.password="Can't be blank"),t}},{key:"render",value:function(){var e=this.state,t=e.data,a=e.errors;return i.default.createElement(s.Form,{onSubmit:this.onSubmit},i.default.createElement(s.Form.Field,null,i.default.createElement("label",{htmlFor:"email"}," Email "),i.default.createElement("input",{type:"email",id:"email",name:"email",value:t.email,onChange:this.onChange,placeholder:"example@example.com"}),a.email&&i.default.createElement(f.default,{text:a.email})),i.default.createElement(s.Form.Field,null,i.default.createElement("label",{htmlFor:"password"}," Password "),i.default.createElement("input",{type:"password",id:"password",name:"password",placeholder:"Make it secure",value:t.password,onChange:this.onChange}),a.password&&i.default.createElement(f.default,{text:a.password})),i.default.createElement(s.Button,{type:"submit",primary:!0},"Login"))}}]),t}();t.default=d}};