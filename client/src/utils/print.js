export const printDiv = async divName => {
  /**
   * @issue
   * This removes all of the event listeners and scripts that were initially present. -> can result in the page becoming unclickable.
   */
  // const printContents = document.getElementById(divName).innerHTML;
  // const originalContents = document.body.innerHTML;
  // document.body.innerHTML = printContents;
  // window.print();
  // document.body.innerHTML = originalContents;

  const printContents = document.getElementById(divName).innerHTML;

  // Create a new iframe element and append it to the document
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  // Write the printContents to the iframe
  iframe.contentDocument.open();
  iframe.contentDocument.write(`
    <html>
    <head>
      <title>Print</title>
      <link rel="stylesheet" type="text/css" media="print" href="styles/main.scss">
    </head>
    <body>
      ${printContents}
    </body>
    </html>
  `);
  iframe.contentDocument.close();

  // Print the iframe's content
  iframe.contentWindow.print();

  // Remove the iframe from the document
  document.body.removeChild(iframe);
};
