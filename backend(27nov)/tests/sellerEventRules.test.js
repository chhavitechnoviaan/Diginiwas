import {test} from 'node:test';import assert from 'node:assert/strict';import {sellerEvents} from '../services/sellerEventRules.js';
const insert={operationType:'insert'};const update=f=>({operationType:'update',updateDescription:{updatedFields:f}});
test('registration',()=>assert.equal(sellerEvents('Seller',{},insert)[0].type,'SELLER_REGISTERED'));
test('password not exposed',()=>assert.ok(!JSON.stringify(sellerEvents('Seller',{},update({password:'secret'}))).includes('secret')));
test('promotion existing approval not duplicated',()=>assert.equal(sellerEvents('PromotionRequest',{targetType:'PROPERTY'},update({status:'Approved'})).length,0));
test('visit scheduled',()=>assert.equal(sellerEvents('Visit',{},update({status:'Upcoming'}))[0].type,'PROPERTY_VISIT_UPCOMING'));
test('property rejected reason',()=>assert.match(sellerEvents('NewProperty',{review:{rejectionReason:'Missing photo'}},update({status:'Rejected'}))[0].message,/Missing photo/));
test('new enquiry',()=>assert.equal(sellerEvents('Lead',{},insert)[0].type,'PROPERTY_ENQUIRY_RECEIVED'));
