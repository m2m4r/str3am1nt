{const e={string:e=>!0,number:e=>/^-?\d+(\.\d+)?$/.test(e),boolean:e=>"false"===e||"true"===e},t={string:e=>e,number:e=>parseFloat(e),boolean:e=>"false"!==e},n=(n,i)=>{const a={};for(const r of n.split(";")){const n=r.trim().match(/^(.*?):([\s\S]*)$/);if(!n)continue;let[o,l]=[n[1],n[2]].map((e=>e.trim()));for(const n in i)if(i[n].includes(o)&&e[n](l)){l=t[n](l);break}"string"==typeof l&&/^(\[|\{|anime\.|"|')/.test(l)&&(l=new Function(`return (${l})`)());const s=o.split("-");let c=a;s.forEach(((e,t)=>{t<s.length-1?(c[e]=c[e]||{},c=c[e]):c[e]=l}))}return a},i={string:["targets"],number:["onview"],boolean:["loop","onclick","onview","autoplay"]},a=(e,t,n="restart")=>{if("alternate"===n)e.animeToggleOpen?t.reversed||t.reverse():t.reversed&&t.reverse(),e.animeToggleOpen=!e.animeToggleOpen,t.play();else{if("restart"!==n)throw"invalid direction";t.restart()}},r=new Promise((e=>{document.addEventListener("DOMContentLoaded",(t=>{setTimeout((()=>{e()}),1300)}))})),o=async(e,t,n)=>{const i=(t="restart")=>{a(e,n,t)};let o=!1!==t.autoplay;if(t.onclick){const n="alternate"===t.onclick;e.addEventListener("click",(e=>{e.preventDefault(),i(n?"alternate":"restart")})),o=!1}if(t.onhover&&($(e).on("mouseenter mouseleave",(()=>{i("alternate")})),o=!1),await r,void 0!==t.onview&&!1!==t.onview){const n="number"==typeof t.onview?t.onview:0,a=()=>{window.innerHeight>e.getBoundingClientRect().top-n&&(window.removeEventListener("scroll",a),window.removeEventListener("resize",a),i())};window.addEventListener("scroll",a),window.addEventListener("resize",a),a(),o=!1}o&&i()},l=()=>{document.querySelectorAll("[data-anime]").forEach((e=>{const t=n(e.getAttribute("data-anime"),i);let a;t.targets?(a=[...$(t.targets,e)],delete t.targets):a=e;const r=anime({targets:a,...t});r.pause(),e.animeInstance=r,o(e,t,r)}))},s={},c={},m={},d=(e,t)=>{s[e]=t,m[e]&&m[e](t)};Object.assign(window,{defineAnimeTimelineHelper:d});const u=()=>{document.querySelectorAll("[data-anime-timeline]").forEach((async e=>{if(e.animeTimelineHelper)return;e.animeTimelineHelper=!0;let t,i,a=e.getAttribute("data-anime-timeline");a.includes(":")?(t=n(a,{}),a=t.timeline,delete t.timeline):t={},s[a]?(i=s[a](e,t),i.pause()):(c[a]||(c[a]=new Promise((e=>{m[a]=e}))),await c[a].then((()=>{i=s[a](e,t),i.pause()}))),e.animeTimelineInstance=i,o(e,t,i)}))},g=()=>{document.querySelectorAll("[data-anime-toggle]").forEach((async e=>{if(e.animeToggleHelper)return;e.animeToggleHelper=!0;const t=e.getAttribute("data-anime-toggle");e.addEventListener("click",(e=>{e.preventDefault();[...$(t)].forEach((e=>{const t=e.animeTimelineInstance||e.animeInstance;t&&a(e,t,"alternate")}))}))}))};l(),u(),g()}