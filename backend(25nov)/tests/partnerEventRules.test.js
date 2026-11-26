import test from 'node:test';import assert from 'node:assert/strict';import {partnerEvents} from '../services/partnerEventRules.js';
const insert={operationType:'insert'},update=(p,v)=>({operationType:'update',updateDescription:{updatedFields:{[p]:v}}});
test('purchase notifies once per recipient',()=>{const e=partnerEvents('CreditTransaction',{status:'SUCCESS',type:'PURCHASE',walletOwnerPartnerId:'a',attributedPartnerId:'a',credits:500},insert);assert.equal(e.length,1);assert.equal(e[0].type,'WALLET_PURCHASE');});
test('pending wallet transaction ignored',()=>assert.equal(partnerEvents('CreditTransaction',{status:'PENDING',type:'PURCHASE'},insert).length,0));
test('reassignment notifies old and new',()=>{const e=partnerEvents('NewProperty',{assignedPartner:{partnerId:'b'}},update('assignedPartner.partnerId','b'),{assigned:'a'});assert.deepEqual(e.map(x=>x.userId),['a','b']);});
test('existing promotion rejection not duplicated',()=>assert.equal(partnerEvents('PromotionRequest',{status:'Rejected',partnerMongoId:'a'},update('status','Rejected')).length,0));
test('team owner gets visit outcome',()=>{const e=partnerEvents('Visit',{partnerId:'a',teamOwnerId:'b',status:'Completed'},update('status','Completed'));assert.deepEqual(e.map(x=>x.userId),['b']);});
test('lead notification excludes private contacts',()=>{const e=partnerEvents('Lead',{assignedPartner:{partnerMongoId:'a'},buyer:{phone:'SECRET'}},insert);assert.ok(e.length);assert.ok(!JSON.stringify(e).includes('SECRET'));});
