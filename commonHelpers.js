import{a as h,S as y,i as d}from"./assets/vendor-b0d10f48.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();h.defaults.baseURL="https://pixabay.com/api/";async function p(r,e){const i="44385883-198adbd7f849b7ff14e77c80c";return await h.get("",{params:{q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,key:i,page:e,per_page:15}})}function m(r){return r.map(e=>`    <li class="photo-card">
    
    <a class="img-link" href="${e.largeImageURL}">
    <img class="img-card"
      src="${e.webformatURL}"
      alt="${e.tags}"

    /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes ${e.likes}</b>
      </p>
      <p class="info-item"><b>Views ${e.views}</b></p>
      <p class="info-item"><b>Comments ${e.comments}</b></p>
      <p class="info-item"><b>Downloads ${e.downloads}</b></p>
    </div>
  </li>
 `).join("")}const g=new y(".gallery a",{captionsData:"alt",captionDelay:250}),L=document.querySelector("form"),f=document.querySelector(".gallery"),a=document.querySelector(".loader"),n=document.querySelector(".load-more-btn");L.addEventListener("submit",b);n.addEventListener("click",v);let l=null,c=1;async function b(r){if(r.preventDefault(),f.innerHTML="",a.classList.remove("is-hidden"),c=1,n.classList.add("is-hidden"),l=r.target.elements.search.value.trim(),l===""){a.classList.add("is-hidden");return}try{const e=await p(l,c);e.data.hits.length===0&&d.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),f.innerHTML=m(e.data.hits),g.refresh(),e.data.totalHits>15?n.classList.remove("is-hidden"):n.classList.add("is-hidden")}catch{d.error({position:"topLeft",message:"Error. Please try again!!"})}finally{a.classList.add("is-hidden")}}async function v(r){c+=1,a.classList.remove("is-hidden");try{const e=await p(l,c),i=Math.ceil(e.data.totalHits/15);f.insertAdjacentHTML("beforeend",m(e.data.hits)),g.refresh();const o=f.firstElementChild.getBoundingClientRect().height;if(console.log(o),window.scrollBy({top:o*2,behavior:"smooth"}),c===i)return n.classList.add("is-hidden"),d.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}catch{d.error({position:"topLeft",message:"Error. Please try again!!"})}finally{a.classList.add("is-hidden")}}
//# sourceMappingURL=commonHelpers.js.map
