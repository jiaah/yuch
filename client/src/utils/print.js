export const printDiv = async divName => {
  console.log('divName: ', divName);
  const printContents = document.getElementById(divName).innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;

  // const mywindow = await window.open('', 'PRINT', 'height=400,width=600');
  // mywindow.document.body.innerHTML = await printContents;
  // mywindow.document.close(); // necessary for IE >= 10
  // mywindow.focus(); // necessary for IE >= 10*/
  // mywindow.print();
  // mywindow.close();

  // const mywindow = window.open('', 'PRINT', 'height=400,width=600');
  // mywindow.document.write(`<html><head><title>${document.title}</title>`);
  // mywindow.document.write(
  //   '<link rel="stylesheet" href="../../styles/main.scss" type="text/css" />',
  // );
  // mywindow.document.write('</head><body >');
  // mywindow.document.write(`<h1>${document.title}</h1>`);
  // mywindow.document.write(printContents);
  // mywindow.document.write('</body></html>');
  // mywindow.document.close(); // necessary for IE >= 10
  // mywindow.focus(); // necessary for IE >= 10*/
  // mywindow.print();
  // mywindow.close();

  // return true;
};
