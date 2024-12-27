        // Save button
        
        document.getElementById('inaHtml').addEventListener('input', function () {
            var htmlContent = document.getElementById('inaHtml').value;
            var iframe = document.getElementById('inaFrame');
            var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            
            iframeDoc.open();
            iframeDoc.write(htmlContent);
            iframeDoc.close();
        });
        
        
        document.getElementById('saveBtn').addEventListener('click', function () {
            var htmlContent = document.getElementById('inaHtml').value;
            var blob = new Blob([htmlContent], { type: 'text/html' });
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'document.html';
            link.click();
        });