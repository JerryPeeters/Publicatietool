'use strict';

let JSZip = require('jszip');
let docxtemplater = require('docxtemplater');

let fs = require('fs').promises;
let path = require('path');

exports.create = create;

async function create(data, template, outputname) { //async, so return promise or resolved promise.

    let content = await fs
        .readFile(path.resolve(__dirname, 'docxtemplates', template));


    let zip = new JSZip(content);
 
    let doc = new docxtemplater();
    
    doc.loadZip(zip);

    doc.setData(data);    
try {
    doc.render();
} catch (err) {throw err};

    let buffer = doc.getZip()
                    .generate({type: 'nodebuffer'});

    let outputPath = path.resolve(__dirname, 'output', outputname + '.docx')

    await fs.writeFile(outputPath, buffer);

    return outputPath;
}