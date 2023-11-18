import react, { useEffect, useState } from 'react';
import { getCampaignById } from './_requests';
import { QRCode } from 'react-qrcode-logo';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './App.css';

function App() {
  const [campaign, setCampaign] = useState([]);
  const [qrList, setQrList] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const campaignId = queryParams.get('cid');

  const campaignList = async () => {
    const response = await getCampaignById(campaignId);
    setCampaign(response.output);
  }

  async function createZip() {        
    const zip = new JSZip();
    const eurwuergwe = [];

    campaign.forEach((lfh, i) => {
        html2canvas(document.getElementById('multipleQRCodeDownloadInZip'+i)).then(function(canvas) {
            console.log("wtjhtgetuguihrtiubegd", canvas);
            
            const ctx = canvas?.getContext('2d');
            if(ctx) {
                const dataUrl = canvas?.toDataURL('image/png');                    
                // const downloadLink = document.createElement('a');
                // downloadLink.href = dataUrl;
                // downloadLink.download = `${lfh.ro_name}(${lfh.sap_code}).png`;
                // downloadLink.click();
                // const imageData = dataUrl?.replace(/^data:image\/png;base64,/, '');
                // const werwerwe = base64ToFile(dataUrl, 'fileName.png', 'image/x-png');
                // img?.file(`image${i + 1}.png`, dataUrl?.split(',')[1], { base64: true });
                // setQrList(false);

                const byteCharacters = atob(dataUrl.split(',')[1]);

                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const rtjhetg = new Blob([byteArray], { type: 'image/png' });

                // const treterte = new Blob([atob(dataUrl.split(',')[1])], { type: 'application/octet-stream' });

                // const file = new File([treterte], 'image.png', { type: 'image/png' });
                // img?.file;
                zip?.file(`image${i+1}.png`, rtjhetg);
                // eurwuergwe.push(file);
                // saveAs(dataUrl, 'files.jpg');
                // eurwuergwe?.push(file);
                // console.log("erjwergwurweurgwejrb", file);
                setQrList(false);
            }
        });
    });
    setTimeout(() => {
        zip?.generateAsync({ type: 'blob' }).then((blob) => {            
            saveAs(blob, 'images.zip');
        });
    }, campaign.length * 1000)
  }

  useEffect(() => {
    if(campaignId) {
    campaignList();
    }
  }, [campaignId]);

  return (
    <div className="App mx-auto">
      <div className={qrList ? '' : ''}>
      {campaign?.map((data, i) => {
      return(
      <div className='h-100 w-100' key={i} >
          <div className='qr_container d-flex flex-column align-items-center justify-content-center' id={'multipleQRCodeDownloadInZip'+i} >
              <h2 className='mb-2 fs-1'>{data.ro_name}</h2>
              <p className='mb-7 fs-5'># {data.sap_code}</p>
              <div className='print_qr d-flex flex-column align-items-center justify-content-center'>
                  <QRCode value={process.env.REACT_APP_FRONT_URL+"campaigns?cid="+data.campaign_id+"&rid="+data.id} logoImage={process.env.REACT_APP_API_URL+'/uploads/company/logo/'+data.omc_id+'/'+data.omc_logo} removeQrCodeBehindLogo={true} logoPaddingStyle="circle" size={400} qrStyle="dots" eyeRadius={25} logoWidth={100} eyeColor={data.omc_qr_color} enableCORS={true} />
              </div>
          </div>
      </div>
      )})}
      </div>
      <button type='button' className='btn btn-primary' onClick={createZip} >Download</button>
    </div>
  );
}

export default App;
