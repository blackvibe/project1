import { onCleanup } from "solid-js";

export function copyToClipboard(string: string) {
    var textarea = document.createElement('textarea');
    textarea.setAttribute('readonly', 'true');
    textarea.setAttribute('contenteditable', 'true');
    textarea.style.position = 'fixed'; 
    textarea.value = string;
  
    document.body.appendChild(textarea);
  
    textarea.select();
    try {
        var range = document.createRange();
        range.selectNodeContents(textarea);
  
        var sel:any = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        textarea.setSelectionRange(0, textarea.value.length);
    } catch (err) {
        // handle error
    }
    var result = document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  }

export function formatPhoneNumber(number:any) {
    return ('' + number).replace(/\D/g, '').replace(/^(\d{3})(\d{3})(\d*)$/, '($1) $2-$3');
}

export function fuzzySearch(searchTerm: string, jsonData: any, keys: any[]) {
  const MIN_RELEVANCE = 0.5;
  const searchLen = searchTerm.length;
  const searchTermLower = searchTerm.toLowerCase();

  jsonData = jsonData.map((item: any) => {
    const itemValue = keys.reduce((acc: any, key: string | number) => acc + (item[key] || ''), '').toLowerCase();
    let maxRelevance = 0;

    for (let i = 0; i <= itemValue.length - searchLen; i++) {
      const substring = itemValue.substr(i, searchLen);
      const relevance = 1 - damerauLevenshteinDistance(searchTermLower, substring) / Math.max(searchLen, substring.length);
      maxRelevance = Math.max(maxRelevance, relevance);
      if (maxRelevance === 1) break;
    }

    return { ...item, relevance: maxRelevance };
  });

  return jsonData.filter((item: any) => item.relevance >= MIN_RELEVANCE).sort((a: { relevance: number; }, b: { relevance: number; }) => b.relevance - a.relevance);
}


function damerauLevenshteinDistance(r: string,e: string){if(r===e)return 0;var n,t,$,a=r.length,f=e.length;if(0===a)return f;if(0===f)return a;for(var i=a+1,u=Array(i),h=Array(i),c=0,o=0;c<i;)u[c]=c++;for(;o<f;){for(n=e.charAt(o++),h[0]=o,c=0;c<a;)t=u[c]-(r.charAt(c)===n?1:0),h[c]<t&&(t=h[c]),u[++c]<t&&(t=u[c]),h[c]=t+1;$=u,u=h,h=$}return u[a]}
