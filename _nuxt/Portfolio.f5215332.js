import{s as d,o as e,a as s,b as o,t as i,F as c,r,k as _,c as u}from"./entry.589438d9.js";const f={id:"portfolio",class:"portfolio section-bg"},k={class:"container"},m={class:"section-title"},p={class:"row"},b={class:"col-lg-12 d-flex justify-content-center"},h={id:"portfolio-flters"},v=["data-filter"],y={class:"row portfolio-container"},C={__name:"Portfolio",props:{blok:Object},setup(l){return(x,B)=>{const a=d("StoryblokComponent");return e(),s("section",f,[o("div",k,[o("div",m,[o("h2",null,i(l.blok.Title),1)]),o("div",p,[o("div",b,[o("ul",h,[(e(!0),s(c,null,r(l.blok.Filters,(t,n)=>(e(),s("li",{"data-filter":t.By,class:_({"filter-active":n===0})},i(t.Text),11,v))),256))])])]),o("div",y,[(e(!0),s(c,null,r(l.blok.Projects,(t,n)=>(e(),u(a,{key:t._uid,blok:t},null,8,["blok"]))),128))])])])}}};export{C as default};
