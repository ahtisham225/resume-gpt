import AWS from 'aws-sdk';

export async function uploadToS3(file: File){
    try{
        const s3 = new AWS.S3({
            correctClockSkew: true,
            endpoint: 'https://s3.ap-southeast-1.wasabisys.com', //Specify the correct endpoint based on where your bucket is
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
            region: 'ap-southeast-1', //Specify the correct region name based on where your bucket is
            logger: console
        });

        const file_key = 'uploads/' + Date.now().toString() + file.name.replace(' ','-')
        console.log('Loaded');
        const uploadRequest = new AWS.S3.ManagedUpload({
            params: {
                Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || '',
                Key: file_key,
                Body: file,
            },

            service: s3

        });

    uploadRequest.on('httpUploadProgress', function(event) {

        const progressPercentage = Math.floor(event.loaded * 100 / event.total);

        console.log('Upload progress ' + progressPercentage);

    });

    console.log('Configed and sending');

    uploadRequest.send(function(err) {

        if (err) {

            console.log('UPLOAD ERROR: ' + JSON.stringify(err, null, 2));

        } else {

            console.log('Good upload');

        }

    });
    } catch(error){
        console.log(error);
    }
}

export function getS3Url(file_key: string){
    const url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.wasabisys.com/${file_key}`;
    return url;
}

