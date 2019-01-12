'use strict';

let JSZip = require('jszip');
let docxtemplater = require('docxtemplater');

let fs = require('fs');
let path = require('path');

    //test via testscript

build((err, result) => {
    if (err) console.log(err);
    else console.log(result);
});

async function build(obj) {
    let content = await fs
        .readFile(path.resolve(__dirname, 'input.docx'), 'binary');
console.log('1')
    let zip = new JSZip(content);
    console.log('2')
    let doc = new docxtemplater();
    console.log('2.2')
    doc.loadZip(zip);
    console.log('3')
    doc.setData({
        first_name: 'John',
        last_name: 'Doe',
        phone: '0652455478',
        description: 'New Website'
    });    
    console.log('4')
    
    doc.render();
    console.log('5')
    let buffer = doc.getZip()
                    .generate({type: 'nodebuffer'});
                    console.log('6')
    await fs.writeFile(path.resolve(__dirname, 'output.docx'), buffer);
    console.log('6')
    return true;

    //return filepath
}