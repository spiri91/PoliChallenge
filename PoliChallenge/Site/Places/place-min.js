"use strict";!function(e,t,n,i,s,l,a){let u=[],o=null,c=!1,r={name:$("#name"),autoFillBtn:$("#btnAutoFill"),latitude:$("#latitude"),longitude:$("#longitude"),observations:$("#observations"),token:$("#token"),submitBtn:$("#submit"),deleteBtn:$("#delete"),placesList:$("#listOfPlaces"),updateBtn:$("#update")};function d(){!function(){if(1==c)return;r.autoFillBtn.click(E),r.submitBtn.click(v),r.deleteBtn.click(g),r.updateBtn.click(m),r.placesList.change(f),c=!0}(),u=s.get(s.names.places),r.placesList.empty().append('<option value="" selected>'+a.places.SELECT_PLACE+"</option>"),$.each(u,function(){r.placesList.append(new Option(this.name,this.key))}),p(),h()}function f(){let e=r.placesList.find(":selected");if(0===e.length)return;let t=i.findInArray(u,e[0].value);(o=t)?(i.setValueOf(r.name,o.name),i.setValueOf(r.observations,o.observations),i.setValueOf(r.latitude,o.latitude),i.setValueOf(r.longitude,o.longitude),i.enableElements([r.deleteBtn,r.updateBtn]),i.disableElements([r.submitBtn])):(h(),p(),i.enableElements([r.submitBtn]))}function p(){i.disableElements([r.updateBtn,r.deleteBtn])}function h(){let e=[r.latitude,r.longitude,r.name,r.observations];for(let t in e)i.setValueOf(e[t],"")}function m(t){let n=i.valueOf(r.token);if(n&&""!=n)return o.name=i.valueOf(r.name),o.observations=i.valueOf(r.observations),o.latitude=i.valueOf(r.latitude),o.longitude=i.valueOf(r.longitude),i.showSpinner().then(()=>e.put(e.entities.places,o,n)).then(()=>i.success(a.messages.UPDATED_ITEM),O).then(b).then(d).then(i.hideSpinner);i.warning(a.messages.MISSING_TOKEN)}function g(){let t=i.valueOf(r.token);t&&""!=t?i.confirm(a.places.DELETE_PLACE,()=>i.showSpinner().then(()=>e.delete(e.entities.places,o.key,t)).then(()=>i.success(a.messages.DELETED_ITEM),O).then(b).then(d).then(i.hideSpinner)):i.warning(a.messages.MISSING_TOKEN)}function E(){t.get().then(e=>{i.setValueOf(r.latitude,e.coords.latitude),i.setValueOf(r.longitude,e.coords.longitude)})}function v(){let t=n.generate(),s=i.valueOf(r.name),l=i.valueOf(r.latitude),u=i.valueOf(r.longitude),o=i.valueOf(r.observations),c=i.valueOf(r.token),f=e.createPlace({key:t,name:s,latitude:l,longitude:u,observations:o});return i.showSpinner().then(()=>e.post(e.entities.places,f,c)).then(()=>i.success(a.messages.CREATED_ITEM),O).then(b).then(d).then(i.hideSpinner)}function O(e){if(!i.error(e))throw i.hideSpinner(),console.log(e),new Error("Break promise chain")}function b(){return l.fillAll(e,s)}d()}(repo,geo,guidGenerator,_,storage,entities,constants);