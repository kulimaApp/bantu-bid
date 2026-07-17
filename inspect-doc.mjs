import mammoth from 'mammoth';

const result = await mammoth.extractRawText({ path: 'data/Bantu_Bid_Business_Document-6d850b.docx' });
console.log(result.value);
