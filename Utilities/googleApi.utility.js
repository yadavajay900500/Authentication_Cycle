const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = 'Your Client_ID...............................';
const CLIENT_SECRET = 'Your Client_Secret.....................................';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04OfBSJs..........................................................';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

exports.googleDrive = async (x) => {
    try {
        const studentImage = x.path
        console.log("jhvsg >>>>>", studentImage)
        const filePath = await path.join(__dirname, `../${studentImage}`);
        console.log("AAAA", x)
        const response = await drive.files.create({
            requestBody: {
                name: `${x.filename}`, //This can be name of your choice
                mimeType: 'image/jpg',
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filePath),
            },
        });

        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

exports.deleteFile=async()=> {
    try {
      const response = await drive.files.delete({
        fileId: 'YOUR FILE ID',
      });
      console.log(response.data, response.status);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  // deleteFile();
exports.generatePublicUrl=async()=> {
    try {
      const fileId = '12vBMduX..........................';
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
  
      /* 
      webViewLink: View the file in browser
      webContentLink: Direct download link 
      */
      const result = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink',
      });
      console.log("eeeeeee",result)
      const {data}=result
      console.log("gooogle Api",data);
      return await data;
    } catch (error) {
      console.log(error.message);
    }
   // return await data;
  }
  
  // generatePublicUrl();
