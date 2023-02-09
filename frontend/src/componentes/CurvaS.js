import React from 'react';

function PowerBIReport() {
  return (
    <iframe
      width="800"
      height="600"
      src="https://app.powerbi.com/reportEmbed?reportId=<Report-ID>"
      frameborder="0"
      allowFullScreen="true"
    />
  );
}

export default PowerBIReport;