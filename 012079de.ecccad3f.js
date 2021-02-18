(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{139:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return p}));var n=r(1),a=r(9),o=(r(0),r(202)),i={title:"waitForNone(dependencies)",sidebar_label:"waitForNone()"},c={id:"api-reference/utils/waitForNone",title:"waitForNone(dependencies)",description:"A concurrency helper that returns a set of [`Loadable`s](/docs/api-reference/core/Loadable) for the current state of the requested dependencies.",source:"@site/docs/api-reference/utils/waitForNone.md",permalink:"/docs/api-reference/utils/waitForNone",editUrl:"https://github.com/docschina/Recoil/edit/docs/docs/docs/api-reference/utils/waitForNone.md",sidebar_label:"waitForNone()",sidebar:"someSidebar",previous:{title:"waitForAny(dependencies)",permalink:"/docs/api-reference/utils/waitForAny"},next:{title:"noWait(state)",permalink:"/docs/api-reference/utils/noWait"}},l=[{value:"Incremental Loading Example",id:"incremental-loading-example",children:[]}],s={rightToc:l};function p(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"A concurrency helper that returns a set of ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/api-reference/core/Loadable"}),Object(o.b)("inlineCode",{parentName:"a"},"Loadable"),"s")," for the current state of the requested dependencies."),Object(o.b)("p",null,"The dependencies may either be provided as a tuple array or as named dependencies in an object."),Object(o.b)("hr",null),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"function waitForNone(dependencies: Array<RecoilValue<>>):\n  RecoilValueReadOnly<UnwrappedArrayOfLoadables>\n")),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"function waitForNone(dependencies: {[string]: RecoilValue<>}):\n  RecoilValueReadOnly<UnwrappedObjectOfLoadables>\n")),Object(o.b)("hr",null),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"waitForNone()")," is similar to ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/api-reference/utils/waitForAll"}),Object(o.b)("inlineCode",{parentName:"a"},"waitForAll()")),", except that it returns immediately and returns a ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/api-reference/core/Loadable"}),Object(o.b)("inlineCode",{parentName:"a"},"Loadable"))," for each dependency instead of the values directly.  It is similar to ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/api-reference/utils/noWait"}),Object(o.b)("inlineCode",{parentName:"a"},"noWait()")),", except that it allows requesting multiple dependencies at once."),Object(o.b)("p",null,"This helper is useful for working with partial data or incrementally updating the UI as different data becomes available."),Object(o.b)("h3",{id:"incremental-loading-example"},"Incremental Loading Example"),Object(o.b)("p",null,"This example renders a chart with multiple layers.  Each layer has a potentially expensive data query.  It will render the chart immediately using spinners for each layer that is still pending and will update the chart to add each new layer as the data for that layer comes in.  If any of the layers has an error with the query then only that layer will show an error message and the rest will continue to render."),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"function MyChart({layerQueries}: {layerQueries: Array<RecoilValue<Layer>>}) {\n  const layerLoadables = useRecoilValue(waitForNone(layerQueries));\n\n  return (\n    <Chart>\n      {layerLoadables.map((layerLoadable, i) => {\n        switch (layerLoadable.state) {\n          case 'hasValue':\n            return <Layer key={i} data={layerLoadable.contents} />;\n          case 'hasError':\n            return <LayerErrorBadge key={i} error={layerLoadable.contents} />;\n          case 'loading':\n            return <LayerWithSpinner key={i} />;\n        }\n      })}\n    </Chart>\n  );\n}\n\n")))}p.isMDXComponent=!0},202:function(e,t,r){"use strict";r.d(t,"a",(function(){return d})),r.d(t,"b",(function(){return f}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=a.a.createContext({}),p=function(e){var t=a.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c({},t,{},e)),r},d=function(e){var t=p(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=Object(n.forwardRef)((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=p(r),b=n,f=d["".concat(i,".").concat(b)]||d[b]||u[b]||o;return r?a.a.createElement(f,c({ref:t},s,{components:r})):a.a.createElement(f,c({ref:t},s))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=b;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var s=2;s<o;s++)i[s]=r[s];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"}}]);