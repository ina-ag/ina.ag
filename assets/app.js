        // Save button

document.getElementById('inaHtml').addEventListener('input', function () {
    var htmlContent = document.getElementById('inaHtml').innerHTML;
    var iframe = document.getElementById('inaFrame');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();
});

document.getElementById('saveBtn').addEventListener('click', function () {
    var fileExtension = document.getElementById('fileExtension').value;
    var filename = document.getElementById('filename').value || 'document';
    var content = document.getElementById('inaHtml').innerHTML;
    var blob, mimeType;

    switch (fileExtension) {
        case 'html':
            mimeType = 'text/html';
            filename += '.html';
            break;
        case 'css':
            mimeType = 'text/css';
            content = `/* CSS Content */\n${content}`;
            filename += '.css';
            break;
        case 'js':
            mimeType = 'application/javascript';
            content = `// JavaScript Content\n${content}`;
            filename += '.js';
            break;
        default:
            alert('Pilih ekstensi valid!');
            return;
    }

    var blob = new Blob([content], { type: mimeType });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
});
